'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const EcommercePromo: React.FC = () => {
  return (
    <section className="max-w-full bg-[#0f3064] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-0 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Image Left with Hand */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761549097/why-ecommerce-seo_scnbgg.png"
                alt="Ecommerce platforms including Shopify, WooCommerce, OpenCart, and Squarespace"
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
                  alt="Hand pointing to ecommerce platforms"
                  width={200}
                  height={300}
                  className="w-24 h-36 sm:w-32 sm:h-48 lg:w-40 lg:h-60 object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-200 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Why Choose Vaphers for{' '}
                <span className="bg-blue-400 bg-clip-text text-transparent ">
                  Ecommerce SEO?
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Trusted SEO Partner for Shopify, WooCommerce, OpenCart & Squarespace Stores
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-xl text-white leading-relaxed text-center lg:text-left">
              At <span className="font-bold text-blue-300">Vaphers</span>, we specialize in affordable, results-driven ecommerce SEO that helps online stores dominate search rankings and drive consistent sales. Whether you&apos;re running a Shopify store, WooCommerce site, OpenCart platform, or Squarespace shop, our expert team implements{' '}
              <a href="#" className="text-blue-200 underline hover:text-blue-400 duration-200 font-medium">
                platform-specific strategies, product optimization, and conversion-focused content
              </a>
              {' '}that turn search traffic into loyal customers. We don&apos;t just increase rankings—we grow your revenue with transparent reporting and measurable ROI.
            </p>

            {/* Button - Responsive sizing */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Partner with Vaphers Today</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EcommercePromo
