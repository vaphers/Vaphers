import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI-Focused SEO Services in USA Built to Scale Your Business | Vaphers',
  description:
    'Grow your business in the USA with ROI-driven SEO services. We improve Google rankings, bring qualified traffic, and convert search visibility into revenue.',
  keywords:
    'SEO services USA, SEO agency USA, search engine optimization USA, SEO company USA, digital marketing USA, Google rankings, organic traffic USA',
  openGraph: {
    title: 'SEO Services in USA | Boost Rankings & Organic Traffic',
    description:
      'Drive more organic traffic in the USA with expert SEO services. Improve rankings, leads, and revenue.',
    type: 'website',
  },
}

export default function USASeoServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
