import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Shopify Development Services | Custom Store Design & Setup',
  description: 'Expert Shopify store development services. Launch your high-converting e-commerce store with custom design, app integration, and ongoing support. Get started with professional Shopify developers today.',
  keywords: [
    'Shopify development',
    'Shopify store design',
    'custom Shopify store',
    'Shopify theme customization',
    'Shopify app integration',
    'e-commerce development',
    'Shopify Plus development',
    'online store setup',
    'Shopify migration services',
    'Shopify maintenance'
  ],
  authors: [{ name: 'Muhammad Asad' }],
  creator: 'Vaphers',
  publisher: 'Vaphers',
  metadataBase: new URL('https://www.vaphers.com'),
  alternates: {
    canonical: '/shopify-development',
  },
  openGraph: {
    title: 'Professional Shopify Development Services | Custom Store Design',
    description: 'Launch a high-converting Shopify store with expert development, custom design, and seamless integrations. Trusted by 5.8M+ merchants worldwide.',
    url: 'https://www.vaphers.com/website-development-services/shopify-website-development',
    siteName: 'Your Company Name',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ShopifyDevelopmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
