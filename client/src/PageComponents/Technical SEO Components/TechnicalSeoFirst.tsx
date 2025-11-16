import Image from 'next/image'

export default function TechnicalSEOSection() {
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
                alt="Technical SEO performance dashboard showing site speed and Core Web Vitals"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                Why <span className="bg-blue-600 bg-clip-text text-transparent">Technical SEO</span> Comes First?
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed montserrat">
                Technical SEO is the foundation that determines whether search engines can crawl, index, and rank your content effectively. At <strong>Vaphers</strong>, we prioritize technical optimization because without proper infrastructure, fast page speeds, mobile responsiveness, clean site architecture, and structured data, even exceptional content remains invisible. Technical SEO creates the solid foundation that every successful website requires.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-2xl font-bold text-gray-900 bungee-inline-regular">
                Foundation Must Come Before Content
              </h4>
              <p className="text-gray-600 leading-relaxed montserrat">
                You can't rank what search engines can't crawl. Technical SEO ensures your entire site structure is accessible, from{' '}
                <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
                  ecommerce product catalogs
                </a>
                {' '}to service pages. Whether you're running a{' '}
                <a href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 underline hover:text-blue-700 font-medium">
                  Shopify store
                </a>
                {' '}or custom platform, technical barriers like slow load times, broken links, poor mobile optimization, and crawl errors prevent even your best content from reaching your audience. A{' '}
                <a href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
                  comprehensive SEO audit
                </a>
                {' '}identifies these critical issues before they cost you rankings and revenue.
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
              "Technical SEO makes up 30% of Google's ranking algorithm and serves as a prerequisite for all other SEO efforts. Without a solid technical foundation, even the highest-quality content won't achieve its ranking potential."
            </blockquote>

            <div className="space-y-3">
              <h4 className="text-2xl font-bold text-gray-900 bungee-inline-regular">
                Future-Proof Your Visibility Across All Search Platforms
              </h4>
              <p className="text-gray-600 leading-relaxed montserrat">
                Technical optimization doesn't just improve Google rankings, it prepares your site for{' '}
                <a href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 underline hover:text-blue-700 font-medium">
                  AI search engines
                </a>
                {' '}like Perplexity, ChatGPT Search, and Google's SGE. With 30% of SEO professionals facing crawl-related visibility issues, proper technical configuration, including XML sitemaps, robots.txt optimization, structured data markup, and HTTPS security, ensures maximum discoverability. <strong>Vaphers</strong> builds technical infrastructure that delivers sustainable organic growth, improved user experience, and lasting competitive advantages that compound over time.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
