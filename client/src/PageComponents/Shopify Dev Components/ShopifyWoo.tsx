'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, TrendingUp, Target, Clock, DollarSign, Users, Zap } from "lucide-react"

export default function ShopifyVsWooCommerce() {
  const comparisonData = [
    {
      aspect: "Platform Type",
      shopify: "Fully hosted all-in-one platform. Everything managed for you—no setup required.",
      woocommerce: "Self-hosted WordPress plugin. You handle hosting, domain, security, and updates.",
      shopifyIcon: <Zap className="w-4 h-4" />,
      woocommerceIcon: <Users className="w-4 h-4" />
    },
    {
      aspect: "Ease of Setup",
      shopify: "Sign up and start selling in minutes. No technical knowledge needed.",
      woocommerce: "Requires WordPress install, hosting setup, SSL, and plugin configuration. 2-3 days minimum.",
      shopifyIcon: <Clock className="w-4 h-4" />,
      woocommerceIcon: <Clock className="w-4 h-4" />
    },
    {
      aspect: "Total Cost",
      shopify: "$25-299/month all-inclusive. Hosting, security, and support included. Predictable pricing.",
      woocommerce: "Free plugin + $4-480/month for hosting, domain ($10-20/year), themes, SSL, and plugins.",
      shopifyIcon: <DollarSign className="w-4 h-4" />,
      woocommerceIcon: <DollarSign className="w-4 h-4" />
    },
    {
      aspect: "Performance",
      shopify: "309ms average load time. Auto-scaling for traffic spikes. Enterprise-grade infrastructure.",
      woocommerce: "776ms average load time. Performance depends on your hosting quality and optimization.",
      shopifyIcon: <TrendingUp className="w-4 h-4" />,
      woocommerceIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Support",
      shopify: "24/7 phone, email, and live chat support. Issues resolved quickly by Shopify experts.",
      woocommerce: "Community forums and documentation only. No official support—rely on hosting provider or hire developers.",
      shopifyIcon: <Check className="w-4 h-4" />,
      woocommerceIcon: <X className="w-4 h-4" />
    },
    {
      aspect: "Best For",
      shopify: "Entrepreneurs wanting quick launch, hassle-free management, and reliable sales platform.",
      woocommerce: "Developers and tech-savvy users who want full control, customization, and don't mind maintenance.",
      shopifyIcon: <Check className="w-4 h-4" />,
      woocommerceIcon: <Check className="w-4 h-4" />
    }
  ];

  const woocommerceFeatures = [
    { title: "Lower initial cost", description: "Free plugin—pay only $4-20/month for basic hosting initially." },
    { title: "Full customization", description: "Access to source code and 59,000+ WordPress plugins for flexibility." },
    { title: "Advanced SEO control", description: "WordPress SEO capabilities with plugins like Yoast for deep optimization." },
    { title: "No transaction fees", description: "Use any payment gateway without platform fees (WooPayments: 2.9% + $0.30)." },
  ];

  const shopifyFeatures = [
    { title: "Launch in minutes", description: "No hosting setup, no technical configuration—start selling immediately." },
    { title: "All-inclusive platform", description: "Hosting, SSL, security, PCI compliance, and CDN included in monthly price." },
    { title: "2.5x faster performance", description: "309ms load time vs 776ms—significantly better conversion rates." },
    { title: "24/7 expert support", description: "Phone, chat, and email support plus automatic updates and monitoring." },
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
            <span className="bg-blue-600 bg-clip-text text-transparent">Shopify</span> vs WooCommerce
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Understanding the real differences between hosted e-commerce and self-hosted solutions to choose the right platform for your online store.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl montserrat">Side-by-Side Comparison</CardTitle>
            <CardDescription className="montserrat">Key differences between Shopify and WooCommerce platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 montserrat">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">Shopify</Badge>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-orange-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-600">WooCommerce</Badge>
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
                          <div className="text-blue-600 mt-1">{row.shopifyIcon}</div>
                          <span>{row.shopify}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 montserrat">
                        <div className="flex items-start gap-2">
                          <div className="text-orange-600 mt-1">{row.woocommerceIcon}</div>
                          <span>{row.woocommerce}</span>
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
          {/* Shopify Card */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-blue-600 montserrat">Why Choose Shopify</CardTitle>
                <Badge className="bg-blue-600">All-in-One</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Perfect for entrepreneurs who want to focus on selling, not managing servers and technical configurations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {shopifyFeatures.map((feature, index) => (
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
                <p className="text-sm text-gray-700 montserrat">Fast launch, hassle-free management, reliable sales platform with highest-converting checkout (36% better than WooCommerce).</p>
              </div>
            </CardContent>
          </Card>

          {/* WooCommerce Card */}
          <Card className="border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-orange-600 montserrat">When WooCommerce Makes Sense</CardTitle>
                <Badge className="bg-orange-600">Customizable</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Ideal for developers and tech-savvy users who want complete control and customization flexibility.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-3 montserrat">What you get:</h4>
              <div className="space-y-3">
                {woocommerceFeatures.map((feature, index) => (
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
                <p className="text-sm font-semibold text-orange-900 mb-1 montserrat">Hidden complexity:</p>
                <p className="text-sm text-gray-700 montserrat">Requires hosting management, security updates, performance optimization, and technical troubleshooting. No official support team.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 montserrat">
            Ready to Launch Your Shopify Store?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
            Get a professionally designed Shopify store with 309ms load time and the world's highest-converting checkout. Launch in 2-8 weeks.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Start Your Shopify Project
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
