'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import ContactForm from '@/PageComponents/Global Components/Contact'
import WebDevHero from '@/PageComponents/WebDev Landing Components/Hero'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'    
import WebDesignPitch from '@/PageComponents/WebDev Landing Components/Pitch'
import WhyResponsive from '@/PageComponents/WebDev Landing Components/WhyResponsive'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import WebDesignSection from '@/PageComponents/WebDev Landing Components/FillerSection'
import WordpressShopifyNext from '@/PageComponents/WebDev Landing Components/WordpressShopifyNext'
import SixKeysDesignSection from '@/PageComponents/WebDev Landing Components/FiveKeys'
import { ResponsiveVsNonResponsive } from '@/PageComponents/WebDev Landing Components/ResponsiveVsNon'
import Stats from '@/PageComponents/Global Components/Stats'
import ChooseCompany  from '@/PageComponents/WebDev Landing Components/ChooseComapny'
import WebDesignFaq from '@/PageComponents/WebDev Landing Components/Faq'
import { Tools } from '@/PageComponents/WebDev Landing Components/TechStack'

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

const webDesignFaqData = [
  {
    question: "How much does a professional website cost?",
    answer:
      "Budgets vary by scope, but most custom small–mid websites fall in a broad range depending on page count, design depth, integrations, e‑commerce, and content creation. Ask for an itemized scope with inclusions (pages, copy/SEO, integrations, QA, training, support) so proposals are comparable.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "A focused small business site can launch in 3–6 weeks across discovery, design, development, QA, and launch. Complex features (e‑commerce, portals, custom integrations) extend timelines. Clear milestones and approvals help keep schedules predictable.",
  },
  {
    question: "What’s included in web design services?",
    answer:
      "Typical inclusions: discovery and sitemap, UX/UI design, mobile‑responsive build, content integration, on‑page SEO basics (meta, headings, alt text, schema where relevant), performance tuning, QA, analytics/search console setup, and launch support.",
  },
  {
    question: "Do I own my website, code, and content?",
    answer:
      "Yes—ownership should transfer at handoff. Ensure your contract states you own code, content, and accounts (domain, hosting, CMS, analytics). Request access and documentation at project completion.",
  },
  {
    question: "Is SEO included with my website?",
    answer:
      "Most projects include on‑page SEO foundations (semantics, metadata, clean URLs, internal links, alt text, schema where relevant) and technical best practices (sitemaps, performance, mobile responsiveness). Ongoing SEO campaigns are typically separate.",
  },
  {
    question: "How many design revisions are included?",
    answer:
      "A common model is unlimited design revisions before development, then change requests via a simple change order once build starts. Confirm revision rounds and what constitutes a change vs. scope expansion.",
  },
  {
    question: "Do you provide maintenance and support?",
    answer:
      "Post‑launch support often covers backups, security updates, and minor fixes for 30–60 days, followed by monthly maintenance plans as needed. Ask about staging updates, uptime monitoring, and response SLAs.",
  },
  {
    question: "Which platform should I choose (WordPress, Shopify, custom)?",
    answer:
      "Match platform to needs: WordPress for content‑led sites, Shopify for e‑commerce, and custom frameworks for specialized apps. Consider editorial workflow, integrations, scalability, TCO, and performance when selecting.",
  },
]

function getFaqJsonLd(faqItems: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

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

  const faqJsonLd = useMemo(() => getFaqJsonLd(webDesignFaqData), [])

  return (
    <>
      {/* 1. Breadcrumb Schema (NEW) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.vaphers.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Website Development Services",
                "item": "https://www.vaphers.com/website-development-services"
              }
            ]
          })
        }}
      />

      {/* 2. FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div>
        <WebDevHero/>
        <PortfolioMarquee images={portfolioImages} pxPerSec={140} />
        <WebDesignPitch/>
        <WhyResponsive/>
        <Banner/>
        <Testimonial/>
        <WebDesignSection/>
        <Tools/>
        <WordpressShopifyNext/>
        <SixKeysDesignSection/>
        <ResponsiveVsNonResponsive/>
        <ChooseCompany/>
        <Stats/>
        <WebDesignFaq data={webDesignFaqData}/>
        <ContactForm />
      </div>
    </>
  )
}

