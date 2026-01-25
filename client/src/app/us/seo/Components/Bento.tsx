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

const PhoneMockup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white border-[8px] border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative", className)}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-28 bg-slate-900 rounded-b-xl z-20" />
    <div className="bg-slate-50 h-full w-full text-slate-800 overflow-hidden relative">
      {children}
    </div>
  </div>
);

const AvatarCircle = ({ color, initial }: { color: string; initial: string }) => (
  <div className={cn("w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white", color)}>
    {initial}
  </div>
);

// Hero Card (Main SEO Strategy Card)
const HeroCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#0B2E5E] text-white",
    "relative lg:col-span-5 lg:row-span-2 min-h-[420px] lg:min-h-[450px] overflow-hidden flex flex-col p-0",
    className
  )}>
    <div className="relative z-10 mb-4">
      <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-white">
        Proven SEO Strategy That Drives Rankings & Revenue
      </h3>
      <p className="mt-2 text-sm md:text-base opacity-80 text-blue-100">
        Turn organic search into your most reliable growth channel with data-driven SEO that improves visibility, attracts high-intent traffic, and delivers measurable, long-term business results.
      </p>
    </div>
    <div className="relative w-[120%] left-1/2 -translate-x-1/2 -mb-8 z-10 pointer-events-none">
      <Image
        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769231930/BENTO_1_1_uovyz2.png"
        alt="SEO ranking dashboard and performance overview"
        width={1600}
        height={1600}
        priority
        sizes="(max-width: 1024px) 100vw, 900px"
        className="w-full h-auto object-cover object-bottom rounded-t-[32px]"
      />
    </div>
  </div>
);

// Local SEO Card
const LocalSeoCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[32px] p-6 md:p-4 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
    "lg:col-span-7 h-[300px] overflow-hidden p-0",
    className
  )}>
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="grid grid-cols-[2fr_1fr] h-full relative z-10">
      <div className="flex flex-col justify-center pl-8 pr-6">
        <h3 className="text-3xl font-semibold text-slate-900 leading-tight">
          Get More Local Leads
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-sm">
          Dominate local search results and attract high-intent customers near your business
          with location-focused SEO that converts.
        </p>
        <div className="mt-5 text-xs font-semibold text-blue-600">
          Local SEO • Google Maps • Nearby Searches
        </div>
      </div>
      <div className="h-full w-full">
        <img
          src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769236520/Bento_2_dzmst8.png"
          alt="Local SEO performance"
          className="h-full w-full object-cover scale-130  -translate-x-4 translate-y-4"
        />
      </div>
    </div>
  </div>
);


// Trusted By Card
const TrustedByCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
    "lg:col-span-3 flex flex-col justify-center items-center text-center",
    className
  )}>
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-slate-800">Trusted By<br/>130+ Businesses</h3>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="flex -space-x-3">
          <AvatarCircle color="bg-emerald-500" initial="S" />
          <AvatarCircle color="bg-indigo-500" initial="D" />
          <AvatarCircle color="bg-blue-500" initial="K" />
          <AvatarCircle color="bg-orange-500" initial="R" />
        </div>
        <div className="w-10 h-10 rounded-full bg-[#0B2E5E] text-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold">5</span>
            <Star size={8} fill="white" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-slate-700">
        <Star size={14} fill="#0B2E5E" className="text-[#0B2E5E]" />
        <span>Ranked over 20k+ Keywords </span>
      </div>
    </div>
  </div>
);

// Keyword Gap Card
const KeywordGapCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#0B2E5E] text-white",
    "lg:col-span-4 relative overflow-hidden",
    className
  )}>
    <div className="relative z-10 mb-4">
      <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-white">
        Keyword Gap Analysis
      </h3>
      <p className="mt-2 text-sm md:text-base opacity-80 text-blue-100">
        Find easy-to-rank keywords your competitors are missing.
      </p>
    </div>
    <div className="absolute bottom-[-20px] right-[-20px] w-48 h-32 bg-white rounded-xl shadow-2xl transform -rotate-12 flex flex-col justify-between p-4 z-10 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769237999/Ahrefs_Logo_hkrtzj.png"
            alt="Ahrefs"
            width={32}
            height={32}
            className="w-10 h-10 object-contain"
          />
        </div>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded">High Vol</span>
      </div>
      <div>
        <div className="text-sm font-bold text-slate-900">Keyword Volume</div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-gray-500">KD: 45%</span>
          <span className="text-[10px] font-bold text-green-600">Vol: 12k</span>
        </div>
      </div>
    </div>
    <div className="absolute bottom-[-30px] right-[50px] w-48 h-32 bg-gray-50 rounded-xl shadow-lg transform -rotate-[25deg] flex flex-col justify-between p-4 z-0">
      <div className="flex justify-between">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769237773/-1f98f505180d14739e58c06d7a11eae_lcekfo.png"
            alt="SEMrush"
            width={32}
            height={32}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="text-xs text-green-500 font-bold">+5 New</div>
      </div>
      <div className="text-sm font-bold text-slate-900 mt-4">Backlink Gap</div>
    </div>
  </div>
);

// // Technical SEO Card
// const TechnicalSeoCard = ({ className = "" }: { className?: string }) => (
//   <div className={cn(
//     "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
//     "lg:col-span-8 flex flex-row items-center justify-between min-h-[200px]",
//     className
//   )}>
//     <div className="max-w-md relative z-10">
//       <h3 className="text-3xl font-bold mb-3">Technical SEO<br/>With Pro Audits</h3>
//       <p className="text-blue-100 opacity-90 text-sm max-w-xs">
//         Automated crawling for broken links, core web vitals, and schema errors.
//       </p>
//     </div>
//     <div className="hidden md:flex bg-[#0B2E5E] p-4 pr-6 rounded-2xl items-center gap-4 shadow-xl transform rotate-[-2deg] border border-blue-400/30">
//       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner relative">
//         <Activity size={24} className="text-green-600" />
//         <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
//       </div>
//       <div>
//         <h4 className="font-bold text-lg">Site Health: 98%</h4>
//         <p className="text-[10px] text-gray-300 leading-tight mt-1">
//           0 Critical Errors found<br/>Core Web Vitals passed
//         </p>
//       </div>
//     </div>
//     <div className="absolute inset-0 z-0">
//       <div className="absolute -left-10 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
//       <div className="absolute right-0 bottom-0 w-full h-32 bg-gradient-to-t from-[#0B2E5E]/20 to-transparent" />
//     </div>
//   </div>
// );

const TechnicalSeoCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
    "lg:col-span-8 min-h-[200px]",
    className
  )}>
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
      <div className="max-w-sm space-y-2">
        <h3 className="text-3xl font-bold mb-3">Technical SEO<br/>With Pro Audits</h3>
        <p className="text-blue-100 opacity-90 text-sm">
          Automated crawling for broken links, core web vitals, and schema errors.
        </p>
        <p className="text-blue-50 text-sm leading-relaxed">
          Our advanced technical SEO audits identify and fix critical issues that prevent search engines from properly crawling and indexing your site. We monitor site health 24/7, ensuring peak performance and maximum visibility.
        </p>
        <div className="flex items-center gap-2 text-xs text-blue-200">
          <CheckCircle2 size={14} />
          <span>Real-time monitoring & alerts</span>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-3">
        <div className="flex bg-[#0B2E5E] p-4 pr-6 rounded-2xl items-center gap-4 shadow-xl transform rotate-[-2deg] border border-blue-400/30">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner relative">
            <Activity size={24} className="text-green-600" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Site Health: 98%</h4>
            <p className="text-[10px] text-gray-300 leading-tight mt-1">
              0 Critical Errors found<br/>Core Web Vitals passed
            </p>
          </div>
        </div>

        <div className="flex bg-[#0B2E5E] p-4 pr-6 rounded-2xl items-center gap-4 shadow-xl transform rotate-[1deg] border border-blue-400/30">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner relative">
            <LinkIcon size={24} className="text-blue-600" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border border-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Backlink Health: 94%</h4>
            <p className="text-[10px] text-gray-300 leading-tight mt-1">
              342 Quality Backlinks<br/>12 Toxic Links Removed
            </p>
          </div>
        </div>

        <div className="flex bg-[#0B2E5E] p-4 pr-6 rounded-2xl items-center gap-4 shadow-xl transform rotate-[-1deg] border border-blue-400/30">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner relative">
            <CheckCircle2 size={24} className="text-emerald-600" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Page Indexing: 96%</h4>
            <p className="text-[10px] text-gray-300 leading-tight mt-1">
              1,247 Pages Indexed<br/>52 Pages Pending
            </p>
          </div>
        </div>
      </div>
    </div>
{/* 
    <div className="absolute inset-0 z-0">
      <div className="absolute -left-10 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-0 w-full h-32 bg-gradient-to-t from-[#0B2E5E]/20 to-transparent" />
    </div> */}
  </div>
);


// Traffic Sources Card
// const TrafficSourcesCard = ({ className = "" }: { className?: string }) => (
//   <div className={cn(
//     "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
//     "lg:col-span-4",
//     className
//   )}>
//     <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
//     <div className="relative z-10 mb-4">
//       <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-slate-800">
//         Track Traffic Sources
//       </h3>
//       <p className="mt-2 text-sm md:text-base opacity-80 text-slate-600">
//         Analyze Direct, Organic, and Referral channels.
//       </p>
//     </div>
//     <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
//       <div>
//         <div className="text-xs font-semibold text-slate-500 mb-1">Traffic Share</div>
//         <div className="text-[10px] text-slate-400 mb-4">Organic is 80% of total traffic.</div>
//         <div className="flex flex-col items-center justify-center w-32 h-32 relative">
//           <div className="w-28 h-28 rounded-full bg-[conic-gradient(#3B82F6_75%,#E2E8F0_0)] relative flex items-center justify-center">
//             <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
//               <div className="flex text-[10px] text-green-500 font-bold items-center gap-1">
//                 <MousePointerClick size={12} /> 62%
//               </div>
//               <div className="text-lg font-bold text-slate-900">Organic</div>
//             </div>
//           </div>
//           <div className="absolute top-1 right-3 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
//           <div className="absolute bottom-2 left-4 w-3 h-3 bg-slate-200 rounded-full border-2 border-white" />
//         </div>
//       </div>
//     </div>
//   </div>
// );

const TrafficSourcesCard = ({ className = "" }: { className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-all duration-300 hover:shadow-lg flex flex-col bg-[#EFF6FF] text-slate-900 border border-blue-100",
    "lg:col-span-4",
    className
  )}>
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10 mb-4">
      <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-slate-800">
        Track Traffic Sources
      </h3>
      <p className="mt-2 text-sm md:text-base opacity-80 text-slate-600">
        Analyze Direct, Organic, and AI channels.
      </p>
    </div>
    <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div className="text-xs font-semibold text-slate-500 mb-1">Traffic Share</div>
      <div className="text-[10px] text-slate-400 mb-4">Organic + AI is 85% of total traffic.</div>
      
      <div className="flex items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center w-32 h-32 relative">
          <div className="w-28 h-28 rounded-full bg-[conic-gradient(#3B82F6_75%,#E2E8F0_0)] relative flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <div className="flex text-[10px] text-green-500 font-bold items-center gap-1">
                <MousePointerClick size={12} /> 62%
              </div>
              <div className="text-lg font-bold text-slate-900">Organic</div>
            </div>
          </div>
          <div className="absolute top-1 right-3 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
          <div className="absolute bottom-2 left-4 w-3 h-3 bg-slate-200 rounded-full border-2 border-white" />
        </div>

        <div className="flex flex-col items-center justify-center w-32 h-32 relative">
          <div className="w-28 h-28 rounded-full bg-[conic-gradient(#10B981_23%,#E2E8F0_0)] relative flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <div className="flex text-[10px] text-emerald-600 font-bold items-center gap-1">
                <Bot size={12} /> 23%
              </div>
              <div className="text-lg font-bold text-slate-900">ChatGPT</div>
            </div>
          </div>
          <div className="absolute top-1 right-3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          <div className="absolute bottom-2 left-4 w-3 h-3 bg-green-200 rounded-full border-2 border-white" />
        </div>
      </div>
    </div>
  </div>
);


export default function SeoBentoGrid() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-min">
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
