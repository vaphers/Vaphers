import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI SEO Services That Drive Rankings, Traffic & Revenue | Vaphers',
  description: 'Win rankings across Google and AI-powered search engines. Our AI SEO services optimize content, intent, and visibility to drive qualified traffic and real conversions.',
  keywords: ['AI SEO', 'artificial intelligence SEO', 'automated SEO', 'machine learning SEO', 'AI search optimization'],
  openGraph: {
    title: 'AI SEO Services That Transform Your Business',
    description: 'AI-powered SEO strategies that deliver real results',
    url: 'https://www.vaphers.com/seo-services/ai-seo-service',
    type: 'website',
  },
};

export default function AiSeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
