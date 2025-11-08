'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const PatternBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg'

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.3,
    },
  }),
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleChange = () => setIsMobile(mql.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])
  return isMobile
}

const ShopifyPitch: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${PatternBG})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          
          {/* Left Content */}
          <motion.div
            style={{ x: xLeft, opacity }}
            className="w-full lg:w-2/3 space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular">
              Why Choose{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Professional Shopify Development
              </span>?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              Launch your online store 41% faster with Shopify—the platform powering over 5.8 million live stores worldwide and serving 875 million customers in 2024. Get a fully-hosted, secure e-commerce solution that's ready to sell from day one, with built-in payment processing, inventory management, and enterprise-grade security included.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              We specialize in creating high-converting Shopify stores with custom themes, seamless app integrations, and lightning-fast performance (309ms average load time vs 776ms for competitors). Whether you need dropshipping automation, multi-channel selling across Amazon, Facebook, TikTok, and Instagram, or advanced AR product previews, we build Shopify solutions that drive real revenue growth.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-gray-700 leading-relaxed">
              With Shopify, you get 24/7 expert support, automatic SSL security, PCI compliance, and access to 13,000+ apps to scale your business. Join brands experiencing 20% year-over-year growth and record-breaking sales. Choose professional Shopify development to build a future-proof store that converts visitors into loyal customers.
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-transform duration-300 cursor-pointer">
                <span className="mr-2 sm:mr-3">Get Your Free Quote</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div
            style={{ x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-7xl">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,w_600/v1/shopify-development-dashboard.png"
                alt="Shopify Store Development Dashboard"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-md"
                priority
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}

export default ShopifyPitch
