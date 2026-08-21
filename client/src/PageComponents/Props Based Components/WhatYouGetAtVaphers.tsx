'use client'

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScanSearch, TestTube, Users } from "lucide-react";

interface FeatureTab {
  id: string | number;
  label: string;
  contentTitle: string;
  lucideIcon?: React.ReactNode; 
  contentImage?: string; 
  content: React.ReactNode; 
}

interface FeaturesSectionProps {
  topStats?: string[];
  heading?: string;
  description?: React.ReactNode; 
  tabs?: FeatureTab[];
}

export default function WhatYouGetAtVaphers({
  topStats = [
    "750+ DIGITAL EXPERTS",
    "30-YEAR TRACK RECORD",
    "1,100+ REVIEWS",
    "IN-HOUSE TECHNOLOGY"
  ],
  heading = "Improve your website's UX to boost your revenue",
  description = (
    <div className="space-y-4">
      <p>
        Your website's UX directly impacts your revenue and bottom-line growth. With a positive UX, you keep your audience engaged on your site, potentially increasing conversions and sales.
      </p>
      <p>
        To find out if you're providing excellent user experience, you can invest in UX analysis services. These services uncover the bottlenecks that your audience faces when navigating your website and help you improve their experience.
      </p>
    </div>
  ),
  tabs = [
    {
      id: "tab-1",
      label: "Custom UX analysis strategy",
      contentTitle: "Custom UX analysis strategy",
      lucideIcon: <ScanSearch className="w-8 h-8 text-blue-600" />,
      contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/girl-laptop_kwggux.png", 
      content: (
        <div className="space-y-4">
          <p>Every business has a unique website and UX analysis needs. That's why we use a custom approach for your website's UX analysis.</p>
          <p>Your custom UX analysis starts with your website's initial conversion audit. At this stage, we identify your site elements with the highest potential for optimization.</p>
          <p>These parts will get tested further and optimized for conversions. Our team will then provide recommendations to optimize these elements to drive conversions for your business.</p>
        </div>
      )
    },
    {
      id: "tab-2",
      label: "CRO testing",
      contentTitle: "Conversion Rate Optimization",
      lucideIcon: <TestTube className="w-8 h-8 text-blue-600" />,
      content: (
        <p>We implement rigorous A/B testing and multivariate testing to ensure every change made to your site is backed by hard data, driving maximum conversions.</p>
      )
    },
    {
      id: "tab-3",
      label: "Dedicated project manager",
      contentTitle: "Your Dedicated Expert",
      lucideIcon: <Users className="w-8 h-8 text-blue-600" />,
      contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg",
      content: (
        <p>You'll be assigned a dedicated project manager who will be your single point of contact, ensuring your goals are met seamlessly and transparently.</p>
      )
    }
  ]
}: FeaturesSectionProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const activeTabData = tabs.find((tab) => tab.id === activeTabId) || tabs[0];
  const hasContentImage = !!activeTabData.contentImage;

  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. Top Stats Bar */}
        {topStats && topStats.length > 0 && (
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-y-6 md:gap-y-0 md:divide-x md:divide-gray-200 text-center">
            {topStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center px-4 md:px-8">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-800">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 2. Header & Description */}
        <div className="text-center max-w-7xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl  text-gray-800 bungee-shade tracking-tight leading-tight">
            {heading}
          </h2>
          <div className="text-base md:text-lg text-gray-600 leading-relaxed">
            {description}
          </div>
        </div>

        {/* 3. Interactive Sidebar & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-8">
          
          {/* Left Sidebar (Tabs) */}
          <div 
            className="lg:col-span-4 flex flex-col gap-2 relative" 
            role="tablist" 
            aria-label="Features navigation"
          >
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 flex items-center justify-between group z-10 ${
                    isActive ? "text-blue-700" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {/* Sliding Background Highlight */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabBackground" 
                      className="absolute inset-0 bg-blue-50/80 rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <span className={`text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                    {tab.label}
                  </span>
                  
                  {/* Animated Arrow */}
                  <motion.span 
                    animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
                    className="text-blue-600"
                  >
                    →
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabData.id}
                id={`panel-${activeTabData.id}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8 bg-white"
              >
                {/* Content Header (Icon + Title) */}
                <div className="flex items-center gap-4">
                  {activeTabData.lucideIcon && (
                    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
                      {activeTabData.lucideIcon}
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl bungee-shade text-gray-900 leading-tight">
                    {activeTabData.contentTitle}
                  </h3>
                </div>

                {/* Sub-Layout: Content Body */}
                <div className={`grid grid-cols-1 ${hasContentImage ? "md:grid-cols-[1fr_1.2fr] gap-8 items-center" : "max-w-4xl"}`}>
                  
                  {/* Left: Optional Image */}
                  {activeTabData.contentImage && (
                    <div className="relative w-full h-[300px] md:h-[350px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                      <Image 
                        src={activeTabData.contentImage} 
                        alt={activeTabData.contentTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Right: Text Content */}
                  <div className="text-gray-600 text-base md:text-lg leading-relaxed flex-1">
                    {activeTabData.content}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}




