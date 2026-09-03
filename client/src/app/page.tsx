'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Script from 'next/script'
import Lenis from '@studio-freight/lenis'
import Hero from "@/PageComponents/Landing Home/Hero"
import AiSeoSection from "@/PageComponents/Landing Home/AiSeoSection"
import Result from "@/PageComponents/Landing Home/Results"
import Grow from "@/PageComponents/Landing Home/Grow"
import Need from "@/PageComponents/Landing Home/DoYouNeedVisiblity"
import Banner from "@/PageComponents/Global Components/Banner"
import TestimonialSection from '@/PageComponents/Global Components/Testimonial'
import Services from '@/PageComponents/Landing Home/Services'
import Stats from '@/PageComponents/Global Components/Stats'
import BannerMarqee from '@/PageComponents/Landing Home/BannerMarqee'
import Invest from '@/PageComponents/Landing Home/Invest'
import ContactForm from '@/PageComponents/Global Components/Contact'
import { Search, Target, Facebook, Globe, BrainCircuit, Smartphone } from 'lucide-react'
import HomeFiller from '@/PageComponents/Landing Home/FillerSection'
import WebsiteSection from '@/PageComponents/Landing Home/WebsiteSection'
import NavBar from '@/PageComponents/Global Components/Header'
import MarketingPriceCalculator from '@/PageComponents/Global Components/PriceCalc'
import ImageComparisonSlider from '@/PageComponents/Landing Home/ImageComparison'
import InternaionalSEO from '@/PageComponents/Landing Home/InternationalSEO'
import Footer from '@/PageComponents/Global Components/Footer'
import MarketingStagesSection from '@/PageComponents/Landing Home/MarketingStages'
import ContactSection from '@/PageComponents/Landing Home/ContactSection'
import WhyVaphers from '@/PageComponents/Landing Home/WhyVaphers'
import HeroHomeMain from '../PageComponents/Components Home Main/Hero'
import Charts from '@/PageComponents/Props Based Components/Chart'



const heroData = {
    mainTitle: "Elevating interior design studios with high-aesthetic digital growth",
    mainDescription: "We partner with interior designers and architecture firms to design bespoke luxury websites, dominate high-intent local search, and unlock client acquisition pipelines that deliver high-ticket residential and commercial projects.",
    topStatLabel: "Client project pipeline value",
    topStatValue: "$50M+",
    stats: [
      {
        id: "1",
        category: "Design inquiries delivered",
        value: "25k+",
        subtext: "Connecting luxury interior designers with affluent homeowners and high-end property developers.",
        cardHeight: "220px", // Shortest
      },
      {
        id: "2",
        category: "Studios scaled",
        value: "150+",
        subtext: "Empowering boutique interior design firms and architectural studios nationwide.",
        cardHeight: "300px", 
      },
      {
        id: "3",
        category: "Client satisfaction",
        value: "99%",
        subtext: "High-touch marketing and luxury web design delivering predictable studio growth.",
        cardHeight: "420px", // Tallest
        isStriped: true,     // Triggers the CSS repeating background
      },
      {
        id: "4",
        category: "Average ROI",
        value: "350%",
        subtext: "Maximizing return through high-budget residential transformations and signed design retainers.",
        cardHeight: "260px", 
      }
    ]
  };

const featuresList = [
  {
    icon: Search,
    title: 'SEO Services',
    description:
      'Improve your search rankings and drive organic traffic with comprehensive SEO strategies. From keyword research to technical optimization, we help your business appear at the top when customers search for your services online.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    link: "https://www.vaphers.com/seo-services"
  },
  {
    icon: BrainCircuit,
    title: 'AI SEO Services',
    description:
      'Leverage cutting-edge artificial intelligence to supercharge your SEO strategy. Our AI-powered tools analyze data, predict trends, and automate optimization for faster results and competitive advantages.',
    cardBorderColor: 'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
    link: "https://www.vaphers.com/seo-services/ai-seo-services"
  },
  {
    icon: Smartphone,
    title: 'Ecommerce SEO',
    description:
      'Transform your business idea into a powerful mobile application. We build intuitive iOS and Android apps that engage users, streamline operations, and open new revenue channels for your business.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    link: "https://www.vaphers.com/seo-services/ecommerce-seo-services"
  },
  {
    icon: Target,
    title: 'Google Ads Management',
    description:
      'Generate qualified leads with targeted Google Ads campaigns that deliver immediate visibility. Our PPC experts optimize your ad spend to maximize ROI, ensuring every click counts toward your business goals.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    link: "https://www.vaphers.com/ppc-marketing/google-ads-management-services"
  },
  {
    icon: Facebook,
    title: 'Meta Ads Management' ,
    description:
      'Reach your ideal customers on Facebook and Instagram with precision-targeted Meta advertising campaigns. Build brand awareness and drive conversions through engaging social media ads optimized for performance.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    link: "https://www.vaphers.com/ppc-marketing//meta-ads-management-services"
  },
  {
    icon: Globe,
    title: 'Next.js Development',
    description:
      'Create stunning, responsive websites that convert visitors into customers. Our custom web solutions combine modern design with powerful functionality to deliver seamless user experiences across all devices.',
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10',
    link: "https://www.vaphers.com/website-development-services/nextjs-website-development"
  },
]


// Organization Schema Data
const organizationSchemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vaphers",
  "url": "https://www.vaphers.com",
  "logo": "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767349560/VaphersLogo_xggglq.png",
  "foundingDate": "2025",
  "founder": {
    "@type": "Person",
    "name": "Muhammad Asad"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9641861932",
    "contactType": "customer service"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://x.com/VaphersTech",
    "https://www.instagram.com/vaphers/",
    "https://www.linkedin.com/in/vaphers-technologies"
  ],
  "description": "Vaphers is a premier digital marketing agency specializing in SEO, AI SEO, and high-ticket client acquisition for interior designers, architects, and luxury home studios."
}

// FAQ Schema Data
const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does marketing for interior designers differ from general marketing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interior design marketing focuses on attracting high-net-worth homeowners and luxury commercial clients who value bespoke craftsmanship and have substantial project budgets. It requires high-aesthetic visual positioning, hyper-local zip-code targeting, entity SEO, and qualified inquiry funnels rather than generic volume traffic."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take for an interior design studio to see SEO results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Local SEO and Google Maps optimization typically yield qualified design inquiries within 60 to 90 days. Comprehensive organic ranking for competitive luxury renovation keywords and AI search engine visibility builds compounding authority over 3 to 6 months."
      }
    },
    {
      "@type": "Question",
      "name": "How do Google Ads and Meta Ads help interior designers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Search Ads capture affluent homeowners actively looking for 'luxury interior designer near me' or 'high-end home renovation architect'. Meta (Instagram & Facebook) Ads showcase your portfolio walkthroughs and design aesthetics directly to homeowners in affluent zip codes, building prestige brand awareness and booking design consultations."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure leads are qualified with high design budgets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We implement multi-step consultation intake forms with budget thresholds, tailored messaging that speaks directly to luxury clients, and negative keyword filtering to eliminate DIY inquiries, tire-kickers, and low-budget searches."
      }
    },
    {
      "@type": "Question",
      "name": "What is Generative Engine Optimization (GEO) for interior designers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GEO optimizes your interior design studio's digital entity so that when potential clients ask AI assistants like ChatGPT, Perplexity, or Google AI Overviews for recommendations on the best interior designers in their city, your studio is cited and recommended as the authoritative choice."
      }
    }
  ]
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

  return (
    <>
      {/* Organization Schema Markup */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchemaData)
        }}
        strategy="beforeInteractive"
      />

      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaData)
        }}
        strategy="beforeInteractive"
      />

      <main>
        {/* <NavBar/> */}
        {/* <Hero /> */}
        <HeroHomeMain/>
        <Result />
        <ImageComparisonSlider/>
        <InternaionalSEO/>
        <Need/>
        <MarketingStagesSection/>
        <TestimonialSection/>
        <AiSeoSection />
        <Services/>
        <WebsiteSection />


        <Charts {...heroData} />

        <ContactSection/>
        <Footer/>
      </main>
    </>
  )
}
