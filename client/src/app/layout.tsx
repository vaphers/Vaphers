// app/layout.tsx
import './globals.css'
import Header from '@/PageComponents/Global Components/Header'
import Footer from '@/PageComponents/Global Components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Bungee_Inline, Bungee_Shade, Montserrat, Spectral } from 'next/font/google'
import Script from 'next/script'; 

const bungeeInline = Bungee_Inline({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee-inline',
})

const bungeeShade = Bungee_Shade({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee-shade',
})

const montserrat = Montserrat({
  weight: ['500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const spectral = Spectral({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spectral',
})

export const metadata = {
  title: {
    default: 'Affordable Digital Marketing Agency | Vaphers - SEO, PPC & Web Development',
  },
  description: 'Vaphers is an affordable digital marketing agency offering expert SEO, PPC advertising, and web development services. Drive qualified traffic and grow your revenue with data-driven strategies that deliver measurable results.',
  keywords: ['affordable digital marketing agency', 'digital marketing services', 'SEO services', 'PPC advertising', 'web development', 'ecommerce SEO', 'content marketing', 'online marketing agency'],
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
    url: 'https://vaphers.com',
    siteName: 'Vaphers',
    title: 'Affordable Digital Marketing Agency | Vaphers',
    description: 'Expert SEO, PPC, and web development services that grow your revenue. Get data-driven digital marketing strategies without the premium agency price tag.',
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
    description: 'Expert SEO, PPC, and web development services that deliver measurable results and grow your revenue.',
    images: ['https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047482/vaphers-og-image.png'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en"
      className={`${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable} ${spectral.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0CXH1J99VZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0CXH1J99VZ');
          `}
        </Script>
      </head>

      <body>
        <Header/>
        {children}
        <SpeedInsights />
        <Footer/>
      </body>
    </html>
  )
}
