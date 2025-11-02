import { Button } from "@/components/ui/button"

export default function LeadGenerationAgencySection() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:py-8 lg:pt-20 max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h4 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          Expert Lead Generation Agency
        </h4>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
        
        {/* button */}
        <Button 
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
        >
          Get Your Free Lead Generation Audit »
        </Button>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-4">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          <span className="font-semibold">We deliver qualified, sales-ready leads</span> through targeted SEO, Google Ads, LinkedIn marketing, and strategic content. Whether B2B SaaS, services, or enterprise sales—we fill your pipeline with high-intent prospects actively seeking solutions.
        </p>
        
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Our services include PPC campaigns, account-based marketing (ABM), lead scoring systems, and multi-channel nurturing. We focus on quality over quantity with transparent ROI tracking, real-time optimization, and dedicated support that turns marketing spend into measurable revenue growth.
        </p>
      </div>
    </section>
  )
}
