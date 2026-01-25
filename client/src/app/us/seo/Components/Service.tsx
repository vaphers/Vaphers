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
    title: 'Wanna Be Famous in the Neighborhood',
    description: 'Dominate your local market by ensuring your business appears first when nearby customers search for your services. We optimize your presence to drive foot traffic and local calls.',
    points: [
      'Google Business Profile (GBP) optimization for "Near Me" searches.',
      'Hyper-local citation building and NAP consistency.',
      'Review management and local reputation strategy.',
    ],
  },
  {
    id: 'ai',
    label: 'AI SEO',
    icon: Bot,
    title: 'Win the Answer Engine (SGE)',
    description: 'Secure your place in the future of search. We optimize your content to be the direct answer provided by AI models like Google\'s Search Generative Experience (SGE) and ChatGPT, building foundational authority.',
    points: [
      'Optimize content for Large Language Models (LLMs) and answer snapshots.',
      'Conversational keyword targeting for voice and AI search.',
      'Entity-based authority building to become a trusted source.',
    ],
  },
  {
    id: 'b2b',
    label: 'B2B SEO',
    icon: Building2,
    title: 'High-Ticket Lead Generation',
    description: 'Attract high-value B2B buyers with a strategy focused on technical excellence and authoritative content. We target decision-makers throughout long sales cycles to generate qualified leads.',
    points: [
      'Bottom-of-funnel content targeting high-value commercial intent.',
      'Account-Based Marketing (ABM) aligned SEO strategies.',
      'Technical whitepapers and case study optimization.',
    ],
  },
  {
    id: 'saas',
    label: 'SaaS SEO',
    icon: LayoutGrid,
    title: 'Scale MQLs & ARR',
    description: 'Scale your Monthly Recurring Revenue (MRR) by capturing high-intent users actively searching for software solutions. We focus on product-led growth strategies that turn searchers into trial users.',
    points: [
      'Competitor alternative & comparison pages ("Vs" pages).',
      'Programmatic SEO to capture long-tail feature queries.',
      'Product-led content strategies that drive sign-ups.',
    ],
  },
  {
    id: 'ecommerce',
    label: 'Ecommerce SEO',
    icon: ShoppingCart,
    title: 'Turn Traffic Into Revenue',
    description: 'Transform browsers into buyers. Our ecommerce strategy optimizes your entire site structure, from category pages to product details, to capture transactional queries and maximize revenue.',
    points: [
      'Advanced Product Schema markup for rich snippets.',
      'Category page architecture and faceted navigation optimization.',
      'Conversion Rate Optimization (CRO) integrated with SEO.',
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
            AI Answers Customers. <br/>
            <span className="text-blue-300">We Make You The Answer.</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl">
            Unified workflows across visibility, content, and technical performance. 
            Stop using fragmented tools, unify your entire process from insight to impact.
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
