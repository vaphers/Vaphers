import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WhatYouGet() {
  const services = [
    {
      title: "LLM Search Optimization",
      description: "Future-proof your brand visibility by optimizing for AI-driven search engines and conversational LLMs to capture high-intent, zero-click searches.",
      tags: ["AI Search", "Brand Authority"],
      link: "https://www.vaphers.com/seo-services/ai-seo-services",
    },
    {
      title: "Portfolio & Visual SEO",
      description: "Optimize your stunning project galleries for image search and showcase your design aesthetics to high-end clients actively seeking inspiration.",
      tags: ["Image Search", "Brand Aesthetics"],
      link: "https://www.vaphers.com/contact",
    },
    {
      title: "Local SEO Marketing",
      description: "Dominate your regional market, enhance your Google Business Profile, and attract quality local leads straight to your doorstep.",
      tags: ["Local Maps", "Targeted Leads"],
      link: "https://www.vaphers.com/seo-services/local-seo-services",
    },
    {
      title: "Technical SEO",
      description: "Ensure your website's architecture is perfectly structured, crawled, and indexed by search engines for maximum speed and visibility.",
      tags: ["Site Speed", "Crawlability"],
      link: "https://www.vaphers.com/seo-services/technical-seo-services",
    }
  ];

  return (
    <section className="bg-[#FAFAFA] py-12 sm:py-14 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Heading - Scaled for mobile with a forced break on tiny screens */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-10 sm:mb-16 bungee-shade leading-[1.2] text-center">
          What Designers Get At <br className="block sm:hidden" /> <span className='text-blue-700'>Vaphers?</span>
        </h3>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-4 lg:pb-12">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.link}
              className={`group flex flex-col bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-all duration-300 min-h-[300px] sm:min-h-[350px] lg:min-h-[380px]
                ${index % 2 === 0 ? 'lg:translate-y-12' : ''} 
              `}
            >
              {/* Card Header (Title & Arrow) */}
              <div className="flex justify-between items-start mb-5 sm:mb-6 gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-[22px] font-medium text-gray-900 leading-snug">
                  {service.title}
                </h3>
                {/* Circular Arrow Button - Shrunk slightly on mobile to save space */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-white" />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                {service.description}
              </p>

              {/* Tags Container (Pushed to bottom) */}
              <div className="mt-auto flex flex-wrap gap-2 pt-2 sm:pt-4">
                {service.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-gray-200 text-[11px] sm:text-[13px] text-gray-600 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}