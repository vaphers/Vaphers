"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Custom hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

export default function WebDevHero() {
  const isMobile = useIsMobile();

  const headline = "Web Design That Grows Your Business";
  const subtext =
    "Launch a fast, conversion-focused website with clean UI, SEO-ready architecture, and seamless performance across devices.";

  return (
    <div className="relative mx-auto mb-10 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600 lg:-mt-28 lg:pt-40 lg:mx-3 lg:rounded-4xl">

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"></div>

      <div className="relative z-10 mt-5"></div>

      {/* Badge */}
      <div className="relative z-10 mb-7 flex w-75 items-center justify-between rounded-full border border-indigo-400 p-1">
        <span className="ml-3 font-inter text-base font-medium text-white/80">
          Explore modern web design.
        </span>

        <a
          href="#contact"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="relative z-10 px-4 pb-10">

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold text-white md:text-5xl lg:text-7xl bungee-inline-regular">
          {isMobile
            ? headline
            : headline.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto max-w-xl py-4 text-center text-lg text-white/70"
        >
          {subtext}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <button className="w-60 rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-700">
            Get free proposal
          </button>

          <button className="w-60 rounded-lg border border-white/40 bg-white/10 px-6 py-2 font-medium text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">
            View portfolio
          </button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur"
        >
          <div className="overflow-hidden rounded-xl">
            <Image
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761121505/aceternity-landing_ou3duw.webp"
              alt="Web design project preview"
              className="aspect-[16/9] w-full object-cover"
              height={1000}
              width={1000}
              priority
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}






