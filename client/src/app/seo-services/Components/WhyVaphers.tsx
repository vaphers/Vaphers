'use client';

import React, { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, LabelList } from 'recharts';

const barData = [
  { category: 'Client Retention', percentage: 97, label: '97% / 100%' },
  { category: 'Budget Growth', percentage: 56, label: '56% / 100%' },
  { category: 'ROI', percentage: 82, label: '82% / 100%' },
  { category: 'Increase in AI Citation', percentage: 79, label: '79% / 100%' },
  { category: 'Traffic Increase', percentage: 87, label: '87% / 100%' },
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
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Custom SVG shape for the Recharts Bar (Bluish Theme)
const CustomBarShape = (props: any) => {
  const { x, y, width, height } = props;
  return (
    <g>
      {/* Main soft blue bar (Tailwind blue-100) */}
      <rect x={x} y={y} width={width} height={height} fill="#dbeafe" />
      {/* Vibrant blue top border (Tailwind blue-600) */}
      <rect x={x} y={y} width={width} height={3} fill="#2563eb" />
    </g>
  );
};

// Custom Label for the text sitting on top of the bars
const CustomLabel = (props: any) => {
  const { x, y, width, value } = props;
  const parts = value.split(' / ');

  return (
    <text
      x={x + width / 2}
      y={y - 15}
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-lg sm:text-xl lg:text-2xl"
    >
      {/* Dark Navy for the main percentage */}
      <tspan fill="#1e3a8a" fontWeight="600">{parts[0]}</tspan>
      {/* Lighter Slate-Blue for the / 100% */}
      <tspan fill="#64748b" fontWeight="400" fontSize="14"> / {parts[1]}</tspan>
    </text>
  );
};

const WhyVaphers: FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={mainVariants}
      // Changed background to a very faint blue (sky-50)
      className="max-w-full bg-[#f0f9ff] overflow-hidden py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Layout: Heading (Left) & Text (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <motion.div variants={textVariants} className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-blue-950 tracking-tight font-medium bungee-inline-regular">
              Why <span className="text-blue-600">Vaphers?</span>
            </h2>
          </motion.div>

          <motion.div variants={textVariants} className="lg:col-span-7 space-y-6">
            <p className="text-base lg:text-lg text-slate-800 font-medium leading-relaxed">
              At Vaphers, we specialize in innovative digital marketing strategies that drive results. Our team is dedicated to helping businesses grow and succeed online.
            </p>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
              With tailored solutions and a focus on measurable outcomes, we provide top-tier <strong>seo for b2b companies</strong> to empower brands to connect with their audience. Our dedicated <strong>organic seo specialist</strong> team works closely with you to achieve your goals in the digital landscape.
            </p>
          </motion.div>
        </div>

        {/* Bottom Layout: The Bar Chart */}
        <motion.div variants={mainVariants} className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 40, right: 0, bottom: 20, left: 0 }}
              barCategoryGap="15%"
            >
              <XAxis 
                dataKey="category" 
                axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }} // Slate-300 axis line
                tickLine={false}
                tick={{ fill: '#475569', fontSize: 13, dy: 15 }} // Slate-600 text
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