'use client'

import { Metadata } from 'next';
import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from "@/app/Components/Landing SEO/Hero"
import AiSection from '../Components/Landing SEO/Pitch';
import Results from "@/app/Components/Landing Home/Results"
import GrowWithSEO from '../Components/Landing SEO/Grow';

export default  function Page() {
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
    <div>
      <Hero/>
      <AiSection/>
      <Results/>
      <GrowWithSEO/>
    </div>
  );
}
