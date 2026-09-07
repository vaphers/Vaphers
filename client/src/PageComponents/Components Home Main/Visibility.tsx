'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

// =========================================
// 4 SHORT, PUNCHY INSIGHTS (5-7 words each)
// Exactly 220px vertical step between card tops:
// 30px -> 250px -> 470px -> 690px
// =========================================

interface VisibilityInsight {
  id: string;
  statement: string;
  positionClasses: string;
  revealThreshold: number;
}

const INSIGHTS: VisibilityInsight[] = [
  {
    id: 'referrals',
    statement: 'Referral clients still Google you first.', // 6 words
    positionClasses: 'top-[30px] right-2 sm:right-6 lg:right-4 max-w-[340px] sm:max-w-[360px]',
    revealThreshold: 0.12,
  },
  {
    id: 'discovery',
    statement: 'Affluent homeowners search anonymously by neighborhood.', // 6 words
    positionClasses: 'top-[250px] left-2 sm:left-4 lg:left-2 max-w-[340px] sm:max-w-[360px]',
    revealThreshold: 0.38,
  },
  {
    id: 'pricing',
    statement: 'Search authority eliminates client fee negotiation.', // 6 words
    positionClasses: 'top-[470px] right-2 sm:right-6 lg:right-4 max-w-[340px] sm:max-w-[360px]',
    revealThreshold: 0.65,
  },
  {
    id: 'pipeline',
    statement: 'Predictable commissions without referral dry spells.', // 6 words
    positionClasses: 'top-[690px] left-2 sm:left-4 lg:left-2 max-w-[340px] sm:max-w-[360px]',
    revealThreshold: 0.88,
  },
];

// =========================================
// HAND-DRAWN SCRIBBLE BALL SVG
// =========================================

const ScribbleBall: React.FC<{ rotation?: number }> = ({ rotation = 0 }) => {
  return (
    <g transform={`rotate(${rotation})`} className="cursor-default overflow-visible">
      {/* Outer subtle shadow aura */}
      <circle r="46" fill="rgba(0,0,0,0.04)" />

      {/* Tangled sketch loops (~95px diameter) */}
      <ellipse rx="42" ry="36" stroke="#1a1a1a" strokeWidth="1.6" fill="none" transform="rotate(18)" />
      <ellipse rx="36" ry="40" stroke="#1a1a1a" strokeWidth="1.4" fill="none" transform="rotate(-35)" />
      <ellipse rx="32" ry="38" stroke="#1a1a1a" strokeWidth="1.5" fill="none" transform="rotate(52)" />
      <ellipse rx="42" ry="26" stroke="#1a1a1a" strokeWidth="1.3" fill="none" transform="rotate(-15)" />
      <ellipse rx="26" ry="36" stroke="#1a1a1a" strokeWidth="1.6" fill="none" transform="rotate(78)" />
      <ellipse rx="36" ry="22" stroke="#1a1a1a" strokeWidth="1.3" fill="none" transform="rotate(-50)" />

      {/* Mid loops */}
      <circle r="20" stroke="#1a1a1a" strokeWidth="1.8" fill="none" />
      <ellipse rx="18" ry="28" stroke="#1a1a1a" strokeWidth="1.4" fill="none" transform="rotate(28)" />
      <ellipse rx="34" ry="16" stroke="#1a1a1a" strokeWidth="1.2" fill="none" transform="rotate(-65)" />
      <ellipse rx="24" ry="32" stroke="#1a1a1a" strokeWidth="1.5" fill="none" transform="rotate(110)" />

      {/* Core density */}
      <circle r="10" stroke="#1a1a1a" strokeWidth="2.0" fill="none" />
      <ellipse rx="9" ry="16" stroke="#1a1a1a" strokeWidth="1.5" fill="none" transform="rotate(40)" />

      {/* Organic loose yarn paths */}
      <path
        d="M -32 -16 C -22 -44, 30 -36, 36 -12 C 40 12, 18 42, -14 40 C -38 38, -40 -2, -18 -28 C 0 -44, 38 -18, 28 18 C 18 36, -20 28, -26 4"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};

// =========================================
// CLEAN COMPACT INSIGHT CARD
// Reveals when ball reaches it; hides on reverse
// =========================================

const InsightCardItem: React.FC<{
  item: VisibilityInsight;
  isRevealed: boolean;
}> = ({ item, isRevealed }) => {
  return (
    <div
      className={`absolute z-20 w-[92%] sm:w-[350px] ${item.positionClasses} ${
        !isRevealed ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <motion.div
        initial={false}
        animate={
          isRevealed
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.88, y: 20 }
        }
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="rounded-2xl bg-[#FAF7F0] border-[1.5px] border-black shadow-[0_6px_20px_rgba(0,0,0,0.05)] px-6 py-4 sm:py-5 overflow-hidden flex items-center"
      >
        <p className="text-[14.5px] sm:text-[15.5px] font-medium text-[#111111] leading-snug tracking-tight montserrat-medium">
          {item.statement}
        </p>
      </motion.div>
    </div>
  );
};

// =========================================
// MAIN VISIBILITY COMPONENT
// =========================================

const SVG_WIDTH = 600;
const SVG_HEIGHT = 920;

// Organic flowing path that enters from FAR RIGHT SCREEN (x: 640, y: 25)
// and smoothly threads through all 4 cards (equally spaced at 220px intervals):
// 1. Enters from right edge -> Card 1 (x: 420, y: 70)
// 2. Loops across to Card 2 (x: 160, y: 290)
// 3. Loops across to Card 3 (x: 420, y: 510)
// 4. Loops across to Card 4 (x: 160, y: 730)
// 5. Loops smoothly to bottom finish (x: 300, y: 870)
const VISIBILITY_PATH = [
  'M 640 25',
  'C 560 30, 480 40, 420 80',
  'C 340 140, 220 200, 160 280',
  'C 100 360, 240 420, 360 460',
  'C 440 490, 460 530, 430 570',
  'C 390 630, 240 660, 160 720',
  'C 100 780, 200 840, 300 870',
].join(' ');

export default function Visibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [totalLength, setTotalLength] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 640, y: 25, rot: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll tracking linked to the visibility section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 80%'],
  });

  // Measure path length on mount
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

  // Update line drawing and rolling ball along path with scroll
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
    const rot = progress * 720;

    setBallPos({ x: pt.x, y: pt.y, rot });
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#EDF0FE] py-20 sm:py-24 lg:py-28 overflow-visible selection:bg-black selection:text-white montserrat-regular"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ================= LEFT COLUMN: STICKY EDITORIAL CONTENT ================= */}
          <div className="lg:col-span-6 space-y-7 sm:space-y-8 z-10 lg:sticky lg:top-28">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-normal text-[#111111] leading-[1.12] tracking-tight">
              Do Designers Even Need <br className="hidden sm:inline" />
              Online Visibility?
            </h2>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl font-medium text-[#111111] leading-snug montserrat-medium">
              Word-of-mouth creates projects. Search visibility creates sovereign studios.
            </p>

            {/* Body Paragraph */}
            <p className="text-sm sm:text-[15px] text-[#444444] leading-[1.7]">
              Most design studios believe referrals are enough—until a dry spell hits, or a client questions their design fees. The reality? Even referred clients search for your studio online before booking. If your presence does not instantly project authority, you surrender pricing leverage before the first meeting.
            </p>

            {/* Dark Green Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[#1D4D38] rounded-2xl p-7 sm:p-8 space-y-6 shadow-sm border border-black/10 text-white"
            >
              <p className="text-sm sm:text-[15.5px] text-white/95 leading-relaxed font-normal">
                True visibility is not about vanity metrics or viral reels. It is about positioning your studio as the undisputed authority when affluent homeowners in your city search for bespoke interior architecture.
              </p>

              <div>
                <Link href="/contact" className="inline-block">
                  <button className="bg-[#2EB82E] border-2 border-black rounded-xl px-7 py-3.5 text-white font-semibold text-sm sm:text-base shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer">
                    Book a Strategy Call
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: 4 EQUALLY SPACED SHORT CARDS ================= */}
          <div
            className="lg:col-span-6 relative w-full overflow-visible"
            style={{ height: '920px' }}
          >
            {/* SVG Drawing Layer: Organic Path + Rolling Ball */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* The progressive black curve entering from right edge */}
              <path
                ref={pathRef}
                d={VISIBILITY_PATH}
                stroke="#1a1a1a"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* The Rolling Scribble Ball coming in from right screen */}
              <g
                transform={`translate(${ballPos.x}, ${ballPos.y})`}
                className="transition-transform duration-75 ease-out overflow-visible"
              >
                <ScribbleBall rotation={ballPos.rot} />
              </g>
            </svg>

            {/* 4 Equally Spaced Cards (exact 220px vertical delta) */}
            {INSIGHTS.map((item) => {
              const isRevealed = scrollProgress >= item.revealThreshold;
              return (
                <InsightCardItem
                  key={item.id}
                  item={item}
                  isRevealed={isRevealed}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
