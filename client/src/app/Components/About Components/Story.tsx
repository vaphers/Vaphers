'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play } from 'lucide-react'
import Image from 'next/image'

const OurStorySection = () => {
  return (
    <section className="w-full px-6 py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div className="flex gap-6">
            {/* Vertical Black Bar */}
            <div className="w-1 bg-black flex-shrink-0"></div>
            
            {/* Content */}
            <div className="space-y-8 flex-1">
              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 bungee-inline-regular">Our story</h2>
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Your vision Our Expertise Your Success Get Noticed Generate{' '}
                  <span className="text-gray-900 font-semibold">Leads Dominate.</span>
                </p>
              </div>

              {/* Large Image Card */}
              <Card className="overflow-hidden border-0 py-0 w-full">
                <div className="relative object-cover h-[350px] lg:h-[400px] w-full shadow-lg rounded-3xl">
                  <Image
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Team collaboration"
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Images and Text */}
          <div className="space-y-8">
            {/* Two Small Images */}
            <div className="grid grid-cols-2 gap-4">
              {/* Conference Room Card */}
              <Card className="overflow-hidden border-0 shadow-lg rounded-3xl relative w-full py-0">
                <div className="relative h-[200px] lg:h-[220px] w-full">
                  <Image
                    src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Conference room"
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />

                </div>
              </Card>

              {/* Team Discussion Card */}
              <Card className="overflow-hidden border-0 shadow-lg rounded-3xl relative w-full py-0">
                <div className="relative h-[200px] lg:h-[220px] w-full">
                  <Image
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Team discussion"
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />

                </div>
              </Card>
            </div>

            {/* Description Text */}
            <div className="space-y-6">
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                Our story is a testament to the power of collaboration and resilience. Together, we have navigated challenges, celebrated milestones, and crafted a narrative of growth and achievement in the construction industry.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">10K+</h3>
                  <p className="text-sm text-gray-600">Completed Projects</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">15K+</h3>
                  <p className="text-sm text-gray-600">Satisfied Customers</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">48K+</h3>
                  <p className="text-sm text-gray-600">Years of Mastery</p>
                </div>
              </div>

              {/* Avatar Group and Watch Intro Button */}
              <div className="flex items-center gap-6 pt-4">
                {/* Avatar Group */}
                <div className="flex -space-x-3">
                  <Avatar className="border-2 border-white w-10 h-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white w-10 h-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white w-10 h-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                    <AvatarFallback>RL</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white w-10 h-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                </div>

                {/* Watch Intro Button */}
                <button className="flex items-center gap-3 text-gray-900 font-semibold hover:text-gray-700 transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors group">
                    <Play className="w-4 h-4 fill-gray-900 group-hover:fill-white" />
                  </div>
                  <span className="text-sm lg:text-base font-bold">WATCH INTRO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
