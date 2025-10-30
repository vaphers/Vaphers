import Image from 'next/image'

export default function GoogleAdsSection() {
  return (
    <div className="w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
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
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-[500px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100">
              <Image
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Google Ads campaign dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                Why <span className="bg-blue-600 bg-clip-text text-transparent">Google Ads</span> Are Essential for Business Growth
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed montserrat">
                Google Ads enables businesses to reach potential customers at the exact moment they’re searching for your products or services.
                At <strong>Vaphers</strong>, we create expertly managed Google Ads campaigns that deliver targeted traffic, generate qualified leads, and maximize your advertising ROI.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 montserrat">
                Capture High-Intent Customers Instantly
              </h3>
              <p className="text-gray-600 leading-relaxed montserrat">
                Google Ads puts your business in front of potential customers actively searching for what you offer, turning clicks into conversions quicker than organic search alone.
                Through precise keyword targeting, audience segmentation, and bid management, we ensure your ads reach the right people at the right time.
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
              “Businesses leveraging professionally managed Google Ads campaigns see up to 200% more qualified leads — and <strong>Vaphers</strong> ensures your investments deliver measurable growth.”
            </blockquote>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 montserrat">
                Maximize ROI and Outpace Competitors
              </h3>
              <p className="text-gray-600 leading-relaxed montserrat">
                With continuous optimization and detailed performance tracking, <strong>Vaphers</strong> helps you get the most out of your ad budget.
                Our hands-on approach refines your campaigns to reduce wasteful spend, improve Quality Scores, and outrank competitors bidding for the same customers.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
