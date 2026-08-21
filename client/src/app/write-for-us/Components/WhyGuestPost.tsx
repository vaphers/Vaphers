'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Animation Variants ---
const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// --- Static Marketing Guest Post Benefits Section ---
const GuestPostBenefitsSection: React.FC = () => {
  return (
    <section className="bg-blue-100 text-[#222] font-sans px-6 md:px-12 py-16 md:py-24">
      <motion.div
        className="max-w-7xl mx-auto space-y-16 md:space-y-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Top Section - Heading & Benefits Copy */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
          {/* Left Column - Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight md:col-span-2 md:pr-8 text-[#1a1a1a] libre-franklin-light"
            variants={itemVariants}
          >
            How publishing a marketing guest post grows your brand?
          </motion.h2>

          {/* Right Column - Simple Benefit Breakdown */}
          <div className="md:col-span-3 space-y-6">
            <motion.p
              className="text-lg leading-relaxed text-[#444]"
              variants={itemVariants}
            >
              <strong>Get directly in front of targeted decision-makers.</strong> When you share your marketing insights here, you reach an active audience of founders, growth leaders, and marketing teams looking for actionable solutions.
            </motion.p>

            <motion.p
              className="text-lg leading-relaxed text-[#444]"
              variants={itemVariants}
            >
              <strong>Build authoritative domain presence and high-intent traffic.</strong> High-quality editorial placement helps reinforce your brand’s authority, boosts relevant referral visits, and builds durable trust in your niche.
            </motion.p>

            <motion.p
              className="text-lg leading-relaxed text-[#444]"
              variants={itemVariants}
            >
              <strong>Position yourself as an industry expert.</strong> Showcase your case studies, campaign results, and frameworks to turn passive readers into long-term subscribers, leads, and collaborators.
            </motion.p>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="pt-2">
              <motion.a
                href="/write-for-us/signup"
                className="inline-flex items-center text-lg font-semibold text-[#1a1a1a] hover:text-blue-700 transition-colors group"
                whileHover={{ x: 4 }}
              >
                <span className="mr-2 border-b-2 border-current pb-0.5">
                  Publish a post today
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Visual Media Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start"
          variants={containerVariants}
        >
          {/* Card 1 */}
          <motion.div
            className="aspect-[4/5] rounded-2xl overflow-hidden shadow-sm"
            variants={itemVariants}
          >
            <img
              src="https://i.pinimg.com/736x/30/41/7d/30417d9aeb0f64beba68227a1fd34726.jpg"
              alt="Marketing strategy team brainstorming ideas"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>

          {/* Card 2 - Shorter aspect ratio to preserve asymmetric layout */}
          <motion.div
            className="aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-sm"
            variants={itemVariants}
          >
            <img
              src="https://i.pinimg.com/736x/66/bf/b4/66bfb4c6f458cf35ce4b5ad92ad126ad.jpg"
              alt="Analytics dashboard showing traffic and growth"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="aspect-[4/5] rounded-2xl overflow-hidden shadow-sm"
            variants={itemVariants}
          >
            <img
              src="https://i.pinimg.com/736x/b4/14/65/b41465baf48bf01c794dd2b5a71a5748.jpg"
              alt="Content creators collaborating on a digital marketing campaign"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GuestPostBenefitsSection;