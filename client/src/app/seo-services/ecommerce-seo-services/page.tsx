'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Head from 'next/head'
import Lenis from '@studio-freight/lenis'
import HeroSub from "@/PageComponents/Global Components/HeroSubpage";
import EcommercePitch from '@/PageComponents/Ecommerce SEO Components/Pitch';
import AttractCustomers from '@/PageComponents/Ecommerce SEO Components/AttractCustomers';
import EcommercePromo from '@/PageComponents/Ecommerce SEO Components/Promo';
import Banner from '@/PageComponents/Global Components/Banner';
import ShopifyWoo from '@/PageComponents/Ecommerce SEO Components/ShopifyWoo';
import Testimonials from '@/PageComponents/Global Components/Testimonial';
import EcommerceServicesAccordion from '@/PageComponents/Ecommerce SEO Components/Services';
import ContactForm from '@/PageComponents/Global Components/Contact';
import EcommerceFaq from '@/PageComponents/Ecommerce SEO Components/FAQ';

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to see results from ecommerce SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most ecommerce stores begin seeing initial improvements within 3-6 months. However, competitive product categories may take 6-12 months for significant ranking gains. Quick wins like technical fixes and on-page optimization can show results faster, while link building and content strategies deliver long-term growth."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between Shopify SEO and WooCommerce SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shopify is a hosted platform with built-in SEO features but limited customization, while WooCommerce offers more flexibility as a WordPress plugin. Shopify handles technical SEO automatically but has URL structure limitations, whereas WooCommerce allows complete control over permalinks, plugins, and server optimization."
        }
      },
      {
        "@type": "Question",
        "name": "How do I optimize product pages for search engines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Effective product page optimization includes unique, keyword-rich descriptions, optimized title tags and meta descriptions, high-quality images with descriptive alt text, customer reviews, schema markup for rich snippets, clear product specifications, and fast page load speeds. Each product should target specific long-tail keywords."
        }
      },
      {
        "@type": "Question",
        "name": "Does ecommerce SEO work for small online stores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Small ecommerce stores can compete effectively by targeting long-tail keywords, focusing on niche products, building local SEO presence, creating detailed product content, and leveraging customer reviews. Unlike paid ads, SEO provides sustainable organic traffic that improves over time."
        }
      },
      {
        "@type": "Question",
        "name": "How important is site speed for ecommerce SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Site speed is critical for ecommerce SEO. Google uses Core Web Vitals as ranking factors, and slow sites have higher bounce rates and lower conversions. Aim for page load times under 3 seconds on mobile. Optimize images, enable compression, use CDNs, and choose fast hosting to improve both rankings and user experience."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use paid ads or SEO for my online store?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best strategy combines both. SEO provides long-term, cost-effective organic traffic with higher trust and better ROI over time, while paid ads deliver immediate visibility and sales. Start with foundational SEO, then supplement with paid campaigns for new products and seasonal promotions."
        }
      },
      {
        "@type": "Question",
        "name": "What is schema markup and why does my ecommerce store need it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Schema markup is structured data code that helps search engines understand your product information. It enables rich snippets showing prices, ratings, availability, and reviews directly in search results. This increases click-through rates by 20-30% and improves visibility in Google Shopping."
        }
      },
      {
        "@type": "Question",
        "name": "How can I rank my products in Google Shopping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To appear in Google Shopping, set up a Google Merchant Center account, create a product feed with accurate titles, descriptions, prices, and images, implement Product schema markup on your site, optimize product data with relevant keywords, maintain competitive pricing, and ensure high-quality images."
        }
      },
      {
        "@type": "Question",
        "name": "What are the most common ecommerce SEO mistakes to avoid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common mistakes include duplicate content from manufacturer descriptions, thin product pages with minimal text, ignoring mobile optimization, slow site speed, poor internal linking, missing alt tags on images, no customer reviews, weak meta descriptions, and failing to optimize category pages."
        }
      },
      {
        "@type": "Question",
        "name": "How do I handle SEO for out-of-stock products?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Keep out-of-stock product pages live with 'currently unavailable' messaging rather than deleting them. This preserves SEO value, backlinks, and rankings. Add email signup for restock notifications, suggest similar available products, and use schema markup to indicate availability status."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div>
        <HeroSub 
          heading="Affordable Ecommerce SEO That Transform Your Business"
          subtext="Boost your online visibility with our proven SEO strategies that deliver real results and drive organic traffic to your website."
          badgeText="Explore our SEO solutions"
        />
        <EcommercePitch/>
        <AttractCustomers/>
        <EcommercePromo/>
        <Banner/>
        <ShopifyWoo/>
        <Testimonials/>
        <EcommerceServicesAccordion/>
        <EcommerceFaq/>
        <ContactForm/>
      </div>
    </>
  )
}
