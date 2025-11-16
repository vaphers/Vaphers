import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PromoFiller() {
  return (
    <section className="relative w-full lg:mt-6">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:pt-15 lg:pb-26 max-w-7xl mx-auto">
        {/* Left Side - Title */}
        <div className="w-full lg:w-2/5">
          <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
            Technical SEO That Drives Rankings & Revenue
          </h3>
          <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
          
          {/* CTA Button */}
          <Link href="https://www.vaphers.com/contact">
            <Button 
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
            >
              Get Your Technical Audit »
            </Button>
          </Link>
        </div>

        {/* Right Side - Description */}
        <div className="w-full lg:w-3/5 space-y-6">
          <p className="text-lg text-[#1a3d5c] leading-relaxed">
            <span className="font-semibold">Vaphers</span> delivers{' '}
            <a href="https://www.vaphers.com/seo-services" className="text-blue-600 underline font-medium">
              comprehensive SEO strategies
            </a>
            {' '}built on rock-solid technical foundations. With 43% of{' '}
            <a href="https://www.vaphers.com/seo-services/ecommerce-seo-services" className="text-blue-600 underline font-medium">
              ecommerce traffic
            </a>
            {' '}coming from organic search and 23.6% of orders directly linked to SEO, technical optimization delivers better long-term ROI than{' '}
            <a href="https://www.vaphers.com/ppc-marketing/google-ads-management-services" className="text-blue-600 underline font-medium">
              paid advertising
            </a>
            . We optimize Core Web Vitals, site architecture, crawlability, and mobile performance to capture high-intent shoppers actively searching for products and services.
          </p>
          
          <p className="text-lg text-[#1a3d5c] leading-relaxed">
            Whether you&apos;re running a{' '}
            <a href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 underline font-medium">
              Shopify store
            </a>
            , a{' '}
            <a href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 underline font-medium">
              WooCommerce site
            </a>
            , or custom ecommerce platform, our technical SEO services address the infrastructure issues holding back your rankings. With 77% of retail traffic from mobile devices and Google&apos;s top result capturing 27.6% of clicks, we implement{' '}
            <a href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 underline font-medium">
              data-driven strategies
            </a>
            {' '}that deliver measurable improvements in speed, crawlability, indexation, and search visibility, driving sustainable organic growth.
          </p>
        </div>
      </div>
    </section>
  )
}
