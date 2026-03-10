"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialData {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Amelia Bronze",
    text: "They handle most of the online stuffs related to our business either it be designing or marketing or paid ads and other things and I have always received results I was expecting.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Gustavo Kent",
    text: "We are using their services and we are very happy and satisfied so far; the people there are prompt and responsible to resolute.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Asad",
    text: "They handled our SEO and built our website. The site is pretty good and communication was clear and the work was delivered on time.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 4,
    name: "Juan",
    text: "Vaphers was great to work with for SEO, especially John. He understood our business needs and goals, and was wonderful to work with.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    text: "The creative direction they took with our rebranding was beyond what we imagined. Professional, sleek, and high-converting designs.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 6,
    name: "Michael Chen",
    text: "The ROI on our ad spend tripled within the first three months. Their data-driven approach is what sets them apart from other agencies.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getOrbitStyles = (index: number) => {
    const total = testimonials.length;
    const relativeIndex = (index - activeIndex + total) % total;

    if (relativeIndex === 0) {
      return { x: 90, y: 0, z: 50, opacity: 1, scale: 1.2, filter: "blur(0px)" };
    } else if (relativeIndex === 1) {
      return { x: 45, y: 140, z: 40, opacity: 0.5, scale: 0.9, filter: "blur(10px)" };
    } else if (relativeIndex === 2) {
      return { x: -40, y: 240, z: 30, opacity: 0.2, scale: 0.7, filter: "blur(10px)" };
    } else if (relativeIndex === total - 1) {
      return { x: 45, y: -140, z: 40, opacity: 0.5, scale: 0.9, filter: "blur(10px)" };
    } else if (relativeIndex === total - 2) {
      return { x: -40, y: -240, z: 30, opacity: 0.2, scale: 0.7, filter: "blur(10px)" };
    } else {
      return { x: -100, y: 0, z: 10, opacity: 0, scale: 0.5, filter: "blur(10px)" };
    }
  };

  const getZIndex = (index: number) => {
    const total = testimonials.length;
    const relativeIndex = (index - activeIndex + total) % total;

    if (relativeIndex === 0) return 50;
    if (relativeIndex === 1 || relativeIndex === total - 1) return 40;
    if (relativeIndex === 2 || relativeIndex === total - 2) return 30;
    return 10;
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden min-h-[800px] flex flex-col justify-center">
      
      {/* Header */}
      <div className="mb-20">
        <h3 className="text-3xl md:text-5xl lg:text-7xl font-base text-center tracking-[-0.03em] px-6 text-gray-800 bungee-inline-regular">
          What Our <span className="text-blue-600">Client's Say?</span>
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left Orbit */}
        <div
          className="relative h-[600px] w-full flex items-center justify-center lg:justify-start isolate"
          style={{ perspective: "1000px" }}
        >

          {/* Orbit Guide */}
          <div
            className="absolute left-[-472px] top-1/2 mt-[-300px] w-[600px] h-[600px] border-r-[3px] border-dashed border-gray-300 rounded-full hidden lg:block -z-10 pointer-events-none"
          />

          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={false}
              animate={getOrbitStyles(index)}
              style={{ zIndex: getZIndex(index) }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 20,
                mass: 1,
              }}
              className="absolute flex items-center gap-6 cursor-pointer group will-change-transform"
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative">
                <motion.img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl object-cover transition-all group-hover:border-blue-400"
                />

                {((index - activeIndex + testimonials.length) %
                  testimonials.length) === 0 && (
                  <motion.div
                    layoutId="ring"
                    className="absolute -inset-2 rounded-full border-2 border-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>

              <div className="flex flex-col">
                <p className="font-bold text-xl text-gray-900 whitespace-nowrap">
                  {t.name}
                </p>

                <div className="flex text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Content */}
        <div className="relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50, filter: "blur(12px)" }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="bg-white p-10 md:p-16 rounded-[10px] shadow-2xl shadow-blue-900/5 relative"
            >
              <span className="absolute -top-6 -left-4 text-9xl text-blue-600/10 font-serif leading-none">
                “
              </span>

              <p className="text-2xl md:text-3xl text-gray-700 font-light leading-snug italic relative z-10">
                {testimonials[activeIndex].text}
              </p>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-bold tracking-widest uppercase text-sm">
                    Verified Client
                  </p>
                  <p className="text-gray-900 font-bold text-xl">
                    {testimonials[activeIndex].name}
                  </p>
                </div>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === activeIndex
                          ? "w-8 bg-blue-600"
                          : "w-2 bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}