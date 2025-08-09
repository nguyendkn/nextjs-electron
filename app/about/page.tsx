export default function About() {
  return (
    <div className='page'>
      <h2>About This Template</h2>

      <div className='content'>
        <p>
          This is a minimal template for building desktop applications using
          Electron and Next.js with the App Router architecture, all written in
          TypeScript.
        </p>

        <h3>Features</h3>
        <ul>
          <li>⚡ Next.js 15 with App Router and React 19</li>
          <li>🖥️ Electron 37 for cross-platform desktop apps</li>
          <li>📘 Full TypeScript 5.9 support with enhanced type safety</li>
          <li>🎨 Tailwind CSS 4 for modern styling</li>
          <li>🔧 electron-builder for packaging</li>
          <li>🔄 Hot reloading in development</li>
          <li>🛡️ Enhanced security best practices with CSP</li>
          <li>🔍 ESLint 9 with flat config and type-aware rules</li>
        </ul>

        <h3>Architecture</h3>
        <p>
          This template follows current best practices for Electron + Next.js
          integration:
        </p>
        <ul>
          <li>
            <strong>Renderer Process:</strong> Next.js App Router handles the UI
          </li>
          <li>
            <strong>Main Process:</strong> Electron manages windows and system
            integration
          </li>
          <li>
            <strong>Security:</strong> Context isolation and preload scripts for
            safe IPC
          </li>
          <li>
            <strong>Build:</strong> Static export for production packaging
          </li>
        </ul>

        <h3>Development</h3>
        <p>
          In development mode, Next.js runs its dev server and Electron loads
          from
          <code>http://localhost:3001</code>. In production, Next.js exports
          static files that Electron serves locally with enhanced security.
        </p>

        <div className='tech-stack'>
          <h3>Technology Stack</h3>
          <div className='tech-grid'>
            <div className='tech-item'>
              <strong>Frontend:</strong> Next.js 15, React 19, TypeScript 5.9
            </div>
            <div className='tech-item'>
              <strong>Desktop:</strong> Electron 37
            </div>
            <div className='tech-item'>
              <strong>Styling:</strong> Tailwind CSS 4 with TypeScript config
            </div>
            <div className='tech-item'>
              <strong>Code Quality:</strong> ESLint 9, Prettier, type-aware
              linting
            </div>
            <div className='tech-item'>
              <strong>Build:</strong> electron-builder, Next.js static export
            </div>
            <div className='tech-item'>
              <strong>Development:</strong> Hot reloading, enhanced TypeScript
              checking
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
