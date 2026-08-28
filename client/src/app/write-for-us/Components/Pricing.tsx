'use client';

import React, { useState, useEffect } from 'react';

export default function MarketingGuestPostPricing() {
  const [price, setPrice] = useState<number>(25);

  useEffect(() => {
    fetch('/api/guest/pricing')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.price === 'number') setPrice(d.price);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Main Grid: 70% Left, 30% Right on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 sm:gap-10 lg:gap-16">
        
        {/* LEFT COLUMN (70%) */}
        <div>
          {/* Heading & Subtitle */}
          <h3 className="text-[32px] sm:text-4xl lg:text-5xl font-serif text-gray-900 leading-[1.2] sm:leading-tight mb-3 sm:mb-4 bungee-shade">
            Amplify your reach <br className="hidden sm:block" />
            with <span className="text-blue-700">editorial impact</span>
          </h3>
          <p className="text-lg sm:text-xl text-gray-800 mb-5 sm:mb-6">
            Publish your insights, capture high-intent readers
          </p>

          {/* Divider */}
          <hr className="border-gray-300 mb-6 sm:mb-8" />

          {/* Inner Grid: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Inner Left Column: Text + Image */}
            <div className="flex flex-col">
              <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
                Connect directly with growth leaders and decision-makers by contributing an expert <span className="font-bold">seo guest post</span> that builds real brand equity.
              </p>
              <div className="mt-auto">
                <img
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773337877/download_jibv47.jpg"
                  alt="Content creator writing marketing article"
                  className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Inner Right Column: Pricing Block */}
            <div className="flex flex-col justify-center items-center text-center md:border-l md:border-gray-200 p-4 sm:p-6 mt-4 md:mt-0 bg-blue-50/50 md:bg-transparent rounded-2xl md:rounded-none">
              <span className="text-xs uppercase tracking-widest font-bold text-blue-700 mb-1">
                Editorial Review Fee
              </span>
              <div className="flex items-baseline justify-center space-x-1 text-5xl sm:text-6xl font-serif text-gray-900 mb-2">
                <span className="text-3xl sm:text-4xl text-blue-600 font-bold">$</span>
                <span className="font-bold">{price % 1 === 0 ? price : price.toFixed(2)}</span>
                <span className="text-sm sm:text-base text-gray-500 font-sans font-medium">/ article</span>
              </div>
              <p className="text-[13px] sm:text-sm text-gray-700 font-medium leading-snug">
                One-time publication fee via Razorpay. <br className="hidden sm:block" />
                Instant live publishing & permanent DoFollow backlink.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="flex flex-col mt-4 lg:mt-0">
          {/* Text on top */}
          <p className="text-[15px] sm:text-base text-gray-800 mb-4 sm:mb-6 font-medium leading-relaxed">
            Position your brand with a high-impact <span className="font-bold">guest post for ads agency</span> strategies, CRO insights, and performance marketing frameworks.
          </p>
          
          {/* Image Below */}
          <div className="mt-auto h-full w-full">
            <img
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773338195/Vengan_a_m%C3%AD_todos_los_que_est%C3%A1n_cansados_y_agobiados_y_yo_les_dar%C3%A9_descanso_Pongan_mi_yugo_sobre_ustedes_y_aprendan_de_m%C3%AD_que_soy_sencillo_y_humilde_de_coraz%C3%B3n_As%C3%AD_encontrar%C3%A1n_descanso_para_su_esp%C3%ADritu_porq_nkdcix.jpg"
              alt="Marketing team collaborating on editorial content"
              className="w-full h-full min-h-[200px] sm:min-h-[300px] object-cover rounded-xl sm:rounded-2xl shadow-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
}