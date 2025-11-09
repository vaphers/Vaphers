import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable Digital Marketing Pricing | Transparent Plans & Packages',
  description: 'Explore affordable digital marketing pricing for SEO, web development, and PPC services. Simple, transparent plans with no hidden fees. Get started today.',
  keywords: 'affordable digital marketing pricing, SEO pricing, web development cost, digital marketing packages, PPC management pricing',
  openGraph: {
    title: 'Affordable Digital Marketing Pricing | Transparent Plans & Packages',
    description: 'Explore affordable digital marketing pricing for SEO, web development, and PPC services. Simple, transparent plans with no hidden fees.',
    type: 'website',
  },
}

export default function PricingLayout({
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
