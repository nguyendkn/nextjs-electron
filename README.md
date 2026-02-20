# Electron + Next.js Base Project

A complete, production-ready starter template for building cross-platform desktop applications with Electron and Next.js.

## ✨ Features

- ⚡ **Electron 33+** - Latest Electron with native Node.js integration
- 🚀 **Next.js 16+** - Modern React framework with App Router
- ⚛️ **React 19+** - Latest React with Concurrent Features
- 📘 **TypeScript** - Full type safety across the stack
- 🎨 **Tailwind CSS 4** - Modern utility-first CSS framework
- 🔄 **Auto-updater** - Built-in automatic updates with electron-updater
- 🔗 **IPC Communication** - Type-safe main/renderer process communication
- 🤖 **GitHub Actions** - Automated builds for Windows, macOS, and Linux
- 📦 **Static Export** - Next.js static site generation for Electron
- 🛡️ **Security** - Context isolation and preload scripts

## 📋 Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- Git

## 🚀 Quick Start

### Clone and Install

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
pnpm install
```

### Development

Run the app in development mode with hot-reload:

```bash
pnpm run electron:dev
```

This starts:

- Next.js dev server on `http://localhost:3000`
- Electron app with DevTools open

### Building

Build the app for your current platform:

```bash
pnpm run electron:build
```

Build for specific platforms:

```bash
# Windows
pnpm run electron:build:win

# macOS
pnpm run electron:build:mac

# Linux
pnpm run electron:build:linux
```

Built files will be in the `release/` directory.

## 📁 Project Structure

```
├── .github/workflows/   # GitHub Actions CI/CD
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── electron/           # Electron main process
│   ├── main.ts         # Main process entry
│   ├── preload.ts      # Preload script (IPC bridge)
│   ├── updater.ts      # Auto-updater logic
│   ├── launch.js       # Development launcher
│   └── tsconfig.json   # Electron TypeScript config
├── public/             # Static assets
├── dist-electron/      # Compiled Electron files (auto-generated)
├── out/                # Next.js build output (auto-generated)
├── release/            # Built application packages (auto-generated)
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🔧 Configuration

### Application Info

Update in `package.json`:

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "Your app description"
}
```

### Electron Builder

Configure build settings in `package.json` under the `build` key:

```json
{
  "build": {
    "appId": "com.yourcompany.yourapp",
    "productName": "Your App Name",
    "publish": {
      "provider": "github",
      "owner": "your-github-username",
      "repo": "your-repo-name"
    }
  }
}
```

### Icons

Replace icons in `public/`:

- `icon.ico` - Windows icon
- `icon.icns` - macOS icon
- `icon.png` - Linux icon (512x512 recommended)

## 🔗 Adding IPC Handlers

### 1. Define Handler in Main Process

In `electron/main.ts`:

```typescript
function setupIpcHandlers(): void {
  ipcMain.handle("my-handler", async (event, arg) => {
    // Your logic here
    return "result";
  });
}
```

### 2. Expose API in Preload

In `electron/preload.ts`:

```typescript
contextBridge.exposeInMainWorld("electronAPI", {
  myApi: (arg: string) => ipcRenderer.invoke("my-handler", arg),
});

// Update TypeScript declaration
declare global {
  interface Window {
    electronAPI: {
      myApi: (arg: string) => Promise<string>;
    };
  }
}
```

### 3. Use in React Component

```typescript
const result = await window.electronAPI.myApi("hello");
```

## 🤖 GitHub Actions

### Automated Builds

The project includes GitHub Actions workflow that:

- Builds for Windows, macOS, and Linux
- Uploads artifacts
- Creates GitHub releases on version tags

### Triggering Builds

**Automatic (on git tag):**

```bash
git tag v1.0.0
git push origin v1.0.0
```

**Manual:**

- Go to Actions tab in GitHub
- Run "Build and Release Electron App" workflow

### Release Configuration

1. Set up GitHub token (automatically available in Actions)
2. Configure in `package.json`:

```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "your-username",
      "repo": "your-repo"
    }
  }
}
```

## 📦 Auto-Updates

The app includes built-in auto-update functionality:

- Checks for updates on startup
- Downloads updates in background
- Prompts user to install
- Works with GitHub Releases

Update check is in `electron/updater.ts`.

## 🛠️ Available Scripts

```bash
# Development
pnpm run dev              # Next.js dev server only
pnpm run electron:dev     # Full Electron dev mode

# Building
pnpm run build            # Build Next.js app
pnpm run electron:compile # Compile Electron TypeScript
pnpm run electron:build   # Full build for current platform

# Platform-specific builds
pnpm run electron:build:win   # Windows
pnpm run electron:build:mac   # macOS
pnpm run electron:build:linux # Linux

# Other
pnpm run lint             # Run ESLint
pnpm run start            # Start Next.js production server
```

## 🔒 Security

- ✅ Context isolation enabled
- ✅ Node integration disabled in renderer
- ✅ Preload scripts for secure IPC
- ✅ Content Security Policy ready
- ✅ No eval() or remote code execution

## 📚 Tech Stack

- **Electron** - Desktop app framework
- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **electron-updater** - Auto-updates
- **electron-builder** - Packaging
- **electron-log** - Logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/)
- [Next.js](https://nextjs.org/)
- [electron-builder](https://www.electron.build/)
- [electron-updater](https://www.electron.build/auto-update)

## 💬 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/your-repo/issues)
- 💡 Discussions: [GitHub Discussions](https://github.com/your-username/your-repo/discussions)

---

Made with ❤️ using Electron + Next.js
