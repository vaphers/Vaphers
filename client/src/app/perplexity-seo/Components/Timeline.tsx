'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const PerplexityTimeline: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px" })
  const [current, setCurrent] = useState(0)

  const steps = [
    {
      title: "Get More Qualified Leads",
      date: "High-Intent Traffic",
      desc: "Perplexity users are actively researching solutions, comparing options, and making buying decisions. When your business gets cited in Perplexity answers, you're reaching prospects at the exact moment they need your service. Our AI SEO Services optimize your content to capture these high-intent queries, positioning you as the go-to solution before users ever see your competitors."
    },
    {
      title: "Build Brand Awareness",
      date: "780M Monthly Queries",
      desc: "Perplexity processed 780 million queries in May 2025 and continues growing 20% month-over-month across 238 countries. Getting cited repeatedly in Perplexity answers puts your brand in front of researchers, decision-makers, and buyers worldwide. Unlike traditional ads that feel intrusive, Perplexity citations build organic awareness by recommending you as a trusted source when people ask questions in your industry."
    },
    {
      title: "Establish Authority",
      date: "Trusted Expert Status",
      desc: "When Perplexity cites your business as a source, you gain instant credibility and expert positioning. We help you build comprehensive, research-backed content that AI engines recognize as authoritative. This includes detailed guides, data-driven insights, expert perspectives, and properly structured information that makes you the obvious citation choice over competitors lacking depth and expertise."
    },
    {
      title: "Capture Voice Search",
      date: "40% of Mobile Queries",
      desc: "Voice search is exploding and Perplexity Voice Assistant is leading the charge. We optimize your content for conversational queries, natural language patterns, and local intent signals that voice users rely on. With our AI SEO Services, you'll dominate voice search results and get recommended when mobile users ask questions on the go, a massive advantage traditional SEO can't deliver."
    }
  ]

  const next = () => setCurrent((current + 1) % steps.length)
  const prev = () => setCurrent((current - 1 + steps.length) % steps.length)

  return (
    <section ref={ref} className="w-full py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <h2 className="text-7xl lg:text-8xl font-serif text-gray-200 leading-none tracking-tight">
              Perplexity SEO Benefits
            </h2>
            
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="text-xl font-medium text-gray-900 min-w-[80px] text-center">
                {current + 1} of {steps.length}
              </span>
              <button
                onClick={next}
                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative pt-16"
          >
            {/* Top metadata */}
            <div className="mb-8 text-center">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 tracking-wide">
                {steps[current].title}
              </h3>
              <p className="text-xs text-gray-500 tracking-wide">
                {steps[current].date}
              </p>
            </div>

            {/* Timeline dots with line */}
            <div className="relative mb-16">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -translate-y-1/2" />
              <div className="flex justify-between items-center relative z-10">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === current 
                        ? 'bg-blue-600 scale-150 shadow-lg' 
                        : i < current
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Side label */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-8 origin-center -rotate-90">
              <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase">
                Featured
              </span>
            </div>

            {/* Content card */}
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white"
            >
              <h4 className="text-3xl font-bold text-gray-700 mb-6 flex items-start gap-3 bungee-inline-regular">
                <span className="text-blue-600 ">
                  {String(current + 1).padStart(2, '0')}
                </span>
                <span>{steps[current].title}</span>
              </h4>

              <p className="text-gray-700 text-lg leading-relaxed">
                {steps[current].desc.split('AI SEO Services').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <a 
                        href="https://www.vaphers.com/seo-services/ai-seo-services"
                        className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2 transition-colors"
                      >
                        AI SEO Services
                      </a>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PerplexityTimeline
