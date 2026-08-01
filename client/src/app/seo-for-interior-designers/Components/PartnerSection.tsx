import React from 'react';

export default function InteriorDesignPartnerSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Main Grid: 70% Left, 30% Right on large screens */}
      {/* Tightened the gap slightly for mobile so related content feels connected */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 sm:gap-10 lg:gap-16">
        
        {/* LEFT COLUMN (70%) */}
        <div>
          {/* Heading & Subtitle */}
          <h3 className="text-[32px] sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-[1.2] sm:leading-tight mb-3 sm:mb-4 bungee-shade">
            Your trusted partner <br className="hidden sm:block" />
            in <span className="text-blue-700">design visibility</span>
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 mb-5 sm:mb-6">
            Elevate your aesthetics, attract high-end clients.
          </p>

          {/* Divider */}
          <hr className="border-gray-300 mb-6 sm:mb-8" />

          {/* Inner Grid: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Inner Left Column: Text + Image */}
            <div className="flex flex-col">
              <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
                Caring for your studio's growth like our own, building a stronger foundation through effective <span className="font-bold">interior design SEO</span>.
              </p>
              <div className="mt-auto">
                {/* Slightly reduced height on mobile so it doesn't hog the viewport */}
                <img
                  src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop"
                  alt="Interior designer reviewing material samples"
                  className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Inner Right Column: Updated Stat Block */}
            {/* Reduced padding from p-6 to p-2 on mobile so the text isn't squeezed */}
            <div className="flex flex-col justify-center items-center text-center md:border-l md:border-gray-200 p-2 sm:p-6 mt-4 md:mt-0">
              <div className="flex items-center justify-center space-x-1 text-5xl sm:text-6xl font-serif text-[#2b301f] mb-3 sm:mb-4">
                <span>300</span>
                {/* Scaled the % circle down slightly for small screens */}
                <span className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full text-2xl sm:text-3xl font-serif italic text-center">
                  %
                </span>
              </div>
              <p className="text-[13px] sm:text-sm text-gray-800 font-medium">
                Average boost in targeted <br className="hidden sm:block" />
                portfolio traffic within 6 months.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="flex flex-col mt-4 lg:mt-0">
          {/* Text on top */}
          <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
            Aesthetic-focused growth strategies tailored to your firm, specializing in visually-driven platforms and <span className="font-bold">portfolio optimization</span>.
          </p>
          
          {/* Image Below */}
          <div className="mt-auto h-full w-full">
            {/* Reduced min-h-[300px] to min-h-[200px] on mobile to save scroll fatigue */}
             <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
              alt="Beautifully designed modern interior space"
              className="w-full h-full min-h-[200px] sm:min-h-[300px] object-cover rounded-xl sm:rounded-2xl shadow-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
}