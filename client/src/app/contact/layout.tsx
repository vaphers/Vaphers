import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Let\'s Grow Your Business Together',
  description: 'Ready to boost your online presence? Get in touch with our team to discuss custom web development and SEO solutions tailored to your business goals.',
  openGraph: {
    title: 'Contact Us | Let\'s Grow Your Business Together',
    description: 'Ready to boost your online presence? Get in touch to discuss custom solutions for your business.',
    type: 'website',
  },
}

export default function ConatactLayout({
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
