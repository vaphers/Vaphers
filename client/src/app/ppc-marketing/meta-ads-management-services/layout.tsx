import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meta Ads Management Services That Scale Revenue | Vaphers',
  description:
    'Turn scrolls into sales with performance-driven Meta Ads management. We build high-converting Facebook & Instagram campaigns that lower CPA, increase ROAS, and drive consistent revenue growth.',

  keywords: [
    'meta ads management company',
    'facebook ads management',
    'instagram ads management',
    'paid social advertising',
    'meta marketing experts',
  ],

  alternates: {
    canonical: 'https://www.vaphers.com/ppc-marketing/meta-ads-management-services',
  },

  openGraph: {
    title: 'High-ROI Meta Ads Management | Facebook & Instagram Experts',
    description:
      'Launch smarter Meta campaigns designed to convert. Lower acquisition costs, stronger targeting, and measurable growth.',
    url: 'https://www.vaphers.com/ppc-marketing/meta-ads-management-services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765201688/Meta_Ads_Service_xmtq1l.png',
        width: 1200,
        height: 630,
        alt: 'Meta Ads Management Services by Vaphers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Meta Ads That Drive Real Revenue Growth',
    description:
      'Scale faster with conversion-focused Facebook & Instagram ad campaigns built for maximum ROAS.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765201688/Meta_Ads_Service_xmtq1l.png',
    ],
  },
}

export default function MetaAdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}