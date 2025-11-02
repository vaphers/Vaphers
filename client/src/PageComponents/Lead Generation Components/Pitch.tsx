'use client'

import React from 'react'
import Image from 'next/image'
import { TrendingUp } from 'lucide-react'

const LeadGenerationPitch: React.FC = () => {
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
                alt="Lead generation funnel and conversion optimization dashboard"
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
                Strategic{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Lead Generation Services
                </span>{' '}
                That Fill Your Pipeline
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Convert visitors into qualified leads with data-driven campaigns designed for maximum ROI.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Without a strategic lead generation system, your business is losing potential customers to competitors who capture their interest first. Every day without optimized campaigns means missed opportunities and wasted ad spend. Our lead generation services combine{' '}
              <a href="#" className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium">
                high-converting landing pages, targeted advertising, and smart automation
              </a>
              , delivering sales-ready prospects directly to your team. We build sustainable systems that consistently fill your pipeline with qualified leads who are actively searching for your solutions.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Start Generating Quality Leads Today</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadGenerationPitch
