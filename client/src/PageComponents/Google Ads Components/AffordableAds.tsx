import { Button } from "@/components/ui/button"

export default function AffordableAds() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:py-8  max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          Affordable Google Ads Management Services
        </h3>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>

        {/* button */}
        <Button
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
        >
          Get Your Free Website Audit »
        </Button>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          <span className="font-semibold">Vaphers</span> specializes in affordable Google Ads management designed to drive highly targeted traffic, increase conversions, and maximize your advertising ROI. Our expert team crafts and optimizes campaigns that put your business in front of customers actively searching for your products and services.
        </p>
        
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          From keyword research and ad copywriting to ongoing bid management and detailed performance reporting, we handle every aspect of your Google Ads campaigns with a data-driven approach. Partner with us to unlock the full potential of pay-per-click advertising and grow your business efficiently and effectively.
        </p>
      </div>
    </section>
  )
}
