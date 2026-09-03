'use client';

import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import React, { useMemo, useState, useEffect } from 'react';
import { ChevronDown, ArrowUpRight, ArrowRight, Users, Sparkles, X, Check, ShieldCheck, Zap, Globe } from 'lucide-react';

// Generates uniquely styled hand-drawn scribble paths based on archetype index
function generateUniqueScribblePath(shapeType: number): string {
  let p = "M 50 50 ";
  const totalPoints = 320;

  switch (shapeType % 10) {
    case 0: {
      // 1. Dense Spirograph Rosette
      const R = 32, r = 13, d = 22;
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 16;
        const x = 50 + (R - r) * Math.cos(t) + d * Math.cos(((R - r) * t) / r) + (Math.sin(i * 1.7) * 2.5);
        const y = 50 + (R - r) * Math.sin(t) - d * Math.sin(((R - r) * t) / r) + (Math.cos(i * 1.3) * 2.5);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 1: {
      // 2. Chaotic Tangled Yarn Ball
      let radius = 2;
      let angle = 0;
      for (let i = 0; i < totalPoints; i++) {
        angle += 0.42 + Math.sin(i * 0.1) * 0.2;
        radius += 0.12;
        const wobbleX = Math.sin(i * 0.3) * 6 + (Math.cos(i * 0.9) * 3);
        const wobbleY = Math.cos(i * 0.35) * 6 + (Math.sin(i * 0.8) * 3);
        const x = 50 + radius * Math.cos(angle) + wobbleX;
        const y = 50 + radius * Math.sin(angle) + wobbleY;
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 2: {
      // 3. Lissajous Orbit Knot
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 14;
        const spread = 28 + Math.sin(i * 0.05) * 12;
        const x = 50 + spread * Math.sin(3 * t + 0.5) + (Math.sin(i * 2.1) * 3);
        const y = 50 + spread * Math.cos(4 * t) + (Math.cos(i * 2.7) * 3);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 3: {
      // 4. Wild Gyroscopic Ellipses
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 18;
        const tilt = i * 0.08;
        const a = 36 + Math.sin(i * 0.04) * 6;
        const b = 18 + Math.cos(i * 0.04) * 8;
        const rawX = a * Math.cos(t);
        const rawY = b * Math.sin(t);
        const x = 50 + rawX * Math.cos(tilt) - rawY * Math.sin(tilt) + (Math.sin(i * 1.5) * 2);
        const y = 50 + rawX * Math.sin(tilt) + rawY * Math.cos(tilt) + (Math.cos(i * 1.9) * 2);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 4: {
      // 5. Starburst Astroid Scribble
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 12;
        const r = 38 * Math.pow(Math.sin(2 * t), 2) + 6;
        const noise = Math.sin(i * 0.6) * 4;
        const x = 50 + (r + noise) * Math.cos(t);
        const y = 50 + (r + noise) * Math.sin(t);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 5: {
      // 6. Figure-8 Dual-core Vortex
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 14;
        const scale = 34 + Math.sin(i * 0.03) * 8;
        const x = 50 + scale * Math.sin(t) + (Math.sin(i * 1.8) * 3);
        const y = 50 + scale * Math.sin(t) * Math.cos(t) * 1.6 + (Math.cos(i * 1.6) * 3);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 6: {
      // 7. Concentric Jitter Wave
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 20;
        const r = (i / totalPoints) * 38 + Math.sin(t * 7) * 5;
        const jitterX = Math.sin(i * 4.3) * 2.2 + Math.cos(i * 7.1) * 0.8;
        const jitterY = Math.cos(i * 3.9) * 2.2 + Math.sin(i * 6.7) * 0.8;
        const x = 50 + r * Math.cos(t) + jitterX;
        const y = 50 + r * Math.sin(t) + jitterY;
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 7: {
      // 8. 5-Petal Rose Swirl
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 16;
        const r = 35 * Math.cos(2.5 * t) + 8 + (Math.sin(i * 0.7) * 3);
        const x = 50 + r * Math.cos(t);
        const y = 50 + r * Math.sin(t);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 8: {
      // 9. Cardioid Looping Knot
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 14;
        const a = 18;
        const r = 2 * a * (1 - Math.cos(t)) + (Math.sin(i * 1.2) * 4);
        const x = 50 + r * Math.cos(t) * 0.8;
        const y = 50 + r * Math.sin(t) * 0.8;
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 9:
    default: {
      // 10. Chaotic Lasso Tornado
      let r = 36;
      let angle = 0;
      for (let i = 0; i < totalPoints; i++) {
        angle += 0.38;
        r = 15 + 22 * Math.sin(i * 0.08) + Math.cos(i * 0.25) * 6;
        const x = 50 + r * Math.cos(angle) + (Math.sin(i * 2.3) * 3.5);
        const y = 50 + r * Math.sin(angle) + (Math.cos(i * 1.9) * 3.5);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
  }

  return p;
}

interface ScribbleConfig {
  id: number;
  posX: number; // % from left (0 to 100)
  posY: number; // % from top (0 to 100)
  size: number; // in pixels
  rotate: number; // initial rotation in degrees
  shapeIndex: number;
  delay: number;
  floatPath?: {
    x: number[];
    y: number[];
    rotate: number[];
    scale: number[];
    duration: number;
  };
}

const ScribbleShape = ({ shapeIndex, className }: { shapeIndex: number; className?: string }) => {
  const path = useMemo(() => generateUniqueScribblePath(shapeIndex), [shapeIndex]);

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.45">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const MagneticScribble = ({ 
  scribble, 
  variants 
}: { 
  scribble: ScribbleConfig; 
  variants: any; 
}) => {
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 140, damping: 14, mass: 0.4 });
  const springY = useSpring(magnetY, { stiffness: 140, damping: 14, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Repel smoothly in opposite direction of mouse
    magnetX.set(-distanceX * 0.65);
    magnetY.set(-distanceY * 0.65);
  };

  const handleMouseLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  // Default floating parameters if not customized
  const floatAnim = scribble.floatPath || {
    x: [0, 18, -14, 10, 0],
    y: [0, -22, 16, -8, 0],
    rotate: [0, 14, -12, 6, 0],
    scale: [1, 1.05, 0.97, 1.02, 1],
    duration: 7.2,
  };

  return (
    <div
      className="absolute pointer-events-auto cursor-pointer select-none"
      style={{
        top: `${scribble.posY}%`,
        left: `${scribble.posX}%`,
        width: `${scribble.size}px`,
        height: `${scribble.size}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer entrance animation (center outwards) */}
      <motion.div
        custom={scribble}
        variants={variants}
        className="w-full h-full text-black/40 hover:text-black/75 transition-colors"
      >
        {/* Continuous organic floating & drifting motion */}
        <motion.div
          animate={{
            x: floatAnim.x,
            y: floatAnim.y,
            rotate: floatAnim.rotate,
            scale: floatAnim.scale,
          }}
          transition={{
            duration: floatAnim.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: scribble.delay * 0.5,
          }}
          className="w-full h-full"
        >
          {/* Interactive mouse magnetic repulsion */}
          <motion.div 
            style={{ 
              x: springX, 
              y: springY, 
              width: '100%', 
              height: '100%', 
              rotate: scribble.rotate 
            }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
          >
            <ScribbleShape shapeIndex={scribble.shapeIndex} className="w-full h-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Simple, clear, and easy-to-understand design business growth dataset
const chartDataOptions = [
  {
    btnLabel: "$2,500/mo",
    activeBtn: 0,
    withStrategy: {
      headline: "6 New Clients",
      label: "With Vaphers",
      pipeline: "$240,000",
      pipelineLabel: "New Revenue",
      cpl: "$415",
      cplLabel: "Cost Per Client",
      roas: "8x Return",
      roasLabel: "Return on Spend",
    },
    withoutStrategy: {
      headline: "1 Inconsistent Lead",
      label: "Without Strategy (Word of Mouth)",
      pipeline: "$25,000",
      pipelineLabel: "New Revenue",
      cpl: "$2,500",
      cplLabel: "Cost Per Client",
      roas: "1x Return",
      roasLabel: "Return on Spend",
    }
  },
  {
    btnLabel: "$5,000/mo",
    activeBtn: 1,
    withStrategy: {
      headline: "14 New Clients",
      label: "With Vaphers",
      pipeline: "$560,000",
      pipelineLabel: "New Revenue",
      cpl: "$355",
      cplLabel: "Cost Per Client",
      roas: "11x Return",
      roasLabel: "Return on Spend",
    },
    withoutStrategy: {
      headline: "2 Inconsistent Leads",
      label: "Without Strategy (Word of Mouth)",
      pipeline: "$50,000",
      pipelineLabel: "New Revenue",
      cpl: "$2,500",
      cplLabel: "Cost Per Client",
      roas: "1x Return",
      roasLabel: "Return on Spend",
    }
  },
  {
    btnLabel: "$10,000/mo",
    activeBtn: 2,
    withStrategy: {
      headline: "28 New Clients",
      label: "With Vaphers",
      pipeline: "$1,200,000",
      pipelineLabel: "New Revenue",
      cpl: "$355",
      cplLabel: "Cost Per Client",
      roas: "15x Return",
      roasLabel: "Return on Spend",
    },
    withoutStrategy: {
      headline: "4 Inconsistent Leads",
      label: "Without Strategy (Word of Mouth)",
      pipeline: "$100,000",
      pipelineLabel: "New Revenue",
      cpl: "$2,500",
      cplLabel: "Cost Per Client",
      roas: "1.2x Return",
      roasLabel: "Return on Spend",
    }
  }
];

export default function HeroSection() {
  const [dataIndex, setDataIndex] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<'marketing' | 'resources' | 'ai-seo' | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataIndex((prev) => (prev + 1) % chartDataOptions.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard accessibility for dropdown menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDropdown]);

  const activeData = chartDataOptions[dataIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 220, damping: 22 } 
    },
  };

  // Well-distributed spiral positions with unique floating trajectories across the screen
  const scribbles: ScribbleConfig[] = [
    // Top-left area (below header) - drifting diagonally down & right
    { 
      id: 1, posX: 8, posY: 18, size: 105, rotate: 20, shapeIndex: 0, delay: 0.10,
      floatPath: { x: [0, 24, -14, 18, 0], y: [0, 22, -18, 12, 0], rotate: [0, 18, -12, 8, 0], scale: [1, 1.06, 0.95, 1.02, 1], duration: 7.6 }
    },
    // Top-center-left area - swaying horizontally
    { 
      id: 2, posX: 35, posY: 12, size: 90, rotate: -25, shapeIndex: 1, delay: 0.16,
      floatPath: { x: [0, -22, 26, -10, 0], y: [0, -16, 20, -10, 0], rotate: [0, -15, 20, -8, 0], scale: [1, 0.96, 1.05, 0.98, 1], duration: 8.8 }
    },
    // Top-center-right area - floating bobbing up and down
    { 
      id: 3, posX: 68, posY: 11, size: 95, rotate: 45, shapeIndex: 2, delay: 0.22,
      floatPath: { x: [0, 18, -20, 12, 0], y: [0, 25, -18, 14, 0], rotate: [0, 22, -16, 10, 0], scale: [1, 1.04, 0.96, 1.02, 1], duration: 6.9 }
    },
    // Top-right area - gentle orbital drift
    { 
      id: 4, posX: 92, posY: 18, size: 110, rotate: -15, shapeIndex: 3, delay: 0.28,
      floatPath: { x: [0, -28, 16, -18, 0], y: [0, 20, -24, 14, 0], rotate: [0, -18, 14, -10, 0], scale: [1, 0.95, 1.06, 0.97, 1], duration: 9.4 }
    },
    // Mid-left perimeter - sweeping vertical drift
    { 
      id: 5, posX: 6, posY: 48, size: 120, rotate: 60, shapeIndex: 4, delay: 0.34,
      floatPath: { x: [0, 20, -16, 22, 0], y: [0, -32, 28, -14, 0], rotate: [0, 16, -22, 12, 0], scale: [1, 1.05, 0.94, 1.03, 1], duration: 8.2 }
    },
    // Behind heading - left section ("Marketing") - floating gently behind text
    { 
      id: 6, posX: 28, posY: 44, size: 135, rotate: -35, shapeIndex: 5, delay: 0.40,
      floatPath: { x: [0, -24, 20, -12, 0], y: [0, 18, -22, 10, 0], rotate: [0, -14, 18, -8, 0], scale: [1, 0.96, 1.04, 0.98, 1], duration: 7.9 }
    },
    // Behind heading - right section ("designers") - counter-floating behind text
    { 
      id: 7, posX: 72, posY: 44, size: 140, rotate: 30, shapeIndex: 6, delay: 0.46,
      floatPath: { x: [0, 22, -18, 14, 0], y: [0, -20, 16, -12, 0], rotate: [0, 16, -14, 8, 0], scale: [1, 1.05, 0.95, 1.02, 1], duration: 7.4 }
    },
    // Mid-right perimeter - vertical floating sway
    { 
      id: 8, posX: 94, posY: 50, size: 115, rotate: -65, shapeIndex: 7, delay: 0.52,
      floatPath: { x: [0, -18, 16, -22, 0], y: [0, 28, -30, 16, 0], rotate: [0, -20, 16, -12, 0], scale: [1, 0.94, 1.06, 0.98, 1], duration: 8.6 }
    },
    // Bottom-left area - drifting diagonally upwards
    { 
      id: 9, posX: 12, posY: 80, size: 110, rotate: 15, shapeIndex: 8, delay: 0.58,
      floatPath: { x: [0, 24, -18, 16, 0], y: [0, -26, 18, -12, 0], rotate: [0, 18, -16, 10, 0], scale: [1, 1.05, 0.96, 1.03, 1], duration: 7.1 }
    },
    // Bottom-center area (under CTA buttons) - floating pendulum motion
    { 
      id: 10, posX: 50, posY: 82, size: 110, rotate: -40, shapeIndex: 9, delay: 0.64,
      floatPath: { x: [0, -26, 22, -16, 0], y: [0, -18, 20, -14, 0], rotate: [0, -16, 22, -10, 0], scale: [1, 0.96, 1.04, 0.97, 1], duration: 8.4 }
    },
    // Bottom-right area - smooth wandering float
    { 
      id: 11, posX: 88, posY: 80, size: 120, rotate: 50, shapeIndex: 1, delay: 0.70,
      floatPath: { x: [0, -22, 18, -14, 0], y: [0, -26, 22, -10, 0], rotate: [0, 18, -14, 12, 0], scale: [1, 1.06, 0.95, 1.02, 1], duration: 7.8 }
    },
  ];

  // Emerge from the center of the viewport outwards to destination position
  const scribbleCenterVariants = {
    hidden: (s: ScribbleConfig) => ({
      opacity: 0,
      scale: 0.1,
      // Start near screen center (50% X, 50% Y)
      x: `${(50 - s.posX) * 0.9}vw`,
      y: `${(50 - s.posY) * 0.9}vh`,
      rotate: -120,
    }),
    show: (s: ScribbleConfig) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 75,
        damping: 15,
        mass: 0.6,
        delay: s.delay,
      },
    }),
  };

  const headingLines = [
    "Scale your design firm",
    "with marketing for interior designers",
    "that makes your ROI impossible to ignore."
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen relative overflow-hidden flex flex-col justify-between p-6 md:p-10 selection:bg-blue-500/30"
    >
      {/* Background Scribbles - 10 Unique Procedural Shapes emerging from center */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {scribbles.map((s) => (
          <MagneticScribble key={s.id} scribble={s} variants={scribbleCenterVariants} />
        ))}
      </div>

      {/* Top Nav with Brand, Pill Nav at Center, and CTA */}
      <motion.header variants={itemVariants} className="relative z-40 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 w-full">
          {/* Brand Name - Vaphers in Bungee Shade (V in blue-600, aphers in black and slightly smaller) */}
          <div className="flex items-center md:flex-1 justify-center md:justify-start">
            <a 
              href="#" 
              className="inline-flex items-baseline group cursor-pointer select-none tracking-normal hover:opacity-90 transition-opacity bungee-shade" 
              aria-label="Vaphers Home"
            >
              <span className="text-blue-600 text-3xl sm:text-4xl leading-none">
                V
              </span>
              <span className="text-black text-2xl sm:text-[1.75rem] leading-none">
                aphers
              </span>
            </a>
          </div>
          
          {/* Pill Shaped Navigation Menu - Centered */}
          <div className="flex items-center justify-center flex-shrink-0">
            <nav 
              id="pill-nav-menu"
              aria-label="Main navigation"
              className="bg-white/95 backdrop-blur-md border-2 border-black rounded-full px-2 py-1.5 flex items-center gap-1 sm:gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* Marketing Dropdown Trigger */}
              <button 
                id="nav-pill-marketing"
                onClick={() => setActiveDropdown(activeDropdown === 'marketing' ? null : 'marketing')}
                aria-expanded={activeDropdown === 'marketing'}
                aria-haspopup="true"
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  activeDropdown === 'marketing'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-black hover:bg-black/5'
                }`}
              >
                <span>Marketing</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'marketing' ? 'rotate-180' : ''}`} />
              </button>

              {/* Resources Dropdown Trigger */}
              <button 
                id="nav-pill-resources"
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                aria-expanded={activeDropdown === 'resources'}
                aria-haspopup="true"
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  activeDropdown === 'resources'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-black hover:bg-black/5'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {/* AI SEO Dropdown Trigger */}
              <button 
                id="nav-pill-ai-seo"
                onClick={() => setActiveDropdown(activeDropdown === 'ai-seo' ? null : 'ai-seo')}
                aria-expanded={activeDropdown === 'ai-seo'}
                aria-haspopup="true"
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  activeDropdown === 'ai-seo'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-black hover:bg-black/5'
                }`}
              >
                <span>AI SEO</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'ai-seo' ? 'rotate-180' : ''}`} />
              </button>
            </nav>
          </div>

          {/* Right Action */}
          <div className="flex items-center md:flex-1 justify-center md:justify-end">
            <button 
              id="header-proposal-btn"
              onClick={() => setActiveDropdown(activeDropdown === 'marketing' ? null : 'marketing')}
              className="bg-blue-600 border-2 border-black rounded-xl px-4 py-2 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            >
              Get SEO Proposal
            </button>
          </div>
        </div>

        {/* Full-width Rectangular Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeDropdown && (
            <>
              {/* Backdrop to close on click outside */}
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setActiveDropdown(null)} 
              />

              <motion.div
                id="mega-menu-container"
                key={activeDropdown}
                initial={{ opacity: 0, y: -10, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.995 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-3 z-40 w-full max-w-7xl mx-auto"
              >
                <div className="bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 lg:p-10 relative">
                  {/* Close button */}
                  <button
                    id="close-mega-menu-btn"
                    onClick={() => setActiveDropdown(null)}
                    aria-label="Close menu"
                    className="absolute top-4 right-4 p-1.5 rounded-lg border border-black/20 hover:border-black hover:bg-black/5 text-black transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* 1. MARKETING MENU */}
                  {activeDropdown === 'marketing' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                      {/* Column 1: SERVICES WE PROVIDE */}
                      <div className="md:col-span-4 lg:col-span-4 pr-0 md:pr-6 md:border-r border-black/10">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          SERVICES WE PROVIDE
                        </div>
                        <ul className="space-y-1">
                          {[
                            "Managed SEO Services",
                            "AI SEO Services",
                            "Digital Marketing Services",
                            "Local SEO Services",
                            "Enterprise SEO Services",
                            "PPC Services",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: OUR SEO AGENCY */}
                      <div className="md:col-span-4 lg:col-span-4 px-0 md:px-6 md:border-r border-black/10">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span>OUR SEO AGENCY</span>
                        </div>
                        <ul className="space-y-1">
                          {[
                            "SEO Agency",
                            "What does an SEO Company Do?",
                            "Best SEO Companies",
                            "In-House vs. SEO Agency",
                            "How Much Do SEO Agencies Cost?",
                            "How to Compare SEO Agencies",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: Call to Action Card */}
                      <div className="md:col-span-4 lg:col-span-4 pl-0 md:pl-6 flex flex-col justify-between">
                        <div className="bg-[#15033E] text-white rounded-2xl p-6 sm:p-7 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full min-h-[280px]">
                          <div>
                            <div className="flex items-start justify-between">
                              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                                Let’s Drive Results<br />
                                <span className="text-[#00FFA3]">Together</span>
                              </h3>
                              <ArrowUpRight className="w-8 h-8 text-[#00FFA3] flex-shrink-0" />
                            </div>
                            <p className="text-xs sm:text-sm text-white/70 mt-3 font-medium">
                              Custom search & client acquisition campaigns built for high-growth design firms.
                            </p>
                          </div>

                          <div className="mt-8 space-y-3">
                            <button
                              onClick={() => setActiveDropdown(null)}
                              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-98 text-sm sm:text-base cursor-pointer"
                            >
                              Get SEO Proposal
                            </button>
                            <div className="text-center font-mono text-[10px] tracking-widest text-white/60 uppercase">
                              POWERED BY <span className="font-extrabold text-white">VAPHERS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. RESOURCES MENU */}
                  {activeDropdown === 'resources' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                      {/* Column 1: LEARN SEO */}
                      <div className="sm:border-r border-black/10 pr-0 sm:pr-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          LEARN SEO
                        </div>
                        <ul className="space-y-1">
                          {[
                            "SEO Basics",
                            "On-Page SEO",
                            "Off-Page SEO",
                            "Technical SEO",
                            "How Search Engines Work",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: SEO RESOURCES */}
                      <div className="lg:border-r border-black/10 pr-0 lg:pr-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          SEO RESOURCES
                        </div>
                        <ul className="space-y-1">
                          {[
                            "SEO Blog",
                            "SEO Content Guide",
                            "Keyword Research Guide",
                            "Local SEO Guide",
                            "SEO Checklist",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: SEO QUESTIONS */}
                      <div className="sm:border-r border-black/10 pr-0 sm:pr-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          SEO QUESTIONS
                        </div>
                        <ul className="space-y-1">
                          {[
                            "Is SEO Worth It?",
                            "What is SEO’s ROI?",
                            "What are SEO KPIs?",
                            "How do I drive more leads?",
                            "Why isn’t my website on Google?",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 4: SEO MINITOOLS */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          SEO MINITOOLS
                        </div>
                        <ul className="space-y-1">
                          {[
                            "AI Overview Checker",
                            "SEO Checker",
                            "Domain Checker",
                            "Keyword Research Tool",
                            "Website Traffic Checker",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* 3. AI SEO MENU */}
                  {activeDropdown === 'ai-seo' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Column 1: GETTING STARTED */}
                      <div className="md:border-r border-black/10 pr-0 md:pr-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          GETTING STARTED
                        </div>
                        <ul className="space-y-1">
                          {[
                            "AI and SEO",
                            "AI and Content",
                            "AI SEO Services",
                            "Best SEO AI Tools",
                            "Guide to SEO in 2026",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: AI ENGINES */}
                      <div className="md:border-r border-black/10 pr-0 md:pr-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          AI ENGINES
                        </div>
                        <ul className="space-y-1">
                          {[
                            "How to Rank in AI Engines",
                            "SEO for Perplexity",
                            "SEO for ChatGPT",
                            "SEO for Gemini",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: AI FAQS */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-black/50 mb-4 font-mono">
                          AI FAQS
                        </div>
                        <ul className="space-y-1">
                          {[
                            "What is OmniSEO",
                            "What is GEO",
                            "What is AEO",
                            "What are AI Overviews?",
                            "Will AI Replace SEO Jobs?",
                          ].map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveDropdown(null); }}
                                className="group py-2 px-2.5 -mx-2 rounded-lg flex items-center justify-between text-black font-semibold text-sm sm:text-base hover:text-blue-600 hover:bg-black/5 transition-colors"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Center Content - With H1 in Bungee Shade and blue-600 layered in front of spiral balls */}
      <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center my-auto py-12 md:py-16">
        <motion.h1 
          variants={itemVariants}
          className="relative z-20 text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.12] tracking-normal max-w-5xl mx-auto text-blue-600 font-normal drop-shadow-sm select-none bungee-shade"
        >
          Marketing for Interior designers
        </motion.h1>

        <motion.p variants={itemVariants} className="relative z-20 mt-5 text-sm sm:text-base md:text-lg text-black/75 font-medium max-w-2xl mx-auto font-sans">
          Scale your design firm with high-ticket client acquisition, verified search authority, and predictable pipeline growth that makes your ROI impossible to ignore.
        </motion.p>

        <motion.div variants={itemVariants} className="relative z-20 mt-8 flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          <button 
            id="hero-start-subscription-btn"
            onClick={() => setActiveDropdown('marketing')}
            className="bg-blue-600 border-2 border-black rounded-xl px-6 py-3.5 text-white font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            Start Your Subscription
          </button>
          <button 
            id="hero-explore-resources-btn"
            onClick={() => setActiveDropdown('resources')}
            className="bg-white border-2 border-black rounded-xl px-6 py-3.5 text-black font-semibold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black/5 hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            Explore Resources
          </button>
        </motion.div>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-end pt-2">
        
        {/* Bottom Left: Explainer */}
        <motion.div variants={itemVariants} className="lg:col-span-4 max-w-md">
          <p className="text-black/80 font-medium leading-snug text-sm sm:text-base mb-4">
            DesignFinder is the strategy and closing system built for 
            interior designers who want to uncover opportunities faster, explain 
            them clearly, and convert more premium clients.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-black">Monthly Budget</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[0, 1, 2].map((idx) => (
                <button 
                  key={idx}
                  onClick={() => setDataIndex(idx)}
                  className={`border border-black rounded px-2.5 py-1 text-xs font-semibold transition-all ${
                    activeData.activeBtn === idx ? 'bg-blue-400 text-black shadow-sm' : 'bg-transparent text-black hover:bg-black/5'
                  }`}
                >
                  {chartDataOptions[idx].btnLabel}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Right: Comparative Chart Matrix */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-8 w-full max-w-4xl ml-auto"
        >
          {/* Blue Box (With Strategy) */}
          <div className="bg-[#8CA2FF] border-2 border-black rounded-t-xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col justify-between overflow-hidden shadow-sm min-h-[148px] sm:min-h-[156px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <div className="relative h-10 sm:h-11 flex items-center overflow-hidden flex-1 min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2 
                    key={activeData.withStrategy.headline}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black font-jetbrains whitespace-nowrap"
                  >
                    {activeData.withStrategy.headline}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <span className="font-bold text-[10px] sm:text-xs text-black uppercase tracking-wider bg-white/40 border border-black/30 rounded px-2.5 py-0.5 flex-shrink-0 whitespace-nowrap">
                {activeData.withStrategy.label}
              </span>
            </div>
            
            {/* Animated Tick Marks Ruler with Fixed Container Height to Prevent Jitter */}
            <div className="w-full h-7 sm:h-8 flex justify-between items-end border-b border-black/80 pb-1 mb-2">
              {Array.from({ length: 54 }).map((_, i) => {
                const isMajor = i % 9 === 0;
                const norm = i / 54;
                
                // Calculate dynamic scenario heights
                let targetHeight = 6;
                if (dataIndex === 0) {
                  // 10K Traffic: steady ramp
                  targetHeight = 5 + norm * 12 + (isMajor ? 4 : i % 3 === 0 ? 2 : 0);
                } else if (dataIndex === 1) {
                  // 50K Traffic: energetic dual harmonic wave
                  const wave = Math.sin(norm * Math.PI * 3.5) * 6 + 12;
                  targetHeight = Math.max(5, wave + (isMajor ? 5 : i % 3 === 0 ? 2.5 : 0));
                } else {
                  // 100K Traffic: exponential crescendo
                  const exp = 6 + Math.pow(norm, 1.5) * 17;
                  const wave = Math.sin(norm * Math.PI * 4) * 3;
                  targetHeight = Math.min(26, Math.max(6, exp + wave + (isMajor ? 6 : i % 3 === 0 ? 3 : 0)));
                }

                return (
                  <motion.div 
                    key={i} 
                    initial={false}
                    animate={{ 
                      height: targetHeight,
                      backgroundColor: isMajor ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.65)' 
                    }}
                    transition={{ 
                      duration: 0.25,
                      ease: "easeOut",
                      delay: (i % 18) * 0.005 
                    }}
                    className="w-[1.5px] rounded-full" 
                  />
                );
              })}
            </div>
            
            {/* Stats Breakdown */}
            <div className="grid grid-cols-3 gap-3 text-black">
              <div className="flex flex-col">
                <div className="relative h-6 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span 
                      key={activeData.withStrategy.pipeline}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="font-bold text-sm sm:text-base font-jetbrains whitespace-nowrap tabular-nums"
                    >
                      {activeData.withStrategy.pipeline}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-[11px] opacity-80 mt-0.5 whitespace-nowrap">{activeData.withStrategy.pipelineLabel}</span>
              </div>
              
              <div className="flex flex-col">
                <div className="relative h-6 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span 
                      key={activeData.withStrategy.cpl}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="font-bold text-sm sm:text-base font-jetbrains whitespace-nowrap tabular-nums"
                    >
                      {activeData.withStrategy.cpl}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-[11px] opacity-80 mt-0.5 whitespace-nowrap">{activeData.withStrategy.cplLabel}</span>
              </div>

              <div className="flex flex-col">
                <div className="relative h-6 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span 
                      key={activeData.withStrategy.roas}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="font-bold text-sm sm:text-base font-jetbrains whitespace-nowrap tabular-nums"
                    >
                      {activeData.withStrategy.roas}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-[11px] opacity-80 mt-0.5 whitespace-nowrap">{activeData.withStrategy.roasLabel}</span>
              </div>
            </div>
          </div>

          {/* Gold/Tan Box (Without Strategy) - Fully Detailed Comparison */}
          <div className="bg-[#D4B67F] border-2 border-t-0 border-black rounded-b-xl px-4 py-2.5 sm:px-6 sm:py-3 flex flex-col justify-between overflow-hidden shadow-sm min-h-[136px] sm:min-h-[144px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <div className="relative h-8 sm:h-9 flex items-center overflow-hidden flex-1 min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2 
                    key={activeData.withoutStrategy.headline}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-black/90 font-jetbrains whitespace-nowrap"
                  >
                    {activeData.withoutStrategy.headline}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <span className="font-semibold text-[10px] sm:text-xs text-black/80 uppercase tracking-wider bg-black/5 border border-black/20 rounded px-2.5 py-0.5 flex-shrink-0 whitespace-nowrap">
                {activeData.withoutStrategy.label}
              </span>
            </div>

            {/* Animated Divider Bars for Without Strategy with Fixed Container Height */}
            <div className="w-full h-6 sm:h-7 flex justify-between items-end border-b border-black/40 pb-1 mb-2 opacity-70">
              {Array.from({ length: 54 }).map((_, i) => {
                const isMajor = i % 9 === 0;
                const norm = i / 54;
                
                // Flatter, sluggish wave heights
                let targetHeight = 4;
                if (dataIndex === 0) {
                  targetHeight = 3 + (isMajor ? 2.5 : 0);
                } else if (dataIndex === 1) {
                  targetHeight = 4 + Math.sin(norm * Math.PI * 2) * 2 + (isMajor ? 2.5 : 0);
                } else {
                  targetHeight = 5 + Math.sin(norm * Math.PI * 3) * 2.5 + (isMajor ? 3 : 0);
                }

                return (
                  <motion.div 
                    key={i} 
                    initial={false}
                    animate={{ height: targetHeight }}
                    transition={{ 
                      duration: 0.25,
                      ease: "easeOut",
                      delay: (i % 18) * 0.005 
                    }}
                    className="w-[1.2px] bg-black/50 rounded-full" 
                  />
                );
              })}
            </div>

            {/* Stats Breakdown for Without Strategy */}
            <div className="grid grid-cols-3 gap-3 text-black">
              <div className="flex flex-col">
                <div className="relative h-6 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span 
                      key={activeData.withoutStrategy.pipeline}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="font-bold text-sm sm:text-base font-jetbrains text-black/80 whitespace-nowrap tabular-nums"
                    >
                      {activeData.withoutStrategy.pipeline}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-[11px] opacity-75 mt-0.5 whitespace-nowrap">{activeData.withoutStrategy.pipelineLabel}</span>
              </div>
              
              <div className="flex flex-col">
                <div className="relative h-6 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span 
                      key={activeData.withoutStrategy.cpl}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="font-bold text-sm sm:text-base font-jetbrains text-black/80 whitespace-nowrap tabular-nums"
                    >
                      {activeData.withoutStrategy.cpl}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-[11px] opacity-75 mt-0.5 whitespace-nowrap">{activeData.withoutStrategy.cplLabel}</span>
              </div>

              <div className="flex flex-col">
                <div className="relative h-6 flex items-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span 
                      key={activeData.withoutStrategy.roas}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="font-bold text-sm sm:text-base font-jetbrains text-black/80 whitespace-nowrap tabular-nums"
                    >
                      {activeData.withoutStrategy.roas}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-[11px] opacity-75 mt-0.5 whitespace-nowrap">{activeData.withoutStrategy.roasLabel}</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
