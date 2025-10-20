'use client'

import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="w-full">
      <div className="bg-white py-12 lg:py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-semibold text-gray-900 leading-tight font-sans max-w-7xl montserrat">
            We Help Your Businesses With Creative Idea
          </h1>
        </div>
      </div>

      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[400px]">
        <Image
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Business team meeting"
          fill
          className="object-cover object-center grayscale"
          priority
          sizes="100vw"
        />
      </div>
    </section>
  )
}

export default HeroSection
