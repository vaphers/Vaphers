// 'use client'

// import React, { useRef, useState, useEffect } from 'react'
// import Image from 'next/image'
// import { motion, useScroll, useTransform, Variants } from 'framer-motion'
// import { TrendingUp } from 'lucide-react'

// const PatternBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg'

// const floatingVariants: Variants = {
//   animate: (custom: number) => ({
//     y: [0, -20, 0],
//     transition: {
//       duration: 4 + custom * 0.7,
//       repeat: Infinity,
//       ease: 'easeInOut',
//       delay: custom * 0.4,
//     },
//   }),
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

// const DMvalue: React.FC = () => {
//   const ref = useRef<HTMLElement | null>(null)
//   const isMobile = useIsMobile()

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start end', 'end start'],
//   })

//   const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
//   const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

//   return (
//     <section
//       ref={ref}
//       className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-hidden"
//       style={{
//         backgroundImage: `url(${PatternBG})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-0">
//         <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
//           <motion.div
//             style={isMobile ? { opacity: 1 } : {
//               x: xLeft,
//               opacity,
//             }}
//             className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
//           >
//             <div>
//               <h3 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular">
//                 How Digital Marketing
//                 <span className="bg-blue-600 bg-clip-text text-transparent"> Generate More Leads?</span>{' '}
//               </h3>
//               <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium">
//                 Turn Online Visitors Into Qualified Leads for Your Business
//               </p>
//             </div>

//             <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
//               Digital marketing generates more leads by targeting potential customers where they actively search for solutions. Through strategic SEO, your business appears at the top of search results when prospects need your services. Combined with{' '}
//               <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
//                 compelling content and targeted paid ads
//               </a>
//               , you attract high-quality leads already interested in what you offer, significantly increasing conversion rates.
//             </p>

//             <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left">
//               Effective lead generation strategies use personalized email campaigns, social media engagement, and landing pages optimized for conversions. By capturing visitor information through valuable offers and nurturing these prospects with relevant content, businesses transform anonymous website visitors into{' '}
//               <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
//                 qualified leads ready to purchase
//               </a>
//               , creating a predictable pipeline of potential customers.
//             </p>

//             {/* button */}
//             <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
//               <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
//                 <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
//                 <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             style={isMobile ? { opacity: 1 } : {
//               x: xRight,
//               opacity,
//             }}
//             className="w-full lg:w-1/2 flex justify-center relative"
//           >
//             <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none overflow-hidden">
//               <Image 
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047475/girl-laptop_kwggux.png"
//                 alt="Digital marketing analytics dashboard showing online marketing performance" 
//                 width={600}
//                 height={600}
//                 sizes="(max-width: 640px) 384px, (max-width: 768px) 448px, 600px"
//                 className="w-full h-auto object-contain"
//                 priority
//               />

//               <div className="absolute inset-0">
//                 <motion.div
//                   animate={isMobile ? {} : {
//                     x: [0, 10, 0],
//                     y: [0, 10, 0],
//                   }}
//                   transition={isMobile ? {} : {
//                     duration: 5,
//                     repeat: Infinity,
//                     ease: 'easeInOut',
//                   }}
//                   className="absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-18 lg:left-4 p-1 sm:p-2 lg:p-3"
//                 >
//                   <Image 
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png"
//                     alt="Google" 
//                     width={80} 
//                     height={80}
//                     sizes="(max-width: 640px) 48px, (max-width: 1024px) 40px, 80px"
//                     className="w-12 h-12 sm:w-10 sm:h-10 lg:w-20 lg:h-20 object-contain" 
//                   />
//                 </motion.div>

//                 <motion.div 
//                   custom={1} 
//                   variants={floatingVariants} 
//                   animate={isMobile ? undefined : "animate"}
//                   className="absolute -top-2 right-1 sm:top-0 sm:right-2 lg:top-10 lg:right-4"
//                 >
//                   <Image 
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047484/seo-rank_l7ekja.png" 
//                     alt="SEO Rank" 
//                     width={176} 
//                     height={176}
//                     sizes="(max-width: 1024px) 112px, 176px"
//                     className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
//                   />
//                 </motion.div>

//                 <motion.div 
//                   custom={2} 
//                   variants={floatingVariants} 
//                   animate={isMobile ? undefined : "animate"}
//                   className="absolute bottom-4 left-1 sm:bottom-8 sm:left-2 lg:bottom-40 lg:left-4"
//                 >
//                   <Image 
//                     src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png"
//                     alt="Competitor" 
//                     width={176} 
//                     height={176}
//                     sizes="(max-width: 1024px) 112px, 176px"
//                     className="w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44 object-contain" 
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

// export default DMvalue
'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const PatternBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg'

const floatingVariants: Variants = {
  animate: (custom: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 4 + custom * 0.7,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.4,
    },
  }),
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')
    const handleChange = () => setIsMobile(mql.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])
  return isMobile
}

const DMvalue: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xLeft = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="max-w-full bg-white bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: `url(${PatternBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-12">
          <motion.div
            style={isMobile ? { opacity: 1 } : { x: xLeft, opacity }}
            className="w-full lg:w-2/3 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-3xl md:text-3xl lg:text-5xl text-center lg:text-start font-sans text-gray-700 mb-4 bungee-inline-regular break-words">
                How Digital Marketing
                <span className="bg-blue-600 bg-clip-text text-transparent"> Generate More Leads?</span>{' '}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-600 font-medium break-words">
                Turn Online Visitors Into Qualified Leads for Your Business
              </p>
            </div>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Digital marketing generates more leads by targeting potential customers where they actively search for solutions. Through strategic SEO, your business appears at the top of search results when prospects need your services. Combined with{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
                compelling content and targeted paid ads
              </a>
              , you attract high-quality leads already interested in what you offer, significantly increasing conversion rates.
            </p>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed text-center lg:text-left break-words">
              Effective lead generation strategies use personalized email campaigns, social media engagement, and landing pages optimized for conversions. By capturing visitor information through valuable offers and nurturing these prospects with relevant content, businesses transform anonymous website visitors into{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800 font-medium">
                qualified leads ready to purchase
              </a>
              , creating a predictable pipeline of potential customers.
            </p>
            <div className="pt-4 sm:pt-6 lg:pt-5 pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Ready to Get Started?</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
          {/* Right image and icons */}
          <motion.div
            style={isMobile ? { opacity: 1 } : { x: xRight, opacity }}
            className="w-full lg:w-1/2 flex justify-center items-center relative"
          >
            <div className="relative mx-auto max-w-xs sm:max-w-md lg:max-w-none">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761047475/girl-laptop_kwggux.png"
                alt="Digital marketing analytics dashboard showing online marketing performance"
                width={600}
                height={600}
                sizes="(max-width: 640px) 256px, (max-width: 768px) 384px, 600px"
                className="w-full h-auto object-contain"
                priority
              />
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={isMobile ? {} : { x: [0, 10, 0], y: [0, 10, 0] }}
                  transition={isMobile ? {} : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-4"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_80/v1761047482/google_jze9mq.png"
                    alt="Google"
                    width={48}
                    height={48}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 object-contain"
                  />
                </motion.div>
                <motion.div
                  custom={1}
                  variants={floatingVariants}
                  animate={isMobile ? {} : 'animate'}
                  className="absolute top-1 right-2 sm:top-2 sm:right-4 lg:top-10 lg:right-4"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047484/seo-rank_l7ekja.png"
                    alt="SEO Rank"
                    width={96}
                    height={96}
                    className="w-16 h-16 sm:w-24 sm:h-24 lg:w-44 lg:h-44 object-contain"
                  />
                </motion.div>
                <motion.div
                  custom={2}
                  variants={floatingVariants}
                  animate={isMobile ? {} : 'animate'}
                  className="absolute bottom-2 left-2 sm:bottom-8 sm:left-4 lg:bottom-40 lg:left-4"
                >
                  <Image
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_176/v1761047474/competitor_co9leg.png"
                    alt="Competitor"
                    width={96}
                    height={96}
                    className="w-16 h-16 sm:w-24 sm:h-24 lg:w-44 lg:h-44 object-contain"
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

export default DMvalue
