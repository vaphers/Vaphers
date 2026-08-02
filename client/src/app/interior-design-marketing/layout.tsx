import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior Design Marketing | Attract High-Ticket Clients | Vaphers',
  description:
    'Interior design marketing strategies for design studios in the US and UK. We help you attract premium clients through data-driven digital marketing — no lock-in contracts, no vanity metrics.',
  keywords:
    'interior design marketing, marketing for interior design firms, interior designer marketing, interior design digital marketing, design studio marketing, interior design brand strategy',

  alternates: {
    canonical: 'https://www.vaphers.com/interior-design-marketing',
  },

  openGraph: {
    title: 'Interior Design Marketing That Brings High-Ticket Clients to Your Studio',
    description:
      'Data-driven marketing for interior design firms in the US and UK. Build your brand, attract qualified inquiries, and rely less on referrals alone.',
    url: 'https://www.vaphers.com/interior-design-marketing',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761213572/hero_landing_rhywrd.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaphers Interior Design Marketing',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Interior Design Marketing | Vaphers',
    description:
      'Marketing built for how interior design clients actually search and decide — for studios in the US and UK.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761213572/hero_landing_rhywrd.jpg',
    ],
  },
}

export default function InteriorDesignMarketingLayout({
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
