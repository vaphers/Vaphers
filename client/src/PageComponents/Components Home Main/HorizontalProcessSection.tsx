'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// =========================================
// CARD DATA
// =========================================

interface ProcessCard {
  id: string;
  stepNumber: string;
  title: string;
  subtext: string;
  bgColor: string;
  strokeColor: string;
  artType: 'chair' | 'blocks' | 'vase' | 'blueprint';
}

const STEPS = [
  'FIND AN OPPORTUNITY',
  'BUILD THE STRATEGY',
  'SHOW THE IMPACT',
  'CLOSE WITH CONFIDENCE',
];

const CARDS: ProcessCard[] = [
  {
    id: 'discover',
    stepNumber: '01.',
    title: 'Find an Opportunity',
    subtext:
      'We map affluent neighborhoods, identify high-intent search patterns, and position your studio where discerning homeowners are already looking.',
    bgColor: '#1D4D38',
    strokeColor: '#A3E635',
    artType: 'chair',
  },
  {
    id: 'strategy',
    stepNumber: '02.',
    title: 'Build the Strategy',
    subtext:
      'We architect bespoke marketing systems—editorial content, visual SEO, and AI search optimization—that convert casual browsers into consultation-ready opportunities.',
    bgColor: '#5E1E28',
    strokeColor: '#FBCFE8',
    artType: 'blocks',
  },
  {
    id: 'impact',
    stepNumber: '03.',
    title: 'Show the Impact',
    subtext:
      'Real-time dashboards track every inquiry, consultation booking, and signed contract back to its source—so you see which channels drive commissions.',
    bgColor: '#708CFB',
    strokeColor: '#FFFFFF',
    artType: 'vase',
  },
  {
    id: 'close',
    stepNumber: '04.',
    title: 'Close with Confidence',
    subtext:
      'Structured proposal workflows, automated follow-ups, and refined intake funnels ensure warm leads convert into signed retainers.',
    bgColor: '#E8710A',
    strokeColor: '#FFFFFF',
    artType: 'blueprint',
  },
];

// =========================================
// ANIMATED SVG LINE ART
// =========================================

const drawTransition = { duration: 2.2, ease: 'easeInOut' as const };
const floatTransition = { duration: 4, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const };

const CardArt: React.FC<{ type: ProcessCard['artType']; stroke: string }> = ({
  type,
  stroke,
}) => {
  const pathProps = {
    stroke,
    fill: 'none',
    strokeLinecap: 'round' as const,
  };

  switch (type) {
    case 'chair':
      return (
        <svg viewBox="0 0 240 260" fill="none" className="w-full h-full">
          {/* Animated lounge chair contour */}
          <motion.path
            d="M 50 150 C 45 130, 50 85, 75 60 C 95 40, 135 40, 155 65 C 170 85, 175 125, 185 145 C 195 160, 165 170, 130 168 C 95 166, 60 170, 50 150 Z"
            {...pathProps}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={drawTransition}
            viewport={{ once: true }}
          />
          {/* Cushion */}
          <motion.path
            d="M 68 128 C 85 110, 140 110, 165 130 C 145 145, 90 145, 68 128 Z"
            {...pathProps}
            strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 0.6 }}
            viewport={{ once: true }}
          />
          {/* Legs */}
          <motion.path
            d="M 75 165 L 60 200 M 160 165 L 175 200 M 100 167 L 95 200 M 140 167 L 145 200"
            {...pathProps}
            strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 1 }}
            viewport={{ once: true }}
          />
          {/* Floating gestural ground line */}
          <motion.path
            d="M 20 205 Q 60 195, 120 205 T 220 200"
            {...pathProps}
            strokeWidth="1.5"
            animate={{ d: [
              'M 20 205 Q 60 195, 120 205 T 220 200',
              'M 20 200 Q 60 210, 120 198 T 220 205',
              'M 20 205 Q 60 195, 120 205 T 220 200',
            ]}}
            transition={floatTransition}
          />
        </svg>
      );

    case 'blocks':
      return (
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full">
          {/* Top block — drops in */}
          <motion.rect
            x="105" y="25" width="50" height="45" rx="6"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          />
          {/* Middle row */}
          <motion.rect
            x="72" y="80" width="50" height="45" rx="6"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            viewport={{ once: true }}
          />
          <motion.rect
            x="132" y="80" width="50" height="45" rx="6"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          />
          {/* Bottom row */}
          <motion.rect
            x="40" y="135" width="50" height="45" rx="6"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            viewport={{ once: true }}
          />
          <motion.rect
            x="100" y="135" width="50" height="45" rx="6"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.rect
            x="160" y="135" width="50" height="45" rx="6"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            viewport={{ once: true }}
          />
          {/* Animated organic ground wave */}
          <motion.path
            d="M 20 205 C 50 195, 80 215, 130 203 C 180 191, 210 210, 245 205"
            stroke={stroke} strokeWidth="1.5" strokeLinecap="round" fill="none"
            animate={{ d: [
              'M 20 205 C 50 195, 80 215, 130 203 C 180 191, 210 210, 245 205',
              'M 20 208 C 50 215, 80 198, 130 210 C 180 200, 210 195, 245 208',
              'M 20 205 C 50 195, 80 215, 130 203 C 180 191, 210 210, 245 205',
            ]}}
            transition={floatTransition}
          />
        </svg>
      );

    case 'vase':
      return (
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full">
          {/* Vessel body — draw in */}
          <motion.path
            d="M 110 55 L 150 55 C 153 78, 175 108, 175 148 C 175 183, 155 198, 130 198 C 105 198, 85 183, 85 148 C 85 108, 107 78, 110 55 Z"
            {...pathProps}
            strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={drawTransition}
            viewport={{ once: true }}
          />
          {/* Lip ellipse */}
          <motion.ellipse
            cx="130" cy="55" rx="20" ry="5"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: true }}
          />
          {/* Animated branch swaying */}
          <motion.path
            d="M 130 53 C 125 30, 140 12, 150 5"
            {...pathProps}
            strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 1.5 }}
            viewport={{ once: true }}
          />
          <motion.circle
            cx="150" cy="5" r="4"
            stroke={stroke} strokeWidth="1.5" fill="none"
            animate={{ cy: [5, 2, 5] }}
            transition={floatTransition}
          />
          {/* Secondary branch */}
          <motion.path
            d="M 132 38 C 145 28, 162 32, 168 20"
            {...pathProps}
            strokeWidth="1.5"
            animate={{ d: [
              'M 132 38 C 145 28, 162 32, 168 20',
              'M 132 38 C 148 25, 158 35, 170 22',
              'M 132 38 C 145 28, 162 32, 168 20',
            ]}}
            transition={floatTransition}
          />
          {/* Ground line */}
          <motion.path
            d="M 50 198 L 210 198"
            stroke={stroke} strokeWidth="1.2" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            viewport={{ once: true }}
          />
        </svg>
      );

    case 'blueprint':
      return (
        <svg viewBox="0 0 260 260" fill="none" className="w-full h-full">
          {/* Isometric room — draw in */}
          <motion.path
            d="M 130 25 L 210 70 L 210 160 L 130 205 L 50 160 L 50 70 Z"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={drawTransition}
            viewport={{ once: true }}
          />
          <motion.path
            d="M 130 25 L 130 115 L 210 160 M 130 115 L 50 160"
            stroke={stroke} strokeWidth="1.8" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 0.8 }}
            viewport={{ once: true }}
          />
          {/* Animated pulsing dashed grid lines */}
          <motion.path
            d="M 90 47 L 90 138"
            stroke={stroke} strokeWidth="1.2" strokeDasharray="4 3" fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            viewport={{ once: true }}
            animate={{ opacity: [0.4, 1, 0.4] }}
          />
          <motion.path
            d="M 170 47 L 170 138"
            stroke={stroke} strokeWidth="1.2" strokeDasharray="4 3" fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            viewport={{ once: true }}
            animate={{ opacity: [0.4, 1, 0.4] }}
          />
          {/* Animated pulsing center point */}
          <motion.circle
            cx="130" cy="115" r="4"
            fill={stroke}
            animate={{ r: [4, 6, 4], opacity: [1, 0.6, 1] }}
            transition={{ ...floatTransition, duration: 2.5 }}
          />
          {/* Accent markers */}
          <motion.rect
            x="118" y="25" width="4" height="4" fill={stroke} rx="1"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ ...floatTransition, duration: 3 }}
          />
          <motion.rect
            x="200" y="67" width="4" height="4" fill={stroke} rx="1"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ ...floatTransition, duration: 3 }}
          />
        </svg>
      );
  }
};

// =========================================
// MAIN COMPONENT
// =========================================

export default function HorizontalProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.5) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  const handleStepClick = (index: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + totalScroll * (index / (CARDS.length - 1)),
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F9F8F4] montserrat-regular"
      style={{ height: '320vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-20 h-full flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16 py-12 sm:py-16 md:py-20">

          {/* ===== LEFT COLUMN ===== */}
          <div className="w-full lg:w-[36%] xl:w-[32%] flex flex-col justify-between shrink-0 z-10">

            <div className="space-y-5 md:space-y-6">
              {/* Heading */}
              <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] lg:text-[3.2rem] font-normal text-[#1a1a1a] leading-[1.1] tracking-[-0.02em]">
                From first inquiry to signed design commission.
              </h2>

              <p className="text-base sm:text-lg font-medium text-[#1a1a1a] leading-snug">
                Clients get instant clarity on scope & vision. You stay in creative control.
              </p>

              <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed">
                We bridge high-aesthetic portfolio storytelling with precision search positioning—local SEO, AI citations, and editorial content—so every inquiry that reaches your calendar is pre-qualified, high-budget, and ready to commission.
              </p>
            </div>

            {/* Step Indicator Navigation */}
            <div className="pt-8 lg:pt-0 flex flex-col items-start gap-2">
              {STEPS.map((label, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={label}
                    onClick={() => handleStepClick(idx)}
                    className={`transition-all duration-300 text-left cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#1D4D38] text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] px-4 py-2.5 rounded-full'
                        : 'text-[#999999] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] px-1 py-1.5 hover:text-[#555555]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== RIGHT COLUMN: Scrolling Cards ===== */}
          <div className="w-full lg:w-[64%] xl:w-[68%] h-full flex items-center overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex items-stretch gap-5 sm:gap-6 md:gap-7 will-change-transform"
            >
              {CARDS.map((card) => (
                <div
                  key={card.id}
                  style={{ backgroundColor: card.bgColor }}
                  className="w-[300px] sm:w-[340px] md:w-[370px] h-[420px] sm:h-[480px] md:h-[530px] rounded-lg flex flex-col justify-between shrink-0 relative overflow-hidden"
                >
                  {/* Number Badge */}
                  <div className="p-4 sm:p-5 relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm text-white/90 font-bold text-xs sm:text-sm px-2.5 py-1.5 rounded-md w-fit font-mono">
                      {card.stepNumber}
                    </div>
                  </div>

                  {/* Center Art */}
                  <div className="flex-1 flex items-center justify-center px-5 sm:px-6 relative z-10">
                    <CardArt type={card.artType} stroke={card.strokeColor} />
                  </div>

                  {/* Bottom Banner */}
                  <div className="bg-black/25 backdrop-blur-sm border-t border-white/10 px-5 sm:px-6 py-4 sm:py-5 relative z-10">
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/70 mt-1.5 leading-relaxed line-clamp-2">
                      {card.subtext}
                    </p>
                  </div>
                </div>
              ))}

              <div className="w-16 sm:w-24 shrink-0" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
