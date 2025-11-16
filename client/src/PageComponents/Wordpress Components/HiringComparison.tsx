'use client'

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, TrendingUp, Target, Clock, DollarSign, Users, Zap } from "lucide-react"

export default function DIYvsAgency() {
  const comparisonData = [
    {
      aspect: "Initial Cost",
      inbound: "Lower upfront: $300-800 for hosting, themes, and plugins. Seems budget-friendly.",
      outbound: "Higher initial: $2,000-15,000+ but includes professional design, development, and launch.",
      inboundIcon: <DollarSign className="w-4 h-4" />,
      outboundIcon: <DollarSign className="w-4 h-4" />
    },
    {
      aspect: "Time Investment",
      inbound: "50-100+ hours learning and building. Takes 2-6 months for basic functionality.",
      outbound: "Delivered in 2-8 weeks. Experts handle everything while you focus on business.",
      inboundIcon: <Clock className="w-4 h-4" />,
      outboundIcon: <Zap className="w-4 h-4" />
    },
    {
      aspect: "Quality & Results",
      inbound: "Variable quality. Conversion rates typically 0.5-1%. Trial and error approach.",
      outbound: "Professional quality. Conversion rates 2-3%. Proven processes and best practices.",
      inboundIcon: <TrendingUp className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Technical Skills",
      inbound: "Steep learning curve. You're responsible for hosting, security, performance, SEO.",
      outbound: "Full team of experts: designers, developers, SEO specialists, security professionals.",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Users className="w-4 h-4" />
    },
    {
      aspect: "Ongoing Support",
      inbound: "You're on your own. When issues arise, spend hours researching or pay for emergency fixes.",
      outbound: "Priority support included. Issues resolved within 24 hours. Regular updates and maintenance.",
      inboundIcon: <X className="w-4 h-4" />,
      outboundIcon: <Check className="w-4 h-4" />
    },
    {
      aspect: "Best For",
      inbound: "Testing ideas, personal projects, tight budgets with plenty of time.",
      outbound: "Professional businesses needing reliable websites that drive leads and revenue.",
      inboundIcon: <Check className="w-4 h-4" />,
      outboundIcon: <Check className="w-4 h-4" />
    }
  ];

  const diyFeatures = [
    { title: "Lower upfront cost", description: "Pay only for hosting and basic tools—$300-800 initially." },
    { title: "Full control", description: "Make every decision yourself and learn how WordPress works." },
    { title: "Flexible schedule", description: "Work at your own pace without external dependencies." },
    { title: "Learning experience", description: "Gain technical knowledge that may benefit future projects." },
  ];

  const agencyFeatures = [
    { title: "Professional results fast", description: "Launch in 2-8 weeks with proven design and functionality." },
    { title: "Expert team", description: "Access designers, developers, and SEO specialists simultaneously." },
    { title: "Higher conversion rates", description: "Professional sites convert 2-3x better than DIY attempts." },
    { title: "Ongoing support", description: "Security monitoring, updates, and 24-hour issue resolution included." },
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Dashed Grid Background */}
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
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 mb-4 bungee-inline-regular">
            DIY vs <span className="bg-blue-600 bg-clip-text text-transparent">WordPress Agency</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Understanding the real costs, time investment, and results of building your WordPress site yourself versus hiring a{" "}
            <Link
              href="/about-us"
              className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
            >
              digital marketing company
            </Link>{" "}
            like Vaphers that plans, designs, and optimizes everything for growth.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl montserrat">Side-by-Side Comparison</CardTitle>
            <CardDescription className="montserrat">
              Real differences between DIY and hiring a WordPress design agency for your business website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 montserrat">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold text-orange-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-600">DIY WordPress</Badge>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">WordPress Agency</Badge>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-700 montserrat">{row.aspect}</td>
                      <td className="py-4 px-4 text-gray-600 montserrat">
                        <div className="flex items-start gap-2">
                          <div className="text-orange-600 mt-1">{row.inboundIcon}</div>
                          <span>{row.inbound}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 montserrat">
                        <div className="flex items-start gap-2">
                          <div className="text-blue-600 mt-1">{row.outboundIcon}</div>
                          <span>{row.outbound}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* DIY Card */}
          <Card className="border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-orange-600 montserrat">When DIY Makes Sense</CardTitle>
                <Badge className="bg-orange-600">Budget Option</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Best for testing ideas, personal projects, or when you have significant time but limited budget.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {diyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 montserrat">{feature.title}</p>
                      <p className="text-sm text-gray-600 montserrat">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-semibold text-orange-900 mb-1 montserrat">Hidden Costs:</p>
                <p className="text-sm text-gray-700 montserrat">
                  50-100+ hours of your time ($1,500-$6,000 opportunity cost), unpredictable fixes, and 2-6 month timeline.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Agency Card */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-blue-600 montserrat">Why Hire a WordPress Agency</CardTitle>
                <Badge className="bg-blue-600">Professional Results</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Perfect for businesses that need reliable, conversion-focused websites without the technical headaches—built by an{' '}
                <Link
                  href="/website-development-services"
                  className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
                >
                  affordable WordPress development company
                </Link>
                {" "}that understands growth, SEO, and long-term scalability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {agencyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 montserrat">{feature.title}</p>
                      <p className="text-sm text-gray-600 montserrat">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-1 montserrat">Best for:</p>
                <p className="text-sm text-gray-700 montserrat">
                  Business websites, ecommerce stores, and professional sites where time is valuable and results matter.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-3 montserrat">
            Ready for Professional WordPress Development?
          </h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
            Get a complete team of WordPress experts for less than hiring one developer. Starting at $2,000/month.
          </p>
          <Link href="/contact-us" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Get Your Free Consultation
            <TrendingUp className="w-5 h-5" />
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
