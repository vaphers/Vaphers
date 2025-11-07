// 'use client'

// import React, { useRef, useState, useEffect } from 'react'
// import Image from 'next/image'
// import { motion, useScroll, useTransform, Variants } from 'framer-motion'
// import { TrendingUp } from 'lucide-react'

// const floatingVariants: Variants = {
//   animate: (custom: number) => ({
//     y: [0, -20, 0],
//     transition: {
//       duration: 3 + custom * 0.5,
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: custom * 0.3
//     }
//   })
// }

// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const mql = window.matchMedia('(max-width: 1024px)')
    
//     const handleChange = () => {
//       setIsMobile(mql.matches)
//     }
    
//     setIsMobile(mql.matches)
//     mql.addEventListener('change', handleChange)
    
//     return () => mql.removeEventListener('change', handleChange)
//   }, [])

//   return isMobile
// }

// const Invest: React.FC = () => {
//   const ref = useRef<HTMLElement | null>(null)
//   const isMobile = useIsMobile()

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   })

//   const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
//   const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

//   return (
//     <section
//       ref={ref}
//       className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-hidden"
//       style={{
//         backgroundImage: `url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg)`
//       }}
//     >
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-16'>
//         <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
//           {/* Content */}
//           <motion.div
//             style={isMobile ? { opacity: 1 } : {
//               x: xLeft,
//               opacity
//             }}
//             className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
//           >
//             <div>
//               <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
//                 Why You Need{' '}
//                 <span className="bg-blue-600 bg-clip-text text-transparent ">
//                   Affordable SEO Services
//                 </span>
//               </h3>
//               <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
//                 Build Your Online Presence Without Breaking Your Budget
//               </p>
//             </div>

//             <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
//               Affordable SEO services help small businesses compete online without draining resources. By focusing on essential optimization like keyword research, on-page improvements, and{' '}
//               <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
//                 local search visibility
//               </a>
//               , you get steady organic traffic that continues generating results long after the initial investment. Unlike expensive ad campaigns that stop when you stop paying, affordable SEO delivers sustainable growth.
//             </p>

//             {/* button */}
//             <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
//               <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
//                 <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
//                 <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             </div>
//           </motion.div>

//           {/* Image */}
//           <motion.div
//             style={isMobile ? { opacity: 1 } : {
//               x: xRight,
//               opacity
//             }}
//             className="w-full lg:w-1/2 flex justify-center relative"
//           >
//             <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg overflow-hidden">
//               <Image
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047473/agency-guy_nspqsz.png"
//                 alt="Digital marketing analytics dashboard showing online marketing performance"
//                 width={600}
//                 height={600}
//                 sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
//                 className="w-full h-auto object-contain"
//                 priority
//               />

//               {/* Floating Icons */}
//               <div className="absolute inset-0">
//                 {/* Google */}
//                 <motion.div
//                   animate={isMobile ? {} : {
//                     x: [0, 10, 0],
//                     y: [0, 10, 0]
//                   }}
//                   transition={isMobile ? {} : {
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-4 p-1 sm:p-2 lg:p-3"
//                 >
//                   <Image 
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png" 
//                     alt="Google" 
//                     width={80} 
//                     height={80}
//                     sizes="(max-width: 640px) 48px, (max-width: 1024px) 40px, 56px"
//                     className="w-12 h-12 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain" 
//                   />
//                 </motion.div>

//                 {/* Rank */}
//                 <motion.div
//                   custom={1}
//                   variants={floatingVariants}
//                   animate={isMobile ? undefined : "animate"}
//                   className="absolute -top-2 right-2 sm:top-0 sm:right-4 lg:top-0 lg:right-4"
//                 >
//                   <Image 
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_144/v1761047484/seo-rank_l7ekja.png" 
//                     alt="SEO Rank" 
//                     width={144} 
//                     height={144}
//                     sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
//                     className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain" 
//                   />
//                 </motion.div>

//                 {/* Competitor */}
//                 <motion.div
//                   custom={2}
//                   variants={floatingVariants}
//                   animate={isMobile ? undefined : "animate"}
//                   className="absolute bottom-4 left-2 sm:bottom-8 sm:left-4 lg:bottom-8 lg:left-4"
//                 >
//                   <Image 
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_144/v1761047474/competitor_co9leg.png" 
//                     alt="Competitor" 
//                     width={144} 
//                     height={144}
//                     sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
//                     className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain" 
//                   />
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Invest



'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: custom * 0.3
    }
  })
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    
    const handleChange = () => {
      setIsMobile(mql.matches)
    }
    
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)
    
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}

const Invest: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-x-hidden" // Prevent horizontal scroll
      style={{
        backgroundImage: `url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg)`
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-16'>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          {/* Content */}
          <motion.div
            style={isMobile ? { opacity: 1 } : {
              x: xLeft,
              opacity
            }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular break-words">
                Why You Need{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent ">
                  Affordable SEO Services
                </span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium break-words">
                Build Your Online Presence Without Breaking Your Budget
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Affordable SEO services help small businesses compete online without draining resources. By focusing on essential optimization like keyword research, on-page improvements, and{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
                local search visibility
              </a>
              , you get steady organic traffic that continues generating results long after the initial investment. Unlike expensive ad campaigns that stop when you stop paying, affordable SEO delivers sustainable growth.
            </p>

            {/* button */}
            <div className="pt-4 sm:pt-6 lg:pt-10 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={isMobile ? { opacity: 1 } : {
              x: xRight,
              opacity
            }}
            className="w-full lg:w-1/2 flex justify-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047473/agency-guy_nspqsz.png"
                alt="Digital marketing analytics dashboard showing online marketing performance"
                width={600}
                height={600}
                sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
                className="w-full h-auto object-contain"
                priority
              />

              {/* Floating Icons */}
              <div className="absolute inset-0">
                {/* Google */}
                <motion.div
                  animate={isMobile ? {} : {
                    x: [0, 10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={isMobile ? {} : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-4 p-1 sm:p-2 lg:p-3"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png" 
                    alt="Google" 
                    width={80} 
                    height={80}
                    sizes="(max-width: 640px) 48px, (max-width: 1024px) 40px, 56px"
                    className="w-12 h-12 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain" 
                  />
                </motion.div>

                {/* Rank */}
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate={isMobile ? undefined : "animate"}
                  className="absolute -top-2 right-2 sm:top-0 sm:right-4 lg:top-0 lg:right-4"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_144/v1761047484/seo-rank_l7ekja.png" 
                    alt="SEO Rank" 
                    width={144} 
                    height={144}
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain" 
                  />
                </motion.div>

                {/* Competitor */}
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate={isMobile ? undefined : "animate"}
                  className="absolute bottom-4 left-2 sm:bottom-8 sm:left-4 lg:bottom-8 lg:left-4"
                >
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_144/v1761047474/competitor_co9leg.png" 
                    alt="Competitor" 
                    width={144} 
                    height={144}
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain" 
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Invest
