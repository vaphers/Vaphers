import Image from "next/image";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function InternaionalSEO() {
  return (
    <section className="bg-[#F9F8F4] py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 font-sans text-[#111111] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Row: Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 lg:mb-24 gap-6 lg:gap-16">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-medium bungee-shade text-blue-700 lg:w-1/3 shrink-0">
            V<span className="text-gray-900 text-3xl sm:text-4xl md:text-5xl">aphers</span>
          </h3>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-medium leading-[1.3] md:leading-[1.1] tracking-tight lg:w-2/3">
            We blend data-driven strategies with modern innovation to deliver <span className="text-blue-600">global SEO services</span> that empower your brand worldwide.
          </h3>
        </div>

        {/* Bottom Row: Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          
          {/* Left Column: Media & CTA */}
          <div className="flex flex-col gap-8 lg:gap-12">
            
            {/* Image & Stats Box (Stacked on mobile, side-by-side on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-[350px] lg:h-[400px]">
              {/* Image Container - Needs explicit height on mobile since parent is h-auto */}
              <div className="relative w-full h-[250px] sm:h-full rounded-sm overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773382246/Leading_International_SEO_Agency_zcmimt.png"
                  alt="International SEO Expert"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-blue-600 text-white p-6 sm:p-8 flex flex-col justify-end rounded-sm min-h-[200px] sm:min-h-0">
                <h4 className="text-5xl md:text-6xl font-medium mb-2 md:mb-3 tracking-tighter">
                  98.9%
                </h4>
                <p className="text-sm md:text-base text-gray-300 leading-snug">
                  Client Satisfaction, <br /> and growing globally!
                </p>
              </div>
            </div>

            {/* Description & Button */}
            <div className="max-w-full lg:max-w-md">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
                As a leading International SEO Agency, we help you dominate search results across borders. We blend technical excellence with cultural insights to ensure your business connects with audiences globally.
              </p>
              <Link 
                href="?proposal=true"
                scroll={false}
                className="block w-full sm:w-max text-center rounded-lg bg-blue-600 px-8 py-3.5 font-medium text-white transition-colors hover:bg-blue-800"
              >
                Get A Proposal
              </Link>
            </div>
          </div>

          {/* Right Column: Feature Cards */}
          <div className="flex flex-col gap-5 sm:gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 shadow-sm rounded-sm">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center mb-6 md:mb-8 shrink-0">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
                Bold, Clean, Future-Ready
              </h4>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                We craft sleek, functional SEO architectures that stay resilient against algorithm updates, helping your brand shine in a competitive digital world.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 shadow-sm rounded-sm">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center mb-6 md:mb-8 shrink-0">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-medium mb-3 md:mb-4">
                Cross-Border Visibility
              </h4>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                Our localized content strategies ensure that your messaging resonates in any market, turning international traffic into loyal, long-term customers.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}