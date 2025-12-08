'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 4 + custom * 0.7,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.4,
    },
  }),
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia('(max-width: 1024px)')

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mql.matches)

    mql.addEventListener('change', handleChange)
    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [])

  return isMobile
}

const SeoLeads: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [0, 0] : [-200, 0]
  )
  const xRight = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [0, 0] : [200, 0]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    isMobile ? [1, 1] : [0, 1]
  )

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage:
          'url(https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047483/PatternBG_kv4ubo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-12 pb-8 sm:pb-12 lg:pb-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          <motion.div
            style={{
              x: xLeft,
              opacity,
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
                How{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent ">
                  SEO Services
                </span>{' '}
                Generate More Leads?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                Turn Search Engine Visibility Into Qualified Business Opportunities
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              SEO generates qualified leads by positioning your business where potential customers are actively searching for solutions. Research shows that 57% of B2B businesses report getting more leads from search engines than any other channel. When prospects search for what you offer, a comprehensive{' '}
              <a
                href="https://www.vaphers.com/seo-services/seo-audit-services"
                className="text-blue-700 underline hover:text-blue-800 font-medium"
              >
                SEO audit
              </a>{' '}
              identifies opportunities to capture this high-intent traffic, while{' '}
              <a
                href="https://www.vaphers.com/seo-services/technical-seo-services"
                className="text-blue-700 underline hover:text-blue-800 font-medium"
              >
                technical optimization
              </a>{' '}
              ensures your site performs flawlessly when they arrive.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              The power of SEO lies in targeting every stage of the customer journey. Educational content builds trust during the awareness phase, while optimized service pages convert ready-to-buy prospects. Modern{' '}
              <a
                href="https://www.vaphers.com/seo-services/ai-seo-services"
                className="text-blue-700 underline hover:text-blue-800 font-medium"
              >
                AI-powered SEO strategies
              </a>{' '}
              analyze search patterns and intent signals to identify exactly what your audience needs at each stage. This targeted approach delivers a 14.6% close rate on average, compared to just 1.7% for traditional outbound marketing tactics.
            </p>

            {/* button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Start Generating Leads Today</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={{
              x: xRight,
              opacity,
            }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047483/MoreLeads_dpwsz2.png"
                alt="SEO lead generation strategy showing increased traffic and conversions"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />

              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-4 p-1 sm:p-2 lg:p-3"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047482/google_jze9mq.png"
                    alt="Google search visibility"
                    width={80}
                    height={80}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-16 lg:h-16 object-contain"
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-2 sm:top-0 sm:right-4 lg:top-0 lg:right-0"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047484/seo-rank_l7ekja.png"
                    alt="Ranking growth indicator"
                    width={176}
                    height={176}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain"
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-2 sm:bottom-8 sm:left-4 lg:bottom-8 lg:left-0"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/competitor_co9leg.png"
                    alt="Competitive advantage in search results"
                    width={176}
                    height={176}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain"
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

export default SeoLeads
