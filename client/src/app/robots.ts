import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/blog-30-days', // Tells search engines NOT to crawl this page
    },
    sitemap: 'https://www.vaphers.com/sitemap.xml',
  };
}