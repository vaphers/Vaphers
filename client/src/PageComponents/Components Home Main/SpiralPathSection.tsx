'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';

// =========================================
// TYPES & 4-CARD DATA
// =========================================

interface JourneyCard {
  id: string;
  question: string;
  body: string;
  subNote: string;
  headerBg: string;
  positionClasses: string;
  revealThreshold: number;
}

const JOURNEY_CARDS: JourneyCard[] = [
  {
    id: 'discovery',
    question: 'How do ultra-wealthy clients discover premier interior design studios?',
    body: 'High-net-worth homeowners, developers, and estate managers do not respond to generic ads or aggressive sales funnels. They search discreetly—seeking verified design authority, published architectural features, and neighborhood-specific pedigree before ever initiating a conversation.',
    subNote: 'Over 80% of multi-million dollar residential commissions originate from private, high-intent search and editorial discovery.',
    headerBg: '#7D93FC', // periwinkle blue matching reference
    positionClasses: 'top-[40px] right-4 sm:right-8 lg:right-[5%] max-w-[420px]',
    revealThreshold: 0.12,
  },
  {
    id: 'visual-seo',
    question: 'Why do top studios prioritize visual search over traditional paid ads?',
    body: 'Traditional paid ads often attract discount seekers and price-sensitive shoppers. Visual and editorial SEO ranks your actual completed living spaces, custom millwork, and signature aesthetics for affluent locale searches—attracting clients who already revere your design language.',
    subNote: 'Curated portfolio indexing establishes your studio as an architectural institution rather than an interchangeable service.',
    headerBg: '#C2B28F', // warm tan/khaki matching reference left card
    positionClasses: 'top-[160px] left-4 sm:left-8 lg:left-[5%] max-w-[420px]',
    revealThreshold: 0.35,
  },
  {
    id: 'referral-asset',
    question: 'How do elite studios eliminate dependency on word-of-mouth referrals?',
    body: 'Referrals are invaluable, but they are inherently unpredictable. Leading design studios treat search visibility as a sovereign digital asset that consistently delivers 3–5 pre-qualified luxury project inquiries every quarter, insulating the firm from seasonal real estate swings.',
    subNote: 'Compounding search equity transforms an unpredictable studio pipeline into a predictable calendar of high-ticket retainers.',
    headerBg: '#7D93FC', // periwinkle blue matching reference
    positionClasses: 'top-[640px] right-4 sm:right-8 lg:right-[8%] max-w-[420px]',
    revealThreshold: 0.60,
  },
  {
    id: 'premium-fees',
    question: 'How does elevated digital positioning justify premium six-figure design fees?',
    body: 'When an affluent client encounters a studio through dominant search rankings, impeccable visual presentation, and authoritative architectural insights, price resistance completely dissolves. The elevated digital presence itself signals uncompromising luxury and bespoke exclusivity.',
    subNote: 'Positioning dictates pricing power: luxury clients willingly invest in studios whose digital authority is beyond dispute.',
    headerBg: '#969DE0', // soft slate lavender
    positionClasses: 'top-[760px] left-4 sm:left-8 lg:left-[6%] max-w-[420px]',
    revealThreshold: 0.82,
  },
];

// =========================================
// ENLARGED HAND-DRAWN SCRIBBLE BALL SVG
// =========================================

const ScribbleBall: React.FC<{ rotation?: number }> = ({ rotation = 0 }) => {
  return (
    <g transform={`rotate(${rotation})`} className="cursor-default overflow-visible">
      {/* Outer subtle shadow aura */}
      <circle r="68" fill="rgba(0,0,0,0.03)" />

      {/* Primary tangled outer loops (~135px diameter) */}
      <ellipse rx="62" ry="54" stroke="#1a1a1a" strokeWidth="1.8" fill="none" transform="rotate(18)" />
      <ellipse rx="54" ry="60" stroke="#1a1a1a" strokeWidth="1.6" fill="none" transform="rotate(-35)" />
      <ellipse rx="46" ry="58" stroke="#1a1a1a" strokeWidth="1.7" fill="none" transform="rotate(52)" />
      <ellipse rx="62" ry="38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" transform="rotate(-15)" />
      <ellipse rx="38" ry="54" stroke="#1a1a1a" strokeWidth="1.8" fill="none" transform="rotate(78)" />
      <ellipse rx="52" ry="34" stroke="#1a1a1a" strokeWidth="1.5" fill="none" transform="rotate(-50)" />

      {/* Mid-density structural loops */}
      <circle r="30" stroke="#1a1a1a" strokeWidth="2.0" fill="none" />
      <ellipse rx="26" ry="40" stroke="#1a1a1a" strokeWidth="1.6" fill="none" transform="rotate(28)" />
      <ellipse rx="50" ry="24" stroke="#1a1a1a" strokeWidth="1.4" fill="none" transform="rotate(-65)" />
      <ellipse rx="34" ry="46" stroke="#1a1a1a" strokeWidth="1.7" fill="none" transform="rotate(110)" />

      {/* Intricate inner core sketch lines */}
      <circle r="16" stroke="#1a1a1a" strokeWidth="2.2" fill="none" />
      <ellipse rx="14" ry="22" stroke="#1a1a1a" strokeWidth="1.8" fill="none" transform="rotate(40)" />
      <ellipse rx="22" ry="12" stroke="#1a1a1a" strokeWidth="1.6" fill="none" transform="rotate(-40)" />

      {/* Organic hand-sketched loose yarn / wire paths */}
      <path
        d="M -46 -22 C -32 -60, 42 -52, 52 -18 C 58 16, 26 58, -18 54 C -54 50, -58 -4, -26 -38 C 0 -62, 54 -26, 38 24 C 26 50, -30 38, -38 4"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M -32 32 C 16 66, 58 22, 38 -32 C 16 -66, -46 -30, -22 36 C -4 62, 46 42, 30 -16"
        stroke="#1a1a1a"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};

// =========================================
// REVEAL CARD COMPONENT
// Exactly matching user reference image
// =========================================

const JourneyCardItem: React.FC<{
  card: JourneyCard;
  isRevealed: boolean;
}> = ({ card, isRevealed }) => {
  return (
    <div
      className={`absolute z-20 w-[92%] sm:w-[410px] md:w-[430px] ${card.positionClasses} ${
        !isRevealed ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <motion.div
        initial={false}
        animate={
          isRevealed
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.88, y: 24 }
        }
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="rounded-2xl bg-white border-[1.5px] border-black shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden"
      >
        {/* Top colored header with black bottom border */}
        <div
          style={{ backgroundColor: card.headerBg }}
          className="px-6 py-3.5 border-b-[1.5px] border-black"
        >
          <h3 className="text-[15px] sm:text-[16px] font-medium text-black leading-snug tracking-tight montserrat-medium">
            {card.question}
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 space-y-5 bg-white">
          <p className="text-[14px] sm:text-[14.5px] text-[#1a1a1a] leading-[1.65] font-normal montserrat-regular">
            {card.body}
          </p>

          {/* Inner highlight note box with muted tan border */}
          <div className="bg-white border border-[#D0C3A0] rounded-xl px-5 py-4">
            <p className="text-[13px] sm:text-[13.5px] text-[#1a1a1a] leading-[1.55] font-normal montserrat-regular">
              {card.subNote}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// =========================================
// MAIN SPIRAL JOURNEY COMPONENT
// Compact height, 4 cards, bungee-shade heading, no avatar, safe ball finish
// =========================================

// Compact canvas coordinates (1200 x 1350)
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 1350;

// Shorter, more compact organic flowing path:
// Starts at (600, 40)
// 1. Sweeps to Card 1 on right (x: 880, y: 160)
// 2. Sweeps across to Card 2 on left (x: 300, y: 320)
// 3. Sweeps down & across to Card 3 on right (x: 880, y: 760)
// 4. Sweeps across to Card 4 on left (x: 320, y: 920)
// 5. Loops smoothly to bottom-center finish (x: 600, y: 1220) with 130px buffer
const COMPACT_SCROLL_PATH = [
  'M 600 40',
  'C 740 60, 940 100, 880 180',
  'C 820 260, 500 240, 360 300',
  'C 240 350, 200 440, 280 500',
  'C 380 580, 720 640, 860 740',
  'C 960 820, 920 920, 840 960',
  'C 720 1020, 460 920, 340 980',
  'C 240 1030, 220 1140, 320 1180',
  'C 420 1220, 520 1220, 600 1220',
].join(' ');

export default function SpiralPathSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [totalLength, setTotalLength] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 600, y: 40, rot: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Natural scroll tracking through the compact journey section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 80%'],
  });

  // Measure SVG path length on mount
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    setTotalLength(len);

    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const startPt = path.getPointAtLength(0);
    setBallPos({ x: startPt.x, y: startPt.y, rot: 0 });
  }, []);

  // Drive path drawing + rolling ball smoothly on natural page scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
    const path = pathRef.current;
    if (!path || totalLength === 0) return;

    const progress = Math.min(Math.max(latest, 0), 1);

    // Draw stroke progressively
    path.style.strokeDashoffset = `${totalLength * (1 - progress)}`;

    // Calculate ball point along curve
    const pt = path.getPointAtLength(progress * totalLength);
    // Dynamic rolling rotation as it travels down
    const rot = progress * 1080;

    setBallPos({ x: pt.x, y: pt.y, rot });
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F9F8F4] overflow-visible py-14 pb-28 selection:bg-black selection:text-white"
      style={{ minHeight: '1550px' }}
    >
      {/* =========================================
          EDITORIAL HEADER WITH BUNGEE SHADE FONT
          ========================================= */}
      <div className="text-center px-6 pt-4 pb-10 max-w-4xl mx-auto select-none relative z-20">
        <h2 className="bungee-shade text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.15] tracking-wide mb-4">
          HOW LUXURY DESIGN STUDIOS USE MARKETING
        </h2>
        <p className="montserrat-medium text-sm sm:text-base md:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
          Follow the discrete journey high-net-worth homeowners take from private search discovery to signing six-figure design commissions.
        </p>
      </div>

      {/* =========================================
          COMPACT CANVAS: SVG PATH + ENLARGED BALL + 4 CARDS
          ========================================= */}
      <div
        className="relative w-full max-w-[1500px] mx-auto overflow-visible"
        style={{ height: '1350px' }}
      >
        {/* SVG Drawing Layer: Continuous Path + Rolling Ball */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* The progressive organic black line */}
          <path
            ref={pathRef}
            d={COMPACT_SCROLL_PATH}
            stroke="#1a1a1a"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* The Enlarged Scribble Ball rolling at the tip of the line */}
          <g
            transform={`translate(${ballPos.x}, ${ballPos.y})`}
            className="transition-transform duration-75 ease-out overflow-visible"
          >
            <ScribbleBall rotation={ballPos.rot} />
          </g>
        </svg>

        {/* 4 Revealed Cards along the Journey Path */}
        {JOURNEY_CARDS.map((card) => {
          const isRevealed = scrollProgress >= card.revealThreshold;
          return (
            <JourneyCardItem
              key={card.id}
              card={card}
              isRevealed={isRevealed}
            />
          );
        })}
      </div>
    </section>
  );
}
