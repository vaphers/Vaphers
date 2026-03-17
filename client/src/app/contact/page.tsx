"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Mission from "@/PageComponents/About Components/Mission"
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from "@/PageComponents/Global Components/HeroSubpage"
import MarketingPriceCalculator from "@/PageComponents/Global Components/PriceCalc"
import Stats from "@/PageComponents/Global Components/Stats"
import Testimonial from "@/PageComponents/Global Components/Testimonial"
import ContactSection from "@/PageComponents/Landing Home/ContactSection"
import TopFrom from "./Components/TopForm"


export default function ContactPage() {
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
    <main className="min-h-screen bg-white">
        {/* <SubHero
        heading="Let's Build Something Great Together"
        subtext="Ready to boost your online presence? Get in touch and let's discuss how we can help your business grow."
        badgeText="Get Started Today"
        
        /> */}
        <TopFrom/>
        <Testimonial/>
        <MarketingPriceCalculator/>
    </main>
  )
}
