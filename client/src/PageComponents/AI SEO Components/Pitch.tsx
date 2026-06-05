// 'use client'

// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { Eye, Search, RotateCcw, Rocket, TrendingUp } from 'lucide-react'

// type TabId = 'visibility' | 'search' | 'refresh' | 'growth'

// type TabItem = {
//   id: TabId
//   icon: React.ReactElement<{ className?: string }>
//   title: string
//   description: string
// }

// const tabContents: TabItem[] = [
//   {
//     id: 'visibility',
//     icon: <Eye className="w-8 h-8 text-blue-600" />,
//     title: 'AI Visibility Optimization',
//     description:
//       "AI-powered search engines prioritize conversational queries and zero-click answers over traditional results. Our AI SEO experts optimize your content for natural language processing, semantic understanding, and citation frequency to ensure your brand appears in AI-generated responses across ChatGPT, Gemini, and Perplexity.",
//   },
//   {
//     id: 'search',
//     icon: <Search className="w-8 h-8 text-teal-600" />,
//     title: 'Generative Engine Optimization',
//     description:
//       'Dominate generative AI platforms with our advanced GEO strategies. We structure your content for machine scannability, implement schema markup for AI comprehension, and create comparison-rich content that AI systems prefer to cite. Get featured in AI answers, not just search results.',
//   },
//   {
//     id: 'refresh',
//     icon: <RotateCcw className="w-8 h-8 text-green-600" />,
//     title: 'AI-Powered Content Strategy',
//     description:
//       'Leverage cutting-edge AI tools to transform your content strategy. We automate keyword research, generate hyper-personalized content at scale, and continuously optimize for changing AI algorithms. Our data-driven approach identifies trends, analyzes competitor strategies, and delivers measurable improvements in engagement and conversions.',
//   },
//   {
//     id: 'growth',
//     icon: <Rocket className="w-8 h-8 text-purple-600" />,
//     title: 'AI Authority Building',
//     description:
//       'Build AI-perceived authority through strategic earned media dominance and source credibility optimization. We establish your brand as an authoritative resource that AI engines trust and cite. Our comprehensive approach includes structured data implementation, conversational content optimization, and real-time performance tracking across all major AI platforms.',
//   },
// ]

// const AiSection: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<TabId>('visibility')

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTab((prevTab) => {
//         const currIdx = tabContents.findIndex((tab) => tab.id === prevTab)
//         const nextIdx = (currIdx + 1) % tabContents.length
//         return tabContents[nextIdx].id
//       })
//     }, 4000)
//     return () => clearInterval(interval)
//   }, [])

//   const activeContent = tabContents.find((tab) => tab.id === activeTab) ?? tabContents[0]

//   useEffect(() => {
//     const style = document.createElement('style')
//     style.textContent = `
//       @keyframes fade-in {
//         from { opacity: 0; transform: translateY(10px); }
//         to { opacity: 1; transform: translateY(0); }
//       }
//       .animate-fade-in {
//         animation: fade-in 0.5s ease-out forwards;
//       }
//     `
//     document.head.appendChild(style)
//     return () => {
//       if (style.parentNode) style.parentNode.removeChild(style)
//     }
//   }, [])

//   return (
//     <div className="min-h-screen w-full bg-white relative">
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           background: "#ffffff",
//           backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
//           backgroundSize: "20px 20px",
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 pb-8 px-6 lg:mb-3">
//         <div className="max-w-7xl mx-auto">
//           {/* Heading */}
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-3xl lg:text-6xl font-sans text-gray-700 mb-4 bungee-inline-regular">
//               The Best AI SEO Agency for {' '}<br/>
//               <span className="bg-blue-600 bg-clip-text text-transparent ">
//                    Ai Visibility
//               </span>
//             </h2>
//             <p className="text-base md:text-2xl text-blue-600 font-semibold">
//               Helping Businesses Dominate Large Language Model AI Search
//             </p>
//           </div>

//           {/* Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
//             <div className="group relative rounded-[2rem] p-5 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-pink-600 bg-white">
//               <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 pb-5">
//                 <span className="text-[8rem] font-extrabold text-gray-400 select-none leading-none opacity-20">AI</span>
//               </div>
//               <div className="relative z-10 text-center">
//                 <div className="text-3xl md:text-4xl font-extrabold mb-2">
//                   <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
//                     +876%
//                   </span>
//                 </div>
//                 <div className="text-sm font-semibold text-gray-600 leading-tight">
//                   AI Referral Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#70a597] bg-white">
//               <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
//                 <Image
//                   src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png"
//                   alt="ChatGPT bg"
//                   fill
//                   className="object-contain grayscale opacity-10"
//                   style={{ filter: 'grayscale(100%)' }}
//                 />
//               </div>
//               <div className="relative z-10 text-center">
//                 <div className="text-3xl md:text-4xl font-extrabold mb-2">
//                   <span className="bg-gradient-to-r from-[#70a597] to-[#70a597] bg-clip-text text-transparent">
//                     +108%
//                   </span>
//                 </div>
//                 <div className="text-sm font-semibold text-gray-600 leading-tight">
//                   ChatGPT Search Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#4281f4] bg-white">
//               <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
//                 <Image
//                   src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/gemini-logo_yes1g8.png"
//                   alt="Gemini bg"
//                   fill
//                   className="object-contain opacity-25"
//                   style={{ filter: 'grayscale(100%)' }}
//                 />
//               </div>
//               <div className="relative z-10 text-center">
//                 <div className="text-3xl md:text-4xl font-extrabold mb-2">
//                   <span className="bg-gradient-to-r from-[#4281f4] to-[#4281f4] bg-clip-text text-transparent">
//                     +102%
//                   </span>
//                 </div>
//                 <div className="text-sm font-semibold text-gray-600 leading-tight">
//                   Gemini Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#21b2c7] bg-white">
//               <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
//                 <Image
//                   src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047484/perplexity-logo_zqmnzf.png"
//                   alt="Perplexity bg"
//                   fill
//                   className="object-contain opacity-25"
//                   style={{ filter: 'grayscale(100%)' }}
//                 />
//               </div>
//               <div className="relative z-10 text-center">
//                 <div className="text-3xl md:text-4xl font-extrabold mb-2">
//                   <span className="bg-gradient-to-r from-[#21b2c7] to-[#21b2c7] bg-clip-text text-transparent">
//                     +101%
//                   </span>
//                 </div>
//                 <div className="text-sm font-semibold text-gray-600 leading-tight">
//                   Perplexity Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* content and cards */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             <div className="space-y-6">
//               <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 Traditional <a className='text-blue-600 underline hover:text-blue-700 transition-colors' href="https://www.vaphers.com/seo-services">search engine optimization</a> alone won't keep your business visible in 2025. With AI-powered platforms like ChatGPT, Google Gemini, and Perplexity delivering instant, zero-click answers, your content must be structured for AI comprehension and citation. Our AI SEO strategies ensure your brand dominates both traditional search results and AI-generated responses.
//               </p>
//               <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
//                 Our <a className='text-blue-600 underline hover:text-blue-700 transition-colors' href="https://www.vaphers.com/seo-services">comprehensive SEO services</a> combine advanced Generative Engine Optimization (GEO), schema markup implementation, and content hub architecture to maximize visibility across all major AI platforms. From conversational query optimization to citation-worthy content creation, we employ data-driven <a className='text-blue-600 underline hover:text-blue-700 transition-colors' href="https://www.vaphers.com/seo-services/technical-seo-services">technical SEO strategies</a> that position your business as the authoritative source AI engines trust and recommend.
//               </p>
//               <div className="mt-4 pb-4 flex justify-center sm:justify-start">
//                 <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
//                   <span className="mr-3">Get a Free Consultation</span>
//                   <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </div>
//               </div>
//             </div>

//             {/* Changing cards */}
//             <div className="space-y-8">
//               {/* Icons Row */}
//               <div className="flex justify-center space-x-4">
//                 {tabContents.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
//                       activeTab === tab.id
//                         ? `${tab.id === 'visibility' ? 'bg-blue-600 shadow-lg shadow-blue-200 ring-4 ring-blue-100'
//                         : tab.id === 'search' ? 'bg-teal-600 shadow-lg shadow-teal-200 ring-4 ring-teal-100'
//                         : tab.id === 'refresh' ? 'bg-green-600 shadow-lg shadow-green-200 ring-4 ring-green-100'
//                         : 'bg-purple-600 shadow-lg shadow-purple-200 ring-4 ring-purple-100'}`
//                         : `${tab.id === 'visibility' ? 'bg-blue-100 hover:bg-blue-200'
//                         : tab.id === 'search' ? 'bg-teal-100 hover:bg-teal-200'
//                         : tab.id === 'refresh' ? 'bg-green-100 hover:bg-green-200'
//                         : 'bg-purple-100 hover:bg-purple-200'}`
//                     }`}
//                   >
//                     {React.cloneElement(tab.icon, {
//                       className: `w-7 h-7 ${
//                         activeTab === tab.id
//                           ? 'text-white'
//                           : tab.id === 'visibility'
//                           ? 'text-blue-600'
//                           : tab.id === 'search'
//                           ? 'text-teal-600'
//                           : tab.id === 'refresh'
//                           ? 'text-green-600'
//                           : 'text-purple-600'
//                       }`
//                     })}
//                   </button>
//                 ))}
//               </div>

//               {/* Changing card content */}
//               <div className="relative bg-white rounded-2xl p-8 shadow-lg min-h-[280px]">
//                 {/* Gradient Border */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 via-blue-500 to-green-500 rounded-2xl p-[3px] pointer-events-none">
//                   <div className="bg-white rounded-2xl h-full w-full"></div>
//                 </div>
//                 <div className="relative z-10 opacity-0 animate-fade-in" key={activeTab}>
//                   <div className="flex items-center space-x-3 mb-6">
//                     {activeContent.icon}
//                     <h3 className="text-2xl font-bold text-gray-800">{activeContent.title}</h3>
//                   </div>
//                   <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">{activeContent.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AiSection











'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { Eye, Search, RotateCcw, Rocket, TrendingUp } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────

type TabId = 'visibility' | 'search' | 'refresh' | 'growth'

type TabItem = {
  id: TabId
  icon: React.ReactElement<{ className?: string }>
  title: string
  description: string
  accent: string        // Tailwind bg for active state
  ring: string          // Tailwind ring color
  iconActive: string    // icon class when active
  iconInactive: string  // icon class when inactive
  pillBg: string        // inactive pill bg
}

// ─── Data ──────────────────────────────────────────────────────────────────

const tabContents: TabItem[] = [
  {
    id: 'visibility',
    icon: <Eye />,
    title: 'AI Visibility Optimization',
    description:
      "AI-powered search engines prioritize conversational queries and zero-click answers over traditional results. Our AI SEO experts optimize your content for natural language processing, semantic understanding, and citation frequency to ensure your brand appears in AI-generated responses across ChatGPT, Gemini, and Perplexity.",
    accent: 'bg-blue-600',
    ring: 'ring-blue-200',
    iconActive: 'text-white',
    iconInactive: 'text-blue-600',
    pillBg: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    id: 'search',
    icon: <Search />,
    title: 'Generative Engine Optimization',
    description:
      'Dominate generative AI platforms with our advanced GEO strategies. We structure your content for machine scannability, implement schema markup for AI comprehension, and create comparison-rich content that AI systems prefer to cite. Get featured in AI answers, not just search results.',
    accent: 'bg-teal-600',
    ring: 'ring-teal-200',
    iconActive: 'text-white',
    iconInactive: 'text-teal-600',
    pillBg: 'bg-teal-50 hover:bg-teal-100',
  },
  {
    id: 'refresh',
    icon: <RotateCcw />,
    title: 'AI-Powered Content Strategy',
    description:
      'Leverage cutting-edge AI tools to transform your content strategy. We automate keyword research, generate hyper-personalized content at scale, and continuously optimize for changing AI algorithms. Our data-driven approach identifies trends, analyzes competitor strategies, and delivers measurable improvements in engagement and conversions.',
    accent: 'bg-green-600',
    ring: 'ring-green-200',
    iconActive: 'text-white',
    iconInactive: 'text-green-600',
    pillBg: 'bg-green-50 hover:bg-green-100',
  },
  {
    id: 'growth',
    icon: <Rocket />,
    title: 'AI Authority Building',
    description:
      'Build AI-perceived authority through strategic earned media dominance and source credibility optimization. We establish your brand as an authoritative resource that AI engines trust and cite. Our comprehensive approach includes structured data implementation, conversational content optimization, and real-time performance tracking across all major AI platforms.',
    accent: 'bg-purple-600',
    ring: 'ring-purple-200',
    iconActive: 'text-white',
    iconInactive: 'text-purple-600',
    pillBg: 'bg-purple-50 hover:bg-purple-100',
  },
]

const statCards = [
  {
    value: '+876%',
    label: 'AI Referral Traffic',
    sub: 'Q1–Q2 2025',
    border: 'border-pink-500',
    gradient: 'from-orange-400 via-pink-400 to-purple-500',
    logo: null,
    bgText: 'AI',
  },
  {
    value: '+108%',
    label: 'ChatGPT Search Traffic',
    sub: 'Q1–Q2 2025',
    border: 'border-[#70a597]',
    gradient: 'from-[#70a597] to-[#3d8878]',
    logo: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png',
    logoAlt: 'ChatGPT',
    bgText: null,
  },
  {
    value: '+102%',
    label: 'Gemini Traffic',
    sub: 'Q1–Q2 2025',
    border: 'border-[#4281f4]',
    gradient: 'from-[#4281f4] to-[#1a5fd4]',
    logo: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/gemini-logo_yes1g8.png',
    logoAlt: 'Gemini',
    bgText: null,
  },
  {
    value: '+101%',
    label: 'Perplexity Traffic',
    sub: 'Q1–Q2 2025',
    border: 'border-[#21b2c7]',
    gradient: 'from-[#21b2c7] to-[#0e8fa2]',
    logo: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047484/perplexity-logo_zqmnzf.png',
    logoAlt: 'Perplexity',
    bgText: null,
  },
]

// ─── Animated counter ──────────────────────────────────────────────────────

function AnimatedStat({ value, inView }: { value: string; inView: boolean }) {
  const numericMatch = value.match(/\d+/)
  const prefix = value.startsWith('+') ? '+' : ''
  const suffix = value.endsWith('%') ? '%' : ''
  const target = numericMatch ? parseInt(numericMatch[0]) : 0

  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionVal.set(target)
  }, [inView, target, motionVal])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  )
}

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({
  card,
  index,
  inView,
}: {
  card: typeof statCards[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl p-5 bg-white shadow-md border ${card.border} overflow-hidden`}
    >
      {/* Background logo or text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {card.logo ? (
          <Image
            src={card.logo}
            alt={card.logoAlt ?? ''}
            fill
            className="object-contain opacity-[0.08] grayscale"
          />
        ) : (
          <span className="text-[5rem] font-black text-gray-300 select-none opacity-20 leading-none">
            {card.bgText}
          </span>
        )}
      </div>

      <div className="relative z-10 text-center">
        <div
          className={`text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
        >
          <AnimatedStat value={card.value} inView={inView} />
        </div>
        <p className="text-sm font-semibold text-gray-700 leading-tight">
          {card.label}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
      </div>
    </motion.div>
  )
}

// ─── Progress Bar ──────────────────────────────────────────────────────────

function ProgressBar({
  active,
  accent,
  duration,
}: {
  active: boolean
  accent: string
  duration: number
}) {
  return (
    <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
      <AnimatePresence>
        {active && (
          <motion.div
            className={`h-full ${accent} rounded-full`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ width: '0%', transition: { duration: 0.15 } }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

const INTERVAL_MS = 4500

const AiSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('visibility')
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActiveTab((prev) => {
        const idx = tabContents.findIndex((t) => t.id === prev)
        return tabContents[(idx + 1) % tabContents.length].id
      })
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const activeContent = tabContents.find((t) => t.id === activeTab)!

  // Fade-up variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-20 px-6"
    >
      {/* Dot-grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Soft top gradient wash */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-48 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(219,234,254,0.35) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: {} }}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-5 bungee-inline-regular leading-tight"
          >
            The Best AI SEO Agency for{' '}
            <br className="hidden sm:block" />
            <span className="text-blue-600">AI Visibility</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-base md:text-xl text-blue-600 font-semibold tracking-wide"
          >
            Helping Businesses Dominate Large Language Model AI Search
          </motion.p>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {statCards.map((card, i) => (
            <StatCard key={i} card={card} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Main Split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Left — copy */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: {} }}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Traditional{' '}
              <Link
                href="https://www.vaphers.com/seo-services"
                className="text-blue-600 underline underline-offset-2 hover:text-blue-700 transition-colors"
              >
                search engine optimization
              </Link>{' '}
              alone won't keep your business visible in 2025. With AI-powered platforms
              like ChatGPT, Google Gemini, and Perplexity delivering instant, zero-click
              answers, your content must be structured for AI comprehension and citation.
              Our AI SEO strategies ensure your brand dominates both traditional search
              results and AI-generated responses.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Our{' '}
              <Link
                href="https://www.vaphers.com/seo-services"
                className="text-blue-600 underline underline-offset-2 hover:text-blue-700 transition-colors"
              >
                comprehensive SEO services
              </Link>{' '}
              combine advanced Generative Engine Optimization (GEO), schema markup
              implementation, and content hub architecture to maximize visibility across
              all major AI platforms. From conversational query optimization to
              citation-worthy content creation, we employ data-driven{' '}
              <Link
                href="https://www.vaphers.com/seo-services/technical-seo-services"
                className="text-blue-600 underline underline-offset-2 hover:text-blue-700 transition-colors"
              >
                technical SEO strategies
              </Link>{' '}
              that position your business as the authoritative source AI engines trust.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="pt-2">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-shadow duration-300 cursor-pointer"
              >
                <span>Get a Free Consultation</span>
                <TrendingUp className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — tab switcher */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
            className="space-y-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            {/* Tab selector pills */}
            <div className="grid grid-cols-2 gap-3">
              {tabContents.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 text-left overflow-hidden
                      ${isActive
                        ? `${tab.accent} text-white shadow-md ring-4 ${tab.ring}`
                        : `${tab.pillBg} text-gray-700`
                      }`}
                  >
                    <span className="shrink-0">
                      {React.cloneElement(tab.icon, {
                        className: `w-5 h-5 ${isActive ? tab.iconActive : tab.iconInactive}`,
                      })}
                    </span>
                    <span className="leading-tight">{tab.title.split(' ').slice(0, 2).join(' ')}</span>
                    {/* Progress bar under active tab */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <ProgressBar
                          active={isActive}
                          accent="bg-white/40"
                          duration={INTERVAL_MS}
                        />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Content card */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
              {/* Rainbow gradient border via padding trick */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: '2px',
                  background: 'linear-gradient(135deg, #f97316, #ec4899, #3b82f6, #22c55e)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: 'easeInOut' }}
                  className="p-8"
                >
                  {/* Icon + title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${activeContent.accent}`}
                    >
                      {React.cloneElement(activeContent.icon, {
                        className: 'w-6 h-6 text-white',
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 leading-snug">
                        {activeContent.title}
                      </h3>
                      <div className={`mt-1 inline-block h-1 w-10 rounded-full ${activeContent.accent}`} />
                    </div>
                  </div>

                  <p className="text-gray-600 text-base leading-relaxed">
                    {activeContent.description}
                  </p>

                  {/* Step dots */}
                  <div className="flex gap-2 mt-6">
                    {tabContents.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTab(t.id)}
                        aria-label={`Switch to ${t.title}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          t.id === activeTab ? `w-6 ${activeContent.accent}` : 'w-1.5 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default AiSection