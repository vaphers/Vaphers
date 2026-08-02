'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from './Components/Hero'
import Results from '@/PageComponents/Landing Home/Results'
import OpeningSection from './Components/OpeningSection'
import Carousel from './Components/Carousel'
import BuiltFor from './Components/BuiltFor'
import DoYouNeedSEO from './Components/DoYouNeedSEO'
import WhatYouGet from './Components/WhatYouGet'
import SocialProofSection from '@/PageComponents/Global Components/Testimonial'
import InteriorDesignPartnerSection from './Components/PartnerSection'
import Chart from './Components/Charts'
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
      {/* 1. Breadcrumb Schema */}
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
                "name": "Interior Design Marketing",
                "item": "https://www.vaphers.com/interior-design-marketing"
              }
            ]
          })
        }}
      />


      <div>
        <Hero/>
        <Results/>
        <OpeningSection/>
        <BuiltFor/>
        <Carousel/>
        <DoYouNeedSEO/>
        <SocialProofSection/>
        <WhatYouGet/>
        <InteriorDesignPartnerSection/>
        <Chart/> 
        <ContactSection/>   
      </div>
    </>
  )
}
