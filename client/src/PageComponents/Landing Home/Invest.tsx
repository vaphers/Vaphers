'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

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

const Invest: React.FC = () => {
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
      style={{
        backgroundImage: `url(${PatternBG})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          {/* Invest (your section) content here */}
          <motion.div
            style={{
              x: xLeft,
              opacity,
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular break-words">
                Why You Need{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent ">Affordable SEO Services?</span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium break-words">
                Build Your Online Presence Without Breaking Your Budget
              </p>
            </div>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Affordable SEO services help small businesses compete online without draining resources. By focusing on essential strategies like keyword research, on-page improvements, and{' '}
              <a href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                local SEO optimization
              </a>
              , you capture nearby customers actively searching for your services. For online retailers,{' '}
              <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                ecommerce SEO strategies
              </a>{' '}
              drive product visibility and sales growth.
            </p>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Unlike expensive ad campaigns that stop delivering when you stop paying, affordable SEO delivers sustainable, long-term growth. With{' '}
              <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                technical SEO improvements
              </a>{' '}
              and emerging{' '}
              <a href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                AI SEO optimization
              </a>
              , your website continues generating qualified traffic and leads months after the initial investment, creating a cost-effective marketing asset that compounds over time.
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <Link href={"/contact"}>
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              </Link>
            </div>
          </motion.div>
          {/* Invest images here */}
          <div className="w-full h-auto lg:w-1/2 flex justify-center items-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              <Image 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761569143/Frame_1_s7kydx.png" 
                alt="Online Store Platform Comparison" 
                width={600}
                height={700}
                className="w-full h-auto object-contain"
                priority
              />
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {/* Shopify  */}
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761658327/Adobe_Express_-_file_p0mimj.png" 
                    alt="Shopify Logo"
                    width={56}
                    height={56}
                    className="w-18 h-18 sm:w-10 sm:h-10 lg:w-29 lg:h-29 object-contain" 
                  />
                </motion.div>
                {/* Woo Commerce  */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:-top-4 lg:-right-12"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761657677/WooCommerce-Logo_ef4x1p.png" 
                    alt="Woo Commerce Logo" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
                {/* Wix */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-30 lg:-left-10"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761657746/png-clipart-wix-newest-logo-tech_1_omfyj6.png" 
                    alt="Wix Logo" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Invest
