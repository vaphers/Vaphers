import Image from 'next/image'
import { Target, BarChart, RefreshCw, Users } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Precision Audience Targeting & Visibility',
    description:
      'We ensure your PPC ads reach the right audience by targeting specific demographics, locations, and intent-driven keywords to connect you with ready-to-buy customers.',
  },
  {
    icon: BarChart,
    title: 'Data-Driven Campaign Optimization',
    description:
      'By analyzing real-time data and conversion metrics, we continuously optimize your bids, keywords, and ad creatives to maximize return on investment (ROI).',
  },
  {
    icon: RefreshCw,
    title: 'Ongoing Testing & Refinement',
    description:
      'Through A/B testing of ads, landing pages, and targeting options, we refine campaigns to stay ahead of trends and improve performance consistently.',
  },
  {
    icon: Users,
    title: 'Audience Segmentation & Remarketing',
    description:
      'We segment your audience for personalized messaging and deploy remarketing strategies that re-engage past visitors to boost conversions and brand loyalty.',
  },
]

export default function PPCMarketingProcess() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              How <span className="bg-blue-600 bg-clip-text text-transparent">PPC Marketing</span>{' '}
              Drives Business Growth?
            </h4>
            <p className="text-lg text-gray-600">
              Our comprehensive PPC marketing process targets prospects with pinpoint accuracy to drive quality traffic, optimize spend, and boost your revenue.
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Learn More About Our PPC Process
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
          <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden ">
            <Image
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765188232/PPC_3_1_zt7v1m.png"
              alt="Team managing PPC marketing campaigns"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
              priority
            />
          </div>
          {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 rounded-3xl -z-10 blur-3xl opacity-50" /> */}
        </div>
      </div>
    </section>
  )
}
