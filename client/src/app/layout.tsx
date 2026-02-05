import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Bungee_Inline } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@/components/ui/sonner'

const bungeeInline = Bungee_Inline({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee-inline',
})

export const metadata = {
  metadataBase: new URL('https://vaphers.com/'),

  title: {
    default:
      'Affordable Digital Marketing Agency | SEO, PPC & Web Development - Vaphers',
  },

  description:
    'Vaphers is an affordable digital marketing agency offering expert SEO, PPC advertising, and web development services. Drive qualified traffic and grow your revenue with data-driven strategies that deliver measurable results.',

  alternates: {
    canonical: 'https://vaphers.com/',
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
    url: 'https://vaphers.com/',
    siteName: 'Vaphers',
    title: 'Affordable Digital Marketing Agency | Vaphers',
    description:
      'Expert SEO, PPC, and web development services that grow your revenue.',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047482/vaphers-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vaphers - Affordable Digital Marketing Agency',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Digital Marketing Agency | Vaphers',
    description:
      'Expert SEO, PPC, and web development services that deliver measurable results.',
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
    <html lang="en" className={bungeeInline.variable}>
      <head>
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


// gg