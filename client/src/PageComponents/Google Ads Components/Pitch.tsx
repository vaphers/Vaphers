'use client'

import React from 'react'
import Image from 'next/image'
import { TrendingUp } from 'lucide-react'

const GoogleAdsPitch: React.FC = () => {
  return (
    <section className="max-w-full overflow-hidden">
      <div className="relative max-w-full px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-10 pb-8 sm:pb-12 lg:pb-16">
        {/* Dashed Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 0',
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />

        <div className="flex flex-col max-w-7xl mx-auto lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761737739/AffordableLocalSeoServices_2_zxfo9e.png"
                alt="Google Ads dashboard and campaign analytics"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-700 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Affordable{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent ">
                  Google Ads Management Services
                </span>{' '}
                Trusted By Growing Businesses
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Maximize your ROI with proven pay-per-click strategies, expert ad optimization, and transparent reporting—without breaking the bank.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Most businesses waste valuable ad spend due to inexperience, missed opportunities, or generic campaigns. Our affordable Google Ads management services ensure your budget is spent wisely, driving targeted traffic and real conversions. From meticulous keyword research and compelling ad copy to continuous optimization and actionable insights, our service is your shortcut to outperforming competitors while keeping costs low. 
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Get Your Free Google Ads Audit</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoogleAdsPitch
