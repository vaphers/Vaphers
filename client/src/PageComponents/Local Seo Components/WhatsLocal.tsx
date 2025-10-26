'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const WhatIsLocalSEO: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 3 + custom * 0.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: custom * 0.3
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat" 
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761047483/PatternBG_kv4ubo.jpg)`,
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-12 pb-8 sm:pb-12 lg:pb-12'>
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-12">

          {/* Content Section */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-4xl md:text-4xl text-center lg:text-start lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                What Is <span className="bg-blue-600 bg-clip-text text-transparent">Local SEO?</span>
              </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-blue-600 font-medium">
                Understand How Local Search Helps Businesses Grow
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              Local SEO, or Local Search Engine Optimization, is the process of improving a business’s visibility 
              in searches performed by users within a specific geographic area. When someone searches for 
              services like “best cafe near me” or “plumber in Frisco,” local SEO determines which businesses 
              appear in those local map listings and search results. It connects your brand directly with 
              nearby customers who are actively looking for the products or services you offer.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              Effective local SEO includes optimizing your Google Business Profile, managing online reviews, 
              ensuring NAP (Name, Address, Phone) consistency across directories, and building localized content 
              relevant to your area. With our hyperlocal SEO optimization strategies, your business can reach 
              customers searching in specific neighborhoods, streets, or landmarks, not just your city. 
              This approach boosts real-world visibility, increases foot traffic, and helps local businesses 
              stand out in competitive search landscapes.
            </p>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Learn Local SEO Strategies</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047473/Ai-Seo-Services_nuxdts.png" 
                alt="Local SEO concept dashboard illustration" 
                width={600}
                height={600}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />

              {/* Floating Logos */}
              <div className="absolute inset-0">
                {/* Google Maps Icon */}
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-2 lg:-left-1 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_100/v1761047474/google-maps-icon.png" 
                    alt="Google Maps" 
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-25 lg:h-25 object-contain" 
                  />
                </motion.div>

                {/* Yelp Logo */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-40 lg:right-1"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047484/yelp-logo.png" 
                    alt="Yelp Reviews" 
                    width={112}
                    height={112}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-22 lg:h-22 object-contain" 
                  />
                </motion.div>

                {/* Google My Business */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-20 lg:left-8"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047475/google-business-logo.png" 
                    alt="Google My Business" 
                    width={112}
                    height={112}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-28 lg:h-28 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsLocalSEO;
