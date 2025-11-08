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

const ShopifyServicesAccordion: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Custom Shopify Store Development',
      description: 'Launch a fully customized Shopify store built from scratch to reflect your brand identity and business goals. We create unique, high-converting online stores with responsive design, optimized checkout flows, and seamless user experiences. From theme selection to payment gateway integration, we handle everything to deliver a professional store that drives sales and scales with your business.',
      points: [
        'Complete store setup with custom design tailored to your brand',
        'Mobile-responsive layouts optimized for 70% of shoppers on mobile',
        'Shop Pay integration for 50% higher conversion vs guest checkout',
        'Multi-currency and multi-language support for global selling'
      ],
      image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 2,
      number: '02',
      title: 'Shopify Theme Customization',
      description: 'Transform your Shopify store with professional theme customization services that make your brand stand out. We modify existing themes or create entirely custom designs that align with your brand identity, enhance user experience, and boost conversion rates. From advanced features like product filters and custom sliders to performance optimization, we ensure your store looks unique and performs flawlessly across all devices.',
      points: [
        'Custom design and branding to match your unique identity',
        'Advanced feature integration (custom sliders, popups, product filters)',
        'Performance optimization for faster load times (309ms average)',
        'Responsive design ensuring seamless experience on all devices'
      ],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      number: '03',
      title: 'Shopify App Integration & Development',
      description: 'Extend your Shopify store functionality with custom app development and seamless third-party integrations. We connect your store with essential business tools like ERP, CRM, inventory management systems, shipping solutions, and marketing automation platforms. Whether you need a custom private app or integration with the Shopify App Store ecosystem, we build solutions that automate operations, sync data in real-time, and streamline your eCommerce workflow.',
      points: [
        'Custom app development for unique business requirements',
        'Third-party integration (ERP, CRM, payment gateways, shipping)',
        'Real-time data synchronization for orders, inventory, and customers',
        'Shopify Plus B2B functionality and wholesale portal setup'
      ],
      image: 'https://images.pexels.com/photos/5582596/pexels-photo-5582596.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      number: '04',
      title: 'Shopify Store Maintenance & Support',
      description: 'Keep your Shopify store running smoothly with comprehensive maintenance and support services. We provide ongoing monitoring, security updates, performance optimization, and priority technical support to ensure your store operates at peak efficiency 24/7. From regular health checks and bug fixes to feature enhancements and store optimization, we handle everything so you can focus on growing your business with confidence.',
      points: [
        'Regular security monitoring, updates, and automated backups',
        'Performance optimization and speed improvements (sub-second load times)',
        'SEO optimization and ongoing store enhancements',
        'Priority support with issue resolution within 24 hours'
      ],
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-green-500 to-teal-600'
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
            <h2 className="text-gray-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight bungee-inline-regular">
              Explore Our
              <br />
              <span className="bg-blue-600 bg-clip-text text-transparent">
                SHOPIFY SERVICES
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
                              alt={`${service.title} - Professional Shopify services`}
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

export default ShopifyServicesAccordion
