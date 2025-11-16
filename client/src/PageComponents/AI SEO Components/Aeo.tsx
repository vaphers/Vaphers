'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, Search, Brain } from 'lucide-react';

const WhatsAEO: React.FC = () => {
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

  // Stats
  const stats = [
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      value: "58%",
      label: "Zero-Click Searches",
      description: "Of Google searches now end without a click"
    },
    {
      icon: <Brain className="w-6 h-6 text-green-600" />,
      value: "85%",
      label: "AI Preference",
      description: "Of users trust AI-generated answers"
    }
  ];

  return (
    <section 
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat" 
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761047482/GraphBG_pr6cri.png)`,
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16'>
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-12">

          {/* Content */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div>
                <h3 className="text-4xl md:text-4xl lg:text-6xl text-center lg:text-start font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                    What's <br/><span className="bg-blue-600 bg-clip-text text-transparent">AEO Service?</span>
                </h3>
              <p className="text-base md:text-lg text-center lg:text-start text-blue-600 font-medium">
                Optimize for Direct Answers, Not Just Rankings
              </p>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              Answer Engine Optimization (AEO) is the practice of structuring and optimizing your content to appear as 
              direct answers in AI-powered search engines, voice assistants, and featured snippets. Unlike{' '}
              <a href="https://www.vaphers.com/seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                traditional SEO methods
              </a>
              {' '}that focus on ranking in search results, AEO ensures your content is selected and cited by AI engines 
              like ChatGPT, Google AI, and Perplexity when users ask questions related to your business. This requires{' '}
              <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                structured data implementation
              </a>
              {' '}and technical optimization to make your content machine-readable and citation-worthy.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Optimize for AI Answers</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Image Section - Right side on desktop */}
          <div className="w-full h-auto lg:w-1/2 flex justify-center items-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              <Image 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047472/AEO_tqqaku.png" 
                alt="Answer Engine Optimization dashboard showing AI search optimization" 
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {/* Google - Diagonal Animation */}
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
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_56/v1761047482/google_jze9mq.png" 
                    alt="Google" 
                    width={56}
                    height={56}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain" 
                  />
                </motion.div>
                {/* Rank 1 Badge - Float Up/Down */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:-top-4 lg:-right-12"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047484/seo-rank_l7ekja.png" 
                    alt="SEO Rank" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
                {/* Competitor Badge - Float Up/Down */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-30 lg:-left-10"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png" 
                    alt="Competitor Analysis" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
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

export default WhatsAEO;
