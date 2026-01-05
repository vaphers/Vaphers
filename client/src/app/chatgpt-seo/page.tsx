"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import ContactForm from '@/PageComponents/Global Components/Contact';
import ChatGPTSEOPitch from './Components/Pitch';
import WeKnowWhatWorks from './Components/GetCited';
import Banner from '@/PageComponents/Global Components/Banner';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import ShoppingListing from './Components/ShoppingListings';
import ChatGPTLeadsSection from './Components/Leads';
import ChatGPTSeoFaq from './Components/FAQ';

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

  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is ChatGPT SEO and why do I need it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ChatGPT SEO is the process of optimizing your content to get cited in ChatGPT's search results and AI-generated responses. With 3.7+ billion monthly visits and 37.5 million daily searches, ChatGPT users are actively researching solutions and making buying decisions. Getting cited means reaching high-intent prospects at the exact moment they're evaluating options, delivering qualified leads that traditional SEO can't match."
        }
      },
      {
        "@type": "Question",
        "name": "How is ChatGPT SEO different from traditional SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional SEO optimizes for keyword rankings and backlinks. ChatGPT SEO optimizes for conversational queries and AI citations using natural language processing. While Google shows ranked results based on keywords and EEAT, ChatGPT provides direct answers with cited sources based on semantic understanding and contextual relevance. Success requires answer-first formatting, structured data, and content that directly addresses user questions rather than keyword density."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get cited in ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initial citations typically appear within 4-8 weeks of implementing AI SEO strategies. Building consistent citation authority takes 3-6 months of focused optimization. Factors include your existing domain authority, content quality, E-E-A-T signals, and competition in your niche. Quick wins come from optimizing high-authority pages with answer-first formatting, while long-term success requires comprehensive conversational content strategy."
        }
      },
      {
        "@type": "Question",
        "name": "What makes content citation-worthy for ChatGPT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Citation-worthy content demonstrates clear expertise, provides accurate and verifiable data, uses conversational long-tail keywords, answers specific questions directly with answer-first formatting, includes recent statistics and examples, employs bullet points and structured lists, and comes from authoritative domains. ChatGPT favors content optimized for natural language processing that AI can confidently cite as trustworthy and helpful for users making decisions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track my ChatGPT SEO performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Track citation frequency using automated AEO platforms like Relixir that monitor ChatGPT mentions across thousands of prompts, measure referral traffic from chatgpt.com in Google Analytics, use citation tracking tools to identify when you're cited, analyze competitor citations in your niche, and monitor conversational query rankings. Leading platforms combine citation tracking with automated content generation and can flip AI rankings in under 30 days."
        }
      },
      {
        "@type": "Question",
        "name": "How much does ChatGPT SEO cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ChatGPT SEO investment varies based on your industry, competition, and goals. Most businesses invest $2,000-$5,000+ monthly for comprehensive AI optimization including conversational content creation, E-E-A-T building, technical optimization, and citation monitoring. Basic packages start at $2,500/month with setup fees around $1,500. ROI typically ranges from 300-500% as citations drive highly qualified leads with transactional intent (9x higher) and shorter sales cycles."
        }
      },
      {
        "@type": "Question",
        "name": "Does ChatGPT SEO work for B2B or B2C businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both. B2B businesses benefit from ChatGPT's professional user base researching solutions, comparing vendors, and evaluating features using detailed conversational queries. B2C businesses capture consumers researching products, reading reviews, and making purchase decisions with transactional intent. ChatGPT's conversational interface is especially powerful for complex decision-making processes. The key is optimizing for your audience's specific natural language search patterns and question-based queries."
        }
      },
      {
        "@type": "Question",
        "name": "Should I hire an agency for ChatGPT SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ChatGPT SEO requires specialized expertise in conversational AI optimization, natural language processing, citation strategies, answer-first content formatting, and automated citation tracking platforms. Agencies bring proven frameworks, access to AEO monitoring tools like Relixir, multi-channel AI optimization expertise, and dedicated account management. Most businesses lack in-house ChatGPT SEO expertise, making agencies the faster path to citations, qualified leads with high transactional intent, and measurable ROI."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <main>
        <HeroSEO 
          heading="ChatGPT SEO to Help You Get Cited"
          subtext="Boost your presence on ChatGPT and other AI search platforms with focused GEO strategies that improve citation visibility, grow qualified traffic, and position your brand as the trusted authority in conversational AI responses."
          badgeText="Explore our ChatGPT SEO solutions"
        />
        <ChatGPTSEOPitch/>
        <WeKnowWhatWorks/>
        <Banner/>
        <Testimonial/>
        <ShoppingListing/>
        <ChatGPTLeadsSection/>
        <ChatGPTSeoFaq/>
        <ContactForm/>
      </main>
    </>
  );
}
