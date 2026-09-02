'use client';

import React, { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, LabelList } from 'recharts';

const barData = [
  { category: 'Studio Retention', percentage: 97, label: '97% / 100%' },
  { category: 'Project Budget Growth', percentage: 76, label: '76% / 100%' },
  { category: 'Client Acquisition ROI', percentage: 88, label: '88% / 100%' },
  { category: 'Increase in AI Citations', percentage: 82, label: '82% / 100%' },
  { category: 'High-Intent Search Traffic', percentage: 91, label: '91% / 100%' },
];

const mainVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Custom SVG shape for the Recharts Bar (Bluish Theme)
const CustomBarShape = (props: any) => {
  const { x, y, width, height } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#dbeafe" />
      {height > 0 && <rect x={x} y={y} width={width} height={3} fill="#2563eb" />}
    </g>
  );
};

// Custom Label for the text sitting on top of the bars
const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  const parts = value.split(' / ');

  return (
    <g>
      {/* Mobile Label: Stacked vertically */}
      <text x={x + width / 2} y={y - 24} textAnchor="middle" className="sm:hidden">
        <tspan x={x + width / 2} dy="0" fill="#1e3a8a" fontWeight="600" fontSize="13">{parts[0]}</tspan>
        <tspan x={x + width / 2} dy="14" fill="#64748b" fontWeight="400" fontSize="10">/ {parts[1]}</tspan>
      </text>

      {/* Desktop/Tablet Label */}
      <text x={x + width / 2} y={y - 15} textAnchor="middle" dominantBaseline="middle" className="hidden sm:block">
        <tspan fill="#1e3a8a" fontWeight="600" fontSize="16">{parts[0]}</tspan>
        <tspan fill="#64748b" fontWeight="400" fontSize="12"> / {parts[1]}</tspan>
      </text>
    </g>
  );
};

// Custom X-Axis Tick to handle long text on mobile
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Mobile Tick: Angled at -45 degrees with shifted anchor so it doesn't clip */}
      <text
        x={0}
        y={0}
        dx={-5} // Shifts text left so the end aligns with the tick
        dy={15}  // Pushes text down from the axis line
        textAnchor="end"
        fill="#475569"
        fontSize={10} // Slightly smaller font for mobile
        transform="rotate(-45)"
        className="sm:hidden"
      >
        {payload.value}
      </text>
      
      {/* Desktop/Tablet Tick: Flat and centered */}
      <text
        x={0}
        y={0}
        dy={20}
        textAnchor="middle"
        fill="#475569"
        fontSize={13}
        className="hidden sm:block"
      >
        {payload.value}
      </text>
    </g>
  );
};

const WhyVaphers: FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={mainVariants}
      className="max-w-full bg-[#f0f9ff] overflow-hidden py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 lg:mb-20">
          <motion.div variants={textVariants} className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-blue-950 tracking-tight font-medium bungee-shade">
              Why <span className="text-blue-600">Vaphers?</span>
            </h2>
          </motion.div>

          <motion.div variants={textVariants} className="lg:col-span-7 space-y-4 sm:space-y-6">
            <p className="text-base lg:text-lg text-slate-800 font-medium leading-relaxed">
              At Vaphers, we specialize in bespoke growth marketing specifically engineered for <strong>interior designers, luxury studios, and architectural firms</strong>. As a premier marketing partner for the design industry, our team is dedicated to helping your studio attract high-budget residential and commercial projects through precision targeting and top-tier search visibility.
            </p>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              With tailored client acquisition systems and a focus on high-ticket project revenue, we empower interior designers to elevate their market presence and command higher design fees. Our dedicated <strong>design marketing strategists</strong> work closely with you to turn your visual portfolio into a steady stream of signed design contracts.
            </p>
          </motion.div>
        </div>

        {/* Bottom Layout: The Bar Chart Container - Increased mobile height to 450px */}
        <motion.div variants={mainVariants} className="w-full h-[450px] sm:h-[400px] md:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              // Increased bottom margin from 20 to 80 to fit the angled text
              margin={{ top: 50, right: 10, bottom: 80, left: 10 }}
              barCategoryGap="15%"
            >
              <XAxis 
                dataKey="category" 
                axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }} 
                tickLine={false}
                height={100} // Increased from 70 to 100
                tick={<CustomXAxisTick />} 
                interval={0} // CRITICAL FIX: Forces Recharts to render all labels
              />
              <YAxis hide domain={[0, 100]} />
              <Bar
                dataKey="percentage"
                shape={<CustomBarShape />}
                isAnimationActive={true}
                animationDuration={1500}
              >
                <LabelList dataKey="label" content={<CustomLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default WhyVaphers;