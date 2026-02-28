import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profit-Focused PPC Marketing | Smarter Spend, Better Results',
  description:
    'Vaphers is a leading PPC marketing company in the US, delivering high-ROI Google Ads and paid media campaigns that drive qualified leads and revenue.',
  keywords:
    'PPC marketing services, Google Ads management, paid advertising, conversion optimization, performance marketing',

  alternates: {
    canonical: 'https://www.vaphers.com/ppc-marketing',
  },

  openGraph: {
    title: 'Profit-Focused PPC Marketing | Smarter Spend, Better Results',
    description:
      'Drive more leads and revenue with data-driven PPC campaigns built for ROI and measurable growth.',
    type: 'website',
    url: 'https://www.vaphers.com/ppc-marketing',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765199800/Google_Ads_Service_nxccqd.png',
        width: 1200,
        height: 630,
        alt: 'Vaphers PPC Marketing Services',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Profit-Focused PPC Marketing | Smarter Spend, Better Results',
    description:
      'Maximize ROI with conversion-driven PPC campaigns designed to generate qualified leads.',
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
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}