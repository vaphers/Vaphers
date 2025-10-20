import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI SEO Services | Your Company Name',
  description: 'Transform your business with AI-powered SEO services. Leverage machine learning and automation to boost search rankings and drive organic traffic.',
  keywords: ['AI SEO', 'artificial intelligence SEO', 'automated SEO', 'machine learning SEO', 'AI search optimization'],
  openGraph: {
    title: 'AI SEO Services That Transform Your Business',
    description: 'AI-powered SEO strategies that deliver real results',
    url: 'https://yoursite.com/seo-services/ai-seo-service',
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
