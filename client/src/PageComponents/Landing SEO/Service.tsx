'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: number
  number: string
  title: string
  description: string | React.ReactNode
  points: Array<string | React.ReactNode>
  image: string
  color: string
  link: string
}

const ServicesAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Local SEO Optimization Service',
      description: (
        <>
          Dominate local search results and capture nearby customers actively searching for your services. We optimize your Google Business Profile, build authoritative local citations across 50+ directories, and implement geo-targeted keyword strategies that drive phone calls, foot traffic, and local conversions through proven{' '}
          <a href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            local SEO techniques
          </a>.
        </>
      ),
      points: [
        'Google Business Profile optimization and ongoing management',
        'Local citation building across top directories and industry sites',
        'Location-based keyword research and on-page optimization',
        'Review management and reputation monitoring strategies'
      ],
      image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-cyan-500 to-blue-600',
      link: 'https://www.vaphers.com/seo-services/local-seo-services'
    },
    {
      id: 2,
      number: '02',
      title: 'AI SEO Optimization Service',
      description: (
        <>
          Position your brand as the authoritative answer across ChatGPT, Google Gemini, Perplexity, and emerging AI search platforms. Our{' '}
          <a href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            AI SEO optimization
          </a>
          {' '}service implements advanced structured data, optimizes content for natural language processing, and creates comprehensive FAQ content that AI engines prioritize when generating responses.
        </>
      ),
      points: [
        'Content optimization for conversational AI queries and voice search',
        'Advanced schema markup implementation (FAQ, How-To, Product)',
        'Entity-based SEO and topical authority development',
        'AI search visibility tracking across multiple platforms'
      ],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-pink-600',
      link: 'https://www.vaphers.com/seo-services/ai-seo-services'
    },
    {
      id: 3,
      number: '03',
      title: 'Ecommerce SEO Service',
      description: (
        <>
          Scale your online store revenue with product page optimization that converts browsers into buyers. Our{' '}
          <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            ecommerce SEO strategies
          </a>
          {' '}implement category architecture optimization, rich snippet schema, and{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            technical fixes
          </a>
          {' '}that improve crawlability while targeting high-intent transactional keywords.
        </>
      ),
      points: [
        'Product page optimization with transactional keyword targeting',
        'Category hierarchy restructuring for improved crawling',
        'Schema markup for products, reviews, and pricing',
        <>Technical SEO for site speed, mobile UX, and duplicate content</>
      ],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-red-600',
      link: 'https://www.vaphers.com/seo-services/ecommerce-seo-services'
    },
    {
      id: 4,
      number: '04',
      title: 'Technical SEO Optimization',
      description: (
        <>
          Fix critical backend issues preventing search engines from properly crawling, indexing, and ranking your website. Our{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            technical SEO audits
          </a>
          {' '}comprehensively address site speed, Core Web Vitals, mobile responsiveness, crawl errors, and server configuration problems that suppress visibility.
        </>
      ),
      points: [
        'Core Web Vitals optimization (LCP, FID, CLS improvements)',
        'Mobile-first indexing compliance and responsive design fixes',
        'XML sitemap optimization and robots.txt configuration',
        'Structured data implementation and validation'
      ],
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-teal-600',
      link: 'https://www.vaphers.com/seo-services/technical-seo-services'
    },
    {
      id: 5,
      number: '05',
      title: 'SEO Auditing & Analysis',
      description: (
        <>
          Uncover hidden opportunities and diagnose issues sabotaging your search performance with comprehensive website analysis. Our{' '}
          <a href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            professional SEO audits
          </a>
          {' '}evaluate 200+ ranking factors including{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
            technical health
          </a>, content quality, backlink profile, and competitive gaps.
        </>
      ),
      points: [
        'Comprehensive 200+ point technical and content audit',
        'Competitor analysis and keyword gap identification',
        'Backlink profile health assessment and toxic link detection',
        'Prioritized action plan with quick wins and long-term strategies'
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-indigo-500 to-purple-600',
      link: 'https://www.vaphers.com/seo-services/seo-audit-services'
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
                SEO SERVICES
              </span>
            </h4>
          </div>
          {/* button */}
          <div className="flex justify-center sm:justify-start">
            <Link href={"/contact"}>
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Get Started Today</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
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
                {/* Header */}
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

                            {/* Learn More Button */}
                            <div className="pt-2">
                              <a
                                href={service.link}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
                              >
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </a>
                            </div>
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
                              alt={`${service.title} - Professional SEO services`}
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

export default ServicesAccordion
  