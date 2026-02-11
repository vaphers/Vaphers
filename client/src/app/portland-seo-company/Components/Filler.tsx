import Image from 'next/image'
import { Target, TrendingUp, Users, Award } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Target,
    title: 'Target the Right Portland Customers',
    description:
      'We help your business appear in front of people in Portland who are actively searching for your services, bringing in high-intent traffic that turns into real leads.',
  },
  {
    icon: TrendingUp,
    title: 'Increase Your Local Visibility',
    description:
      'Our strategies improve your rankings across Portland search results, helping your business show up consistently when potential customers are ready to buy.',
  },
  {
    icon: Users,
    title: 'Generate Consistent Leads',
    description:
      'We focus on attracting qualified visitors who are more likely to contact, book, or purchase from you, turning search traffic into measurable growth.',
  },
  {
    icon: Award,
    title: 'Build a Strong Digital Presence',
    description:
      'From improving your website experience to strengthening your online authority in Portland, we position your brand as a trusted choice in your industry.',
  },
]

export default function SEOApproach() {
  return (
    <div className=" w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-18">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
                What{" "}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Vaphers Can Do
                </span>{" "}
                For You?
              </h3>
              
              <p className="text-lg text-gray-600">
                We help Portland businesses grow by increasing visibility, attracting the right customers, and turning online searches into consistent revenue opportunities.
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

            <Link href={"/contact"}>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Start Growing in Portland
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative lg:ml-auto w-full">
            <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png"
                alt="Portland business growth through SEO strategy"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
