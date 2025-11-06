import Image from 'next/image'
import { Target, BarChart, RefreshCw, Users } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'SEO‑Ready Pages That Rank',
    description:
      'Get clean, Google‑friendly pages with fast load times, perfect for service websites, landing pages, and blogs that need traffic and leads.',
  },
  {
    icon: BarChart,
    title: 'Speed & Performance Built In',
    description:
      'Next.js optimizes images, routing, and caching so your site feels snappy on mobile and desktop—helping visitors stay longer and convert.',
  },
  {
    icon: RefreshCw,
    title: 'Easy to Update & Scale',
    description:
      'Add new pages, launch campaigns, or expand your site without slowing down. Reusable sections make updates quick and consistent.',
  },
  {
    icon: Users,
    title: 'Designed to Convert Visitors',
    description:
      'Clear calls-to-action, trust signals, and smooth forms turn clicks into inquiries and sales—ideal for growth-focused businesses.',
  },
]

export default function NextJsProcess() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              Win with <span className="bg-blue-600 bg-clip-text text-transparent">Next.js Websites</span>
            </h4>
            <p className="text-lg text-gray-600">
              Launch a fast, SEO‑friendly website that’s easy to manage and built to convert—perfect for modern brands that want results without the tech headache.
            </p>
          </div>

          {/* Features */}
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
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Get affordable Next.js development
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Image */}
        <div className="relative lg:ml-auto w-full">
          <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team building a high-performance Next.js website"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 rounded-3xl -z-10 blur-3xl opacity-50" />
        </div>
      </div>
    </section>
  )
}
