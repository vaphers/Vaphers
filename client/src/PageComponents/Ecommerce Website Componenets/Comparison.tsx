'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Check, X, TrendingUp, Target, Clock, DollarSign, Users, Zap } from "lucide-react"

export default function EcommerceVsNon() {
  const comparisonData = [
    {
      aspect: "Availability",
      inbound: "Limited to store hours—typically 8-10 hours a day. Closed on holidays.",
      outbound: "Open 24/7 for customers worldwide. Never misses a sale opportunity.",
      inboundIcon: <Clock className="w-4 h-4" />,
      outboundIcon: <Zap className="w-4 h-4" />
    },
    {
      aspect: "Operating Costs",
      inbound: "High rent, utilities, staff salaries, and inventory space drive up expenses.",
      outbound: "Lower overhead—no rent or physical store costs. More budget for marketing.",
      inboundIcon: <DollarSign className="w-4 h-4" />,
      outboundIcon: <DollarSign className="w-4 h-4" />
    },
    {
      aspect: "Market Reach",
      inbound: "Limited to local area or region. Requires multiple locations to expand.",
      outbound: "Global reach from day one. Sell across cities, states, and countries easily.",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Product Selection",
      inbound: "Restricted by shelf space. Limited inventory and product variety.",
      outbound: "Unlimited catalog potential. Offer thousands of products without physical constraints.",
      inboundIcon: <Target className="w-4 h-4" />,
      outboundIcon: <TrendingUp className="w-4 h-4" />
    },
    {
      aspect: "Customer Data",
      inbound: "Hard to track buying patterns. Limited insights into customer preferences.",
      outbound: "Rich analytics on every visitor. Data-driven decisions for better marketing.",
      inboundIcon: <Users className="w-4 h-4" />,
      outboundIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Scaling",
      inbound: "Expensive to grow. Requires new locations, more staff, and higher investment.",
      outbound: "Easy to scale. Add products and serve more customers without major costs.",
      inboundIcon: <Clock className="w-4 h-4" />,
      outboundIcon: <Zap className="w-4 h-4" />
    }
  ];

  const noEcommerceFeatures = [
    { title: "Physical interaction", description: "Customers can touch and try products before buying." },
    { title: "Instant gratification", description: "Take products home immediately without waiting for delivery." },
    { title: "Personal service", description: "Face-to-face assistance from store staff." },
    { title: "No shipping concerns", description: "No delivery delays or damaged packages to worry about." },
  ];

  const ecommerceFeatures = [
    { title: "24/7 Sales", description: "Your store never closes—earn revenue even while you sleep." },
    { title: "Lower Costs", description: "No rent or utilities. Save 60-70% on operational expenses." },
    { 
      title: "Global Customers", 
      description: (
        <>
          Reach buyers anywhere in the world and generate qualified{' '}
          <Link 
            href="/ppc-marketing/lead-generation-services" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            leads online
          </Link>
          .
        </>
      )
    },
    { title: "Smart Growth", description: "Use data to understand customers and make better decisions." },
  ];

  return (
    <div className="min-h-screen w-full relative">
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
            Ecommerce Store vs <span className="bg-blue-600 bg-clip-text text-transparent">Traditional Store</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Discover how an online store transforms your business with lower costs, global reach, and 24/7 sales, all optimized with{' '}
            <Link 
              href="/seo-services/technical-seo-services" 
              className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
            >
              technical SEO best practices
            </Link>
            {' '}for maximum visibility.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl montserrat">Side-by-Side Comparison</CardTitle>
            <CardDescription className="montserrat">Clear differences between traditional and ecommerce business models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 montserrat">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">No Ecommerce</Badge>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-purple-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600">With Ecommerce</Badge>
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
          {/* Traditional Store Card */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-blue-600 montserrat">Traditional Store Benefits</CardTitle>
                <Badge className="bg-blue-600">Physical Presence</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Brick-and-mortar stores offer tangible experiences but come with higher costs and limited reach.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {noEcommerceFeatures.map((feature, index) => (
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
                <p className="text-sm font-semibold text-blue-900 mb-1 montserrat">Reality check:</p>
                <p className="text-sm text-gray-700 montserrat">High rent, limited hours, and local-only customers restrict growth potential significantly.</p>
              </div>
            </CardContent>
          </Card>

          {/* Ecommerce Card */}
          <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-purple-600 montserrat">Ecommerce Store Advantages</CardTitle>
                <Badge className="bg-purple-600">Future Ready</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Online stores operate 24/7 with global reach, lower costs, and unlimited growth potential.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {ecommerceFeatures.map((feature, index) => (
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
                <p className="text-sm text-gray-700 montserrat">Businesses ready to scale affordably, reach more customers, and compete in the digital economy.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
