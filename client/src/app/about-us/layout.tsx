import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Performance-Driven Digital Marketing Agency for Business Growth',
  description: 'Learn about our performance-driven digital marketing agency. We help businesses grow through SEO, paid ads, conversion optimization, and data-backed strategies that deliver measurable results.',
  keywords: 'affordable digital marketing company, digital marketing services, SEO services, web development',

  alternates: {
    canonical: 'https://www.vaphers.com/about-us',
  },

  openGraph: {
    title: 'Performance-Driven Digital Marketing Agency for Business Growth',
    description: 'Learn about our journey as an affordable digital marketing company dedicated to helping businesses grow online.',
    url: 'https://www.vaphers.com/about-us',
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