'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import CustomBreadcrumb from '../Global Components/BreadCrumbs'

const TechnicalSeoPitch: React.FC = () => {
  return (
    <section className="max-w-full overflow-hidden min-h-screen w-full relative">
      {/* Dashed Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
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
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-5 pb-8 sm:pb-12 lg:pb-10">
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
              <CustomBreadcrumb 
                links={[{ href: 'https://www.vaphers.com/seo-services', label: 'SEO Services' }]} 
                currentPage="Technical SEO Service"
              />
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-700 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Master Your{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Technical SEO
                </span>{' '}
                Foundation
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Build a high-performance website foundation with expert technical optimization that drives rankings, speed, and search visibility.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Technical SEO is the invisible engine that powers your search rankings, optimizing your website's infrastructure to ensure search engines can efficiently crawl, index, and understand your content. As a critical pillar of any{' '}
              <a 
                href="https://www.vaphers.com/seo-services" 
                className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium"
              >
                comprehensive SEO strategy
              </a>
              , our technical SEO services address Core Web Vitals, site speed optimization, mobile responsiveness, structured data implementation, XML sitemaps, and robots.txt configuration. We go beyond basic optimization by analyzing your{' '}
              <a 
                href="https://www.vaphers.com/website-development-services" 
                className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium"
              >
                website architecture
              </a>
              , eliminating crawl errors, fixing broken links, implementing HTTPS security, and resolving duplicate content issues. Through a detailed{' '}
              <a 
                href="https://www.vaphers.com/seo-services/seo-audit-services" 
                className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium"
              >
                SEO audit
              </a>
              , we identify technical bottlenecks and create a roadmap that transforms your site into a high-performance asset, delivering faster load times, improved user experience, and stronger organic visibility that drives measurable business growth.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href="https://www.vaphers.com/contact">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Get Your Technical SEO Audit</span>
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
