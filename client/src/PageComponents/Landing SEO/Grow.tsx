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

const GrowWithSEO: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1, 1] : [0, 1]
  )

  const leftStyle = mounted && !isMobile ? { x: xLeft, opacity } : {}
  const rightStyle = mounted && !isMobile ? { x: xRight, opacity } : {}

  return (
    <div className="w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <section
        ref={ref}
        className="relative z-10 max-w-full bg-transparent overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 sm:pb-12 lg:pb-0">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 sm:gap-10 lg:gap-12">
            <motion.div
              style={leftStyle}
              className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
            >
              <div>
                <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
                  Grow Your Business With{' '}
                  <span className="bg-blue-600 bg-clip-text text-transparent">
                    SEO Services
                  </span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                  Scale Revenue with Sustainable Organic Search Growth
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                  Strategic SEO transforms your website into a 24/7 customer acquisition engine that delivers measurable, compounding returns. While competitors burn through budgets on temporary paid ads, your business builds lasting search visibility that strengthens every month. Our{' '}
                  <a
                    href="https://www.vaphers.com/seo-services/local-seo-services"
                    className="text-blue-700 underline hover:text-blue-800 font-medium"
                  >
                    affordable local SEO services
                  </a>{' '}
                  help brick-and-mortar businesses dominate neighborhood searches, while our specialized{' '}
                  <a
                    href="https://www.vaphers.com/seo-services/ecommerce-seo-services"
                    className="text-blue-700 underline hover:text-blue-800 font-medium"
                  >
                    ecommerce SEO strategies
                  </a>{' '}
                  drive product discovery and sales at scale.
                </p>

                <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
                  Every optimized page, earned backlink, and strategically crafted content piece works continuously to attract qualified prospects actively searching for your solutions, making these truly{' '}
                  <span className="font-semibold">
                    affordable seo services for small business
                  </span>{' '}
                  that deliver average ROIs of 825% across industries while establishing market authority that competitors struggle to replicate. Unlike paid advertising with higher customer acquisition costs, organic search creates an asset that appreciates over time, generating consistent leads long after the initial investment.
                </p>
              </div>


              <div className="pt-4 sm:pt-6 lg:pt-6 pb-4 flex justify-center lg:justify-start">
                <Link href="/contact">
                  <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <span className="mr-2 sm:mr-3">Grow Your Business Now</span>
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              style={rightStyle}
              className="w-full lg:w-1/2 flex justify-center relative"
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047484/seo-page-girl_ccqj2r.webp"
                  alt="SEO analytics showing business growth and increased website traffic"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />

                <div className="absolute inset-0">
                  <motion.div
                    animate={
                      mounted && !isMobile
                        ? { x: [0, 10, 0], y: [0, 10, 0] }
                        : {}
                    }
                    transition={
                      mounted && !isMobile
                        ? {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-4 p-1 sm:p-2 lg:p-3"
                  >
                    <Image
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png"
                      alt="Google search engine"
                      width={56}
                      height={56}
                      className="w-12 h-12 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain"
                    />
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={floatingVariants}
                    animate={mounted && !isMobile ? 'animate' : undefined}
                    className="absolute -top-2 right-2 sm:top-0 sm:right-4 lg:top-0 lg:right-4"
                  >
                    <Image
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047484/seo-rank_l7ekja.png"
                      alt="First page SEO rankings"
                      width={176}
                      height={176}
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain"
                    />
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={floatingVariants}
                    animate={mounted && !isMobile ? 'animate' : undefined}
                    className="absolute bottom-4 left-2 sm:bottom-8 sm:left-4 lg:bottom-8 lg:left-4"
                  >
                    <Image
                      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png"
                      alt="Outrank competitors"
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
    </div>
  )
}

export default GrowWithSEO
