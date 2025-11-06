import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js Website Development | Fast, SEO‑Ready & Affordable',
  description:
    'Launch a fast, SEO‑friendly website with Next.js. Get clean design, quick load times, and pages built to convert—perfect for service brands, landing pages, and ecommerce. Ask about affordable next js development.',
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
    url: 'https://yoursite.com/website-development-services/nextjs-website-development',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yoursite.com/website-development-services/nextjs-website-development',
  },
};

export default function NextjsWebsiteDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
