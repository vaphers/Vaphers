'use client'

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

const Mission = () => {
  const teamMembers = [
    { name: 'Phillip George', avatar: 'https://i.pravatar.cc/150?img=11' },
    { name: 'Jaylon Donin', avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Tiana Curtis', avatar: 'https://i.pravatar.cc/150?img=13' },
  ]

  return (
    <section className="w-full px-6 py-8 lg:py-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 bungee-inline-regular">
            Our Mission & Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We operate with integrity, innovation, and a relentless commitment to delivering superior results.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h3 className="text-2xl lg:text-4xl font-sans font-bold text-gray-900 montserrat">
              We help in creating Educational Resources
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              We understand the significance of quality educational materials in the learning process and take our role in supporting educators seriously. We are committed to providing our users with the best possible resources and support.
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
                  Our Value
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mission" className="mt-6 space-y-4">
                <p className="text-gray-600 text-base leading-relaxed">
                  Educational resources are essential for effective teaching, but creating them can be challenging and time-consuming. Educators often spend countless hours developing lesson plans, activities, and assessments. This process can be overwhelming and divert a teacher's attention from engaging with their students.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our team of educational experts is always available to answer questions, offer guidance, and assist our users in enhancing their teaching methods.
                </p>
              </TabsContent>

              <TabsContent value="vision" className="mt-6">
                <p className="text-gray-600 text-base leading-relaxed">
                  Our vision is to empower educators worldwide with innovative tools and resources that transform the learning experience. Educational resources are essential for effective teaching, but creating them can be challenging and time-consuming.
                </p>
              </TabsContent>

              <TabsContent value="value" className="mt-6">
                <p className="text-gray-600 text-base leading-relaxed">
                  We value integrity, innovation, collaboration, and excellence in everything we do. Educational resources are essential for effective teaching, but creating them can be challenging and time-consuming. Educators often spend countless hours developing lesson plans.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Image  */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-xl rounded-3xl py-0">
              <div className="relative h-[500px] w-full">
                <Image
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team member"
                  fill
                  className="object-cover grayscale"
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
