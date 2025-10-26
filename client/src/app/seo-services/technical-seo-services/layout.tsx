import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable Technical SEO Services | Boost Rankings & Site Performance',
  description: 'Get affordable technical SEO services that fix crawl errors, improve site speed, optimize Core Web Vitals, and boost rankings. Professional technical optimization without enterprise costs.',
  keywords: 'affordable technical seo services, technical seo optimization, technical seo audit, site speed optimization, crawl error fixes, mobile optimization',
  openGraph: {
    title: 'Affordable Technical SEO Services | Boost Rankings & Site Performance',
    description: 'Get affordable technical SEO services that fix crawl errors, improve site speed, optimize Core Web Vitals, and boost rankings. Professional technical optimization without enterprise costs.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Technical SEO Services | Boost Rankings & Site Performance',
    description: 'Get affordable technical SEO services that fix crawl errors, improve site speed, optimize Core Web Vitals, and boost rankings.',
  }
}

export default function TechnicalSEOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
