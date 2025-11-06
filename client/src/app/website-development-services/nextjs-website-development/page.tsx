'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'    
import WhatsNextJS from '@/PageComponents/NextJS Page Components/WhatsNext'
import Performance from '@/PageComponents/NextJS Page Components/Performance'
import NextJsComapny from '@/PageComponents/NextJS Page Components/NextJsDevelopment'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import ReactVsNext from '@/PageComponents/NextJS Page Components/NextvsReact'
import NextServices from '@/PageComponents/NextJS Page Components/Service'
import NextVsWpVsShopify from '@/PageComponents/NextJS Page Components/NextvsWordpressvsShopify'
import NextJsProcess from '@/PageComponents/NextJS Page Components/Process'
import Stats from '@/PageComponents/Global Components/Stats'
import NextJsFaq from '@/PageComponents/NextJS Page Components/FAQ'

type FaqItem = { question: string; answer: string }

const nextJsFaqData: FaqItem[] = [
  {
    question: 'What is Next.js and why should my business use it?',
    answer:
      'Next.js is a modern way to build fast, Google‑friendly websites that look great on mobile and desktop. It helps you get better SEO, quicker load times, and pages that convert more visitors into leads.',
  },
  {
    question: 'Is Next.js good for SEO?',
    answer:
      'Yes. Next.js creates clean, search‑friendly pages that load quickly, which helps rankings and clicks from Google. It also supports structured data and best practices by default.',
  },
  {
    question: 'Can I easily update my Next.js website?',
    answer:
      'Absolutely. You’ll get reusable sections and simple content workflows, so adding pages, blogs, or landing pages is easy without breaking your site’s speed.',
  },
  {
    question: 'How fast can a Next.js site launch?',
    answer:
      'Most sites launch faster than traditional builds because many performance and SEO features are built‑in. Timelines depend on pages, design, and content readiness.',
  },
  {
    question: 'Is Next.js only for big companies?',
    answer:
      'No. It’s perfect for startups and local businesses too. You get enterprise‑grade speed and SEO without the complexity—great value for growth-focused teams.',
  },
  {
    question: 'What about ecommerce—does Next.js work for stores?',
    answer:
      'Yes. Next.js powers high‑speed product pages and supports popular backends and checkouts. It’s ideal if you want a custom storefront with strong SEO.',
  },
  {
    question: 'How does Next.js compare to WordPress or Shopify?',
    answer:
      'Next.js gives you more speed and design control for lead generation. WordPress is great for blogs; Shopify is great for built‑in ecommerce. Many brands combine them with Next.js for the best results.',
  },
  {
    question: 'What does your Next.js service include?',
    answer:
      'Strategy, design, development, SEO setup, analytics, form integrations, and launch support. You’ll get a fast, secure site ready to rank and convert.',
  },
  {
    question: 'Is this affordable for small businesses?',
    answer:
      'Yes. Packages are tailored to your goals and budget, focusing on high‑impact pages first. Ask about affordable next js development to get a clear, fixed quote.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a quick call. Share your goals and pages needed, and you’ll get a simple plan, timeline, and pricing—no tech talk, just outcomes.',
  },
]

const portfolioImages = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166010/FixItNow_fbpzfx.png',
    alt: 'Website Design 1',
    title: 'E-Commerce Platform',
  },
  {
    id: '2',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166006/Interio_gqpsbc.png',
    alt: 'Website Design 2',
    title: 'SaaS Dashboard',
  },
  {
    id: '3',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166003/Trivaa_jvqmzk.png',
    alt: 'Website Design 3',
    title: 'Corporate Website',
  },
  {
    id: '4',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166001/Verzon_owqvnt.png',
    alt: 'Website Design 4',
    title: 'Mobile App UI',
  },
  {
    id: '5',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762165991/Dravii_Lifestyles_1_jcavgn.png',
    alt: 'Website Design 5',
    title: 'Fitness Landing Page',
  },
];

export default function Page() {
  const lenisRef = useRef<Lenis | null>(null)

  const lenisConfig = useMemo(() => ({
    lerp: 0.1,
    smooth: true,
    wheelMultiplier: 1.3,
  }), [])

  useEffect(() => {
    const initLenis = () => {
      const lenis = new Lenis(lenisConfig)

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
      lenisRef.current = lenis
      lenis.scrollTo(0)

      return () => {
        lenis.destroy()
      }
    }

    const timeoutId = setTimeout(initLenis, 100)

    return () => {
      clearTimeout(timeoutId)
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [lenisConfig])

  return (
    <>
      <div>
        <SubHero
          heading="Build a Website That Performs and Converts"
          subtext="Transform your online presence with a modern, responsive, and high-performing website. From custom designs to lightning-fast code, we deliver websites that look amazing and drive real business results."
          badgeText="Start Your Project"
        />
        <WhatsNextJS />
        <PortfolioMarquee images={portfolioImages} pxPerSec={140} />
        <Performance />
        <NextJsComapny />
        <Banner />
        <Testimonial />
        <ReactVsNext />
        <NextServices />
        <NextVsWpVsShopify />
        <NextJsProcess />
        <Stats />
        <NextJsFaq />
        <ContactForm />
      </div>

      {/* JSON-LD FAQ Schema (kept in sync with nextJsFaqData above) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": nextJsFaqData.map(({ question, answer }) => ({
              "@type": "Question",
              "name": question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": answer,
              },
            })),
          }),
        }}
      />
    </>
  )
}
