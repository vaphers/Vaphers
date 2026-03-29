'use client'

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export default function Resilts({
  titleLine1 = "We Give",
  titleLine2 = "Results!",
  // Default images provided as fallbacks
  img1 = { src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1768565732/1uk1dfu3ch7g1_bgrvxu.jpg", alt: "Dashboard 1" },
  img2 = { src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1768565732/0nsyv0pqrl0g1_obuapg.jpg", alt: "Dashboard 2" },
  img3 = { src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1768565732/exl6ordv4ibg1_zu4wua.jpg", alt: "Dashboard 3" },
  img4 = { src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1768565732/2ricge7cocbg1_lstgm0.jpg", alt: "Dashboard 4" },
}) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const sectionHeight = isMobile ? 450 : 900;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div 
        ref={ref}
        style={{ height: `calc(${sectionHeight}px + 100vh)` }}
        className="relative w-full z-10"
      >
        <CenterImage progress={scrollYProgress} line1={titleLine1} line2={titleLine2} />
        
        {/* Parallax Layer */}
        <div className={`relative z-20 mx-auto max-w-5xl px-4 ${isMobile ? 'pt-[50px]' : 'pt-[100px]'}`}>
          <ParallaxImg
            src={img1.src}
            alt={img1.alt}
            start={isMobile ? -100 : -200}
            end={isMobile ? 100 : 200}
            className="w-2/4"
            width={600}
            height={338}
          />
          <ParallaxImg
            src={img2.src}
            alt={img2.alt}
            start={isMobile ? 100 : 200}
            end={isMobile ? -125 : -250}
            className="mx-auto w-2/3 -mt-8 md:-mt-16"
            width={800}
            height={450}
          />
          <ParallaxImg
            src={img3.src}
            alt={img3.alt}
            start={isMobile ? -100 : -200}
            end={isMobile ? 100 : 200}
            className="ml-auto w-3/4 -mt-8 md:-mt-16"
            width={900}
            height={506}
          />
          <ParallaxImg
            src={img4.src}
            alt={img4.alt}
            start={0}
            end={isMobile ? -250 : -500}
            className="ml-24 w-7/12 -mt-8 md:-mt-16"
            width={700}
            height={394}
          />
        </div>
      </div>
    </div>
  );
}

const CenterImage = ({ progress, line1, line2 }) => {
  const clip1 = useTransform(progress, [0, 1], [25, 0]);
  const clip2 = useTransform(progress, [0, 1], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const opacity = useTransform(progress, [0, 0.75, 1], [1, 1, 0]);

  return (
    <motion.div
      className="sticky top-0 z-10 h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-gray-100"
      style={{ clipPath, opacity, filter: "brightness(1.1)" }}
    >
      <div className="text-center text-blue-600 px-8 bungee-shade">
        <h4 className="text-5xl sm:text-6xl md:text-9xl leading-none tracking-tight">{line1}</h4>
        <h5 className="text-5xl sm:text-6xl md:text-9xl leading-none tracking-tight">{line2}</h5>
      </div>
    </motion.div>
  );
};

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




// How to use:


// <Results 
//   titleLine1="Our" 
//   titleLine2="Work" 
//   img1={{ src: "/work1.jpg", alt: "Project A" }}
//   img2={{ src: "/work2.jpg", alt: "Project B" }}
//   img3={{ src: "/work3.jpg", alt: "Project C" }}
//   img4={{ src: "/work4.jpg", alt: "Project D" }}
// />