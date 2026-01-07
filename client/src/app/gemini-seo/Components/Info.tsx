import React from 'react'
import Link from 'next/link'
import {TrendingUp } from 'lucide-react'

const GeminiSEOFeatures: React.FC = () => {
  return (
    <div className="w-full bg-white py-16 px-6 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1761047483/PatternBG_kv4ubo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10 lg:pb-10">
        
        {/* first section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 bungee-inline-regular">
              Get Featured in <span className="text-blue-600">Gemini</span>
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                The way people search has fundamentally changed. Businesses today cannot have a sound SEO strategy without taking LLMs into consideration. With an increasing number of users now relying on AI assistants (like Gemini) to decide what to buy, if you're not optimized for it, you're invisible.
              </p>
              
              <p>
                Gemini doesn't crawl links randomly. It generates answers by synthesizing optimized copy from authoritative sources. When a user asks Gemini for recommendations, the LLM considers a host of factors that traditional SEO doesn't cover.
              </p>
              
              <p>
                If your SEO strategy is built exclusively for a ten-blue-links world, you're missing a whole universe of opportunity.
              </p>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source 
                src="https://res.cloudinary.com/dbwrnwa3l/video/upload/v1767780991/2f3ba2e71a4259d3268a4c1d43d2e6bd0ed71cd4_eofo6p.mp4" 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* second section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 order-2 lg:order-1">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source 
                src="https://res.cloudinary.com/dbwrnwa3l/video/upload/v1767781110/bc7d5bb3d50126eaf3647041686da57d85e990ec_dcgnas.mp4" 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 bungee-inline-regular">
              Vaphers <span className="text-blue-600">Gemini SEO</span> Service
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Our team has refined technical SEO, link building, and content strategies to position your brand as a trustworthy source that Gemini can use. We have the creative foresight to implement our knowledge of how to rank in Gemini and optimize your entire digital presence.
              </p>
              
              <p>
                With Vaphers' Gemini SEO services, whenever a user types in a relevant query, your business can be featured as a top-recommended answer. That's a solid source of traffic secured at the very beginning of the customer journey.
              </p>
            </div>
            
            <div className="pt-4">
                <Link href="/contact" passHref>
                    <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <span className="mr-3">Get Free Consultation</span>
                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GeminiSEOFeatures
