"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Script from 'next/script';
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import AiSection from '@/PageComponents/AI SEO Components/Pitch';
import WhyAIAgentsSEO from '@/PageComponents/AI SEO Components/WhyImportant';
import WhatsAEO from '@/PageComponents/AI SEO Components/Aeo';
import WhatsGEO from '@/PageComponents/AI SEO Components/Geo';
import Banner from '@/PageComponents/Global Components/Banner';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import AiSectionLeads from '@/PageComponents/AI SEO Components/Leads';
import AiServicesAccordion from '@/PageComponents/AI SEO Components/Services';
import WhyUs from '@/PageComponents/Global Components/WhyUs';
import Stats from '@/PageComponents/Global Components/Stats';
import AiSeoProcess from '@/PageComponents/AI SEO Components/Process';
import SeoFaq from '@/PageComponents/AI SEO Components/Faq'; 
import ContactForm from '@/PageComponents/Global Components/Contact';

// FAQ data
const aiSeoFaqs = [
  {
    question: "What is AI SEO and how is it different from traditional SEO?",
    answer: "AI SEO optimizes your content to appear in AI-generated responses from ChatGPT, Google Gemini, Perplexity, and voice assistants. Unlike traditional SEO that focuses on ranking in search results, AI SEO ensures your business is cited and recommended when users ask AI platforms for solutions. This captures the growing segment of searches that never click through to websites."
  },
  {
    question: "How do I get my website to show up in ChatGPT responses?",
    answer: "To appear in ChatGPT responses, your content needs authoritative sourcing signals, structured data markup, clear entity relationships, and comprehensive answers to specific questions. We optimize your content using semantic markup, FAQ schemas, and conversational formats that large language models prioritize when generating responses and citations."
  },
  {
    question: "What is Answer Engine Optimization (AEO)?",
    answer: "Answer Engine Optimization (AEO) is the practice of optimizing content to appear as direct answers in featured snippets, AI overviews, and voice search results. AEO focuses on structured, question-based content that search engines and AI platforms can easily extract and present as the primary answer to user queries."
  },
  {
    question: "Does AI SEO replace traditional SEO?",
    answer: "No, AI SEO complements traditional SEO. You still need strong technical SEO, quality content, and backlinks. However, AI SEO adds an additional layer by optimizing for how AI models understand and cite content. Businesses need both strategies to capture traffic from traditional search results and AI-powered recommendations."
  },
  {
    question: "How long does it take to see results from AI SEO?",
    answer: "Initial improvements in AI visibility can appear within 4-8 weeks as search engines index your optimized content. However, building strong authority that makes your business a consistent AI recommendation typically takes 3-6 months. Results depend on your industry competition, existing content quality, and implementation consistency."
  },
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer: "Generative Engine Optimization (GEO) is the process of optimizing content specifically for large language models like ChatGPT, Claude, and Gemini. GEO focuses on semantic content structures, entity optimization, and natural language patterns that AI models use to determine which sources to cite and recommend in generated responses."
  },
  {
    question: "Can AI SEO help with voice search?",
    answer: "Yes, AI SEO is highly effective for voice search optimization. Voice assistants like Siri, Alexa, and Google Assistant use AI models to understand queries and provide answers. By optimizing for conversational phrases, question-based content, and featured snippets, AI SEO dramatically increases your chances of being the voice search answer."
  },
  {
    question: "How much does AI SEO cost?",
    answer: "AI SEO services typically range from $2,000-$10,000 per month depending on your industry, competition level, and content volume. Investment includes content optimization, technical implementation, schema markup, ongoing monitoring, and strategy adjustments. Most businesses see ROI within 6-12 months through increased qualified traffic and AI-driven leads."
  },
  {
    question: "What is schema markup and why does it matter for AI?",
    answer: "Schema markup is structured data code that helps search engines and AI platforms understand your content's context and meaning. It explicitly defines entities, relationships, and content types. AI models heavily rely on schema to determine authoritative sources and extract accurate information for citations, making it essential for AI visibility."
  },
  {
    question: "Will AI SEO work for local businesses?",
    answer: "Absolutely. AI SEO is particularly powerful for local businesses because voice searches and AI queries often have local intent. When someone asks ChatGPT or Siri for recommendations near them, proper AI optimization ensures your business appears in those results. We combine AI SEO with local schema markup and Google Business Profile optimization for maximum local visibility."
  }
];

// Generate FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": aiSeoFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

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
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <main>
        <HeroSEO 
          heading="AI SEO Services That Transform Your Business"
          subtext="Boost your online visibility with our proven SEO strategies that deliver real results and drive organic traffic to your website."
          badgeText="Explore our SEO solutions"
        />
        <AiSection/>
        <WhyAIAgentsSEO/>
        <WhatsAEO/>
        <WhatsGEO/>
        <Banner/>
        <Testimonial/>
        <AiSectionLeads/>
        <AiServicesAccordion/>
        <AiSeoProcess/>
        <WhyUs/>
        <Stats/>
        <SeoFaq data={aiSeoFaqs} />
        <ContactForm/>
      </main>
    </>
  );
}
