'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, TrendingUp, Target, Clock, DollarSign, Users, Zap } from "lucide-react"

export default function ReactVsNext() {
  const comparisonData = [
    {
      aspect: "What it is",
      inbound: "A library for building website parts (buttons, sections, pages). You control everything else.",
      outbound: "A full framework to build complete websites faster with built‑in tools.",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Speed & SEO",
      inbound: "Great for apps, but SEO and first load need extra setup.",
      outbound: "Loads fast and is Google‑friendly out of the box, which helps rankings.",
      inboundIcon: <TrendingUp className="w-4 h-4" />,
      outboundIcon: <TrendingUp className="w-4 h-4" />
    },
    {
      aspect: "Cost & timeline",
      inbound: "More custom work = more time and budget in many cases.",
      outbound: "Faster to launch because many features are built in, keeping costs lower.",
      inboundIcon: <DollarSign className="w-4 h-4" />,
      outboundIcon: <DollarSign className="w-4 h-4" />
    },
    {
      aspect: "Content websites",
      inbound: "Needs extra tools to perform well for blogs and service pages.",
      outbound: "Perfect for blogs, service pages, and landing pages that need SEO.",
      inboundIcon: <Clock className="w-4 h-4" />,
      outboundIcon: <Zap className="w-4 h-4" />
    },
    {
      aspect: "Scalability",
      inbound: "Flexible, but requires more setup as the site grows.",
      outbound: "Scales smoothly with routing, images, and caching already handled.",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Best fit",
      inbound: "Custom web apps where SEO isn’t the main goal.",
      outbound: "Business websites that want traffic, leads, and fast performance.",
      inboundIcon: <Check className="w-4 h-4" />,
      outboundIcon: <Check className="w-4 h-4" />
    }
  ];

  const reactFeatures = [
    { title: "Complete control", description: "Pick every tool yourself for total flexibility." },
    { title: "Great for web apps", description: "Ideal when SEO is less important than app features." },
    { title: "Large ecosystem", description: "Many options for state, routing, and data—but you choose." },
    { title: "Custom builds", description: "More setup time to match your exact needs." },
  ];

  const nextFeatures = [
    { title: "SEO‑ready", description: "Server‑rendered pages that search engines love." },
    { title: "Fast by default", description: "Optimized images, caching, and routing included." },
    { title: "Quicker launch", description: "Less setup, more outcomes—great for timelines." },
    { title: "Built for growth", description: "Perfect for scaling content and landing pages." },
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
            React JS vs <span className="bg-blue-600 bg-clip-text text-transparent">Next JS</span> for Your Website
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            A simple guide to help you choose the right option for speed, SEO, and results—no tech jargon.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl montserrat">Side-by-Side Comparison</CardTitle>
            <CardDescription className="montserrat">Clear differences between React JS and Next JS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 montserrat">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">React JS</Badge>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-purple-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600">Next JS</Badge>
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
          {/* React Card */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-blue-600 montserrat">When React JS Makes Sense</CardTitle>
                <Badge className="bg-blue-600">Flexible Choice</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Ideal for custom web apps where SEO is not the top priority and you want full control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {reactFeatures.map((feature, index) => (
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
                <p className="text-sm text-gray-700 montserrat">Dashboards, internal tools, and product UIs where search traffic isn’t critical.</p>
              </div>
            </CardContent>
          </Card>

          {/* Next Card */}
          <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-purple-600 montserrat">When Next JS Wins</CardTitle>
                <Badge className="bg-purple-600">Business Ready</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Perfect for business websites that need fast load times, strong SEO, and quick go‑to‑market.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {nextFeatures.map((feature, index) => (
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
                <p className="text-sm font-semibold text-purple-900 mb-1 montserrat">Best for:</p>
                <p className="text-sm text-gray-700 montserrat">Service sites, blogs, and landing pages that need organic traffic and conversions.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
