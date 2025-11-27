import { Button } from "@/components/ui/button"

export default function SEMAgencySection() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:py-8 lg:pt-20 max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          Expert Search Engine Marketing Agency
        </h3>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
        
        {/* button */}
        <Button 
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
        >
          Get a Free SEM Audit »
        </Button>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          <span className="font-semibold">Vaphers</span> is a results-driven search engine marketing agency specializing in 
          Google Ads management, PPC campaign optimization, and paid search advertising strategies that deliver measurable ROI[web:40][web:45]. 
          We help businesses increase online visibility, capture high-intent traffic, and generate qualified leads through 
          precision-targeted campaigns that reach customers exactly when they're searching for your solutions[web:40][web:44].
        </p>
        
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Our SEM services combine strategic keyword research, smart bid management, and compelling ad copywriting with 
          continuous performance tracking and optimization[web:45][web:49]. From Google Ads and Microsoft Advertising to 
          local search campaigns and remarketing strategies, we provide transparent, data-driven solutions that maximize 
          your advertising budget while driving conversions and revenue growth[web:40][web:48]. With certified Google Ads 
          specialists and proven campaign management processes, we ensure your paid search investment delivers fast results 
          and sustainable long-term performance[web:46][web:49].
        </p>
      </div>
    </section>
  )
}
