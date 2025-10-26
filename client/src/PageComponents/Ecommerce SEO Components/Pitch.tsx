'use client'

import React, { useState, useEffect } from 'react'
import { ShoppingCart, Search, BarChart3, Sparkles, TrendingUp, LucideProps } from 'lucide-react'

type TabId = 'product' | 'technical' | 'content' | 'conversion'

interface TabItem {
  id: TabId
  icon: React.ComponentType<LucideProps>
  title: string
  description: string
}

const tabContents: TabItem[] = [
  {
    id: 'product',
    icon: ShoppingCart,
    title: 'Product Page Optimization',
    description:
      'We optimize your product pages with unique descriptions, schema markup, and keyword-rich titles that convert browsers into buyers. Our strategies improve visibility in Google Shopping, product carousels, and search results to drive qualified traffic directly to your store.',
  },
  {
    id: 'technical',
    icon: Search,
    title: 'Technical SEO for Ecommerce',
    description:
      'Fast-loading pages, mobile optimization, and clean site architecture are critical for ecommerce success. We implement structured data, fix crawl errors, optimize site speed, and ensure seamless navigation so search engines can index your entire catalog efficiently.',
  },
  {
    id: 'content',
    icon: BarChart3,
    title: 'Category & Blog Content Strategy',
    description:
      'Our content strategies target high-intent keywords through optimized category pages and SEO-driven blog articles. We create content that educates, engages, and ranks—turning informational searches into product discoveries and conversions.',
  },
  {
    id: 'conversion',
    icon: Sparkles,
    title: 'Conversion-Focused SEO',
    description:
      'SEO isn&apos;t just about traffic—it&apos;s about revenue. We optimize for buying intent keywords, enhance internal linking, streamline checkout flows, and use data-driven insights to increase your average order value and customer lifetime value.',
  },
]

const EcommercePitch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('product')

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

  const getTabButtonClass = (tabId: TabId): string => {
    const isActive = activeTab === tabId
    
    if (isActive) {
      switch (tabId) {
        case 'product':
          return 'bg-blue-600 shadow-lg shadow-blue-200 ring-4 ring-blue-100'
        case 'technical':
          return 'bg-teal-600 shadow-lg shadow-teal-200 ring-4 ring-teal-100'
        case 'content':
          return 'bg-green-600 shadow-lg shadow-green-200 ring-4 ring-green-100'
        case 'conversion':
          return 'bg-purple-600 shadow-lg shadow-purple-200 ring-4 ring-purple-100'
      }
    } else {
      switch (tabId) {
        case 'product':
          return 'bg-blue-100 hover:bg-blue-200'
        case 'technical':
          return 'bg-teal-100 hover:bg-teal-200'
        case 'content':
          return 'bg-green-100 hover:bg-green-200'
        case 'conversion':
          return 'bg-purple-100 hover:bg-purple-200'
      }
    }
  }

  const getIconClass = (tabId: TabId): string => {
    const isActive = activeTab === tabId
    
    if (isActive) {
      return 'text-white'
    } else {
      switch (tabId) {
        case 'product':
          return 'text-blue-600'
        case 'technical':
          return 'text-teal-600'
        case 'content':
          return 'text-green-600'
        case 'conversion':
          return 'text-purple-600'
      }
    }
  }

  return (
    <div className="pb-8 lg:pb-0 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-3xl lg:text-6xl font-sans text-gray-700 mb-4 bungee-inline-regular">
            The Best Ecommerce SEO Agency for <br />{' '}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Online Store Growth
            </span>
          </h1>
          <p className="text-base md:text-2xl text-blue-600 font-semibold">
            Helping Ecommerce Brands Rank Higher and Sell More
          </p>
        </div>

        {/* Platform Growth Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {/* Shopify Card */}
          <div className="group relative rounded-[2rem] p-5 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#96bf48]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 pb-5">
              <span className="text-[6rem] font-extrabold text-gray-400 select-none leading-none opacity-20">S</span>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-[#96bf48] to-[#5e8e3e] bg-clip-text text-transparent">
                  +142%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                Shopify Store Traffic<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>

          {/* WooCommerce Card */}
          <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#96588a]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <span className="text-[6rem] font-extrabold text-gray-400 select-none leading-none opacity-20">W</span>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-[#96588a] to-[#7a4472] bg-clip-text text-transparent">
                  +128%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                WooCommerce Sales<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>

          {/* OpenCart Card */}
          <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-[#23a8e0]">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <span className="text-[6rem] font-extrabold text-gray-400 select-none leading-none opacity-20">O</span>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-[#23a8e0] to-[#1a7fb0] bg-clip-text text-transparent">
                  +115%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                OpenCart Revenue<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>

          {/* Squarespace Card */}
          <div className="group relative rounded-[2rem] p-4 text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-black">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
              <span className="text-[6rem] font-extrabold text-gray-400 select-none leading-none opacity-20">SS</span>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                  +109%
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                Squarespace Growth<br /><span className="text-xs opacity-80">(Q1-Q2 2025)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content and changing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              The ecommerce landscape in 2025 demands more than just a beautiful storefront. With global ecommerce sales projected to reach $6.4 trillion, competition is fierce. To stand out, your store needs strategic SEO that goes beyond basic optimization—targeting high-intent buyers, optimizing product feeds, and building authority across search engines.
            </p>
            <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Our ecommerce SEO specialists understand the unique challenges of online retail. Whether you&apos;re on Shopify, WooCommerce, OpenCart, or Squarespace, we implement platform-specific strategies including schema markup, site speed optimization, and conversion-focused content that turn search traffic into paying customers and repeat buyers.
            </p>
            <div className="mt-4 pb-4 flex justify-center sm:justify-start">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-3">Get a Free SEO Audit</span>
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Changing cards */}
          <div className="space-y-8">
            {/* Icons Row */}
            <div className="flex justify-center space-x-4">
              {tabContents.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${getTabButtonClass(tab.id)}`}
                  >
                    <IconComponent className={`w-7 h-7 ${getIconClass(tab.id)}`} />
                  </button>
                )
              })}
            </div>

            {/* Changing card content */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg min-h-[280px]">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 via-blue-500 to-green-500 rounded-2xl p-[3px] pointer-events-none">
                <div className="bg-white rounded-2xl h-full w-full"></div>
              </div>
              <div className="relative z-10 opacity-0 animate-fade-in" key={activeTab}>
                <div className="flex items-center space-x-3 mb-6">
                  {React.createElement(activeContent.icon, { className: 'w-8 h-8 text-blue-600' })}
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

export default EcommercePitch
