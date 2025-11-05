import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, TrendingUp, DollarSign, Target, Search } from "lucide-react"

export default function NextVsWpVsShopify() {
  const strategies = [
    {
      title: "Next.js",
      subtitle: "Modern Website Framework",
      description:
        "Best for fast, SEO-friendly business sites and landing pages that need full control over design, speed, and growth.",
      features: [
        { icon: Zap, label: "Speed", value: "Loads fast", detail: "Great performance on mobile and desktop" },
        { icon: Search, label: "SEO", value: "Strong by default", detail: "Built to rank with clean code and structure" },
        { icon: DollarSign, label: "Cost", value: "Flexible", detail: "One-time build; pay only for what you need" },
        { icon: Target, label: "Best For", value: "Leads & conversions", detail: "Service sites, campaigns, and scaling content" },
      ],
      badge: "Business Ready",
    },
    {
      title: "WordPress",
      subtitle: "Blog & CMS Platform",
      description:
        "Great for blogs and content-heavy sites with easy editing. Plugins add features, but can slow down if overloaded.",
      features: [
        { icon: Clock, label: "Timeline", value: "Quick setup", detail: "Templates help launch faster" },
        { icon: DollarSign, label: "Cost", value: "Plugin-based", detail: "May add costs for themes, plugins, and upkeep" },
        { icon: TrendingUp, label: "Growth", value: "Good for content", detail: "Ideal for frequent publishing" },
        { icon: Target, label: "Best For", value: "Blogs & simple sites", detail: "Marketing pages with easy editing" },
      ],
      badge: "Popular Choice",
    },
    {
      title: "Shopify",
      subtitle: "Hosted Ecommerce Platform",
      description:
        "Purpose-built for online stores with payments, inventory, and apps included. Easy to run, subscription-based.",
      features: [
        { icon: Zap, label: "Speed", value: "Reliable hosting", detail: "Scales during traffic spikes" },
        { icon: DollarSign, label: "Cost", value: "Monthly + apps", detail: "Simple pricing; app fees can add up" },
        { icon: TrendingUp, label: "Sales", value: "Store-first features", detail: "Checkout, shipping, taxes, and POS" },
        { icon: Target, label: "Best For", value: "Online stores", detail: "Sell products fast with less setup" },
      ],
      badge: "Ecommerce",
    },
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

      {/* Content with z-index */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 mb-4 bungee-inline-regular">
            Next.js vs WordPress vs <span className="bg-blue-600 bg-clip-text text-transparent">Shopify</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            A simple guide to help you pick the right platform for speed, SEO, and sales—without the tech talk.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => {
            return (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-bold text-gray-900 montserrat">
                      {strategy.title}
                    </CardTitle>
                    {strategy.badge && <Badge className="bg-blue-600">{strategy.badge}</Badge>}
                  </div>
                  <CardDescription className="text-sm font-semibold text-gray-500 montserrat">
                    {strategy.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed montserrat">
                    {strategy.description}
                  </p>

                  <div className="space-y-4">
                    {strategy.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="mt-1">
                            <FeatureIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm montserrat">
                              {feature.label}: <span className="font-normal text-gray-700">{feature.value}</span>
                            </p>
                            <p className="text-xs text-gray-500 montserrat mt-0.5">
                              {feature.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 montserrat">
                Need a clear recommendation?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
                Choose Next.js for speed and SEO-focused lead generation, WordPress for content-first sites, and Shopify for online stores with built-in checkout.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Get affordable Next.js development
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
