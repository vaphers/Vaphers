import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HomePaidAdsProps {
  cityName: string
}

const PremierServiceProvider: React.FC<HomePaidAdsProps> = ({ cityName }) => {
  return (
    <section className="w-full py-8 lg:py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <Image
              src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt={`${cityName} premier SEO service provider - analytics dashboard`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-base text-center lg:text-start tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              {cityName} Premier <span className="bg-blue-600 bg-clip-text text-transparent">SEO Service Provider</span>
            </h4>

            <p className="text-lg text-gray-600 leading-relaxed">
              Partner with the premier SEO service provider in {cityName} delivering exceptional ROI and tailored strategies.
              Our expert team maximizes your online visibility, drives qualified local traffic, and boosts conversions through transparent, data-driven SEO campaigns.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-5xl md:text-6xl font-bold text-gray-700">200%</h3>
                <p className="text-gray-600 mt-2">
                  Average ROI from expertly optimized SEO campaigns for businesses in {cityName}
                </p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-bold text-gray-700">65%</h3>
                <p className="text-gray-600 mt-2">
                  Reduced cost per lead compared to traditional marketing methods in {cityName}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact" passHref>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-800 text-white px-8"
                >
                  Get Started
                </Button>
              </Link>

              <Link href="/about" passHref>
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

export default PremierServiceProvider
