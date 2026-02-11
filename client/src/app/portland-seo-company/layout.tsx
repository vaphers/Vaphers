import { Metadata } from 'next';
import Footer from '@/PageComponents/Global Components/Footer'
import NavBar from '@/PageComponents/Global Components/Header'

export const metadata: Metadata = {
  title: 'Portland SEO Company | Grow Your Business with Vaphers',
  description:
    'Vaphers is a results-driven Portland SEO Company helping local businesses increase rankings, attract qualified traffic, and generate consistent leads with proven SEO strategies.',
  
  keywords: [
    'Portland SEO Company',
    'SEO company in Portland',
    'Portland SEO services',
    'Local SEO company in Portland',
    'Best SEO company in Portland',
    'Vaphers'
  ],

  alternates: {
    canonical: 'https://www.vaphers.com/portland-seo-company',
  },

  openGraph: {
    title: 'Portland SEO Company | Results-Driven SEO Services',
    description:
      'Work with a trusted Portland SEO Company focused on rankings, local visibility, and sustainable business growth through proven SEO strategies.',
    url: 'https://www.vaphers.com/portland-seo-company',
    type: 'website',
  },
};

export default function PortlandSeoLayout({
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
