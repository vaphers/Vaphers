"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// hook to detect mobile screens
const useIsMobile = () => {
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

  return isMobile;
};

function Hero() {
  const isMobile = useIsMobile();

  return (
    <div className="relative mx-auto mb-10 flex max-w-full flex-col items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600 lg:-mt-28 lg:pt-40 lg:pb-10 lg:mx-3 lg:rounded-4xl">
      <div className="mt-5"></div>
      <div className="border border-indigo-600 p-1 w-75 mx-auto rounded-full flex items-center justify-between mb-7">
        <span className="font-inter text-base font-medium text-gray-300 ml-3">
          Grow Your Business In Portland
        </span>
        <a
          href="#"
          className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600"
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
      <div className="px-4 pb-10">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-200 md:text-4xl lg:text-7xl dark:text-slate-300 bungee-inline-regular">
          {isMobile ? (
            // no animations on mobile screens 
            "Portland SEO Company Driving Local Growth"
          ) : (
            // animated text animation for desktop and larger screens
            "Portland SEO Company Driving Local Growth"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))
          )}
        </h1>
        
        {isMobile ? (
          // no animatied sequiential animation on mobile screens
          <>
            <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400 dark:text-neutral-400">
             Helping Portland businesses rank higher, attract qualified traffic, and turn searches into consistent revenue growth.
            </p>
            
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={"https://www.vaphers.com/pricing"}>
              <button className="w-60 transform rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-500 dark:text-black dark:hover:bg-gray-200">
                Explore Now
              </button>
              </Link>
              <Link href={"https://www.vaphers.com/contact"}>
              <button className="w-60 transform rounded-lg border border-blue-600 bg-white px-6 py-2 font-medium text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-blue-600 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                Contact Support
              </button>
              </Link>
            </div>
            
            <div className="relative z-10 mt-20 rounded-3xl border border-neutral-300 bg-neutral-200 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900">
              <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761121505/aceternity-landing_ou3duw.webp"
                  alt="Landing page preview"
                  className="aspect-[16/9] h-auto w-full object-cover"
                  height={1000}
                  width={1000}
                  sizes="(max-width: 768px) 100vw, 1000px"
                  priority
                  loading="eager"
                />
              </div>
            </div>
          </>
        ) : (
          // this is animated content for the desktop screens and larger than desktops
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400 dark:text-neutral-400"
            >
              Helping Portland businesses rank higher, attract qualified traffic, and turn searches into consistent revenue growth
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href={"https://www.vaphers.com/pricing"}>
              <button className="w-60 transform rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-500 dark:text-black dark:hover:bg-gray-200 cursor-pointer">
                Explore Now
              </button>
              </Link>
              <Link href={"https://www.vaphers.com/contact"}>
              <button className="w-60 transform rounded-lg border border-blue-600 bg-white px-6 py-2 font-medium text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-blue-600 dark:bg-black dark:text-white dark:hover:bg-gray-900 cursor-pointer">
                Contact Support
              </button>
              </Link>
            </motion.div>
            
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.2 }}
                className="relative z-10 mt-20 rounded-3xl border border-neutral-300 bg-neutral-200 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1770818890/ChatGPT_Image_Feb_11_2026_07_37_55_PM_q9spwb.png"
                    alt="Landing page preview"
                    className="aspect-[16/9] h-auto w-full object-cover"
                    height={1000}
                    width={1000}
                    sizes="(max-width: 768px) 100vw, 1000px"
                    priority
                  />
                </div>
              </motion.div>
            </>
        )}
      </div>
    </div>
  );
}

export default Hero;
