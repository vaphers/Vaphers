'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { Link, TrendingUp } from 'lucide-react'

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
    
    const handleChange = () => {
      setIsMobile(mql.matches)
    }
    
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)
    
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}

const WhatsSEO: React.FC = () => {
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
      style={{
        backgroundImage: `url(${PatternBG})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          <motion.div
            style={{
              x: xLeft,
              opacity,
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular">
                Grow With{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Affordable Digital Marketing
                </span>{' '}
                Services
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                Connect with Your Customers Where They Spend Their Time Online
              </p>
            </div>

            {/* <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
              Affordable digital marketing services help businesses reach their target audience without breaking the bank. 
              Through strategic & <a className='text-blue-600 underline' href="https://www.vaphers.com/seo-services">affordable SEO services</a>, targeted <a className='text-blue-600 underline' href="https://www.vaphers.com/ppc-marketing//meta-ads-management-services">meta ads campaigns</a>, and cost-effective{' '}
              <a href="https://www.vaphers.com/ppc-marketing" className="text-blue-700 underline hover:text-blue-800 font-medium">
                pay-per-click advertising
              </a>
              , we maximize your online visibility and drive qualified leads. Our data-driven approach ensures every dollar spent delivers measurable results and sustainable growth for your business.
            </p> */}


              <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
                Affordable digital marketing services help businesses reach their target audience without breaking the bank. 
                Through strategic & <a className='text-blue-600 underline' href="https://www.vaphers.com/seo-services">affordable SEO services</a>, targeted <a className='text-blue-600 underline' href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services">meta ads campaigns</a>, and cost-effective{' '}
                <a href="https://www.vaphers.com/ppc-marketing" className="text-blue-700 underline hover:text-blue-800 font-medium">
                  pay-per-click advertising
                </a>
                , we maximize your online visibility and drive qualified leads.<br/><br/>  Our budget-friendly Next.js development services deliver lightning-fast, SEO-optimized websites that convert visitors into customers, while our <a className='text-blue-600 underline' href="https://www.vaphers.com/ppc-marketing/google-ads-management-services">affordable Google Ads management</a> ensures every advertising dollar generates maximum ROI through precision targeting and continuous campaign optimization. Our data-driven approach ensures every dollar spent delivers measurable results and sustainable growth for your business.
              </p>



            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <a href="https://www.vaphers.com/contact"><div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div></a>
            </div>
          </motion.div>

          <motion.div
            style={{
              x: xRight,
              opacity,
            }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047482/grow_ur7efq.png"
                alt="Digital marketing analytics dashboard showing online marketing performance"
                width={600}
                height={721}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />

              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png" 
                    alt="Google" 
                    width={80}
                    height={80}
                    sizes="(max-width: 640px) 48px, (max-width: 1024px) 40px, 56px"
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain" 
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:-top-4 lg:-right-12"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047484/seo-rank_l7ekja.png" 
                    alt="SEO Rank" 
                    width={176}
                    height={176}
                    sizes="(max-width: 1024px) 112px, 176px"
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-30 lg:-left-10"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png" 
                    alt="Competitor" 
                    width={176}
                    height={176}
                    sizes="(max-width: 1024px) 112px, 176px"
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhatsSEO
