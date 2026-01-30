"use client"

import React from 'react';
import { Upload, Sparkles, Zap, Download } from 'lucide-react';
import { cn } from "@/lib/utils";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "1. Upload Gemini AI images with watermarks",
      description: "Drag & drop your Gemini-generated image into the upload area or click to select files from your device. Our AI watermark remover supports JPG, PNG, and WebP formats.",
      isActive: true
    },
    {
      icon: Sparkles,
      title: "2. Automatic AI watermark detection & removal",
      description: "Our advanced AI watermark remover instantly detects Gemini watermarks and removes them using intelligent algorithms. The watermark removal process takes just seconds with zero quality loss.",
      isActive: true
    },
    {
      icon: Zap,
      title: "3. Smart processing for perfect results",
      description: "The Gemini watermark remover uses machine learning to ensure clean, artifact-free results. Our AI watermark removal technology preserves image quality while completely erasing watermarks.",
      isActive: true
    },
    {
      icon: Download,
      title: "4. Download your watermark-free image",
      description: "Get your cleaned image in high-definition quality, completely free. Download individual images or batch process multiple Gemini AI images for watermark removal.",
      isActive: true
    }
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-6 bungee-inline-regular">
            How to remove AI watermarks from Gemini images with <span className="text-blue-600">Gemini Watermark Remover</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Using our <span className="text-blue-600 font-medium cursor-pointer hover:underline">AI Watermark Remover</span>, you can remove watermarks from Gemini photos online in 2 easy steps:
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Steps List */}
          <div className="flex flex-col space-y-4">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex gap-5 p-6 rounded-2xl transition-all duration-300",
                  step.isActive 
                    ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-blue-100" 
                    : "hover:bg-gray-50 border border-transparent"
                )}
              >
                {/* Icon Box */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <step.icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Image Preview */}
          <div className="relative w-full h-full min-h-[500px] bg-blue-50 rounded-[40px] flex items-center justify-center p-8 lg:p-12">
            {/* The Image Container */}
            <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-blue-200 transform transition-transform hover:scale-[1.02] duration-500">
              
              {/* Actual Image */}
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769779478/Frame_78_ccsfdv.png" 
                alt="Gemini Watermark Removal Demo - AI Watermark Remover" 
                className="w-full h-auto object-cover"
              />

              {/* Overlay graphics to simulate AI processing */}
              <div className="absolute inset-0 pointer-events-none">
                {/* AI Processing Effect */}
                <div className="absolute top-1/2 left-1/4 w-32 h-12 bg-blue-500/40 blur-md rounded-full transform -rotate-12 mix-blend-multiply"></div>
                
                {/* AI Detection Circle */}
                <div className="absolute top-1/2 left-[45%] w-16 h-16 border-2 border-dashed border-blue-500 bg-blue-400/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <Sparkles className="text-blue-600 w-6 h-6 animate-pulse" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
