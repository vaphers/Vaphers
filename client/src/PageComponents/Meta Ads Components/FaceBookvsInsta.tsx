'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FacebookVsInstagramAds: React.FC = () => (
  <section className="w-full py-12 relative overflow-hidden bg-gray-50">
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

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <h3 className="text-4xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular text-center mb-10">
        Facebook Ads vs Instagram Ads: <span className="bg-blue-600 bg-clip-text text-transparent">Which Drives Better Results?</span>
      </h3>

      <div className="md:flex md:gap-8 md:items-stretch">
        {/* Facebook Ads */}
        <Card className="flex flex-col justify-between bg-white shadow-lg rounded-xl border border-gray-200 flex-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-500 text-center">
              FACEBOOK ADS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Facebook provides wide reach across age groups with varied placements like Feed, Marketplace, Video, Messenger, and Right Column, making it reliable for cost‑efficient clicks and scalable lead generation across mixed demographics.
            </p>
            <p className="text-gray-700">
              Choose Facebook for detailed targeting, longer‑form education, and multi‑step funnels in B2B or services where decision‑ready audiences respond well to traffic, lead, and conversion objectives.
            </p>
          </CardContent>
        </Card>

        {/* Instagram Ads */}
        <Card className="flex flex-col justify-between bg-white shadow-lg rounded-xl border border-gray-200 flex-1 mt-8 md:mt-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-500 text-center">
              INSTAGRAM ADS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Instagram is visual‑first with strong engagement across Feed, Stories, Explore, and Reels, making it ideal for rapid discovery, brand recall, and creative storytelling that resonates with younger and trend‑oriented audiences.
            </p>
            <p className="text-gray-700">
              Choose Instagram for D2C and launches where aesthetics matter, using short‑form video and immersive formats to spark awareness and intent before retargeting to convert with broader mixed placements.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-gray-800">
          Run cross‑placement campaigns: lean Instagram for awareness and engagement, and lean Facebook for efficient clicks and conversions, then shift budget to the best‑performing objectives by real campaign data.
        </p>
      </div>
    </div>
  </section>
);

export default FacebookVsInstagramAds;
