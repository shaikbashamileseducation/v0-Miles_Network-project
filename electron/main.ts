import { app, BrowserWindow, Tray, Menu, nativeImage, dialog, ipcMain } from "electron"
import * as path from "path"
import { autoUpdater } from "electron-updater"
import type * as http from "http"
import * as express from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
import * as compression from "compression"
import * as helmet from "helmet"
import * as morgan from "morgan"
import * as WebSocket from "ws"
import * as sqlite3 from "sqlite3"
import { open } from "sqlite"

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit()
}

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let isQuitting = false
let expressApp: any = null
let server: http.Server | null = null
let wss: WebSocket.Server | null = null
let db: any = null

// Initialize database
const initDatabase = async () => {
  const dbPath = path.join(app.getPath("userData"), "miles_monitor.db")
  console.log(`Initializing database at ${dbPath}`)

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ip TEXT NOT NULL,
      type TEXT NOT NULL,
      protocol TEXT NOT NULL,
      status TEXT DEFAULT 'unknown',
      cpu REAL DEFAULT 0,
      memory REAL DEFAULT 0,
      uptime INTEGER DEFAULT 0,
      last_seen TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT,
      role TEXT DEFAULT 'viewer',
      last_login TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      read INTEGER DEFAULT 0,
      FOREIGN KEY (device_id) REFERENCES devices (id)
    );

    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      format TEXT NOT NULL,
      last_generated TEXT,
      next_generation TEXT,
      recipients TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Check if we need to seed the database with initial data
  const settingsCount = await db.get("SELECT COUNT(*) as count FROM settings")
  if (settingsCount.count === 0) {
    // Insert default settings
    await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", "theme", "futuristic-dark")
    await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", "polling_interval", "30")
    await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", "retention_days", "30")
    await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", "company_name", "Miles Education Private Limited")
    await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", "setup_complete", "false")
  }

  // Check if we need to create the admin user
  const usersCount = await db.get("SELECT COUNT(*) as count FROM users")
  if (usersCount.count === 0) {
    // Insert default admin user (password: admin)
    await db.run(
      "INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)",
      "admin",
      "admin@mileseducation.com",
      "admin", // In a real app, this would be hashed
      "Administrator",
      "admin",
    )
  }

  console.log("Database initialized successfully")
}

// Initialize Express server
const initExpressServer = () => {
  expressApp = express()
  const port = 5000

  // Middleware
  expressApp.use(cors())
  expressApp.use(bodyParser.json())
  expressApp.use(compression())
  expressApp.use(helmet())
  expressApp.use(morgan("dev"))

  // Serve static files from the Next.js build
  expressApp.use(express.static(path.join(__dirname, "../out")))

  // API routes
  expressApp.get("/api/health", (req: any, res: any) => {
    res.json({ status: "ok", version: app.getVersion() })
  })

  // API routes for devices
  expressApp.get("/api/devices", async (req: any, res: any) => {
    try {
      const devices = await db.all("SELECT * FROM devices ORDER BY name")
      res.json(devices)
    } catch (error) {
      console.error("Error fetching devices:", error)
      res.status(500).json({ error: "Failed to fetch devices" })
    }
  })

  // API routes for users
  expressApp.get("/api/users", async (req: any, res: any) => {
    try {
      const users = await db.all(
        "SELECT id, username, email, full_name, role, last_login, status FROM users ORDER BY username",
      )
      res.json(users)
    } catch (error) {
      console.error("Error fetching users:", error)
      res.status(500).json({ error: "Failed to fetch users" })
    }
  })

  // API routes for settings
  expressApp.get("/api/settings", async (req: any, res: any) => {
    try {
      const settings = await db.all("SELECT key, value FROM settings")
      const settingsObj = settings.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value
        return acc
      }, {})
      res.json(settingsObj)
    } catch (error) {
      console.error("Error fetching settings:", error)
      res.status(500).json({ error: "Failed to fetch settings" })
    }
  })

  // API routes for alerts
  expressApp.get("/api/alerts", async (req: any, res: any) => {
    try {
      const alerts = await db.all("SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 100")
      res.json(alerts)
    } catch (error) {
      console.error("Error fetching alerts:", error)
      res.status(500).json({ error: "Failed to fetch alerts" })
    }
  })

  // API routes for reports
  expressApp.get("/api/reports", async (req: any, res: any) => {
    try {
      const reports = await db.all("SELECT * FROM reports ORDER BY name")
      res.json(reports)
    } catch (error) {
      console.error("Error fetching reports:", error)
      res.status(500).json({ error: "Failed to fetch reports" })
    }
  })

  // Catch-all route to serve the Next.js app
  expressApp.get("*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../out/index.html"))
  })

  // Start the server
  server = expressApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })

  // Set up WebSocket server for real-time updates
  wss = new WebSocket.Server({ server })

  wss.on("connection", (ws) => {
    console.log("WebSocket client connected")

    ws.on("message", (message) => {
      console.log("Received message:", message)
    })

    ws.on("close", () => {
      console.log("WebSocket client disconnected")
    })
  })

  // Broadcast function for sending updates to all connected clients
  const broadcast = (data: any) => {
    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data))
        }
      })
    }
  }

  // Simulate some network activity for demo purposes
  setInterval(() => {
    const types = ["info", "warning", "error", "success"]
    const type = types[Math.floor(Math.random() * types.length)]
    const alert = {
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
      message: `This is a simulated ${type} alert for demo purposes.`,
      timestamp: new Date().toISOString(),
    }
    broadcast({ type: "alert", data: alert })
  }, 60000) // Every minute
}

const createWindow = (): void => {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#1A1A2E",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, "icons", "icon.png"),
    show: false, // Don't show until ready-to-show
  })

  // Load the app from the local server
  mainWindow.loadURL("http://localhost:5000")

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow?.show()
  })

  // Open DevTools in development
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
  }

  // Handle window close
  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault()
      mainWindow?.hide()
      return false
    }
    return true
  })
}

const createTray = (): void => {
  // Create tray icon
  const icon = nativeImage.createFromPath(path.join(__dirname, "icons", "tray-icon.png"))
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Miles Network Monitor",
      enabled: false,
      icon: nativeImage.createFromPath(path.join(__dirname, "icons", "icon-small.png")),
    },
    { type: "separator" },
    {
      label: "Show Dashboard",
      click: () => {
        mainWindow?.show()
      },
    },
    {
      label: "Check for Updates",
      click: () => {
        autoUpdater.checkForUpdatesAndNotify()
      },
    },
    { type: "separator" },
    {
      label: "Restart Server",
      click: () => {
        restartServer()
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        isQuitting = true
        app.quit()
      },
    },
  ])

  tray.setToolTip("Miles Network Monitor")
  tray.setContextMenu(contextMenu)

  tray.on("click", () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow?.show()
    }
  })
}

// Restart the server
const restartServer = (): void => {
  if (server) {
    server.close(() => {
      console.log("Server closed")
      initExpressServer()
      console.log("Server restarted")
    })
  } else {
    initExpressServer()
  }
}

// Set up IPC handlers
const setupIpcHandlers = (): void => {
  // Get app version
  ipcMain.handle("get-app-version", () => {
    return app.getVersion()
  })

  // Get settings
  ipcMain.handle("get-settings", async () => {
    try {
      const settings = await db.all("SELECT key, value FROM settings")
      return settings.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value
        return acc
      }, {})
    } catch (error) {
      console.error("Error fetching settings:", error)
      return {}
    }
  })

  // Save settings
  ipcMain.handle("save-settings", async (_, settings) => {
    try {
      for (const [key, value] of Object.entries(settings)) {
        await db.run(
          "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP",
          key,
          value,
          value,
        )
      }
      return { success: true }
    } catch (error) {
      console.error("Error saving settings:", error)
      return { success: false, error }
    }
  })

  // Check for updates
  ipcMain.handle("check-for-updates", () => {
    autoUpdater.checkForUpdatesAndNotify()
  })

  // Window control
  ipcMain.on("minimize-window", () => {
    mainWindow?.minimize()
  })

  ipcMain.on("maximize-window", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow?.maximize()
    }
  })

  ipcMain.on("close-window", () => {
    mainWindow?.hide()
  })
}

// Auto-updater events
autoUpdater.on("update-available", () => {
  dialog.showMessageBox({
    type: "info",
    title: "Update Available",
    message: "A new version is available. Downloading now...",
  })
})

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox({
      type: "info",
      title: "Update Ready",
      message: "Update has been downloaded. The application will restart to install the update.",
      buttons: ["Restart Now", "Later"],
    })
    .then((result) => {
      if (result.response === 0) {
        isQuitting = true
        autoUpdater.quitAndInstall()
      }
    })
})

// App events
app.on("ready", async () => {
  try {
    await initDatabase()
    initExpressServer()
    setupIpcHandlers()
    createWindow()
    createTray()

    // Check for updates
    autoUpdater.checkForUpdatesAndNotify()
  } catch (error) {
    console.error("Error during app initialization:", error)
    dialog.showErrorBox("Initialization Error", `Failed to initialize the application: ${error}`)
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  } else {
    mainWindow?.show()
  }
})

app.on("before-quit", () => {
  isQuitting = true
  if (server) {
    server.close()
  }
  if (db) {
    db.close()
  }
})
