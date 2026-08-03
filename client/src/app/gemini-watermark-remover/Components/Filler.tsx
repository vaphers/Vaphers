"use client"

import React from 'react';
import { Upload, Sparkles, Zap, Download } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from './LanguageContext';

function RichText({ text }: { text: string }) {
  const parts = text.split(/(<blue>.*?<\/blue>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<blue>(.*)<\/blue>$/);
        if (match) {
          return <span key={i} className="text-blue-600 font-medium cursor-pointer hover:underline">{match[1]}</span>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

function RichHeading({ text }: { text: string }) {
  const parts = text.split(/(<blue>.*?<\/blue>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<blue>(.*)<\/blue>$/);
        if (match) {
          return <span key={i} className="text-blue-600">{match[1]}</span>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

export function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Upload,
      title: t("filler.step1.title"),
      description: t("filler.step1.desc"),
      isActive: true
    },
    {
      icon: Sparkles,
      title: t("filler.step2.title"),
      description: t("filler.step2.desc"),
      isActive: true
    },
    {
      icon: Zap,
      title: t("filler.step3.title"),
      description: t("filler.step3.desc"),
      isActive: true
    },
    {
      icon: Download,
      title: t("filler.step4.title"),
      description: t("filler.step4.desc"),
      isActive: true
    }
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl text-gray-800 mb-6 bungee-shade">
            <RichHeading text={t("filler.heading")} />
          </h2>
          <p className="text-gray-600 text-lg">
            <RichText text={t("filler.subheading")} />
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
                  "flex gap-5 p-6 rounded-lg transition-all duration-300",
                  step.isActive 
                    ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-blue-100" 
                    : "hover:bg-gray-50 border border-transparent"
                )}
              >
                {/* Icon Box */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                    <step.icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-base text-gray-900 mb-2">
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
          <div className="relative w-full h-full min-h-[400px] bg-blue-50 rounded-[40px] flex items-center justify-center p- lg:p-">
            {/* The Image Container */}
            <div className="relative w-full max-w-full bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-blue-200 transform transition-transform  duration-500">
              
              {/* Actual Image */}
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1780063178/gemini-watermark-remover_ddf4dy.webp" 
                alt="Gemini Watermark Removal Demo - AI Watermark Remover" 
                className="w-full h-auto object-cover"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
