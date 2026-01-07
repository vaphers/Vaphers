"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import ContactForm from '@/PageComponents/Global Components/Contact';
import GeminiSEOPitch from './Components/Pitch';
import GeminiSEOFeatures from './Components/Info';
import Banner from '@/PageComponents/Global Components/Banner';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import WhyVaphersSection from './Components/WhyUs';
import GeminiSEOStrategy from './Components/Strategy';
import GeminiSeoFaq from './Components/Faq';


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
      <main>
        <HeroSEO 
          heading="Gemini SEO to Get Your Brand Picked by Google’s AI"
          subtext="Optimize for Google Gemini and AI Overviews with focused LLM SEO strategies that grow qualified traffic, increase citations, and keep your brand visible as search becomes AI‑first."
          badgeText="Explore our SEO solutions"
        />
        <GeminiSEOPitch/>
        <GeminiSEOFeatures/>
        <Banner/>
        <Testimonial/>
        <WhyVaphersSection/>
        <GeminiSEOStrategy/>
        <GeminiSeoFaq/>
        <ContactForm/>
      </main>
    </>
  );
}
