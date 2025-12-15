import type { Metadata } from 'next'
import OurStorySection from '@/PageComponents/About Components/Story'
import Mission from "@/PageComponents/About Components/Mission"
import CTA from '@/PageComponents/Global Components/CTA'
import Hero from '@/PageComponents/About Components/Hero'
import ContactForm from '@/PageComponents/Global Components/Contact'

export const metadata: Metadata = {
  title: 'Performance-Driven Digital Marketing Agency for Business Growth',
  description: 'Learn about our performance-driven digital marketing agency. We help businesses grow through SEO, paid ads, conversion optimization, and data-backed strategies that deliver measurable results.',
  keywords: ['about us', 'company story', 'team', 'expertise', 'business growth', 'digital marketing agency'],
  authors: [{ name: 'Vaphers' }],
  openGraph: {
    title: 'About Us | Vaphers',
    description: 'Our story is a testament to the power of collaboration and resilience. Learn about our journey in helping businesses succeed.',
    url: 'https://www.vaphers.com/about-us',
    siteName: 'Vaphers',
    locale: 'en_US',
    type: 'website',
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
  alternates: {
    canonical: 'https://www.vaphers.com/about-us',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero/>
      <OurStorySection />
      <Mission/>
      <CTA/>
      <ContactForm/>
    </main>
  )
}
