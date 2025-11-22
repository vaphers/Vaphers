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

const SEMServicesAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Google Ads Management',
      description:
        'Full-service Google Ads campaigns across Search, Display, Shopping, and Performance Max using strategic keyword targeting, smart bidding, and conversion-optimized landing pages to deliver immediate visibility and measurable ROI.',
      points: [
        'Account audit & competitive analysis',
        'Keyword research & SKAG setup',
        'Ad copy optimization & extensions',
        'Quality Score improvement & bid management'
      ],
      image:
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      number: '02',
      title: 'PPC Campaign Optimization',
      description:
        'Data-driven PPC optimization across multiple platforms including Google Ads, Microsoft Bing Ads, and Yahoo Search. We focus on reducing CPC, improving click-through rates, and maximizing conversion rates through continuous testing and refinement.',
      points: [
        'A/B testing of ad copy & landing pages',
        'Negative keyword management',
        'Geo-targeting & device optimization',
        'Budget allocation & ROI tracking'
      ],
      image:
        'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-cyan-500 to-teal-600'
    },
    {
      id: 3,
      number: '03',
      title: 'Search Remarketing Campaigns',
      description:
        'Re-engage high-intent visitors who did not convert with strategic remarketing campaigns across Google Search, Display Network, and YouTube. Target specific visitor segments with personalized messaging that brings qualified leads back to complete conversions.',
      points: [
        'Remarketing code & audience setup',
        'Segmented audience targeting',
        'Dynamic remarketing for e-commerce',
        'Cross-platform retargeting strategies'
      ],
      image:
        'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-fuchsia-600'
    },
    {
      id: 4,
      number: '04',
      title: 'Local Search Advertising',
      description:
        'Dominate local search results with geo-targeted campaigns, Google My Business optimization, and location-based ad strategies. Perfect for businesses targeting specific cities, regions, or near me searches to drive foot traffic and local conversions.',
      points: [
        'Local keyword targeting & optimization',
        'Google Maps & location extensions',
        'Call tracking & mobile optimization',
        'Local competitor analysis & bidding'
      ],
      image:
        'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-emerald-500 to-teal-700'
    },
    {
      id: 5,
      number: '05',
      title: 'Shopping Ads & E-commerce PPC',
      description:
        'Drive product sales with Google Shopping campaigns, product feed optimization, and dynamic remarketing strategies. We manage product catalogs, optimize bids by SKU performance, and create compelling product listings that convert browsers into buyers.',
      points: [
        'Product feed setup & optimization',
        'Google Merchant Center management',
        'Smart Shopping & Performance Max',
        'Dynamic product remarketing ads'
      ],
      image:
        'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 6,
      number: '06',
      title: 'Landing Page Optimization',
      description:
        'Maximize conversion rates with custom landing pages designed specifically for your PPC campaigns. We focus on clear CTAs, fast load times, mobile optimization, and persuasive copy that aligns with search intent to reduce bounce rates and increase ROI.',
      points: [
        'Custom landing page design & development',
        'Conversion rate optimization (CRO)',
        'Mobile-first responsive design',
        'Heat mapping & user behavior analysis'
      ],
      image:
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-pink-500 to-rose-600'
    }
  ]

  return (
    <div className="min-h-screen w-full relative bg-[#f9fafb]">
      {/* Diagonal Fade Center Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)'
        }}
      />

      <section className="relative z-10 bg-gradient-to-b from-gray-50 to-white py-12 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Head */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-6">
            <div>
              <p className="text-blue-600 text-sm sm:text-base font-semibold mb-2 uppercase tracking-wider">
                SERVICES .
              </p>
              <h2 className="text-gray-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight bungee-inline-regular">
                Explore Our
                <br />
                <span className="bg-blue-600 bg-clip-text text-transparent">SEM Services</span>
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
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
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

                  {/* Expanded Content */}
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
                                  <li
                                    key={idx}
                                    className="text-gray-600 text-sm sm:text-base flex items-start"
                                  >
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
                                alt={`${service.title} - SEM service illustration`}
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
    </div>
  )
}

export default SEMServicesAccordion
