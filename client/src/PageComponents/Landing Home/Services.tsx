"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link"; // 1. Added Link import

// Types - 2. Added link property
interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
  imageUrl: string;
  link: string; 
}

// 3. Added relative URLs to each service
const services: Service[] = [
  {
    id: "01",
    title: "SEARCH ENGINE OPTIMIZATION",
    description:
      "Command the top positions in search. We engineer SEO strategies that transform visibility into compounding organic revenue. From resolving complex technical hurdles to building unshakeable topical authority, we secure the rankings that drive sustainable, high-intent traffic to your brand.",
    color: "#2A59A3", 
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773481288/search-engine-optimization-Vaphers_w89yqk.jpg",
    link: "/seo-services",
  },
  {
    id: "02",
    title: "LOCAL SEARCH OPTIMIZATION",
    description:
      "Dominate your immediate market. We optimize your local digital footprint—from Google Business Profiles to hyper-local citations—ensuring Vaphers clients capture the 'near me' searches that drive high-intent foot traffic and inbound calls.",
    color: "#2A59A3", 
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773481288/Local-Search-Optimization-Vaphers_fe4gtt.jpg",
    link: "/seo-services/local-seo-services",
  },
  {
    id: "03",
    title: "LLM & AI SEO",
    description:
      "Future-proof your digital footprint. We optimize your content architecture to be naturally sourced and cited by leading generative AI assistants like ChatGPT and Gemini. By mastering entity association, we ensure your brand remains the absolute authority in the new era of AI-driven search.",
    color: "#2A59A3", 
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773481289/LLM-AI-SEO-Vaphers_vamwj8.jpg",
    link: "/seo-services/ai-seo-services",
  },
  {
    id: "04",
    title: "WEBSITE DESIGN & DEVELOPMENT",
    description:
      "Craft digital experiences that relentlessly convert. We merge intuitive user journeys with striking, modern aesthetics to build platforms that serve as your ultimate growth engine. Our web architecture guarantees blazing-fast load times, seamless responsiveness, and flawless user retention.",
    color: "#2A59A3", 
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773481289/WebsiteDesignServices_-_Vaphers_a6rb3g.jpg",
    link: "/website-development-services",
  },
  {
    id: "05",
    title: "GOOGLE ADS MANAGEMENT",
    description:
      "Maximize your ROI with precision-targeted search campaigns. We optimize complex bidding strategies, construct compelling ad copy, and refine landing page experiences to ensure you appear exactly when customers are searching—turning every ad dollar into measurable, bottom-line revenue growth.",
    color: "#2A59A3", 
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773481289/Google-Ads-Management-Vaphers_dlxpyw.jpg",
    link: "/ppc-marketing/google-ads-management-services",
  },
  {
    id: "06",
    title: "META ADS MANAGEMENT",
    description:
      "Engage and convert at scale across social platforms. We deploy scroll-stopping, data-driven creatives and leverage advanced machine learning audience targeting to aggressively scale your revenue on Facebook and Instagram, turning passive social scrollers into loyal, high-value customers.",
    color: "#2A59A3", 
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773482014/Meta-Ads-Management-Vaphers_ehf9k6.jpg",
    link: "/ppc-marketing/meta-ads-management-services",
  },
];

export default function ServicesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeService = services[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = services.length - 1;
      if (nextIndex >= services.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 30 : -30,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
    }),
  };

  return (
    <section className="relative w-full min-h-screen bg-[#fcfcfc] flex flex-col items-center py-10 lg:py-20 overflow-hidden font-sans">
      
      {/* 1. TOP THUMBNAILS NAVIGATION */}
      <div className="relative z-20 flex md:justify-center gap-4 md:gap-6 mb-12 md:mb-24 px-6 overflow-x-auto pb-6 max-w-5xl mx-auto scrollbar-hide snap-x snap-mandatory w-full">
        {services.map((service, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={service.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`relative flex-shrink-0 w-24 h-32 md:w-24 md:h-32 bg-white p-1.5 rounded-sm transition-all duration-300 focus:outline-none flex flex-col items-center justify-center snap-center ${
                isActive ? "shadow-md scale-105 md:scale-110 z-10" : "shadow-sm scale-100 opacity-60 hover:opacity-100"
              }`}
            >
              <div 
                className="w-full h-full relative overflow-hidden flex flex-col p-2"
                style={{ backgroundColor: service.color }}
              >
                <span className="text-white/60 text-[8px] uppercase tracking-wider mb-1 block w-full text-left">
                   #0{index + 1}
                </span>
                <span className="text-white font-sans text-[9px] font-semibold leading-tight text-left break-words line-clamp-3">
                  {service.title}
                </span>
                <div className="absolute bottom-0 right-0 w-full h-[40%]">
                   <img src={service.imageUrl} alt="" className="w-full h-full object-cover opacity-90" />
                </div>
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-thumbnail-outline"
                  className="absolute inset-0 border border-gray-400 rounded-sm pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-center min-h-[550px] md:min-h-[700px]">
        
        {/* Giant Background Letters */}
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none z-0 overflow-hidden w-full px-2 md:px-8 opacity-40">
          {['V', 'A', 'P', 'H', 'E', 'R', 'S'].map((letter, index) => (
            <span 
              key={index} 
              className="text-[14vw] md:text-[12vw] text-[#cfccc9] bungee-shade leading-none select-none"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Global Left Nav Arrow (Desktop) */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 lg:left-32 z-30 p-3 rounded-full border border-gray-400 bg-white/50 backdrop-blur-sm hover:bg-white transition-colors text-gray-600 focus:outline-none hidden md:flex"
        >
          <ArrowLeft size={20} strokeWidth={1} />
        </button>

        {/* The Animating Main Container */}
        <div className="relative w-full max-w-5xl h-auto md:h-[650px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-full h-auto md:absolute md:inset-0 md:h-full flex flex-col md:block shadow-xl md:shadow-none rounded-xl md:rounded-none overflow-hidden md:overflow-visible"
            >
              
              {/* IMAGE SIDE (Right) */}
              <div className="relative md:absolute md:right-[5%] md:top-1/2 md:-translate-y-1/2 w-full md:w-[50%] h-[350px] md:h-[650px] z-0 overflow-hidden">
                <img
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT SIDE (Left) */}
              <div
                className="relative md:absolute md:left-[5%] md:top-1/2 md:-translate-y-1/2 w-full md:w-[48%] h-auto md:h-[700px] p-8 md:p-10 lg:p-14 flex flex-col justify-center text-white z-10 md:[-webkit-mask-image:radial-gradient(circle_at_100%_50%,transparent_65px,black_66px)] md:[mask-image:radial-gradient(circle_at_100%_50%,transparent_65px,black_66px)] md:drop-shadow-[5px_15px_25px_rgba(0,0,0,0.15)]"
                style={{ backgroundColor: activeService.color }}
              >
                <div className="inline-block border border-white/50 rounded-full px-4 py-1 text-xs md:text-sm tracking-wide w-max mb-6">
                  Service {activeService.id}
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-sans font-bold tracking-tight leading-[1.15] mb-6 md:mb-8">
                  {activeService.title}
                </h3>
                
                <p className="text-white/90 leading-relaxed mb-10 md:mb-12 text-sm sm:text-base font-light">
                  {activeService.description}
                  <br /><br className="hidden md:block" />
                  <span className="opacity-80 hidden md:block text-sm">
                    - At Vaphers, every service we offer is designed to transform
                  </span>
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  
                  {/* 4. Swapped button for Link component here */}
                  <Link 
                    href={activeService.link}
                    className="flex items-center gap-2 md:gap-3 border border-white/60 rounded-full px-5 py-2 md:px-6 md:py-2.5 w-max hover:bg-white hover:text-black transition-all group"
                  >
                    <span className="text-xs md:text-sm tracking-wide font-light">Know More</span>
                    <ArrowDownRight size={16} strokeWidth={1} className="group-hover:rotate-[-45deg] transition-transform" />
                  </Link>

                  {/* Mobile Nav Arrows */}
                  <div className="flex gap-2 md:hidden">
                    <button onClick={() => paginate(-1)} className="p-2.5 rounded-full border border-white/40 hover:bg-white/10 transition-colors">
                      <ArrowLeft size={16} />
                    </button>
                    <button onClick={() => paginate(1)} className="p-2.5 rounded-full border border-white/40 hover:bg-white/10 transition-colors">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Right Nav Arrow (Desktop) */}
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 lg:right-32 z-30 p-3 rounded-full border border-gray-400 bg-white/50 backdrop-blur-sm hover:bg-white transition-colors text-gray-600 focus:outline-none hidden md:flex"
        >
          <ArrowRight size={20} strokeWidth={1} />
        </button>

      </div>
    </section>
  );
}