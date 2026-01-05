import { Metadata } from 'next';
import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'

export const metadata: Metadata = {
  title: 'Perplexity SEO Services for Real Visibility | Vaphers',
  description:
    'Boost your presence on Perplexity and other AI search platforms with focused SEO strategies that improve visibility, grow qualified traffic, and keep your brand ahead as search evolves.',
  keywords: [
    'Perplexity SEO',
    'Perplexity AI SEO',
    'AI search optimization',
    'AI SEO services',
    'Vaphers Perplexity SEO'
  ],
  openGraph: {
    title: 'Perplexity SEO Services for Real Visibility | Vaphers',
    description:
      'Straightforward Perplexity SEO services that help your brand show up in AI-driven answers and modern search results—without hype.',
    url: 'https://vaphers.com/perplexity-seo',
    type: 'website'
  }
};

export default function PerplexitySeoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>
  <NavBar/>
  {children}
  <Footer/>
  </>}
