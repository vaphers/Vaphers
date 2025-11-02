import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable Google Ads Management Service | Maximize ROI with Expert PPC Campaigns',
  description: 'Grow your business with Vaphers’ affordable Google Ads management service. Expert PPC setup, optimization, and transparent reporting designed to drive targeted traffic and maximize your advertising budget.',
  keywords: 'SEO services, search engine optimization, digital marketing, Google rankings, organic traffic',
  openGraph: {
    title: 'Affordable Google Ads Services | Boost Your Rankings & Traffic',
    description: 'Drive more organic traffic with expert SEO services. Increase rankings and revenue.',
    type: 'website',
  },
}

export default function PPCServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
