import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Bungee_Inline, Bungee_Shade, Montserrat, Libre_Franklin } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@/components/ui/sonner'
import { Suspense } from 'react'

// Initialize Bungee Inline
const bungeeInline = Bungee_Inline({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee-inline',
})

// Initialize Bungee Shade
const bungeeShade = Bungee_Shade({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee-shade',
})

// Initialize Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

// Initialize Libre Franklin
const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-libre-franklin',
})

export const metadata = {
  metadataBase: new URL('https://www.vaphers.com/'),

  title: {
    default:
      'Vaphers: Data-Driven SEO & Performance Marketing — America’s Top-Rated Growth Agency',
  },

  description:
    'Vaphers is an affordable digital marketing agency offering expert SEO, PPC advertising, and web development services. Drive qualified traffic and grow your revenue with data-driven strategies that deliver measurable results.',

  alternates: {
    canonical: 'https://www.vaphers.com/',
  },

  keywords: [
    'affordable digital marketing agency',
    'digital marketing services',
    'SEO services',
    'PPC advertising',
    'web development',
    'ecommerce SEO',
    'content marketing',
    'online marketing agency',
  ],

  authors: [{ name: 'Vaphers' }],
  creator: 'Vaphers',
  publisher: 'Vaphers',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vaphers.com/',
    siteName: 'Vaphers',
    title: 'Vaphers: Data-Driven SEO & Performance Marketing — America’s Top-Rated Growth Agency',
    description:
      'We don’t just rank keywords; we scale businesses. By merging elite frontend engineering with precision SEO strategies, Vaphers helps brands dominate search results and achieve measurable, 4x revenue growth through technical excellence and aggressive digital marketing..',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772636628/Leading_paid_search_marketing_agency_owavgz.png',
        width: 1200,
        height: 630,
        alt: 'Vaphers: Data-Driven SEO & Performance Marketing',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Vaphers: Data-Driven SEO & Performance Marketing — America’s Top-Rated Growth Agency',
    description:
      'We don’t just rank keywords; we scale businesses. By merging elite frontend engineering with precision SEO strategies, Vaphers helps brands dominate search results and achieve measurable, 4x revenue growth through technical excellence and aggressive digital marketing..',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047482/vaphers-og-image.png',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html
  lang="en"
  className={`${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable} ${libreFranklin.variable}`}
>
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="R7lOm40+Rsly7oGYYcI9cQ" async></script>
        <meta
          name="google-site-verification"
          content="_jKz-Nn1SbmybTMfTSQNuWSiY79pDFJTVfNEqZKc33w"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>

      <body>
        {children}

        <Toaster richColors position="top-right" closeButton duration={5000} />

        <SpeedInsights />
        <GoogleAnalytics gaId="G-0CXH1J99VZ" />
      </body>
    </html>
  )
}