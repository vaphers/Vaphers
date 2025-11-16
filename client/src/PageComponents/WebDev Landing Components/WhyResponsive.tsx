'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const WhyResponsive: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 3 + custom * 0.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay: custom * 0.3,
      },
    }),
  };

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-gradient-to-b from-[#0f3064] via-[#2563eb] to-[#0f3064]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-12 pb-8 sm:pb-12 lg:pb-12">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12 lg:flex-row lg:items-center">
          {/* Illustration */}
          <div className="relative hidden w-full lg:block lg:w-1/2">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761746360/Master_Local_SEO_cofn00.png"
                alt="Responsive web design illustration"
                width={600}
                height={600}
                className="h-auto w-full object-contain"
                priority
              />

              {/* Floating badges */}
              <div className="absolute inset-0">
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-55 lg:-right-1"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761747669/Rank_One_On_Google_v7q5as.png"
                    alt="SEO ranking badge"
                    width={176}
                    height={176}
                    className="h-28 w-28 object-contain sm:h-28 sm:w-28 lg:h-44 lg:w-44"
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-55 lg:-left-6"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w-100/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png"
                    alt="Google logo"
                    width={100}
                    height={100}
                    className="h-12 w-12 object-contain sm:h-10 sm:w-10 lg:h-18 lg:w-18"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content: Why responsive website design */}
          <div className="w-full space-y-4 text-center sm:space-y-6 lg:w-2/3 lg:text-left">
            <div>
              <h2 className="bungee-inline-regular text-4xl font-base tracking-[-0.03em] text-gray-100 md:text-4xl lg:text-5xl">
                Why you need <span className="bg-blue-300 bg-clip-text text-transparent">responsive website design?</span>
              </h2>
              <p className="text-center font-medium text-gray-200 md:text-xl lg:text-start">
                One site that adapts to every screen means better experience, better rankings, and better conversions.
              </p>
            </div>

            <p className="text-white lg:text-lg text-lg leading-relaxed">
              Google{' '}
              <Link 
                href="https://developers.google.com/search/blog/2012/04/responsive-design-harnessing-power-of"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-300 hover:text-blue-200 underline decoration-1 underline-offset-2"
              >
                officially recommends responsive web design
              </Link>{' '}
              and indexes the mobile version of your pages first, so a responsive build directly supports discoverability and long‑term SEO health.
            </p>

            <p className="text-white lg:text-lg text-lg leading-relaxed">
              Responsive layouts deliver superior Core Web Vitals scores across real devices, faster paint times, stable viewports, and instant interactions, which improves user satisfaction and helps your pages rank competitively.
            </p>

            <ul className="mx-auto grid w-full gap-4 text-left text-white sm:grid-cols-2 lg:mx-0">
              <li className="rounded-lg bg-white/10 p-4 backdrop-blur">
                Mobile‑first UX reduces bounce rates, extends session duration, and protects paid campaign quality scores.
              </li>
              <li className="rounded-lg bg-white/10 p-4 backdrop-blur">
                Future‑proof foundation that scales to new devices without maintaining separate mobile sites or redirect chains.
              </li>
            </ul>

            {/* CTA */}
            <div className="flex justify-center pb-4 pt-4 sm:pt-6 lg:justify-start lg:pt-5">
              <a href="https://www.vaphers.com/contact">
              <div className="inline-flex cursor-pointer items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-6 sm:py-3 sm:text-sm lg:px-8 lg:py-4 lg:text-base">
                <span className="mr-2 sm:mr-3">Make my site responsive</span>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyResponsive;
