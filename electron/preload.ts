import { contextBridge, ipcRenderer } from 'electron'

// Define the API interface for type safety
interface ElectronAPI {
  getAppVersion: () => Promise<string>
  getPlatform: () => Promise<string>
  getAppInfo: () => Promise<{
    name: string
    version: string
    platform: string
    arch: string
    electronVersion: string
    nodeVersion: string
    chromeVersion: string
  }>
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const electronAPI: ElectronAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
}

// Use contextBridge to securely expose APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// Type declaration for the global window object
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
