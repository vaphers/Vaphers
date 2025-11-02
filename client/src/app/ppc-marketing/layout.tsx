import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable PPC Marketing Services | Drive Targeted Traffic & Leads',
  description: 'Unlock powerful PPC marketing services with Vaphers. From Google Ads management to paid social campaigns, maximize your ad spend and attract qualified leads with our expert strategies.',
  keywords: 'SEO services, search engine optimization, digital marketing, Google rankings, organic traffic',
  openGraph: {
    title: 'Affordable PPC Services | Boost Your Rankings & Traffic',
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
