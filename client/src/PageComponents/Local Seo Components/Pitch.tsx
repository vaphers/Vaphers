'use client'

import React from 'react'
import Image from 'next/image'
import { TrendingUp } from 'lucide-react'

const LocalPitch: React.FC = () => {
  return (
    <section className="max-w-full overflow-hidden">
      <div className="relative max-w-full  px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-10 pb-8 sm:pb-12 lg:pb-16">
        {/* Dashed Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 0',
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />

        <div className="flex flex-col max-w-7xl mx-auto lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761737739/AffordableLocalSeoServices_2_zxfo9e.png"
                alt="SEO tools and digital marketing analytics platform"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-700 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Affordable{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent ">
                  Local SEO Service
                </span>{' '}
                Trusted By Experts
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
                Stay ahead in the digital marketplace with proven local SEO strategies tailored for your business.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
              Without expert Local SEO, your business risks invisibility among the 8.5 billion daily Google searches by your potential customers. Competitors offering superior services are capturing valuable market share where you should be ranking. Our affordable local SEO service positions your business prominently in{' '}
              <a href="#" className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium">
                local searches, mobile results, and voice queries
              </a>
              , while building a strong digital authority that ensures sustainable growth and establishes your brand as the trusted local industry leader.
            </p>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Start Your Local SEO Journey Today</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocalPitch





// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import { TrendingUp } from 'lucide-react'
// import { motion, Variants } from 'framer-motion'

// const floatVariants: Variants = {
//   animate: (i: number) => ({
//     x: [0, 10, 0],
//     y: [0, -12, 0],
//     transition: {
//       duration: 3.5 + i * 0.4,
//       repeat: Infinity,
//       ease: 'easeInOut',
//       delay: i * 0.25,
//     },
//   }),
// }

// const LocalPitch: React.FC = () => {
//   return (
//     <section className="max-w-full overflow-hidden">
//       <div className="relative max-w-full px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-10 pb-8 sm:pb-12 lg:pb-16">
//         {/* Dashed Grid Background */}
//         <div
//           className="pointer-events-none absolute inset-0 -z-10"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, #e7e5e4 1px, transparent 1px),
//               linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
//             `,
//             backgroundSize: '20px 20px',
//             backgroundPosition: '0 0, 0 0',
//             maskImage: `
//               repeating-linear-gradient(
//                 to right,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               ),
//               repeating-linear-gradient(
//                 to bottom,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               )
//             `,
//             WebkitMaskImage: `
//               repeating-linear-gradient(
//                 to right,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               ),
//               repeating-linear-gradient(
//                 to bottom,
//                 black 0px,
//                 black 3px,
//                 transparent 3px,
//                 transparent 8px
//               )
//             `,
//             maskComposite: 'intersect',
//             WebkitMaskComposite: 'source-in',
//           }}
//         />

//         <div className="flex flex-col max-w-7xl mx-auto lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
//           {/* Image + floating elements */}
//           <div className="w-full lg:w-1/2 flex justify-center">
//             <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
//               <Image
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761735017/AffordableLocalSeoServices_1_bx2jpe.png"
//                 alt="SEO tools and digital marketing analytics platform"
//                 width={600}
//                 height={600}
//                 className="w-full h-auto object-contain"
//                 priority
//               />

//               {/* floating layer */}
//               <div className="pointer-events-none absolute inset-0">
//                 {/* ChatGPT */}
//                 <motion.div
//                   custom={0}
//                   variants={floatVariants}
//                   animate="animate"
//                   className="absolute top-1 left-1 sm:top-3 sm:left-2 lg:top-1 lg:-left-3"
//                 >
//                   <Image
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_100/v1761047474/chat-gpt-logo_qf83fb.png"
//                     alt="ChatGPT"
//                     width={100}
//                     height={100}
//                     className="w-12 h-12 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain drop-shadow"
//                   />
//                 </motion.div>

//                 {/* Perplexity */}
//                 <motion.div
//                   custom={1}
//                   animate={{
//                     y: [0, -18, 0],            
//                   }}
//                   transition={{
//                     duration: 3.8,            
//                     repeat: Infinity,
//                     ease: 'easeInOut',         
//                     delay: 0.25,               
//                   }}
//                   className="absolute -top-2 right-1 sm:top-1 sm:right-2 lg:top-36 lg:right-0"
//                 >
//                   <Image
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047484/perplexity-logo_zqmnzf.png"
//                     alt="Perplexity AI"
//                     width={112}
//                     height={112}
//                     className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 object-contain drop-shadow"
//                   />
//                 </motion.div>

//                 {/* Gemini */}
//                 <motion.div
//                   custom={2}
//                   variants={floatVariants}
//                   animate="animate"
//                   className="absolute bottom-2 left-2 sm:bottom-6 sm:left-3 lg:bottom-16 lg:left-10"
//                 >
//                   <Image
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047475/gemini-logo_yes1g8.png"
//                     alt="Google Gemini"
//                     width={112}
//                     height={112}
//                     className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 object-contain drop-shadow"
//                   />
//                 </motion.div>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
//             <div>
//               <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-700 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
//                 Affordable <span className="bg-blue-600 bg-clip-text text-transparent">Local SEO Service</span> Trusted By Experts
//               </h2>
//               <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-500 font-medium">
//                 Stay ahead in the digital marketplace with proven local SEO strategies tailored for your business.
//               </p>
//             </div>

//             <p className="text-sm sm:text-base lg:text-lg text-gray-900 leading-relaxed text-center lg:text-left">
//               Without expert Local SEO, your business risks invisibility among the 8.5 billion daily Google searches by your potential customers. Competitors offering superior services are capturing valuable market share where you should be ranking. Our affordable local SEO service positions your business prominently in{' '}
//               <a href="#" className="text-blue-500 underline hover:text-blue-400 duration-200 font-medium">
//                 local searches, mobile results, and voice queries
//               </a>
//               , while building a strong digital authority that ensures sustainable growth and establishes your brand as the trusted local industry leader.
//             </p>

//             <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
//               <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
//                 <span className="mr-2 sm:mr-3">Start Your Local SEO Journey Today</span>
//                 <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default LocalPitch
