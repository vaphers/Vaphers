import '../globals.css'
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
  metadataBase: new URL('https://vaphers.com'),

  alternates: {
    canonical: 'https://vaphers.com/us',
    languages: {
      'en-US': 'https://vaphers.com/us',
      'x-default': 'https://vaphers.com/',
    },
  },

  title: {
    default:
      'Affordable Digital Marketing Agency in the USA | SEO, PPC & Web Development – Vaphers',
  },

  description:
    'Vaphers is a US-focused digital marketing agency delivering expert SEO, PPC advertising, and web development services. Grow your American business with data-driven strategies that convert.',

  keywords: [
    'digital marketing agency USA',
    'SEO services USA',
    'PPC agency USA',
    'web development USA',
    'ecommerce SEO USA',
    'affordable digital marketing USA',
  ],

  authors: [{ name: 'Vaphers' }],
  creator: 'Vaphers',
  publisher: 'Vaphers',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaphers.com/us',
    siteName: 'Vaphers USA',

    title: 'Affordable Digital Marketing Agency in the USA | Vaphers',

    description:
      'US-based SEO, PPC, and web development services built to drive traffic, leads, and revenue for American businesses.',

    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047482/vaphers-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vaphers USA – Digital Marketing Agency',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Agency in the USA | Vaphers',
    description:
      'Performance-driven SEO, PPC, and web development services for US businesses.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047482/vaphers-og-image.png',
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function USLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US" className={bungeeInline.variable}>
      <body>
        {children}

        <Toaster
          richColors
          position="top-right"
          closeButton
          duration={5000}
        />

        <SpeedInsights />
        <GoogleAnalytics gaId="G-0CXH1J99VZ" />
      </body>
    </html>
  )
}
