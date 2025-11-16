'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const Promo: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 3 + custom * 0.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: custom * 0.3,
      }
    })
  };

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-gradient-to-b from-[#0f3064] via-[#2563eb] to-[#0f3064]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-12 pb-8 sm:pb-12 lg:pb-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-12">
          
          {/* Image Illustration */}
          <div className="w-full lg:w-1/2 flex  relative hidden lg:block">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761746360/Master_Local_SEO_cofn00.png"
                alt="Local SEO Dashboard Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />

              {/* Floating Google Maps, Local Listings */}
              <div className="absolute inset-0">
                {/* Google rank 1 */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-55 lg:-right-1"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761747669/Rank_One_On_Google_v7q5as.png"
                    alt="Rank one on google"
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain"
                  />
                </motion.div>

                {/* Google Logo  */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-55 lg:-left-6"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_100/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png"
                    alt="Google Logo"
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-18 lg:h-18 object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content: Focus on Local SEO */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div>
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-200 bungee-inline-regular">
                Master the Art of <br/><span className="bg-blue-400 bg-clip-text text-transparent">Local SEO Domination</span>
              </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-gray-300 font-medium">
                Capture Nearby Customers & Rank in Local Maps
              </p>
            </div>
            <p className="text-lg lg:text-lg text-white leading-relaxed">
              Local SEO focuses on optimizing your online presence specifically for your geographic area through{' '}
              <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-300 underline hover:text-blue-200 transition-all duration-300 font-medium">
                website optimization
              </a>
              {' '}and{' '}
              <a href="https://www.vaphers.com/seo-services" className="text-blue-300 underline hover:text-blue-200 transition-all duration-300 font-medium">
                affordable   SEO services
              </a>
              . This means enhancing your Google My Business profile, building local citations, acquiring location-based backlinks, and creating geo-targeted content. The goal is to make sure your business appears at the top of local map packs, in "near me" searches, and across local directories. Incorporating low-competition keywords like "neighborhood plumber," "local carpentry services," or "community favorite restaurant" can help you stand out in local search results without heavy competition.
            </p>
            <p className="text-lg lg:text-lg text-white leading-relaxed">
              At <strong>Vaphers</strong>, we specialize in these innovative local SEO strategies through detailed{' '}
              <a href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-300 underline hover:text-blue-200 transition-all duration-300 font-medium">
                local search visibility audits
              </a>
              {' '}that ensure your business gains top visibility across search engines and map services—driving foot traffic and online leads efficiently within your community.
            </p>

            {/* Call-to-Action */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
                <span className="mr-2 sm:mr-3">Start Your Local SEO Strategy</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
