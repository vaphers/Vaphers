import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Cited in LLMs with AI SEO | Vaphers',
  description:
    'Future-proof your growth with AI SEO services built for Google and AI-driven search engines. We optimize intent, content, and technical signals to increase rankings, attract qualified traffic, and generate measurable revenue.',

  keywords: [
    'AI SEO',
    'LLM SEO',
    'artificial intelligence SEO',
    'AI search optimization',
    'get cited in LLMs',
  ],

  alternates: {
    canonical: 'https://www.vaphers.com/seo-services/ai-seo-services',
  },

  openGraph: {
    title: 'Get Cited in LLMs with AI SEO | Vaphers',
    description:
      'Rank across Google and AI-powered search platforms. Get cited in LLMs and drive high-intent traffic with intelligent SEO strategies.',
    url: 'https://www.vaphers.com/seo-services/ai-seo-services',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767602634/ChatGPT_Shopping_lbdifj.png',
        width: 1200,
        height: 630,
        alt: 'AI SEO Services by Vaphers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Get Cited in LLMs with AI SEO',
    description:
      'Increase visibility in AI-driven search results and large language models with advanced AI SEO strategies.',
    images: [
      'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767602634/ChatGPT_Shopping_lbdifj.png',
    ],
  },
};

export default function AiSeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}