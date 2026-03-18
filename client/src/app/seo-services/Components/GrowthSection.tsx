import React from 'react';

export default function HealthcarePartnerSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Main Grid: 70% Left, 30% Right on large screens */}
      {/* Tightened the gap slightly for mobile so related content feels connected */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 sm:gap-10 lg:gap-16">
        
        {/* LEFT COLUMN (70%) */}
        <div>
          {/* Heading & Subtitle */}
          {/* FIXED: Scaled text-5xl down to text-[32px] for tiny screens to accommodate the wide bungee-shade font */}
          <h3 className="text-[32px] sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-[1.2] sm:leading-tight mb-3 sm:mb-4 bungee-shade">
            Your trusted partner <br className="hidden sm:block" />
            in <span className="text-blue-700">digital growth</span>
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 mb-5 sm:mb-6">
            Take control, make scaling your goal
          </p>

          {/* Divider */}
          <hr className="border-gray-300 mb-6 sm:mb-8" />

          {/* Inner Grid: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Inner Left Column: Text + Image */}
            <div className="flex flex-col">
              <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
                Caring for your business growth like our own, building a stronger foundation through effective <span className="font-bold">b2b saas seo</span>.
              </p>
              <div className="mt-auto">
                {/* Slightly reduced height on mobile so it doesn't hog the viewport */}
                <img
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773337877/download_jibv47.jpg"
                  alt="Professional at desk"
                  className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Inner Right Column: Updated Stat Block */}
            {/* FIXED: Reduced padding from p-6 to p-2 on mobile so the text isn't squeezed */}
            <div className="flex flex-col justify-center items-center text-center md:border-l md:border-gray-200 p-2 sm:p-6 mt-4 md:mt-0">
              <div className="flex items-center justify-center space-x-1 text-5xl sm:text-6xl font-serif text-[#2b301f] mb-3 sm:mb-4">
                <span>300</span>
                {/* Scaled the % circle down slightly for small screens */}
                <span className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full text-2xl sm:text-3xl font-serif italic text-center">
                  %
                </span>
              </div>
              <p className="text-[13px] sm:text-sm text-gray-800 font-medium">
                Average boost in organic <br className="hidden sm:block" />
                traffic within 6 months.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="flex flex-col mt-4 lg:mt-0">
          {/* Text on top */}
          <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
            Community-focused growth strategies tailored to your needs, specializing in complex architectures like <span className="font-bold">angularjs seo</span> close to home.
          </p>
          
          {/* Image Below */}
          <div className="mt-auto h-full w-full">
            {/* FIXED: Reduced min-h-[300px] to min-h-[200px] on mobile to save scroll fatigue */}
             <img
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773338195/Vengan_a_m%C3%AD_todos_los_que_est%C3%A1n_cansados_y_agobiados_y_yo_les_dar%C3%A9_descanso_Pongan_mi_yugo_sobre_ustedes_y_aprendan_de_m%C3%AD_que_soy_sencillo_y_humilde_de_coraz%C3%B3n_As%C3%AD_encontrar%C3%A1n_descanso_para_su_esp%C3%ADritu_porq_nkdcix.jpg"
              alt="Team collaborating"
              className="w-full h-full min-h-[200px] sm:min-h-[300px] object-cover rounded-xl sm:rounded-2xl shadow-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
}