'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, Globe, Users } from 'lucide-react';

const WhatsShopify: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const floatingVariants: Variants = {
    animate: (custom: number) => ({
      y: [0, -20, 0],
      transition: {
        duration: 3 + custom * 0.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: custom * 0.3,
      },
    }),
  };

  // Stats
  const stats = [
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      value: "5.8M+",
      label: "Active Stores",
      description: "Shopify powers over 5.8 million live stores globally, making it a leading e-commerce platform."
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      value: "$1T+",
      label: "Annual GMV",
      description: "Merchants generated over $1 trillion in global sales through Shopify in 2024."
    }
  ];

  return (
    <section 
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat" 
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761047482/GraphBG_pr6cri.png)`,
      }}
    >
      <div className='max-w-7xl mx-auto pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16'>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">

          {/* Content */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div>
              <h2 className="text-4xl md:text-4xl lg:text-5xl text-center lg:text-start font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                What is 
                <span className="bg-blue-600 bg-clip-text text-transparent"> Shopify</span>?
              </h2>
              <p className="text-base md:text-xl text-center lg:text-start text-blue-600 font-medium">
                The all-in-one commerce platform for online selling
              </p>
            </div>
            
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
              Shopify is a cloud-based, all-in-one e-commerce platform that allows businesses to build and manage online stores without coding knowledge. Launched in 2006, it has evolved into the go-to solution for entrepreneurs, retailers, and global brands looking to sell online and in person. With its user-friendly drag-and-drop editor, AI-powered store design, 250+ mobile-friendly themes, and the world's highest-converting checkout, Shopify handles everything from product sourcing and inventory management to secure payments and multi-channel selling across social media, making it easy to start, scale, and succeed in e-commerce.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-800 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Button */}
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Start Your Shopify Store</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Image Section - Right side on desktop */}
          <div className="w-full h-auto lg:w-1/2 flex justify-start items-start relative order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              <Image 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761569143/Frame_1_s7kydx.png" 
                alt="Shopify E-commerce Dashboard" 
                width={600}
                height={700}
                className="w-full h-auto object-contain"
                priority
              />
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {/* Shopify  */}
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761658327/Adobe_Express_-_file_p0mimj.png" 
                    alt="Shopify Logo"
                    width={56}
                    height={56}
                    className="w-18 h-18 sm:w-10 sm:h-10 lg:w-29 lg:h-29 object-contain" 
                  />
                </motion.div>
                {/* Woo Commerce  */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:-top-4 lg:-right-12"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761657677/WooCommerce-Logo_ef4x1p.png" 
                    alt="Woo Commerce Logo" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
                {/* Wix */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate="animate"
                  className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-30 lg:-left-10"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761657746/png-clipart-wix-newest-logo-tech_1_omfyj6.png" 
                    alt="Wix Logo" 
                    width={176}
                    height={176}
                    className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsShopify;
