'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, TrendingUp } from 'lucide-react'

interface Service {
  id: number
  number: string
  title: string
  description: string
points: Array<string | React.ReactNode>  
  image: string
  color: string
}

const TechnicalServicesAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Website Speed Optimization',
      description: 'Comprehensive site speed analysis and optimization to improve Core Web Vitals, reduce page load times, and enhance user experience. We optimize images, minimize CSS/JavaScript, implement browser caching, enable compression, and configure CDN delivery. Faster websites rank higher, convert better, and provide superior user experiences that keep visitors engaged.',
      points: [
        <>Core Web Vitals optimization (LCP, FID, CLS) for better rankings and improved user experience</>,
        <>Image compression, lazy loading, and modern format implementation for <a href="https://www.vaphers.com/website-development-services/nextjs-website-development" className="text-blue-600 underline hover:text-blue-700 font-medium">fast-loading websites</a></>,
        <>Code minification, bundling, and removal of render-blocking resources</>,
        <>CDN configuration and server response optimization for <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">ecommerce site speed</a> improvements</>
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      number: '02',
      title: 'Crawlability & Indexation Fixes',
      description: 'Ensure search engines can properly discover, crawl, and index your website content. We fix crawl errors, optimize robots.txt configuration, create XML sitemaps, resolve duplicate content issues, and eliminate indexation barriers. Our service ensures maximum visibility by making your important pages easily accessible to search engine bots and AI crawlers.',
      points: [
        <>Google Search Console error resolution through <a href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 underline hover:text-blue-700 font-medium">comprehensive audit</a> and crawl budget optimization</>,
        <>XML sitemap creation and submission to traditional and <a href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">AI crawlers</a></>,
        <>Robots.txt configuration and noindex/nofollow tag management</>,
        <>Canonical tag implementation to prevent duplicate content issues</>
      ],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      number: '03',
      title: 'Mobile Optimization & Responsiveness',
      description: 'Optimize your website for mobile-first indexing with responsive design implementation, mobile usability improvements, and touch-friendly navigation. We build mobile-first websites that provide excellent experiences across all devices, meeting Google\'s mobile-first standards. Mobile optimization is critical as most searches now happen on smartphones and tablets.',
      points: [
        <>Responsive design implementation for <a href="https://www.vaphers.com/website-development-services/nextjs-website-development" className="text-blue-600 underline hover:text-blue-700 font-medium">mobile-first websites</a> across all screen sizes</>,
        <>Mobile page speed optimization and viewport configuration</>,
        <>Touch-friendly navigation and button sizing adjustments for <a href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">local mobile searches</a></>,
        <>Mobile usability testing and Google Mobile-Friendly Test validation</>
      ],
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 4,
      number: '04',
      title: 'Structured Data & Schema Implementation',
      description: 'Implement structured data markup to help search engines and AI systems understand your content and enable rich results in search. We add schema markup for products, articles, FAQs, reviews, local businesses, and events. Proper schema implementation can improve click-through rates by up to 30% through enhanced search result displays with ratings, prices, and other rich snippets.',
      points: [
        <>Schema markup implementation for <a href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">AI search engines</a> and rich snippets</>,
        <><a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">Product schema</a>, Article, FAQ, Review schemas for enhanced visibility</>,
        <><a href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">Local business schema</a> for improved local search presence</>,
        <>JSON-LD structured data validation and Rich Results Test monitoring</>
      ],
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
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
                TECHNICAL SEO SERVICES
              </span>
            </h4>
          </div>
          {/* button */}
          <div className="flex justify-center sm:justify-start">
            <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <span className="mr-2 sm:mr-3">Get Technical SEO Audit</span>
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
                              alt={`${service.title} - Professional technical SEO services`}
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

export default TechnicalServicesAccordion
