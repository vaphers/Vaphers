'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import CustomBreadcrumb from '../Global Components/BreadCrumbs'

const PatternBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg'

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.3,
    },
  }),
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleChange = () => setIsMobile(mql.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])
  return isMobile
}

const WordpressPitch: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]) 

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: `url(${PatternBG})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-0 ">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-12 ">
          
          {/* Left Content */}
          <motion.div
            style={{ x: xLeft, opacity }}
            className="w-full lg:w-2/3 space-y-6 sm:space-y-8"
          >
            <CustomBreadcrumb links={[{ href: 'https://www.vaphers.com/website-development-services', label: 'Website Development' }]} currentPage="Wordpress Website Development"/>
            <h2 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular">
              Why Choose{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Professional WordPress Development
              </span>?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              WordPress powers over 43% of the internet because it combines powerful features with genuine ease of use. Our{' '}
              <Link 
                href="/website-development-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                professional development services
              </Link>
              {' '}transform WordPress into a custom-tailored platform for your business, no coding skills needed to update content, publish new pages, or manage your site daily. Perfect for business owners who want full control without technical complexity.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              We build custom WordPress sites with conversion-focused design, advanced functionality, and built-in{' '}
              <Link 
                href="/seo-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                SEO optimization
              </Link>
              {' '}that helps you rank higher and attract more customers. Whether you need a{' '}
              <Link 
                href="/website-development-services/ecommerce-development" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                WooCommerce store
              </Link>
              , booking system, membership site, or content-rich business platform, we deliver scalable WordPress solutions that drive real results and grow with your success.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              WordPress gives you flexibility, thousands of plugins for extended functionality, mobile-responsive design, and lightning-fast performance. Combined with our expertise in security, speed optimization, and user experience design, you get a professional website that attracts visitors, builds trust, and converts browsers into loyal customers.
            </p>
            <div className="pt-4 sm:pt-6 pb-4 flex justify-center lg:justify-start">
              <Link href={"https://www.vaphers.com/contact"}>
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-transform duration-300 cursor-pointer">
                <span className="mr-2 sm:mr-3">Get Your Free Quote</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              </Link>
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex relative"
          >
            <div className="relative w-full max-w-7xl">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,w_600/v1/wordpress-development-dashboard.png"
                alt="WordPress Website Development Dashboard"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-md"
                priority
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}

export default WordpressPitch
