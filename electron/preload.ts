import { contextBridge, ipcRenderer } from "electron"

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  // Server control
  startServer: () => ipcRenderer.invoke("start-server"),
  stopServer: () => ipcRenderer.invoke("stop-server"),

  // App settings
  getSettings: () => ipcRenderer.invoke("get-settings"),
  saveSettings: (settings: any) => ipcRenderer.invoke("save-settings", settings),

  // Updates
  checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),

  // App info
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),

  // Window control
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
})
