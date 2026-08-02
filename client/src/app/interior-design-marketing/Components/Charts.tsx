"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

export default function Chart() {
  return (
    <section className="bg-blue-600 text-white min-h-screen w-full font-sans overflow-hidden">
      <div className="w-[88%] mx-auto px-6 md:px-12 pt-16 pb-12 md:pb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="w-full lg:w-[60%]">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-6"
            >
              Unlocking Growth Through Strategic Marketing for Interior Design Firms
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 w-full lg:w-[85%] leading-relaxed"
            >
              We partner with visionary interior designers to build high-converting marketing strategies, amplify project portfolios, and attract premium clients that elevate your firm's digital footprint.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[40%] lg:text-right"
          >
            <p className="text-sm md:text-base font-medium mb-2 text-blue-100 tracking-wide">
              Total pipeline generated
            </p>
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter">
              $50M+
            </h2>
          </motion.div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-blue-500/50 min-h-[50vh]">
        <div className="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-blue-500/50 last:border-r-0 relative group">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-medium text-blue-50">Keywords Ranked</h3>
          </div>
          <div className="flex-1 flex items-end w-full">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "55%" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
              className="w-full relative overflow-hidden"
            >
              <div className="h-1.5 w-full bg-[#f4f7a1] absolute top-0 left-0 z-20" />
              <div className="absolute inset-0 z-0 bg-blue-700/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
                <div className="flex justify-between items-start pt-4">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight">20K+</span>
                  <PlusCircle className="w-6 h-6 text-white cursor-pointer hover:rotate-90 transition-transform duration-300 shrink-0 ml-4" />
                </div>
                <p className="text-sm text-blue-100 mt-8 leading-relaxed">
                  High-intent design and architecture search terms securing top positions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-blue-500/50 last:border-r-0 relative group">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-medium text-blue-50">Traffic Generated</h3>
          </div>
          <div className="flex-1 flex items-end w-full">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "75%" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="w-full relative overflow-hidden"
            >
              <div className="h-1.5 w-full bg-[#f4f7a1] absolute top-0 left-0 z-20" />
              <div className="absolute inset-0 z-0 bg-blue-700/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
                <div className="flex justify-between items-start pt-4">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight">10M+</span>
                  <PlusCircle className="w-6 h-6 text-white cursor-pointer hover:rotate-90 transition-transform duration-300 shrink-0 ml-4" />
                </div>
                <p className="text-sm text-blue-100 mt-8 leading-relaxed">
                  Qualified visitors actively seeking premium interior design services.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-blue-500/50 last:border-r-0 relative group">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-medium text-blue-50">Customer Satisfaction</h3>
          </div>
          <div className="flex-1 flex items-end w-full">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.30, ease: "easeOut" }}
              className="w-full relative overflow-hidden"
            >
              <div className="h-1.5 w-full bg-[#f4f7a1] absolute top-0 left-0 z-20" />
              <div 
                className="absolute inset-0 z-0 bg-blue-700/40 backdrop-blur-sm opacity-100"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
                }}
              />
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
                <div className="flex justify-between items-start pt-4">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight">99%</span>
                  <PlusCircle className="w-6 h-6 text-white cursor-pointer hover:rotate-90 transition-transform duration-300 shrink-0 ml-4" />
                </div>
                <p className="text-sm text-blue-100 mt-8 leading-relaxed">
                  Long-term partnerships built on transparency and measurable brand growth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-blue-500/50 last:border-r-0 relative group">
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-medium text-blue-50">Years Of Experience</h3>
          </div>
          <div className="flex-1 flex items-end w-full">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "65%" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="w-full relative overflow-hidden"
            >
              <div className="h-1.5 w-full bg-[#f4f7a1] absolute top-0 left-0 z-20" />
              <div className="absolute inset-0 z-0 bg-blue-700/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
                <div className="flex justify-between items-start pt-4">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight">5+</span>
                  <PlusCircle className="w-6 h-6 text-white cursor-pointer hover:rotate-90 transition-transform duration-300 shrink-0 ml-4" />
                </div>
                <p className="text-sm text-blue-100 mt-8 leading-relaxed">
                  Years dedicated exclusively to elevating digital marketing for creative design businesses.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
