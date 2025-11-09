import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional SEO Services | Boost Your Rankings & Traffic',
  description: 'Drive more organic traffic with expert SEO services. We help businesses rank higher on Google, increase qualified leads, and grow revenue through proven SEO strategies.',
  keywords: 'SEO services, search engine optimization, digital marketing, Google rankings, organic traffic',
  openGraph: {
    title: 'Professional SEO Services | Boost Your Rankings & Traffic',
    description: 'Drive more organic traffic with expert SEO services. Increase rankings and revenue.',
    type: 'website',
  },
}

export default function SEOServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
  <NavBar/>
  {children}
  <Footer/>
  </>
}
