'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import Image from 'next/image'

const OurStorySection = () => {
  return (
    <section className="w-full px-6 py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column */}
          <div className="flex gap-6">
            <div className="w-1 bg-blue-600 flex-shrink-0"></div>

            <div className="space-y-8 flex-1">
              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 bungee-inline-regular">
                  Our story
                </h2>

                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Your vision. Our strategy. Real results.  
                  We help brands <span className="text-gray-900 font-semibold">
                    get noticed, generate leads, and dominate search.
                  </span>
                </p>
              </div>

              {/* Main Image */}
              <Card className="overflow-hidden border-0 p-0 lg:mt-15 w-full">
                <div className="relative h-[350px] lg:h-[400px] w-full ">
                  <Image
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Digital marketing team working on strategy"
                    fill
                    className="object-cover "
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Two Small Images */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="overflow-hidden border-0 shadow-lg rounded-3xl relative w-full py-0">
                <div className="relative h-[200px] lg:h-[220px] w-full">
                  <Image
                    src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="SEO and analytics discussion"
                    fill
                    className="object-cover "
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Card>

              <Card className="overflow-hidden border-0 shadow-lg rounded-3xl relative w-full py-0">
                <div className="relative h-[200px] lg:h-[220px] w-full">
                  <Image
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Paid ads and growth strategy meeting"
                    fill
                    className="object-cover "
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Card>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                We started with one clear goal: build a performance-driven digital marketing agency
                that prioritizes measurable growth over vanity metrics. In an industry full of noise
                and empty promises, we focus on data, strategy, and execution that actually delivers
                results.
                <br></br><br></br>
                From SEO and paid advertising to conversion rate optimization and content strategy,
                everything we do is designed to attract the right audience, convert traffic into
                qualified leads, and drive sustainable, long-term growth for our clients.

              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-2 ">
                <div className="space-y-2">
                  <h3 className="text-3xl lg:text-4xl font-bold text-blue-600 bungee-inline-regular">320+</h3>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl lg:text-4xl font-bold text-blue-600 bungee-inline-regular">150+</h3>
                  <p className="text-sm text-gray-600">Active Clients</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl lg:text-4xl font-bold text-blue-600 bungee-inline-regular">29k+</h3>
                  <p className="text-sm text-gray-600">Keywords Ranked</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
