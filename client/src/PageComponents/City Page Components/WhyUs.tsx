'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface DmNeedProps {
  cityName: string
}

const WhyUs: React.FC<DmNeedProps> = ({ cityName }) => {
  return (
    <section className="max-w-full bg-[#0b254f] lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-35">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047492/Tools_aktfkk.png"
                alt="Digital marketing analytics dashboard showing online marketing performance"
                width={600}
                height={600}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />

              <motion.div
                animate={{
                  x: [-10, 10, -10],
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-0 right-4 sm:bottom-2 sm:-right-4 lg:-bottom-29 lg:-right-25 z-10"
              >
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_316/v1761047482/hand_scbtao.png"
                  alt="Hand pointing"
                  width={316}
                  height={316}
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 316px"
                  className="w-32 h-48 sm:w-36 sm:h-52 lg:w-79 lg:h-79 object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-200 mb-4 bungee-inline-regular">
                Why Us Instead of Other <span className="bg-blue-400 bg-clip-text text-transparent">{cityName}&apos;s SEO Agencies?</span>{' '}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Choosing the right SEO partner can transform your local digital presence and grow your business. Here&apos;s why Vaphers stands out among SEO agencies in {cityName}.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-xl text-white leading-relaxed text-center lg:text-left">
              Experience dedicated SEO experts focused on tailored strategies that move the needle for your brand. Our local market knowledge, transparent reporting, and cutting-edge optimization techniques help you outpace competitors, increase qualified traffic, and achieve measurable ROI in {cityName}.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
