import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead Generation Agency | Qualified B2B & SEO Leads',
  description:
    'Get qualified, sales-ready leads with our proven lead generation strategies. B2B lead generation, SEO optimization, and targeted campaigns that convert.',
  keywords: [
    'lead generation agency',
    'B2B lead generation',
    'lead generation services',
    'qualified leads',
    'sales pipeline',
    'lead generation campaigns',
    'SEO lead generation',
  ],
  openGraph: {
    title: 'Lead Generation Agency | Fill Your Sales Pipeline Fast',
    description:
      'Drive qualified leads with expert lead generation strategies. We combine SEO, Google Ads, and B2B tactics to deliver sales-ready prospects consistently.',
    type: 'website',
  },
}

export default function LeadGenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
