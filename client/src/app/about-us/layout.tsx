import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Performance-Driven Digital Marketing Agency for Business Growth',
  description: 'Learn about our performance-driven digital marketing agency. We help businesses grow through SEO, paid ads, conversion optimization, and data-backed strategies that deliver measurable results.',
  keywords: ['affordable digital marketing company', 'digital marketing services', 'SEO services', 'web development', 'about us', 'company story', 'business growth'],
  authors: [{ name: 'Vaphers' }],
  alternates: {
    canonical: 'https://www.vaphers.com/about-us',
  },
  openGraph: {
    title: 'About Us | Vaphers',
    description: 'Our story is a testament to the power of collaboration and resilience. Learn about our journey in helping businesses succeed.',
    url: 'https://www.vaphers.com/about-us',
    siteName: 'Vaphers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1770818890/ChatGPT_Image_Feb_11_2026_07_37_55_PM_q9spwb.png',
        width: 1200,
        height: 630,
        alt: 'Vaphers Digital Marketing Agency',
      },
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

export default function AboutLayout({
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