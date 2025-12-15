'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const CTA = () => {
  const features = [
    { text: 'Data-driven SEO strategies' },
    { text: 'High-converting paid ad campaigns' },
    { text: 'Conversion rate optimization' },
    { text: 'Transparent performance reporting' },
  ]

  const additionalFeatures = [
    { text: 'Content marketing that builds authority' },
    { text: 'Audience and competitor research' },
    { text: 'Scalable growth strategies' },
    { text: 'Long-term ROI focused execution' },
  ]

  return (
    <section className="w-full px-6 py-6 lg:py-10">
      <div className="container mx-auto max-w-7xl">
        <Card className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            
            {/* Right Column - Image */}
            <div className="p-6 lg:p-8 flex items-center">
              <div className="relative w-full h-[300px] lg:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Digital marketing results and business growth"
                  fill
                  className="object-cover object-center "
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Left Column */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h4 className="text-3xl xl:text-4xl font-bold text-gray-800 mb-8 leading-tight bungee-inline-regular">
                Grow your business with digital marketing that works
              </h4>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-900 text-base font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {additionalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-900 text-base font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                <Button className="bg-blue-600 text-white hover:bg-blue-800 rounded-full px-8 py-6 text-base font-semibold cursor-pointer">
                  Get a Free Strategy Call
                </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-2 border-blue-300 text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold cursor-pointer"
                >
                  Explore More
                </Button>
                </Link>
              </div>
            </div>


          </div>
        </Card>
      </div>
    </section>
  )
}

export default CTA
