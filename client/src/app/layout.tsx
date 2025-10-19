// app/layout.tsx
import './globals.css'
import Header from '@/app/Components/Global Components/Header'
import Footer from './Components/Global Components/Footer'

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
        <Footer/>
      </body>
    </html>
  )
}
