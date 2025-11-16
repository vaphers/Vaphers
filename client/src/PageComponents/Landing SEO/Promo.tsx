import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PromoFiller() {
  return (
    <section className="relative w-full lg:mt-6">
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
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:pt-15 lg:pb-26 max-w-7xl mx-auto">
        {/* Left Side - Title */}
        <div className="w-full lg:w-2/5">
          <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
            Maximize Growth with SEO + PPC
          </h3>
          <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
          
          {/* CTA Button */}
          <Link href="https://www.vaphers.com/contact">
            <Button 
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
            >
              Get Your Free Strategy »
            </Button>
          </Link>
        </div>

        {/* Right Side - Description */}
        <div className="w-full lg:w-3/5 space-y-6">
          <p className="text-lg text-[#1a3d5c] leading-relaxed">
            <span className="font-semibold">
              <a href="https://www.vaphers.com" className="text-blue-600 underline font-medium hover:text-blue-700">
                Vaphers
              </a>
            </span>{' '}combines SEO and{' '}
            <a href="https://www.vaphers.com/ppc-marketing" className="text-blue-600 underline font-medium hover:text-blue-700">
              PPC marketing
            </a>
            {' '}to deliver both immediate traffic and long-term growth. While PPC generates instant visibility and an average $8 ROI for every $1 spent on Google Ads, SEO builds sustainable organic rankings that drive traffic without ongoing ad costs. Together, they capture 65% of total traffic and create a resilient digital presence.
          </p>
          
          <p className="text-lg text-[#1a3d5c] leading-relaxed">
            Use PPC for quick wins, product launches, promotions, and competitive keywords, while SEO builds lasting authority that compounds over time. This dual-channel approach reduces cost per acquisition, maximizes SERP visibility, and ensures your business dominates search results. With 70% of users trusting organic listings over ads, combining both strategies delivers superior ROI and sustainable competitive advantage.
          </p>
        </div>
      </div>
    </section>
  )
}
