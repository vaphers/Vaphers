'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

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

const GrowWithSEO: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          <motion.div
            style={{
              x: xLeft,
              opacity: isMobile ? 1 : opacity,
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-900 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
                Grow Your Business With{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  SEO Services
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                Scale Revenue with Sustainable Organic Search Growth
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
              Strategic SEO transforms your website into a 24/7 customer acquisition engine. While competitors waste budgets on temporary paid ads, your business builds lasting search visibility that compounds monthly. Every optimized page, earned backlink, and content piece works continuously to attract qualified prospects actively searching for your solutions—delivering{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
                10x better ROI than traditional advertising
              </a>
              {' '}while establishing market authority competitors can't easily replicate.
            </p>

            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Grow Your Business Now</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              x: xRight,
              opacity: isMobile ? 1 : opacity,
            }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047484/seo-page-girl_ccqj2r.webp"
                alt="SEO analytics showing business growth and increased website traffic"
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
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
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
                  animate="animate"
                  className="absolute -top-2 right-2 sm:top-0 sm:right-4 lg:top-0 lg:right-0"
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
                  animate="animate"
                  className="absolute bottom-4 left-2 sm:bottom-8 sm:left-4 lg:bottom-8 lg:left-0"
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
  )
}

export default GrowWithSEO
