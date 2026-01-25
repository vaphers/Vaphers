'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// =========================================
// 1. DATA
// =========================================

const gridProjects = [
  { id: 1, title: 'FIX IT NOW', src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166010/FixItNow_fbpzfx.png' },
  { id: 2, title: 'INTERIO', src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166006/Interio_gqpsbc.png' },
  { id: 3, title: 'TRIVAA', src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166003/Trivaa_jvqmzk.png' },
  { id: 4, title: 'DRAVII LIFESTYLES', src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762165991/Dravii_Lifestyles_1_jcavgn.png' },
];

// =========================================
// 2. COMPONENT: DESIGN PARTNER SECTION (New)
// =========================================

const DesignPartnerSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-white px-6 py-18 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start gap-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl font-light italic leading-tight text-gray-700 md:text-6xl lg:text-6xl bungee-inline-regular "
          >
            Your next design partner
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 text-lg font-light leading-relaxed text-gray-500 md:text-xl"
          >
            <p>
              We believe long-term relation is the way to go if you care about design. 
            </p>
            <p>
              We’re not just pixels providers, you’d rather see us as your part-time design team. 
              Our experience, and knowledge of the start-up ecosystem allow us to make the 
              best decision for both users and business.
            </p>
          </motion.div>

        <Link href="/contact-us">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="group mt-4 flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-medium text-white transition-transform hover:scale-105 cursor-pointer"
          >
            Book a call
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.button>
        </Link>
        </div>

        {/* Right Column: Image/Graphic */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
           className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100 shadow-2xl lg:aspect-[4/3]"
        >
            {/* Replace this src with your actual tablet/device image */}
            <img 
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop" 
              alt="Design Partner Showcase"
              className="h-full w-full object-cover"
            />
        </motion.div>

      </div>
    </section>
  );
};

// =========================================
// 3. COMPONENT: BLUE TEXT (About)
// =========================================

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
            We’re Smiling Wolf – a brand and digital agency, blending strategic insight with creative craft.
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

// =========================================
// 4. COMPONENT: PROJECT GRID
// =========================================

const ProjectGrid = () => {
  return (
    <section className="w-full bg-white px-4 py-20 md:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {gridProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-gray-100"
          >
            <motion.img
              src={project.src}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 z-10 flex items-center gap-2 bg-white px-6 py-4 text-sm font-bold tracking-widest text-black transition-colors group-hover:bg-black group-hover:text-white">
              <span>→</span>
              <span className="uppercase">{project.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// =========================================
// 5. MAIN PAGE LAYOUT
// =========================================

export default function Home() {
  return (
    <main className="w-full bg-white">
      
      {/* LAYER 1: New Design Partner Section (Sticky Base) */}
      <div className="sticky top-0 z-0 w-full">
        <DesignPartnerSection />
      </div>

      {/* LAYER 2: Blue About Section (Slides Over) */}
      <div className="sticky top-0 z-10 min-h-screen w-full">
         <AboutSection />
      </div>

      {/* LAYER 3: Project Grid (Slides Over Blue) */}
      <div className="relative z-20 w-full bg-white">
         <ProjectGrid />
      </div>

    </main>
  );
}