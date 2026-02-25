'use client'

import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-blue-600 text-white"
          style={{
            boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.3)'
          }}
        >

          {/* Background Rings */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className="
                absolute 
                top-1/2 
                right-[-20%] 
                sm:right-[-10%] 
                lg:right-0 
                translate-y-[-50%] 
                h-[120%] 
                sm:h-[150%] 
                w-auto 
                text-blue-500/40 
                mix-blend-screen
              "
              viewBox="0 0 550 550"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="275" cy="275" r="275" fill="currentColor" fillOpacity="0.4" />
              <circle cx="275" cy="275" r="215" fill="currentColor" fillOpacity="0.6" />
              <circle cx="275" cy="275" r="155" fill="currentColor" fillOpacity="0.8" />
              <circle cx="275" cy="275" r="95" fill="#FFFFFF" fillOpacity="0.2" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-14 sm:py-20 flex flex-col items-start max-w-full lg:max-w-2xl">

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 tracking-tight font-semibold">
              Let’s Grow Your Business Together.
            </h2>

            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-10 sm:mb-12 leading-relaxed max-w-xl">
              Your marketing should work for you, not the other way around.
              We build data-driven growth systems that scale revenue.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

              {/* Button 1 */}
              <button className="
                group 
                bg-black 
                hover:bg-gray-900 
                text-white 
                h-14 sm:h-16
                w-full sm:w-auto
                rounded-full 
                px-6 sm:pl-8 sm:pr-2
                flex 
                items-center 
                justify-between 
                gap-6 
                transition-all 
                duration-300 
                shadow-md 
                hover:shadow-lg 
                hover:-translate-y-1
                cursor-pointer
              ">
                <span className="text-base sm:text-lg font-bold tracking-wide">
                  Book a Strategy Call
                </span>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform" />
              </button>

              {/* Button 2 */}
              <Link href="https://www.vaphers.com/seo-services" className="w-full sm:w-auto">
                <div className="
                  group 
                  bg-black 
                  hover:bg-gray-900 
                  text-white 
                  h-14 sm:h-16
                  w-full sm:w-auto
                  rounded-full 
                  px-6 sm:pl-8 sm:pr-2
                  flex 
                  items-center 
                  justify-between 
                  gap-6 
                  transition-all 
                  duration-300 
                  shadow-md 
                  hover:shadow-lg 
                  hover:-translate-y-1
                  cursor-pointer
                ">
                  <span className="text-base sm:text-lg font-bold tracking-wide">
                    Explore More
                  </span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform" />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA