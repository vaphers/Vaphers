'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const MetaAdsPitch: React.FC = () => {
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
          // Dash masks on both axes
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
          // Compose masks so only dashed segments render
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
                Scale With{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Meta Ads
                </span>{' '}
                That Convert
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Launch and optimize Facebook & Instagram campaigns with precise objectives, on-platform AI, and creative that captures attention fast.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Unlock profitable growth on Meta by pairing the right objective with high-impact creatives and clean conversion tracking. From pixel and Conversions API setup to Advantage+ targeting, lookalikes, and audience exclusions, campaigns are structured to maximize signal quality and ROAS. Expect rapid creative testing for hooks, formats (Reels, Stories, Feed), and CTAs, plus continuous optimization on bids, budgets, and placements to compound results.
            </p>

            <ul className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed space-y-2 list-disc pl-5">
              <li>Full-funnel structure: Prospecting, re-engagement, and retargeting aligned to Traffic, Leads, and Sales objectives.</li>
              <li>Creative system: thumb-stopping video, image, and carousel variations with clear, concise copy and CTAs.</li>
              <li>Accurate tracking: Meta Pixel + Conversions API for better attribution and higher-quality optimization signals.</li>
            </ul>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href="/contact-us">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Launch High-ROI Meta Ads</span>
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
                alt="Meta Ads Manager dashboard showing campaigns, audiences, and performance metrics"
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

export default MetaAdsPitch
