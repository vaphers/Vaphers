'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Generates uniquely styled hand-drawn scribble paths based on archetype index (matching Hero)
function generateUniqueScribblePath(shapeType: number): string {
  let p = "M 50 50 ";
  const totalPoints = 320;

  switch (shapeType % 10) {
    case 0: {
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
  posX: number;
  posY: number;
  size: number;
  rotate: number;
  shapeIndex: number;
  floatPath: {
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

const MagneticScribble = ({ scribble }: { scribble: ScribbleConfig }) => {
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
    magnetX.set(-distanceX * 0.55);
    magnetY.set(-distanceY * 0.55);
  };

  const handleMouseLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
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
      <div className="w-full h-full text-black/25 hover:text-black/55 transition-colors">
        <motion.div
          animate={{
            x: scribble.floatPath.x,
            y: scribble.floatPath.y,
            rotate: scribble.floatPath.rotate,
            scale: scribble.floatPath.scale,
          }}
          transition={{
            duration: scribble.floatPath.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="w-full h-full"
        >
          <motion.div
            style={{
              x: springX,
              y: springY,
              width: '100%',
              height: '100%',
              rotate: scribble.rotate,
            }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
          >
            <ScribbleShape shapeIndex={scribble.shapeIndex} className="w-full h-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Rich particle distribution across entire section background (matching Hero density)
const backgroundScribbles: ScribbleConfig[] = [
  // Top row
  { 
    id: 1, posX: 7, posY: 14, size: 105, rotate: 20, shapeIndex: 0,
    floatPath: { x: [0, 22, -14, 18, 0], y: [0, 20, -16, 12, 0], rotate: [0, 16, -12, 8, 0], scale: [1, 1.05, 0.95, 1.02, 1], duration: 7.6 }
  },
  { 
    id: 2, posX: 34, posY: 10, size: 90, rotate: -25, shapeIndex: 1,
    floatPath: { x: [0, -20, 24, -10, 0], y: [0, -14, 18, -10, 0], rotate: [0, -14, 18, -8, 0], scale: [1, 0.96, 1.05, 0.98, 1], duration: 8.8 }
  },
  { 
    id: 3, posX: 65, posY: 9, size: 95, rotate: 40, shapeIndex: 2,
    floatPath: { x: [0, 16, -18, 12, 0], y: [0, 22, -16, 12, 0], rotate: [0, 20, -14, 10, 0], scale: [1, 1.04, 0.96, 1.02, 1], duration: 6.9 }
  },
  { 
    id: 4, posX: 93, posY: 15, size: 110, rotate: -15, shapeIndex: 3,
    floatPath: { x: [0, -25, 15, -16, 0], y: [0, 18, -22, 12, 0], rotate: [0, -16, 14, -10, 0], scale: [1, 0.95, 1.06, 0.97, 1], duration: 9.2 }
  },
  // Middle perimeter
  { 
    id: 5, posX: 5, posY: 48, size: 115, rotate: 55, shapeIndex: 4,
    floatPath: { x: [0, 18, -14, 20, 0], y: [0, -28, 24, -12, 0], rotate: [0, 14, -20, 10, 0], scale: [1, 1.04, 0.95, 1.02, 1], duration: 8.2 }
  },
  { 
    id: 6, posX: 95, posY: 50, size: 115, rotate: -60, shapeIndex: 7,
    floatPath: { x: [0, -16, 15, -20, 0], y: [0, 25, -26, 14, 0], rotate: [0, -18, 15, -10, 0], scale: [1, 0.95, 1.05, 0.98, 1], duration: 8.5 }
  },
  // Sub-heading / Center floaters
  { 
    id: 7, posX: 26, posY: 34, size: 85, rotate: -30, shapeIndex: 5,
    floatPath: { x: [0, -18, 16, -10, 0], y: [0, 14, -18, 8, 0], rotate: [0, -12, 15, -6, 0], scale: [1, 0.97, 1.03, 0.99, 1], duration: 7.7 }
  },
  { 
    id: 8, posX: 78, posY: 36, size: 90, rotate: 25, shapeIndex: 6,
    floatPath: { x: [0, 18, -15, 12, 0], y: [0, -16, 14, -10, 0], rotate: [0, 14, -12, 6, 0], scale: [1, 1.04, 0.96, 1.01, 1], duration: 7.3 }
  },
  // Bottom row
  { 
    id: 9, posX: 9, posY: 84, size: 110, rotate: 18, shapeIndex: 8,
    floatPath: { x: [0, 22, -16, 14, 0], y: [0, -22, 16, -10, 0], rotate: [0, 16, -14, 8, 0], scale: [1, 1.05, 0.96, 1.02, 1], duration: 7.2 }
  },
  { 
    id: 10, posX: 48, posY: 86, size: 105, rotate: -35, shapeIndex: 9,
    floatPath: { x: [0, -22, 18, -14, 0], y: [0, -15, 18, -12, 0], rotate: [0, -14, 18, -8, 0], scale: [1, 0.96, 1.04, 0.98, 1], duration: 8.3 }
  },
  { 
    id: 11, posX: 89, posY: 84, size: 115, rotate: 45, shapeIndex: 1,
    floatPath: { x: [0, -18, 16, -12, 0], y: [0, -22, 18, -8, 0], rotate: [0, 16, -12, 10, 0], scale: [1, 1.05, 0.95, 1.02, 1], duration: 7.9 }
  },
];

interface CreativeCardItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  tilt: number;
}

const creativeCards: CreativeCardItem[] = [
  {
    id: 'card-1',
    title: 'Spatial lookbook',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    alt: 'Spatial lookbook - Luxury interior living salon editorial post',
    tilt: -2.2,
  },
  {
    id: 'card-2',
    title: 'Editorial showcase',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    alt: 'Editorial showcase - Minimalist luxury kitchen and dining design post',
    tilt: 2.0,
  },
  {
    id: 'card-3',
    title: 'Bespoke portfolio',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    alt: 'Bespoke portfolio - Architectural master suite spatial layout',
    tilt: -1.8,
  },
  {
    id: 'card-4',
    title: 'Luxury spatial ads',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury spatial ads - Bespoke residential villa renovation post',
    tilt: 2.2,
  },
  {
    id: 'card-5',
    title: 'Architectural feature',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    alt: 'Architectural feature - Luxury penthouse spatial design post',
    tilt: -2.0,
  },
];

export default function CreativeSuiteCarousel() {
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  // Manual Drag Pointer State
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);

  // Continuous Position motion value
  const x = useMotionValue(0);

  // Measure the exact pixel width of 1 complete set of cards
  useEffect(() => {
    const measureWidth = () => {
      if (setRef.current) {
        const measured = setRef.current.offsetWidth + 28; // width + gap-7
        setSetWidth(measured);
        // Start centered in the buffer so cards NEVER vanish in either direction
        if (x.get() === 0 && measured > 0) {
          x.set(-2 * measured);
        }
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [x]);

  // Non-stop, fluid auto-scroll animation
  useAnimationFrame((time, delta) => {
    if (isDraggingRef.current || setWidth === 0) return;

    // Normalizing across 60Hz / 120Hz / 144Hz displays with frame clamping
    const clampedDelta = Math.min(delta, 32);
    const moveBy = 2.8 * (clampedDelta / 16.6667);
    let newX = x.get() - moveBy;

    // Continuous modulo wrap strictly inside [-3 * setWidth, -2 * setWidth]
    if (newX <= -3 * setWidth) {
      newX += setWidth;
    } else if (newX > -2 * setWidth) {
      newX -= setWidth;
    }

    x.set(newX);
  });

  // Pointer Drag Handlers - Cards will NEVER vanish no matter how far or fast you drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (setWidth === 0) return;
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartVal.current = x.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || setWidth === 0) return;
    const delta = e.clientX - dragStartX.current;
    let targetX = dragStartVal.current + delta;

    // Seamless real-time wrapping while dragging: impossible to hit blank space
    while (targetX <= -3 * setWidth) targetX += setWidth;
    while (targetX > -2 * setWidth) targetX -= setWidth;

    x.set(targetX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  };

  // Dedicated horizontal wheel / trackpad swipe (does NOT hijack normal vertical page scrolling)
  const handleWheel = (e: React.WheelEvent) => {
    // Only respond if the user is actually swiping horizontally on trackpad or shift-wheeling
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      if (setWidth === 0) return;
      let targetX = x.get() - e.deltaX * 0.9;
      while (targetX <= -3 * setWidth) targetX += setWidth;
      while (targetX > -2 * setWidth) targetX -= setWidth;
      x.set(targetX);
    }
  };

  // Smooth manual arrow navigation
  const handleArrowScroll = (direction: 'left' | 'right') => {
    if (setWidth === 0) return;
    const cardStep = 348;
    const current = x.get();
    const target = direction === 'left' ? current + cardStep : current - cardStep;

    animate(x, target, {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        let wrapped = latest;
        while (wrapped <= -3 * setWidth) wrapped += setWidth;
        while (wrapped > -2 * setWidth) wrapped -= setWidth;
        x.set(wrapped);
      },
    });
  };

  // Renders a set of tilted cards with smooth hover leveling
  const renderCardSet = (prefix: string, isFirstSet = false) => (
    <div
      ref={isFirstSet ? setRef : undefined}
      className="flex gap-7 shrink-0 items-center py-4"
    >
      {creativeCards.map((card) => (
        <div
          key={`${prefix}-${card.id}`}
          style={{
            transform: `rotate(${card.tilt}deg)`,
          }}
          className="relative shrink-0 w-[270px] sm:w-[300px] md:w-[325px] lg:w-[345px] h-[390px] sm:h-[440px] md:h-[485px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white group transition-all duration-300 ease-out hover:rotate-0 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none pointer-events-auto"
        >
          <img
            src={card.image}
            alt={card.alt}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none pointer-events-none"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section 
      onWheel={handleWheel}
      className="relative w-full py-16 sm:py-24 bg-[#E8EBFF] overflow-hidden border-b border-black/10"
    >
      {/* Background Floating Elements - Exact Hero Flying Scribbles (11 Procedural Shapes) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundScribbles.map((scribble) => (
          <MagneticScribble key={scribble.id} scribble={scribble} />
        ))}
      </div>

      {/* Header Container - Width matching 86%-90% responsive container */}
      <div className="relative z-10 w-[95%] sm:w-[90%] lg:w-[86%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>


            {/* Headline matching site typography */}
            <h2 className="text-3xl sm:text-5xl lg:text-[64px] leading-[1.1] tracking-tight montserrat-medium">
              <span className="block text-gray-950">One team.</span>
              <span className="block text-blue-600 mt-1">From static ads to portfolio posts.</span>
            </h2>
          </div>

          {/* Manual Arrow Controls (Neo-brutalist button styling) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleArrowScroll('left')}
              className="p-3 rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black/5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button
              type="button"
              onClick={() => handleArrowScroll('right')}
              className="p-3 rounded-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black/5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Truly Infinite Drag & Scroll Carousel with Deep Buffer (Cards Never Vanish) */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className="relative z-10 w-full overflow-hidden py-6 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          style={{ x }}
          className="flex gap-7 w-max items-center"
        >
          {/* 6 identical sets providing a massive continuous buffer: impossible to see empty edges */}
          {renderCardSet('set-0')}
          {renderCardSet('set-1', true)}
          {renderCardSet('set-2')}
          {renderCardSet('set-3')}
          {renderCardSet('set-4')}
          {renderCardSet('set-5')}
        </motion.div>
      </div>
    </section>
  );
}
