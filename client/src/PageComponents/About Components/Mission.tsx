'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

const Mission = () => {
  return (
    <section className="w-full px-6 py-8 lg:py-8 ">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-700 bungee-inline-regular">
            Our <span className='text-blue-600'>Mission & Values</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a performance-driven digital marketing agency focused on growth,
            transparency, and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 montserrat">
              We build marketing systems that scale businesses
            </h3>

            <p className="text-gray-600 text-base leading-relaxed">
              As a results-focused digital marketing company, we help brands increase
              visibility, generate qualified leads, and convert traffic into revenue.
              Every strategy we create is backed by data, refined by experience,
              and optimized for long-term growth.
            </p>

            {/* Tabs */}
            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
                <TabsTrigger
                  value="mission"
                  className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                >
                  Mission
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                >
                  Vision
                </TabsTrigger>
                <TabsTrigger
                  value="value"
                  className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                >
                  Our Values
                </TabsTrigger>
              </TabsList>

              {/* Mission */}
              <TabsContent value="mission" className="mt-6 space-y-4">
                <p className="text-gray-600 text-base leading-relaxed">
                  Our mission is to help businesses grow through data-driven digital
                  marketing strategies that deliver real, measurable outcomes. We
                  focus on SEO, paid advertising, content marketing, and conversion
                  optimization to create predictable and scalable growth.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  We don’t believe in guesswork or shortcuts. Every campaign is built
                  with clear goals, transparent reporting, and continuous optimization.
                </p>
              </TabsContent>

              {/* Vision */}
              <TabsContent value="vision" className="mt-6">
                <p className="text-gray-600 text-base leading-relaxed">
                  Our vision is to become a trusted digital marketing partner for
                  ambitious brands worldwide, known for clarity, performance, and
                  strategies that stand the test of time.
                </p>
              </TabsContent>

              {/* Values */}
              <TabsContent value="value" className="mt-6">
                <p className="text-gray-600 text-base leading-relaxed">
                  We value transparency, accountability, and continuous improvement.
                  We believe strong partnerships are built on honest communication,
                  ethical marketing practices, and results our clients can measure
                  and trust.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-xl rounded-3xl py-0">
              <div className="relative h-[500px] w-full">
                <Image
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Digital marketing team working on growth strategy"
                  fill
                  className="object-cover "
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Mission
