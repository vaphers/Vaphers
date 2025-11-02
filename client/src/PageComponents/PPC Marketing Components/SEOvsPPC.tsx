'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';

const SeoVsPpc: React.FC = () => (
  <section className="w-full py-16 relative overflow-hidden bg-gray-50">
    {/* Dashed Grid Background */}
    <div
      className="absolute inset-0 z-0 pointer-events-none"
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
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular mb-4">
           <span className="bg-blue-600 bg-clip-text text-transparent">SEO vs PPC:</span> What's Best For You?  
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understand which strategy works best for your goals
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* SEO Card */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">SEO</CardTitle>
              <Badge variant="outline">Long-term</Badge>
            </div>
            <p className="text-sm text-gray-600">Search Engine Optimization</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-700">
              SEO builds lasting online presence by increasing organic traffic, improving brand trust, and earning top search rankings. It's cost-effective and strengthens your online reputation.
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
              <ul className="space-y-2">
                {[
                  "Sustainable long-term growth",
                  "Lower cost per visit",
                  "Builds brand authority",
                  "Continuous quality traffic"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Timeline:</span> 3-6 months for results
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PPC Card */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">PPC</CardTitle>
              <Badge variant="outline">Immediate</Badge>
            </div>
            <p className="text-sm text-gray-600">Pay-Per-Click Advertising</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-700">
              PPC delivers instant traffic and targeted leads by running paid ads on search engines. You control your budget, audience, and see immediate measurable results.
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
              <ul className="space-y-2">
                {[
                  "Immediate traffic and leads",
                  "Full budget control",
                  "Precise targeting",
                  "Measurable ROI"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Timeline:</span> Results within hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="py-6">
          <p className="text-gray-800">
            <span className="font-semibold">Best approach?</span> Combine both strategies. Use PPC for immediate results while you build organic authority through SEO for long-term growth.
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default SeoVsPpc;
