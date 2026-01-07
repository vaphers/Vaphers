'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Award, Mic, Search, Zap, Globe2 } from 'lucide-react'
import Image from 'next/image'

const GeminiSEOStrategySection: React.FC = () => {
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
              Vaphers Gemini SEO{' '}
              <span className="text-blue-600">Strategy</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              All the strategies and optimization you need to dominate Google Gemini, AI Overviews, and next-generation search across Google's AI ecosystem.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Gemini users aren't casually browsing. They're actively researching solutions and making informed decisions. When your business gets cited in AI Overviews (appearing in 60% of searches), you're reaching prospects at peak intent who trust Google's AI recommendations.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our <a href="https://vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2">LLM SEO services</a> position you as Gemini's go-to recommendation through schema markup implementation, conversational content optimization, and authority signals that AI engines trust and cite repeatedly.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              The result? Qualified leads who already view you as the expert before they even visit your site. AI Overview citations create instant credibility that shortens sales cycles and improves conversion rates dramatically.
            </p>
          </motion.div>

          {/* right 3 box - Mobile: Single column, Desktop: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 lg:grid-rows-2 gap-3 h-full">
            {/* Top left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sm:col-span-1 lg:col-span-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-slate-500/30"
            >
              <Search className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-slate-200" />
              <h3 className="text-base sm:text-lg text-slate-100 font-semibold text-center leading-tight mt-1 sm:mt-2">
                Schema Markup
              </h3>
            </motion.div>

            {/* Top right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sm:col-span-1 lg:col-span-6 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-5 border border-indigo-500/30"
            >
              <Zap className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-indigo-200 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg text-indigo-100 font-semibold mb-1 sm:mb-2">
                  AI Overview Optimization
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                  Get featured in Google's AI Overviews appearing in 60% of searches with structured data and conversational content
                </p>
              </div>
            </motion.div>

            {/* Bottom box full  */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2 lg:col-span-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-5 border border-emerald-500/30"
            >
              <Award className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-emerald-200 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg text-emerald-100 font-semibold mb-1 sm:mb-2">
                  Authority & Trust Building
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  Citations establish instant credibility through entity-based linking, fresh content updates, and expert-authored articles that demonstrate topical authority. When Gemini recommends you, prospects already trust you before clicking.
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
            className="sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-teal-500/30"
          >
            <Users className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-teal-200" />
            <p className="text-base sm:text-lg text-teal-100 font-semibold text-center leading-tight">Topic Clustering</p>
          </motion.div>

          {/* 2nd box with content  */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="sm:col-span-1 lg:col-span-4 bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-5 border border-violet-500/30"
          >
            <Mic className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-violet-200 flex-shrink-0" />
            <div>
              <h3 className="text-base sm:text-lg text-violet-100 font-semibold mb-1 sm:mb-2">
                Conversational Queries
              </h3>
              <p className="text-xs sm:text-sm text-violet-100/90 leading-relaxed">
                Optimize for natural language patterns and long-tail keywords that Gemini prioritizes for voice and mobile search
              </p>
            </div>
          </motion.div>

          {/* 3rd box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-rose-600 to-rose-700 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-rose-500/30"
          >
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-rose-200" />
            <p className="text-base sm:text-lg text-rose-100 font-semibold text-center leading-tight">Content Freshness</p>
          </motion.div>

          {/* 4th box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="sm:col-span-1 lg:col-span-2 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-3 border border-amber-500/30"
          >
            <Globe2 className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-amber-200" />
            <p className="text-base sm:text-lg text-amber-100 font-semibold text-center leading-tight">Multi-Step Reasoning</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GeminiSEOStrategySection
