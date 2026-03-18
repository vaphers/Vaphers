'use client'

import React from 'react';
import { 
  Search, 
  BarChart2, 
  Globe, 
  Link as LinkIcon, 
  Star, 
  ArrowUpRight, 
  CheckCircle2, 
  MousePointerClick,
  Activity,
  Zap,
  Bot
} from 'lucide-react';
import Image from 'next/image';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const AvatarCircle = ({ color, initial }: { color: string; initial: string }) => (
  <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-white", color)}>
    {initial}
  </div>
);

// Hero Card (Main SEO Strategy Card)
const HeroCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#0B2E5E] text-white",
    "lg:col-span-5 lg:row-span-2 min-h-[350px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[450px] p-0",
    className
  )}>
    <div className="relative z-10 mb-2 sm:mb-4 px-5 pt-5 sm:px-6 sm:pt-6 md:px-8 md:pt-8">
      {/* Scaled typography down for tiny screens */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight text-white">
        Tested SEO Strategies That Drive Rankings & Revenue
      </h3>
      <p className="mt-2 text-xs sm:text-sm md:text-base opacity-80 text-blue-100 leading-relaxed">
        We turn organic search into your most reliable growth channel with data-driven SEO that improves visibility, attracts high-intent traffic, and delivers measurable business results.
      </p>
    </div>
    {/* FIXED: Reduced width on mobile to prevent horizontal overflow, kept w-[120%] on desktop */}
    <div className="relative w-[105%] sm:w-[110%] lg:w-[120%] left-1/2 -translate-x-1/2 mt-auto -mb-4 sm:-mb-8 z-10 pointer-events-none origin-bottom">
      <Image
        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769231930/BENTO_1_1_uovyz2.png"
        alt="SEO ranking dashboard and performance overview"
        width={1600}
        height={1600}
        priority
        sizes="(max-width: 1024px) 100vw, 900px"
        className="w-full h-auto object-cover object-bottom rounded-t-[24px] sm:rounded-t-[32px]"
      />
    </div>
  </div>
);

// Local SEO Card
const LocalSeoCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[24px] sm:rounded-[32px] transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
    "lg:col-span-7 h-auto md:h-[300px]",
    className
  )}>
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-full relative z-10">
      <div className="flex flex-col justify-center p-5 sm:p-6 md:pl-8 md:pr-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 leading-tight">
          Drive More Local Leads
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
          We help you dominate local search results and attract high-intent customers near your business
          with custom location-focused SEO that converts.
        </p>
        {/* Adjusted tracking/wrapping for mobile */}
        <div className="mt-4 sm:mt-5 text-[10px] sm:text-xs font-semibold text-blue-600 tracking-wide sm:tracking-normal">
          Local SEO • Google Maps • Nearby Searches
        </div>
      </div>
      {/* FIXED: Added a set height for mobile and forced the image to object-contain so nothing is cut off */}
      <div className="h-40 sm:h-48 md:h-full w-full relative overflow-hidden md:overflow-visible flex items-end md:items-center justify-end">
        <img
          src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769236520/Bento_2_dzmst8.png"
          alt="Local SEO performance"
          className="absolute inset-0 h-full w-full object-cover sm:object-cover md:object-cover object-left-top sm:object-top md:scale-130 md:-translate-x-4 md:translate-y-4"
        />
      </div>
    </div>
  </div>
);

// Trusted By Card
const TrustedByCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
    "lg:col-span-3 flex flex-col justify-center items-center text-center",
    className
  )}>
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-tight">Trusted By<br/>210+ Businesses</h3>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="flex -space-x-2 sm:-space-x-3">
          <AvatarCircle color="bg-emerald-500" initial="S" />
          <AvatarCircle color="bg-indigo-500" initial="D" />
          <AvatarCircle color="bg-blue-500" initial="K" />
          <AvatarCircle color="bg-orange-500" initial="R" />
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0B2E5E] text-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] font-bold leading-none mt-1">5</span>
            <Star size={8} fill="white" className="sm:w-[10px] sm:h-[10px]" />
          </div>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1 text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700">
        <Star size={12} fill="#0B2E5E" className="text-[#0B2E5E] sm:w-[14px] sm:h-[14px]" />
        <span>Ranked over 20k+ Keywords </span>
      </div>
    </div>
  </div>
);

// Keyword Gap Card
const KeywordGapCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#0B2E5E] text-white min-h-[220px] sm:min-h-[250px]",
    "lg:col-span-4",
    className
  )}>
    <div className="relative z-10 mb-4">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight text-white">
        Keyword Gap Analysis
      </h3>
      {/* Removed the max-w-[80%] on mobile so text uses full width */}
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base opacity-80 text-blue-100 w-full sm:max-w-[80%] leading-relaxed">
        Our team uncovers the easy-to-rank keywords your competitors are currently missing.
      </p>
    </div>
    
    {/* Scaled heavily for mobile to prevent overflow on tiny screens */}
    <div className="absolute bottom-[-5px] sm:bottom-[-10px] md:bottom-[-20px] right-[-5px] sm:right-[-10px] md:right-[-20px] w-40 sm:w-48 h-28 sm:h-32 bg-white rounded-xl shadow-2xl transform -rotate-12 flex flex-col justify-between p-3 sm:p-4 z-10 border border-gray-200 scale-[0.7] sm:scale-90 md:scale-100 origin-bottom-right">
      <div className="flex justify-between items-start">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769237999/Ahrefs_Logo_hkrtzj.png"
            alt="Ahrefs"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        </div>
        <span className="text-[9px] sm:text-[10px] text-gray-400 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">High Vol</span>
      </div>
      <div>
        <div className="text-xs sm:text-sm font-bold text-slate-900 leading-none">Keyword Volume</div>
        <div className="flex justify-between items-center mt-1.5 sm:mt-2">
          <span className="text-[9px] sm:text-[10px] text-gray-500">KD: 45%</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-green-600">Vol: 12k</span>
        </div>
      </div>
    </div>

    <div className="absolute bottom-[-15px] sm:bottom-[-20px] md:bottom-[-30px] right-[40px] md:right-[50px] w-40 sm:w-48 h-28 sm:h-32 bg-gray-50 rounded-xl shadow-lg transform -rotate-[25deg] flex flex-col justify-between p-3 sm:p-4 z-0 scale-[0.7] sm:scale-90 md:scale-100 origin-bottom-right">
      <div className="flex justify-between items-center">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769237773/-1f98f505180d14739e58c06d7a11eae_lcekfo.png"
            alt="SEMrush"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        </div>
        <div className="text-[10px] sm:text-xs text-green-500 font-bold">+5 New</div>
      </div>
      <div className="text-xs sm:text-sm font-bold text-slate-900 mt-2 sm:mt-4 leading-none">Backlink Gap</div>
    </div>
  </div>
);

// Technical SEO Card
const TechnicalSeoCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
    "lg:col-span-8 min-h-[200px]",
    className
  )}>
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 relative z-10">
      <div className="max-w-sm space-y-2.5 sm:space-y-3">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Expert Technical SEO<br className="hidden md:block"/> & Deep Site Audits</h3>
        <p className="text-blue-100 opacity-90 text-xs sm:text-sm leading-relaxed">
          Our specialists manually resolve broken links, core web vitals, and complex schema errors.
        </p>
        <p className="text-blue-50 text-xs md:text-sm leading-relaxed hidden sm:block">
          Our technical SEO services go far beyond basic automated tools. We dive deep into your website's architecture to manually identify and permanently fix the critical backend issues that prevent search engines from properly crawling, indexing, and ranking your highest-converting pages.
        </p>
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-blue-200 mt-1 sm:mt-2 font-medium">
          <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
          <span>Continuous site monitoring & maintenance</span>
        </div>
      </div>

      {/* Stats side - stacked naturally on mobile, scaled correctly */}
      <div className="flex flex-col gap-2.5 sm:gap-3 w-full md:w-auto mt-2 md:mt-0">
        <div className="flex bg-[#0B2E5E] p-2.5 sm:p-3 md:p-4 pr-3 sm:pr-4 md:pr-6 rounded-xl sm:rounded-2xl items-center gap-3 md:gap-4 shadow-xl md:transform md:rotate-[-2deg] border border-blue-400/30">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-inner relative flex-shrink-0">
            <Activity size={16} className="text-green-600 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <div className="absolute top-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border border-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base md:text-lg leading-none mb-1">Target Health: 98%</h4>
            <p className="text-[9px] sm:text-[10px] text-gray-300 leading-tight">
              0 Critical Errors left<br className="hidden sm:block"/> Core Web Vitals passed
            </p>
          </div>
        </div>

        <div className="flex bg-[#0B2E5E] p-2.5 sm:p-3 md:p-4 pr-3 sm:pr-4 md:pr-6 rounded-xl sm:rounded-2xl items-center gap-3 md:gap-4 shadow-xl md:transform md:rotate-[1deg] border border-blue-400/30">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-inner relative flex-shrink-0">
            <LinkIcon size={16} className="text-blue-600 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <div className="absolute top-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-blue-500 rounded-full border border-white" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base md:text-lg leading-none mb-1">Link Profile: 94%</h4>
            <p className="text-[9px] sm:text-[10px] text-gray-300 leading-tight">
              342 Quality Backlinks<br className="hidden sm:block"/> 12 Toxic Links Disavowed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Traffic Sources Card
const TrafficSourcesCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
    "lg:col-span-4",
    className
  )}>
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10 mb-3 sm:mb-4 text-center md:text-left">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight text-slate-800">
        Transparent Reporting
      </h3>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base opacity-80 text-slate-600">
        We track your Direct, Organic, and AI growth.
      </p>
    </div>
    
    <div className="mt-2 sm:mt-4 md:mt-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-4 md:p-5 shadow-sm border border-slate-100 relative z-10 flex flex-col justify-center items-center md:items-start">
      <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-0.5 sm:mb-1 w-full text-center md:text-left">Traffic Share</div>
      <div className="text-[9px] sm:text-[10px] text-slate-400 mb-3 sm:mb-4 w-full text-center md:text-left">Organic + AI is 85% of total traffic.</div>
      
      {/* FIXED: Reduced ring sizes so they fit side-by-side on tiny screens */}
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full">
        
        {/* Ring 1 */}
        <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[conic-gradient(#3B82F6_75%,#E2E8F0_0)] relative flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <div className="flex text-[8px] sm:text-[10px] text-green-500 font-bold items-center gap-0.5 sm:gap-1">
                <MousePointerClick size={10} className="sm:w-3 sm:h-3" /> 62%
              </div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-tight">Organic</div>
            </div>
          </div>
          <div className="absolute top-0 right-1 sm:top-1 sm:right-2 md:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full border-2 border-white" />
        </div>

        {/* Ring 2 */}
        <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[conic-gradient(#10B981_23%,#E2E8F0_0)] relative flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <div className="flex text-[8px] sm:text-[10px] text-emerald-600 font-bold items-center gap-0.5 sm:gap-1">
                <Bot size={10} className="sm:w-3 sm:h-3" /> 23%
              </div>
              <div className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-tight">ChatGPT</div>
            </div>
          </div>
          <div className="absolute top-0 right-1 sm:top-1 sm:right-2 md:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white" />
        </div>

      </div>
    </div>
  </div>
);

export default function SeoBentoGrid() {
  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans">
      {/* Reduced grid gap slightly on mobile so cards aren't floating in space */}
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-min">
        <HeroCard />
        <LocalSeoCard />
        <TrustedByCard />
        <KeywordGapCard />
        <TechnicalSeoCard />
        <TrafficSourcesCard />
      </div>
    </div>
  );
}