'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// 1. Changed description types to React.ReactNode for JSX support
interface HeroGridProps {
  heading?: string;
  description?: React.ReactNode; 
  heroImage?: string;
}

interface LogoProps {
  logos?: string[];
}

interface CardProps {
  title: string;
  description: React.ReactNode;
  image: string;
}

interface CombinedSectionProps {
  hero?: HeroGridProps;
  logoSection?: LogoProps;
  cards?: CardProps[];
}

export default function ExplainSection({
  hero = {
    heading: "We build digital experiences that matter.",
    description: (
      <div className="space-y-4">
        <p>Our team focuses on delivering high-performance SEO and web design services.</p>
        <p>We help your business scale effectively in the digital landscape.</p>
      </div>
    ),
    heroImage: "https://www.vaphers.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbwrnwa3l%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Cc_limit%2Cw_600%2Fv1761047475%2Fgirl-laptop_kwggux.png&w=640&q=75"
  },
  logoSection = {
    logos: Array(5).fill("https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773496852/Facebook-Partner_1_z2dmm2.png")
  },
  cards = [
    {
      title: "Get In Touch",
      description: "We would love to hear from you and discuss your next big project.",
      image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg"
    },
    {
      title: "Expert Strategy",
      description: "Data-driven insights to propel your brand to the top of search results.",
      image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773337877/download_jibv47.jpg"
    },
    {
      title: "Find Rest",
      description: "Experience a seamless development process where we handle the heavy lifting.",
      image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773338195/Vengan_a_m%C3%AD_todos_los_que_est%C3%A1n_cansados_y_agobiados_y_yo_les_dar%C3%A9_descanso_Pongan_mi_yugo_sobre_unitedes_y_aprendan_de_m%C3%AD_que_soy_sencillo_y_humilde_de_coraz%C3%B3n_As%C3%AD_encontrar%C3%A1n_descanso_para_su_esp%C3%ADritu_porq_nkdcix.jpg"
    }
  ]
}: CombinedSectionProps) {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 space-y-20">
      
    {/* 1. Hero Grid Section - Image takes more space (approx 55-60%) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-start justify-between">
        
        {/* Text Container: Narrower to give image room */}
        <div className="w-full md:w-[40%] lg:w-[45%] space-y-6">
          <h2 className="text-4xl md:text-5xl text-gray-800 leading-tight bungee-shade">
            {hero.heading}
          </h2>
          <div className="text-lg text-gray-600">
            {hero.description}
          </div>
        </div>
        
        {/* Image Container: Takes the remaining majority space */}
        <div className="relative w-full h-[400px] md:flex-1 md:h-[600px] lg:h-[650px] overflow-hidden flex-shrink-0">
          <Image 
            src={hero.heroImage!} 
            alt="Hero Section Image" 
            fill 
            className="object-contain md:object-center" // Aligns image to the right on desktop
            priority // High priority for LCP
          />
        </div>
      </div>

      {/* 2. Static 5-Logo Section */}
      <div className="max-w-7xl mx-auto w-full  border-y border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
          {logoSection.logos?.slice(0, 6).map((logo, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-center w-full"
            >
              <img 
                src={logo} 
                alt={`Partner Logo ${index + 1}`} 
                className="h-8 sm:h-10 md:h-18 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Three Cards Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -12 }}
            viewport={{ once: true }}
            className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8 space-y-4">
              <h3 className="text-2xl md:text-3xl text-gray-800 bungee-shade leading-tight">{card.title}</h3>
              <div className="text-gray-600 leading-relaxed">
                {card.description}
              </div>
            </div>
            <div className="relative h-[300px] mt-auto">
              <Image 
                src={card.image} 
                alt={card.title} 
                fill 
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}


// import ExplainSection from "@/components/ExplainSection";

// export default function Page() {
//   const customLogos = [
//     "https://logo-url-1.png",
//     "https://logo-url-2.png",
//     "https://logo-url-3.png",
//     "https://logo-url-4.png",
//     "https://logo-url-5.png",
//   ];

//   const customCards = [
//     {
//       title: "UI Design",
//       description: "Crafting beautiful interfaces.",
//       image: "https://your-image-url.com/1.jpg"
//     },
//     {
//       title: "SEO Boost",
//       description: "Get found on Google faster.",
//       image: "https://your-image-url.com/2.jpg"
//     },
//     {
//       title: "Fast Dev",
//       description: "Optimized Next.js code.",
//       image: "https://your-image-url.com/3.jpg"
//     }
//   ];

//   return (
//     <main>
//       <ExplainSection 
//         hero={{
//           heading: "Elevate Your Brand",
//           description: (
//             <div className="space-y-6">
//               <p>
//                 First paragraph: We build <strong>SEO-optimized</strong> websites that 
//                 help you reach more customers in Kolkata and beyond.
//               </p>
//               <p>
//                 Second paragraph: Our team uses Next.js and Tailwind CSS to ensure 
//                 your site is lightning fast.
//               </p>
//             </div>
//           ),
//           heroImage: "https://your-hero-image.com"
//         }}
//         logoSection={{
//           logos: customLogos // Passing the 5 logos here
//         }}
//         cards={customCards}
//       />
//     </main>
//   );
// }