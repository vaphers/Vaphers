import Image from 'next/image'

export default function AiSectionLeads() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative w-full h-[500px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-200 via-blue-200 to-cyan-200">
            <Image
              src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="AI SEO analytics and lead generation data"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-pretty bungee-inline-regular">
              How AI SEO <br/><span className="bg-blue-600 bg-clip-text text-transparent">Generates Leads?</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed montserrat">
              AI SEO captures high-intent leads by positioning your brand in conversational AI responses. When potential customers ask{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-700 font-medium">
                ChatGPT, Perplexity, or Gemini
              </a>{' '}
              for recommendations, optimized content ensures your business is cited and recommended as the authoritative solution.
            </p>
          </div>

          {/* 1 */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Capturing Zero-Click Search Intent
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              With 58% of searches ending without a click, traditional SEO misses massive opportunities. AI SEO optimizes your content for featured snippets, AI overviews, and direct answers—capturing leads at decision-making moments. By demonstrating expertise in structured formats, you intercept prospects before they reach competitors, positioning your business as the trusted authority they're actively seeking.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
            "AI-optimized businesses see 3x higher conversion rates because they're recommended by trusted AI assistants at the critical decision-making moment."
          </blockquote>

          {/* 2 */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 montserrat">
              Building Trust Through AI Citations
            </h3>
            <p className="text-gray-600 leading-relaxed montserrat">
              When AI engines cite your content, it creates instant credibility. Our strategies ensure your business appears in conversational responses for high-value queries like "best [service] near me." This AI validation dramatically shortens sales cycles—prospects arrive pre-qualified and trusting your expertise, resulting in higher-quality leads with better conversion rates across Google AI, ChatGPT, and Perplexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
