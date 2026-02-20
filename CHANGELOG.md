# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-20

### Added

- Complete Electron + Next.js base project structure
- Auto-updater functionality with electron-updater
- GitHub Actions CI/CD for automated builds
- Example IPC communication (ping/pong, system info)
- Type-safe preload script with TypeScript
- Tailwind CSS 4 integration
- Development and production build scripts
- Multi-platform build support (Windows, macOS, Linux)
- Comprehensive documentation (README, CONTRIBUTING)
- MIT License

### Changed

- Cleaned up application-specific code
- Simplified to essential Electron base components
- Updated to latest dependencies (Electron 33, Next.js 16, React 19)
- Modernized build configuration

### Removed

- Application-specific features (notes, notebooks, bash executor)
- Application-specific services and utilities
- Application-specific components and UI
- Obsolete documentation and planning files
- Unused dependencies

### Security

- Context isolation enabled
- Node integration disabled in renderer process
- Secure IPC communication via preload scripts
- No eval() or remote code execution

[1.0.0]: https://github.com/your-username/your-repo-name/releases/tag/v1.0.0
