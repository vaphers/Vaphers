import BlogList from '@/PageComponents/Blogs Components/BlogList';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import ContactForm from '@/PageComponents/Global Components/Contact';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import Script from 'next/script'; 

export const metadata = {
  title: 'Vaphers | Read Our Blogs', 
  description: 'Read our latest articles, insights, and updates on digital marketing, SEO, and web development.',
  keywords: ['blog', 'digital marketing', 'SEO', 'articles'],
  openGraph: {
    title: 'Blog | Vaphers',
    description: 'Read our latest articles and insights.',
    url: 'https://vaphers.com/blogs', 
  },
};

export default async function BlogPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/blogs?limit=9`, { cache: 'no-store' });
  const { blogs } = await res.json();

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.vaphers.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": "https://www.vaphers.com/blogs"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <NavBar/>
      <BlogList initialBlogs={blogs}/>
      <Testimonial/>
      <ContactForm/>
      <Footer/>
    </main>
  );
}
