import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, AlertTriangle, Link2, Clock, Target, TrendingDown } from "lucide-react"

export default function SEOStrategiesComparison() {
  const strategies = [
    {
      title: "White Hat SEO",
      subtitle: "Ethical & Sustainable Optimization",
      description: "White Hat SEO follows search engine guidelines and focuses on providing genuine value to users. It prioritizes high-quality content, natural link building, and technical optimization for long-term, sustainable rankings that build authority and trust.",
      features: [
        { icon: Clock, label: "Timeline", value: "3-6 months", detail: "Slow but sustainable growth with lasting results" },
        { icon: ShieldCheck, label: "Risk Level", value: "Zero risk", detail: "Fully complies with Google's guidelines" },
        { icon: TrendingDown, label: "Results", value: "Long-term stability", detail: "Rankings grow and compound over time" },
        { icon: Target, label: "Best For", value: "Brand building", detail: "Businesses prioritizing credibility and authority" }
      ],
      badge: "Recommended",
    },
    {
      title: "Black Hat SEO",
      subtitle: "Manipulative & High-Risk Tactics",
      description: "Black Hat SEO uses deceptive practices that violate search engine guidelines to achieve quick rankings. Includes keyword stuffing, cloaking, link schemes, hidden text, and content automation. While results appear fast, penalties can destroy your online presence permanently.",
      features: [
        { icon: Clock, label: "Timeline", value: "Days to weeks", detail: "Immediate but temporary ranking spikes" },
        { icon: AlertTriangle, label: "Risk Level", value: "Extremely high", detail: "Risk of permanent Google penalties or bans" },
        { icon: TrendingDown, label: "Results", value: "Short-lived", detail: "Rankings collapse when caught by algorithms" },
        { icon: Target, label: "Avoid For", value: "Legitimate business", detail: "Damages reputation and destroys long-term value" }
      ],
      badge: "Not Recommended",
    },
    {
      title: "Parasite SEO",
      subtitle: "Authority Site Piggyback Strategy",
      description: "Parasite SEO (also called Barnacle or Piggyback SEO) involves publishing content on high-authority third-party platforms like Medium, LinkedIn, or major news sites to rank quickly by leveraging their existing domain authority instead of building your own.",
      features: [
        { icon: Clock, label: "Timeline", value: "1-4 weeks", detail: "Faster than white hat, leverages existing authority" },
        { icon: Link2, label: "Risk Level", value: "Medium risk", detail: "Platform-dependent, subject to their rules changes" },
        { icon: TrendingDown, label: "Results", value: "Platform-reliant", detail: "You don't own the content or traffic channel" },
        { icon: Target, label: "Best For", value: "Quick visibility", detail: "Affiliates, initial brand awareness, testing markets" }
      ],
      badge: "Gray Area",
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
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 mb-4 bungee-inline-regular">
            White Hat vs <span className="bg-blue-600 bg-clip-text text-transparent">Black Hat</span> vs Parasite SEO
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Understanding the differences between ethical, manipulative, and authority-leveraging SEO strategies. Choose the approach that aligns with your business goals and risk tolerance.
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
                      <CardTitle className="text-3xl font-bold text-gray-900 bungee-inline-regular">
                        {strategy.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-semibold text-gray-500 montserrat">
                        {strategy.subtitle}
                      </CardDescription>
                    </div>
                    {strategy.badge && (
                      <Badge 
                        className={`whitespace-nowrap ml-2 montserrat ${
                          strategy.badge === "Recommended" 
                            ? "bg-green-100 text-green-700" 
                            : strategy.badge === "Not Recommended"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
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
              <h4 className="text-2xl font-bold text-gray-900 mb-3 bungee-inline-regular">
                We Only Practice White Hat SEO Strategies
              </h4>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
                At Vaphers, we build sustainable SEO foundations using only ethical, Google-approved strategies that deliver long-term results. 
                While black hat may promise quick wins, it risks permanent penalties. We focus on quality content, legitimate link building, and technical excellence that compounds over time.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 montserrat">
                Get Ethical SEO Strategy
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
