import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, TrendingUp, DollarSign, Target, Search } from "lucide-react"


export default function GoogleAdsComparison() {
  const strategies = [
    {
      title: "Google Search Ads",
      subtitle: "High-Intent Keyword Targeting",
      description: "Capture users actively searching for your products or services with text ads displayed at the top of Google Search results. Perfect for converting ready-to-buy customers.",
      features: [
        { icon: Clock, label: "Speed", value: "Immediate traffic", detail: "Results start within hours of campaign launch" },
        { icon: DollarSign, label: "Cost Model", value: "$2.69 avg CPC", detail: "Pay per click, full budget control" },
        { icon: TrendingUp, label: "Conversion Rate", value: "3.75% average", detail: "Highest conversion rate of all channels" },
        { icon: Target, label: "Best For", value: "Direct conversions", detail: "e-commerce, services, immediate sales" }
      ],
    },
    {
      title: "Performance Max",
      subtitle: "AI-Powered Multi-Channel Campaigns",
      description: "Let Google's AI automatically optimize your ads across Search, YouTube, Display, Shopping, Gmail, and Maps. Set your goal and let machine learning handle the rest.",
      features: [
        { icon: Clock, label: "Setup Time", value: "Quick to launch", detail: "Minimal manual optimization required" },
        { icon: DollarSign, label: "Cost Model", value: "$0.68 avg CPC", detail: "Lower CPC through AI optimization" },
        { icon: TrendingUp, label: "Reach", value: "All Google channels", detail: "Spans 7 different advertising platforms" },
        { icon: Target, label: "Best For", value: "Scale & growth", detail: "Multiple products, diverse audiences" }
      ],
      badge: "AI-Powered",
    },
    {
      title: "YouTube Ads",
      subtitle: "Video-Based Brand Awareness",
      description: "Reach users with engaging video content on YouTube, building brand awareness and driving consideration. Ideal for storytelling and establishing brand presence.",
      features: [
        { icon: Clock, label: "Impact", value: "Brand building", detail: "Long-term awareness and consideration" },
        { icon: DollarSign, label: "Cost Model", value: "$0.026 avg CPV", detail: "Cost per view, very budget-friendly" },
        { icon: TrendingUp, label: "Conversion Rate", value: "1.85% average", detail: "Lower but brand-focused impact" },
        { icon: Target, label: "Best For", value: "Brand awareness", detail: "Storytelling, video content, education" }
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
            Google Search Ads vs <span className="bg-blue-600 bg-clip-text text-transparent">Performance Max</span> vs YouTube
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Each Google advertising channel serves different goals. Compare conversion rates, costs, and best use cases to maximize your ad ROI.
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
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900 montserrat">
                        {strategy.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-semibold text-gray-500 montserrat">
                        {strategy.subtitle}
                      </CardDescription>
                    </div>
                    {strategy.badge && (
                      <Badge className="bg-blue-100 text-blue-700 whitespace-nowrap ml-2 montserrat">
                        {strategy.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed montserrat text-sm">
                    {strategy.description}
                  </p>
                  
                  <div className="space-y-4">
                    {strategy.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="mt-1">
                            <FeatureIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
                Combine All Three for Maximum Results
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
                Top-performing businesses use Google Search Ads for direct conversions, Performance Max for scaling across channels, and YouTube Ads for brand building. 
                We'll help you balance all three for optimal lead generation and revenue growth.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 montserrat">
                Get a Free Google Ads Strategy
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
