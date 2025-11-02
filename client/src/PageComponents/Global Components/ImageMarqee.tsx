'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';

interface MarqueeImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface PortfolioMarqueeProps {
  images: MarqueeImage[];
  pxPerSec?: number; // speed in pixels per second
  gap?: number;      // gap between items in px
  itemWidth?: number;
  itemHeight?: number;
}

export function PortfolioMarquee({
  images,
  pxPerSec = 60,
  gap = 16,
  itemWidth = 800,
  itemHeight = 450,
}: PortfolioMarqueeProps) {
  // 1) Build long lane (duplicate for seamless wrap)
  const lane = useMemo(() => [...images, ...images, ...images], [images]);

  // 2) Motion value holds the live X offset (never reset)
  const x = useMotionValue(0);

  // 3) rAF control
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pausedRef = useRef<boolean>(false);

  // 4) Total width of one logical sequence
  const sequenceWidth = images.length * (itemWidth + gap);

  // 5) Start the rAF loop
  useEffect(() => {
    const step = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTsRef.current != null) {
          const dt = (ts - lastTsRef.current) / 1000; // seconds
          const delta = -pxPerSec * dt; // move left
          let next = x.get() + delta;

          // Wrap seamlessly using modulo of sequence width
          // Keep x in [-sequenceWidth, 0)
          if (sequenceWidth > 0) {
            if (next <= -sequenceWidth) {
              next = next + sequenceWidth;
            } else if (next > 0) {
              next = next - sequenceWidth;
            }
          }

          x.set(next);
        }
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pxPerSec, sequenceWidth, x]);

  // 6) Pause only when hovering any card
  const handleEnter = () => {
    pausedRef.current = true;
  };
  const handleLeave = () => {
    pausedRef.current = false;
  };

  return (
    <div className="w-full overflow-hidden bg-black py-8">
      <motion.div
        className="flex"
        style={{ x, gap: `${gap}px` }}
      >
        {lane.map((img, idx) => (
          <div
            key={`${img.id}-${idx}`}
            className="relative flex-shrink-0"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ width: itemWidth, height: itemHeight }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes={`${itemWidth}px`}
                priority={idx < 3}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
