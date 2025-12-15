'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Script from 'next/script'
import Lenis from '@studio-freight/lenis'
import Hero from "@/PageComponents/Landing Home/Hero"
import Pitch from "@/PageComponents/Landing Home/Pitch"
import Result from "@/PageComponents/Landing Home/Results"
import Grow from "@/PageComponents/Landing Home/Grow"
import Need from "@/PageComponents/Landing Home/Need"
import Banner from "@/PageComponents/Global Components/Banner"
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import DMvalue from '@/PageComponents/Landing Home/DMvalue'
import Services from '@/PageComponents/Landing Home/Services'
import WhyUs from '@/PageComponents/Global Components/WhyUs'
import Stats from '@/PageComponents/Global Components/Stats'
import BannerMarqee from '@/PageComponents/Landing Home/BannerMarqee'
import Invest from '@/PageComponents/Landing Home/Invest'
import Faq from '@/PageComponents/Landing Home/Faq'
import ContactForm from '@/PageComponents/Global Components/Contact'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'

import { Search, Target, Facebook, Globe, BrainCircuit, Smartphone } from 'lucide-react'
import HomeFiller from '@/PageComponents/Landing Home/FillerSection'
import HomePaidAds from '@/PageComponents/Landing Home/PaidAds'
import NavBar from '@/PageComponents/Global Components/Header'
import Footer from '@/PageComponents/Global Components/Footer'

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
const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is digital marketing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Digital marketing is the promotion of your business through online channels like search engines, social media, email, and websites. It helps you reach your target audience where they spend their time online and is more cost-effective than traditional marketing."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to see SEO results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO typically takes 3-6 months to show significant results. However, you may notice small improvements within the first few weeks. SEO is a long-term investment that delivers sustainable organic traffic and continues working for your business over time."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between SEO and PPC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO (Search Engine Optimization) focuses on improving organic search rankings and provides long-term results. PPC (Pay-Per-Click) delivers immediate visibility through paid ads but stops when you stop paying. Both strategies work best when used together."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I budget for digital marketing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most small businesses allocate 7-12% of their revenue to marketing. The exact budget depends on your goals, industry, and competition. We offer affordable packages starting with essential services and scaling up as your business grows."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need social media for my business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, social media helps you connect with customers, build brand awareness, and drive website traffic. Focus on platforms where your target audience spends time, whether that's Facebook, Instagram, LinkedIn, or others relevant to your industry."
      }
    },
    {
      "@type": "Question",
      "name": "What is local SEO and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Local SEO helps your business appear in local search results when people search for services near them. It's crucial for businesses with physical locations or serving specific areas, helping you attract nearby customers actively looking for your services."
      }
    },
    {
      "@type": "Question",
      "name": "How do Google Ads work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads displays your ads when people search for keywords related to your business. You only pay when someone clicks your ad. With proper targeting and optimization, Google Ads can generate qualified leads and provide immediate visibility at the top of search results."
      }
    },
    {
      "@type": "Question",
      "name": "What is a conversion rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conversion rate is the percentage of website visitors who complete a desired action, like making a purchase or filling out a contact form. A higher conversion rate means your marketing efforts are effectively turning visitors into customers or leads."
      }
    },
    {
      "@type": "Question",
      "name": "Can I do digital marketing myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While basic digital marketing is possible on your own, effective campaigns require expertise, time, and ongoing optimization. An experienced agency provides strategy, tools, and knowledge to maximize your ROI while you focus on running your business."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure digital marketing success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We track key metrics like website traffic, search rankings, conversion rates, cost per lead, click-through rates, and ROI. You'll receive regular reports showing exactly how your campaigns perform and the real business results we're delivering for your investment."
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
          __html: JSON.stringify(faqSchemaData)
        }}
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
            <Services featuresList={featuresList} />
            <HomeFiller />
          </div>
        </div>

        <div className='hidden lg:block'>
          <BannerMarqee/>
        </div>

        <WhyUs/>
        <Invest/>

        {/* Paid Ads % Faq & Stats */}
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
            <HomePaidAds/>
            <Stats />
            <Faq />
          </div>
        </div>

        <ContactForm />
        <Footer/>
      </main>
    </>
  )
}
