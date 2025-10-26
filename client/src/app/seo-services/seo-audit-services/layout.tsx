import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free SEO Audit Services | Website Analysis & Technical SEO Audit | Vaphers',
  description: 'Get a comprehensive free SEO audit identifying critical issues affecting your rankings. Expert technical, on-page, and ecommerce SEO audits with actionable recommendations. Request your free website audit today!',
  keywords: [
    'SEO audit services',
    'free SEO audit',
    'website SEO analysis',
    'technical SEO audit',
    'ecommerce SEO audit',
    'on-page SEO audit',
    'competitor SEO audit',
    'SEO audit report',
    'website audit tool',
    'professional SEO audit'
  ],
  authors: [{ name: 'Vaphers' }],
  creator: 'Vaphers',
  publisher: 'Vaphers',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vaphers.com/seo-audit',
    title: 'Free SEO Audit Services | Website Analysis & Technical SEO Audit',
    description: 'Comprehensive SEO audits revealing critical issues and opportunities. Get expert technical, on-page, and ecommerce SEO analysis with actionable recommendations.',
    siteName: 'Vaphers',
    images: [
      {
        url: 'https://www.vaphers.com/og-seo-audit.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaphers SEO Audit Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SEO Audit Services | Vaphers',
    description: 'Get a comprehensive free SEO audit revealing issues holding your website back. Expert analysis with actionable recommendations.',
    images: ['https://www.vaphers.com/twitter-seo-audit.jpg'],
    creator: '@vaphers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vaphers.com/seo-audit',
  },
}

export default function SEOAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
