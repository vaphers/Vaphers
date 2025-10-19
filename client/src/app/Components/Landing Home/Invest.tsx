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
      ease: "easeInOut",
      delay: custom * 0.3
    }
  })
}

const Invest: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)

  const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 1024px)").matches

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/PatternBG.jpg)`
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-20 pb- sm:pb-12 lg:pb-0'>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          {/* Content */}
          <motion.div
            style={{
              x: xLeft,
              opacity: isMobile ? 1 : opacity
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
                Why You Should Invest In{' '}
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent ">
                  SEO Services
                </span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                Connect with Your Customers Where They Spend Their Time Online
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
              Digital marketing is the use of online channels, platforms, and technologies to promote your business, products,
              or services to potential customers. It encompasses everything from search engine optimization (SEO) and social media
              marketing to{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
                email campaigns and pay-per-click advertising
              </a>
              . The goal is to reach your target audience where they're already spending their time - online.
            </p>

            {/* button */}
            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            style={{
              x: xRight,
              opacity: isMobile ? 1 : opacity
            }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            {/* Main Image */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="/agency-guy.png"
                alt="Digital marketing analytics dashboard showing online marketing performance"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />

              {/* Floating Elements */}
              <div className="absolute inset-0">
                {/* Google */}
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:left-18 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="/google.png" 
                    alt="Google" 
                    width={56} 
                    height={56} 
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain" 
                  />
                </motion.div>

                {/* Rank 1  */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:-top-4 lg:-right-12"
                >
                  <Image 
                    src="/seo-rank.png" 
                    alt="SEO Rank" 
                    width={176} 
                    height={176} 
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>

                {/* Competitor */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-30 lg:-left-10"
                >
                  <Image 
                    src="/competitor.png" 
                    alt="Competitor" 
                    width={176} 
                    height={176} 
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

export default Invest
