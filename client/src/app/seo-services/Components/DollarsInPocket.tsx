import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function DollarsInPocket() {
  return (
    <section className="bg-gradient-to-r from-sky-50 via-gray-50 to-white py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-8 overflow-hidden">
      {/* FIXED: Filled in the missing gap values (gap-12 lg:gap-16) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Section: Image Composition */}
        {/* FIXED: Added pr-12 sm:pr-16 lg:pr-0. This creates a "safe zone" on mobile so the absolute card has room to float on the right without blowing out the screen width. */}
        <div className="relative w-full max-w-[450px] lg:max-w-[500px] mx-auto lg:ml-0 lg:mr-auto pr-10 sm:pr-16 lg:pr-0">
          
          {/* Main Background Image */}
          <div className="rounded-3xl overflow-hidden aspect-[4/5] relative w-full shadow-lg">
            <img 
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773246494/unwatermarked_Gemini_Generated_Image_pxvm2dpxvm2dpxvm_aam8kz.png" 
              alt="Main Feature" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Floating Middle-Right Card */}
          {/* FIXED: Scaled down width for mobile (w-[200px]), normal on desktop (lg:w-[260px]). 
              Adjusted the -right placement to sit inside the new padding safe zone. */}
          <div className="absolute top-1/2 -right-2 sm:-right-4 lg:-right-24 transform -translate-y-1/2 bg-white p-2.5 sm:p-3.5 rounded-2xl shadow-xl w-[200px] sm:w-[240px] lg:w-[260px] z-10">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 sm:mb-4">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1772621191/Frame_81_kluj3q.png" 
                alt="Secondary Feature" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1 sm:p-1.5 shadow-sm cursor-pointer hover:bg-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
              </div>
            </div>
            {/* Fluid typography for the floating card to match its dynamic width */}
            <h4 className="font-semibold text-gray-900 text-[13px] sm:text-[15px] mb-1 sm:mb-1.5 leading-tight">
              Strategic Roadmaps
            </h4>
            <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed">
              Every campaign we curate is a masterpiece, crafted with precision to reflect your unique goals.
            </p>
          </div>
        </div>

        {/* Right Section: Content & Grid */}
        <div className="flex flex-col justify-center mt-6 lg:mt-0">
          
          {/* Top Half: Heading & Text */}
          <div className="mb-8 lg:mb-10 lg:pl-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 leading-[1.2] lg:leading-[1.15] bungee-shade">
              SEO that brings <br className="hidden lg:block"/> <span className='text-blue-700'>dollars in your pocket!</span>
            </h2>
            <p className="text-gray-600 text-[15px] sm:text-[17px] leading-relaxed">
              We believe that your digital presence should be a powerful growth engine. Through tailored organic seo services, we help brands build lasting visibility. As a specialized b2b saas seo agency, our commitment to high-performance strategies and seamless execution ensures that every click translates into tangible results, especially when capturing high-intent audiences in the US market.
            </p>
          </div>

          {/* Bottom Half: Proportional Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-end lg:pl-12">
            
            {/* Part 1: Stats */}
            {/* Added standard bottom padding so it aligns with the image cards nicely on mobile stacking */}
            <div className="sm:col-span-3 flex flex-row sm:flex-col items-center sm:items-start justify-start sm:justify-end gap-4 sm:gap-0 pb-0 sm:pb-3">
              <span className="text-5xl sm:text-6xl font-medium text-gray-900 sm:mb-2 tracking-tighter">97%</span>
              <span className="text-gray-500 text-[13px] sm:text-[14px] leading-snug">
                More leads <br className="hidden sm:block" /> that convert
              </span>
            </div>

            {/* Part 2: Small Image Box */}
            <div className="sm:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative group">
              <div className="relative aspect-video sm:aspect-square md:aspect-video bg-gray-50 w-full overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767602634/ChatGPT_Shopping_lbdifj.png" 
                  alt="ChatGPT Shopping" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="absolute inset-0 z-10">
                  <span className="sr-only">AI Commerce Optimization</span>
                </Link>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm z-20 transition-all duration-300 group-hover:bg-white group-hover:scale-110 border border-gray-200 pointer-events-none">
                  <ArrowUpRight className="w-4 h-4 text-gray-700" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-[13px] font-medium text-gray-800">AI Commerce Optimization</p>
              </div>
            </div>

            {/* Part 3: Slightly Bigger Image Box */}
            <div className="sm:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative group">
              <div className="relative aspect-video sm:aspect-[4/3] bg-gray-50 w-full overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png" 
                  alt="Ecommerce SEO" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <Link href="https://www.vaphers.com/seo-services/ecommerce-seo" className="absolute inset-0 z-10">
                  <span className="sr-only">Ecommerce SEO</span>
                </Link>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm z-20 transition-all duration-300 group-hover:bg-white group-hover:scale-110 border border-gray-200 pointer-events-none">
                  <ArrowUpRight className="w-4 h-4 text-gray-700" />
                </div>
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