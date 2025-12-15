import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'High-Performance WordPress Website Development Services',
  description: 'Expert WordPress website development services. Get a custom, mobile-responsive WordPress site built for SEO and conversions. From $2,000. Free consultation available.',
  keywords: 'WordPress development, WordPress website design, custom WordPress development, WordPress developer, WooCommerce development, WordPress agency',
  openGraph: {
    title: 'Professional WordPress Website Development | Custom Design & Development',
    description: 'Expert WordPress website development services. Get a custom, mobile-responsive WordPress site built for SEO and conversions.',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1762166010/FixItNow_fbpzfx.png',
        width: 1200,
        height: 630,
        alt: 'WordPress Website Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional WordPress Website Development',
    description: 'Expert WordPress website development services. Custom, mobile-responsive sites built for SEO and conversions.',
    images: ['https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1762166010/FixItNow_fbpzfx.png'],
  },
  alternates: {
    canonical: 'https://www.vaphers.com/website-development-services/wordpress-website-development',
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
}

export default function WordPressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
