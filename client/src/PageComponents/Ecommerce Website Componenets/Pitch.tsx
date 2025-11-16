'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, BarChart3, Sparkles, TrendingUp, LucideProps } from 'lucide-react'
import CustomBreadcrumb from '../Global Components/BreadCrumbs'

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
      'We transform product pages into conversion engines with AI-optimized descriptions, advanced schema markup, and buyer-intent keywords. Our data-driven approach enhances visibility across Google Shopping, product carousels, and organic search—turning casual browsers into loyal customers while maximizing your average order value.',
  },
  {
    id: 'technical',
    icon: Search,
    title: 'Technical SEO for Ecommerce',
    description:
      'Lightning-fast page speeds, Core Web Vitals optimization, and mobile-first architecture form the backbone of modern ecommerce success. We implement product schema, fix critical crawl issues, optimize site architecture, and ensure flawless indexing across your entire catalog—helping search engines discover and rank every revenue-generating page.',
  },
  {
    id: 'content',
    icon: BarChart3,
    title: 'Strategic Content Marketing',
    description:
      'We craft conversion-focused content strategies targeting high-commercial-intent keywords through optimized category pages and SEO-rich blog articles. Our content educates your audience, builds topical authority, and captures buyers at every stage of the funnel—from awareness through consideration to final purchase decision.',
  },
  {
    id: 'conversion',
    icon: Sparkles,
    title: 'Revenue-Driven SEO',
    description:
      'Traffic means nothing without sales. We optimize for transactional keywords, enhance user experience through strategic internal linking, streamline checkout flows, and leverage behavioral data to increase conversions. Our focus is simple: turning organic visitors into revenue and maximizing customer lifetime value.',
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
        <div className='flex justify-center mb-5'>
        <CustomBreadcrumb links={[{ href: 'https://www.vaphers.com/website-development-services', label: 'Website Development' }]} currentPage="Ecommerce Development"/>
        </div>
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-6xl font-sans text-gray-700 mb-4 bungee-inline-regular">
            Custom Ecommerce Development for <br />{' '}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              High-Converting Online Stores
            </span>
          </h2>
          <p className="text-base md:text-2xl text-blue-600 font-semibold">
            Fast, Scalable, and SEO-Optimized Ecommerce Websites That Drive Sales
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
              Building a successful online store requires more than just listing products, it demands a strategic{' '}
              <Link 
                href="/website-development-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                ecommerce development approach
              </Link>
              {' '}that combines fast performance, seamless user experience, and conversion focused design. Whether you're launching a new store or scaling an existing one, our team builds custom solutions on platforms like{' '}
              <Link 
                href="/website-development-services/shopify-website-development" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                Shopify
              </Link>
              , WooCommerce, and custom frameworks tailored to your unique business needs.
            </p>
            <p className="text-lg sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Our{' '}
              <Link 
                href="/website-development-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                ecommerce development services
              </Link>
              {' '}include mobile-first design, secure payment gateway integration, inventory management systems, and advanced product filtering. Every store we build is optimized for speed, security, and search visibility with built-in{' '}
              <Link 
                href="/seo-services/ecommerce-seo-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                ecommerce SEO best practices
              </Link>
              {' '}to help you rank higher and convert more visitors into paying customers.
            </p>
            <div className="mt-4 pb-4 flex justify-center sm:justify-start">
              <Link href={"https://www.vaphers.com/contact"}>
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-3">Start Your Ecommerce Project</span>
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              </Link>
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
