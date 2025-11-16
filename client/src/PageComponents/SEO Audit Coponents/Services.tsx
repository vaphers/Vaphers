'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, TrendingUp } from 'lucide-react'

interface Service {
  id: number
  number: string
  title: string
  description: string | React.ReactNode
  points: Array<string | React.ReactNode>
  image: string
  color: string
}

const AuditServicesAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Ecommerce SEO Audit Service',
      description: (
        <>
          Comprehensive analysis of your online store's search performance using proven{' '}
          <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            ecommerce SEO strategies
          </a>
          , identifying critical issues affecting product visibility and conversions. We evaluate product page optimization, category structure,{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            technical SEO
          </a>
          {' '}crawlability, schema markup implementation, and checkout flow barriers. Whether you run a{' '}
          <a href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 underline hover:text-blue-700 font-medium">
            Shopify store
          </a>
          {' '}or{' '}
          <a href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 underline hover:text-blue-700 font-medium">
            WooCommerce platform
          </a>
          , get a detailed roadmap with prioritized fixes to increase organic traffic and sales.
        </>
      ),
      points: [
        'Product page SEO analysis including titles, descriptions, and image optimization',
        'Category architecture and internal linking structure evaluation',
        'Technical audit covering site speed, mobile responsiveness, and Core Web Vitals',
        'Schema markup validation for products, reviews, pricing, and availability'
      ],
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      number: '02',
      title: 'Technical SEO Audit Service',
      description: (
        <>
          Deep-dive analysis uncovering{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            technical SEO issues
          </a>
          {' '}that prevent search engines from properly crawling, indexing, and ranking your website. We assess server response times, crawl budget optimization, XML sitemap structure, robots.txt configuration, redirect chains, broken links, duplicate content, and canonicalization issues. Our comprehensive{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            technical optimization
          </a>
          {' '}audit delivers actionable fixes that improve indexation and rankings across all platforms.
        </>
      ),
      points: [
        'Core Web Vitals assessment (LCP, FID, CLS) with optimization recommendations',
        'Crawl error identification and indexation issue resolution strategies',
        'Mobile-first indexing compliance and responsive design evaluation',
        <>
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            Structured data
          </a>
          {' '}implementation audit and rich snippet opportunities
        </>
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      number: '03',
      title: 'On-Page SEO Audit Service',
      description: (
        <>
          Detailed evaluation of your content quality, keyword targeting, and{' '}
          <a href="https://www.vaphers.com/seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            on-page SEO strategies
          </a>
          . We analyze meta tags, header structure, keyword density, content depth, internal linking patterns, and user engagement metrics. Identify content gaps, cannibalization issues, and optimization opportunities for{' '}
          <a href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            AI optimization
          </a>
          {' '}and{' '}
          <a href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            local search optimization
          </a>
          {' '}that increase relevance and authority for target search queries.
        </>
      ),
      points: [
        'Meta title and description optimization across all pages',
        'Header tag structure (H1-H6) and keyword placement analysis',
        'Content quality assessment including depth, readability, and topical authority',
        'Internal linking strategy review and anchor text optimization'
      ],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 4,
      number: '04',
      title: 'Competitor SEO Audit Service',
      description: (
        <>
          Strategic analysis of your top-ranking competitors as part of a comprehensive{' '}
          <a href="https://www.vaphers.com/seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            competitive SEO strategy
          </a>
          {' '}to identify gaps and uncover opportunities to outrank them. We benchmark keyword rankings, backlink profiles, content strategies, technical implementations, and on-page optimizations. Whether analyzing{' '}
          <a href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            local competitors
          </a>
          {' '}or{' '}
          <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            ecommerce competitors
          </a>
          , receive competitive intelligence and actionable insights to surpass rival websites in search results.
        </>
      ),
      points: [
        'Keyword gap analysis revealing high-value terms competitors rank for',
        'Backlink profile comparison and link-building opportunity identification',
        'Content strategy assessment including topics, depth, and format analysis',
        'Technical and on-page SEO benchmarking against top 3 competitors'
      ],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-violet-600'
    },
  ]

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-6">
          <div>
            <p className="text-blue-600 text-sm sm:text-base font-semibold mb-2 uppercase tracking-wider">
              SERVICES .
            </p>
            <h4 className="text-gray-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight bungee-inline-regular">
              Explore Our
              <br />
              <span className="bg-blue-600 bg-clip-text text-transparent">
                SEO AUDIT SERVICES
              </span>
            </h4>
          </div>
          {/* button */}
          <div className="flex justify-center sm:justify-start">
            <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <span className="mr-2 sm:mr-3">Get Your Free Audit</span>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Accordion Items */}
        <div>
          {services.map((service, index) => (
            <div key={service.id} className="relative">
              {index > 0 && expandedIndex !== index && expandedIndex !== index - 1 && (
                <div className="border-b border-gray-300"></div>
              )}

              <motion.div
                className={`${
                  expandedIndex === index
                    ? 'bg-white shadow-xl rounded-2xl sm:rounded-3xl border border-gray-200 my-6'
                    : ''
                } overflow-hidden transition-all duration-300`}
                initial={false}
              >
                {/* Head */}
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                    <span className="text-blue-600 text-xl sm:text-2xl lg:text-3xl font-bold">
                      {service.number}
                    </span>
                    <h3 className="text-blue-600 text-base sm:text-lg lg:text-xl font-bold uppercase text-left">
                      {service.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </motion.div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence initial={false}>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 border-t border-gray-200">
                        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center pt-6 sm:pt-8">
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="space-y-4 sm:space-y-6"
                          >
                            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                              {service.description}
                            </p>
                            <ul className="space-y-2 sm:space-y-3">
                              {service.points.map((point, idx) => (
                                <li key={idx} className="text-gray-600 text-sm sm:text-base flex items-start">
                                  <span className="text-blue-600 mr-2 font-bold">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>

                          {/* Image */}
                          <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video lg:aspect-auto lg:h-80 shadow-lg"
                          >
                            <Image
                              src={service.image}
                              alt={`${service.title} - Professional SEO audit services`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-tr ${service.color} opacity-10`}
                            ></div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AuditServicesAccordion
