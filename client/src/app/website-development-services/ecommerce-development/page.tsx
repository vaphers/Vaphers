'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'    
import WhyOnline from '@/PageComponents/Ecommerce Website Componenets/Why'
import ProfessionalDesigners from '@/PageComponents/Ecommerce Website Componenets/ProfessionalDesigners'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import EcommerceVsNon from '@/PageComponents/Ecommerce Website Componenets/Comparison'
import EcommerceServices from '@/PageComponents/Ecommerce Website Componenets/Services'
import EcommerceProcess from '@/PageComponents/Ecommerce Website Componenets/Process'
import Stats from '@/PageComponents/Global Components/Stats'
import EcommerceDevFaq from '@/PageComponents/Ecommerce Website Componenets/FAQ'
import EcommercePitch from '@/PageComponents/Ecommerce Website Componenets/Pitch'

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

  // Sample FAQ items (replace this array with your actual FAQ data used in EcommerceDevFaq)
  const faqItems = [
    {
      question: 'Why invest in a custom eCommerce website?',
      answer:
        'A custom eCommerce site maximizes your brand impact, streamlines customer experience, and gives you control over design, features, and performance.',
    },
    {
      question: 'How do you build eCommerce sites for better SEO?',
      answer:
        'We use clean code, mobile-first layouts, fast page loads, and SEO best practices like schema markup and keyword optimization.',
    },
    // Add all your FAQ items here matching EcommerceDevFaq questions and answers
  ]

  // Generate JSON-LD for FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer,
      },
    })),
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(faqSchema)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [faqSchema])

  return (
    <>
      <div>
        <SubHero
          heading="Affordable Ecommerce Website Development That Converts"
          subtext="Launch a fast, mobile-friendly online store designed to rank, sell, and scale. Our team delivers custom ecommerce websites on Next.js, Shopify, and WordPress, optimized for SEO, Core Web Vitals, and seamless user experiences."
          badgeText="Start Your Project"
        />
        <EcommercePitch/>
        <PortfolioMarquee images={portfolioImages} pxPerSec={140} />
        <WhyOnline />
        <ProfessionalDesigners />
        <Banner />
        <Testimonial />
        <EcommerceVsNon />
        <EcommerceServices />
        <EcommerceProcess />
        <Stats />
        <EcommerceDevFaq />
        <ContactForm />
      </div>
    </>
  )
}
