import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ROI-Focused SEO Services Built to Scale Your Business | Vaphers',
  description:
    'Stop guessing with SEO. We deliver data-driven SEO services that improve rankings, attract qualified traffic, and turn search visibility into revenue.',
  keywords:
    'SEO services, search engine optimization, digital marketing, Google rankings, organic traffic',

  alternates: {
    canonical: 'https://www.vaphers.com/seo-services',
  },

  openGraph: {
    title: 'ROI-Focused SEO Services Built to Scale Your Business | Vaphers',
    description:
      'Drive more organic traffic with expert SEO services designed to increase rankings, leads, and measurable revenue growth.',
    url: 'https://www.vaphers.com/seo-services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761213572/hero_landing_rhywrd.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaphers SEO Services',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ROI-Focused SEO Services Built to Scale Your Business',
    description:
      'Increase rankings, traffic, and revenue with performance-driven SEO strategies.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761213572/hero_landing_rhywrd.jpg',
    ],
  },
}

export default function SEOServicesLayout({
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