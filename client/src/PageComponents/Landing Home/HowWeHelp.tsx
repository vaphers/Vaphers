'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface CapabilityCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  subtext: string;
  bgColor: string;
  textColor: string;
  eyebrowColor: string;
  tilt: string;
  link: string;
  buttonText: string;
  buttonBg: string;
  buttonTextColor: string;
}

const capabilities: CapabilityCard[] = [
  {
    id: 'seo',
    eyebrow: 'THE FOUNDATION',
    title: 'SEO',
    description:
      'We position your interior design studio at the very top of Google when high-net-worth homeowners search for luxury residential renovations and spatial architecture.',
    subtext:
      'From dominating local map packs in affluent postal codes to ranking for high-ticket design keywords, we capture ready-to-hire clients before your competitors even know they exist.',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    eyebrowColor: 'text-blue-100',
    tilt: 'lg:-rotate-3',
    link: '/seo-services',
    buttonText: 'Explore SEO',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-black',
  },
  {
    id: 'ai-seo',
    eyebrow: 'THE CITATIONS',
    title: 'AI SEO',
    description:
      'When affluent clients ask ChatGPT, Perplexity, or Google AI Overviews "Who is the best interior designer near me?", we make sure your firm is recommended first.',
    subtext:
      'We engineer brand entity authority, structured digital PR, and semantic signals so generative AI engines name and cite your studio with unwavering authority.',
    bgColor: 'bg-[#F7B6CB]',
    textColor: 'text-gray-950',
    eyebrowColor: 'text-pink-900',
    tilt: 'lg:-rotate-1',
    link: '/seo-services/ai-seo-services',
    buttonText: 'Explore AI SEO',
    buttonBg: 'bg-black',
    buttonTextColor: 'text-white',
  },
  {
    id: 'paid-ads',
    eyebrow: 'THE PIPELINE',
    title: 'Paid Ads',
    description:
      'High-precision Google Search and luxury Meta ad funnels engineered strictly for interior design firms, bespoke remodelers, and architectural studios.',
    subtext:
      'We target affluent zip codes to filter out budget tire-kickers, consistently filling your pipeline with verified high-net-worth consultations ready for your retainers.',
    bgColor: 'bg-[#421524]',
    textColor: 'text-white',
    eyebrowColor: 'text-rose-200',
    tilt: 'lg:rotate-1',
    link: '/contact',
    buttonText: 'Explore Paid Ads',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-black',
  },
  {
    id: 'video-marketing',
    eyebrow: 'THE CONVERSION',
    title: 'Video Marketing',
    description:
      'Interior design is an experiential craft. We produce cinematic project walk-throughs, before-and-after spatial reveals, and founder narrative reels.',
    subtext:
      'We transform your finished residential spaces into thumb-stopping visual assets that capture emotional buy-in and turn casual scrollers into signed design contracts.',
    bgColor: 'bg-[#240E63]',
    textColor: 'text-white',
    eyebrowColor: 'text-purple-200',
    tilt: 'lg:rotate-3',
    link: '/contact',
    buttonText: 'Explore Video',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-black',
  },
];

export default function HowWeHelp() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#FAF8F5] overflow-hidden border-b border-black/10">
      {/* 90% Container strictly matching user requirements and site layout */}
      <div className="w-[90%] max-w-[90%] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">

          <h2 className="text-3xl sm:text-5xl lg:text-[66px] text-gray-950 montserrat-medium leading-[1.12] tracking-tight max-w-5xl mx-auto">
            Helping interior design studios show up <span className="text-blue-600">first</span> when luxury clients search.
          </h2>

          <p className="montserrat-regular text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Four interconnected growth engines engineered to turn search intent, AI recommendations, and luxury visual storytelling into high-ticket signed retainers.
          </p>
        </div>

        {/* 4 Cards Container - Spans full 90% width with generous padding so tilted cards are never cut off */}
        <div className="w-full overflow-x-auto lg:overflow-visible scrollbar-none px-4 sm:px-6 lg:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-4 gap-4 lg:gap-5 xl:gap-6 min-w-[1050px] lg:min-w-0 w-full items-stretch p-3 sm:p-4 lg:p-5">
            {capabilities.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`relative w-full min-h-[480px] xl:min-h-[520px] ${card.bgColor} ${card.textColor} border-2 border-black rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-7 xl:p-8 flex flex-col justify-between ${card.tilt} origin-center hover:rotate-0 hover:-translate-y-4 hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out group cursor-pointer`}
              >
                {/* Top: Eyebrow + Big Bold Title */}
                <div>
                  <span className={`font-jetbrains text-[11px] sm:text-xs font-bold uppercase tracking-widest ${card.eyebrowColor} block mb-2 sm:mb-3`}>
                    {card.eyebrow}
                  </span>
                  <h3 className="montserrat-bold text-3xl sm:text-4xl xl:text-[42px] tracking-tight leading-tight">
                    {card.title}
                  </h3>

                  {/* Body Paragraphs */}
                  <div className="mt-6 sm:mt-8 space-y-3 montserrat-regular text-xs sm:text-[13px] xl:text-[14px] leading-relaxed opacity-95">
                    <p>{card.description}</p>
                    <p className="opacity-85">{card.subtext}</p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-4 border-t border-current/15">
                  <Link
                    href={card.link}
                    className={`w-full py-2.5 px-4 rounded-xl border-2 border-black ${card.buttonBg} ${card.buttonTextColor} montserrat-bold text-xs sm:text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-between group-hover:scale-[1.02]`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Sleek Center Pill Bar matching reference design */}
        <div className="w-32 h-1.5 bg-black/80 rounded-full mx-auto mt-6 sm:mt-10" />

      </div>
    </section>
  );
}
