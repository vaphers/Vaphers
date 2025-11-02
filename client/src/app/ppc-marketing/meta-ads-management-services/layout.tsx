import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meta Ads Management Company | Expert Facebook & Instagram Ad Services',
  description:
    'Boost performance with Meta Ads management services. A trusted meta ads management company for high-ROI Facebook & Instagram campaigns.',
  keywords: [
    'meta ads management company',
    'facebook ads management',
    'instagram ads management',
    'paid social advertising',
    'meta marketing experts',
  ],
  openGraph: {
    title: 'Meta Ads Management Company | Facebook & Instagram Ad Experts',
    description:
      'Partner with a leading meta ads management company to run powerful Facebook & Instagram ad campaigns that deliver measurable results.',
    type: 'website',
  },
}

export default function MetaAdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
