'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from "./Components/Hero"
import BentoCard from './Components/Bento'
import GrowWithSEO from './Components/Grow'
import Results from "@/PageComponents/Landing Home/Results"
import SeoNeed from './Components/Vaphers'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from "@/PageComponents/Global Components/Testimonial"
import SeoLeads from './Components/Leads'
import Filler from '@/PageComponents/Landing SEO/Filler'
import SEOContentSection from '@/PageComponents/Landing SEO/SEO'
import Stats from '@/PageComponents/Global Components/Stats'
import WhyUs from '@/PageComponents/Global Components/WhyUs'
import ContactForm from '@/PageComponents/Global Components/Contact'
import ServicesAccordion from '@/PageComponents/Landing SEO/Service'
import SEOStrategiesComparison from '@/PageComponents/Landing SEO/Difference'
import PromoFiller from '@/PageComponents/Landing SEO/Promo'
import ServiceTabs from './Components/Service'


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

      <div>
        <Hero />
        <Results />
        <BentoCard />
        <ServiceTabs/>
        <SeoLeads />
        <SeoNeed />
        <div className='hidden lg:block'>
          <Banner />
        </div>
        <Testimonial />
        <Filler />
        <PromoFiller/>
        <div className='lg:px-40 flex-justify-center'>
          <Stats />
        </div>
        <WhyUs />
        <ContactForm />
      </div>
    </>
  )
}
