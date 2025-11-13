import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable Ecommerce SEO Services | Shopify & WooCommerce SEO | Vaphers',
  description: 'Expert ecommerce SEO services for Shopify, WooCommerce, and online stores. Increase organic traffic, improve product rankings, and boost sales with our proven SEO strategies. Get a free audit today!',
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
    title: 'Affordable Ecommerce SEO Services | Shopify & WooCommerce SEO',
    description: 'Boost your online store visibility with expert ecommerce SEO. Specializing in Shopify, WooCommerce, and multi-platform optimization.',
    siteName: 'Vaphers',
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
