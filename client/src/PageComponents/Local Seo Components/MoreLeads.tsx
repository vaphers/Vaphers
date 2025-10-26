import Image from 'next/image'
import { MapPin, PhoneCall, Star, Search } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Google Maps & Local Pack Visibility',
    description:
      'Ranking in Google’s Local Pack ensures your business appears when people search “near me.” This prime visibility drives direct calls, messages, and foot traffic from buyers ready to act.',
  },
  {
    icon: PhoneCall,
    title: 'More Calls & Inquiries',
    description:
      'Local SEO adds clickable phone numbers, directions, and call-to-actions across Google and Maps, making it effortless for potential customers to contact your business instantly.',
  },
  {
    icon: Star,
    title: 'Build Trust Through Reviews',
    description:
      'Consistent reviews on Google and other local platforms establish credibility. Positive feedback boosts rankings, earns customer trust, and turns one-time clicks into loyal clients.',
  },
  {
    icon: Search,
    title: 'Capture High-Intent Local Searches',
    description:
      'Local SEO targets customers searching for your exact service in your area — users who are ready to convert. This means more qualified leads and less wasted ad spend.',
  },    
]

export default function LocalLeads() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              How Local SEO{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Generates More Leads?
              </span>
            </h4>
            <p className="text-lg text-gray-600">
              Local SEO connects your business with nearby customers actively looking for your services. By optimizing your Maps presence, reviews, and local listings, you turn online searches into real leads and conversions.
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
            See How It Works
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Right Image */}
        <div className="relative lg:ml-auto w-full">
          <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team optimizing local SEO for leads"
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
