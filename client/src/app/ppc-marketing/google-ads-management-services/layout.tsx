import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Ads Management Services That Drive Real ROI | Vaphers',
  description:
    'Stop wasting ad spend. Our Google Ads management services build high-converting PPC campaigns that generate qualified leads, lower cost-per-click, and maximize your ROI. Scale faster with data-driven strategy and expert optimization.',
  keywords:
    'Google Ads management services, PPC campaign management, Google Ads agency, paid search advertising, ROI focused PPC',

  alternates: {
    canonical: 'https://www.vaphers.com/ppc-marketing/google-ads-management-services',
  },

  openGraph: {
    title: 'High-Performance Google Ads Management | Maximize ROI',
    description:
      'Launch smarter Google Ads campaigns built to convert. Lower CPC, better targeting, and measurable revenue growth.',
    url: 'https://www.vaphers.com/ppc-marketing/google-ads-management-services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765199800/Google_Ads_Service_nxccqd.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Management Services by Vaphers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Management That Actually Increases ROI',
    description:
      'Get more conversions and lower ad costs with expert Google Ads management built for measurable growth.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765199800/Google_Ads_Service_nxccqd.png',
    ],
  },
}

export default function PPCServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}