'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Results from "@/PageComponents/Landing Home/Results"
import Testimonial from "@/PageComponents/Global Components/Testimonial"
import ContactForm from '@/PageComponents/Global Components/Contact'
import DollarsInPocket from './Components/DollarsInPocket'
import WhatWeOffer from './Components/WhatWeOffer'
import DoYouNeedSEO from './Components/DoYouNeedSEO'
import SeoBentoGrid from './Components/Bento'
import HowSeoGetsMoreLeads from './Components/HowSeoGetMoreLeads'
import Hero from './Components/Hero'
import WhyVaphers from './Components/WhyVaphers'
import GrowthSection from './Components/GrowthSection'
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
      {/* 1. Breadcrumb Schema (NEW) */}
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
              }
            ]
          })
        }}
      />


      <div>
        <Hero/>
        <Results />
        <DollarsInPocket/>
        <WhatWeOffer/>
        <DoYouNeedSEO/>
        <Testimonial />
        <SeoBentoGrid/>
        <HowSeoGetsMoreLeads/>
        <WhyVaphers/>
        <GrowthSection/>
        <ContactSection/>
      </div>
    </>
  )
}
