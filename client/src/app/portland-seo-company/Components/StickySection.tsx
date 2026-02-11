'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';


const AboutSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-blue-600 px-6 py-24 text-white overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 flex max-w-6xl items-start gap-8 md:gap-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 h-3 w-3 shrink-0 bg-white md:mt-6 md:h-4 md:w-4" 
        />
        <div className="flex flex-col gap-10 font-sans">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
          >
            We’re Vaphers – a brand and digital agency, blending strategic insight with creative craft.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl text-blue-100"
          >
            We design brands, places and products that people love.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default function StickySection() {
  return (
    <main className="w-full bg-white">
      
      <div className="sticky top-0 z-10 min-h-screen w-full">
         <AboutSection />
      </div>

    </main>
  );
}