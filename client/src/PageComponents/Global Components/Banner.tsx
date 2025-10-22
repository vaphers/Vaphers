'use client'

import React from 'react'
import { Phone } from 'lucide-react'

const BannerBG = 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047473/banner-bg_vebtpx.png'

const Banner: React.FC = () => {
  return (
    <section
      className="relative w-full h-[120px] sm:h-[140px] lg:h-[160px] bg-cover bg-center overflow-visible"
      style={{
        backgroundImage: `url(${BannerBG})`,
      }}
    >
      <div className="hidden sm:block absolute left-4 sm:left-8 lg:left-55 -top-8 sm:-top-12 lg:-top-15 h-[140px] sm:h-[180px] lg:h-[220px] w-auto z-30">
        <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/BannerGuy_cxrrbv.png" alt="Customer service representative" className="h-full w-auto object-contain" />
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden relative z-10 h-full flex flex-col items-center justify-center gap-3 px-4">
        <h2 className="text-white text-sm font-bold leading-tight text-center">
          Need SEO Service for growing your Business? Just Call Us.
        </h2>

        <a href="tel:+919641861932" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="bg-white rounded-full p-2 shadow-md">
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-white">
            <p className="text-[9px] font-medium leading-tight">Call Us Anytime</p>
            <p className="text-xs font-bold whitespace-nowrap leading-tight">+91 964 186 1932</p>
          </div>
        </a>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-center lg:mt-14 max-w-2xl">
            <h2 className="text-white text-base md:text-lg lg:text-2xl font-bold leading-tight">
              Need SEO Service for growing your
              <br />
              Business? Just Call Us.
            </h2>
          </div>
        </div>

        <a
          href="tel:+919641861932"
          className="absolute right-4 sm:right-8 lg:right-38 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 z-20 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="bg-white rounded-full p-2 sm:p-3 shadow-lg">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
          </div>
          <div className="text-white">
            <p className="text-[10px] sm:text-xs font-medium mb-0.5">Call Us Anytime</p>
            <p className="text-sm sm:text-base lg:text-lg font-bold whitespace-nowrap">+91 964 186 1932</p>
          </div>
        </a>
      </div>

      {/* Hand Image */}
      <div className="absolute right-5 sm:right-4 lg:right-8 -bottom-2 w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 z-20">
        <img src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047482/hand_scbtao.png" alt="Hand pointing" className="w-full h-full object-contain" />
      </div>
    </section>
  )
}

export default Banner
