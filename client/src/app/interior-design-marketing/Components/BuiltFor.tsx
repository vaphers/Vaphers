import React from 'react';
import { motion, Variants } from 'framer-motion';
import Explain from '@/PageComponents/Props Based Components/Explain';

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const BuiltFor: React.FC = () => {
  return (
    <section className="bg-blue-100 text-[#333] font-sans px-6 md:px-12 py-16 md:py-24">
      <motion.div
        className="max-w-7xl mx-auto space-y-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight md:col-span-2 md:pr-12 bungee-shade"
            variants={itemVariants}
          >
            Built for Studios in the US and the UK
          </motion.h1>
          <div className="md:col-span-3 space-y-8">
            <motion.p className="text-lg leading-relaxed text-[#555]" variants={itemVariants}>
              Whether you're a solo interior designer in London or run a growing studio in the US, the marketing needs of your ideal clients are more alike than different, but local nuances (culture, platforms, regional search habits, social media trends) matter. We tailor interior design marketing strategies to whichever market, or both markets, you're working in, so nothing gets lost in translation.
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-flex items-center text-lg font-medium group text-[#333] hover:text-[#000]"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <span className="mr-2 border-b-2 border-transparent group-hover:border-current transition-all">
                Get A Personalized Strategy
              </span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
        >
          <motion.div className="lg:h-full overflow-hidden" variants={itemVariants}>
            <img
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg"
              alt="Modern living room with brick wall and city view"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          <motion.div className="aspect-[4/3] md:aspect-square overflow-hidden" variants={itemVariants}>
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop"
              alt="Team collaborating with laptops around a table"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          <motion.div className="aspect-[4/5] overflow-hidden" variants={itemVariants}>
            <img
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg"
              alt="Tidy wooden desk with an all-in-one computer and plants"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BuiltFor;
