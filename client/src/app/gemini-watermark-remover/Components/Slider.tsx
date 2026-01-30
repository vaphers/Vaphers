"use client"

import React from 'react';
import { cn } from "@/lib/utils";

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  arrowImage?: string;
  className?: string;
}

export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeLabel = "Before (Watermarked)",
  afterLabel = "After (Clean)",
  arrowImage = "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769769716/Frame_79_wnq6ix.png",
  className
}: BeforeAfterComparisonProps) {
  return (
    // Changed to w-screen and px-0 to ensure it hits the edges of the browser
    <section className={cn("w-full min-h-fit py-12 bg-background", className)}>
      <div className="flex flex-col lg:flex-row w-full items-center justify-between px-4 lg:px-10 gap-4">
        
        {/* 1. Before Image Section (Flex-1 to grow) */}
        <div className="flex-1 w-full relative group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-gray-300 transition-all duration-500 hover:scale-[1.01]">
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="w-full h-auto object-cover display-block"
            />
            <div className="absolute top-3 left-4 bg-black/50 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md">
              {beforeLabel}
            </div>
          </div>
        </div>

        {/* 2. Arrow Section (Fixed or smaller width) */}
        <div className="flex shrink-0 w-24 lg:w-32 justify-center items-center">
          <img
            src={arrowImage}
            alt="Transition Arrow"
            className="w-16 h-16 lg:w-24 lg:h-24 lg:rotate-0 rotate-90 opacity-100"
          />
        </div>

        {/* 3. After Image Section (Flex-1 to grow) */}
        <div className="flex-1 w-full relative group">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-green-400 transition-all duration-500 hover:scale-[1.01]">
            <img
              src={afterImage}
              alt={afterLabel}
              className="w-full h-auto object-cover display-block"
            />
            <div className="absolute top-3 right-4 bg-green-600/70 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md">
              {afterLabel}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}