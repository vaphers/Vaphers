'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const SeoAuditPitch: React.FC = () => {
  return (
    <section className="max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-5 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047492/Tools_aktfkk.png"
                alt="Comprehensive SEO audit tools and analytics dashboard"
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
                Get Your Free{' '} <br/>
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  SEO Audit
                </span>{' '}
                Today
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Uncover hidden issues holding your website back from top rankings and organic growth.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              An SEO audit is a comprehensive analysis of your website&apos;s technical health, content quality, and search engine visibility. Our expert team identifies critical issues like broken links, slow page speeds, poor mobile optimization, and missing meta tags that prevent your site from ranking higher. With Vaphers&apos; free SEO audit, you&apos;ll receive a{' '}
              <a href="#" className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium">
                detailed report with actionable recommendations
              </a>
              {' '}to improve your search rankings, increase organic traffic, and outperform competitors. Don&apos;t let technical issues cost you valuable customers, discover exactly what&apos;s holding your website back and get a clear roadmap to SEO success.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href="/contact-us">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Get a Free SEO Audit</span>
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

export default SeoAuditPitch
