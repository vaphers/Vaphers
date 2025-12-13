import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const industrySlugToKey: Record<string, string> = {
  'plumbers': 'plumbers',
  'restaurants': 'restaurants',
  'real-estate': 'realEstate',
  'doctors': 'doctors',
  'fashion': 'fashion',
  'lawyers': 'lawyers',
  'accountants': 'accountants',
  'salons': 'salons',
  'roofers': 'roofers',
  'seal-coating': 'sealCoaters',
  'signage': 'signage',
  'packers-movers': 'packersMovers',
  'beauty-spas': 'beautySpas',
  'builders': 'builders',
  'dentists': 'dentists',
  'chiropractors': 'chiropractors',
  'veterinarians': 'veterinarians',
  'pest-control': 'pestControl',
  'gyms': 'gyms',
  'car-detailers': 'carDetailers',
  'mechanics': 'mechanics',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const industryRoutes = Object.keys(industrySlugToKey).map((slug) => ({
    url: `https://www.vaphers.com/seo-services/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Static routes
  const staticRoutes = [
    {
      url: 'https://www.vaphers.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://www.vaphers.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.vaphers.com/about-us',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.vaphers.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.vaphers.com/seo-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.vaphers.com/website-development-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.vaphers.com/ppc-marketing',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.vaphers.com/seo-services/ai-seo-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/seo-services/local-seo-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/seo-services/ecommerce-seo-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/seo-services/technical-seo-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/seo-services/seo-audit-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/website-development-services/nextjs-website-development',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/website-development-services/ecommerce-development',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/website-development-services/shopify-website-development',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/ppc-marketing/google-ads-management-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/ppc-marketing/meta-ads-management-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/ppc-marketing/search-engine-marketing',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://www.vaphers.com/ppc-marketing/lead-generation-services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  return [...staticRoutes, ...industryRoutes];
}
