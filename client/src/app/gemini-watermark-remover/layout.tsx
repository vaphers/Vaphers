import { Metadata } from 'next';
import Footer from '@/PageComponents/Global Components/Footer';
import NavBar from '@/PageComponents/Global Components/Header';


export const metadata: Metadata = {
  title: 'Gemini Watermark Remover - No Sign-Up Needed | Vaphers',
  description:
    'Remove watermarks from Google Gemini AI-generated images instantly. Free, privacy-focused tool that processes images in your browser using reverse alpha blending. No upload required.',
  keywords: [
    'Gemini watermark remover',
    'remove Gemini watermark',
    'AI watermark remover',
    'Google Gemini image tool',
    'remove AI watermark',
    'Gemini image editor',
    'free watermark remover',
    'reverse alpha blending',
    'client-side image processing',
    'Vaphers tools'
  ],
  openGraph: {
    title: 'Free Gemini Watermark Remover - Remove AI Watermarks Online | Vaphers',
    description:
      'Remove watermarks from Google Gemini AI images for free. 100% browser-based processing ensures your privacy. Fast, lossless watermark removal using advanced alpha blending algorithm.',
    url: 'https://vaphers.com/tools/gemini-watermark-remover',
    type: 'website',
    siteName: 'Vaphers',
    images: [
      {
        url: 'https://vaphers.com/og-gemini-watermark-remover.jpg',
        width: 1200,
        height: 630,
        alt: 'Gemini Watermark Remover Tool by Vaphers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Gemini Watermark Remover - Remove AI Watermarks Online',
    description: 'Remove watermarks from Google Gemini AI images instantly. Free, privacy-focused, browser-based tool.',
    images: ['https://vaphers.com/og-gemini-watermark-remover.jpg']
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
  },
  alternates: {
    canonical: 'https://vaphers.com/tools/gemini-watermark-remover'
  },
  other: {
    'application-name': 'Gemini Watermark Remover',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Gemini Watermark Remover'
  }
};


export default function GeminiWatermarkRemoverLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {children}
      </main>
      <Footer />
    </>
  );
}