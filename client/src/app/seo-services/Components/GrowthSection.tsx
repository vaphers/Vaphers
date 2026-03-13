import React from 'react';

export default function HealthcarePartnerSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans">
      {/* Main Grid: 70% Left, 30% Right on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-10 lg:gap-16">
        
        {/* LEFT COLUMN (70%) */}
        <div>
          {/* Heading & Subtitle */}
          <h3 className="text-5xl lg:text-5xl font-serif text-gray-900 leading-tight mb-4 bungee-shade">
            Your trusted partner <br className="hidden sm:block" />
            in <span className="text-blue-700 ">digital growth</span>
          </h3>
          <p className="text-xl text-gray-800 mb-6">
            Take control, make scaling your goal
          </p>

          {/* Divider */}
          <hr className="border-gray-300 mb-8" />

          {/* Inner Grid: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Inner Left Column: Text + Image */}
            <div className="flex flex-col">
              <p className="text-gray-800 mb-6 font-medium leading-relaxed">
                Caring for your business growth like our own, building a stronger foundation through effective <span className="font-bold">b2b saas seo</span>.
              </p>
              <div className="mt-auto">
                <img
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773337877/download_jibv47.jpg"
                  alt="Professional at desk"
                  className="w-full h-48 object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Inner Right Column: Updated Stat Block */}
            <div className="flex flex-col justify-center items-center text-center md:border-l md:border-gray-200 p-6">
              <div className="flex items-center justify-center space-x-1 text-6xl font-serif text-[#2b301f] mb-4">
                <span>300</span>
                <span className="relative inline-flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full text-3xl font-serif italic text-center">
                  %
                </span>
              </div>
              <p className="text-sm text-gray-800 font-medium">
                Average boost in organic <br />
                traffic within 6 months.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="flex flex-col">
          {/* Text on top */}
          <p className="text-gray-800 mb-6 font-medium leading-relaxed">
            Community-focused growth strategies tailored to your needs, specializing in complex architectures like <span className="font-bold">angularjs seo</span> close to home.
          </p>
          
          {/* Image Below */}
          <div className="mt-auto h-full w-full">
             <img
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773338195/Vengan_a_m%C3%AD_todos_los_que_est%C3%A1n_cansados_y_agobiados_y_yo_les_dar%C3%A9_descanso_Pongan_mi_yugo_sobre_ustedes_y_aprendan_de_m%C3%AD_que_soy_sencillo_y_humilde_de_coraz%C3%B3n_As%C3%AD_encontrar%C3%A1n_descanso_para_su_esp%C3%ADritu_porq_nkdcix.jpg"
              alt="Team collaborating"
              className="w-full h-full min-h-[300px] object-cover rounded-2xl shadow-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
}