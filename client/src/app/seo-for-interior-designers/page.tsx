'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from './Components/Hero'
import Results from '@/PageComponents/Landing Home/Results'
import OpeningSection from './Components/OpeningSection'
import Carousel from './Components/Carousel'
import BuiltFor from './Components/BuiltFor'
import DoYouNeedSEO from './Components/DoYouNeedSEO'
import WhatYouGet from './Components/WhatYouGet'
import SocialProofSection from '@/PageComponents/Global Components/Testimonial'
import InteriorDesignPartnerSection from './Components/PartnerSection'
import Chart from './Components/Charts'
import InteriorDesignFaq from './Components/FAQ'
import ContactSection from '@/PageComponents/Landing Home/ContactSection'



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
      {/* 1. Breadcrumb Schema */}
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
                "name": "SEO Services",
                "item": "https://www.vaphers.com/seo-services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "SEO for Interior Designers",
                "item": "https://www.vaphers.com/seo-for-interior-designers"
              }
            ]
          })
        }}
      />

      {/* 2. FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does SEO take to show results for an interior design studio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most interior design studios begin seeing meaningful improvements within 3–6 months. Early wins typically come from local map pack visibility and image search indexation. Ranking for competitive terms like 'luxury interior designer [city]' usually takes 6–12 months of consistent effort, but the traffic compounds over time."
                }
              },
              {
                "@type": "Question",
                "name": "How do you optimize my portfolio images without slowing down the site?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We use next-gen image formats (WebP and AVIF), intelligent lazy loading that preserves indexation, responsive srcset attributes, and CDN-based compression that maintains visual quality while cutting file sizes by 60–80%. We also implement structured data for your project galleries so Google can properly index them in image search results."
                }
              },
              {
                "@type": "Question",
                "name": "Can SEO help me attract high-budget residential clients?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. High-end residential clients research extensively online before reaching out. SEO puts your work in front of these buyers during that research phase by targeting long-tail keywords like 'luxury home interior designer [city]' and 'high-end kitchen remodel designer' that signal serious buying intent."
                }
              },
              {
                "@type": "Question",
                "name": "Do you help with Houzz and Pinterest visibility too?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. We optimize your Houzz profile, project descriptions, and review strategy. For Pinterest, we build keyword-optimized boards around your design niches, optimize pin descriptions for search, and drive referral traffic back to your main website where visitors can book a consultation."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between your service and a generic SEO agency?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Interior design SEO is visual-first, portfolio-driven, and targets clients with long research cycles and high project values. We optimize for Google Images, Pinterest, and Houzz alongside traditional organic search, and build every strategy around how design clients actually search and decide."
                }
              },
              {
                "@type": "Question",
                "name": "Will SEO work if I only serve a specific metro area?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Local SEO is one of the highest-ROI strategies for interior designers who serve a defined geographic area. We optimize your Google Business Profile, build location-specific landing pages, and target hyper-local keywords to get your studio into the Google Map Pack."
                }
              },
              {
                "@type": "Question",
                "name": "How do you measure success for an interior design SEO campaign?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We track consultation form submissions, phone calls from organic search, portfolio page views, Google Images impressions, local map pack visibility, and keyword rankings for your target service areas and design niches. No vanity metrics — just data that reflects real business growth."
                }
              },
              {
                "@type": "Question",
                "name": "I get most of my clients from referrals. Why do I need SEO?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Referrals are excellent but unpredictable. SEO runs alongside them as a consistent, compounding source of qualified inquiries. People who find you through search have already seen your portfolio and decided you're worth contacting — they're often further along in their decision-making than a cold referral."
                }
              }
            ]
          })
        }}
      />


      <div>
        <Hero/>
        <Results/>
        <OpeningSection/>
        <BuiltFor/>
        <Carousel/>
        <DoYouNeedSEO/>
        <SocialProofSection/>
        <WhatYouGet/>
        <InteriorDesignPartnerSection/>
        <Chart/>
        {/* <InteriorDesignFaq/> */}
        <ContactSection/>   
      </div>
    </>
  )
}
