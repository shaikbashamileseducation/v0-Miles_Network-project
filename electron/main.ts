import { app, BrowserWindow, Tray, Menu, nativeImage, dialog } from "electron"
import * as path from "path"
import { autoUpdater } from "electron-updater"
import { exec } from "child_process"
import * as fs from "fs"
import * as os from "os"

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit()
}

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let isQuitting = false

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

  // Load the app
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000"
  mainWindow.loadURL(serverUrl)

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
      label: "Start Server",
      click: () => {
        startServer()
      },
    },
    {
      label: "Stop Server",
      click: () => {
        stopServer()
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

// Start the monitoring server
const startServer = (): void => {
  const platform = os.platform()
  let command = ""

  if (platform === "win32") {
    command = "docker-compose -f C:\\Program Files\\MilesMonitor\\docker-compose.yml up -d"
  } else if (platform === "darwin") {
    command = "docker-compose -f /Applications/MilesMonitor.app/Contents/Resources/docker-compose.yml up -d"
  } else if (platform === "linux") {
    command = "docker-compose -f /opt/miles_monitor/docker-compose.yml up -d"
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      dialog.showErrorBox("Server Error", `Failed to start server: ${error.message}`)
      return
    }
    dialog.showMessageBox({
      type: "info",
      title: "Server Started",
      message: "Monitoring server has been started successfully.",
    })
  })
}

// Stop the monitoring server
const stopServer = (): void => {
  const platform = os.platform()
  let command = ""

  if (platform === "win32") {
    command = "docker-compose -f C:\\Program Files\\MilesMonitor\\docker-compose.yml down"
  } else if (platform === "darwin") {
    command = "docker-compose -f /Applications/MilesMonitor.app/Contents/Resources/docker-compose.yml down"
  } else if (platform === "linux") {
    command = "docker-compose -f /opt/miles_monitor/docker-compose.yml down"
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      dialog.showErrorBox("Server Error", `Failed to stop server: ${error.message}`)
      return
    }
    dialog.showMessageBox({
      type: "info",
      title: "Server Stopped",
      message: "Monitoring server has been stopped successfully.",
    })
  })
}

// Check if app should auto-start
const checkAutoStart = (): void => {
  const configPath = path.join(app.getPath("userData"), "config.json")

  try {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
      if (config.autoStart) {
        startServer()
      }
    } else {
      // Create default config
      const defaultConfig = {
        autoStart: true,
        autoUpdate: true,
      }
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
      startServer()
    }
  } catch (error) {
    console.error("Error reading config:", error)
  }
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
app.on("ready", () => {
  createWindow()
  createTray()
  checkAutoStart()

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify()
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
})
