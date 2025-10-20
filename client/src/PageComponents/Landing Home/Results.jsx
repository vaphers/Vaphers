    'use client'

import React, { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const SECTION_HEIGHT = 1300;

export default function SmoothScrollHero() {
  return (
    <div className="bg-zinc-900">
      <Hero />
    </div>
  );
}

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={ref}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative bg-white w-full"
    >
      <CenterImage progress={scrollYProgress} />
      <ParallaxImages />
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
        <h4 className="text-6xl md:text-9xl font-black leading-none tracking-tight">
          We Give
        </h4>
        <h5 className="text-6xl md:text-9xl font-black leading-none tracking-tight">
          Results!
        </h5>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => (
  <div className="relative z-20 mx-auto max-w-5xl px-4 pt-[200px]">
    <ParallaxImg
      src="/GSC-Dashboard.jpg"
      alt="Example launch"
      start={-200}
      end={200}
      className="w-2/4"
    />
    <ParallaxImg
      src="/GSC-Dashboard.jpg"
      alt="Example launch 2"
      start={200}
      end={-250}
      className="mx-auto w-2/3"
    />
    <ParallaxImg
      src="/Analytics.png"
      alt="Orbiting satellite"
      start={-200}
      end={200}
      className="ml-auto w-3/4"
    />
    <ParallaxImg
      src="/Analytics.png"
      alt="Orbiting satellite 2"
      start={0}
      end={-500}
      className="ml-24 w-7/12"
    />
  </div>
);

const ParallaxImg = ({ className, alt, src, start, end }) => {
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
      <motion.img
        src={src}
        alt={alt}
        style={{ transform, opacity, filter: "brightness(1.1)" }}
        className="w-full h-auto"
      />
    </div>
  );
};
