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
    y: [0, -20, 0],
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.3,
    },
  }),
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)');
    const handleChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
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
        className="relative w-full overflow-x-hidden bg-white bg-cover bg-center bg-no-repeat py-16 md:py-24"
        style={{
            backgroundImage: `url(${PatternBG})`,
        }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
            
            {/* LEFT CONTENT */}
            <motion.div
                style={{ x: xLeft, opacity }}
                className="w-full lg:w-1/2 space-y-8"
            >
                {/* Section 1 */}
                <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-center lg:text-left font-sans text-gray-900 mb-4 bungee-shade">
                    We Design
                    <span className="bg-blue-700 bg-clip-text text-transparent block sm:inline">
                    {' '}Conversion-Driven Websites
                    </span>
                </h3>

                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
                    Vaphers is the leading <span className="font-medium">SaaS web design agency</span> focused on building websites that convert traffic into real business outcomes. Every layout is crafted for performance, ensuring your site supports growth from day one. As a trusted{' '}
                    <a
                    href="https://www.vaphers.com/website-development-services/nextjs-website-development"
                    className="text-blue-700 underline hover:text-blue-800 font-medium"
                    >
                    Next.js website development agency
                    </a>
                    , we build fast, scalable, and SEO-friendly platforms. We also specialize in JavaScript SEO, ensuring that complex, framework-driven websites are fully discoverable and rank highly on search engines.
                </p>
                </div>

                {/* Section 2
                <div>
                <h4 className="text-2xl md:text-3xl lg:text-4xl text-center lg:text-left font-sans text-gray-700 mb-4 bungee-inline-regular">
                    What Web Design
                    <span className="bg-blue-600 bg-clip-text text-transparent block sm:inline">
                    {' '}Can Do for Your Business
                    </span>
                </h4>

                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
                    Strategic web design strengthens brand credibility and supports lead generation across all digital touchpoints. Paired with effective{' '}
                    <a
                    href="https://www.vaphers.com/ppc-marketing/lead-generation-services"
                    className="text-blue-700 underline hover:text-blue-800 font-medium"
                    >
                    lead generation strategies
                    </a>
                    , like optimized landing pages and clear calls to action, your website becomes a scalable sales asset. The result: higher engagement, qualified leads, and measurable growth.
                </p>
                </div> */}
            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <a href="https://www.vaphers.com/contact">
                <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <span className="mr-2 sm:mr-3">Start Your Global SEO Growth</span>
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
            </div>
            </motion.div>

            {/* RIGHT IMAGES */}
            <motion.div
                style={{ x: xRight, opacity }}
                className="w-full lg:w-1/2 flex justify-center relative mt-8 lg:mt-0"
            >
                <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
                <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047475/girl-laptop_kwggux.png"
                    alt="Website design and digital marketing performance illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                />

                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                    animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 sm:top-4 left-0 sm:left-4"
                    >
                    <Image
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765277333/Google_LOGO_kybgvd.png"
                        alt="Google"
                        width={80}
                        height={80}
                        className="w-10 h-10 sm:w-28 sm:h-28 object-contain"
                    />
                    </motion.div>

                    <motion.div
                    custom={1}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-4 sm:top-10 right-0 sm:right-0"
                    >
                    <Image
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765277313/Get_More_Clients_mx49qw.png"
                        alt="SEO ranking growth"
                        width={176}
                        height={176}
                        className="w-20 h-20 sm:w-42 sm:h-42 object-contain"
                    />
                    </motion.div>

                    <motion.div
                    custom={2}
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute bottom-12 sm:bottom-24 -left-4 sm:left-4"
                    >
                    <Image
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png"
                        alt="Outperform competitors"
                        width={176}
                        height={176}
                        className="w-20 h-20 sm:w-32 sm:h-32 object-contain"
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
    <section className="relative flex min-h-screen w-full items-center justify-center bg-blue-600 px-4 sm:px-6 py-16 md:py-24 text-white overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl items-start gap-6 md:gap-12">
        <div className="mt-2 md:mt-6 h-3 w-3 md:h-4 md:w-4 shrink-0 bg-white" />
        <div className="flex flex-col gap-6 md:gap-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] md:leading-[1.1] tracking-tight">
            We’re Vaphers – a strategic digital agency blending data-driven insight with expert SaaS web design.
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] md:leading-[1.1] tracking-tight text-blue-200">
            We craft exceptional B2B web design solutions and scalable digital platforms that drive growth.
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
    <section className="w-full bg-white px-4 py-16 md:py-20 md:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
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
            <div className="absolute bottom-0 left-0 bg-white px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest">
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
      <div className="sticky top-0 z-0 w-full min-h-screen flex items-center">
        <DesignPartnerSection />
      </div>

      <div className="sticky top-0 z-10 min-h-screen w-full">
        <AboutSection />
      </div>

      <div className="relative z-20 w-full bg-white">
        <ProjectGrid />
      </div>
    </main>
  );
}