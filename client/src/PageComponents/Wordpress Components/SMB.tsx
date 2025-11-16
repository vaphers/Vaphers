import Image from 'next/image'
import Link from 'next/link'
import { DollarSign, Zap, TrendingUp, Wrench } from 'lucide-react'

const features = [
  {
    icon: DollarSign,
    title: 'Budget-Friendly & Cost-Effective',
    description:
      'WordPress itself is free, you only pay for hosting and a domain. Compared to many closed platforms, it lets small businesses invest more in branding, content, and marketing instead of high software fees.',
  },
  {
    icon: Zap,
    title: 'No Coding Skills Required',
    description:
      'Update pages, add services, publish blogs, and change images from a simple dashboard. With an intuitive editor, you can keep your website fresh without relying on a developer every time you want to make a change.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Help You Get Found',
    description: (
      <>
        WordPress is SEO-friendly out of the box, and works brilliantly with{' '}
        <Link
          href="/seo-services"
          className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
        >
          professional SEO services
        </Link>
        {' '}to improve rankings, traffic, and leads. Clean code, fast performance, and flexible content structures make it easier for Google to understand and recommend your business.
      </>
    ),
  },
  {
    icon: Wrench,
    title: 'Perfect for Local & Growing Businesses',
    description: (
      <>
        Start with a simple brochure site and scale into a lead‑generating local brand. Combine WordPress with{' '}
        <Link
          href="/seo-services/local-seo-services"
          className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
        >
          local SEO strategies
        </Link>
        {' '}to show up for “near me” searches, then add booking forms, FAQs, and landing pages as you grow, without switching platforms.
      </>
    ),
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
              Why <span className="bg-blue-600 bg-clip-text text-transparent">WordPress</span> Works So Well for Small Businesses
            </h4>
            <p className="text-lg text-gray-600">
              Turn your small business into a serious online brand with a WordPress website designed to win trust, generate leads, and support long‑term growth. At{' '}
              <Link
                href="/"
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                Vaphers
              </Link>
              , WordPress is the foundation for many of our high‑performing small business sites.
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
