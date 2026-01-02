'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, TrendingUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  isDark?: boolean
  showButton?: boolean
  delay?: number
}

const FeatureCard = ({ icon, title, description, className = "", isDark = false, showButton = false, delay = 0 }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px", once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`rounded-sm p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 ${isDark ? 'bg-[#012e6a] text-white' : 'bg-gray-50 text-gray-800'} ${className}`}
    >
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center ${isDark ? 'border-white/20 bg-white/10' : 'border-gray-200 bg-white'}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 flex-grow">
        <h3 className={`text-xl sm:text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-blue-100/80' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>
      {showButton && (
        <a 
          href="https://vaphers.com/seo-services/ai-seo-services"
          className="mt-2 w-fit bg-white hover:bg-gray-100 text-[#012e6a] font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full flex items-center gap-2 transition-colors text-xs sm:text-sm"
        >
          Get Started <ArrowRight size={16} />
        </a>
      )}
    </motion.div>
  )
}

const WhyVaphersSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px", once: true })

  return (
    <div className=" w-full relative bg-white">
      {/* Dashed Grid Background */}
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

      <div className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl text-center text-slate-800 mb-8 sm:mb-12 bungee-inline-regular leading-tight"
          >
            Why <span className="text-blue-600">Vaphers</span> for Perplexity SEO?
          </motion.h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {/* Left Column - Stacked */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FeatureCard
                delay={0.1}
                icon={
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767347766/device_hub_hqmian.png"
                    alt="High Intent Traffic"
                    width={22}
                    height={22}
                    className="object-contain w-5 h-5 sm:w-[22px] sm:h-[22px]"
                  />
                }
                title="High-Intent Traffic Targeting"
                description="Reach prospects actively researching solutions in Perplexity. We position you to get cited when buyers are making decisions, delivering qualified leads with genuine purchase intent that traditional SEO can't match."
              />
              <FeatureCard
                delay={0.2}
                icon={<Award className="text-slate-700 w-5 h-5 sm:w-[22px] sm:h-[22px]" />}
                title="Authority-Building Expertise"
                description="Build E-E-A-T signals that AI engines trust. Our strategies help you become Perplexity's go-to recommendation through expert content, verified data, and citation-worthy authority in your niche."
              />
              <FeatureCard
                delay={0.3}
                className="sm:col-span-2"
                icon={<TrendingUp className="text-slate-700 w-5 h-5 sm:w-[22px] sm:h-[22px]" />}
                title="780M Monthly Query Reach"
                description="Vaphers specializes in getting you cited in Perplexity's 780 million monthly queries across 238 countries. Whether you're targeting voice search, mobile researchers, or desktop users, our AI SEO Services provide proven strategies to dominate citations and drive measurable growth in brand awareness and conversions."
              />
            </div>

            {/* Right Column - Tall Dark Card */}
            <div className="md:col-span-1">
              <FeatureCard
                delay={0.4}
                isDark
                showButton
                className="h-full"
                icon={
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767348259/memory_1_wlnhdv.png"
                    alt="Real-Time Performance"
                    width={22}
                    height={22}
                    className="object-contain w-5 h-5 sm:w-[22px] sm:h-[22px]"
                  />
                }
                title="Real-Time Performance Tracking"
                description="At Vaphers, we understand the importance of measurable results. That's why our AI SEO Services include real-time citation monitoring, weekly optimization sprints, and transparent reporting.

Track your Perplexity rankings, citation frequency, and traffic from AI search—all with data-driven insights that prove ROI and guide next steps."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyVaphersSection
