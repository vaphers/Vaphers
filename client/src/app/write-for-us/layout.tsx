import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write For Us — Marketing & SEO Guest Post Site | Vaphers',
  description:
    'Submit a marketing guest post on Vaphers — the premier digital marketing guest post site for performance marketing, technical SEO case studies, and growth strategy. Earn permanent high-authority DoFollow backlinks.',
  keywords: [
    'marketing guest post',
    'seo guest post',
    'guest post site for performance marketing',
    'digital marketing guest post site',
    'write for us digital marketing',
    'guest blogging marketing',
    'submit guest post seo',
    'performance marketing guest post',
    'b2b saas guest post site',
    'digital marketing write for us',
  ],
  openGraph: {
    title: 'Write For Us — Marketing & SEO Guest Post Site | Vaphers',
    description:
      'Submit a marketing guest post on Vaphers — the premier digital marketing guest post site for performance marketing, technical SEO case studies, and growth strategy.',
    url: 'https://www.vaphers.com/write-for-us',
    siteName: 'Vaphers',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_1200/v1761213572/hero_landing_rhywrd.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaphers Marketing & SEO Guest Post Network',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Write For Us — Marketing & SEO Guest Post Site | Vaphers',
    description:
      'Submit a marketing guest post on Vaphers — top digital marketing guest post site for performance marketing and SEO.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_1200/v1761213572/hero_landing_rhywrd.jpg',
    ],
  },
  alternates: {
    canonical: 'https://www.vaphers.com/write-for-us',
  },
};

export default function WriteForUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
