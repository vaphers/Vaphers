"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface HeroProps {
  badgeText?: string;
  badgeLink?: string;
  title: string;
  description: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  imageSrc?: string; 
  imageAlt?: string;
  showBadge?: boolean;
  showButtons?: boolean;
  className?: string;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);
  return isMobile;
};

export default function Hero({
  badgeText = "Explore our latest updates",
  badgeLink = "#",
  title,
  description,
  primaryBtnText = "Get Started",
  primaryBtnLink = "/",
  secondaryBtnText = "Contact Us",
  secondaryBtnLink = "/contact",
  imageSrc,
  imageAlt = "Hero Illustration",
  showBadge = true,
  showButtons = true,
  className = "",
}: HeroProps) {
  const isMobile = useIsMobile();

  return (
    <section 
      className={`
        relative mx-auto flex flex-col items-center justify-center 
        bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600 
        overflow-x-hidden
        /* Fix: Use calc to prevent horizontal scroll when using margins */
        w-full lg:w-[calc(100%-1.5rem)] 
        lg:-mt-28 lg:rounded-4xl lg:pb-20 lg:pt-40 
        ${className}
      `}
    >
      <div className="mt-10 md:mt-5"></div>
      
      {/* 1. Optional Badge */}
      {showBadge && (
        <div className="mb-7 flex items-center justify-start w-fit rounded-full border border-white/20 bg-white/5 p-1 px-4 backdrop-blur-sm">
          <span className="font-inter mr-3 text-sm font-medium text-gray-200">
            {badgeText}
          </span>
          <Link href={badgeLink} className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 transition-transform hover:scale-110">
            <svg width="14" height="14" viewBox="0 0 17 16" fill="none"><path d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      )}

      <div className="flex w-full flex-col items-center px-4 text-center">
        {/* 2. Title */}
        <h1 className="bungee-inline-regular relative z-10 max-w-5xl text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {isMobile ? title : title.split(" ").map((word, i) => (
            <motion.span 
              key={i} 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: i * 0.08 }} 
              className="mr-3 inline-block" // Reduced margin to prevent edge-pushing
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* 3. Description */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="relative z-10 mx-auto mt-6 max-w-2xl text-lg text-blue-100/80 md:text-xl"
        >
          {description}
        </motion.p>

        {/* 4. Buttons */}
        {showButtons && (
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryBtnLink}>
              <button className="min-w-[180px] rounded-lg bg-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-blue-400 cursor-pointer hover:shadow-blue-500/20 active:scale-95">
                {primaryBtnText}
              </button>
            </Link>
            <Link href={secondaryBtnLink}>
              <button className="min-w-[180px] rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition-all cursor-pointer hover:bg-white/20">
                {secondaryBtnText}
              </button>
            </Link>
          </div>
        )}

        {/* 5. Optional Image - Fixed Layout */}
        {imageSrc && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative z-10 mt-16 w-full max-w-6xl px-2 md:px-0"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-blue-950/50 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}




// How to use:

    // <Hero 
    //     // 1. Badge Customization
    //     showBadge={true}
    //     badgeText="Check out our SEO case studies"
    //     badgeLink="/case-studies"
        
    //     // 2. Main Content
    //     title="SEO Services That Transform Your Business"
    //     description="Grow your brand faster with data-driven digital marketing strategies designed to increase traffic, leads, and measurable revenue."
        
    //     // 3. Button Customization
    //     showButtons={true}
    //     primaryBtnText="View Pricing"
    //     primaryBtnLink="/pricing"
    //     secondaryBtnText="Book a Call"
    //     secondaryBtnLink="/contact"
        
    //     // 4. Image Customization (Optional)
    //     imageSrc="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1770818890/ChatGPT_Image_Feb_11_2026_07_37_55_PM_q9spwb.png"
    //     imageAlt="Vaphers SEO Dashboard Preview"
        
    //     // 5. Section override (Optional)
    //     className="my-10" 
    // />