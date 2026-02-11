'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Bot, 
  Building2, 
  LayoutGrid, 
  ShoppingCart, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react'

const tabData = [
  {
    id: 'local',
    label: 'Local SEO',
    icon: MapPin,
    title: 'Dominate Portland Local Search',
    description: 'As a leading local SEO company in Portland, we help businesses rank in map packs, local results, and “near me” searches to capture high-intent customers actively looking for your services.',
    points: [
      'Google Business Profile optimization for Portland-based searches.',
      'Hyper-local citation building and NAP consistency management.',
      'Review strategy to strengthen local authority and trust signals.',
    ],
  },
  {
    id: 'ai',
    label: 'AI SEO',
    icon: Bot,
    title: 'Win AI-Driven Search Results',
    description: 'Our AI SEO company in Portland optimizes your content for modern search experiences, including AI-generated answers and conversational queries across emerging platforms.',
    points: [
      'Optimization for AI summaries and large language models.',
      'Conversational and intent-driven keyword targeting.',
      'Entity-based authority building for trusted brand recognition.',
    ],
  },
  {
    id: 'b2b',
    label: 'B2B SEO',
    icon: Building2,
    title: 'Generate High-Value B2B Leads',
    description: 'As a trusted B2B SEO company in Portland, we create authority-driven strategies that attract decision-makers and convert complex sales cycles into qualified revenue opportunities.',
    points: [
      'Bottom-of-funnel commercial intent targeting.',
      'Thought leadership and authority content development.',
      'Technical SEO tailored for enterprise-level websites.',
    ],
  },
  {
    id: 'saas',
    label: 'SaaS SEO',
    icon: LayoutGrid,
    title: 'Scale SaaS Growth Predictably',
    description: 'Our SaaS SEO company in Portland helps software brands capture high-intent product searches and turn organic traffic into trial users, MQLs, and recurring revenue.',
    points: [
      'Competitor comparison and alternative landing pages.',
      'Programmatic SEO for scalable keyword capture.',
      'Product-led content strategy focused on conversions.',
    ],
  },
  {
    id: 'ecommerce',
    label: 'Ecommerce SEO',
    icon: ShoppingCart,
    title: 'Turn Search Traffic Into Sales',
    description: 'As an experienced ecommerce SEO company in Portland, we optimize your store architecture, product pages, and category structure to increase rankings and maximize revenue.',
    points: [
      'Advanced product schema and rich snippet optimization.',
      'Category and internal linking architecture refinement.',
      'SEO + CRO integration to increase transaction value.',
    ],
  },
]


export default function SeoSolutionTabs() {
  const [activeTab, setActiveTab] = useState(tabData[0])

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 opacity-95" />
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight bungee-inline-regular">
            Best SEO Company in Portland - <span className=''>Built For Modern Search Growth</span>
          </h2>

          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl">
            As the best SEO company in Portland, we deliver specialized strategies across local, AI, B2B, SaaS, and ecommerce search — combining technical precision with revenue-focused execution.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {tabData.map((tab) => {
              const isActive = activeTab.id === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    group flex items-center justify-between w-full p-5 text-left rounded-xl border transition-all duration-200 ease-out cursor-pointer
                    ${isActive 
                      ? 'bg-white border-white shadow-xl translate-x-2' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-blue-100 hover:border-white/20'
                    }
                  `}
                >
                  <div className="flex items-center gap-4 ">
                    <div className={`
                      p-2 rounded-lg transition-colors duration-200
                      ${isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-blue-200'}
                    `}>
                      <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className={`text-lg font-medium tracking-wide ${isActive ? 'text-blue-900' : 'text-white'}`}>
                      {tab.label}
                    </span>
                  </div>
                  
                  {isActive && (
                    <motion.div layoutId="arrow" className="text-blue-600">
                      <ArrowRight size={20} strokeWidth={3} />
                    </motion.div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full bg-[#F0F7FF] rounded-2xl p-8 md:p-12 shadow-2xl border border-blue-200 flex flex-col"
              >
                <div className="flex-grow">
                  <h3 className="text-3xl md:text-4xl text-slate-700 mb-6 leading-tight bungee-inline-regular">
                    {activeTab.title}
                  </h3>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                    {activeTab.description}
                  </p>

                  <ul className="space-y-4">
                    {activeTab.points.map((point, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 min-w-[20px]">
                            <Check className="text-blue-600" size={20} strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 font-medium text-base">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-blue-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <Sparkles size={16} />
                      <span>AI-Powered Strategy</span>
                    </div>
                    <button className="group flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 transition-colors">
                        <span>Explore Strategy</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
