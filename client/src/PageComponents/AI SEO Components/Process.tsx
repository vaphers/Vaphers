import Image from 'next/image'
import { Bot, Sparkles, SatelliteDish, Brain } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI-First Content Strategy',
    description: 'We research how people actually talk to ChatGPT and voice assistants, then create content that answers those real questions.',
  },
  {
    icon: Sparkles,
    title: 'Get Cited by AI Engines',
    description: 'Your content shows up when ChatGPT, Perplexity, or Gemini recommend solutions to users asking about your industry.',
  },
  {
    icon: SatelliteDish,
    title: 'Voice Search Ready',
    description: 'When someone asks Siri or Alexa for recommendations, your business comes up first with optimized answer formats.',
  },
  {
    icon: Brain,
    title: 'Build Real Authority',
    description: 'AI platforms learn to trust your expertise through consistent, well-structured content that demonstrates deep knowledge.',
  },
]

export default function SEOApproach() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              How We Get You{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Found by AI
              </span>
            </h4>
            <p className="text-lg text-gray-600">
              Forget old-school SEO tactics. We focus on making sure AI platforms recommend your business when it matters most.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            See How It Works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Image */}
        <div className="relative lg:ml-auto w-full">
          <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team working on AI SEO strategy"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
              priority
            />
          </div>

          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 rounded-3xl -z-10 blur-3xl opacity-50" />
        </div>
      </div>
    </section>
  )
}
