'use client'

import { useEffect, useState } from 'react'

interface AppInfo {
  name: string
  version: string
  platform: string
  arch: string
  electronVersion: string
  nodeVersion: string
  chromeVersion: string
}

interface ElectronAPI {
  getAppInfo: () => Promise<AppInfo>
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export default function Home() {
  const [isElectron, setIsElectron] = useState(false)
  const [platform, setPlatform] = useState('')
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      // Check if running in Electron
      const userAgent = navigator.userAgent.toLowerCase()
      const electronDetected = userAgent.indexOf('electron') > -1
      setIsElectron(electronDetected)

      // Get platform info
      const getPlatform = () => {
        if (typeof window !== 'undefined') {
          // Modern approach using userAgent parsing
          const userAgent = navigator.userAgent
          if (userAgent.includes('Win')) return 'Windows'
          if (userAgent.includes('Mac')) return 'macOS'
          if (userAgent.includes('Linux')) return 'Linux'
          if (userAgent.includes('X11')) return 'Unix'
        }
        return 'Unknown'
      }
      setPlatform(getPlatform())

      // Get Electron app info if available
      if (
        electronDetected &&
        typeof window !== 'undefined' &&
        window.electronAPI
      ) {
        try {
          const info = await window.electronAPI.getAppInfo()
          setAppInfo(info)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to get app info:', error)
        }
      }

      setLoading(false)
    }

    initializeApp()
  }, [])

  const handleButtonClick = () => {
    alert('Hello from Next.js App Router in Electron!')
  }

  return (
    <div className='page'>
      <h2>Welcome to Your Desktop App!</h2>

      <div className='info-grid'>
        <div className='info-card'>
          <h3>🚀 Next.js 15</h3>
          <p>Using the latest App Router architecture with React 19 support</p>
        </div>

        <div className='info-card'>
          <h3>🖥️ Electron</h3>
          <p>Cross-platform desktop application framework</p>
        </div>

        <div className='info-card'>
          <h3>📘 TypeScript</h3>
          <p>Type-safe development with full IntelliSense support</p>
        </div>

        <div className='info-card'>
          <h3>⚡ Hot Reload</h3>
          <p>Fast development with instant updates</p>
        </div>
      </div>

      <div className='status'>
        <p>
          <strong>Environment:</strong>{' '}
          {isElectron ? 'Electron Desktop App' : 'Web Browser'}
        </p>
        <p>
          <strong>Platform:</strong> {platform}
        </p>
        {appInfo && (
          <>
            <p>
              <strong>App Name:</strong> {appInfo.name}
            </p>
            <p>
              <strong>App Version:</strong> {appInfo.version}
            </p>
            <p>
              <strong>Electron:</strong> {appInfo.electronVersion}
            </p>
            <p>
              <strong>Node.js:</strong> {appInfo.nodeVersion}
            </p>
            <p>
              <strong>Chrome:</strong> {appInfo.chromeVersion}
            </p>
          </>
        )}
        {!isElectron && (
          <p>
            <strong>Node.js:</strong> Not Available (Web Browser)
          </p>
        )}
        {loading && <p>Loading app information...</p>}
      </div>

      <div className='actions'>
        <button onClick={handleButtonClick} className='button'>
          Test Interaction
        </button>
      </div>

      <div className='getting-started'>
        <h3>Getting Started</h3>
        <ul>
          <li>
            Edit <code>app/page.tsx</code> to modify this page
          </li>
          <li>
            Add new pages in the <code>app/</code> directory
          </li>
          <li>
            Customize the Electron main process in <code>electron/main.ts</code>
          </li>
          <li>
            Build for production with <code>npm run build</code>
          </li>
        </ul>
      </div>
    </div>
  )
}
