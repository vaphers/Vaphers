// app/layout.tsx
import './globals.css'
import Header from '@/PageComponents/Global Components/Header'
import Footer from '@/PageComponents/Global Components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: { default: 'Vaphers', template: '%s | Virtual Orbit' },
  description: 'Digital marketing, SEO, PPC, and web development services.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <SpeedInsights />
        <Footer/>
      </body>
    </html>
  )
}
