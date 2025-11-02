'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const SEMPitch: React.FC = () => {
  return (
    <section className="max-w-full overflow-hidden relative">
      {/* Dashed Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-5 pb-8 sm:pb-12 lg:pb-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-700 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Dominate Search With{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Strategic SEM
                </span>{' '}
                That Delivers
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Capture high-intent leads with Google Ads campaigns powered by smart bidding, laser-focused keywords, and conversion-optimized landing pages.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Drive immediate visibility and qualified traffic by combining paid search advertising with proven optimization tactics. From long-tail keyword targeting and Performance Max campaigns to AI-powered bidding strategies, every element is engineered to lower acquisition costs and maximize ROAS. Expect comprehensive tracking setup, continuous A/B testing of ad copy and landing pages, and data-driven bid adjustments that compound results month over month.
            </p>

            <ul className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed space-y-2 list-disc pl-5">
              <li>Purchase-intent keywords: Target long-tail, high-conversion search terms that signal buying readiness and decision-stage intent.</li>
              <li>Smart bidding integration: Leverage Target CPA and Target ROAS with first-party data for automated, performance-driven optimization.</li>
              <li>Complete campaign structure: Search, Display, Shopping, and Performance Max campaigns aligned to audience intent and business goals.</li>
            </ul>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href="/contact-us">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Launch High-ROI SEM Campaigns</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047492/Tools_aktfkk.png"
                alt="Google Ads dashboard showing search campaigns, keyword performance, and conversion metrics"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SEMPitch
