import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

async function createWindow(): Promise<void> {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false, // Don't show until ready-to-show
    webPreferences: {
      // Security: Enable context isolation and disable node integration
      contextIsolation: true,
      nodeIntegration: false,
      // Enable preload script for secure IPC
      preload: join(__dirname, 'preload.js'),
      // Additional security settings
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      webSecurity: true,
      // Enhanced security for Electron 37+
      sandbox: false, // Keep false for preload script access
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      // Performance optimizations
      backgroundThrottling: false,
    },
    // Modern window styling
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    frame: true,
    // Window icon (you can add an icon file to public folder)
    // icon: join(__dirname, '../public/icon.png'),
  })

  // Load the app
  if (isDev) {
    // Development: load from Next.js dev server
    try {
      await mainWindow.loadURL('http://localhost:3001')
      // Open DevTools in development
      mainWindow.webContents.openDevTools()
    } catch (error) {
      console.error('Failed to load dev server:', error)
      // Fallback to static files if dev server is not available
      await mainWindow.loadFile(join(__dirname, '../../out/index.html'))
    }
  } else {
    // Production: load from static files
    try {
      await mainWindow.loadFile(join(__dirname, '../../out/index.html'))
    } catch (error) {
      console.error('Failed to load static files:', error)
    }
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) {
      mainWindow.show()

      // Focus on window creation
      if (isDev) {
        mainWindow.focus()
      }
    }
  })

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "child-src 'self'",
              "frame-src 'self'",
              "worker-src 'self' blob:",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              "manifest-src 'self'",
            ].join('; '),
          ],
        },
      })
    }
  )

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Security: Prevent new window creation
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Open external links in default browser
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // Security: Prevent navigation to external websites
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (
      parsedUrl.origin !== 'http://localhost:3000' &&
      !navigationUrl.startsWith('file://')
    ) {
      event.preventDefault()
      shell.openExternal(navigationUrl)
    }
  })
}

// App event handlers
app.whenReady().then(() => {
  createWindow()

  // macOS: Re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Security: Prevent new window creation from renderer
app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
})

// IPC handlers (examples)
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})

ipcMain.handle('get-platform', () => {
  return process.platform
})

// Example: Handle app info request
ipcMain.handle('get-app-info', () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
    chromeVersion: process.versions.chrome,
  }
})

// Graceful shutdown
app.on('before-quit', () => {
  // Perform cleanup here if needed
})
