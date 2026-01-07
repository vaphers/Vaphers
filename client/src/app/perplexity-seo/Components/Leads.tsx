'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Award, Mic, Search, Zap, Globe2 } from 'lucide-react'
import Image from 'next/image'

const PerplexityLeadsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px", once: true })

  return (
    <section ref={ref} className="w-full py-8 md:py-16 bg-white relative overflow-hidden">
      {/* Background Pattern Image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg"
          alt="Background Pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2 column at the top  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-3 mb-4 md:mb-3">
          {/* content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight bungee-inline-regular">
              How Perplexity SEO{' '}
              <span className="text-blue-600">Drives Leads?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              All the strategies and optimization you need to capture high-intent traffic from AI search engines like Perplexity, ChatGPT, and Google Gemini
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Perplexity users aren't casually browsing, they're actively researching solutions and making buying decisions. When your business gets cited, you're reaching prospects at peak intent who trust AI recommendations over traditional ads.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our <a href="https://vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2">LLM Citations Services</a> position you as Perplexity's go-to recommendation through technical optimization, authority building, and content that AI engines trust and cite repeatedly.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              The result? Qualified leads who already view you as the expert before they even visit your site. Citations create instant credibility that shortens sales cycles and improves conversion rates dramatically.
            </p>
          </motion.div>

          {/* right 3 box - Mobile: Single column, Desktop: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 lg:grid-rows-2 gap-3 h-full">
            {/* Top left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sm:col-span-1 lg:col-span-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-blue-200/50"
            >
              <Search className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-blue-600" />
              <h3 className="text-base sm:text-lg text-gray-800 font-semibold text-center leading-tight mt-1 sm:mt-2">
                High-Intent Targeting
              </h3>
            </motion.div>

            {/* Top right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sm:col-span-1 lg:col-span-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-5 border border-purple-200/50"
            >
              <Zap className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg text-gray-800 font-semibold mb-1 sm:mb-2">
                  AI Citations
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Get recommended by Perplexity in 780M monthly queries across 238 countries with AI-optimized content
                </p>
              </div>
            </motion.div>

            {/* Bottom box full  */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2 lg:col-span-10 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-5 border border-orange-200/50"
            >
              <Award className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg text-gray-800 font-semibold mb-1 sm:mb-2">
                  Authority Building
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Citations establish instant credibility and expert positioning. When Perplexity recommends you, prospects already trust you before clicking. This shortens sales cycles and increases conversion rates dramatically.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 box section - Mobile: Single column, Tablet: 2 columns, Desktop: Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-3">
          {/* 1st box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-indigo-200/50"
          >
            <Users className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-indigo-600" />
            <p className="text-base sm:text-lg text-gray-800 font-semibold text-center leading-tight">Qualified Leads</p>
          </motion.div>

          {/* 2nd box with content  */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="sm:col-span-1 lg:col-span-4 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-lg p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-5 border border-teal-200/50"
          >
            <Mic className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-teal-600 flex-shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg text-gray-800 font-semibold mb-1 sm:mb-2">
                Voice Search Capture
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Perplexity Voice handles 40% of mobile queries with conversational AI. We optimize your content for natural language patterns and local intent to dominate voice search results.
              </p>
            </div>
          </motion.div>

          {/* 3rd box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-rose-50 to-pink-100 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-rose-200/50"
          >
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-rose-600" />
            <p className="text-base sm:text-lg text-gray-800 font-semibold text-center leading-tight">Brand Growth</p>
          </motion.div>

          {/* 4th box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-sky-50 to-cyan-100 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-sky-200/50"
          >
            <Globe2 className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-sky-600" />
            <p className="text-base sm:text-lg text-gray-800 font-semibold text-center leading-tight">Global Reach</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PerplexityLeadsSection
