"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

export interface StatItem {
  id: string;
  category: string;
  value: string;
  subtext: string;
  // Make sure to pass valid CSS units here, e.g., "250px" or "80%"
  cardHeight: string; 
  isStriped?: boolean;
}

export interface ConsultingHeroProps {
  mainTitle: string;
  mainDescription: string;
  topStatLabel: string;
  topStatValue: string;
  stats: StatItem[];
}

export default function Chart({
  mainTitle,
  mainDescription,
  topStatLabel,
  topStatValue,
  stats,
}: ConsultingHeroProps) {
  return (
    <section className="bg-blue-600 text-white min-h-screen w-full font-sans overflow-hidden">
      {/* Top Section */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-16 pb-12 md:pb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-6"
            >
              {mainTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 max-w-xl leading-relaxed"
            >
              {mainDescription}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:text-right"
          >
            <p className="text-sm md:text-base font-medium mb-2 text-blue-100 tracking-wide">
              {topStatLabel}
            </p>
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter">
              {topStatValue}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Bottom Grid Section */}
      {/* Added explicit min-h to the grid so the columns have vertical space to fill */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-blue-500/50 min-h-[500px]">
        {stats.map((stat, index) => (
          <div 
            key={stat.id} 
            // h-full ensures the column stretches to fill the grid's min-height
            className="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-blue-500/50 last:border-r-0 relative group"
          >
            {/* Category Header */}
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-medium text-blue-50">{stat.category}</h3>
            </div>

            {/* Animated Bottom Card Container */}
            {/* flex-1 allows this container to take up all remaining vertical space under the header */}
            <div className="flex-1 flex items-end w-full">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: stat.cardHeight }}
                // Changed margin to 0px so it triggers more reliably on view
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="w-full relative overflow-hidden"
              >
                {/* Accent Top Line */}
                <div className="h-1.5 w-full bg-[#f4f7a1] absolute top-0 left-0 z-20" />
                
                {/* Card Background with Striped Logic */}
                <div 
                  className={`absolute inset-0 z-0 bg-blue-700/40 backdrop-blur-sm ${
                    stat.isStriped ? 'opacity-100' : 'opacity-0 hover:opacity-100 transition-opacity duration-500'
                  }`}
                  style={stat.isStriped ? {
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
                  } : {}}
                />

                {/* Card Content */}
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
                  <div className="flex justify-between items-start pt-4">
                    <span className="text-4xl md:text-5xl font-semibold tracking-tight">
                      {stat.value}
                    </span>
                    <PlusCircle className="w-6 h-6 text-white cursor-pointer hover:rotate-90 transition-transform duration-300 shrink-0 ml-4" />
                  </div>
                  
                  <p className="text-sm text-blue-100 mt-8 leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}






// How:


// const heroData = {
//     mainTitle: "Unlocking business growth with expert consulting solutions",
//     mainDescription: "We partner with businesses to design smart strategies, optimize operations, and unlock growth opportunities that create measurable impact and long-term sustainable competitive advantage.",
//     topStatLabel: "Total revenue generated",
//     topStatValue: "50M+",
//     stats: [
//       {
//         id: "1",
//         category: "Projects completed",
//         value: "200k",
//         subtext: "Trusted teams deliver proven results driving growth across global markets.",
//         cardHeight: "220px", // Shortest
//       },
//       {
//         id: "2",
//         category: "Awards winning",
//         value: "125+",
//         subtext: "Honored firm achieves industry awards showcasing impact and excellence.",
//         cardHeight: "300px", 
//       },
//       {
//         id: "3",
//         category: "Clients satisfaction",
//         value: "99%",
//         subtext: "Expert advice ensures lasting success with trusted client solutions.",
//         cardHeight: "420px", // Tallest
//         isStriped: true,     // Triggers the CSS repeating background
//       },
//       {
//         id: "4",
//         category: "Years of experience",
//         value: "25+",
//         subtext: "Decades proven guiding businesses toward growth and sustainable success.",
//         cardHeight: "260px", 
//       }
//     ]
//   };


//       <ConsultingHero {...heroData} />
