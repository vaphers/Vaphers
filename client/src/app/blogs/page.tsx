import type { Metadata } from 'next'
import BlogList from '@/PageComponents/Blogs Components/BlogList'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import ContactForm from '@/PageComponents/Global Components/Contact'
import NavBar from '@/PageComponents/Global Components/Header'
import Footer from '@/PageComponents/Global Components/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles, insights, and updates on digital marketing, SEO, and web development.',
  keywords: ['blog', 'digital marketing', 'SEO', 'articles'],
  openGraph: {
    title: 'Blog | Vaphers',
    description: 'Read our latest articles and insights.',
    url: 'https://yourdomain.com/blog',
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
        <NavBar/>
        <BlogList/>
        <Testimonial/>
        <ContactForm/>
        <Footer/>
    </main>
  )
}
