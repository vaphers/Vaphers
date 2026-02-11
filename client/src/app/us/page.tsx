'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Script from 'next/script'
import Lenis from '@studio-freight/lenis'
import Hero from "@/app/us/Components/Hero"
import Pitch from "@/app/us/Components/Pitch"
import Result from "@/PageComponents/Landing Home/Results"
import Grow from "@/app/us/Components/Grow"
import Need from "@/app/us/Components/Need"
import Banner from "@/PageComponents/Global Components/Banner"
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import DMvalue from '@/app/us/Components/MarketingValue'
import Services from '@/app/us/Components/Services'
import WhyUs from '@/PageComponents/Global Components/WhyUs'
import Stats from '@/PageComponents/Global Components/Stats'
import BannerMarqee from '@/app/us/Components/BannerMarqee'
import Invest from '@/app/us/Components/Invest'
import Faq from '@/PageComponents/Landing Home/Faq'
import ContactForm from '@/PageComponents/Global Components/Contact'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'

import { Search, Target, Facebook, Globe, BrainCircuit, Smartphone } from 'lucide-react'
import HomeFiller from '@/app/us/Components/FillerSection'
import HomePaidAds from '@/PageComponents/Landing Home/PaidAds'
import NavBar from '@/PageComponents/Global Components/Header'
import Footer from '@/PageComponents/Global Components/Footer'
import PricingComponent from '@/PageComponents/Global Components/Pricing'
import PricingCalc from '@/PageComponents/Global Components/Pricing'
import MarketingPriceCalculator from '@/PageComponents/Global Components/PriceCalc'

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
]


// FAQ Schema Data
const faqSchemaDataUS = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is digital marketing in the USA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Digital marketing in the USA involves promoting businesses through online channels such as Google Search, social media, email marketing, and websites to reach American consumers. It is one of the most cost-effective ways to generate leads and sales in competitive US markets."
      }
    },
    {
      "@type": "Question",
      "name": "How long does SEO take to work in the US market?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO in the US typically takes 3–6 months to show strong results due to high competition. Early improvements can appear within weeks, but long-term SEO delivers consistent organic traffic and leads over time."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between SEO and PPC in the USA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO focuses on ranking organically in US search results and builds long-term visibility, while PPC provides immediate exposure through paid ads on platforms like Google Ads. US businesses often use both together for maximum reach and ROI."
      }
    },
    {
      "@type": "Question",
      "name": "How much should US businesses spend on digital marketing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most US small and mid-sized businesses invest between 7–12% of their revenue in digital marketing. The ideal budget depends on your industry, competition, and growth goals. We offer scalable packages tailored to US businesses."
      }
    },
    {
      "@type": "Question",
      "name": "Is social media marketing important for US businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, social media marketing is essential for US businesses to build brand awareness, engage customers, and drive traffic. Platforms like Facebook, Instagram, LinkedIn, and TikTok are highly effective when used strategically."
      }
    },
    {
      "@type": "Question",
      "name": "What is local SEO in the United States?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Local SEO helps US businesses appear in location-based searches such as 'near me' or city-specific queries. It is especially important for companies serving specific states, cities, or local service areas."
      }
    },
    {
      "@type": "Question",
      "name": "How do Google Ads work for US companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads allows US businesses to display ads at the top of search results when users search for relevant keywords. You only pay when someone clicks your ad, making it a fast and measurable way to generate leads."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good conversion rate for US websites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A good conversion rate for US websites typically ranges from 2% to 5%, depending on the industry. Optimized landing pages, strong messaging, and targeted traffic can significantly improve conversion performance."
      }
    },
    {
      "@type": "Question",
      "name": "Can US businesses handle digital marketing in-house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While some US businesses manage basic marketing in-house, achieving strong results usually requires expert strategy, tools, and ongoing optimization. A professional agency helps maximize ROI and stay competitive in the US market."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure digital marketing success for US clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We measure success using key metrics such as organic traffic, keyword rankings in US search results, conversion rates, cost per lead, and ROI. Our US clients receive clear, transparent reports focused on real business growth."
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

      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaDataUS)
        }}
        strategy="beforeInteractive"
      />

      <main>
        <NavBar/>
        <Hero />
        <Pitch />
        <Result />
        <Grow/>
        <Need/>
        <Banner/>
        <Testimonial/>
        <DMvalue/>
        <PortfolioMarquee images={portfolioImages}  />
        {/* Filler & Services */}
        <div className="min-h-screen w-full relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 0",
              maskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              WebkitMaskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div className="relative z-10">
            <HomeFiller />
            <Services featuresList={featuresList} />
          </div>
        </div>

        <div className='hidden lg:block'>
          <BannerMarqee/>
        </div>
        <Invest/>
        <HomePaidAds/>
        <WhyUs/>
        <div className='pb-15'>
        <Stats />
        </div>
        <MarketingPriceCalculator/>

        {/* Paid Ads % Faq & Stats */}
        <div className="w-full relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 0",
              maskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              WebkitMaskImage: `
                repeating-linear-gradient(
                  to right,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                ),
                repeating-linear-gradient(
                  to bottom,
                  black 0px,
                  black 3px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div className="relative z-10">
            <Faq />
          </div>
        </div>

        <ContactForm />
        <Footer/>
      </main>
    </>
  )
}
