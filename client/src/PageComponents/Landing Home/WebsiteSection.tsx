'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react'

// =========================================
// 1. DATA
// =========================================

const gridProjects = [
  {
    id: 1,
    title: 'FIX IT NOW',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166010/FixItNow_fbpzfx.png',
  },
  {
    id: 2,
    title: 'INTERIO',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166006/Interio_gqpsbc.png',
  },
  {
    id: 3,
    title: 'TRIVAA',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166003/Trivaa_jvqmzk.png',
  },
  {
    id: 4,
    title: 'DRAVII LIFESTYLES',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762165991/Dravii_Lifestyles_1_jcavgn.png',
  },
];

// =========================================
// 2. Website Section Starting Config
// =========================================

const PatternBG =
  'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg';

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -12, 0], // Even tighter movement for tiny screens
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.3,
    },
  }),
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mql.matches);
    
    const handleChange = () => setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return mounted ? isMobile : true; 
};

// =========================================
// 1st Section 
// =========================================

const DesignPartnerSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xLeft = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [0, 0] : [-200, 0]
  );

  const xRight = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [0, 0] : [200, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  return (
    <section
        ref={ref}
        className="relative w-full overflow-hidden bg-white bg-cover bg-center bg-no-repeat py-10 sm:py-16 lg:py-24 lg:min-h-screen flex items-center"
        style={{ backgroundImage: `url(${PatternBG})` }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* LEFT CONTENT */}
            <motion.div
                style={{ x: xLeft, opacity }}
                className="w-full lg:w-1/2 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
            >
                <div>
                  {/* Scaled down to text-3xl for the absolute smallest screens */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-gray-900 mb-4 bungee-shade leading-[1.15]">
                      We Design
                      <span className="bg-blue-700 bg-clip-text text-transparent block sm:inline">
                      {' '}Luxury Design Portfolios
                      </span>
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-xl">
                      Vaphers is the premier web design agency for <span className="font-medium">interior designers, architects, and luxury home studios</span>. We build editorial, visually captivating websites that showcase your spatial transformations and design projects in breathtaking clarity. Every layout is crafted for elegance, lightning-fast high-resolution media loading, and seamless search engine discoverability—turning discerning visitors into signed high-budget design commissions.
                  </p>
                </div>

                <div className="pt-2 w-full sm:w-auto">
                  <a href="https://www.vaphers.com/contact" className="block sm:inline-block w-full sm:w-auto">
                    {/* Made text wrap and scaled down padding/text for tiny screens */}
                    <div className="flex items-center justify-center px-4 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-base font-semibold rounded-xl sm:rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full">
                      <span className="mr-2 sm:mr-3 whitespace-normal text-center leading-tight">Explore Studio Web Design</span>
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </a>
                </div>
            </motion.div>

            {/* RIGHT IMAGES */}
            <motion.div
                style={{ x: xRight, opacity }}
                className="w-full lg:w-1/2 flex justify-center relative mt-4 lg:mt-0"
            >
                {/* Critical Fix: width is 80% on tiny screens to guarantee room for the floating icons to hang off the edges without breaking the viewport */}
                <div className="relative w-[80%] max-w-[280px] sm:w-full sm:max-w-[320px] md:max-w-md">
                <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047475/girl-laptop_kwggux.png"
                    alt="Website design and digital marketing performance illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain relative z-10"
                    priority
                />

                <div className="absolute inset-0 pointer-events-none z-20">
                    <motion.div
                    animate={{ x: [0, 8, 0], y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    // Pulled negative margins in tightly
                    className="absolute -top-2 -left-4 sm:top-0 sm:-left-4"
                    >
                    <Image
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1765277333/Google_LOGO_kybgvd.png"
                        alt="Google"
                        width={80}
                        height={80}
                        className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
                    />
                    </motion.div>

                    <motion.div
                    custom={1}
                    variants={floatingVariants}
                    animate="animate"
                    // Pulled negative margins in tightly
                    className="absolute top-8 -right-6 sm:top-14 sm:-right-8"
                    >
                    <Image
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1765277313/Get_More_Clients_mx49qw.png"
                        alt="SEO ranking growth"
                        width={176}
                        height={176}
                        className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
                    />
                    </motion.div>

                    <motion.div
                    custom={2}
                    variants={floatingVariants}
                    animate="animate"
                    // Pulled negative margins in tightly
                    className="absolute bottom-4 -left-6 sm:bottom-12 sm:-left-6"
                    >
                    <Image
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png"
                        alt="Outperform competitors"
                        width={176}
                        height={176}
                        className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-lg"
                    />
                    </motion.div>
                </div>
                </div>
            </motion.div>
            </div>
        </div>
    </section>
  );
};

// =========================================
// 2nd Section
// =========================================

const AboutSection = () => {
  return (
    <section className="relative flex lg:min-h-screen w-full items-center justify-center bg-blue-600 px-4 sm:px-6 py-14 sm:py-20 lg:py-24 text-white overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl items-start gap-4 sm:gap-6 md:gap-12">
        <div className="mt-2 md:mt-4 h-2.5 w-2.5 sm:h-4 sm:w-4 shrink-0 bg-white" />
        <div className="flex flex-col gap-5 sm:gap-8 md:gap-10">
          {/* Scaled down to text-xl for smallest screens */}
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.3] md:leading-[1.15] tracking-tight">
            We’re Vaphers – a strategic creative agency blending high-aesthetic portfolio design with data-driven growth for interior designers.
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.3] md:leading-[1.15] tracking-tight text-blue-200">
            We craft exceptional digital portfolio experiences and luxury design websites that command prestige and attract high-budget clients.
          </p>
        </div>
      </div>
    </section>
  );
};

// =========================================
// 3rd Section
// =========================================

const ProjectGrid = () => {
  return (
    <section className="w-full bg-white px-4 py-12 sm:py-16 md:py-24 md:px-8 z-20 relative shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
        {gridProjects.map((project) => (
          <div
            key={project.id}
            className="group relative aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-xl md:rounded-none"
          >
            <img
              src={project.src}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 bg-white px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest">
              → {project.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// =========================================
// 6. MAIN PAGE
// =========================================

export default function Home() {
  return (
    <main className="w-full bg-white relative">
      <div className="relative lg:sticky top-0 z-0 w-full bg-white">
        <DesignPartnerSection />
      </div>

      <div className="relative lg:sticky top-0 z-10 w-full bg-blue-600">
        <AboutSection />
      </div>

      <div className="relative z-20 w-full bg-white">
        <ProjectGrid />
      </div>
    </main>
  );
}