"use client";

import React from "react";
import Image from "next/image";
import { HelpCircle, Sparkles, MessageCircleQuestion } from "lucide-react";

type QuestionThumbnailProps = {
  title: string;
  slug?: string;
  featuredImage?: string | null;
  category?: string;
  aspectRatio?: string;
  className?: string;
  showTitleOverlay?: boolean;
};

const GRADIENTS = [
  "from-blue-600 via-indigo-600 to-purple-700",
  "from-emerald-600 via-teal-600 to-cyan-700",
  "from-indigo-600 via-purple-600 to-pink-600",
  "from-blue-500 via-cyan-600 to-teal-600",
  "from-violet-600 via-purple-700 to-indigo-800",
  "from-amber-600 via-orange-600 to-red-600",
  "from-sky-600 via-blue-600 to-indigo-800",
  "from-fuchsia-600 via-rose-600 to-pink-700",
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
  category,
  aspectRatio = "aspect-video",
  className = "",
  showTitleOverlay = false,
}: QuestionThumbnailProps) {
  if (featuredImage) {
    return (
      <div className={`relative w-full ${aspectRatio} overflow-hidden ${className}`}>
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    );
  }

  const hash = getHash(title + slug);
  const gradient = GRADIENTS[hash % GRADIENTS.length];
  const patternType = hash % 3;

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between text-white select-none ${className}`}
    >
      {/* SVG Background Pattern */}
      {patternType === 0 && (
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-dots-${hash}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-dots-${hash})`} />
        </svg>
      )}

      {patternType === 1 && (
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
          <path d="M0 80 Q 100 20, 200 80 T 400 80 V 200 H 0 Z" fill="rgba(255,255,255,0.18)" />
          <path d="M0 120 Q 100 60, 200 120 T 400 120 V 200 H 0 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
      )}

      {patternType === 2 && (
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-lines-${hash}`} width="24" height="24" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="24" stroke="#ffffff" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-lines-${hash})`} />
        </svg>
      )}

      {/* Decorative Glow Orbs */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-black/20 blur-2xl pointer-events-none" />

      {/* Top Badge & Icon */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-semibold tracking-wider uppercase text-white shadow-xs">
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>{category || "Common Question"}</span>
        </span>
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Middle/Bottom Content */}
      <div className="relative z-10 mt-auto pt-4">
        {showTitleOverlay ? (
          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md line-clamp-2 montserrat-bold">
            {title}
          </h3>
        ) : (
          <div className="flex items-center gap-2 text-white/90 text-xs font-semibold tracking-wide uppercase">
            <MessageCircleQuestion className="w-4 h-4 text-blue-200" />
            <span>Answered FAQ</span>
          </div>
        )}
      </div>
    </div>
  );
}
