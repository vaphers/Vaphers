'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from "@/PageComponents/Landing SEO/Hero"
import AiSection from '@/PageComponents/Landing SEO/Pitch'
import Results from "@/PageComponents/Landing Home/Results"
import GrowWithSEO from '@/PageComponents/Landing SEO/Grow'
import SeoNeed from '@/PageComponents/Landing SEO/Need'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from "@/PageComponents/Global Components/Testimonial"
import SeoLeads from '@/PageComponents/Landing SEO/MoreLeads'
import Filler from '@/PageComponents/Landing SEO/Filler'
import SEOContentSection from '@/PageComponents/Landing SEO/SEO'
import Stats from '@/PageComponents/Global Components/Stats'
import WhyUs from '@/PageComponents/Global Components/WhyUs'
import SeoFaq from '@/PageComponents/Landing SEO/FAQ'
import ContactForm from '@/PageComponents/Global Components/Contact'
import ServicesAccordion from '@/PageComponents/Landing SEO/Service'

// FAQ Data for schema
export const seoFaqData = [
  {
    question: "What is SEO and why does my business need it?",
    answer: "SEO (Search Engine Optimization) is the process of improving your website's visibility in search engine results like Google. Your business needs SEO because 93% of online experiences begin with a search engine, and 75% of users never scroll past the first page. Without SEO, potential customers searching for your products or services won't find you, giving competitors an advantage.",
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO typically takes 3-6 months to show significant results, though some improvements may be visible sooner. The timeline depends on your industry competition, current website authority, content quality, and keyword difficulty. SEO is a long-term investment that builds compounding returns over time, unlike paid ads that stop working when you stop paying.",
  },
  {
    question: "What's the difference between on-page and off-page SEO?",
    answer: "On-page SEO involves optimizing elements on your website like content quality, keyword placement, meta tags, headers, URL structure, and page speed. Off-page SEO focuses on building your site's authority through external factors like backlinks from reputable websites, social signals, brand mentions, and online reputation. Both are essential for ranking success.",
  },
  {
    question: "How much does professional SEO services cost?",
    answer: "Professional SEO services typically range from $500-$5,000+ per month depending on business size, competition level, and scope of work. Small local businesses might pay $500-$1,500/month, while enterprise companies invest $5,000-$20,000+ monthly. SEO is an investment that generates long-term organic traffic worth significantly more than the initial cost.",
  },
  {
    question: "Can I do SEO myself or should I hire an agency?",
    answer: "You can handle basic SEO yourself by learning fundamentals like keyword research, content creation, and technical optimization. However, professional agencies bring expertise, specialized tools, proven strategies, and save you significant time. Consider DIY for small budgets or local businesses, but hire experts for competitive industries or if you lack time to learn and execute effectively.",
  },
  {
    question: "What are keywords and how do I choose the right ones?",
    answer: "Keywords are search terms people type into Google when looking for information, products, or services. Choose keywords by researching what your customers actually search for using tools like Google Keyword Planner, focusing on terms with decent search volume, manageable competition, and strong commercial or informational intent that aligns with your business goals.",
  },
  {
    question: "Does my business need local SEO?",
    answer: "Yes, if you serve customers in specific geographic areas, local SEO is essential. 46% of all Google searches have local intent, and 76% of people who search for something nearby visit a business within 24 hours. Local SEO optimizes your Google Business Profile, manages reviews, builds local citations, and targets location-specific keywords to attract nearby customers.",
  },
  {
    question: "How does technical SEO impact my rankings?",
    answer: "Technical SEO ensures search engines can properly crawl, index, and understand your website. It includes site speed optimization, mobile responsiveness, SSL security, XML sitemaps, structured data, and fixing crawl errors. Poor technical SEO prevents even great content from ranking because search engines struggle to access and evaluate your pages properly.",
  },
  {
    question: "What's the difference between SEO and SEM?",
    answer: "SEO (Search Engine Optimization) focuses on earning organic, unpaid rankings through content quality and optimization. SEM (Search Engine Marketing) includes both SEO and paid advertising like Google Ads. SEO builds long-term sustainable traffic but takes time, while SEM's paid component delivers immediate visibility but requires continuous investment.",
  },
  {
    question: "How do I measure SEO success and ROI?",
    answer: "Measure SEO success through key metrics: organic traffic growth, keyword rankings improvement, conversion rate increases, and revenue from organic channels. Use Google Analytics to track traffic and conversions, Google Search Console for rankings and impressions, and calculate ROI by comparing organic revenue gains against your SEO investment costs over time.",
  },
]

// Service Data for schema
export const seoServicesData = [
  {
    name: "Local SEO Optimization Service",
    description: "Dominate local search results and capture nearby customers actively searching for your services. We optimize your Google Business Profile, build authoritative local citations across 50+ directories, and implement geo-targeted keyword strategies that drive phone calls, foot traffic, and local conversions."
  },
  {
    name: "AI SEO Optimization Service",
    description: "Position your brand as the authoritative answer across ChatGPT, Google Gemini, Perplexity, and emerging AI search platforms. We optimize content for natural language processing, implement advanced structured data, and create comprehensive FAQ content that AI engines prioritize when generating responses."
  },
  {
    name: "Ecommerce SEO Service",
    description: "Scale your online store revenue with product page optimization that converts browsers into buyers. We implement category architecture optimization, rich snippet schema, and technical fixes that improve crawlability while targeting high-intent transactional keywords that drive sales."
  },
  {
    name: "Technical SEO Optimization",
    description: "Fix critical backend issues preventing search engines from properly crawling, indexing, and ranking your website. We conduct comprehensive technical audits addressing site speed, Core Web Vitals, mobile responsiveness, crawl errors, and server configuration problems that suppress visibility."
  },
  {
    name: "SEO Auditing & Analysis",
    description: "Uncover hidden opportunities and diagnose issues sabotaging your search performance with comprehensive website analysis. We evaluate 200+ ranking factors including technical health, content quality, backlink profile, and competitive gaps, delivering a prioritized action plan for measurable growth."
  }
]

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
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": seoFaqData.map(({ question, answer }) => ({
              "@type": "Question",
              "name": question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
              }
            }))
          })
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "SEO Services",
            "provider": {
              "@type": "Organization",
              "name": "Virtual Orbit",
              "url": "https://yourwebsite.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "SEO Services",
              "itemListElement": seoServicesData.map((service) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.name,
                  "description": service.description
                }
              }))
            }
          })
        }}
      />

      <div>
        <Hero />
        <AiSection />
        <Results />
        <GrowWithSEO />
        <SeoNeed />
        <div className='hidden lg:block'>
          <Banner />
        </div>
        <Testimonial />
        <SeoLeads />
        <Filler />
        <ServicesAccordion />
        <SEOContentSection />
        <div className='lg:px-40 flex-justify-center'>
          <Stats />
        </div>
        <WhyUs />
        <SeoFaq data={seoFaqData} />
        <ContactForm />
      </div>
    </>
  )
}
