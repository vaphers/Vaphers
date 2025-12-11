'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface FloatingIcon {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string; 
  positionClass: string; 
}

interface DynamicWhatsSEOProps {
  heading: string;
  subheading?: string;
  description: string; 
  mainImageUrl: string;
  mainImageAlt?: string;
  backgroundImageUrl?: string; 
  ctaText?: string;
  ctaLink?: string;
  floatingIcons?: FloatingIcon[]; 
}

const defaultPatternBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg'

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
    const handleChange = () => {
      setIsMobile(mql.matches)
    }
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}

const DynamicGrowSEO: React.FC<DynamicWhatsSEOProps> = ({
  heading,
  subheading,
  description,
  mainImageUrl,
  mainImageAlt = "Marketing Dashboard",
  backgroundImageUrl = defaultPatternBG,
  ctaText = "Ready to Get Started?",
  ctaLink = "/contact",
  floatingIcons = []
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })


  const xText = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const xImage = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          
          {/* IMAGE SECTION - MOVED TO FIRST (LEFT) VISUALLY VIA FLEX ORDER OR JUST PLACED FIRST IN CODE */}
          {/* Since we want image LEFT, we place it first in the DOM for desktop row layout */}
          <motion.div
            style={{
              x: xImage,
              opacity,
            }}
            className="w-full lg:w-1/2 flex justify-center relative order-2 lg:order-1" // Image is Order 1 on Desktop (Left)
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src={mainImageUrl}
                alt={mainImageAlt}
                width={600}
                height={721}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />

              {/* Render Dynamic Floating Icons */}
              <div className="absolute inset-0">
                {floatingIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={floatingVariants}
                    animate="animate"
                    className={`absolute ${icon.positionClass}`}
                  >
                    <Image 
                      src={icon.src} 
                      alt={icon.alt} 
                      width={icon.width} 
                      height={icon.height} 
                      className={`object-contain ${icon.className || ''}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* TEXT SECTION - MOVED TO SECOND (RIGHT) */}
          <motion.div
            style={{
              x: xText,
              opacity,
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6 order-1 lg:order-2" // Text is Order 2 on Desktop (Right)
          >
            <div>
              <h2 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular">
                 {/* Render HTML safely for colored spans */}
                 <span dangerouslySetInnerHTML={{ __html: heading }} />
              </h2>
              {subheading && (
                <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
                  {subheading}
                </p>
              )}
            </div>

            <div 
              className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left [&>a]:text-blue-600 [&>a]:underline [&>a]:font-medium hover:[&>a]:text-blue-800"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <Link href={ctaLink}>
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">{ctaText}</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default DynamicGrowSEO
