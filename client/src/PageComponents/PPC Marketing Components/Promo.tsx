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
          <div className="w-full lg:w-1/2 flex relative hidden lg:block">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765182797/frame-2134298915-1.pngn-w768-h76_vn5aia.png"
                alt="Affordable PPC Marketing Concept Illustration"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />

              {/* Floating Google Maps, Local Listings
              <div className="absolute inset-0">
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-55 lg:-right-1"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761747669/Rank_One_On_Google_v7q5as.png"
                    alt="Top Google Ranking Icon"
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain"
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-55 lg:-left-6"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w-100/v1765182797/frame-2134298915-1.pngn-w768-h76_vn5aia.png"
                    alt="Google Logo"
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-18 lg:h-18 object-contain"
                  />
                </motion.div>
              </div> */}
            </div>
          </div>

          {/* Content: Affordable PPC Marketing */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div>
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-200 bungee-inline-regular">
                Affordable PPC Marketing <span className="bg-blue-400 bg-clip-text text-transparent">
                  for Your Business
                </span>
              </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-gray-300 font-medium">
                Drive targeted traffic, leads, and sales without breaking the bank.
              </p>
            </div>
            <p className="text-lg lg:text-lg text-white leading-relaxed">
              Our affordable PPC marketing strategies are tailored to get you the best return on your ad spend. We focus on laser-targeted campaigns, continuous optimization, and cost control to maximize your results at minimal cost.
            </p>
            <p className="text-lg lg:text-lg text-white leading-relaxed">
              Whether you’re a startup or an established business, our data-driven approach ensures your ads reach the right customers at the right time — boosting your growth effectively and affordably. With constant monitoring and expert tweaks, you get scalable campaigns that grow your ROI sustainably over time.
            </p>

            {/* Call-to-Action */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
                <span className="mr-2 sm:mr-3">Get Affordable PPC Today</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
