'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -15, 0], // Tightened the float distance slightly for mobile comfort
    transition: {
      duration: 4 + custom * 0.7,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.4,
    },
  }),
}

// FIXED: Using a safe mounted pattern to prevent Next.js Hydration errors
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true) // Default to true for mobile-first SSR
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mql = window.matchMedia('(max-width: 1024px)')
    
    // Set initial value
    setIsMobile(mql.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    mql.addEventListener('change', handleChange)
    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [])

  return mounted ? isMobile : true // Return mobile default until hydrated
}

const HowSeoGetsMoreLeads: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(
    scrollYProgress,
    [0, 0.4],
    isMobile ? [0, 0] : [-200, 0]
  )
  const xRight = useTransform(
    scrollYProgress,
    [0, 0.4],
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 lg:pt-16 pb-10 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-16">
          
          {/* Left Content */}
          <motion.div
            style={{
              x: xLeft,
              opacity,
            }}
            className="w-full lg:w-[55%] space-y-5 sm:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            <div className="w-full">
              {/* FIXED: Scaled heading down to text-[28px] for the absolute smallest screens to prevent breaking. */}
              <h3 className="text-[28px] sm:text-4xl lg:text-5xl font-montserrat text-gray-900 mb-3 sm:mb-4 lg:mb-5 bungee-shade leading-[1.2]">
                How{' '}
                <span className="bg-blue-700 bg-clip-text text-transparent ">
                  Organic SEO Marketing
                </span>{' '}
                Generate More Leads?
              </h3>
              <p className="text-[13px] sm:text-base lg:text-lg text-blue-600 font-medium px-2 sm:px-0">
                Turn Search Engine Visibility Into Qualified Business Opportunities
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              SEO generates qualified leads by positioning your business where potential customers are actively searching for solutions. Research shows that 57% of B2B businesses report getting more leads from search engines than any other channel. By investing in professional <strong>organic search engine optimization services</strong>, you can identify opportunities to capture this high-intent traffic and ensure your site performs flawlessly when users arrive.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              The power of SEO lies in targeting every stage of the customer journey. Educational content builds trust during the awareness phase, while optimized service pages convert ready-to-buy prospects. Modern{' '}
              <a
                href="https://www.vaphers.com/seo-services/ai-seo-services"
                className="text-blue-700 underline hover:text-blue-800 font-medium transition-colors"
              >
                AI-powered SEO strategies
              </a>{' '}
              analyze search patterns and intent signals to identify exactly what your audience needs at each stage. This targeted approach delivers a 14.6% close rate on average, compared to just 1.7% for traditional outbound marketing tactics.
            </p>

            {/* button */}
            {/* FIXED: Fluid full-width button for tiny screens */}
            <div className="pt-2 sm:pt-4 w-full sm:w-auto">
              <Link href="https://www.vaphers.com/contact" className="block w-full sm:w-auto">
                <div className="flex justify-center items-center w-full px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[13px] sm:text-sm lg:text-base font-semibold rounded-xl sm:rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3 whitespace-nowrap">Start Generating Leads Today</span>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            style={{
              x: xRight,
              opacity,
            }}
            className="w-full lg:w-[45%] flex justify-center relative mt-4 lg:mt-0"
          >
            {/* FIXED: Added a slightly restricted max-width (w-[85%]) on mobile. This gives the floating icons room to stick out without blowing up the screen width. */}
            <div className="relative w-[85%] max-w-[280px] sm:w-full sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047483/MoreLeads_dpwsz2.png"
                alt="SEO lead generation strategy showing increased traffic and conversions"
                width={600}
                height={600}
                className="w-full h-auto object-contain relative z-10"
              />

              {/* Floating Icons Container */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                
                {/* Google Logo */}
                <motion.div
                  animate={{
                    x: [0, 8, 0],
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  // FIXED: Pulled inwards slightly so it doesn't clip off the left edge of tiny phones
                  className="absolute -top-2 -left-2 sm:top-4 sm:left-4 lg:top-8 lg:-left-4"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png"
                    alt="Google Logo"
                    width={80}
                    height={80}
                    className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 object-contain drop-shadow-md"
                  />
                </motion.div>

                {/* Rank One Icon */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  // FIXED: Allowed it to hang off the right side since we restricted the parent width to 85%
                  className="absolute top-4 -right-6 sm:top-8 sm:-right-8 lg:top-4 lg:-right-12"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747669/Rank_One_On_Google_v7q5as.png"
                    alt="Ranking growth indicator"
                    width={176}
                    height={176}
                    className="w-20 h-20 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain drop-shadow-lg"
                  />
                </motion.div>

                {/* Competitor Research Icon */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  // FIXED: Pulled it up and left slightly so it overlaps nicely on small screens
                  className="absolute bottom-6 -left-6 sm:bottom-12 sm:-left-8 lg:bottom-12 lg:-left-12"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773322596/Competitor_Research_xucf3d.png"
                    alt="Competitive advantage in search results"
                    width={176}
                    height={176}
                    className="w-20 h-20 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain drop-shadow-lg"
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

export default HowSeoGetsMoreLeads