'use client'

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const SECTION_HEIGHT_MOBILE = 600; 
const SECTION_HEIGHT_DESKTOP = 1300; 

export default function SmoothScrollHero() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}

const Hero = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    
    const handleChange = () => {
      setIsMobile(mql.matches);
    };
    
    setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const sectionHeight = isMobile ? SECTION_HEIGHT_MOBILE : SECTION_HEIGHT_DESKTOP;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={ref}
      style={{ height: `calc(${sectionHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage progress={scrollYProgress} />
      <ParallaxImages isMobile={isMobile} />
    </div>
  );
};

const CenterImage = ({ progress }) => {
  const clip1 = useTransform(progress, [0, 1], [25, 0]);
  const clip2 = useTransform(progress, [0, 1], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const opacity = useTransform(progress, [0, 0.75, 1], [1, 1, 0]);

  return (
    <motion.div
      className="sticky top-0 z-10 h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-gray-100"
      style={{
        clipPath,
        opacity,
        filter: "brightness(1.1)",
      }}
    >
      <div className="text-center text-blue-600 px-8 font-['Bungee_Shade']">
        <h4 className="text-5xl sm:text-6xl md:text-9xl font-black leading-none tracking-tight">
          We Give
        </h4>
        <h5 className="text-5xl sm:text-6xl md:text-9xl font-black leading-none tracking-tight">
          Results!
        </h5>
      </div>
    </motion.div>
  );
};

const ParallaxImages = ({ isMobile }) => (
  <div className={`relative z-20 mx-auto max-w-5xl px-4 ${isMobile ? 'pt-[100px]' : 'pt-[200px]'}`}>
    <ParallaxImg
      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047482/GSC-Dashboard_ilqkvd.jpg"
      alt="Example launch"
      start={isMobile ? -100 : -200}
      end={isMobile ? 100 : 200}
      className="w-2/4"
      width={600}
      height={338}
    />
    <ParallaxImg
      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_800/v1761047482/GSC-Dashboard_ilqkvd.jpg"
      alt="Example launch 2"
      start={isMobile ? 100 : 200}
      end={isMobile ? -125 : -250}
      className="mx-auto w-2/3"
      width={800}
      height={450}
    />
    <ParallaxImg
      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_900/v1761047472/Analytics_nqehtk.png"
      alt="Orbiting satellite"
      start={isMobile ? -100 : -200}
      end={isMobile ? 100 : 200}
      className="ml-auto w-3/4"
      width={900}
      height={506}
    />
    <ParallaxImg
      src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_700/v1761047472/Analytics_nqehtk.png"
      alt="Orbiting satellite 2"
      start={0}
      end={isMobile ? -250 : -500}
      className="ml-24 w-7/12"
      width={700}
      height={394}
    />
  </div>
);

const ParallaxImg = ({ className, alt, src, start, end, width, height }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${-end}px`],
  });
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <div className={`relative ${className}`} ref={ref}>
      <motion.div style={{ transform, opacity, filter: "brightness(1.1)" }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 900px"
          className="w-full h-auto"
        />
      </motion.div>
    </div>
  );
};
