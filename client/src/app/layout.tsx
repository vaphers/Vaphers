// app/layout.tsx
import './globals.css'
import Header from '@/PageComponents/Global Components/Header'
import Footer from '@/PageComponents/Global Components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Bungee_Inline, Bungee_Shade, Montserrat } from 'next/font/google'

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

export const metadata = {
  title: { default: 'Vaphers', template: '%s | Virtual Orbit' },
  description: 'Digital marketing, SEO, PPC, and web development services.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en"
      className={`${bungeeInline.variable} ${bungeeShade.variable} ${montserrat.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
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
