import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO for Interior Designers | Get Found by Ready-to-Hire Clients | Vaphers',
  description:
    'SEO for interior designers and design studios in the US and UK. We help you rank for the searches your ideal clients are already running — no lock-in contracts, no vanity metrics.',
  keywords:
    'SEO for interior designers, SEO for interior design company, interior design SEO, interior designer marketing, SEO for design studios',

  alternates: {
    canonical: 'https://www.vaphers.com/seo-for-interior-designers',
  },

  openGraph: {
    title: 'SEO for Interior Designers Who Would Rather Design Than Chase Leads',
    description:
      'Data-driven SEO for interior design companies in the US and UK. Rank higher, attract qualified inquiries, and rely less on referrals alone.',
    url: 'https://www.vaphers.com/seo-for-interior-designers',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761213572/hero_landing_rhywrd.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaphers SEO for Interior Designers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEO for Interior Designers | Vaphers',
    description:
      'SEO built for how interior design clients actually search and decide — for studios in the US and UK.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761213572/hero_landing_rhywrd.jpg',
    ],
  },
}

export default function SEOForInteriorDesignersLayout({
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