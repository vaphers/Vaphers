'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const MetaAdsPromo: React.FC = () => {
  return (
    <section className="max-w-full lg:mx-3 lg:rounded-3xl bg-[#0f3064] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Image Left */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761549097/meta-ads-devices_mock.png"
                alt="Meta ads across Facebook, Instagram, Messenger, and WhatsApp"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />

              <motion.div
                animate={{ x: [-10, 10, -10], y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 right-4 sm:bottom-4 sm:right-0 lg:bottom-0 lg:right-0 z-10"
              >
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_316/v1761047482/hand_scbtao.png"
                  alt="Hand pointing to Meta ad placements"
                  width={200}
                  height={300}
                  className="w-24 h-36 sm:w-32 sm:h-48 lg:w-40 lg:h-60 object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-start text-gray-200 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
                Why Choose Vaphers for{' '}
                <span className="bg-blue-400 bg-clip-text text-transparent ">
                  Affordable Meta Ads Management?
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-center lg:text-start text-blue-200 font-medium">
                Performance-driven campaigns across Facebook, Instagram, Messenger & WhatsApp
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed text-center lg:text-left">
              At <span className="font-bold text-blue-300">Vaphers</span>, Meta ads are engineered for profitable scale—pairing Advantage+ automation with creative testing, broad-to-stacked audiences, and event-quality fixes like Pixel + Conversions API to lift delivery and ROAS. This approach unlocks efficient reach and conversion volume across feeds, Stories, Reels, and messaging surfaces where customers already spend time.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold mb-1">Advantage+ Scaling</p>
                <p className="text-blue-100 text-sm">
                  Lean into Advantage+ sales and placements for automated budget and delivery, then iterate creatives to compound wins over time.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold mb-1">Click‑to‑Message</p>
                <p className="text-blue-100 text-sm">
                  Drive high‑intent chats on Messenger, Instagram DM, or WhatsApp with click‑to‑message ads and fast reply flows to qualify and convert leads faster.
                </p>
              </div>

            </div>

            {/* Button */}
            <div className="pt-4 sm:pt-4 lg:pb-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <span className="mr-2 sm:mr-3">Launch Meta Ads with Vaphers</span>
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MetaAdsPromo
