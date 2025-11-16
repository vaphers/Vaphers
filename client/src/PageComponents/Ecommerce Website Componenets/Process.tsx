import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Zap, TrendingUp, CreditCard } from 'lucide-react'

const features = [
  {
    icon: ShoppingCart,
    title: 'Built for Online Sales',
    description:
      'Fast product pages, smooth checkout flows, and secure payment options that turn visitors into buyers, helping you sell more, 24/7.',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Store Performance',
    description: (
      <>
        Next.js optimizes images, caching, and page loads so your store feels instant on any device, reducing bounce rates and boosting conversions. Get a{' '}
        <Link 
          href="/seo-services/seo-audit-services" 
          className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
        >
          performance audit
        </Link>
        {' '}to see how your site measures up.
      </>
    ),
  },
  {
    icon: TrendingUp,
    title: 'SEO That Drives Traffic',
    description: (
      <>
        Google-friendly pages rank higher and bring more shoppers to your store. Our{' '}
        <Link 
          href="/seo-services/ecommerce-seo-services" 
          className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
        >
          ecommerce SEO services
        </Link>
        {' '}help customers find your products through clean code and fast speeds.
      </>
    ),
  },
  {
    icon: CreditCard,
    title: 'Easy to Scale & Update',
    description:
      'Add new products, launch promotions, or expand categories without slowing down. Keep your catalog fresh and grow your revenue effortlessly.',
  },
]

export default function EcommerceProcess() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              Grow Your <span className="bg-blue-600 bg-clip-text text-transparent">Online Store</span>
            </h4>
            <p className="text-lg text-gray-600">
              Launch a high-performance ecommerce store that loads fast, ranks well, and converts visitors into customers without the technical complexity. Our{' '}
              <Link 
                href="/seo-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                SEO expertise
              </Link>
              {' '}ensures your products get discovered.
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

          <Link href="/contact" className="inline-block">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            Start Your Online Store
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative lg:ml-auto w-full">
          <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern ecommerce online shopping experience"
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
