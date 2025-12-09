'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { TrendingUp } from 'lucide-react';

const WhatIsPPCMarketing: React.FC = () => {
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
              <h2 className="text-4xl md:text-4xl text-center lg:text-start lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                What Is <span className="bg-blue-600 bg-clip-text text-transparent">PPC Marketing Service?</span>
              </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-blue-600 font-medium">
                Drive Targeted Traffic with Affordable PPC Marketing Solutions
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              PPC Marketing, or Pay-Per-Click marketing service, is a digital advertising strategy where businesses pay only when their ads are clicked. This highly targeted approach helps companies quickly reach potential customers searching for specific products or services online. Key benefits include cost control, immediate visibility, and measurable ROI through data-driven ad campaigns.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              Our affordable PPC marketing services focus on extensive keyword research to identify low-competition keywords, such as "cost-effective PPC advertising," "cheap PPC management," and "budget-friendly pay per click," which reduce your ad spend while maximizing your ad exposure and conversions. We also optimize your landing pages and create compelling ad content to turn clicks into customers.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed text-center lg:text-left">
              By partnering with us for PPC management services, you gain expert campaign setup, ongoing monitoring, A/B testing, and detailed reporting. This ensures your campaigns adapt to market trends and deliver consistent performance at an affordable price. Whether you need local PPC marketing or niche-specific campaigns, our targeted strategies help your business grow efficiently.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Learn PPC Marketing Strategies</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765276093/PPC_2_kqgxoj.png"
                alt="PPC marketing concept dashboard illustration"
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

export default WhatIsPPCMarketing;



