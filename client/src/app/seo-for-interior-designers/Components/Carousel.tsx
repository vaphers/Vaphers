import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/dist/client/link';

// --- Dummy Data ---
// You will replace these with your actual flat UI mockup images later.
const showcaseImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
];

export default function PresentationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
  };

  // Framer Motion variants for the image sliding effect
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#f3f2ee] flex flex-col items-center justify-center py-16 overflow-hidden font-sans">

      {/* Center Image Showcase */}
      <div className="w-[95%] md:w-[90%] lg:w-[80%] aspect-[16/10] relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white overflow-hidden rounded-sm">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={showcaseImages[currentIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt={`Showcase ${currentIndex + 1}`}
          />
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mt-12 flex items-center justify-between gap-6">

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="text-blue-600 hover:text-blue-700 transition-colors p-2"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Dynamic Progress Line */}
        <div className="flex-1 h-[1px] bg-[#e0dbd5] relative rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 h-full bg-blue-600"
            initial={false}
            animate={{
              width: `${100 / showcaseImages.length}%`,
              left: `${(currentIndex * 100) / showcaseImages.length}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="text-blue-600 hover:text-blue-700 transition-colors p-2"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      {/* Text Content Section */}
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mt-24 max-w-6xl self-center text-[#222]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 bungee-shade text-center">
          A Real Example: Oraanj Interiors
        </h2>
        <div className="space-y-6 text-[#444] text-lg md:text-xl font-light leading-relaxed max-w-5xl text-center mx-auto">
          <p>
            When Rachana Gupta, owner of <a href='https://www.oraanj-interiors.co.uk' className='text-blue-600'>Oraanj Interiors</a>, came to us, her studio had a strong portfolio and a loyal client base,  but almost all of it came from word-of-mouth. Her website barely showed up for the searches her ideal clients were actually running.
          </p>
          <p>
            We rebuilt her SEO foundation from the ground up: cleaned up her site structure, optimized her project galleries (which, for an interior design brand, often matter more than text), and built out content around the specific services and locations she wanted more of. No gimmicks, just making sure Google understood what Oraanj Interiors does and who it's for.
          </p>
          <p>
            The result was a steady rise in qualified organic inquiries, the kind of leads that had already seen her work and were ready to talk, not tire-kickers. It's a small case study, but it's a good example of what changes when SEO for interior designers is built around the way design clients actually search and decide, instead of copied from a generic local-business template.
          </p>
        </div>
      </div>

              <Link href={"https://calendar.app.google/EkZJNhjEhLxjfqPa6"} className="w-full sm:w-auto mt-10  ">
          <button className="w-fit transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-800 dark:bg-blue-500 dark:text-black dark:hover:bg-gray-200">
            I Want Results Like This for My Studio
          </button>
        </Link>

    </div>
  );
}