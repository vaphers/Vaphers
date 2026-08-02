'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

const DoYouNeedSEO: React.FC = () => {
  return (
    <section className="relative max-w-full bg-blue-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-20 items-end">
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-none mx-auto">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773824392/Just-sold-seo-to-this-guy_akoylq.png"
                alt="Is marketing worth it for a design studio?"
                width={800}
                height={800}
                className="w-full h-auto object-contain object-bottom" 
              />
            </div>
          </div>
          <div className="lg:col-span-6 w-full space-y-4 sm:space-y-6 pb-10 sm:pb-12 lg:pb-16 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-full">
              <h3 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 mb-3 sm:mb-4 lg:mb-6 leading-[1.2] bungee-inline-regular">
                Is Digital Marketing Worth It for a <span className="bg-blue-400 bg-clip-text text-transparent">
                  Design Studio?
                </span>
              </h3>
              <p className="text-[13px] sm:text-base lg:text-lg text-blue-200 font-medium">
                Stay Competitive in the Digital-First Marketplace
              </p>
            </div>
            <p className="text-[14px] sm:text-base lg:text-lg text-white leading-relaxed max-w-[95%] sm:max-w-none mx-auto">
            If your best clients are still coming only from referrals, you're one slow season away from an empty pipeline. Interior design marketing doesn't replace your reputation, it amplifies it to a wider, high-intent audience consistently, without you having to network for it. It's a long-term investment that compounds: the brand authority you build today keeps bringing premium clients next year too.
            </p>
            <div className="pt-2 sm:pt-4 lg:pb-4 w-full sm:w-auto flex justify-center lg:justify-start">
              <Link href={"https://calendar.app.google/EkZJNhjEhLxjfqPa6"} className="w-full sm:w-auto">
              <button className="w-fit transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-500 dark:text-black dark:hover:bg-gray-200">
                Book Your Marketing Consultation Today!
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DoYouNeedSEO
