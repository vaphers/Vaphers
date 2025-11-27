import BlogList from '@/PageComponents/Blogs Components/BlogList';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import ContactForm from '@/PageComponents/Global Components/Contact';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest articles, insights, and updates on digital marketing, SEO, and web development.',
  keywords: ['blog', 'digital marketing', 'SEO', 'articles'],
  openGraph: {
    title: 'Blog | Vaphers',
    description: 'Read our latest articles and insights.',
    url: 'https://yourdomain.com/blog',
  },
};

export default async function BlogPage() {
  // Use relative path for API if deploying (Next.js App Router will SSR this call)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/blogs?limit=9`, { cache: 'no-store' });
  const { blogs } = await res.json();

  return (
    <main className="min-h-screen bg-white">
      <NavBar/>
      <BlogList initialBlogs={blogs}/>
      <Testimonial/>
      <ContactForm/>
      <Footer/>
    </main>
  );
}
