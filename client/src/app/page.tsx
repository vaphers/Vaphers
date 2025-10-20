'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from "@/PageComponents/Landing Home/Hero"
import Pitch from "@/PageComponents/Landing Home/Pitch"
import Result from "@/PageComponents/Landing Home/Results"
import Grow from "@/PageComponents/Landing Home/Grow"
import Need from "@/PageComponents/Landing Home/Need"
import Banner from "@/PageComponents/Global Components/Banner"
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import DMvalue from '@/PageComponents/Landing Home/DMvalue'
import Services from '@/PageComponents/Landing Home/Services'
import WhyUs from '@/PageComponents/Global Components/WhyUs'
import Stats from '@/PageComponents/Global Components/Stats'
import BannerMarqee from '@/PageComponents/Landing Home/BannerMarqee'
import Invest from '@/PageComponents/Landing Home/Invest'
import Faq from '@/PageComponents/Landing Home/Faq'
import ContactForm from '@/PageComponents/Global Components/Contact'

import { SwatchBookIcon, SearchIcon, StarIcon, SmartphoneIcon, LockKeyholeIcon, ShieldBanIcon } from 'lucide-react'

const featuresList = [
  {
    icon: SwatchBookIcon,
    title: 'User-Friendly Interface',
    description:
      "Navigate effortlessly with our intuitive design, optimised for all devices. Enjoy a seamless experience whether you're on a computer or mobile.",
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    link: "https://vaphers.vercel.app/seo-services"
  },
  {
    icon: ShieldBanIcon,
    title: 'Secure Checkout',
    description:
      'Enjoy a safe shopping experience with multiple payment options and SSL encryption. Your personal and financial information is always protected.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10',
    link: "https://vaphers.vercel.app/seo-services"
  },
  {
    icon: SearchIcon,
    title: 'Advanced Search',
    description:
      'Find products quickly with advanced filters, sorting options, and suggestion. Save time and effortlessly locate exactly what you need with ease.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
    link: "https://vaphers.vercel.app/seo-services"
  },
  {
    icon: StarIcon,
    title: 'Customer Reviews and Ratings',
    description:
      'Make informed decisions with detailed product reviews and ratings from other buyers. Trust the experiences of fellow shoppers to guide choices.',
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10',
    link: "https://vaphers.vercel.app/seo-services"
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile App Integration',
    description:
      'Enhance your shopping experience with our mobile app and push notifications. Stay updated on arrivals and exclusive offers directly on phone.',
    cardBorderColor: 'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
    link: "https://vaphers.vercel.app/seo-services"
  },
  {
    icon: LockKeyholeIcon,
    title: 'Security Features',
    description:
      'Protect your data with fraud detection and two-factor authentication. Ensure a secure environment for all transactions and account activities.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10',
    link: "https://vaphers.vercel.app/seo-services"
  }
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

  return (
    <main>
      <Hero />
      <Pitch />
      <Result />
      <Grow/>
      <Need/>
      <Banner/>
      <Testimonial/>
      <DMvalue/>
      <Services featuresList={featuresList} />
      <div className='hidden lg:block'>
      <BannerMarqee/>
      </div>
      <WhyUs/>
      <Invest/>
      <Stats/>
      <Faq/>
      <ContactForm/>
    </main>
  )
}
