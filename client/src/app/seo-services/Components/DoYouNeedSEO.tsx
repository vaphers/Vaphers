'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

const DoYouNeedSEO: React.FC = () => {
  return (
    <section className="relative max-w-full bg-[#0b254f] overflow-hidden">
      
      {/* Absolute Images (Commented out as in your original code) */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-20 items-end">
          
          {/* Image Left */}
          {/* Reduced gap and adjusted max-width on mobile to prevent the image from becoming too overwhelmingly tall before the user reads the text */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-none mx-auto">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773824392/Just-sold-seo-to-this-guy_akoylq.png"
                alt="Do You Even Need SEO Services?"
                width={800}
                height={800}
                className="w-full h-auto object-contain object-bottom" 
              />
            </div>
          </div>

          {/* Content Right */}
          {/* Pulled padding down slightly on mobile to reduce dead space */}
          <div className="lg:col-span-6 w-full space-y-4 sm:space-y-6 pb-10 sm:pb-12 lg:pb-16 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-full">
              {/* FIXED: Scaled typography UP correctly (28px -> 3xl -> 4xl -> 5xl). 
                  Added a forced line break on mobile so "Organic" doesn't get orphaned. */}
              <h3 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 mb-3 sm:mb-4 lg:mb-6 leading-[1.2] bungee-inline-regular">
                Do You Even Need <br className="block sm:hidden" />
                <span className="bg-blue-400 bg-clip-text text-transparent">
                  Organic SEO Marketing?
                </span>
              </h3>
              <p className="text-[13px] sm:text-base lg:text-lg text-blue-200 font-medium">
                Stay Competitive in the Digital-First Marketplace
              </p>
            </div>

            <p className="text-[14px] sm:text-base lg:text-lg text-white leading-relaxed max-w-[95%] sm:max-w-none mx-auto">
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
              . Unlike paid ads that vanish when your budget runs out, investing in <strong>affordable seo marketing</strong> creates a compounding digital asset that continuously attracts qualified traffic and drives sustainable revenue.
            </p>

            {/* Button */}
            {/* FIXED: Made the button full-width on mobile (w-full) with rounded-xl for easier tapping, returns to rounded-full & auto-width on desktop. */}
            <div className="pt-2 sm:pt-4 lg:pb-4 w-full sm:w-auto flex justify-center lg:justify-start">
              <Link href={"https://www.vaphers.com/contact"} className="w-full sm:w-auto">
                <div className="flex items-center justify-center w-full px-4 py-3.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm lg:text-base font-semibold rounded-xl sm:rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3 whitespace-nowrap">Start Your SEO Journey</span>
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default DoYouNeedSEO