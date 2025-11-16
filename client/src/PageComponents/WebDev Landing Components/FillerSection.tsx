import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WebDesignSection() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:py-8 lg:py-20 max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          High‑converting Web Design for Modern Brands
        </h3>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>

        {/* button */}
        <Link href={"https://www.vaphers.com/contact"}>
          <Button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
          >
            Get a Free Website Audit »
          </Button>
        </Link>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          A great website is more than visuals, it's a 24/7 sales engine built on clear messaging, intuitive UX, and fast performance that earns trust and drives action. We specialize in building{" "}
          <Link 
            href="/website-development-services/ecommerce-development" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            affordable ecommerce websites
          </Link>
          {" "}that scale with your business, whether you need{" "}
          <Link 
            href="/website-development-services/wordpress-website-development" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            WordPress with WooCommerce
          </Link>
          {" "}or a custom platform.
        </p>

        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Designs that load quickly and feel stable improve Core Web Vitals, which are used by Google to evaluate real‑world experience and can influence visibility and engagement. Our{" "}
          <Link 
            href="/website-development-services/shopify-website-development" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
           budget friendly Shopify development
          </Link>
          {" "}delivers enterprise features at accessible price points, optimizing every touchpoint for speed and seamless checkout.
        </p>

        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Mobile‑first, responsive layouts ensure your content works on any device and align with Google's mobile‑first indexing approach, protecting rankings and paid traffic quality across all platforms.
        </p>
      </div>
    </section>
  )
}
