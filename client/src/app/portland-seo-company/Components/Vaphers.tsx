'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

const SeoNeed: React.FC = () => {
  return (
    <section className="max-w-full bg-[#0b254f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047492/Tools_aktfkk.png"
                alt="SEO company in Portland using advanced tools for local business growth"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
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
                className="absolute bottom-0 right-4 sm:bottom-4 sm:right-0 lg:bottom-0 lg:right-0 z-10"
              >
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_316/v1761047482/hand_scbtao.png"
                  alt="Digital marketing strategy for Portland businesses"
                  width={200}
                  height={300}
                  className="w-24 h-36 sm:w-32 sm:h-48 lg:w-40 lg:h-60 object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-200 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Leading{" "}
                <span className="bg-blue-400 bg-clip-text text-transparent">
                  SEO Company <br /> In Portland Oregon
                </span>
              </h3>

              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Helping Portland Businesses Dominate Local Search
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed text-center lg:text-left">
              Vaphers is the leading local SEO company in Portland, helping businesses increase their visibility, attract qualified traffic, and convert searchers into loyal customers. In today’s competitive digital landscape, ranking on the first page of Google is no longer optional, it is essential. Our strategic SEO services for Portland businesses are designed to ensure your brand stands out when potential customers search for the products or services you offer.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed text-center lg:text-left">
              As a trusted SEO company in Portland, we focus on <a href="http://www.vaphers.com/seo-services/technical-seo-services" className='text-blue-300 hover:underline'>technical seo optimization</a>, content strategy, local search visibility, and data-driven performance tracking. Our approach is built around long-term growth, not short-term tricks. By improving your online authority and targeting high-intent local keywords, we help Portland businesses generate sustainable leads, consistent traffic, and measurable revenue growth.
            </p>

            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href="/contact">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Start Your SEO Journey</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SeoNeed
