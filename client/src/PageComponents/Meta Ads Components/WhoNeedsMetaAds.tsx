'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const WhoNeedsMetaAds: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 3 + custom * 0.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay: custom * 0.3,
      },
    }),
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
                alt="Meta Ads placements across Facebook and Instagram"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />

              {/* Floating elements */}
              <div className="absolute inset-0">
                {/* Badge 1 */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-55 lg:-right-1"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761747669/Rank_One_On_Google_v7q5as.png"
                    alt="High-ROI campaigns"
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain"
                  />
                </motion.div>

                {/* Badge 2 */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-55 lg:-left-6"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_100/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png"
                    alt="Performance tracking"
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-18 lg:h-18 object-contain"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content: Who needs Meta Ads services */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div>
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-200 bungee-inline-regular">
                Who Needs <br />
                <span className="bg-blue-400 bg-clip-text text-transparent">Meta Ads Services</span>?
              </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-gray-300 font-medium">
                Meta Ads help brands find customers and scale outcomes like leads, sales, and bookings across Facebook and Instagram. 
              </p>
            </div>

            <p className="text-lg lg:text-lg text-white leading-relaxed">
              - Local service businesses that want steady inquiries and bookings in their city or neighborhood, such as clinics, salons, gyms, home services, restaurants, and real estate teams.
            </p>
            <p className="text-lg lg:text-lg text-white leading-relaxed">
              - E‑commerce and D2C brands aiming to acquire customers cost‑effectively with prospecting, retargeting, and lookalikes, leveraging formats like Reels and Carousel for discovery and conversion. 
            </p>
            <p className="text-lg lg:text-lg text-white leading-relaxed">
              - B2B and high‑ticket services that need qualified leads using Lead Ads, gated content, webinars, and event‑optimized delivery at competitive CPLs. 
            </p>


            {/* Call-to-Action */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
                <span className="mr-2 sm:mr-3">See If Meta Ads Fit Your Business</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoNeedsMetaAds;
