"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import ContactForm from '@/PageComponents/Global Components/Contact';
import PerplexitySEOPitch from './Components/Pitch';
import GetCitedPerplexity from './Components/GetCited';
import Banner from '@/PageComponents/Global Components/Banner';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import PerplexityTimeline from './Components/Timeline';
import PerplexityLeadsSection from './Components/Leads';
import WhyVaphersSection from './Components/WhyUs';
import PerplexitySeoFaq from './Components/Faq';

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

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Perplexity SEO and why do I need it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perplexity SEO is the process of optimizing your content to get cited in Perplexity AI's search results. With 780 million monthly queries across 238 countries, Perplexity users are actively researching solutions and making buying decisions. Getting cited means reaching high-intent prospects at the exact moment they're evaluating options, delivering qualified leads that traditional SEO can't match."
        }
      },
      {
        "@type": "Question",
        "name": "How is Perplexity SEO different from traditional SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional SEO optimizes for keyword rankings and traffic. Perplexity SEO optimizes for AI citations and recommendations. While Google shows 10 blue links, Perplexity provides direct answers with 3-5 cited sources. Success requires E-E-A-T signals, structured data, authoritative content, and citation-worthy expertise. You're not competing for rankings—you're competing to be the AI's trusted recommendation."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get cited in Perplexity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initial citations typically appear within 4-8 weeks of implementing AI SEO strategies. Building consistent citation authority takes 3-6 months of focused optimization. Factors include your existing domain authority, content quality, E-E-A-T signals, and competition in your niche. Quick wins come from optimizing high-authority pages, while long-term success requires comprehensive AI content strategy."
        }
      },
      {
        "@type": "Question",
        "name": "What makes content citation-worthy for Perplexity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Citation-worthy content demonstrates clear expertise, provides accurate and verifiable data, uses structured formatting (lists, tables, definitions), answers specific questions directly, includes recent statistics and examples, and comes from authoritative domains. Perplexity favors content that AI can confidently cite as trustworthy, accurate, and helpful for users making decisions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track my Perplexity SEO performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Track citation frequency by monitoring branded queries, measure referral traffic from perplexity.ai in Google Analytics, use citation monitoring tools to track when you're mentioned, analyze competitor citations in your niche, and monitor rankings for target queries. Our AI SEO Services include real-time citation tracking, weekly optimization reports, and transparent ROI metrics."
        }
      },
      {
        "@type": "Question",
        "name": "How much does Perplexity SEO cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perplexity SEO investment varies based on your industry, competition, and goals. Most businesses invest $1,500-$5,000+ monthly for comprehensive AI optimization including content creation, E-E-A-T building, technical optimization, and citation monitoring. ROI typically ranges from 300-500% as citations drive highly qualified leads with strong purchase intent and shorter sales cycles."
        }
      },
      {
        "@type": "Question",
        "name": "Does Perplexity SEO work for B2B or B2C businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both. B2B businesses benefit from Perplexity's professional user base researching solutions, comparing vendors, and evaluating features. B2C businesses capture consumers researching products, reading reviews, and making purchase decisions. Perplexity Voice (40% of mobile queries) is especially powerful for local B2C businesses. The key is optimizing for your audience's specific search patterns and decision-making process."
        }
      },
      {
        "@type": "Question",
        "name": "Should I hire an agency for Perplexity SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI SEO requires specialized expertise in algorithm behavior, citation strategies, E-E-A-T optimization, and structured data implementation. Agencies bring proven frameworks, access to citation monitoring tools, multi-channel AI optimization expertise, and dedicated account management. Most businesses lack in-house AI SEO expertise, making agencies the faster path to citations, qualified leads, and measurable ROI."
        }
      }
    ]
  }
  
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main>
        <HeroSEO 
          heading="Perplexity SEO to Help You Get Discovered"
          subtext="Boost your presence on Perplexity and other AI search platforms with focused SEO strategies that improve visibility, grow qualified traffic, and keep your brand in front of evolving user behavior.."
          badgeText="Explore our SEO solutions"
        />
        <PerplexitySEOPitch/>
        <GetCitedPerplexity/>
        <Banner/>
        <Testimonial/>
        <PerplexityTimeline/>
        <PerplexityLeadsSection/>
        <WhyVaphersSection/>
        <PerplexitySeoFaq/>
        <ContactForm/>
      </main>
    </>
  );
}
