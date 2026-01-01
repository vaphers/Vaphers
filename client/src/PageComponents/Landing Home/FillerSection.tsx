import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeFiller() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:pb-16 max-w-7xl mx-auto">
      
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h4 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-600 leading-tight bungee-inline-regular">
          Top-Rated <br /> AI SEO<br /> Agency
        </h4>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
        
        {/* button */}
        <Link href={"/contact"}>
          <Button 
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
          >
            Get a Free SEO Audit »
          </Button>
        </Link>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          <span className="font-semibold">Vaphers</span> is a leading AI SEO company helping businesses scale organic growth through advanced data modeling, search intent analysis, and automation-driven optimization. We focus on aligning AI-powered insights with real user behavior to improve search visibility and long-term performance.
        </p>

        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          As a trusted <span className="font-medium">best AI SEO agency</span>, we use intelligent algorithms and real-time data to improve rankings, attract high-intent traffic, and deliver measurable outcomes through modern{' '}
          <a
            href="https://vaphers.com/seo-services/ai-seo-services"
            className="text-blue-700 underline hover:text-blue-800 font-medium"
          >
            AI SEO services
          </a>
          .
        </p>
      </div>

    </section>
  )
}
