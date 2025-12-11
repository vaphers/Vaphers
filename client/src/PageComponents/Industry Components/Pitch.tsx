'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, ShoppingCart, DollarSign } from 'lucide-react';

interface Props {
  heading: string;
  subheading?: string;
  description: string; 
  imageUrl: string;
  reverse?: boolean; 
}

const AttractCustomers: React.FC<Props> = ({
  heading,
  subheading,
  description,
  imageUrl,
  reverse = false
}) => {
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
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      value: "$7.4T",
      label: "Global Ecommerce Sales",
      description: "Projected online retail market size for 2025"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      value: "3.2x",
      label: "Average SEO ROI",
      description: "Ecommerce SEO delivers 3.2x ROI within 12 months"
    }
  ];

  return (
    <section 
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat" 
    >
      <div className="max-w-7xl mx-auto pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
        
        <div 
          className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12 
            ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
        >

          {/* IMAGE SIDE */}
          <div className="w-full h-auto lg:w-1/2 flex justify-start items-start relative order-1 lg:order-none">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              <Image 
                src={imageUrl}
                alt={heading}
                width={600}
                height={7000}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6 order-2">
            <div>
              <h2 className="text-4xl md:text-4xl lg:text-5xl text-center lg:text-start font-base tracking-[-0.03em] bungee-inline-regular">
                {heading}
              </h2>

              {subheading && (
                <p className="text-base md:text-xl text-center lg:text-start text-blue-600 font-medium">
                  {subheading}
                </p>
              )}
            </div>

            <p 
              className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left"
              dangerouslySetInnerHTML={{ __html: description }}
            />

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

            {/* CTA */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <a 
                href="https://www.vaphers.com/seo-services/seo-audit-services"
                className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <span className="mr-2 sm:mr-3">Get Your Free Store Audit</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractCustomers;
