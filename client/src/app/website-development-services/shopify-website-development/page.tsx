'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Script from 'next/script'
import Lenis from '@studio-freight/lenis'
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'    
import ShopifyPitch from '@/PageComponents/Shopify Dev Components/Pitch'
import WhatsShopify from '@/PageComponents/Shopify Dev Components/WhatsShopify'
import GrowWithShopify from '@/PageComponents/Shopify Dev Components/Grow'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import BuildShopifyStore from '@/PageComponents/Shopify Dev Components/BuildStore'
import ShopifyVsWooCommerce from '@/PageComponents/Shopify Dev Components/ShopifyWoo'
import ShopifyServicesAccordion from '@/PageComponents/Shopify Dev Components/Services'
import ShopifyFaq from '@/PageComponents/Shopify Dev Components/FAQ'

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

// FAQ Schema Data
const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Shopify and why should I use it for my online store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shopify is an all-in-one e-commerce platform that powers 5.8+ million stores globally. It's perfect for online businesses because you get hosting, security, payment processing, and inventory management in one place—no technical setup required. Launch in minutes, manage everything from one dashboard, and scale effortlessly with the world's highest-converting checkout."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a Shopify store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic Shopify store can be set up in 1-3 days if you're using templates. Professional custom-designed stores typically take 2-8 weeks depending on complexity, custom features, and product catalog size. We'll provide a detailed timeline after understanding your specific requirements and design preferences."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a Shopify store cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shopify plans start at $25-79/month for the platform. Professional store development ranges from $3,000-7,000 for mid-level stores, and $15,000-50,000+ for enterprise Shopify Plus stores with custom features. Monthly costs include your plan ($25-299), apps ($30-250), and marketing budget—predictable, all-inclusive pricing."
      }
    },
    {
      "@type": "Question",
      "name": "Can I manage my Shopify store myself without coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Shopify is designed for non-technical users. You can easily add products, manage inventory, process orders, and update content through an intuitive dashboard—no coding needed. We provide training and documentation so you can confidently run your store independently after launch."
      }
    },
    {
      "@type": "Question",
      "name": "Is Shopify mobile-friendly and responsive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100%. All Shopify themes are mobile-responsive by default, and 70% of shoppers browse on mobile. Our stores are optimized for seamless experiences across smartphones, tablets, and desktops with fast load times (309ms average) and mobile-optimized checkout that converts 64% better than desktop-only designs."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between Shopify and WooCommerce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shopify is fully hosted with hosting, security, and support included—launch in minutes. WooCommerce is self-hosted on WordPress, requiring you to manage hosting, updates, and security yourself. Shopify is 2.5x faster (309ms vs 776ms), has 24/7 support, and offers hassle-free management—perfect for entrepreneurs focused on selling, not server maintenance."
      }
    },
    {
      "@type": "Question",
      "name": "Can I migrate my existing store to Shopify?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We can migrate your store from WooCommerce, Magento, BigCommerce, or any platform to Shopify. This includes products, customer data, order history, and SEO settings. Migration typically takes 1-4 weeks depending on store size. We ensure zero downtime and minimal disruption to your business."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns my Shopify store and data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You own 100% of your business data, customer information, and content. You have full admin access and can export all data anytime. While Shopify hosts the platform, you control your store completely and can migrate to another platform if needed—though we hope you'll love staying on Shopify!"
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide Shopify maintenance and support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer comprehensive Shopify maintenance including theme updates, app management, performance optimization, security monitoring, and priority technical support. Issues are resolved within 24 hours. Our maintenance packages keep your store fast, secure, and running smoothly 24/7 so you can focus on growing sales."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get started with my Shopify store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Book a free consultation call with our team. We'll discuss your business goals, product catalog, design preferences, and budget. You'll receive a detailed proposal with pricing, timeline, and feature recommendations—clear and straightforward. No tech jargon, just honest advice to help you succeed."
      }
    }
  ]
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
      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchemaData)
        }}
        strategy="afterInteractive"
      />

      <div>
        <SubHero
          heading="Professional Shopify Development That Grows Your Business"
          subtext="Launch a powerful Shopify store tailored to your needs. From custom designs to seamless functionality, we create high-converting stores that are easy to manage and built to drive sales from day one."
          badgeText="Start Your Shopify Project"
        />
        <ShopifyPitch/>
        <PortfolioMarquee images={portfolioImages} pxPerSec={140} />
        <WhatsShopify/>
        <GrowWithShopify/>
        <Banner/>
        <Testimonial/>
        <BuildShopifyStore/>
        <ShopifyVsWooCommerce/>
        <ShopifyServicesAccordion/>
        <ShopifyFaq/>
        <ContactForm />
      </div>
    </>
  )
}
