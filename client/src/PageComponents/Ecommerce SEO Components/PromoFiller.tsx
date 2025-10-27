import { Button } from "@/components/ui/button"

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
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:pt-15  lg:pb-26 max-w-7xl mx-auto">
        {/* Left Side - Title */}
        <div className="w-full lg:w-2/5">
          <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
            An Affordable Ecommerce SEO Agency
          </h3>
          <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>
          
          {/* CTA Button */}
          <Button 
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
          >
            Get a Free Store Audit »
          </Button>
        </div>

        {/* Right Side - Description */}
        <div className="w-full lg:w-3/5 space-y-6">
          <p className="text-lg text-[#1a3d5c] leading-relaxed">
            <span className="font-semibold">Vaphers</span> specializes in ecommerce SEO services that help online stores 
            rank higher and sell more. With organic search driving 23.6% of all ecommerce orders and generating 43% of 
            traffic to online stores, SEO is the most cost-effective channel for sustainable growth. We optimize your 
            product pages, category structure, and technical foundation to capture high-intent shoppers actively searching 
            for products like yours.
          </p>
          
          <p className="text-lg text-[#1a3d5c] leading-relaxed">
            Our ecommerce SEO strategies deliver an average ROI of 2.6x within 12 months and 4.6x within 24 months. 
            From Shopify and WooCommerce optimization to product schema markup and mobile performance improvements, we 
            implement data-driven tactics that increase your organic visibility. With 77% of retail traffic coming from 
            mobile devices and the top Google result capturing 27.6% of all clicks, ranking on page one isn't just 
            beneficial—it's essential for your online store's success.
          </p>
        </div>
      </div>
    </section>
  )
}
