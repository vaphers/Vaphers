import Image from 'next/image'

export default function GMB() {
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
              alt="Google Business Profile optimization dashboard"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              Why <span className="bg-blue-600 bg-clip-text text-transparent">Google Business Profile</span> Is the Heart of Local SEO?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed montserrat">
              A fully optimized Google Business Profile (GBP) is no longer optional — it’s the cornerstone of effective local SEO. 
              It determines how your business appears in Google Maps, local packs, and “near me” searches. At <strong>Vaphers</strong>, 
              we specialize in crafting high-performing GBP strategies that boost visibility, engagement, and conversions within your target city or neighborhood.
            </p>
          </div>

          {/* 1 */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Turn Searches into Local Foot Traffic
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              When potential customers search for services nearby, your Google Business Profile decides whether you show up first or not at all. 
              An optimized profile featuring accurate NAP (Name, Address, Phone), customer reviews, and updated business details 
              ensures you capture high-intent, local leads that are already looking to buy. 
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
            “Businesses with fully optimized Google Business Profiles get up to 70% more visits and 50% more conversions — 
            and <strong>Vaphers</strong> helps you get there the smart way.”
          </blockquote>

          {/* 2 */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Build Local Trust & Outrank Competitors
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              A verified and active Google Business Profile signals trust and authority to both search engines and your customers. 
              By posting regular updates, adding photos, and gathering local reviews, your business becomes a reliable source within 
              your community. With <strong>Vaphers</strong>, we don’t just optimize your listing — we turn it into a lead-generation engine 
              that consistently ranks and converts for high-value “near me” searches.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}




