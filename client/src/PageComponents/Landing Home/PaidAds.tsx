import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const HomePaidAds = () => {
  return (
    <section className="w-full py-10 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Image */}
          <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <Image
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1772636628/Leading_paid_search_marketing_agency_owavgz.png"
              alt="Digital marketing analytics dashboard showing paid advertising campaign performance and ROI metrics"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">
                High-Ticket Client Acquisition
              </p>
              {/* Removed text-center to keep alignment consistent with the paragraph on mobile */}
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-900 bungee-shade leading-tight">
                Paid Ads for <span className="bg-blue-700 bg-clip-text text-transparent">Interior Designers</span>
              </h4>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Partner with a specialized paid advertising team that connects your studio directly with affluent homeowners ready for full-scale renovations. 
              Our{' '}
              <a href="https://www.vaphers.com/ppc-marketing" className="text-blue-700 underline hover:text-blue-800 font-medium">
                interior design PPC marketing
              </a>{' '}
              strategies combine precision zip-code targeting with visual portfolio creatives across{' '}
              <a href="https://www.vaphers.com/ppc-marketing/google-ads-management-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                Google Search Ads
              </a>{' '}
              and{' '}
              <a href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-700 underline hover:text-blue-800 font-medium">
                Instagram & Meta ads
              </a>.
              Stop wasting budget on casual DIY browsers and start booking lucrative residential and commercial design commissions.
            </p>

            {/* Stats - Stacks on tiny screens (grid-cols-1), side-by-side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
              <div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700">3.8x</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Average project pipeline value generated from targeted ad spend for luxury design studios
                </p>
              </div>
              <div>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700">70%</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Higher qualification rate for inbound consultations compared to generic ads
                </p>
              </div>
            </div>

            {/* Buttons - Stack on tiny screens, inline on sm+ */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-800 text-white px-8 cursor-pointer"
                >
                  Schedule an Ads Audit
                </Button>
              </Link>
              
              <Link href="https://www.vaphers.com/ppc-marketing" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="w-full sm:w-auto group cursor-pointer justify-center"
                >
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePaidAds