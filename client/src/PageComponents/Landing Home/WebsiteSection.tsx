'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// =========================================
// 1. DATA
// =========================================

const gridProjects = [
  {
    id: 1,
    title: 'Oraanj Interior Designs',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1788801541/Oraanj_Interiors_Design_bd8exo.png',
    url: 'https://oraanj-interiors.co.uk/',
  },
  {
    id: 2,
    title: 'Contekst',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1788801506/Contekst_o2pipv.png',
    url: "https://www.contekst.be/"
  },
  {
    id: 3,
    title: 'Luxoria',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1788801474/Luxoria_1_caa7j2.png',
    url: "https://www.luxoria.fr/"
  },
  {
    id: 4,
    title: 'Maison Moghadam',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1788801500/MaisonMoghadam_vs9nx6.png',
    url: "https://www.maisonmoghadam.com/"
  },
];

// =========================================
// 1st Section: Luxury Portfolio Growth Tool (Spring-Animated Drawer Table)
// =========================================

interface PortfolioFeature {
  step: string;
  title: string;
  subtitle: string;
}

const PORTFOLIO_FEATURES: PortfolioFeature[] = [
  {
    step: '01.',
    title: 'Close More High-Budget Projects',
    subtitle: 'Quickly filter and capture high-intent luxury design commissions',
  },
  {
    step: '02.',
    title: 'Editorial Spatial Storytelling',
    subtitle: 'Bespoke layouts engineered to showcase completed spatial transformations',
  },
  {
    step: '03.',
    title: 'Show the Craftsmanship',
    subtitle: 'Cinematic media presentations that make your design caliber undeniable',
  },
  {
    step: '04.',
    title: 'High-Intent Client Funnels',
    subtitle: 'Proven ROI: one single signed project covers your entire annual investment',
  },
  {
    step: '05.',
    title: 'Always-On Digital Gallery',
    subtitle: 'Your studio answers client aesthetic queries 24/7 in an elevated space',
  },
  {
    step: '06.',
    title: 'Elevate Studio Prestige',
    subtitle: 'Command 20-30% higher design retainers without client fee resistance',
  },
];

// Single sliding drawer row — badge pops out from behind the card edge
const DrawerRow: React.FC<{
  feature: PortfolioFeature;
  index: number;
  progress: any;
  startThreshold: number;
  endThreshold: number;
  isFirst: boolean;
  isLast: boolean;
}> = ({
  feature,
  index,
  progress,
  startThreshold,
  endThreshold,
  isFirst,
  isLast,
}) => {
  // Content card slides in from right with increasing stagger offset
  const initialOffset = 160 + index * 30;
  const cardX = useTransform(
    progress,
    [startThreshold, endThreshold],
    [initialOffset, 0]
  );
  const cardOpacity = useTransform(
    progress,
    [startThreshold, startThreshold + 0.04],
    [0, 1]
  );

  // Badge pops out from behind the left wall of the card
  // Starts tucked behind (x: 48px) and slides to resting position (x: 0)
  // Delayed slightly after card begins arriving
  const badgeStart = startThreshold + 0.03;
  const badgeEnd = endThreshold;
  const badgeX = useTransform(
    progress,
    [badgeStart, badgeEnd],
    [48, 0]
  );
  const badgeOpacity = useTransform(
    progress,
    [badgeStart, badgeStart + 0.04],
    [0, 1]
  );
  const badgeScale = useTransform(
    progress,
    [badgeStart, badgeEnd],
    [0.6, 1]
  );

  return (
    <div className="flex items-stretch relative w-full overflow-visible group">
      {/* Badge Slot — overflow-hidden clips badge so it pops from behind the card edge */}
      <div
        className={`w-18 sm:w-22 md:w-24 bg-[#EEF2FC] border-[1.5px] border-black flex items-center justify-center p-2.5 sm:p-3 shrink-0 z-10 overflow-hidden ${
          isFirst ? 'rounded-tl-2xl' : ''
        } ${isLast ? 'rounded-bl-2xl' : ''} ${!isLast ? 'border-b-0' : ''}`}
      >
        <motion.div
          style={{ x: badgeX, opacity: badgeOpacity, scale: badgeScale }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#7B92FA] text-white font-bold text-xs sm:text-sm flex items-center justify-center font-mono shadow-sm"
        >
          {feature.step}
        </motion.div>
      </div>

      {/* Sliding Content Drawer */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity }}
        className={`flex-1 bg-white border-[1.5px] border-black border-l-0 px-5 sm:px-6 py-4 sm:py-4.5 flex flex-col justify-center z-20 ${
          isFirst ? 'rounded-tr-2xl' : ''
        } ${isLast ? 'rounded-br-2xl' : ''} ${
          !isLast ? 'border-b-0' : ''
        } shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-colors duration-200 group-hover:bg-[#FCFDFF]`}
      >
        <h4 className="text-[15px] sm:text-[16.5px] font-bold text-[#111111] leading-snug montserrat-semibold">
          {feature.title}
        </h4>
        <p className="text-[12.5px] sm:text-[13.5px] text-[#555555] leading-normal montserrat-regular mt-1">
          {feature.subtitle}
        </p>
      </motion.div>
    </div>
  );
};

const DesignPartnerSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll through the tall runway — animation is 1:1 with scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Phase 1 (0% - 12%): Entire right column fades/scales in as a unit
  const containerOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const containerScale = useTransform(scrollYProgress, [0, 0.12], [0.92, 1]);
  const containerY = useTransform(scrollYProgress, [0, 0.12], [40, 0]);

  // Phase 2 (12% - 75%): Individual rows cascade in with staggered timing
  const rowThresholds = [
    { start: 0.12, end: 0.26 },
    { start: 0.22, end: 0.36 },
    { start: 0.32, end: 0.46 },
    { start: 0.42, end: 0.56 },
    { start: 0.52, end: 0.66 },
    { start: 0.62, end: 0.75 },
  ];

  return (
    // Outer wrapper creates the scroll runway — tall enough to drive the animation
    <div ref={containerRef} className="relative" style={{ height: '250vh' }}>
      {/* Sticky inner — stays pinned to viewport while scroll drives animation */}
      <div className="sticky top-0 h-screen w-full bg-[#F9F8F4] montserrat-regular overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-6 space-y-6 flex flex-col items-start text-left z-10">
              {/* Eyebrow */}
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a1a1a] block montserrat-semibold">
                ECONOMIC VALUE
              </span>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-[#1a1a1a] leading-[1.12] tracking-tight montserrat-regular">
                We Design Luxury Design Portfolios — It&apos;s a Growth Tool
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#444444] leading-relaxed max-w-lg montserrat-regular">
                Your studio website is designed to attract multi-million dollar commissions, not just showcase images. One additional closed project can more than cover the entire digital investment.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="https://www.vaphers.com/contact"
                  className="inline-block"
                >
                  <button className="bg-[#48BB36] border-2 border-black rounded-xl px-7 sm:px-8 py-3.5 sm:py-4 text-white font-semibold text-sm sm:text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer">
                    Explore Studio Web Design
                  </button>
                </a>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            {/* Whole container animates in first, then rows cascade */}
            <motion.div
              style={{
                opacity: containerOpacity,
                scale: containerScale,
                y: containerY,
              }}
              className="lg:col-span-6 flex justify-center lg:justify-end relative w-full overflow-visible origin-top-right"
            >
              <div className="w-full max-w-[560px] flex flex-col relative overflow-visible">
                {PORTFOLIO_FEATURES.map((feature, idx) => (
                  <DrawerRow
                    key={feature.step}
                    feature={feature}
                    index={idx}
                    progress={scrollYProgress}
                    startThreshold={rowThresholds[idx].start}
                    endThreshold={rowThresholds[idx].end}
                    isFirst={idx === 0}
                    isLast={idx === PORTFOLIO_FEATURES.length - 1}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================
// 2nd Section
// =========================================

const AboutSection = () => {
  return (
    <section className="relative flex lg:min-h-screen w-full items-center justify-center bg-blue-600 px-4 sm:px-6 py-14 sm:py-20 lg:py-24 text-white overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl items-start gap-4 sm:gap-6 md:gap-12">
        <div className="mt-2 md:mt-4 h-2.5 w-2.5 sm:h-4 sm:w-4 shrink-0 bg-white" />
        <div className="flex flex-col gap-5 sm:gap-8 md:gap-10">
          {/* Scaled down to text-xl for smallest screens */}
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.3] md:leading-[1.15] tracking-tight">
            We’re Vaphers – a strategic creative agency blending high-aesthetic portfolio design with data-driven growth for interior designers.
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.3] md:leading-[1.15] tracking-tight text-blue-200">
            We craft exceptional digital portfolio experiences and luxury design websites that command prestige and attract high-budget clients.
          </p>
        </div>
      </div>
    </section>
  );
};

// =========================================
// 3rd Section
// =========================================

const ProjectGrid = () => {
  return (
    <section className="w-full bg-white px-4 py-12 sm:py-16 md:py-24 md:px-8 z-20 relative shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
        {gridProjects.map((project) => {
          const isOraanj =
            project.title.toLowerCase().includes('oraanj') ||
            project.url.toLowerCase().includes('oraanj');
          const rel = isOraanj
            ? 'noopener noreferrer'
            : 'nofollow noopener noreferrer';

          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel={rel}
              className="group relative aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-xl md:rounded-none border-[1.5px] border-gray-500 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-transform duration-700 cursor-pointer block"
            >
              <img
                src={project.src}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 bg-white px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest border-t-[1.5px] border-l-[1.5px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all montserrat-semibold">
                → {project.title}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

// =========================================
// 6. MAIN PAGE
// =========================================

export default function Home() {
  return (
    <div className="w-full bg-white relative">
      <DesignPartnerSection />

      <div className="relative lg:sticky top-0 z-10 w-full bg-blue-600">
        <AboutSection />
      </div>

      <div className="relative z-20 w-full bg-white">
        <ProjectGrid />
      </div>
    </div>
  );
}