"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from 'next/link'

export default function MarketingStagesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [dragWidth, setDragWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Framer motion controls
  const controls = useAnimation();
  const x = useMotionValue(0);

  // Calculate the maximum drag distance
  useEffect(() => {
    const updateDragWidth = () => {
      if (carouselRef.current) {
        setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    updateDragWidth();
    // Re-calculate on image load or resize
    window.addEventListener("resize", updateDragWidth);
    return () => window.removeEventListener("resize", updateDragWidth);
  }, []);

  // Update the active dot when the user drags the carousel manually
  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      let closestIndex = 0;
      let minDistance = Infinity;

      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Calculate which card is currently closest to the left edge
          const cardOffset = card.offsetLeft;
          const distance = Math.abs(cardOffset + latestX);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    });

    return () => unsubscribe();
  }, [x, activeIndex]);

  // Handle clicking on a pagination dot
  const handleDotClick = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      // Find the card's position relative to the container
      let targetX = -card.offsetLeft;
      
      // Prevent scrolling past the maximum drag width (prevents empty space at the end)
      if (targetX < -dragWidth) {
        targetX = -dragWidth;
      }

      // Animate the carousel to the selected card
      controls.start({ 
        x: targetX, 
        transition: { duration: 0.5, ease: "easeOut" } 
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-12 overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
        
        {/* Left Column: Heading, Text & CTA */}
        <div className="w-full lg:w-[35%] flex flex-col justify-center shrink-0">
          <h3 className="text-4xl md:text-4xl text-gray-900 leading-tight mb-6 tracking-wide bungee-shade">
            Marketing for <span className="text-blue-700">U.S Businesses</span> Every Any Stage
          </h3>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
            Whether you are opening your first location or scaling globally, our strategies adapt to your needs. As a leading <strong className="font-semibold text-gray-800">franchise marketing agency</strong> and a dedicated <strong className="font-semibold text-gray-800">search engine marketing company</strong>, we provide tailored, data-driven solutions ensuring your project exceeds expectations from concept to market dominance.
          </p>
          
          <Link href="/seo-services" className="w-60">
            <button className="w-full rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-800 cursor-pointer">
              Not Sure Where to Start?
            </button>
          </Link>
        </div>

        {/* Right Column: Draggable Carousel */}
        <div 
          className="w-full lg:w-[65%] overflow-hidden" 
          ref={carouselRef}
        >
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            whileTap={{ cursor: "grabbing" }}
            animate={controls}
            style={{ x }} // Bind the motion value to track drag position
            className="flex gap-6 pb-6 cursor-grab w-max relative"
          >
            {/* Card 1: Just Starting Out (Filled Blue Style) */}
            <motion.div 
              ref={(el) => { cardsRef.current[0] = el; }}
              className="w-[85vw] sm:w-[320px] md:w-[350px] bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 md:p-10 rounded-tl-3xl rounded-br-3xl flex flex-col shadow-lg pointer-events-none"
            >
              <h4 className="text-xl md:text-2xl bungee-inline-regular tracking-tight mb-6">
                Just Starting Out:<br />Laying the Foundation
              </h4>
              <p className="text-blue-50 text-sm md:text-base leading-relaxed opacity-90">
                Launch your brand with confidence. We help new businesses establish a strong digital presence, build foundational SEO, and launch targeted initial campaigns to drive early traction and brand awareness.
              </p>
            </motion.div>

            {/* Card 2: Established (Outlined Style) */}
            <motion.div 
              ref={(el) => { cardsRef.current[1] = el; }}
              className="w-[85vw] sm:w-[320px] md:w-[350px] bg-white border border-blue-100 text-gray-800 p-8 md:p-10 rounded-tl-3xl rounded-br-3xl flex flex-col shadow-sm pointer-events-none"
            >
              <h4 className="text-xl md:text-3xl bungee-inline-regular tracking-tight mb-6">
                Established:<br />Accelerating Growth
              </h4>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Take your steady business to the next level. We optimize your existing marketing funnels, expand your reach through advanced search engine marketing, and maximize your overall return on investment.
              </p>
            </motion.div>

            {/* Card 3: Enterprise (Outlined Style) */}
            <motion.div 
              ref={(el) => { cardsRef.current[2] = el; }}
              className="w-[85vw] sm:w-[320px] md:w-[350px] bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 md:p-10 rounded-tl-3xl rounded-br-3xl flex flex-col shadow-sm pointer-events-none"
            >
              <h4 className="text-xl md:text-3xl bungee-inline-regular tracking-wide mb-6">
                Enterprise:<br />Scaling at Capacity
              </h4>
              <p className="text-white text-sm md:text-base leading-relaxed">
                Dominate your industry. Our enterprise solutions offer multi-location strategies perfect for franchises, comprehensive data analysis, and large-scale media buying to keep you ahead of the competition.
              </p>
            </motion.div>

            {/* Card 4: SaaS & Tech (Outlined Style) */}
            <motion.div 
              ref={(el) => { cardsRef.current[3] = el; }}
              className="w-[85vw] sm:w-[320px] md:w-[350px] bg-white border border-blue-100 text-gray-800 p-8 md:p-10 rounded-tl-3xl rounded-br-3xl flex flex-col shadow-sm pointer-events-none"
            >
              <h4 className="text-xl md:text-3xl bungee-inline-regular tracking-wide mb-6">
                SaaS & Tech:<br />Driving MRR Growth
              </h4>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Drive user acquisition and reduce churn. As a specialized <strong className="font-semibold text-gray-800">SaaS marketing agency</strong>, we engineer scalable digital growth engines designed to capture high-intent signups and turn active users into lifelong product evangelists.
              </p>
            </motion.div>

            {/* Empty space at the end so the last card doesn't stick directly to the screen edge */}
            <div className="w-4 sm:w-8 shrink-0"></div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Pagination Dots (Updated for 4 items) */}
      <div className="flex justify-center lg:justify-end max-w-[1400px] mx-auto mt-6 gap-3 pr-4 lg:pr-12">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
              activeIndex === index 
                ? "w-10 bg-blue-600" 
                : "w-4 bg-gray-200 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}