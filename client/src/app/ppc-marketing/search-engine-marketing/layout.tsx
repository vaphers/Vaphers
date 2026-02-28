import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEM Services That Maximize ROI & Search Visibility | Vaphers',
  description:
    'Dominate search results with performance-driven SEM services. We combine high-converting PPC campaigns and strategic SEO to increase visibility, reduce acquisition costs, and drive measurable revenue growth.',

  keywords: [
    'SEM services',
    'search engine marketing',
    'SEM agency',
    'PPC and SEO services',
    'search marketing experts',
    'paid search advertising',
  ],

  alternates: {
    canonical: 'https://www.vaphers.com/ppc-marketing/search-engine-marketing',
  },

  openGraph: {
    title: 'High-Performance SEM Services | Scalable Search Growth',
    description:
      'Increase traffic, leads, and ROI with data-backed search engine marketing strategies built for measurable growth.',
    url: 'https://www.vaphers.com/ppc-marketing/search-engine-marketing',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765276082/SEM_Graphics_1_mydwiu.png',
        width: 1200,
        height: 630,
        alt: 'SEM Services by Vaphers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SEM Services Built for Maximum ROI',
    description:
      'Combine PPC and SEO strategies to dominate search and generate consistent, high-quality leads.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765276082/SEM_Graphics_1_mydwiu.png',
    ],
  },
}

export default function SEMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}