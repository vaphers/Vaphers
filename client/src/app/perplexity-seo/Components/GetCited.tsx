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

const GetCitedPerplexity: React.FC = () => {
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
              Get Recommended by{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Perplexity AI
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              Perplexity AI serves 10M+ monthly researchers who trust its answers for complex queries. Get cited as an authoritative source when Perplexity delivers instant research answers to high-intent questions in your niche. Our Perplexity SEO drives 101%+ traffic growth by making your content the go-to recommendation.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              We optimize for Perplexity's unique ranking factors: comprehensive schema markup, research-grade content depth (3000+ words), data tables, expert citations, and semantic authority signals. Brands we work with see 3x more Perplexity citations and dominate conversational research queries that traditional SEO misses.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              Join the 87% of Perplexity researchers who click through to cited sources. Our proven PEO framework combines technical optimization, content authority building, and real-time performance tracking across Perplexity's evolving algorithms. Get recommended by Perplexity, where high-intent researchers discover trusted brands.
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-0 lg:pb-20 pb-4 flex justify-center lg:justify-start">
              <a href="https://www.vaphers.com/seo-services" className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl hover:bg-[#21b2c7]/90 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3 group-hover:translate-x-[-2px] transition-transform">Get Perplexity SEO Audit</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-7xl">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,w_600/v1761047484/perplexity-logo_zqmnzf.png"
                alt="Perplexity AI Research Interface"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-md object-contain p-8 bg-gradient-to-br from-[#21b2c7]/5 to-blue-500/5 border border-[#21b2c7]/20"
                priority
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}

export default GetCitedPerplexity
