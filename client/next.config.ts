// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   swcMinify: true, 
  
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
  
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'assets.aceternity.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'i.pravatar.cc',
//         pathname: '/**',
//       },
//     ],
//     formats: ['image/avif', 'image/webp'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
  
//   experimental: {
//     optimizePackageImports: ['framer-motion', 'lucide-react'],
//   },

// //   async redirects() {
// //   return [
// //     {
// //       source: 'https://www.vaphers.com/Contact-us',
// //       destination: 'https://www.vaphers.com/contact',
// //       permanent: true,
// //     },
// //     {
// //       source: 'https://www.vaphers.com/cntactd',
// //       destination: 'https://www.vaphers.com/contact',
// //       permanent: true,
// //     },
// //     {
// //       source: 'https://www.vaphers.com/services/ppc/local-services-ads',
// //       destination: 'https://www.vaphers.com/ppc-marketing',
// //       permanent: true,
// //     },
// //     {
// //       source: 'https://www.vaphers.com/services/ppc/local-services-ads',
// //       destination: 'https://www.vaphers.com/ppc-marketing',
// //       permanent: true,
// //     },
// //   ]
// // },


// // Testing New Optimization

//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production' ? {
//       exclude: ['error', 'warn'],
//     } : false,
//   },

//   // Optimize production builds
//   productionBrowserSourceMaps: false,
// }

// export default nextConfig








import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true, 
  
  eslint: {
    ignoreDuringBuilds: true,
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
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@headlessui/react', '@heroicons/react'],
  },

  // Webpack optimizations for Framer Motion and bundle size
  webpack: (config, { isServer }) => {
    // Optimize Framer Motion imports
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'framer-motion': 'framer-motion/dist/framer-motion.esm.js'
      }
    }
    
    // Additional optimizations for production
    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      }
    }
    
    return config
  },

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Disable source maps in production for faster builds
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
