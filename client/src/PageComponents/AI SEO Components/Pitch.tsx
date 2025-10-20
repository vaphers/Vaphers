'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Eye, Search, RotateCcw, Rocket, TrendingUp } from 'lucide-react'

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
    title: 'AI Mode Visibility',
    description:
      "Google AI Overviews and ChatGPT Search are transforming how customers discover businesses. We optimize your content for conversational queries, featured snippets, and zero-click answers to ensure AI platforms recognize your topical authority and recommend your business first.",
  },
  {
    id: 'search',
    icon: <Search className="w-8 h-8 text-teal-600" />,
    title: 'AI Search Optimization',
    description:
      'Our AI-first SEO strategies focus on semantic understanding and natural language processing. We structure your content to answer specific queries, optimize for entity-based search, and ensure your brand appears in AI-generated summaries across ChatGPT, Perplexity, and Gemini.',
  },
  {
    id: 'refresh',
    icon: <RotateCcw className="w-8 h-8 text-green-600" />,
    title: 'AI Content Refresh',
    description:
      'AI models prioritize fresh, authoritative content. Our intelligent refresh strategies update your existing pages with current data, enhanced semantic markup, and conversational patterns that AI engines prefer, keeping you ahead of competitors in AI search results.',
  },
  {
    id: 'growth',
    icon: <Rocket className="w-8 h-8 text-purple-600" />,
    title: 'AI Growth Acceleration',
    description:
      'Scale your online presence with our comprehensive AI-driven growth framework. We leverage machine learning insights to identify high-intent queries, optimize conversion paths, and capture traffic from emerging AI search platforms before your competitors.',
  },
]

const AiSection: React.FC = () => {
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
    <div className="pb-8 lg:pb-0 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-3xl lg:text-6xl font-sans text-gray-700 mb-4 bungee-inline-regular">
            The Best AI SEO Agency for <br/>{' '}
            <span className="bg-blue-600 bg-clip-text text-transparent ">
                 AI Visibility
            </span>
          </h1>
          <p className="text-base md:text-2xl text-blue-600 font-semibold">
            Helping Businesses Dominate Large Language Model AI Search
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="group relative rounded-[2rem] p-5 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-pink-600">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 pb-5">
              <span className="text-[8rem] font-extrabold text-gray-400 select-none leading-none opacity-20">AI</span>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                  +876%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                AI Referral Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>
          
          <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#70a597]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <Image
                src="/chat-gpt-logo.png"
                alt="ChatGPT bg"
                fill
                className="object-contain grayscale opacity-10"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-[#70a597] to-[#70a597] bg-clip-text text-transparent">
                  +108%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                ChatGPT Search Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>
          
          <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#4281f4]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <Image
                src="/gemini-logo.png"
                alt="Gemini bg"
                fill
                className="object-contain opacity-25"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-[#4281f4] to-[#4281f4] bg-clip-text text-transparent">
                  +102%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                Gemini Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>
          
          <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#21b2c7]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <Image
                src="/perplexity-logo.png"
                alt="Perplexity bg"
                fill
                className="object-contain opacity-25"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-[#21b2c7] to-[#21b2c7] bg-clip-text text-transparent">
                  +101%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                Perplexity Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content and changing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Rapid advances in generative artificial intelligence (AI) models have reshaped
              how content is discovered and consumed. Traditional search engine
              optimization (SEO) is no longer enough to reach those looking for your
              products or services. To stay visible online amid shifting algorithms, you need
              to optimize for AI-first discovery.
            </p>
            <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Our AI SEO specialists understand how large language models like ChatGPT, Gemini, and Perplexity evaluate and recommend content. We implement advanced optimization techniques including schema markup, entity optimization, and conversational content structures that ensure your business appears in AI-generated recommendations when potential customers ask questions about your services.
            </p>
            <div className="mt-4 pb-4 flex justify-center sm:justify-start">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-3">Get a Free Consultation</span>
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 via-blue-500 to-green-500 rounded-2xl p-[3px] pointer-events-none">
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
  )
}

export default AiSection
