"use client";

import React from "react";

type QuestionThumbnailProps = {
  title: string;
  slug?: string;
  featuredImage?: string | null;
  aspectRatio?: string;
  className?: string;
};

// High-impact Blue 600 gradient palettes (Electric Royal Blue, Sapphire, Ocean Cyan-Blue, Deep Cobalt)
const VIBRANT_BLUE_GRADIENTS = [
  "from-[#1d4ed8] via-[#2563eb] to-[#3b82f6]", // Royal Blue Peak
  "from-[#0284c7] via-[#2563eb] to-[#1d4ed8]", // Sapphire Cyan Blue
  "from-[#1e40af] via-[#2563eb] to-[#60a5fa]", // Deep Indigo Blue to Electric Sky
  "from-[#2563eb] via-[#008dda] to-[#1d4ed8]", // Vaphers Brand Electric Blue
  "from-[#0369a1] via-[#1d4ed8] to-[#3b82f6]", // Ocean Deep Blue
  "from-[#2563eb] via-[#38bdf8] to-[#1e40af]", // Vibrant Sky Sapphire
  "from-[#1d6fc2] via-[#2563eb] to-[#0284c7]", // Azure Royal Blue
  "from-[#2563eb] via-[#1d4ed8] to-[#0096c7]", // Electric Cyan Spark
];

function getHash(str: string): number {
  let hash = 0;
  if (!str) return 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function QuestionThumbnail({
  title,
  slug = "",
  featuredImage,
  aspectRatio = "aspect-video",
  className = "",
}: QuestionThumbnailProps) {
  if (featuredImage) {
    return (
      <div className={`relative w-full ${aspectRatio} overflow-hidden ${className}`}>
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  const hash = getHash(title + slug);
  const gradient = VIBRANT_BLUE_GRADIENTS[hash % VIBRANT_BLUE_GRADIENTS.length];
  
  // Procedural variables producing 100s of patterns
  const patternStyle = hash % 8;
  const tileSize = 20 + (hash % 4) * 10; // 20, 30, 40, 50
  const strokeWidth = 1.2 + (hash % 3) * 0.4;
  const patternId = `v-pattern-${hash}`;
  const rotation = (hash % 4) * 45;

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-br ${gradient} select-none group/thumb ${className}`}
    >
      {/* Background Mesh Orbs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/20 blur-3xl pointer-events-none group-hover/thumb:scale-125 transition-transform duration-700" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-cyan-300/25 blur-3xl pointer-events-none group-hover/thumb:scale-125 transition-transform duration-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-300/20 blur-2xl pointer-events-none" />

      {/* Dynamic Procedural SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none group-hover/thumb:scale-105 transition-transform duration-700 ease-out" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            width={tileSize}
            height={tileSize}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${rotation})`}
          >
            {/* Pattern 0: Pixel Matrix Blocks (Mistral Style) */}
            {patternStyle === 0 && (
              <>
                <rect x="0" y="0" width={tileSize / 2} height={tileSize / 2} fill="#ffffff" opacity="0.45" />
                <rect x={tileSize / 2} y={tileSize / 2} width={tileSize / 2} height={tileSize / 2} fill="#ffffff" opacity="0.25" />
                <rect x={tileSize / 2} y="0" width={tileSize / 2} height={tileSize / 2} fill="#60a5fa" opacity="0.5" />
              </>
            )}

            {/* Pattern 1: Tech Grid Interlock */}
            {patternStyle === 1 && (
              <path d={`M ${tileSize} 0 L 0 0 0 ${tileSize}`} fill="none" stroke="#ffffff" strokeWidth={strokeWidth} opacity="0.8" />
            )}

            {/* Pattern 2: Floating Dot Matrix */}
            {patternStyle === 2 && (
              <circle cx={tileSize / 2} cy={tileSize / 2} r={tileSize / 6} fill="#ffffff" opacity="0.6" />
            )}

            {/* Pattern 3: Diagonal Tech Hatch */}
            {patternStyle === 3 && (
              <line x1="0" y1="0" x2="0" y2={tileSize} stroke="#ffffff" strokeWidth={strokeWidth * 1.8} opacity="0.7" />
            )}

            {/* Pattern 4: Concentric Target Rings */}
            {patternStyle === 4 && (
              <>
                <circle cx={tileSize / 2} cy={tileSize / 2} r={tileSize / 3} fill="none" stroke="#ffffff" strokeWidth={strokeWidth} opacity="0.7" />
                <circle cx={tileSize / 2} cy={tileSize / 2} r={tileSize / 6} fill="#ffffff" opacity="0.4" />
              </>
            )}

            {/* Pattern 5: Crosshatch Diamonds */}
            {patternStyle === 5 && (
              <path d={`M 0 0 L ${tileSize} ${tileSize} M ${tileSize} 0 L 0 ${tileSize}`} fill="none" stroke="#ffffff" strokeWidth={strokeWidth} opacity="0.7" />
            )}

            {/* Pattern 6: Chevron Waves */}
            {patternStyle === 6 && (
              <path d={`M 0 ${tileSize/2} L ${tileSize/2} 0 L ${tileSize} ${tileSize/2}`} fill="none" stroke="#ffffff" strokeWidth={strokeWidth} opacity="0.8" />
            )}

            {/* Pattern 7: Circuit Node Net */}
            {patternStyle === 7 && (
              <>
                <circle cx={tileSize/4} cy={tileSize/4} r={3.5} fill="#ffffff" opacity="0.9" />
                <line x1={tileSize/4} y1={tileSize/4} x2={tileSize} y2={tileSize/4} stroke="#ffffff" strokeWidth={1.2} opacity="0.7" />
              </>
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Floating Glassmorphism Center Accent Box */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center group-hover/thumb:scale-110 group-hover/thumb:bg-white/25 transition-all duration-300">
          <div className="w-4 h-4 rounded-full bg-white shadow-xs group-hover/thumb:scale-125 transition-transform" />
        </div>
      </div>
    </div>
  );
}
