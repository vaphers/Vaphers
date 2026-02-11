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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          
          {/* LEFT CONTENT */}
          <motion.div
            style={{ x: xLeft, opacity }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
                What Can 
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  {" "}SEO Do for Portland
                </span>
                {" "}Businesses?
              </h3>

              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                Turning Local Search Visibility Into Sustainable Business Growth
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              SEO helps Portland businesses get discovered by customers actively searching for their products and services. A trusted SEO company in Portland ensures your website appears at the top of search results when potential clients are ready to make decisions. Instead of relying on unpredictable advertising, your business attracts consistent, high-intent traffic from local search.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              Expert SEO services for Portland businesses focus on improving rankings, increasing qualified website visitors, and converting traffic into measurable revenue. From optimizing local search presence to enhancing technical performance and content strategy, SEO builds long-term authority that keeps your business competitive in the Portland market.
            </p>

            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <Link href="/contact">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Start Growing Your Portland Business</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047483/MoreLeads_dpwsz2.png"
                alt="SEO company in Portland helping local businesses increase traffic and leads"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />

              <div className="absolute inset-0">
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-4 p-1 sm:p-2 lg:p-3"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047482/google_jze9mq.png"
                    alt="Portland business ranking on Google search results"
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
                    alt="Improved search rankings for Portland businesses"
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
                    alt="Competitive SEO advantage in Portland market"
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
