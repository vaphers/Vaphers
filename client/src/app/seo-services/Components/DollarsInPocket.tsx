import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DollarsInPocket() {
  return (
    <section className="bg-gradient-to-r from-sky-50 via-gray-50 to-white py-20 px-6 md:px-12 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap- lg:gap- items-center">
        
        {/* Left Section: Image Composition */}
        <div className="relative w-full max-w-[500px] mx-auto lg:ml-0 lg:mr-auto">
          {/* Main Background Image */}
          <div className="rounded-3xl overflow-hidden aspect-[4/5] relative w-full shadow-lg">
            <img 
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773246494/unwatermarked_Gemini_Generated_Image_pxvm2dpxvm2dpxvm_aam8kz.png" 
              alt="Main Feature" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Floating Middle-Right Card */}
          <div className="absolute top-1/2 -right-12 lg:-right-24 transform -translate-y-1/2 bg-white p-3.5 rounded-2xl shadow-xl w-[260px] z-10">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-4">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772621191/Frame_81_kluj3q.png" 
                alt="Secondary Feature" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm cursor-pointer hover:bg-white transition-colors">
                <ArrowUpRight className="w-4 h-4 text-gray-700" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 text-[15px] mb-1.5 leading-tight">
              Strategic Roadmaps
            </h4>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Every campaign we curate is a masterpiece, crafted with precision to reflect your unique goals.
            </p>
          </div>
        </div>

        {/* Right Section: Content & Grid */}
      <div className="flex flex-col justify-center mt-12 lg:mt-0">
        
        {/* Top Half: Heading & Text */}
        <div className="mb-1 lg:pl-12">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 leading-[1.15] bungee-shade">
            SEO that brings <span className='text-blue-700'>dollars in your pocket!</span>
          </h2>
          <p className="text-gray-600 text-[17px] leading-relaxed">
            We believe that your digital presence should be a powerful growth engine. Through tailored organic seo services, we help brands build lasting visibility. As a specialized b2b saas seo agency, our commitment to high-performance strategies and seamless execution ensures that every click translates into tangible results, especially when capturing high-intent audiences in the US market.
          </p>
        </div>

        {/* Bottom Half: Proportional Grid */}
        {/* Switched to a 12-col grid to give the image boxes more width */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end lg:pl-12">
          
          {/* Part 1: Stats */}
          <div className="sm:col-span-3 flex flex-col justify-end pb-3">
            <span className="text-6xl font-medium text-gray-900 mb-2 tracking-tighter">97%</span>
            <span className="text-gray-500 text-[14px] leading-snug">
              More leads <br /> that convert
            </span>
          </div>

          {/* Part 2: Small Image Box */}
          {/* Removed padding to make the image cover the top flush with the borders */}
          <div className="sm:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 border-gray-300 overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-gray-50 w-full">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767602634/ChatGPT_Shopping_lbdifj.png" 
                alt="ChatGPT Shopping" 
                className="w-full h-full object-cover" 
              />
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="absolute inset-0">
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm cursor-pointer hover:bg-white transition-colors hover:scale-110 transition duration-600  border border-gray-900">
                <ArrowUpRight className="w-5 h-5 text-gray-700 " />
              </div>
              </Link>
            </div>
            <div className="p-3">
              <p className="text-[13px] font-medium text-gray-800">AI Commerce Optimization</p>
            </div>
          </div>

          {/* Part 3: Slightly Bigger Image Box */}
          {/* Takes up the most columns (5) for maximum image visibility */}
          <div className="sm:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:-translate-y-0">
            <div className="relative aspect-[4/3] bg-gray-50 w-full">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png" 
                alt="Ecommerce SEO" 
                className="w-full h-full object-cover" 
              />
              <Link href="https://www.vaphers.com/seo-services/ecommerce-seo" className="absolute inset-0">
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm cursor-pointer hover:bg-white transition-colors hover:scale-110 transition duration-600  border border-gray-900">
                <ArrowUpRight className="w-5 h-5 text-gray-700 " />
              </div>
              </Link>
            </div>
            <div className="p-3.5">
              <p className="text-[14px] font-medium text-gray-800">Boost your online store with organic marketing</p>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}