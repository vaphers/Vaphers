// components/EcommercePromoDynamic.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

export interface EcommercePromoProps {
  heading: string
  subheading?: string
  /** HTML string allowed (anchors, spans, etc). Will be injected with dangerouslySetInnerHTML. */
  description: string
  imageUrl: string
  altText?: string
  /** If true -> image on right, content on left. Default false (image left). */
  reverse?: boolean
  ctaHref?: string
  ctaText?: string
  /** Optionally mark image as priority (for critical images) */
  priorityImage?: boolean
}

const EcommercePromoDynamic: React.FC<EcommercePromoProps> = ({
  heading,
  subheading,
  description,
  imageUrl,
  altText = '',
  reverse = false,
  ctaHref = 'https://www.vaphers.com/contact-us',
  ctaText = 'Partner with Vaphers Today',
  priorityImage = false,
}) => {
  return (
    <section className="max-w-full bg-[#0f3064] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-0 pb-8 sm:pb-12 lg:pb-16">
        <div
          className={`flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16 ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-none">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 8 }}>
                <Image
                  src={imageUrl}
                  alt={altText || heading}
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority={priorityImage}
                />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6 order-2">
            <div>
              <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-200 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                {heading}{' '}
                <span className="bg-blue-400 bg-clip-text text-transparent">
                </span>
              </h3>

              {subheading && (
                <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                  {subheading}
                </p>
              )}
            </div>

            {/* Description */}
            <div
              className="text-sm sm:text-base lg:text-xl text-white leading-relaxed text-center lg:text-left"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <Link href={ctaHref ?? '#'} target="_blank" rel="noopener noreferrer" className="no-underline">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">{ctaText}</span>
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

export default EcommercePromoDynamic
