import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, 
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  async redirects() {
    return [
      {
        source: '/industries/:slug*',
        destination: '/seo-services',
        permanent: true,
      },
      {
        source: '/seo-services/industries/:slug*',
        destination: '/seo-services',
        permanent: true,
      },

      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/blogs',
        permanent: true,
      },

      {
        source: '/seo-audit',
        destination: '/seo-services/seo-audit-services',
        permanent: true,
      },
      {
        source: '/free-seo-audit',
        destination: '/seo-services/seo-audit-services',
        permanent: true,
      },
    ]
  },


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@headlessui/react', '@heroicons/react'],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'framer-motion': 'framer-motion/dist/framer-motion.esm.js'
      }
    }
    
    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      }
    }
    
    return config
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  productionBrowserSourceMaps: false,
  
  // Redirect rules (when you're ready to use them)
  // async redirects() {
  //   return [
  //     {
  //       source: '/Contact-us',
  //       destination: '/contact',
  //       permanent: true,
  //     },
  //     {
  //       source: '/cntactd',
  //       destination: '/contact',
  //       permanent: true,
  //     },
  //     {
  //       source: '/services/ppc/local-services-ads',
  //       destination: '/ppc-marketing',
  //       permanent: true,
  //     },
  //   ]
  // },
}

export default nextConfig
