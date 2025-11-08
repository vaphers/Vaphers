import Image from 'next/image'
import { DollarSign, Zap, TrendingUp, Wrench } from 'lucide-react'

const features = [
  {
    icon: DollarSign,
    title: 'Budget-Friendly & Cost-Effective',
    description:
      'WordPress is free to use—you only pay for hosting and a domain. Avoid expensive monthly subscriptions while getting enterprise-level features for your small business.',
  },
  {
    icon: Zap,
    title: 'No Coding Skills Required',
    description:
      'Manage your website easily with drag-and-drop tools. Update content, add pages, and make changes without hiring a developer—perfect for busy business owners.',
  },
  {
    icon: TrendingUp,
    title: 'Built-In SEO to Get Found Online',
    description:
      'WordPress is SEO-friendly from the start with clean code and powerful plugins like Yoast SEO, helping your small business rank higher on Google and attract more customers.',
  },
  {
    icon: Wrench,
    title: 'Grows with Your Business',
    description:
      'Start simple and scale up as you grow. Add ecommerce, booking systems, or membership features with 59,000+ plugins—no limits, no extra platform fees.',
  },
]

export default function SMB() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              Why <span className="bg-blue-600 bg-clip-text text-transparent">WordPress</span> is Best for Small Businesses?
            </h4>
            <p className="text-lg text-gray-600">
              Build a professional website affordably with WordPress—the platform trusted by millions of small businesses worldwide to grow online without breaking the bank.
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
            Start Your WordPress Site Today
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
              alt="Small business owner managing WordPress website"
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
