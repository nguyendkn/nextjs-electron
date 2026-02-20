import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods to renderer
contextBridge.exposeInMainWorld("electronAPI", {
  // Platform info
  platform: process.platform,

  // App info
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),

  // System API
  system: {
    getInfo: (): Promise<{
      cpu: { usage: number; cores: number };
      memory: { usage: number; total: number; used: number };
    }> => ipcRenderer.invoke("system:get-info"),
  },

  // Updater API
  updater: {
    check: () => ipcRenderer.invoke("updater:check"),
    install: () => ipcRenderer.invoke("updater:install"),
    getStatus: () => ipcRenderer.invoke("updater:status"),
  },

  // Example IPC - ping/pong
  ping: () => ipcRenderer.invoke("ping"),
});
