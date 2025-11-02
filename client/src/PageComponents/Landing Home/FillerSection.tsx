import { Button } from "@/components/ui/button"

export default function HomeFiller() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:py-8 lg:pt-20 max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          An Affordable Digital Marketing Agency
        </h3>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
        
        {/* button */}
        <Button 
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
        >
          Get a Free SEO Audit »
        </Button>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          <span className="font-semibold">Vaphers</span> is a full-service digital marketing agency specializing in 
          SEO, PPC advertising, web development, and strategic content creation. We help businesses improve their 
          online visibility, drive qualified traffic, and achieve measurable results that grow your revenue.
        </p>
        
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Our digital marketing agency combines technical expertise with creative solutions to deliver comprehensive 
          marketing services. From search engine optimization and pay-per-click campaigns to modern web development 
          with React and Tailwind CSS, we provide data-driven strategies that connect your brand with the right 
          audience at the right time, maximizing your digital presence and ROI.
        </p>
      </div>
    </section>
  )
}





