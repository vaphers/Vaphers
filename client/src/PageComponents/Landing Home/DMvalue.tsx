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
          
          {/* Content */}
          <motion.div
            style={{ x: xLeft, opacity }}
            className="w-full lg:w-2/3 space-y-6 sm:space-y-8"
          >

            {/* Section 1 */}
            <div>
              <h3 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular break-words">
                We Design
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  {' '}Conversion-Driven Websites
                </span>
              </h3>

              <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
                At Vaphers, we are an <span className="font-medium">affordable web design agency</span> focused on building websites that convert traffic into real business outcomes.
                Every layout, interaction, and user journey is crafted with performance in mind, ensuring your website supports growth from day one.
                As a trusted{' '}
                <a
                  href="https://vaphers.com/website-development-services/nextjs-website-development"
                  className="text-blue-700 underline hover:text-blue-800 font-medium"
                >
                  Next.js website development agency
                </a>
                , we build fast, scalable, and SEO-friendly websites that deliver exceptional user experience and long-term value.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h4 className="text-2xl md:text-2xl lg:text-4xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular break-words">
                What Web Design
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  {' '}Can Do for Your Business
                </span>
              </h4>

              <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
                Strategic web design strengthens brand credibility, improves usability, and supports lead generation across all digital touchpoints.
                When paired with{' '}
                <a
                  href="https://www.vaphers.com/ppc-marketing/lead-generation-services"
                  className="text-blue-700 underline hover:text-blue-800 font-medium"
                >
                  lead generation strategies
                </a>{' '}
                such as conversion-optimized landing pages and clear calls to action, your website becomes a scalable sales asset.
                The result is higher engagement, qualified leads, and measurable business growth driven by design that works.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <Link href="/contact">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047475/girl-laptop_kwggux.png"
                alt="Website design and digital marketing performance illustration"
                width={600}
                height={600}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />

              <div className="absolute inset-0">
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-18 lg:left-4 p-1 sm:p-2 lg:p-3"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png"
                    alt="Google"
                    width={80}
                    height={80}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-20 lg:h-20 object-contain"
                  />
                </motion.div>

                <motion.div custom={1} variants={floatingVariants} animate="animate" className="absolute top-10 right-4">
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047484/seo-rank_l7ekja.png"
                    alt="SEO ranking growth"
                    width={176}
                    height={176}
                    className="w-28 h-28 lg:w-44 lg:h-44 object-contain"
                  />
                </motion.div>

                <motion.div custom={2} variants={floatingVariants} animate="animate" className="absolute bottom-40 left-4">
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png"
                    alt="Outperform competitors"
                    width={176}
                    height={176}
                    className="w-28 h-28 lg:w-44 lg:h-44 object-contain"
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
