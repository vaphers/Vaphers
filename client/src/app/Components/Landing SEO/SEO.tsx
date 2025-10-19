import Image from 'next/image'

export default function SEOContentSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
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
            <h3 className="text-3xl md:text-4xl lg:text-6xl font-base  tracking-[-0.03em] px-6 text-pretty bungee-inline-regular">
              What Is <span className="bg-blue-600 bg-clip-text text-transparent">Modern SEO?</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Search Engine Optimization (SEO) is the practice of improving your website's visibility in search engine results. In today's digital landscape, effective{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-700">
                SEO strategy
              </a>{' '}
              combines technical excellence with high-quality content that genuinely serves your audience's needs and search intent.
            </p>
          </div>

          {/* 1 */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-900 montserrat">
              What Makes SEO Content Effective?
            </h4>
            <p className="text-gray-600 leading-relaxed montserrat">
              Effective SEO content goes beyond keyword placement. It requires understanding user intent, creating comprehensive content that answers real questions, and presenting information in a clear, scannable format. Modern search engines prioritize content that demonstrates expertise, authority, and trustworthiness (E-E-A-T) while providing genuine value to readers. This means focusing on quality over quantity and ensuring every piece addresses specific user needs.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-600 bg-blue-50 rounded-r-lg">
            "The best SEO content is created for people first, search engines second. Focus on answering questions thoroughly and providing unique insights that can't be found elsewhere."
          </blockquote>

          {/* 2 */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-900 montserrat">
              Key Elements of SEO Success
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Successful SEO combines strategic keyword placement in titles, headings, and naturally throughout content, with technical optimization like proper URL structure and meta descriptions. But the foundation is always high-quality, original content that showcases real expertise. Use subheadings (H2-H6) to structure content logically, incorporate relevant keywords naturally, and ensure your content directly addresses search intent—whether informational, navigational, or transactional.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
