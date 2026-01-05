'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp, ChartBar, Target } from 'lucide-react'

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

const WeKnowWhatWorks: React.FC = () => {
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
              We Know{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                What Works
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              ChatGPT serves 800M+ weekly active users who trust its responses for complex queries. Get cited as an authoritative source when ChatGPT delivers instant answers to high-intent questions in your niche. Our ChatGPT SEO strategies drive 108%+ traffic growth by making your content the go-to citation that ChatGPT consistently recommends.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              We optimize for ChatGPT's proven ranking factors: conversational long-tail keywords, structured content with 120-180 word sections between headings, question-based titles, comprehensive depth (2900+ words), and fast page speeds under 0.4 seconds. Brands we work with see 3.2x more ChatGPT citations and dominate conversational queries that traditional SEO misses.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              Our proven GEO framework combines technical optimization, E-E-A-T authority building, quote-ready standalone sentences, and real-time performance tracking across ChatGPT's evolving algorithms. Get cited by ChatGPT, where high-intent researchers discover trusted brands and pages with strong structure receive 70% more citations than competitors.
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-0 lg:pb-20 pb-4 flex justify-center lg:justify-start">
              <a href="https://www.vaphers.com/seo-services" className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl hover:bg-[#70a597]/90 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3 group-hover:translate-x-[-2px] transition-transform">Get ChatGPT SEO Audit</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
          
          {/* Right Image with Floating Elements */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative">
              {/* Main Image */}
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767598245/Frame_77_yswgjv.png"
                alt="ChatGPT Citation Optimization Results"
                width={600}
                height={600}
                className="w-auto h-auto object-contain"
                priority
              />
              
              {/* Floating Card 1 - Top Right - AI Visibility */}
              <motion.div
                custom={0}
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 bg-white rounded-xl shadow-2xl p-3 sm:p-3.5 lg:p-4 border border-gray-100 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                    <ChartBar className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-none">
                      85%
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight">
                      Citation Rate
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 - Bottom Left - Citation Growth */}
              <motion.div
                custom={1}
                variants={floatingVariants}
                animate="animate"
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-xl shadow-2xl p-3 sm:p-3.5 lg:p-4 border border-gray-100 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                    <Target className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-none">
                      33%
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight">
                      Share of Voice
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}

export default WeKnowWhatWorks
