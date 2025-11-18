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

const DMvalue: React.FC = () => {
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
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat lg:mb-10 overflow-x-hidden"
      style={{
        backgroundImage: `url(${PatternBG})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          {/* DM Value Content here */}
          <motion.div
            style={{
              x: xLeft,
              opacity,
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular break-words">
                How Digital Marketing
                <span className="bg-blue-600 bg-clip-text text-transparent"> Generate More Leads?</span>{' '}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium break-words">
                Turn Online Visitors Into Qualified Leads for Your Business
              </p>
            </div>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Digital marketing generates high-quality leads by connecting with potential customers actively searching for solutions. Strategic SEO positions your business at the top of search results when prospects need your services most. For online stores,{' '}
              <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                affordable ecommerce SEO services
              </a>{' '}
              optimize product pages and category structures to attract ready-to-buy shoppers, dramatically increasing conversion rates and shortening sales cycles.
            </p>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Smart{' '}
              <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                lead generation strategies
              </a>{' '}
              combine personalized email automation, strategic social media engagement, and conversion-optimized landing pages. By capturing visitor information through valuable content offers and nurturing prospects with behavior-triggered messaging, businesses systematically convert anonymous browsers into qualified sales opportunities, creating a predictable, scalable pipeline that drives sustainable growth and measurable ROI.
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <Link href={"/contact"}>
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              </Link>
            </div>
          </motion.div>
          {/* DM Value images here */}
          <motion.div
            style={{
              x: xRight,
              opacity,
            }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047475/girl-laptop_kwggux.png"
                alt="Digital marketing analytics dashboard showing online marketing performance"
                width={600}
                height={600}
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
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-18 lg:left-4 p-1 sm:p-2 lg:p-3"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png"
                    alt="Google"
                    width={80}
                    height={80}
                    sizes="(max-width: 640px) 48px, (max-width: 1024px) 40px, 80px"
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-20 lg:h-20 object-contain"
                  />
                </motion.div>
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-10 lg:right-4"
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
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-40 lg:left-4"
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

export default DMvalue
