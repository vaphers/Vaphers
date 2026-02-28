import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Local SEO To Dominate Google Maps & Local Rankings | Vaphers',
  description:
    'Outrank local competitors and capture high-intent customers with powerful Local SEO strategies. We optimize Google Business Profiles, local citations, and on-page signals to drive more calls, leads, and revenue.',

  keywords:
    'Local SEO services, local search optimization, Google Maps ranking, local SEO agency, Google Business Profile optimization, local lead generation',

  alternates: {
    canonical: 'https://www.vaphers.com/seo-services/local-seo-services',
  },

  openGraph: {
    title: 'High-Impact Local SEO Services | Rank Higher & Get More Leads',
    description:
      'Dominate Google Maps and local search results with data-driven Local SEO built for measurable growth.',
    url: 'https://www.vaphers.com/seo-services/local-seo-services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765199800/Google_Ads_Service_nxccqd.png',
        width: 1200,
        height: 630,
        alt: 'Local SEO Services by Vaphers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Local SEO That Brings More Calls & Customers',
    description:
      'Increase visibility in Google Maps and local search to drive consistent, high-quality leads.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765199800/Google_Ads_Service_nxccqd.png',
    ],
  },
}

export default function SEOServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}