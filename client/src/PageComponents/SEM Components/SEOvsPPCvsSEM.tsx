import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, TrendingUp, DollarSign, Target, Search } from "lucide-react"

export default function SEOvsPPCvsSEM() {
  const strategies = [
    {
      title: "SEO",
      subtitle: "Search Engine Optimization",
      description: "Organic search strategy focused on improving website rankings through content optimization, technical improvements, and link building.",
      features: [
        { icon: Clock, label: "Timeline", value: "3-6 months for results", detail: "Long-term investment with cumulative growth" },
        { icon: DollarSign, label: "Cost Model", value: "No cost per click", detail: "Investment in content and optimization" },
        { icon: TrendingUp, label: "Sustainability", value: "Long-lasting results", detail: "Continues even after efforts pause" },
        { icon: Target, label: "Best For", value: "Long-term growth", detail: "Building brand authority and trust" }
      ],
    },
    {
      title: "PPC",
      subtitle: "Pay-Per-Click Advertising",
      description: "Paid advertising model where you pay each time someone clicks your ad, appearing at the top of search results instantly.",
      features: [
        { icon: Clock, label: "Timeline", value: "Immediate results", detail: "Traffic starts as soon as campaign launches" },
        { icon: DollarSign, label: "Cost Model", value: "Pay per click", detail: "Budget controlled, costs vary by keyword" },
        { icon: TrendingUp, label: "Sustainability", value: "Stops when budget ends", detail: "Traffic ceases when ads are paused" },
        { icon: Target, label: "Best For", value: "Quick wins", detail: "Product launches and promotions" }
      ],
      badge: "Paid Traffic",
    },
    {
      title: "SEM",
      subtitle: "Search Engine Marketing",
      description: "Comprehensive umbrella strategy combining both SEO and PPC to maximize search visibility through paid and organic methods.",
      features: [
        { icon: Clock, label: "Timeline", value: "Immediate + Long-term", detail: "Best of both worlds approach" },
        { icon: DollarSign, label: "Cost Model", value: "Mixed investment", detail: "Paid ads + organic optimization" },
        { icon: TrendingUp, label: "Sustainability", value: "Balanced results", detail: "Continuous visibility across channels" },
        { icon: Target, label: "Best For", value: "Maximum visibility", detail: "Dominating search results completely" }
      ],
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

      {/* Content with z-index */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 mb-4 bungee-inline-regular">
            SEO vs PPC vs <span className="bg-blue-600 bg-clip-text text-transparent">SEM</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Understanding the differences between these strategies helps you choose the right approach for your business goals
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
                  <CardTitle className="text-3xl font-bold text-gray-900 montserrat">
                    {strategy.title}
                  </CardTitle>
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
                Not Sure Which Strategy to Choose?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
                Most successful businesses use a combination of SEO and PPC (SEM) to maximize visibility and ROI. 
                We'll help you determine the best mix for your goals.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Get a Free Strategy Consultation
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
