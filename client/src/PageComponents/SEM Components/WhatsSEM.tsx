'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const WhatIsSEM: React.FC = () => {
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

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
            <Image 
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047473/Ai-Seo-Services_nuxdts.png" 
              alt="Search Engine Marketing dashboard showing Google Ads campaigns and PPC metrics" 
              width={600}
              height={600}
              sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
              className="w-full h-auto object-contain"
              priority
            />
              {/* Floating Icons */}
              <div className="absolute inset-0">
                {/* ChatGPT */}
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
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_100/v1761047474/chat-gpt-logo_qf83fb.png" 
                    alt="ChatGPT" 
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-25 lg:h-25 object-contain" 
                  />
                </motion.div>
                {/* Perplexity */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-40 lg:right-1"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047484/perplexity-logo_zqmnzf.png" 
                    alt="Perplexity AI" 
                    width={112}
                    height={112}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-22 lg:h-22 object-contain" 
                  />
                </motion.div>
                {/* Gemini */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-20 lg:left-8"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047475/gemini-logo_yes1g8.png" 
                    alt="Google Gemini" 
                    width={112}
                    height={112}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-28 lg:h-28 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-4xl md:text-4xl text-center lg:text-start lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                    What is <br/><span className="bg-blue-600 bg-clip-text text-transparent">Search Engine Marketing?</span>
                </h2>
              <p className="text-base md:text-lg text-center lg:text-start text-blue-600 font-medium">
                Drive Targeted Traffic Through Strategic Paid Search Advertising
              </p>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              Search Engine Marketing (SEM) is a digital marketing strategy that increases website visibility in search 
              engine results pages through paid advertising[web:11][web:15]. Also known as pay-per-click (PPC) advertising, 
              SEM allows businesses to display ads prominently at the top of search results when users search for specific 
              keywords related to their products or services[web:12][web:17]. Unlike SEO which focuses on organic rankings, 
              SEM delivers{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
                immediate visibility
              </a>{' '}
              and targeted traffic through platforms like Google Ads and Microsoft Advertising[web:16][web:19].
            </p>
            <p className="text-lg lg:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              SEM operates on a pay-per-click model where advertisers only pay when users click their ads[web:15][web:19]. 
              Businesses bid on relevant keywords, and ad placement is determined by factors including bid amount, Quality 
              Score, and ad relevance[web:15][web:16]. This precise targeting ensures ads reach potential customers exactly 
              when they're actively searching for solutions, making SEM one of the most cost-effective digital marketing 
              strategies for generating qualified leads and driving conversions[web:7][web:18].
            </p>
            
            {/* button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Launch Your SEM Campaign</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhatIsSEM;
