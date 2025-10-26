'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const TechnicalSeoPitch: React.FC = () => {
  return (
    <section className="max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-5 pb-8 sm:pb-12 lg:pb-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047492/Tools_aktfkk.png"
                alt="Technical SEO optimization tools and website performance dashboard"
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
                Master Your{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Technical SEO
                </span>{' '}
                Foundation
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Optimize your website's infrastructure for maximum crawlability, speed, and search engine performance.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Technical SEO is the backbone of search engine rankings, focusing on optimizing your website's infrastructure to make it easily accessible and indexable by search engines. Our expert team addresses critical technical elements including site speed optimization, mobile responsiveness, structured data implementation, XML sitemaps, robots.txt configuration, and Core Web Vitals. With Vaphers' technical SEO services, you'll get{' '}
              <a href="#" className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium">
                comprehensive optimization strategies
              </a>
              {' '}that ensure search engines can efficiently crawl, render, and index your content. From eliminating duplicate content and fixing broken links to implementing HTTPS security and enhancing server response times, we build the technical foundation that allows your content to rank higher and perform better in search results.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href="/contact-us">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Optimize Your Site Today</span>
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

export default TechnicalSeoPitch
