'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, TrendingUp, Target, Clock, DollarSign, Users, Zap } from "lucide-react"

export default function InboundVsOutbound() {
  const comparisonData = [
    {
      aspect: "Approach",
      inbound: "Attract leads through valuable content",
      outbound: "Proactively reach out to prospects",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Communication Style",
      inbound: "One-to-many (content reaches many)",
      outbound: "One-to-one (personalized outreach)",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Cost Per Lead",
      inbound: "62% lower over time",
      outbound: "Higher upfront investment",
      inboundIcon: <DollarSign className="w-4 h-4" />,
      outboundIcon: <DollarSign className="w-4 h-4" />
    },
    {
      aspect: "Timeline",
      inbound: "Slower to scale but sustainable",
      outbound: "Immediate pipeline opportunities",
      inboundIcon: <Clock className="w-4 h-4" />,
      outboundIcon: <Zap className="w-4 h-4" />
    },
    {
      aspect: "Lead Quality",
      inbound: "Higher - prospects show interest first",
      outbound: "Lower - casting a wide net",
      inboundIcon: <TrendingUp className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Buyer Intent",
      inbound: "Self-motivated and actively searching",
      outbound: "May not be actively looking",
      inboundIcon: <Check className="w-4 h-4" />,
      outboundIcon: <X className="w-4 h-4" />
    }
  ];

  const inboundFeatures = [
    {
      title: "Content Marketing",
      description: "Blog posts, ebooks, guides that educate"
    },
    {
      title: "SEO Optimization",
      description: "Rank organically in search engines"
    },
    {
      title: "Social Media",
      description: "Engage audiences on platforms they use"
    },
    {
      title: "Webinars & Videos",
      description: "Educational content that builds trust"
    }
  ];

  const outboundFeatures = [
    {
      title: "Cold Calling",
      description: "Direct phone outreach to prospects"
    },
    {
      title: "Email Campaigns",
      description: "Targeted outreach to specific lists"
    },
    {
      title: "Paid Advertising",
      description: "PPC, display ads, sponsored content"
    },
    {
      title: "Direct Mail",
      description: "Physical outreach to decision-makers"
    }
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 mb-4 bungee-inline-regular">
            Inbound vs <span className="bg-blue-600 bg-clip-text text-transparent">Outbound</span> Lead Generation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Understanding the differences helps you build a balanced strategy that maximizes both immediate results and long-term growth
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl montserrat">Side-by-Side Comparison</CardTitle>
            <CardDescription className="montserrat">Key differences between inbound and outbound approaches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 montserrat">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">Inbound</Badge>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-purple-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600">Outbound</Badge>
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
                          <div className="text-blue-600 mt-1">{row.inboundIcon}</div>
                          <span>{row.inbound}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 montserrat">
                        <div className="flex items-start gap-2">
                          <div className="text-purple-600 mt-1">{row.outboundIcon}</div>
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
          {/* Inbound Card */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-blue-600 montserrat">Inbound Lead Generation</CardTitle>
                <Badge className="bg-blue-600">Pull Strategy</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Attract customers by offering valuable content and experiences that pull them toward your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">Key Tactics:</h4>
              <div className="space-y-3">
                {inboundFeatures.map((feature, index) => (
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
                <p className="text-sm font-semibold text-blue-900 mb-1 montserrat">Best For:</p>
                <p className="text-sm text-gray-700 montserrat">Long-term growth, building authority, and reducing cost per lead over time</p>
              </div>
            </CardContent>
          </Card>

          {/* Outbound Card */}
          <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-purple-600 montserrat">Outbound Lead Generation</CardTitle>
                <Badge className="bg-purple-600">Push Strategy</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Proactively reach out to potential customers through targeted campaigns and direct outreach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">Key Tactics:</h4>
              <div className="space-y-3">
                {outboundFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 montserrat">{feature.title}</p>
                      <p className="text-sm text-gray-600 montserrat">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-semibold text-purple-900 mb-1 montserrat">Best For:</p>
                <p className="text-sm text-gray-700 montserrat">Quick results, enterprise accounts, and targeted account penetration</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-3 montserrat">The Winning Strategy? Use Both</h3>
            <p className="text-blue-50 mb-6 max-w-2xl mx-auto montserrat">
              Companies combining inbound and outbound lead generation see 2× faster revenue growth. Let us build a hybrid strategy tailored to your business goals.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Build Your Hybrid Strategy
            </button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
