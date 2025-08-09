import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable static export for Electron
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure trailing slash for static files
  trailingSlash: true,

  // Modern Next.js 15+ features
  experimental: {
    // Enable React 19 features
    reactCompiler: false, // Can be enabled when React Compiler is stable
    // Optimize bundle size
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Configure asset prefix for production builds
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',

  // Configure webpack for Electron compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude Node.js modules from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      }
    }

    return config
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Configure ESLint
  eslint: {
    // Disable ESLint during builds (optional)
    ignoreDuringBuilds: false,
  },

  // Configure TypeScript
  typescript: {
    // Disable type checking during builds (optional)
    ignoreBuildErrors: false,
  },
}

export default nextConfig
