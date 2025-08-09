import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js Electron App',
  description: 'A minimal Electron app with Next.js App Router and TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <div className='container'>
          <header className='header'>
            <h1>Next.js Electron App</h1>
            <nav className='nav'>
              <Link href='/'>Home</Link>
              <Link href='/about'>About</Link>
            </nav>
          </header>
          <main className='main'>{children}</main>
          <footer className='footer'>
            <p>Built with Next.js App Router + Electron + TypeScript</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
