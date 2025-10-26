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
  points: string[]
  image: string
  color: string
}

const EcommerceServicesAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Shopify SEO Optimization',
      description: 'Maximize your Shopify store\'s visibility with our specialized SEO strategies designed specifically for Shopify\'s architecture. We optimize product pages, collections, and technical elements to rank higher in Google search results and drive sustainable organic traffic. From schema markup implementation to site speed optimization, we ensure your Shopify store stands out in competitive ecommerce markets.',
      points: [
        'Shopify-specific technical SEO and site structure optimization',
        'Product page optimization with high-converting descriptions and titles',
        'Collection page SEO and internal linking strategies',
        'Rich snippets and schema markup for Google Shopping visibility'
      ],
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      number: '02',
      title: 'WooCommerce SEO Services',
      description: 'Dominate search rankings with our expert WooCommerce SEO solutions tailored for WordPress-based ecommerce stores. We combine the power of WordPress flexibility with advanced WooCommerce optimization techniques to improve product visibility, enhance user experience, and increase conversions. Our strategies focus on both technical excellence and content optimization to drive measurable revenue growth.',
      points: [
        'WordPress + WooCommerce technical SEO and performance optimization',
        'Category and product taxonomy optimization for better indexing',
        'WooCommerce-specific schema markup for products and reviews',
        'Mobile-first optimization and Core Web Vitals improvement'
      ],
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 3,
      number: '03',
      title: 'Product Page SEO & Content Optimization',
      description: 'Transform your product pages into conversion machines with our data-driven SEO and content optimization strategies. We create unique, keyword-rich product descriptions that appeal to both search engines and buyers, implement advanced on-page SEO techniques, and optimize images and metadata to improve rankings across all major search engines and shopping platforms.',
      points: [
        'Keyword research targeting high-intent buyer search terms',
        'Unique product descriptions optimized for conversions and SEO',
        'Image optimization with alt tags and compression for speed',
        'Meta titles and descriptions crafted for click-through rates'
      ],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 4,
      number: '04',
      title: 'Technical Ecommerce SEO Audits',
      description: 'Identify and fix critical technical issues impacting your ecommerce store\'s search performance with our comprehensive SEO audits. We analyze site architecture, crawlability, indexation, mobile responsiveness, and structured data implementation to ensure search engines can efficiently access and understand your entire product catalog. Our audits uncover hidden opportunities for improvement that competitors miss.',
      points: [
        'Complete technical audit identifying 200+ potential issues',
        'Site speed and Core Web Vitals optimization for better rankings',
        'Structured data validation and implementation for rich results',
        'Mobile optimization and responsive design analysis'
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-cyan-600'
    },
  ]

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Head */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-6">
          <div>
            <p className="text-blue-600 text-sm sm:text-base font-semibold mb-2 uppercase tracking-wider">
              SERVICES .
            </p>
            <h2 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight bungee-inline-regular">
              Explore Our Affordable
              <br />
              <span className="bg-blue-600 bg-clip-text text-transparent">
                ECOMMERCE SEO SERVICES
              </span>
            </h2>
          </div>
          {/* button */}
          <div className="flex justify-center sm:justify-start">
            <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <span className="mr-2 sm:mr-3">Get Started Today</span>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Items */}
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
                {/* Header - Always Visible */}
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
                          {/* Text Content */}
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
                                  {point}
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
                              alt={`${service.title} - Professional Ecommerce SEO services`}
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

export default EcommerceServicesAccordion
