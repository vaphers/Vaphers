import Image from 'next/image'

interface GoogleAdsSectionProps {
  cityName: string
}

export default function SeoEssential({ cityName }: GoogleAdsSectionProps) {
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
                alt="SEO and analytics dashboard"
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
                Why <span className="bg-blue-600 bg-clip-text text-transparent">SEO</span> Is Essential for {cityName}&apos;s Businesses
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed montserrat">
                SEO ensures your business is discovered by customers in {cityName} when they search online for services you provide.
                At <strong>Vaphers</strong>, our strategies help you climb Google rankings, build credibility, and bring targeted local traffic directly to your doorstep.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 montserrat">
                Attract Local Customers Where They Search
              </h3>
              <p className="text-gray-600 leading-relaxed montserrat">
                With most buying journeys starting on search engines, showing up at the top is non-negotiable. 
                We optimize your website, Google Business Profile, and content so your company appears in relevant searches all over {cityName}. 
                You connect with customers at the right moment—when intent is highest.
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
              “Businesses that invest in professional SEO routinely see a significant increase in website traffic, quality leads, and revenue. <strong>Vaphers</strong> brings proven expertise to fuel your growth in {cityName}.”
            </blockquote>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 montserrat">
                Boost Visibility, Build Trust, and Beat Competitors
              </h3>
              <p className="text-gray-600 leading-relaxed montserrat">
                SEO isn&apos;t just about rankings—it&apos;s about earning trust. 
                Our results-driven optimizations make your business the top choice among local competitors, helping you get more reviews, stronger brand awareness, and sustained growth in the {cityName} market.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
