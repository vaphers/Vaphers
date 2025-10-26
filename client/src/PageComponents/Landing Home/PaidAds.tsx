import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const HomePaidAds = () => {
  return (
    <section className="w-full py-8 lg:py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <Image
              src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Digital marketing analytics dashboard showing paid advertising campaign performance and ROI metrics"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Affordable Paid Ads Company
              </p>
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-base text-center lg:text-start tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              Grow With An <span className="bg-blue-600 bg-clip-text text-transparent">Affordable Paid Ads Company</span>
            </h4>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Partner with an affordable paid ads company that delivers exceptional ROI without breaking your budget. 
              Our data-driven PPC campaigns maximize every advertising dollar, helping you reach qualified leads 
              precisely when they're searching for your services. Experience transparent pricing, proven strategies, 
              and measurable results that drive sustainable growth.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-5xl md:text-6xl font-bold text-gray-700">200%</h3>
                <p className="text-gray-600 mt-2">
                  Average ROI from well-optimized paid ad campaigns for growing businesses
                </p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-bold text-gray-700">65%</h3>
                <p className="text-gray-600 mt-2">
                  Lower cost per acquisition compared to traditional advertising channels
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/contact">
                <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-800 text-white px-8"
                >
                Get Started
                </Button>
            </Link>
            
            <Link href="/about">
                <Button 
                size="lg" 
                variant="ghost" 
                className="group"
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
