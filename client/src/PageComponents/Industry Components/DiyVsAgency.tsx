'use client'


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, TrendingUp, Target, Clock, DollarSign, Users, Zap } from "lucide-react"


export default function SeoAgencyVsDiy() {
  const comparisonData = [
    {
      aspect: "Expertise & Skills",
      agency: "Access to a team of specialists with proven experience and diverse skill sets.",
      diy: "Self-taught knowledge, which can lead to mistakes and a steep learning curve.",
      agencyIcon: <Users className="w-4 h-4" />,
      diyIcon: <Zap className="w-4 h-4" />
    },
    {
      aspect: "Time Commitment",
      agency: "Frees up your internal team to focus on core business operations.",
      diy: "Requires a significant and consistent time investment to learn and execute.",
      agencyIcon: <Clock className="w-4 h-4" />,
      diyIcon: <Clock className="w-4 h-4" />
    },
    {
      aspect: "Total Cost",
      agency: "Higher initial investment, but can offer a better long-term ROI.",
      diy: "Lower initial cost, but can lead to expensive mistakes and slower results.",
      agencyIcon: <DollarSign className="w-4 h-4" />,
      diyIcon: <DollarSign className="w-4 h-4" />
    },
    {
      aspect: "Tools & Technology",
      agency: "Access to premium, expensive SEO tools for in-depth analysis and reporting.",
      diy: "Limited to free or low-cost tools, which may not provide comprehensive insights.",
      agencyIcon: <TrendingUp className="w-4 h-4" />,
      diyIcon: <Target className="w-4 h-4" />
    },
    {
      aspect: "Strategy & Control",
      agency: "Less direct control, as you are relying on the agency's strategy and process.",
      diy: "Full control over strategy and implementation, allowing for quick adjustments.",
      agencyIcon: <X className="w-4 h-4" />,
      diyIcon: <Check className="w-4 h-4" />
    },
    {
      aspect: "Best For",
      agency: "Businesses in competitive markets that need predictable progress and strategic accountability.",
      diy: "Individuals or businesses with tight budgets, a willingness to learn, and in less competitive markets.",
      agencyIcon: <Check className="w-4 h-4" />,
      diyIcon: <Check className="w-4 h-4" />
    }
  ];


  const diyFeatures = [
    { title: "Complete Control", description: "You have the final say on all strategies and can pivot quickly based on what you learn." },
    { title: "Lower Upfront Costs", description: "Avoid agency retainers and fees by investing your own time instead of money." },
    { title: "Deep Business Knowledge", description: "No one knows your business and customers better than you, allowing for highly relevant content." },
    { title: "Valuable Skill Development", description: "Learning SEO is a valuable skill that can benefit your business in the long run." },
  ];


  const agencyFeatures = [
    { title: "Expert Strategy & Execution", description: "Leverage the knowledge of experienced professionals to get results faster." },
    { title: "Access to Advanced Tools", description: "Benefit from insights from enterprise-level SEO tools you wouldn't typically pay for." },
    { title: "Time Savings for Your Team", description: "Allows your team to focus on core business functions instead of learning SEO from scratch." },
    { title: "Proven, Data-Driven Results", description: "Agencies use tested strategies and data to make decisions, leading to a higher likelihood of success." },
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
            <span className="bg-blue-600 bg-clip-text text-transparent">Hiring an SEO Agency</span> vs DIY
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto montserrat">
            Choosing the right approach to search engine optimization is crucial for your online success. Understand the key differences to make the best decision for your business.
          </p>
        </div>


        {/* Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl montserrat">Side-by-Side Comparison</CardTitle>
            <CardDescription className="montserrat">Key differences between hiring an SEO agency and doing it yourself.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 montserrat">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600">SEO Agency</Badge>
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-orange-600 montserrat">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-600">DIY</Badge>
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
                          <div className="text-blue-600 mt-1">{row.agencyIcon}</div>
                          <span>{row.agency}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 montserrat">
                        <div className="flex items-start gap-2">
                          <div className="text-orange-600 mt-1">{row.diyIcon}</div>
                          <span>{row.diy}</span>
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
          {/* Agency Card */}
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-blue-600 montserrat">Why Hire an Agency</CardTitle>
                <Badge className="bg-blue-600">Expertise</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Ideal for businesses that want to leverage expert knowledge and save time to focus on their core operations.
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
                <p className="text-sm text-gray-700 montserrat">Established businesses in competitive markets looking for a faster, more reliable path to SEO success.</p>
              </div>
            </CardContent>
          </Card>


          {/* DIY Card */}
          <Card className="border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl text-orange-600 montserrat">When DIY Makes Sense</CardTitle>
                <Badge className="bg-orange-600">Full Control</Badge>
              </div>
              <CardDescription className="text-base montserrat">
                Perfect for those with a limited budget but a lot of time to invest in learning and executing SEO firsthand.
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
                <p className="text-sm font-semibold text-orange-900 mb-1 montserrat">Hidden complexity:</p>
                <p className="text-sm text-gray-700 montserrat">SEO is a long-term commitment that requires ongoing learning, testing, and patience. Results are not guaranteed and mistakes can be costly.</p>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 montserrat">
            Ready to Improve Your SEO?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto montserrat">
            Whether you choose to hire an agency or do it yourself, taking the first step is key. Start your journey to the top of the search results today.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Start Your SEO Project
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
