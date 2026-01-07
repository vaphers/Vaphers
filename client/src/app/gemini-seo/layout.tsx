import { Metadata } from 'next';
import Footer from '@/PageComponents/Global Components/Footer';
import NavBar from '@/PageComponents/Global Components/Header';

export const metadata: Metadata = {
  title: 'Google Gemini SEO Services for AI Search Visibility | Vaphers',
  description:
    'Optimize your content for Google Gemini and AI Overviews with expert SEO strategies. Improve AI search visibility, get cited in Gemini answers, and drive qualified organic traffic as search evolves.',
  keywords: [
    'Gemini SEO',
    'Google Gemini SEO',
    'AI search optimization',
    'AI Overview optimization',
    'Gemini AI search visibility',
    'GEO optimization',
    'Vaphers Gemini SEO'
  ],
  openGraph: {
    title: 'Google Gemini SEO Services for AI Search Visibility | Vaphers',
    description:
      'Get your brand cited in Google Gemini AI answers. Expert Gemini SEO services that optimize content for AI Overviews, conversational search, and generative AI visibility.',
    url: 'https://vaphers.com/gemini-seo',
    type: 'website',
    siteName: 'Vaphers',
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://vaphers.com/gemini-seo'
  }
};

export default function GeminiSeoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
