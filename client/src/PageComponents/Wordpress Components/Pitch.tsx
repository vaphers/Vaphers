'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

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
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${PatternBG})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          
          {/* Left Content */}
          <motion.div
            style={{ x: xLeft, opacity }}
            className="w-full lg:w-2/3 space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular">
              Why Choose{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Professional WordPress Development
              </span>?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              Get a powerful, easy-to-manage website built with WordPress—the platform that powers over 43% of the internet. No coding skills required to update your content, add pages, or manage your site daily. Perfect for business owners who want full control without technical hassle.[web:74][web:79][web:82]
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              We specialize in creating custom WordPress websites with professional themes, advanced functionality, and SEO optimization built-in. Whether you need an online store with WooCommerce, a booking system, or a content-rich business site, we deliver cost-effective WordPress solutions that grow with your business.[web:76][web:78][web:80]
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              With WordPress, you get flexibility, thousands of plugins to extend functionality, mobile responsiveness, and a platform that's SEO-friendly from the ground up. Choose professional WordPress development to build a scalable website that attracts customers and drives real business results.[web:75][web:77][web:81]
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-transform duration-300 cursor-pointer">
                <span className="mr-2 sm:mr-3">Get Your Free Quote</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center relative"
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
