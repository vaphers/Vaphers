import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ecommerce SEO That Skyrocket Traffic & Sales | Vaphers',
  description:
    'Turn your online store into a revenue machine. Our ecommerce SEO services increase product rankings, drive high-intent organic traffic, and boost sales for Shopify, WooCommerce, and fast-growing brands.',

  keywords: [
    'ecommerce SEO services',
    'Shopify SEO optimization',
    'WooCommerce SEO',
    'online store SEO',
    'product page optimization',
    'ecommerce SEO agency',
    'affordable ecommerce SEO',
    'ecommerce SEO consultant',
    'Google Shopping optimization',
    'technical ecommerce SEO'
  ],

  authors: [{ name: 'Vaphers' }],
  creator: 'Vaphers',
  publisher: 'Vaphers',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vaphers.com/seo-services/ecommerce-seo-services',
    title: 'High-Performance Ecommerce SEO | More Rankings. More Sales.',
    description:
      'Increase visibility, outrank competitors, and drive consistent sales with conversion-focused ecommerce SEO strategies.',
    siteName: 'Vaphers',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761651901/ProductPageOptimization_wllf6g.png',
        width: 1200,
        height: 630,
        alt: 'Ecommerce SEO Services by Vaphers',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.vaphers.com/seo-services/ecommerce-seo-services',
  },
}

export default function EcommerceSEOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}