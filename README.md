# Electron + Next.js App Router Template

A minimal template for building desktop applications using Electron and Next.js with the App Router architecture, written in TypeScript.

## Features

- ⚡ **Next.js 15** with App Router architecture and React 19 support
- 🖥️ **Electron 37** for cross-platform desktop applications
- 📘 **TypeScript 5.9** for enhanced type safety
- 🎨 **Tailwind CSS 4** for modern styling
- 🔧 **electron-builder** for packaging and distribution
- 🔄 **Hot reloading** in development mode
- 🛡️ **Security best practices** implemented with CSP
- 📦 **Minimal setup** with essential configurations only
- 🔍 **ESLint 9** with flat config for code quality and consistency
- 💅 **Prettier** for automatic code formatting

## Project Structure

```text
├── app/                    # Next.js App Router pages and components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry point
│   └── preload.ts        # Preload script for security
├── public/               # Static assets
├── dist/                 # Built application (generated)
├── out/                  # Next.js static export (generated)
├── package.json          # Dependencies and scripts
├── next.config.ts        # Next.js configuration (TypeScript)
├── tailwind.config.ts    # Tailwind CSS configuration
├── eslint.config.mjs     # ESLint 9 flat configuration
├── electron-builder.json # Electron builder configuration
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone or download this template
2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

This will:

1. Start the Next.js development server
2. Launch Electron with hot reloading enabled

### Building for Production

Build the application for distribution:

```bash
pnpm build
# or
npm run build
# or
yarn build
```

This will create distributable packages in the `dist/` directory.

### Available Scripts

- `dev` - Start development mode with hot reloading
- `build` - Build the application for production
- `build:nextjs` - Build only the Next.js application
- `build:electron` - Build only the Electron application
- `dist` - Create distributable packages
- `type-check` - Run TypeScript type checking
- `lint` - Run ESLint and fix issues automatically
- `lint:check` - Check for ESLint issues without fixing
- `format` - Format code with Prettier
- `format:check` - Check code formatting without fixing

## Configuration

### Next.js Configuration

The `next.config.ts` file is configured for static export with modern Next.js 15 features, optimized for Electron integration.

### Electron Configuration

The `electron-builder.json` file contains the packaging configuration for different platforms.

### Security

This template implements Electron security best practices:

- Context isolation enabled
- Node integration disabled in renderer
- Preload script for secure IPC communication

### Code Quality

The template includes comprehensive code quality tools:

- **ESLint 9** - Modern flat config for TypeScript, React, and Next.js with type-aware rules
- **Prettier** - Automatic code formatting with consistent style
- **Tailwind CSS 4** - Modern utility-first CSS framework with TypeScript config
- **TypeScript 5.9** - Enhanced type checking with strict settings for both Next.js and Electron
- **VS Code integration** - Automatic formatting and linting on save

## Customization

### Adding New Pages

Create new pages in the `app/` directory following Next.js App Router conventions:

```typescript
// app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>
}
```

### Electron IPC Communication

Use the preload script to expose safe APIs to the renderer process:

```typescript
// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  // Add your APIs here
})
```

## License

MIT License - feel free to use this template for your projects.
