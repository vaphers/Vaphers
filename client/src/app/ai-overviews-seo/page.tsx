"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import ContactForm from '@/PageComponents/Global Components/Contact';


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
          heading="ChatGPT SEO to Help You Get Cited"
          subtext="Boost your presence on ChatGPT and other AI search platforms with focused GEO strategies that improve citation visibility, grow qualified traffic, and position your brand as the trusted authority in conversational AI responses."
          badgeText="Explore our ChatGPT SEO solutions"
        />

        <ContactForm/>
      </main>
    </>
  );
}
