import React from 'react';
import Script from 'next/script';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import ContactSection from '@/PageComponents/Landing Home/ContactSection';
import MarketingPriceCalculator from '@/PageComponents/Global Components/PriceCalc';
import InteriorBlogList from '@/PageComponents/Blogs Components/InteriorBlogList';
import { getInteriorBlogsCollection } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Interior Design Marketing Blogs & Growth Strategies | Vaphers',
  description: 'Explore actionable interior design marketing strategies, SEO guides, high-ticket client acquisition tips, and digital growth playbooks tailored for interior designers.',
  keywords: [
    'interior design marketing',
    'marketing for interior designers',
    'interior design SEO',
    'interior designer lead generation',
    'interior design business growth'
  ],
  openGraph: {
    title: 'Interior Design Marketing Blogs | Vaphers',
    description: 'Expert marketing insights, SEO guides, and growth playbooks for interior design studios.',
    url: 'https://www.vaphers.com/interior-design-marketing/blogs',
  },
};

async function getInteriorBlogs() {
  try {
    const collection = await getInteriorBlogsCollection();
    const rawBlogs = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return rawBlogs.map((doc) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      title: doc.title,
      contentHtml: doc.contentHtml,
      metaTitle: doc.metaTitle || doc.title,
      metaDescription: doc.metaDescription || '',
      featuredImage: doc.featuredImage || null,
      authorId: doc.authorId || 'admin',
      authorName: doc.authorName || 'Vaphers Team',
      categories: doc.categories || [],
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error loading interior design blogs:', error);
    return [];
  }
}

export default async function InteriorDesignMarketingBlogsPage() {
  const blogs = await getInteriorBlogs();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vaphers.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Interior Design Marketing',
        item: 'https://www.vaphers.com/interior-design-marketing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Blogs',
        item: 'https://www.vaphers.com/interior-design-marketing/blogs',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="interior-blogs-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <NavBar />
      <InteriorBlogList initialBlogs={blogs} />
      <MarketingPriceCalculator />
      <ContactSection />
      <Footer />
    </main>
  );
}
