import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Development Services That Convert Visitors Into Customers | Vaphers',
  description: 'We build fast, scalable websites designed for SEO, speed, and conversions. Get a custom website that attracts traffic, engages users, and drives revenue.',
  keywords: 'web development, responsive websites, custom web design, front-end development, React developer, Tailwind CSS',
  openGraph: {
    title: 'Web Development Services | Modern, Fast & Responsive Websites',
    description: 'Create stunning, responsive websites built for performance and growth.',
    type: 'website',
  },
}

export default function WebDevLayout({
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
