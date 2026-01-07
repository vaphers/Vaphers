'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Eye, Search, RotateCcw, Rocket, TrendingUp } from 'lucide-react'
import Link from 'next/link'

type TabId = 'visibility' | 'search' | 'refresh' | 'growth'

type TabItem = {
  id: TabId
  icon: React.ReactElement<{ className?: string }>
  title: string
  description: string
}

const tabContents: TabItem[] = [
  {
    id: 'visibility',
    icon: <Eye className="w-8 h-8 text-blue-600" />,
    title: 'Google AI Overviews Optimization',
    description:
      "Google Gemini powers AI Overviews that appear in 13-47% of search queries. Our Gemini SEO experts optimize your content for multi-step reasoning, featured citations, and structured data comprehension to ensure your brand dominates Google's AI-generated summaries and conversational search results.",
  },
  {
    id: 'search',
    icon: <Search className="w-8 h-8 text-teal-600" />,
    title: 'Gemini Engine Optimization (GEO)',
    description:
      'Master Google Gemini with our specialized GEO strategies. We implement Gemini-preferred schema markup, create topic-clustered content with comprehensive Q&A formats, and optimize for Gemini\'s natural language understanding. Get featured as Google AI Overviews\' trusted source for complex queries.',
  },
  {
    id: 'refresh',
    icon: <RotateCcw className="w-8 h-8 text-green-600" />,
    title: 'Gemini Content Strategy',
    description:
      'Leverage AI-optimized content specifically tuned for Gemini success. We conduct intent-based keyword research, generate conversational long-form content, and continuously optimize based on Gemini\'s real-time ranking signals. Our approach delivers measurable Gemini referral traffic and AI Overview citations.',
  },
  {
    id: 'growth',
    icon: <Rocket className="w-8 h-8 text-purple-600" />,
    title: 'Gemini Authority Building',
    description:
      'Establish your brand as Gemini\'s trusted authority through comprehensive topical depth and source credibility optimization. We create Gemini-preferred content formats including FAQ schemas, step-by-step guides, and expert-authored articles that Google consistently features in AI Overviews across informational queries.',
  },
]

const GeminiSEOPitch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('visibility')

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currIdx = tabContents.findIndex((tab) => tab.id === prevTab)
        const nextIdx = (currIdx + 1) % tabContents.length
        return tabContents[nextIdx].id
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const activeContent = tabContents.find((tab) => tab.id === activeTab) ?? tabContents[0]

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 pb-8 px-6 lg:mb-3">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-3xl lg:text-6xl font-sans text-gray-700 mb-4 bungee-inline-regular">
               Best Google Gemini SEO Agency for {' '}<br/>
              <span className="bg-blue-600 bg-clip-text text-transparent ">
                 AI Overviews Visibility
              </span>
            </h2>
            <p className="text-base md:text-2xl text-blue-400 font-semibold">
              Helping Businesses Dominate Google AI Search & Gemini Citations
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="group relative rounded-[2rem] p-5 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-pink-600 bg-white">
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 pb-5">
                <span className="text-[8rem] font-extrabold text-gray-400 select-none leading-none opacity-20">AI</span>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-extrabold mb-2">
                  <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                    +388%
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600 leading-tight">
                  AI Referral Traffic<br /><span className="text-xs opacity-80">(YoY 2025)</span>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#70a597] bg-white">
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png"
                  alt="ChatGPT bg"
                  fill
                  className="object-contain grayscale opacity-10"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-extrabold mb-2">
                  <span className="bg-gradient-to-r from-[#70a597] to-[#70a597] bg-clip-text text-transparent">
                    +52%
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600 leading-tight">
                  ChatGPT Search Traffic<br /><span className="text-xs opacity-80">(YoY 2025)</span>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#4281f4] bg-white">
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/gemini-logo_yes1g8.png"
                  alt="Gemini bg"
                  fill
                  className="object-contain opacity-25"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-extrabold mb-2">
                  <span className="bg-gradient-to-r from-[#4281f4] to-[#4281f4] bg-clip-text text-transparent">
                    650M
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600 leading-tight">
                  Gemini Monthly Users<br /><span className="text-xs opacity-80">(2025)</span>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#21b2c7] bg-white">
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047484/perplexity-logo_zqmnzf.png"
                  alt="Perplexity bg"
                  fill
                  className="object-contain opacity-25"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
              <div className="relative z-10 text-center">
                <div className="text-3xl md:text-4xl font-extrabold mb-2">
                  <span className="bg-gradient-to-r from-[#21b2c7] to-[#21b2c7] bg-clip-text text-transparent">
                    47%
                  </span>
                </div>
                <div className="text-sm font-semibold text-gray-600 leading-tight">
                  Queries with AI Overviews<br /><span className="text-xs opacity-80">(Mid 2025)</span>
                </div>
              </div>
            </div>
          </div>

          {/* content and cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Traditional search engine optimization won't cut it for Google Gemini dominance. Gemini powers AI Overviews appearing in up to 47% of informational queries, delivering comprehensive summaries that require deep, authoritative content. Our Gemini SEO strategies ensure your brand becomes the go-to source for Google's AI-generated answers.
              </p>
              <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Our comprehensive Gemini SEO combines advanced schema markup, conversational content architecture, and <a className='text-blue-600 underline hover:text-blue-900 transition-colors' href="https://www.vaphers.com/serp-optimization">SERP optimization</a> specific to Google AI Overviews. From natural language query mastery to citation-optimized topic clusters, we position your business as the authoritative source Google Gemini trusts and consistently features in AI Overviews.
              </p>
              <div className="mt-4 pb-4 flex justify-center sm:justify-start">
                <Link href="/contact" passHref>
                <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-3">Get Gemini SEO Audit</span>
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                </Link>
              </div>
            </div>

            {/* Changing cards */}
            <div className="space-y-8">
              {/* Icons Row */}
              <div className="flex justify-center space-x-4">
                {tabContents.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                      activeTab === tab.id
                        ? `${tab.id === 'visibility' ? 'bg-blue-600 shadow-lg shadow-blue-200 ring-4 ring-blue-100'
                        : tab.id === 'search' ? 'bg-teal-600 shadow-lg shadow-teal-200 ring-4 ring-teal-100'
                        : tab.id === 'refresh' ? 'bg-green-600 shadow-lg shadow-green-200 ring-4 ring-green-100'
                        : 'bg-purple-600 shadow-lg shadow-purple-200 ring-4 ring-purple-100'}`
                        : `${tab.id === 'visibility' ? 'bg-blue-100 hover:bg-blue-200'
                        : tab.id === 'search' ? 'bg-teal-100 hover:bg-teal-200'
                        : tab.id === 'refresh' ? 'bg-green-100 hover:bg-green-200'
                        : 'bg-purple-100 hover:bg-purple-200'}`
                    }`}
                  >
                    {React.cloneElement(tab.icon, {
                      className: `w-7 h-7 ${
                        activeTab === tab.id
                          ? 'text-white'
                          : tab.id === 'visibility'
                          ? 'text-blue-600'
                          : tab.id === 'search'
                          ? 'text-teal-600'
                          : tab.id === 'refresh'
                          ? 'text-green-600'
                          : 'text-purple-600'
                      }`
                    })}
                  </button>
                ))}
              </div>

              {/* Changing card content */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg min-h-[280px]">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4281f4] via-blue-500 to-indigo-500 rounded-2xl p-[3px] pointer-events-none">
                  <div className="bg-white rounded-2xl h-full w-full"></div>
                </div>
                <div className="relative z-10 opacity-0 animate-fade-in" key={activeTab}>
                  <div className="flex items-center space-x-3 mb-6">
                    {activeContent.icon}
                    <h3 className="text-2xl font-bold text-gray-800">{activeContent.title}</h3>
                  </div>
                  <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">{activeContent.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeminiSEOPitch
