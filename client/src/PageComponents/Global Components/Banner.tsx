// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import { Phone } from 'lucide-react'

// const BannerBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,w_1920/v1761047473/banner-bg_vebtpx.png'

// const Banner: React.FC = () => {
//   return (
//     <section
//       className="relative w-full h-[120px] sm:h-[140px] lg:h-[160px] bg-cover bg-center overflow-visible"
//       style={{
//         backgroundImage: `url(${BannerBG})`,
//       }}
//     >
//       <div className="hidden sm:block absolute left-4 sm:left-8 lg:left-50 2xl:left-59 -top-8 sm:-top-12 lg:-top-15 h-[140px] sm:h-[180px] lg:h-[220px] w-auto z-30">
//         <Image 
//           src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_300/v1761047475/BannerGuy_cxrrbv.png" 
//           alt="Customer service representative" 
//           width={300}
//           height={220}
//           sizes="(max-width: 640px) 0px, (max-width: 1024px) 180px, 220px"
//           className="h-full w-auto object-contain" 
//         />
//       </div>

//       {/* Mobile Layout */}
//       <div className="sm:hidden relative z-10 h-full flex flex-col items-center justify-center gap-3 px-4">
//         <h2 className="text-white text-sm font-bold leading-tight text-center">
//           Need SEO Service for growing your Business? Just Call Us.
//         </h2>

//         <a href="tel:+919641861932" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
//           <div className="bg-white rounded-full p-2 shadow-md">
//             <Phone className="w-4 h-4 text-blue-600" />
//           </div>
//           <div className="text-white">
//             <p className="text-[9px] font-medium leading-tight">Call Us Anytime</p>
//             <p className="text-xs font-bold whitespace-nowrap leading-tight">+91 964 186 1932</p>
//           </div>
//         </a>
//       </div>

//       {/* Desktop Layout */}
//       <div className="hidden sm:block">
//         <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
//           <div className="text-center lg:text-center lg:mt-14 max-w-2xl">
//             <h2 className="text-white text-base md:text-lg lg:text-2xl font-bold leading-tight">
//               Need SEO Service for growing your
//               <br />
//               Business? Just Call Us.
//             </h2>
//           </div>
//         </div>

//         <a
//           href="tel:+919641861932"
//           className="absolute right-4 sm:right-8 lg:right-38 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 z-20 hover:opacity-90 transition-opacity cursor-pointer"
//         >
//           <div className="bg-white rounded-full p-2 sm:p-3 shadow-lg">
//             <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
//           </div>
//           <div className="text-white">
//             <p className="text-[10px] sm:text-xs font-medium mb-0.5">Call Us Anytime</p>
//             <p className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap">+91 964 186 1932</p>
//           </div>
//         </a>
//       </div>

//       {/* Hand Image - OPTIMIZED */}
//       <div className="absolute right-5 sm:right-4 lg:right-8 -bottom-2 w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 z-20">
//         <Image 
//           src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_112/v1761047482/hand_scbtao.png" 
//           alt="Hand pointing" 
//           width={112}
//           height={112}
//           sizes="(max-width: 640px) 56px, (max-width: 1024px) 80px, 112px"
//           className="w-full h-full object-contain" 
//         />
//       </div>
//     </section>
//   )
// }

// export default Banner



import React from 'react';
import { UserCircle, ShieldCheck, TrendingUp } from 'lucide-react'; // Placeholder icons
import Link from 'next/link';

const cardsData = [
  {
    icon: <UserCircle className="w-8 h-8 text-pink-500" />,
    title: "Customer Engagement",
    description: "easy to distinguish. in a free hour, when our power of choice is",
    isHighlighted: false,
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: "We provide 24 Hour Support",
    description: "will frequently occur that pleasures have to be repudiated and",
    isHighlighted: true,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    title: "Generate More Sale Easily",
    description: "will frequently occur that pleasures have to be repudiated and",
    isHighlighted: false,
  },
];

const BannerSection = () => {
  return (
    <section 
      className="bg-blue-600 py-16 px-4 sm:px-8 md:px-16 text-white overflow-hidden"
      style={{
        // Grainy texture achieved with an SVG noise pattern
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Section: Hero Text & Button */}
        <div className="flex-1 flex flex-col items-start gap-8">
          <h2 className="text-4xl sm:text-3xl md:text-4xl bungee-inline-regular">
            Build your best <br />product with us!
          </h2>
          <Link href="/contact" className="">
          <button className="bg-blue-400 text-white font-semibold py-3 px-8 rounded-4xl transition duration-300 hover:bg-yellow-500">
            Let's Talk
          </button>
          </Link>
        </div>

        {/* Right Section: Feature Cards */}
        <div className="flex-1 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center gap-6">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`flex-1 min-w-[300px] max-w-[380px] p-6 rounded-md flex flex-col items-start gap-4 transition duration-300 ${
                card.isHighlighted
                  ? 'bg-white text-gray-900 h-[300px] flex items-center justify-center -translate-y-4 md:h-[280px] md:-translate-y-0 lg:h-[300px] lg:-translate-y-4 shadow-xl'
                  : 'bg-transparent border border-white/30 text-white h-[260px]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1 bg-white rounded-md shadow-inner flex items-center justify-center`}>
                    {card.icon}
                </div>
              </div>
              <h3 className={`text-xl font-semibold leading-snug`}>
                {card.title}
              </h3>
              <p className={`text-sm ${
                  card.isHighlighted ? 'text-gray-700' : 'text-blue-100'
                } leading-relaxed max-w-[280px]`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;