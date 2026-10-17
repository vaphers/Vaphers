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
        const t = (i / totalPoints) * Math.PI * 10;
        const petal = 38 * Math.cos(3 * t);
        const x = 50 + petal * Math.cos(t) + (Math.sin(i * 1.4) * 2.5);
        const y = 50 + petal * Math.sin(t) + (Math.cos(i * 1.8) * 2.5);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
    case 9:
    default: {
      for (let i = 0; i <= totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 14;
        const r = 34 + 6 * Math.sin(7 * t) + (Math.sin(i * 2.2) * 2.8);
        const x = 50 + r * Math.cos(t);
        const y = 50 + r * Math.sin(t);
        p += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      break;
    }
  }
  return p;
}

const ScribbleShape: React.FC<{ shapeIndex: number; className?: string }> = React.memo(
  ({ shapeIndex, className }) => {
    const d = useMemo(() => generateUniqueScribblePath(shapeIndex), [shapeIndex]);
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d={d}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black/35 hover:text-blue-600 transition-colors duration-300"
        />
      </svg>
    );
  }
);
ScribbleShape.displayName = 'ScribbleShape';

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

const MagneticScribble: React.FC<{ scribble: ScribbleConfig }> = ({ scribble }) => {
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 140, damping: 14, mass: 0.1 });
  const springY = useSpring(magnetY, { stiffness: 140, damping: 14, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    magnetX.set(-distanceX * 0.65);
    magnetY.set(-distanceY * 0.65);
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
      <div className="w-full h-full">
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

const backgroundScribbles: ScribbleConfig[] = [
  { 
    id: 1, posX: 8, posY: 14, size: 105, rotate: 20, shapeIndex: 0,
    floatPath: { x: [0, 22, -14, 18, 0], y: [0, 20, -16, 12, 0], rotate: [0, 16, -12, 8, 0], scale: [1, 1.05, 0.95, 1.02, 1], duration: 7.6 }
  },
  { 
    id: 2, posX: 35, posY: 10, size: 90, rotate: -25, shapeIndex: 1,
    floatPath: { x: [0, -20, 24, -10, 0], y: [0, -14, 18, -10, 0], rotate: [0, -14, 18, -8, 0], scale: [1, 0.96, 1.05, 0.98, 1], duration: 8.8 }
  },
  { 
    id: 3, posX: 64, posY: 9, size: 95, rotate: 40, shapeIndex: 2,
    floatPath: { x: [0, 16, -18, 12, 0], y: [0, 22, -16, 12, 0], rotate: [0, 20, -14, 10, 0], scale: [1, 1.04, 0.96, 1.02, 1], duration: 6.9 }
  },
  { 
    id: 4, posX: 92, posY: 15, size: 110, rotate: -15, shapeIndex: 3,
    floatPath: { x: [0, -25, 15, -16, 0], y: [0, 18, -22, 12, 0], rotate: [0, -16, 14, -10, 0], scale: [1, 0.95, 1.06, 0.97, 1], duration: 9.2 }
  },
  { 
    id: 5, posX: 6, posY: 50, size: 115, rotate: 55, shapeIndex: 4,
    floatPath: { x: [0, 18, -14, 20, 0], y: [0, -28, 24, -12, 0], rotate: [0, 14, -20, 10, 0], scale: [1, 1.04, 0.95, 1.02, 1], duration: 8.2 }
  },
  { 
    id: 6, posX: 94, posY: 52, size: 115, rotate: -60, shapeIndex: 7,
    floatPath: { x: [0, -16, 15, -20, 0], y: [0, 25, -26, 14, 0], rotate: [0, -18, 15, -10, 0], scale: [1, 0.95, 1.05, 0.98, 1], duration: 8.5 }
  },
  { 
    id: 7, posX: 27, posY: 34, size: 85, rotate: -30, shapeIndex: 5,
    floatPath: { x: [0, -18, 16, -10, 0], y: [0, 14, -18, 8, 0], rotate: [0, -12, 15, -6, 0], scale: [1, 0.97, 1.03, 0.99, 1], duration: 7.7 }
  },
  { 
    id: 8, posX: 79, posY: 36, size: 90, rotate: 25, shapeIndex: 6,
    floatPath: { x: [0, 18, -15, 12, 0], y: [0, -16, 14, -10, 0], rotate: [0, 14, -12, 6, 0], scale: [1, 1.04, 0.96, 1.01, 1], duration: 7.3 }
  },
  { 
    id: 9, posX: 8, posY: 85, size: 110, rotate: 18, shapeIndex: 8,
    floatPath: { x: [0, 22, -16, 14, 0], y: [0, -22, 16, -10, 0], rotate: [0, 16, -14, 8, 0], scale: [1, 1.05, 0.96, 1.02, 1], duration: 7.2 }
  },
  { 
    id: 10, posX: 50, posY: 86, size: 105, rotate: -35, shapeIndex: 9,
    floatPath: { x: [0, -22, 18, -14, 0], y: [0, -15, 18, -12, 0], rotate: [0, -14, 18, -8, 0], scale: [1, 0.96, 1.04, 0.98, 1], duration: 8.3 }
  },
  { 
    id: 11, posX: 90, posY: 84, size: 115, rotate: 45, shapeIndex: 1,
    floatPath: { x: [0, -18, 16, -12, 0], y: [0, -22, 18, -8, 0], rotate: [0, 16, -12, 10, 0], scale: [1, 1.05, 0.95, 1.02, 1], duration: 7.9 }
  },
];

interface VideoItem {
  id: string;
  src: string;
  poster: string;
  tilt: number;
}

const VIDEO_WORKS: VideoItem[] = [
  {
    id: "vid-1",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714905/decadentdepictions_ssspin.io_1790714806.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714905/decadentdepictions_ssspin.io_1790714806.jpg",
    tilt: -2.2,
  },
  {
    id: "vid-2",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714840/minipagebioarchive_ssspin.io_1790714828.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714840/minipagebioarchive_ssspin.io_1790714828.jpg",
    tilt: 2.0,
  },
  {
    id: "vid-3",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714352/IMG_5738.MOV.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714352/IMG_5738.MOV.jpg",
    tilt: -1.8,
  },
  {
    id: "vid-4",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714705/Video-36346.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714705/Video-36346.jpg",
    tilt: 2.2,
  },
  {
    id: "vid-5",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714315/lv_0_20260930014015.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714315/lv_0_20260930014015.jpg",
    tilt: -2.0,
  },
  {
    id: "vid-6",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714449/chiffonandspice_ssspin.io_1790714410.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714449/chiffonandspice_ssspin.io_1790714410.jpg",
    tilt: 1.8,
  },
  {
    id: "vid-7",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714269/lv_0_20260930013757.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714269/lv_0_20260930013757.jpg",
    tilt: -2.2,
  },
  {
    id: "vid-8",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714439/chiffonandspice_ssspin.io_1790714426.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714439/chiffonandspice_ssspin.io_1790714426.jpg",
    tilt: 2.0,
  },
  {
    id: "vid-9",
    src: "https://res.cloudinary.com/vt5gqi1c/video/upload/f_mp4,vc_h264,q_auto,w_480/v1790714249/IMG_5657.MOV.mp4",
    poster:
      "https://res.cloudinary.com/vt5gqi1c/video/upload/f_auto,q_auto,w_500,so_0/v1790714249/IMG_5657.MOV.jpg",
    tilt: -1.6,
  },
];

export default function VideoSuiteCarousel() {
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  // Manual Drag Pointer State
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);

  // Continuous Position motion value
  const x = useMotionValue(0);

  // Measure one complete set width with resize observer
  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        const measured = setRef.current.offsetWidth;
        if (measured > 0) {
          setSetWidth(measured);
          // Start right in the middle buffer: -2 * setWidth
          x.set(-2 * measured);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [x]);

  // CONTINUOUS LEFT-TO-RIGHT MARQUEE ANIMATION
  // Moves in the POSITIVE direction: x += (speed * delta) / 1000
  useAnimationFrame((_, delta) => {
    if (isDraggingRef.current || setWidth === 0) return;

    // Movement speed: 75 pixels per second moving LEFT TO RIGHT
    const speed = 75;
    let nextX = x.get() + (speed * delta) / 1000;

    // Seamless modulo wrapping for left-to-right:
    // As nextX moves positive and exceeds -setWidth, wrap back by subtracting setWidth
    while (nextX > -setWidth) nextX -= setWidth;
    while (nextX <= -2 * setWidth) nextX += setWidth;

    x.set(nextX);
  });

  // Pointer Drag Handlers with seamless wrapping
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartVal.current = x.get();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture isn't supported
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartX.current;
    let targetX = dragStartVal.current + delta;

    while (targetX > -setWidth) targetX -= setWidth;
    while (targetX <= -2 * setWidth) targetX += setWidth;

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

  // Horizontal wheel / trackpad swipe
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
      if (setWidth === 0) return;
      let targetX = x.get() - e.deltaX * 0.9;
      while (targetX > -setWidth) targetX -= setWidth;
      while (targetX <= -2 * setWidth) targetX += setWidth;
      x.set(targetX);
    }
  };

  // Smooth manual arrow navigation
  const handleArrowScroll = (direction: 'left' | 'right') => {
    if (setWidth === 0) return;
    const cardStep = 320;
    const current = x.get();
    const target = direction === 'left' ? current - cardStep : current + cardStep;

    animate(x, target, {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        let wrapped = latest;
        while (wrapped > -setWidth) wrapped -= setWidth;
        while (wrapped <= -2 * setWidth) wrapped += setWidth;
        x.set(wrapped);
      },
    });
  };

  // Renders a set of tilted video cards with autoPlay and hover leveling
  const renderCardSet = (prefix: string, isFirstSet = false) => (
    <div
      ref={isFirstSet ? setRef : undefined}
      className="flex gap-7 shrink-0 items-center py-4"
    >
      {VIDEO_WORKS.map((video) => (
        <div
          key={`${prefix}-${video.id}`}
          style={{
            transform: `rotate(${video.tilt}deg)`,
          }}
          className="relative shrink-0 w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px] h-[400px] sm:h-[450px] md:h-[490px] lg:h-[530px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-black group transition-all duration-300 ease-out hover:rotate-0 hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] pointer-events-auto"
        >
          <video
            src={video.src}
            poster={video.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center select-none pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
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
      {/* Background Floating Elements - Exact Hero Flying Scribbles (11 Shapes) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundScribbles.map((scribble) => (
          <MagneticScribble key={scribble.id} scribble={scribble} />
        ))}
      </div>

      {/* Header Container - Width matching 90% responsive container */}
      <div className="relative z-10 w-[95%] sm:w-[90%] lg:w-[86%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>


            {/* Headline matching site typography */}
            <h2 className="text-3xl sm:text-5xl lg:text-[64px] leading-[1.1] tracking-tight montserrat-medium">
              <span className="block text-gray-950">Cinematic motion.</span>
              <span className="block text-blue-600 mt-1">From project walk-throughs to viral reels.</span>
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

      {/* Infinite Left-to-Right Carousel */}
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
          {/* 4 identical sets providing multi-thousand pixel buffer */}
          {renderCardSet('set-0')}
          {renderCardSet('set-1', true)}
          {renderCardSet('set-2')}
          {renderCardSet('set-3')}
        </motion.div>
      </div>
    </section>
  );
}

