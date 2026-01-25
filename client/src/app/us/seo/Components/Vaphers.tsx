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
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047492/Tools_aktfkk.png"
                alt="SEO tools and digital marketing analytics platform"
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
                  alt="Hand pointing to SEO tools"
                  width={200}
                  height={300}
                  className="w-24 h-36 sm:w-32 sm:h-48 lg:w-40 lg:h-60 object-contain"
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-200 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Vaphers: Your Leading{' '}
                <span className="bg-blue-400 bg-clip-text text-transparent ">
                  SEO Management Company
                </span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Stay Competitive in the Digital-First Marketplace
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed text-center lg:text-left">
              Professional SEO services are essential because 93% of all online experiences begin with search engines, yet 75% of users never scroll past the first page. Without strategic optimization, from{' '}
              <a 
                href="https://www.vaphers.com/seo-services/technical-seo-services" 
                className="text-blue-300 underline hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                technical SEO foundations
              </a>
              {' '}that ensure crawlability to{' '}
              <a 
                href="https://www.vaphers.com/seo-services/local-seo-services" 
                className="text-blue-300 underline hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                local SEO strategies
              </a>
              {' '}that capture "near me" searches, your business remains invisible to the 8.5 billion daily Google searches from potential customers actively seeking your solutions. SEO leads convert at 14.6% compared to just 1.7% for traditional marketing, while delivering an average ROI of 400% within two years. Unlike paid advertising that stops working when you stop paying, SEO builds lasting digital assets through keyword optimization and content strategy that continuously attract qualified traffic and generate sustainable revenue growth.
            </p>

            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href={"https://www.vaphers.com/contact"}>
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
