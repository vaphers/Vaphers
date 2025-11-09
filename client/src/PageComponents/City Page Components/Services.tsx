'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Service {
  id: number
  number: string
  title: string
  description: string
  points: string[]
  image: string
  color: string
}

interface SeoServicesAccordionProps {
  cityName: string
}

const SeoServicesAccordion: React.FC<SeoServicesAccordionProps> = ({ cityName }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'AI SEO Services',
      description:
        'Leverage cutting-edge AI technology to optimize your content, identify keyword opportunities, and improve search engine rankings efficiently and accurately.',
      points: [
        'AI-driven keyword research and content optimization',
        'Intelligent competitor analysis',
        'Predictive SEO analytics',
        'Automated report generation',
      ],
      image:
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 2,
      number: '02',
      title: `Local SEO Services in ${cityName}`,
      description:
        `Boost your visibility in ${cityName} with tailored local SEO strategies designed to put your business on the map, attract neighborhood customers, and increase foot traffic.`,
      points: [
        'Optimize Google My Business profile',
        'Localized keyword targeting',
        'Local citations and directory management',
        'Reputation and review monitoring',
      ],
      image:
        'https://images.pexels.com/photos/3583197/pexels-photo-3583197.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      id: 3,
      number: '03',
      title: `Ecommerce SEO in ${cityName}`,
      description:
        'Drive qualified traffic to your online store with ecommerce SEO strategies focused on product optimization, conversion rate improvements, and scalable growth.',
      points: [
        'Product page optimization',
        'Site architecture and navigation enhancements',
        'Content marketing for product discovery',
        'Enhanced user experience and CTR improvements',
      ],
      image:
        'https://images.pexels.com/photos/5632383/pexels-photo-5632383.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-amber-600',
    },
    {
      id: 4,
      number: '04',
      title: 'Technical SEO',
      description:
        'Ensure that your website’s technical foundation supports optimal search engine crawling and indexing, enhancing overall site health and performance.',
      points: [
        'Site speed optimization',
        'Mobile-friendliness & responsive design',
        'Fixing crawl errors and broken links',
        'Implementing structured data & XML sitemaps',
      ],
      image:
        'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-emerald-600',
    },
  ]

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)',
        }}
      />

      <section className="relative z-10 bg-gradient-to-b from-gray-50 to-white py-12 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Head */}
          <div className="max-w-5xl items-start sm:items-center mb-8 sm:mb-12 gap-6">
            <div>
              <p className="text-blue-600 text-sm sm:text-base font-semibold mb-2 uppercase tracking-wider">
                SERVICES .
              </p>
              <h2 className="text-gray-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight bungee-inline-regular">
                Our SEO Services for Companies in <span className="bg-blue-600 bg-clip-text text-transparent">{cityName}</span>
              </h2>
            </div>
          </div>

          {/* Accordion Items */}
          <div>
            {services.map((service, index) => (
              <div key={service.id} className="relative">
                {index > 0 && expandedIndex !== index && expandedIndex !== index - 1 && (
                  <div className="border-b border-gray-300" />
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
                    aria-expanded={expandedIndex === index}
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
                                alt={`${service.title} - SEO service illustration`}
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

export default SeoServicesAccordion
