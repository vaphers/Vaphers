import Image from 'next/image'
import { MessageCircle, MessageSquare, PhoneCall, ClipboardList } from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    title: 'Click‑to‑Message Conversations',
    description:
      'Send prospects straight from the ad into Messenger, Instagram DM, or WhatsApp to ask questions, qualify needs, and book calls in real time—no landing page required.',
  },
  {
    icon: ClipboardList,
    title: 'Instant Forms That Convert',
    description:
      'Collect lead info inside Facebook or Instagram with pre‑filled Instant Forms, add qualifying questions, and reduce drop‑offs with fast, mobile‑first submissions.',
  },
  {
    icon: PhoneCall,
    title: 'WhatsApp Leads, Instantly',
    description:
      'Capture name and phone on tap with Click‑to‑WhatsApp ads, then continue the conversation with quick replies, templates, and follow‑ups to close faster.',
  },
]

export default function MetaLeads() {
  return (
    <section className="relative overflow-hidden">
      {/* Dashed Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
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
          // Combine masks: intersect shows only where both masks are opaque
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
                How Meta Ads{' '}
                <span className="bg-blue-600 bg-clip-text text-transparent">
                  Generate More Leads?
                </span>
              </h4>
              <p className="text-lg text-gray-600">
                Run lead campaigns that open chats instantly or capture details on‑platform. With Instant Forms, Click‑to‑Message, and WhatsApp entry points, Meta removes friction so high‑intent prospects convert faster and hand‑offs to sales are immediate.
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
                alt="Team running Meta lead generation via messaging and instant forms"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 rounded-3xl -z-10 blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  )
}
