'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { TrendingUp } from 'lucide-react';

const WhatIsLocalSEO: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761047483/PatternBG_kv4ubo.jpg)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-12 pb-8 sm:pb-12 lg:pb-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-12">
          {/* Content */}
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

            {/* Button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Learn Local SEO Strategies</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761741435/WhyYouNeedLocalSEO__1_lre0is.png"
                alt="Local SEO concept dashboard illustration"
                width={600}
                height={600}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsLocalSEO;
