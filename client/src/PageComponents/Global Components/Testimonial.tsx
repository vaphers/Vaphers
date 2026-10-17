'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export default function SocialProofSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-white overflow-hidden border-b border-black/10">
      {/* 90% Max-Width Container strictly per user request */}
      <div className="w-[90%] max-w-[90%] mx-auto">
        
        {/* Top Header / Context strictly in site font theme */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl montserrat-medium tracking-tight text-gray-950">
            Trusted By Premier <span className="text-blue-600">Interior Designer & Studios</span>
          </h2>
          <p className="montserrat-regular text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto mt-3">
            Real feedback and measurable results from design firms scaling high-ticket residential and commercial projects.
          </p>
        </div>

        {/* 5-Column by 2-Row Checkerboard Grid matching reference screenshot */}
        <div className="w-full overflow-x-auto scrollbar-none pb-4 pt-6">
          <div className="grid grid-cols-5 gap-4 lg:gap-5 xl:gap-6 min-w-[1100px] xl:min-w-0">
            
            {/* ================= ROW 1 ================= */}
            
            {/* 1. Accent Title Card (Royal Blue with Rotated "Real feedback.") */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden bg-blue-600 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              {/* Site Signature Brand Logo Top-Left */}
              <div className="flex items-center">
                <span className="bungee-shade text-3xl sm:text-4xl tracking-normal text-white drop-shadow-sm">
                  vaphers
                </span>
              </div>

              {/* Rotated "Real feedback." text matching exact angle & position from reference image */}
              <div className="absolute left-6 bottom-6 pointer-events-none">
                <div className="-rotate-90 origin-bottom-left translate-x-20 sm:translate-x-24 lg:translate-x-28">
                  <div className="montserrat-bold text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] text-white leading-[0.92] tracking-tighter whitespace-nowrap">
                    <div>Real</div>
                    <div>feedback.</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Image Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-slate-100 group"
            >
              <img
                src="https://cdn-ilcpnnh.nitrocdn.com/JyfVQegtpLSTYrrHtkmaOaslRMIUIjPC/assets/images/optimized/rev-30ab41d/www.oraanj-interiors.co.uk/wp-content/uploads/2026/09/Rachana-Gupta-Founder-of-Oraanj-Interiors-281x403.jpeg"
                alt="Luxury design project by Vance Interiors"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center grayscale select-none"
              />
            </motion.div>

            {/* 3. Text Card 1: Rachana (Oraanj Interiors) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-white p-5 sm:p-6 flex flex-col justify-start"
            >
              <h3 className="montserrat-bold text-2xl sm:text-[40px] text-gray-950 tracking-tight leading-tight">
                Rachana
              </h3>
              <p className="montserrat-bold text-sm sm:text-lg text-blue-600 tracking-tight mt-0.5">
                (Oraanj Interiors)
              </p>

              <div className="mt-4 sm:mt-5 space-y-3 montserrat-regular text-xs sm:text-[13px] lg:text-[14px] text-gray-800 leading-relaxed">
                <p>
                  These marketing systems should be a mandatory staple for every serious design firm.
                </p>
                <p>
                  They actually deliver affluent homeowners and you might wanna check your project calendar before turning the campaigns on full speed.
                </p>
              </div>
            </motion.div>

            {/* 4. Image Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-slate-100 group"
            >
              <img
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1792244063/ed1b8469-06fa-4005-b72f-3e301c76a7f7_jnwjpk.webp"
                alt="High-end spatial interior design renovation"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center grayscale select-none"
              />
            </motion.div>

            {/* 5. Text Card 2: Marcus (Studio Sterling) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-white p-5 sm:p-6 flex flex-col justify-start"
            >
              <h3 className="montserrat-bold text-2xl sm:text-[26px] text-gray-950 tracking-tight leading-tight">
                Marcus
              </h3>
              <p className="montserrat-bold text-sm sm:text-base text-blue-600 tracking-tight mt-0.5">
                (Studio Sterling)
              </p>

              <div className="mt-4 sm:mt-5 space-y-3 montserrat-regular text-xs sm:text-[13px] lg:text-[14px] text-gray-800 leading-relaxed">
                <p>
                  I used to have the hardest time getting clients to understand our premium retainers.
                </p>
                <p>
                  Vaphers built an acquisition funnel that filters out budget tire-kickers. Our inquiries are now strictly high-net-worth homeowners ready to sign.
                </p>
              </div>
            </motion.div>

            {/* ================= ROW 2 ================= */}

            {/* 6. Image Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-slate-100 group"
            >
              <img
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1792244071/23f124ae-f317-49ac-bda4-c621072ee6f8_bekuny.webp"
                alt="Bespoke luxury interior transformation"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center grayscale  select-none"
              />
            </motion.div>

            {/* 7. Text Card 3: Elena (Maison Rostova) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-white p-5 sm:p-6 flex flex-col justify-start"
            >
              <h3 className="montserrat-bold text-2xl sm:text-[26px] text-gray-950 tracking-tight leading-tight">
                Elena
              </h3>
              <p className="montserrat-bold text-sm sm:text-base text-blue-600 tracking-tight mt-0.5">
                (Maison Rostova)
              </p>

              <div className="mt-4 sm:mt-5 space-y-3 montserrat-regular text-xs sm:text-[13px] lg:text-[14px] text-gray-800 leading-relaxed">
                <p>
                  Elena will perform client intake presentations that she hasn&apos;t done in four years with confidence, because every lead is vetted.
                </p>
                <p>
                  Within 90 days our pipeline doubled without diluting our boutique identity.
                </p>
              </div>
            </motion.div>

            {/* 8. Image Card with Instagram Social Handle in Center */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-slate-900 group"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                alt="Social media portfolio visual"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none filter brightness-75"
              />

              {/* Instagram Badge in Center matching reference screenshot */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-lg border-2 border-black mb-2.5">
                  <Instagram className="w-7 h-7 text-white stroke-[2.2]" />
                </div>
                <span className="font-jetbrains text-[12px] font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  @vaphers.growth
                </span>
              </div>
            </motion.div>

            {/* 9. Text Card 4: Austin (OeDell Architecture) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-white p-5 sm:p-6 flex flex-col justify-start"
            >
              <h3 className="montserrat-bold text-2xl sm:text-[26px] text-gray-950 tracking-tight leading-tight">
                Austin
              </h3>
              <p className="montserrat-bold text-sm sm:text-base text-blue-600 tracking-tight mt-0.5">
                (OeDell Architecture)
              </p>

              <div className="mt-4 sm:mt-5 space-y-3 montserrat-regular text-xs sm:text-[13px] lg:text-[14px] text-gray-800 leading-relaxed">
                <p>
                  Our studio absolutely loves Vaphers! As soon as their Google Ads &amp; GEO campaigns launched, we were booking qualified consultations every week.
                </p>
                <p>
                  Definitely a permanent staple for our growth strategy!
                </p>
              </div>
            </motion.div>

            {/* 10. Image Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="relative aspect-[3/4.2] rounded-3xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 bg-slate-100 group"
            >
              <img
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1792244642/48c3050f-86fe-4d30-af4a-f3546baad188_pv5eam.webp"
                alt="Client completed residential interior renovation"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center grayscale select-none"
              />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}