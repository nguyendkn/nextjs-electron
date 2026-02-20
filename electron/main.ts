import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import {
  checkForUpdates,
  getUpdateState,
  quitAndInstall,
  setupAutoUpdater,
} from "./updater";

const isDev = process.env.NODE_ENV === "development";

// Get the correct path to the static files
function getStaticPath(): string {
  if (isDev) {
    return path.join(__dirname, "../../out");
  } else {
    return path.join(__dirname, "../../out");
  }
}

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  const appName = app.getName();
  const version = app.getVersion();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: `${appName} v${version}`,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    titleBarStyle: "hiddenInset",
    autoHideMenuBar: true,
    show: false,
  });

  mainWindow.setMenu(null);

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  // Suppress DevTools protocol warnings
  if (isDev) {
    mainWindow.webContents.on("console-message", (event, level, message) => {
      // Filter out harmless DevTools Autofill warnings
      if (message.includes("Autofill.enable") || message.includes("Autofill.setAddresses")) {
        return;
      }
    });
  }

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    // DevTools can be opened manually with Ctrl+Shift+I or Cmd+Option+I
    // Uncomment the next line if you want DevTools to open automatically:
    // mainWindow.webContents.openDevTools();
  } else {
    const staticPath = getStaticPath();
    const indexPath = path.join(staticPath, "index.html");

    console.log("Static path:", staticPath);
    console.log("Index path:", indexPath);
    console.log("Index exists:", fs.existsSync(indexPath));

    if (fs.existsSync(indexPath)) {
      mainWindow.loadFile(indexPath);
    } else {
      const altPaths = [
        path.join(__dirname, "../out/index.html"),
        path.join(process.resourcesPath || "", "app/out/index.html"),
        path.join(app.getAppPath(), "out/index.html"),
      ];

      let loaded = false;
      for (const altPath of altPaths) {
        console.log("Trying path:", altPath, "exists:", fs.existsSync(altPath));
        if (fs.existsSync(altPath)) {
          mainWindow.loadFile(altPath);
          loaded = true;
          break;
        }
      }

      if (!loaded) {
        console.error("Could not find index.html. Tried paths:", [
          indexPath,
          ...altPaths,
        ]);
        mainWindow.loadURL(
          `data:text/html,<h1>Error: Could not load application</h1><p>Index file not found</p>`,
        );
      }
    }
  }

  setupAutoUpdater(mainWindow);
}

// Setup all IPC handlers
function setupIpcHandlers(): void {
  // App version
  ipcMain.handle("get-app-version", () => {
    return app.getVersion();
  });

  // System info example
  ipcMain.handle("system:get-info", async () => {
    const os = await import("os");
    const cpus = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    return {
      cpu: {
        usage:
          cpus.reduce((acc, cpu) => {
            const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
            return acc + ((total - cpu.times.idle) / total) * 100;
          }, 0) / cpus.length,
        cores: cpus.length,
      },
      memory: {
        usage: (usedMemory / totalMemory) * 100,
        total: totalMemory,
        used: usedMemory,
      },
    };
  });

  // Updater handlers
  ipcMain.handle("updater:check", async () => {
    await checkForUpdates();
    return getUpdateState();
  });

  ipcMain.handle("updater:install", () => {
    quitAndInstall();
  });

  ipcMain.handle("updater:status", () => {
    return getUpdateState();
  });

  // Example IPC handler - ping/pong
  ipcMain.handle("ping", () => {
    return "pong";
  });
}

// App lifecycle
app.whenReady().then(() => {
  setupIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
