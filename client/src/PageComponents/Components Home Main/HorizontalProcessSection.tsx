'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HorizontalProcessSection() {
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor in search box
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-28 bg-white overflow-hidden border-b border-gray-200">
      {/* Subtle Dot Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.1px, transparent 1.1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-[95%] sm:w-[90%] lg:w-[86%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial Serif Headline, Copy & CTA        */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Headline matching site typography */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[80px] text-gray-950 montserrat-bold leading-[1.04] tracking-tight">
              Get named <br />
              when buyers <br />
              ask{' '}
              <span className="text-blue-600 relative inline-block border-b-4 sm:border-b-[5px] border-blue-600 pb-0.5">
                AI.
              </span>
            </h2>

            {/* Sub-headline */}
            <div className="mt-8 sm:mt-10 max-w-xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-950 leading-snug font-sans">
                AI visibility and SEO for software companies, done for you.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                ChatGPT, Perplexity, AI Overviews and Google. One real change ships to your site every day, and we check each one before it goes live.
              </p>
            </div>

            {/* CTA Button and Founder Direct Card */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 flex-wrap">
              {/* Site Signature Neo-Brutalist Button */}
              <Link
                href="/contact"
                className="bg-blue-600 border-2 border-black rounded-xl px-6 py-3.5 text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer inline-flex items-center justify-center gap-3 text-sm sm:text-base select-none no-underline group"
              >
                <span>Get started</span>
                <span className="p-1 rounded bg-blue-700/70 border border-white/20 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </Link>

              {/* Founder Avatar & Direct Text Card */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-300 shadow-sm shrink-0 bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
                    alt="Josh, founder"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-xs sm:text-[13px] leading-tight">
                  <span className="text-gray-500 font-sans">Not sure it fits your site?</span>
                  <div className="mt-1">
                    <span className="font-bold text-gray-900 font-sans">Text Josh, the founder </span>
                    <a
                      href="tel:+12055390956"
                      className="text-blue-600 font-bold underline hover:text-blue-700 transition-colors"
                    >
                      (205) 539-0956
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Search Box & AI Output Feed                */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-start lg:pl-4 xl:pl-8">
            
            {/* 1. "Someone asks" label */}
            <div className="text-[13px] text-gray-600 font-sans font-normal mb-2">
              Someone asks
            </div>

            {/* 2. Sharp Blue Rectangle Search Input Box */}
            <div className="w-full border-2 border-blue-600 bg-white px-4 py-3 sm:py-3.5 shadow-sm flex items-center">
              <span className="text-xl sm:text-2xl text-gray-950 font-medium tracking-normal select-none montserrat-medium">
                best help desk for small teams
              </span>
              <span 
                className={`inline-block w-[1.5px] h-6 sm:h-7 ml-0.5 bg-blue-600 transition-opacity ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* 3. Sub-label */}
            <div className="text-[13px] text-gray-600 font-sans mt-3 mb-8">
              and every answer includes ExampleCo
            </div>

            {/* 4. Live Search Engine & AI Citations Feed */}
            <div className="space-y-7">
              
              {/* --- GOOGLE RESULT --- */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 bg-blue-600 shrink-0 inline-block" />
                  <span className="text-xs text-gray-600 font-sans font-medium">Google</span>
                </div>
                <div className="text-xs text-gray-500 font-sans mb-1">
                  example.com
                </div>
                <h4 className="text-xl sm:text-2xl text-blue-700 underline font-semibold leading-snug hover:text-blue-800 transition-colors cursor-pointer montserrat-semibold">
                  ExampleCo: help desk for small teams
                </h4>
              </div>

              {/* --- CHATGPT RESULT --- */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 bg-blue-600 shrink-0 inline-block" />
                  <span className="text-xs text-gray-600 font-sans font-medium">ChatGPT</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-sans max-w-lg">
                  For a small team, ExampleCo is the easiest pick. The pricing is clear and there is a free plan.
                </p>
                <div className="relative inline-block mt-0.5">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-700 underline hover:text-blue-800 font-sans font-medium"
                  >
                    example.com
                  </a>

                  {/* Classic Pixel-Crisp Hand Cursor Graphic Hovering Over Link */}
                  <div className="absolute -bottom-4 right-1/2 translate-x-3 pointer-events-none select-none z-10">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-[1px_2px_3px_rgba(0,0,0,0.25)]"
                    >
                      <path
                        d="M9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3V10.5H12V5C12 4.44772 12.4477 4 13 4C13.5523 4 14 4.44772 14 5V10.5H15V7C15 6.44772 15.5523 6 16 6C16.5523 6 17 6.44772 17 7V10.5H18V9C18 8.44772 18.4477 8 19 8C19.5523 8 20 8.44772 20 9V14.5C20 17.5376 17.5376 20 14.5 20H12.2C11.5 20 10.8 19.7 10.3 19.2L6 14.9L6.9 14C7.4 13.5 8.1 13.3 8.8 13.5L10 13.8V3C10 2.44772 9.44772 2 9 2"
                        fill="#ffffff"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* --- PERPLEXITY · SOURCES RESULT --- */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 bg-blue-600 shrink-0 inline-block" />
                  <span className="text-xs text-gray-600 font-sans font-medium">Perplexity · Sources</span>
                </div>
                <div className="space-y-1 text-xs sm:text-[13px] font-sans">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bold text-gray-950 text-xs">1</span>
                    <a
                      href="https://example.com/compare"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline hover:text-blue-800"
                    >
                      example.com/compare
                    </a>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bold text-gray-950 text-xs">2</span>
                    <span className="text-gray-500">
                      reddit.com/r/saas
                    </span>
                  </div>
                </div>
              </div>

              {/* --- GOOGLE AI OVERVIEWS RESULT --- */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 bg-blue-600 shrink-0 inline-block" />
                  <span className="text-xs text-gray-600 font-sans font-medium">Google AI Overviews</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-sans max-w-lg">
                  Small teams often pick ExampleCo for its simple pricing.
                </p>
                <div>
                  <a
                    href="https://example.com/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-700 underline hover:text-blue-800 font-sans font-medium"
                  >
                    example.com/pricing
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
