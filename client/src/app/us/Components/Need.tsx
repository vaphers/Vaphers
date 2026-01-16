'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const DmNeed: React.FC = () => {
  return (
    <section className="max-w-full bg-[#0b254f] lg:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-35">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047492/Tools_aktfkk.png"
                alt="Web design and digital marketing tools dashboard"
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
                Leading
                <span className="bg-blue-400 bg-clip-text text-transparent">
                  {' '}Web Design & Digital Marketing Agency
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Helping Businesses Build, Market, and Scale Online
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-xl text-white leading-relaxed text-center lg:text-left">
              Vaphers is a leading web design and digital marketing agency helping businesses establish a strong and reliable online presence. 
              We deliver performance-focused websites through <a className='text-blue-200 underline' href="https://www.vaphers.com/seo-services">
              affordable web design for small business</a>, ensuring every site is fast, conversion-driven, and built for long-term growth. 
              Alongside this, our proven <a className='text-blue-200 underline' href="https://www.vaphers.com/seo-services">
              affordable SEO services</a> help brands improve visibility, attract qualified traffic, and compete effectively in today’s crowded digital landscape.
            </p>

            {/* Button */}
            <a href="https://www.vaphers.com/seo-services">
              <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Explore Our SEO Services</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DmNeed
