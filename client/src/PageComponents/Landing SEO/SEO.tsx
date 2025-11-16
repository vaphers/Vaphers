import Image from 'next/image'

export default function SEOContentSection() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Dashed Grid Background */}
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
            <div className="relative w-full h-[500px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-200 via-blue-200 to-cyan-200">
              <Image
                src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="SEO analytics and data"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                How To Create <span className="bg-blue-600 bg-clip-text text-transparent">SEO Content?</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Creating effective SEO content starts with understanding your audience's search intent and delivering genuine value. Whether you're working with{' '}
                <a href="https://www.vaphers.com/" className="text-blue-600 underline hover:text-blue-700">
                  affordable SEO services
                </a>{' '}
                or building content in-house, the fundamentals remain the same: thorough keyword research, strategic optimization, and content that prioritizes readers while satisfying search engine requirements.
              </p>
            </div>

            {/* 1 */}
            <div className="space-y-3">
              <h4 className="text-2xl font-bold text-gray-900 bungee-inline-regular">
                Start With Strategic Keyword Research
              </h4>
              <p className="text-gray-600 leading-relaxed montserrat">
                Effective SEO content begins with identifying high-value keywords that balance search volume and competition. Use tools like Google Keyword Planner or Semrush to find 3-5 primary keywords, then expand with long-tail variations that target specific user intent. Focus on keywords your target audience actually searches for, not just what sounds good to your business. Strategic placement in titles, headings, meta descriptions, and naturally throughout your content signals relevance to search engines without keyword stuffing.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-600 bg-blue-50 rounded-r-lg">
              "Write for people first, search engines second. The best SEO content answers questions thoroughly, demonstrates expertise, and provides unique insights readers can't find elsewhere."
            </blockquote>

            {/* 2 */}
            <div className="space-y-3">
              <h4 className="text-2xl font-bold text-gray-900 bungee-inline-regular">
                Structure Content for Readability 
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Modern SEO content must be scannable and engaging. Use short paragraphs, clear subheadings (H2-H6), bullet points, and visual elements to break up text and improve readability. Write at a sixth-grade reading level using simple, active language that directly addresses user questions. Include compelling meta descriptions, optimize images with descriptive alt text, and add internal links to related content. Most importantly, ensure your content demonstrates E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) by backing claims with data, citing authoritative sources, and showcasing real expertise in your field.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
