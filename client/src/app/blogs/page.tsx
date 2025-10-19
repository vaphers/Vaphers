import type { Metadata } from 'next'
import BlogList from '../Components/Blogs Components/BlogList'
import Testimonial from '../Components/Global Components/Testimonial'
import ContactForm from '../Components/Global Components/Contact'

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
        <BlogList/>
        <Testimonial/>
        <ContactForm/>
    </main>
  )
}
