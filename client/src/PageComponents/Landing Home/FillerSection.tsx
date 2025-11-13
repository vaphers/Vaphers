import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeFiller() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:pb-16  max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          An Affordable Digital Marketing Agency
        </h3>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
        
        {/* button */}
        <Link href={"/contact"}><Button 
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
        >
          Get a Free SEO Audit »
        </Button></Link>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          <span className="font-semibold">Vaphers</span> is a full-service digital marketing agency specializing in 
          SEO, PPC advertising, <a href="https://www.vaphers.com/website-development-services">affordable web development</a>, and strategic content creation. We help businesses improve their 
          online visibility, drive qualified traffic, and achieve measurable results that grow your revenue.
        </p>
        
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Our digital marketing agency combines technical expertise with creative solutions to deliver comprehensive 
          marketing services. From search engine optimization and pay-per-click campaigns to modern{' '}
          <a href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-700 underline hover:text-blue-800 font-medium">
            Shopify development
          </a>{' '}
          and custom{' '}
          <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-700 underline hover:text-blue-800 font-medium">
            WordPress solutions
          </a>
          , we provide data-driven strategies that connect your brand with the right 
          audience at the right time, maximizing your digital presence and ROI.
        </p>
      </div>
    </section>
  )
}
