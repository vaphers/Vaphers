import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead Generation Services That Deliver Sales-Ready Leads | Vaphers',
  description:
    'Stop chasing cold prospects. Our lead generation services deliver qualified, high-intent B2B leads that convert into real revenue. Scalable campaigns built to fill your sales pipeline consistently.',

  keywords: [
    'lead generation agency',
    'B2B lead generation',
    'lead generation services',
    'qualified leads',
    'sales pipeline',
    'lead generation campaigns',
    'SEO lead generation',
  ],

  alternates: {
    canonical: 'https://www.vaphers.com/ppc-marketing/lead-generation-services',
  },

  openGraph: {
    title: 'High-Converting Lead Generation Services | Scale Faster',
    description:
      'Generate predictable, sales-ready leads with data-driven SEO and paid campaigns built for measurable growth.',
    url: 'https://www.vaphers.com/ppc-marketing/lead-generation-services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765204141/lead_Gen_Service_tbfbru.png',
        width: 1200,
        height: 630,
        alt: 'Lead Generation Services by Vaphers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Lead Generation That Fills Your Sales Pipeline',
    description:
      'Get consistent, high-quality B2B leads with performance-driven SEO and paid acquisition strategies.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765204141/lead_Gen_Service_tbfbru.png',
    ],
  },
}

export default function LeadGenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}