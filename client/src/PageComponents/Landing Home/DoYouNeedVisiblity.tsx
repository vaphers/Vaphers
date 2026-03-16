'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

const DoYouNeedSEO: React.FC = () => {
  return (
    <section className="relative max-w-full bg-[#0b254f] overflow-hidden">
      
      {/* Absolute Image 1 (Top Left) 
        HOW TO CHANGE POSITION:
        - Mobile default: top-0 -left-6 (slightly off-screen top left)
        - Tablet (md): top-8 left-0
        - Desktop (lg): top-4 left-4 (Your original)
      */}
      <div className="absolute opacity-80 pointer-events-none z-0
        top-0 -left-0 w-[200px] 
        md:top-8 md:left-0 md:w-[150px] 
        lg:top-4 lg:left-0 lg:w-[350px]
      ">
        <Image
          src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773389206/Sold_marketing_package_to_this_guy_xu88vg.png"
          alt="Decoration Top Left"
          width={500} 
          height={500}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Absolute Image 2 (Middle/Right) 
        HOW TO CHANGE POSITION:
        - Mobile default: top-[15%] left-[85%]
        - Tablet (md): top-[20%] left-[80%]
        - Desktop (lg): top-25 left-150 (Your original)
      */}
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none z-0
        top-16 left-[75%] w-[150px] 
        md:top-[20%] md:left-[80%] md:w-[250px] 
        lg:top-25 lg:left-150 lg:w-[300px]
      ">
        <Image
          src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773253613/Why_did_i_buy_it__4_y6yiji.png"
          alt="Decoration Middle"
          width={500} 
          height={500}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-20 items-end">
          
          {/* Image Left */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
            <div className="relative w-full">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773251597/freepik_br_7fd8e8f0-b36e-414e-8de5-af0ceb3c54b7_eddxuf.png"
                alt="Do You Even Need SEO Services?"
                width={800}
                height={800}
                className="w-full h-auto object-contain object-bottom" 
              />
            </div>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-6 w-full space-y-4 sm:space-y-6 pb-8 sm:pb-12 lg:pb-16">
            <div>
              <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-200 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Do You Even Need{' '}
                <span className="bg-blue-400 bg-clip-text text-transparent">
                 Visibility?
                </span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Stay Competitive in the Digital-First Marketplace
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed text-center lg:text-left">
              With 93% of online experiences starting on search engines, staying off the first page means missing out on capturing high-intent US customers. Building strong, targeted{' '}
              <a 
                href="https://www.vaphers.com/seo-services/local-seo-services" 
                className="text-blue-300 underline hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                local search marketing
              </a>
              {' '}is the ultimate driver for{' '}
              <a 
                href="https://www.vaphers.com/ppc-marketing/lead-generation-services"
                className="text-blue-300 underline hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                <strong>effective lead generation</strong>
              </a>
              . Unlike paid ads that vanish when your budget runs out, investing in <strong>organic search visibility</strong> creates a compounding digital asset that continuously attracts qualified traffic and drives sustainable revenue.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
          <Link href="/contact" className="w-60">
            <button className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-800 cursor-pointer">
              Wanna Get On a Call?
            </button>
          </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default DoYouNeedSEO