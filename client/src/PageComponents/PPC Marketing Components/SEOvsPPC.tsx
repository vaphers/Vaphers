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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular mb-4">
          <span className="bg-blue-600 bg-clip-text text-transparent">SEO vs PPC:</span> What&apos;s Best For You?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Understand which strategy aligns with your budget, timeline, and growth goals.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* SEO Card */}
        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-semibold text-gray-900">SEO</CardTitle>
              <Badge variant="outline" className="rounded-full border-emerald-500 text-emerald-700">
                Long‑term
              </Badge>
            </div>
            <p className="text-sm text-gray-600">Search Engine Optimization</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-700 text-sm sm:text-base">
              SEO builds durable visibility by increasing organic traffic, improving brand trust, and securing top search positions over time.
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key benefits</h4>
              <ul className="space-y-2">
                {[
                  "Sustainable long-term growth",
                  "Lower cost per visit at scale",
                  "Builds brand authority in your niche",
                  "Consistent, high‑intent traffic",
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs sm:text-sm text-gray-600">
              <p>
                <span className="font-semibold">Typical timeline:</span> 3–6 months to see meaningful lift
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PPC Card */}
        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-2xl font-semibold text-gray-900">PPC</CardTitle>
              <Badge variant="outline" className="rounded-full border-indigo-500 text-indigo-700">
                Short‑term
              </Badge>
            </div>
            <p className="text-sm text-gray-600">Pay‑Per‑Click Advertising</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-700 text-sm sm:text-base">
              PPC drives immediate visibility and leads by placing paid ads above organic results, with tight control over spend and targeting.
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key benefits</h4>
              <ul className="space-y-2">
                {[
                  "Traffic and leads from day one",
                  "Precise control over budget",
                  "Granular audience and keyword targeting",
                  "Clear, measurable performance data",
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs sm:text-sm text-gray-600">
              <p>
                <span className="font-semibold">Typical timeline:</span> results within hours to days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional comparison table */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            At a glance
          </h3>
          <p className="hidden sm:block text-xs text-gray-500">
            Use this to match each channel to your priorities.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Aspect
                </th>
                <th className="py-3 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                  SEO
                </th>
                <th className="py-3 px-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                  PPC
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 align-top font-medium text-gray-800">
                  Speed
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Gradual; momentum builds over months.
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Immediate visibility once campaigns launch.
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 align-top font-medium text-gray-800">
                  Cost model
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Upfront effort; no fee per organic click.
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Pay per click; costs fluctuate with competition.
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 align-top font-medium text-gray-800">
                  Longevity
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Rankings can drive traffic for months or years.
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Traffic stops when you pause spend.
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 align-top font-medium text-gray-800">
                  Control
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Strong control over content and technical setup.
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  High control over bids, audiences, and placements.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 align-top font-medium text-gray-800">
                  Best fit
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Brands focused on long‑term, compounding growth.
                </td>
                <td className="py-3 px-4 align-top text-gray-700">
                  Launches, offers, and short‑term demand capture.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendation */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="py-6">
          <p className="text-gray-800 text-sm sm:text-base">
            <span className="font-semibold">Practical approach:</span> use PPC to test offers and generate short‑term results, while SEO compounds in the background to lower acquisition costs over time.
          </p>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default SeoVsPpc;
