import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Props Interface ---
export interface SectionImage {
  src: string;
  alt: string;
  className?: string; // Optional class for custom positioning/sizing per image
}

export interface MarketSectionProps {
  heading: string;
  paragraphs?: string[]; // Array of strings, where each string is a separate paragraph block
  ctaLabel: string;
  ctaHref: string;
  images?: SectionImage[];
  className?: string; // Additional classes for the whole section
}

// --- Animation Variants ---
const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.2, 
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

// --- Functional Component ---
const Explain: React.FC<MarketSectionProps> = ({
  heading,
  paragraphs = [],
  ctaLabel,
  ctaHref,
  images = [],
  className = '',
}) => {
  return (
    <section
      className={`bg-blue-100 text-[#333] font-sans px-6 md:px-12 py-16 md:py-24 ${className}`}
    >
      <motion.div
        className="max-w-7xl mx-auto space-y-20"
        initial="initial"
        whileInView="animate" 
        viewport={{ once: true, amount: 0.3 }} 
        variants={containerVariants}
      >
        {/* Top Section - Text Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Left Column - Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight md:col-span-2 md:pr-12"
            variants={itemVariants}
          >
            {heading}
          </motion.h1>

          {/* Right Column - Paragraphs and CTA */}
          <div className="md:col-span-3 space-y-8">
            {paragraphs.map((para, index) => (
              <motion.p
                key={index}
                className="text-lg leading-relaxed text-[#555]"
                variants={itemVariants}
              >
                {para}
              </motion.p>
            ))}

            <motion.a
              href={ctaHref}
              className="inline-flex items-center text-lg font-medium group text-[#333] hover:text-[#000]"
              variants={itemVariants}
              whileHover={{ x: 5 }} 
            >
              <span className="mr-2 border-b-2 border-transparent group-hover:border-current transition-all">
                {ctaLabel}
              </span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>

        {/* Bottom Section - Image Grid */}
        {images && images.length > 0 && (
          <motion.div
            // Added `items-start` here so the shorter image aligns to the top and doesn't stretch vertically
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
            variants={containerVariants}
          >
            {images.map((image, index) => {
              // Default logic: middle image (index 1) is shorter (aspect-square), others are taller (aspect-[4/5])
              const defaultAspect = index === 1 ? 'aspect-[4/3] md:aspect-square' : 'aspect-[4/5]';
              
              return (
                <motion.div
                  key={index}
                  className={`${image.className || defaultAspect} overflow-hidden`}
                  variants={itemVariants}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Explain;





// How to use: 



// import React from 'react';
// import MarketSection from './MarketSection'; // Import from the file path

// // --- Placeholders/Sample Data ---
// const sampleHeading = 'Working with global businesses that shape the market.';

// const sampleParagraphs = [
//   'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
//   'Ullamcorper eget nulla facilisi etiam dignissim diam quis. Aliquet lectus proin nibh nisl condimentum. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Sagittis id consectetur purus ut faucibus pulvinar.',
// ];

// const sampleImages = [
//   {
//     src: 'https://images.unsplash.com/photo-1543332164-6e82f35557aa?q=80&w=600&auto=format&fit=crop', // Stock living room
//     alt: 'Modern living room with brick wall and city view',
//     className: 'lg:h-full', // Stretch the first image on desktop
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop', // Stock business collaboration
//     alt: 'Team collaborating with laptops around a table',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1593062096033-9a26b09dd24e?q=80&w=600&auto=format&fit=crop', // Stock home office
//     alt: 'Tidy wooden desk with an all-in-one computer and plants',
//   },
// ];

// // --- Page Component ---
// const App: React.FC = () => {
//   return (
//     <div className="bg-white min-h-screen">
//       <MarketSection
//         heading={sampleHeading}
//         paragraphs={sampleParagraphs}
//         ctaLabel="More about us"
//         ctaHref="#"
//         images={sampleImages}
//       />
//     </main>
//   );
// };

// export default App;