'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const WhatsGEO: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  // Floating animation variants for badges
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
      className="max-w-full bg-white bg-gradient-to-b from-[#0f3064] via-[#2563eb] to-[#0f3064]">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-0 pb-8 sm:pb-12 lg:pb-6'>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative hidden lg:block">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image 
                src="/Gen-SEO.png" 
                alt="Generative Engine Optimization showing AI content generation" 
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {/* Perplexity */}
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
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-12 lg:-left-1 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="/perplexity-logo.png" 
                    alt="Perplexity AI" 
                    width={96}
                    height={96}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-24 lg:h-24 object-contain" 
                  />
                </motion.div>
                {/* Rank 1 */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-55 lg:-right-1"
                >
                  <Image 
                    src="/seo-rank.png" 
                    alt="SEO Rank" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
                {/* Competitor */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-30 lg:-left-10"
                >
                  <Image 
                    src="/competitor.png" 
                    alt="Competitor Analysis" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-4xl md:text-4xl lg:text-6xl text-center lg:text-start text-gray-200 font-base tracking-[-0.03em] text-pretty bungee-inline-regular">
                    What's <br/><span className="bg-blue-400 bg-clip-text text-transparent">Geo Service?</span>
                </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-gray-300 font-medium">
                Dominate ChatGPT, Perplexity, and Gemini Search Results
              </p>
            </div>
            
            <p className="text-lg lg:text-xl text-white leading-relaxed text-center lg:text-left">
              Generative Engine Optimization (GEO) is the cutting-edge practice of optimizing your content specifically 
              for large language models and AI chatbots like ChatGPT, Google Gemini, Claude, and Perplexity. While 
              traditional SEO targets search engine rankings, GEO ensures your business is{' '}
              <a href="#" className="text-blue-300 underline hover:text-blue-200 transition-all duration-300 font-medium">
                cited, recommended, and featured in AI-generated responses
              </a>
              {' '}when users have conversations with AI assistants about your industry, products, or services.
            </p>
            
            {/* button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Get GEO Optimized</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhatsGEO;
