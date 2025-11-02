import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEM Services | Search Engine Marketing Agency for Maximum ROI',
  description:
    'Drive immediate results with expert SEM services. Our search engine marketing agency combines PPC and SEO strategies for maximum visibility and ROI.',
  keywords: [
    'SEM services',
    'search engine marketing',
    'SEM agency',
    'PPC and SEO services',
    'search marketing experts',
    'paid search advertising',
  ],
  openGraph: {
    title: 'SEM Services | Expert Search Engine Marketing Agency',
    description:
      'Partner with a leading SEM agency to maximize your search visibility. We combine paid ads and organic strategies for measurable, high-ROI results.',
    type: 'website',
  },
}

export default function SEMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
