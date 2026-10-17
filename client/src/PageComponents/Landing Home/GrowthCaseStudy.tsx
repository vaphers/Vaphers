'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  day: number;
  dateStr: string;
  clicks: number;
  impressions: number;
}

// 90 days dataset replicating Google Search Console performance from the reference image
const chartData: DataPoint[] = [
  // Phase 1: Pre-launch (Flat near zero)
  { day: 1, dateStr: 'Day 1', clicks: 0, impressions: 32 },
  { day: 4, dateStr: 'Day 4', clicks: 1, impressions: 45 },
  { day: 7, dateStr: 'Day 7', clicks: 0, impressions: 28 },
  { day: 10, dateStr: 'Day 10', clicks: 1, impressions: 40 },
  { day: 13, dateStr: 'Day 13', clicks: 0, impressions: 35 },
  { day: 16, dateStr: 'Day 16', clicks: 0, impressions: 22 },
  { day: 19, dateStr: 'Day 19', clicks: 1, impressions: 48 },
  { day: 22, dateStr: 'Day 22', clicks: 0, impressions: 30 },
  { day: 25, dateStr: 'Day 25', clicks: 0, impressions: 25 },
  { day: 28, dateStr: 'Day 28', clicks: 1, impressions: 42 },
  { day: 31, dateStr: 'Day 31', clicks: 0, impressions: 34 },
  { day: 34, dateStr: 'Day 34', clicks: 1, impressions: 50 },
  { day: 37, dateStr: 'Day 37', clicks: 0, impressions: 29 },
  { day: 40, dateStr: 'Day 40', clicks: 1, impressions: 41 },

  // Milestone: FirstIndex / Vaphers starts at Day 41
  { day: 41, dateStr: 'Day 41', clicks: 4, impressions: 180 },
  { day: 42, dateStr: 'Day 42', clicks: 15, impressions: 1200 },
  { day: 43, dateStr: 'Day 43', clicks: 8, impressions: 1850 },
  { day: 44, dateStr: 'Day 44', clicks: 22, impressions: 2600 },
  { day: 45, dateStr: 'Day 45', clicks: 14, impressions: 3400 },
  { day: 46, dateStr: 'Day 46', clicks: 11, impressions: 2950 },
  { day: 47, dateStr: 'Day 47', clicks: 19, impressions: 2150 },
  { day: 48, dateStr: 'Day 48', clicks: 28, impressions: 3200 },
  { day: 49, dateStr: 'Day 49', clicks: 26, impressions: 4100 },
  { day: 50, dateStr: 'Day 50', clicks: 35, impressions: 4800 },
  { day: 51, dateStr: 'Day 51', clicks: 28, impressions: 4350 },
  { day: 52, dateStr: 'Day 52', clicks: 42, impressions: 5900 },
  { day: 53, dateStr: 'Day 53', clicks: 38, impressions: 7200 },
  { day: 54, dateStr: 'Day 54', clicks: 68, impressions: 10800 },
  { day: 55, dateStr: 'Day 55', clicks: 58, impressions: 8400 },
  { day: 56, dateStr: 'Day 56', clicks: 65, impressions: 9200 },
  { day: 57, dateStr: 'Day 57', clicks: 62, impressions: 8600 },
  { day: 58, dateStr: 'Day 58', clicks: 80, impressions: 10100 },
  { day: 59, dateStr: 'Day 59', clicks: 74, impressions: 9400 },
  { day: 60, dateStr: 'Day 60', clicks: 68, impressions: 8200 },
  { day: 61, dateStr: 'Day 61', clicks: 88, impressions: 9600 },
  { day: 62, dateStr: 'Day 62', clicks: 82, impressions: 8800 },
  { day: 63, dateStr: 'Day 63', clicks: 76, impressions: 7900 },
  { day: 64, dateStr: 'Day 64', clicks: 54, impressions: 10400 },
  { day: 65, dateStr: 'Day 65', clicks: 78, impressions: 12200 },
  { day: 66, dateStr: 'Day 66', clicks: 66, impressions: 14600 },
  { day: 67, dateStr: 'Day 67', clicks: 84, impressions: 11500 },
  { day: 68, dateStr: 'Day 68', clicks: 79, impressions: 9100 },
  { day: 69, dateStr: 'Day 69', clicks: 92, impressions: 10500 },
  { day: 70, dateStr: 'Day 70', clicks: 88, impressions: 8900 },
  { day: 71, dateStr: 'Day 71', clicks: 98, impressions: 9400 },
  { day: 72, dateStr: 'Day 72', clicks: 86, impressions: 8100 },
  { day: 73, dateStr: 'Day 73', clicks: 106, impressions: 8900 },
  { day: 74, dateStr: 'Day 74', clicks: 95, impressions: 9800 },
  { day: 75, dateStr: 'Day 75', clicks: 116, impressions: 10600 },
  { day: 76, dateStr: 'Day 76', clicks: 122, impressions: 11200 },
  { day: 77, dateStr: 'Day 77', clicks: 148, impressions: 9800 },
  { day: 78, dateStr: 'Day 78', clicks: 135, impressions: 8500 },
  { day: 79, dateStr: 'Day 79', clicks: 142, impressions: 7800 },
  { day: 80, dateStr: 'Day 80', clicks: 124, impressions: 7200 },
  { day: 81, dateStr: 'Day 81', clicks: 138, impressions: 7600 },
  { day: 82, dateStr: 'Day 82', clicks: 132, impressions: 8100 },
  { day: 83, dateStr: 'Day 83', clicks: 154, impressions: 10400 },
  { day: 84, dateStr: 'Day 84', clicks: 168, impressions: 9800 },
  { day: 85, dateStr: 'Day 85', clicks: 146, impressions: 11200 },
  { day: 86, dateStr: 'Day 86', clicks: 172, impressions: 10400 },
  { day: 87, dateStr: 'Day 87', clicks: 155, impressions: 9600 },
  { day: 88, dateStr: 'Day 88', clicks: 178, impressions: 10200 },
  { day: 89, dateStr: 'Day 89', clicks: 148, impressions: 9100 },
  { day: 90, dateStr: 'Day 90', clicks: 164, impressions: 9400 },
];

export default function GrowthCaseStudy() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Geometry configuration for SVG
  const width = 1000;
  const height = 460;
  const padLeft = 70;
  const padRight = 70;
  const padTop = 60;
  const padBottom = 40;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxClicks = 210;
  const maxImpressions = 15000;

  // Convert (day, value) to SVG (x, y)
  const getX = (index: number) => {
    return padLeft + (index / (chartData.length - 1)) * chartW;
  };

  const getClicksY = (clicks: number) => {
    const clamped = Math.max(0, Math.min(maxClicks, clicks));
    return padTop + chartH - (clamped / maxClicks) * chartH;
  };

  const getImpY = (imp: number) => {
    const clamped = Math.max(0, Math.min(maxImpressions, imp));
    return padTop + chartH - (clamped / maxImpressions) * chartH;
  };

  // Build SVG path strings
  const clicksPath = chartData.reduce((acc, curr, i) => {
    const x = getX(i);
    const y = getClicksY(curr.clicks);
    return i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  const impressionsPath = chartData.reduce((acc, curr, i) => {
    const x = getX(i);
    const y = getImpY(curr.impressions);
    return i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, '');

  // Milestone X position at Day 41 (index 14)
  const milestoneIndex = 14;
  const milestoneX = getX(milestoneIndex);

  // Mouse interaction handler
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * width;

    if (svgX < padLeft || svgX > width - padRight) {
      setHoverIndex(null);
      return;
    }

    const ratio = (svgX - padLeft) / chartW;
    const index = Math.round(ratio * (chartData.length - 1));
    const clamped = Math.max(0, Math.min(chartData.length - 1, index));
    setHoverIndex(clamped);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activePoint = hoverIndex !== null ? chartData[hoverIndex] : null;

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white overflow-hidden border-b border-gray-200">
      <div className="relative z-10 w-[95%] sm:w-[90%] lg:w-[86%] max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Headline on Left, Stats on Right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10 sm:mb-14">
          {/* Left: Large Editorial Headline */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] text-gray-950 leading-[1.1] tracking-tight montserrat-medium">
              From Zero To <span className="text-blue-600">160 Clicks</span> A Day In 90 Days.
            </h2> 
          </div>

          {/* Right: Dual Highlight Stats */}
          <div className="flex items-start gap-10 sm:gap-16 pt-2">
            {/* Stat 1: Clicks */}
            <div className="flex flex-col">
              <span className="text-5xl sm:text-6xl lg:text-[68px] montserrat-bold text-blue-600 leading-none tracking-tight">
                164
              </span>
              <p className="text-gray-600 text-xs sm:text-sm font-sans mt-2.5 leading-snug max-w-[155px]">
                clicks a day by week 12, up from under 1
              </p>
            </div>

            {/* Stat 2: Impressions */}
            <div className="flex flex-col">
              <span className="text-5xl sm:text-6xl lg:text-[68px] montserrat-bold text-gray-950 leading-none tracking-tight">
                9.4K
              </span>
              <p className="text-gray-500 text-xs sm:text-sm font-sans mt-2.5 leading-snug max-w-[155px]">
                impressions a day, up from 41
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-4 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-900">
            <span className="w-5 h-[3.5px] bg-blue-600 rounded-full inline-block" />
            <span>Clicks</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-5 h-[1.5px] bg-gray-500 rounded-full inline-block" />
            <span>Impressions</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative w-full bg-transparent rounded-2xl p-2 sm:p-4 transition-all">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Horizontal Grid Guidelines */}
            {[
              { valClicks: 210, valImp: '15K', y: padTop },
              { valClicks: 140, valImp: '10K', y: padTop + chartH * (1 / 3) },
              { valClicks: 70, valImp: '5K', y: padTop + chartH * (2 / 3) },
            ].map((grid, idx) => (
              <g key={idx}>
                {/* Left Y-axis label */}
                <text
                  x={padLeft - 18}
                  y={grid.y + 4}
                  textAnchor="end"
                  className="fill-gray-500 text-[13px] font-medium font-sans"
                >
                  {grid.valClicks}
                </text>

                {/* Right Y-axis label */}
                <text
                  x={width - padRight + 18}
                  y={grid.y + 4}
                  textAnchor="start"
                  className="fill-gray-500 text-[13px] font-medium font-sans"
                >
                  {grid.valImp}
                </text>

                {/* Dashed Horizontal Line */}
                <line
                  x1={padLeft}
                  y1={grid.y}
                  x2={width - padRight}
                  y2={grid.y}
                  stroke="#E2E8F0"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              </g>
            ))}

            {/* Baseline at 0 */}
            <g>
              <text
                x={padLeft - 18}
                y={padTop + chartH + 4}
                textAnchor="end"
                className="fill-gray-500 text-[13px] font-medium font-sans"
              >
                0
              </text>
              <text
                x={width - padRight + 18}
                y={padTop + chartH + 4}
                textAnchor="start"
                className="fill-gray-500 text-[13px] font-medium font-sans"
              >
                0
              </text>
              <line
                x1={padLeft}
                y1={padTop + chartH}
                x2={width - padRight}
                y2={padTop + chartH}
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
            </g>

            {/* Vertical Milestone Indicator: "FirstIndex starts" */}
            <g>
              <line
                x1={milestoneX}
                y1={padTop - 5}
                x2={milestoneX}
                y2={padTop + chartH}
                stroke="#2563EB"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Milestone square icon */}
              <rect
                x={milestoneX + 10}
                y={padTop - 2}
                width="7"
                height="7"
                className="fill-blue-600"
              />
              {/* Milestone text */}
              <text
                x={milestoneX + 23}
                y={padTop + 5}
                className="fill-blue-600 text-[12px] font-bold font-sans tracking-wide"
              >
                FirstIndex starts
              </text>
            </g>

            {/* Impressions Line (Grey) */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              d={impressionsPath}
              fill="none"
              stroke="#6B7280"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Clicks Line (Blue - Vibrant & Bold) */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.15 }}
              d={clicksPath}
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Hover Scrubber */}
            {hoverIndex !== null && activePoint && (
              <g>
                {/* Vertical tracking line */}
                <line
                  x1={getX(hoverIndex)}
                  y1={padTop}
                  x2={getX(hoverIndex)}
                  y2={padTop + chartH}
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Impressions marker dot */}
                <circle
                  cx={getX(hoverIndex)}
                  cy={getImpY(activePoint.impressions)}
                  r="5"
                  className="fill-gray-600 stroke-white stroke-2"
                />

                {/* Clicks marker dot */}
                <circle
                  cx={getX(hoverIndex)}
                  cy={getClicksY(activePoint.clicks)}
                  r="6"
                  className="fill-blue-600 stroke-white stroke-2 drop-shadow-sm"
                />
              </g>
            )}
          </svg>

          {/* Interactive Tooltip Card Floating */}
          {hoverIndex !== null && activePoint && (
            <div
              className="absolute pointer-events-none z-30 transition-all duration-75"
              style={{
                left: `${(getX(hoverIndex) / width) * 100}%`,
                top: `${(Math.min(getClicksY(activePoint.clicks), getImpY(activePoint.impressions)) / height) * 100}%`,
                transform: 'translate(-50%, -115%)',
              }}
            >
              <div className="bg-gray-950 text-white rounded-xl shadow-2xl px-3.5 py-2.5 text-xs border border-gray-800 min-w-[150px]">
                <div className="text-[11px] font-mono text-gray-400 mb-1.5 border-b border-gray-800 pb-1">
                  {activePoint.dateStr}
                </div>
                <div className="flex items-center justify-between gap-3 text-blue-400 font-semibold mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Clicks
                  </span>
                  <span className="font-mono text-white text-sm">{activePoint.clicks}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-gray-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400" /> Impressions
                  </span>
                  <span className="font-mono text-white">
                    {activePoint.impressions >= 1000 
                      ? `${(activePoint.impressions / 1000).toFixed(1)}K` 
                      : activePoint.impressions}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

