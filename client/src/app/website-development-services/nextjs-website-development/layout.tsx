import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise-Grade Next.js Website Development Services',
  description:
    'We build high-performance Next.js websites optimized for speed, SEO, and scalability. Get production-ready apps engineered for growth and conversions.',
  keywords: [
    'Next.js development',
    'affordable next js development',
    'Next.js website',
    'Next.js SEO',
    'Next.js landing pages',
    'Next.js ecommerce',
    'Next.js performance',
  ],
  openGraph: {
    title: 'Next.js Development for Speed, SEO & Conversions',
    description:
      'Build a high‑performance Next.js website that ranks and converts. Simple plans, clear pricing, and fast delivery for growth‑focused businesses.',
    url: 'https://www.vaphers.com/website-development-services/nextjs-website-development',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vaphers.com/website-development-services/nextjs-website-development',
  },
};

export default function NextjsWebsiteDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
