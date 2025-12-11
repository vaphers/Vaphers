    import Image from 'next/image'

export default function HowPpcWork() {
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
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765268762/PPC_2_1_p3jzlu.png"
              alt="PPC Marketing Concept Dashboard"
              fill
              sizes="(max-width: 598px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              How <span className="bg-blue-600 bg-clip-text text-transparent">PPC Marketing Works?</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed montserrat">
              PPC marketing (Pay-Per-Click) is a highly effective form of online advertising where you bid for ad placement on search engines and other platforms. You pay only when a user clicks your ad, making it a flexible and measurable investment.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Targeted Keyword Bidding
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              You select keywords relevant to your business that potential customers are searching for. By bidding on these keywords, your ads appear prominently when users search those terms, driving qualified traffic straight to your website or landing pages.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
            “PPC lets you control your ad budget while reaching the right people with precision—accelerating your sales funnel like nothing else.”
          </blockquote>

          {/* Step 2 */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Real-Time Campaign Management & Optimization
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              PPC campaigns provide detailed performance data in real time. This allows you to adjust bids, optimize ad copy, and test landing pages to maximize conversions and reduce cost per acquisition. Continuous refinement ensures your ads deliver the best possible ROI.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
