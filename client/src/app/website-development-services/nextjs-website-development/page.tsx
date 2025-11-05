'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'    
import WhatsNextJS from '@/PageComponents/NextJS Page Components/WhatsNext'
import Performance from '@/PageComponents/NextJS Page Components/Performance'
import NextJsComapny from '@/PageComponents/NextJS Page Components/NextJsDevelopment'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import ReactVsNext from '@/PageComponents/NextJS Page Components/NextvsReact'
import NextServices from '@/PageComponents/NextJS Page Components/Service'
import NextVsWpVsShopify from '@/PageComponents/NextJS Page Components/NextvsWordpressvsShopify'

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
        <SubHero
        heading="Build a Website That Performs and Converts"
        subtext="Transform your online presence with a modern, responsive, and high-performing website. From custom designs to lightning-fast code, we deliver websites that look amazing and drive real business results."
        badgeText="Start Your Project"
        />
        <WhatsNextJS    />
        <PortfolioMarquee images={portfolioImages} pxPerSec={140} />
        <Performance/>
        <NextJsComapny/>
        <Banner/>
        <Testimonial/>
        <ReactVsNext/>
        <NextServices/>
        <NextVsWpVsShopify/>
        <ContactForm />
      </div>
    </>
  )
}

