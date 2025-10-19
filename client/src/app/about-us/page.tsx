import type { Metadata } from 'next'
import OurStorySection from '@/app/Components/About Components/Story'
import Mission from "@/app/Components/About Components/Mission"
import CTA from '../Components/Global Components/CTA'
import Hero from '../Components/About Components/Hero'
import ContactForm from '../Components/Global Components/Contact'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our story, expertise, and journey. Discover how we help businesses generate leads, get noticed, and dominate their industry through collaboration and resilience.',
  keywords: ['about us', 'company story', 'team', 'expertise', 'business growth', 'digital marketing agency'],
  authors: [{ name: 'Vaphers' }],
  openGraph: {
    title: 'About Us | Vaphers',
    description: 'Our story is a testament to the power of collaboration and resilience. Learn about our journey in helping businesses succeed.',
    url: 'https://yourdomain.com/about',
    siteName: 'Vaphers',
    images: [
      {
        url: 'https://yourdomain.com/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Vaphers Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Vaphers',
    description: 'Our story is a testament to the power of collaboration and resilience.',
    images: ['https://yourdomain.com/twitter-about.jpg'],
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
    canonical: 'https://yourdomain.com/about',
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
