import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'eCommerce Website Development | Fast, SEO‑Ready & Affordable',
  description:
    'Get a custom, fast, and SEO-friendly eCommerce website built to convert visitors into customers. Affordable development tailored for growing online stores and brands.',
  keywords: [
    'ecommerce website development',
    'affordable ecommerce development',
    'ecommerce SEO',
    'custom online store',
    'fast ecommerce website',
    'ecommerce performance',
  ],
  openGraph: {
    title: 'eCommerce Website Development for Speed, SEO & Sales',
    description:
      'Launch a high-performance eCommerce store that ranks well on Google and converts visitors. Clear pricing, fast delivery, and growth-focused development.',
    url: 'https://yoursite.com/website-development-services/ecommerce-website-development',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yoursite.com/website-development-services/ecommerce-website-development',
  },
};

export default function EcommerceDevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
