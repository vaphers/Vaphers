import Image from 'next/image'
import { DollarSign, Zap, TrendingUp, Wrench } from 'lucide-react'

const features = [
  {
    icon: DollarSign,
    title: 'All-in-One Hosted Platform',
    description:
      'Everything included—hosting, security, SSL certificates, and PCI compliance. No technical setup required. Launch your store in minutes and start selling immediately with zero infrastructure headaches.',
  },
  {
    icon: Zap,
    title: 'Highest-Converting Checkout',
    description:
      'Shopify Checkout + Shop Pay boosts conversions by up to 50% vs guest checkout and 10% higher than competitors. One-tap checkout for 100M+ Shop Pay users means more sales with less cart abandonment.',
  },
  {
    icon: TrendingUp,
    title: 'Mobile-First & Lightning Fast',
    description:
      'Mobile accounts for 64% higher conversion rates with responsive Shopify themes. Average load time of 309ms ensures your store performs flawlessly on every device—critical when 70% of shoppers browse on mobile.',
  },
  {
    icon: Wrench,
    title: 'Scales with Your Success',
    description:
      'From startup to enterprise—manage inventory, process unlimited orders, and expand globally with multi-currency support. Access 13,000+ apps to add features as you grow, with 24/7 expert support at every stage.',
  },
]

export default function BuildShopifyStore() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              Build Your Online Store with <span className="bg-blue-600 bg-clip-text text-transparent">Shopify</span>
            </h4>
            <p className="text-lg text-gray-600">
              Launch a high-converting e-commerce store with Shopify—the platform trusted by 5.8 million merchants worldwide to sell online, in person, and everywhere in between.
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
            Start Your Shopify Store Today
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
              alt="Entrepreneur building online store with Shopify"
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
