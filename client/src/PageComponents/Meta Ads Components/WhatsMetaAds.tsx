import Image from 'next/image'

export default function WhatsMetaAds() {
  return (
    <section className="relative max-w-full px-6 py-8">
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative w-full h-[500px] lg:h-[800px] rounded-3xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761830525/Why_GMB___2_pdsgri.png"
              alt="Meta Ads across Facebook and Instagram placements like Feed, Stories, and Reels"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              What are <span className="bg-blue-600 bg-clip-text text-transparent">Meta Ads</span>?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed montserrat">
              Meta Ads are paid placements that run across Facebook, Instagram, Messenger, and the Audience Network, managed inside Meta Ads Manager to reach specific audiences and drive outcomes like awareness, traffic, leads, and sales. These ads appear in placements such as Feeds, Stories, and Reels, and can use Meta’s Advantage features for delivery and optimization.
            </p>
          </div>

          {/* Key points */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              How Meta Ads work
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              Campaigns are built in a three‑level structure, Campaign (objective), Ad Set (audience, budget, placements), and Ads (creative), so the system can optimize delivery to people most likely to take the action you want. Objectives commonly include Awareness, Traffic, Engagement, Leads, Sales, and App Promotion. 
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
            “With advanced targeting, measurement, and optimization, Meta Ads help brands connect with the right people across Facebook and Instagram, at scale.” 
          </blockquote>

          {/* Formats and tracking */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Formats, targeting, and tracking
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              Common formats include Image, Video, Carousel, Collection, and Lead Ads, enabling both direct response and brand storytelling across placements. Precise audience targeting uses demographics, interests, behaviors, Custom Audiences for retargeting, and Lookalike Audiences for scalable reach. Accurate measurement typically combines the Meta Pixel and Conversions API for better attribution and optimization. 
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
