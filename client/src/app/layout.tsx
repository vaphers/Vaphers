import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Bungee_Inline, Bungee_Shade, Montserrat, Libre_Franklin, Outfit, JetBrains_Mono } from 'next/font/google'
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


const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

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

// Initialize JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata = {
  metadataBase: new URL('https://www.vaphers.com/'),

  title: {
    default:
      'SEO for Interior Designers | Vaphers — Premier Search Visibility & Growth Agency',
  },

  description:
    'Vaphers is the specialized SEO agency for interior designers, luxury studios, and architectural firms. Dominate local search, get recommended in AI search engines, and attract affluent clients ready to hire.',

  alternates: {
    canonical: 'https://www.vaphers.com/',
  },

  keywords: [
    'SEO for interior designers',
    'interior design SEO',
    'interior designer marketing',
    'luxury interior design SEO',
    'local SEO for interior designers',
    'SEO for design studios',
    'interior design lead generation',
    'SEO for architects and designers',
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
    title: 'SEO for Interior Designers | Vaphers — Premier Search Visibility & Growth Agency',
    description:
      'Specialized SEO and organic client acquisition for interior designers, architects, and luxury studios. Dominate local search and get discovered by high-budget clients.',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772636628/Leading_paid_search_marketing_agency_owavgz.png',
        width: 1200,
        height: 630,
        alt: 'Vaphers: SEO for Interior Designers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEO for Interior Designers | Vaphers — Premier Search Visibility & Growth Agency',
    description:
      'Specialized SEO and organic client acquisition for interior designers, architects, and luxury studios. Dominate local search and get discovered by high-budget clients.',
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

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      signInUrl="/write-for-us/login"
      signUpUrl="/write-for-us/signup"
      signInFallbackRedirectUrl="/write-for-us/dashboard"
      signUpFallbackRedirectUrl="/write-for-us/dashboard"
    >
      <html
        lang="en"
        className={`${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable} ${outfit.variable} ${libreFranklin.variable} ${jetbrainsMono.variable}`}
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
    </ClerkProvider>
  )
}