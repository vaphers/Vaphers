import { Metadata } from 'next';
import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'

export const metadata: Metadata = {
  title: 'We Get You Cited in ChatGPT - AI SEO That Works | Vaphers',
  description:
    'ChatGPT SEO services that get your business cited in AI responses. Capture high-intent traffic from 3.7B+ monthly users with proven optimization strategies for conversational AI search and ChatGPT citations.',
  keywords: [
    'ChatGPT SEO',
    'ChatGPT citations',
    'ChatGPT optimization',
    'AI search optimization',
    'conversational AI SEO',
    'AI SEO services',
    'ChatGPT ranking',
    'generative engine optimization',
    'AEO services',
    'ChatGPT visibility',
    'Vaphers ChatGPT SEO'
  ],
  openGraph: {
    title: 'We Get You Cited in ChatGPT - AI SEO That Works | Vaphers',
    description:
      'Get your business cited in ChatGPT with expert AI SEO strategies. Capture high-intent traffic from 37.5M daily searches through proven ChatGPT optimization that delivers real citations and measurable results.',
    url: 'https://www.vaphers.com/chatgpt-seo',
    type: 'website',
    images: [
      {
        url: 'https://www.vaphers.com/og-chatgpt-seo.jpg',
        width: 1200,
        height: 630,
        alt: 'ChatGPT SEO Services - Get Cited in AI Search by Vaphers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Get You Cited in ChatGPT - AI SEO That Works',
    description:
      'Professional ChatGPT SEO that gets your business featured in AI responses. Proven strategies for 3.7B+ monthly users.',
    images: ['https://www.vaphers.com/og-chatgpt-seo.jpg']
  },
  alternates: {
    canonical: 'https://www.vaphers.com/chatgpt-seo'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function ChatGPTSeoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>
    <NavBar/>
    {children}
    <Footer/>
  </>
}
