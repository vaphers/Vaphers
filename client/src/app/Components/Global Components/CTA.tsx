'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Image from 'next/image'

const CTA = () => {
  const features = [
    { text: 'Easy-to-use components' },
    { text: 'Responsive design' },
    { text: 'Comprehensive documentation' },
    { text: 'Regular updates and improvements' },
  ]

  const additionalFeatures = [
    { text: 'Theming options for customization' },
    { text: 'Cross-browser compatibility' },
    { text: 'Accessibility compliance' },
    { text: 'Performance optimization' },
  ]

  return (
    <section className="w-full px-6 py-6 lg:py-10">
      <div className="container mx-auto max-w-7xl">
        <Card className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h4 className="text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-8 leading-tight bungee-inline-regular">
                Are you ready to enhance your user interface
              </h4>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {/* Left Column */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-900 text-base font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {additionalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center mt-0.5">
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
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base font-semibold">
                  Explore Components
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-gray-300 text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold"
                >
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="p-6 lg:p-8 flex items-center">
              <div className="relative w-full h-[300px] lg:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Happy user"
                  fill
                  className="object-cover object-center grayscale"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default CTA
