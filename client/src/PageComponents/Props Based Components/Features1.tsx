'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- Props Interfaces ---
export interface TextCardData {
  title: string;
  description: string;
}

export interface Features1Props {
  heading: string;
  ctaLabel?: string;
  ctaHref?: string;
  cards: TextCardData[]; 
  
  // NEW: Configurable props for the visuals
  businessHealthPercentage?: number;
  companyGrowthTitle?: string;
  modernIndustriesTitle?: string;
  industriesList?: string[];
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};

// --- Visual Components ---

const BusinessHealthVisual = ({ percentage = 84 }: { percentage?: number }) => {
  // Calculate SVG stroke dash offset for the gauge
  // Radius is 40, half circle circumference is Pi * R = ~125.66
  const circumference = 125.66;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl w-full h-full shadow-sm p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <h4 className="text-lg font-medium text-gray-900 mb-6 text-center w-full">Business Health</h4>
      
      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-48 h-24 mb-6 flex-shrink-0 flex items-end justify-center">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 50">
          {/* Background Track */}
          <path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke="#f3f4f6" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          {/* Blue Progress Fill (fills left to right) */}
          <path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke="#2563eb" 
            strokeWidth="12" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Percentage Text */}
        <div className="text-center z-10 leading-none">
          <span className="text-5xl font-bold text-gray-900 tracking-tight">{percentage}%</span>
        </div>
      </div>

      <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors mt-auto">
        All Stats <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const CompanyGrowthVisual = ({ title = "Company Growth" }: { title?: string }) => {
  const data = [
    { year: '2016', value: 10 },
    { year: '2017', value: 15 },
    { year: '2018', value: 45 },
    { year: '2019', value: 58 },
    { year: '2020', value: 25 },
    { year: '2021', value: 38 },
    { year: '2022', value: 65 },
    { year: '2023', value: 85 },
  ];

  return (
    <div className="bg-white rounded-3xl w-full h-full shadow-sm p-4 sm:p-6 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-base sm:text-lg font-medium text-gray-900 truncate pr-2">{title}</h4>
        <span className="text-xs text-gray-400 flex items-center gap-1 cursor-pointer hover:text-gray-600 flex-shrink-0">
          Yearly <span className="text-[10px]">▼</span>
        </span>
      </div>
      
      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }} 
              tickFormatter={(val) => `${val}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ color: '#374151', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorGrowth)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const IndustriesVisual = ({ 
  title = "Modern Industries", 
  industries = ["Finance", "Healthcare", "Technology", "Retail", "Manufacturing", "Education", "Real Estate", "Energy"] 
}: { 
  title?: string; 
  industries?: string[]; 
}) => {
  return (
    <div className="bg-white rounded-3xl w-full h-full shadow-sm p-6 flex flex-col overflow-hidden">
      <h4 className="text-lg font-medium text-gray-900 mb-6 truncate">{title}</h4>
      {/* flex-wrap ensures items wrap to the next line instead of causing horizontal scroll */}
      <div className="flex flex-wrap gap-2 overflow-y-auto custom-scrollbar pb-2">
        {industries.map((ind) => (
          <div key={ind} className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4 text-blue-500 flex-shrink-0" />
            {ind}
          </div>
        ))}
      </div>
    </div>
  );
};


// --- Main Component ---
export default function Features1({
  heading,
  ctaLabel = 'Sign Up',
  ctaHref = '#',
  cards,
  businessHealthPercentage = 84,
  companyGrowthTitle = "Company Growth",
  modernIndustriesTitle = "Modern Industries",
  industriesList = ["Finance", "Healthcare", "Technology", "Retail", "Manufacturing", "Education", "Real Estate", "Energy"]
}: Features1Props) {
  const displayCards = cards.slice(0, 3);

  // Array of the visuals mapped to indices, passing the dynamic props
  const visualComponents = [
    <BusinessHealthVisual key="visual-1" percentage={businessHealthPercentage} />,
    <CompanyGrowthVisual key="visual-2" title={companyGrowthTitle} />,
    <IndustriesVisual key="visual-3" title={modernIndustriesTitle} industries={industriesList} />
  ];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight md:max-w-xl">
            {heading}
          </h2>
          {ctaLabel && (
            <a
              href={ctaHref}
              className="inline-flex justify-center items-center px-6 py-3 border border-blue-200 rounded-full text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 whitespace-nowrap font-medium"
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {displayCards.map((card, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col">
              
              {/* Top Visual Area */}
              <div className="bg-[#F4F4F6] rounded-[2rem] p-4 sm:p-6 lg:p-8 h-[300px] sm:h-[320px] flex items-center justify-center">
                {visualComponents[index]}
              </div>

              {/* Bottom Text Area */}
              <div className="mt-8 space-y-3 px-2 sm:px-0">
                <h3 className="text-xl sm:text-2xl font-normal text-gray-900">
                  {card.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                  {card.description}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}





// How to use: 


      
    //   <Features1 
    //     heading="Clients growth with my services"
    //     ctaLabel="Sign Up"
    //     ctaHref="/signup"
    //     cards={[
    //       {
    //         title: "Strategy",
    //         description: "Fusce neque. Quisque malesuada placerat nisl. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl malesuada placerat."
    //       },
    //       {
    //         title: "Analytics",
    //         description: "We dive deep into your company growth. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl malesuada placerat."
    //       },
    //       {
    //         title: "Industries",
    //         description: "Adapting to modern markets. Quisque malesuada placerat nisl. Praesent porttitor, nulla vitae posuere iaculis."
    //       }
    //     ]}
    //   />