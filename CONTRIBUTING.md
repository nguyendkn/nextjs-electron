# Contributing to Electron Next.js Base

Thank you for your interest in contributing! Here are some guidelines to help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Start development: `pnpm run electron:dev`

## Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Commit with clear messages: `git commit -m "Add feature: description"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request

## Code Style

- Use TypeScript for type safety
- Follow the existing code style
- Run `pnpm run lint` before committing
- Keep components simple and focused

## Testing

- Test on all target platforms when possible
- Ensure the app builds successfully: `pnpm run electron:build`
- Test both development and production modes

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure all checks pass
- Keep PRs focused on a single feature/fix

## Need Help?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Check existing issues before creating new ones

Thank you for contributing! 🎉
