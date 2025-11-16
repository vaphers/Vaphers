import Image from 'next/image'
import Link from 'next/link'

export default function WooCom() {
  return (
    <section className="relative max-w-full px-6 py-8">
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
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
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative w-full h-[500px] lg:h-[800px] rounded-3xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761830525/Why_GMB___2_pdsgri.png"
              alt="WooCommerce store dashboard and performance overview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              Start Your Online Store with{' '}
              <span className="bg-blue-600 bg-clip-text text-transparent">WooCommerce</span>
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed montserrat">
              WooCommerce turns your WordPress site into a full-featured online store with product management, secure checkout, and endless customization. Paired with our{' '}
              <Link
                href="/website-development-services/ecommerce-development"
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                ecommerce development services
              </Link>
              , you get a store that looks professional, runs smoothly, and is built to grow from day one.
            </p>
          </div>

          {/* 1 */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-900 montserrat">
              Built to Sell and Scale
            </h4>
            <p className="text-gray-600 leading-relaxed montserrat">
              A WooCommerce store gives you full control over products, pricing, and promotions while staying easy to manage from a single WordPress dashboard. We design conversion‑focused product pages, streamlined carts, and frictionless checkout flows that reduce abandonment and increase average order value. Combined with tailored{' '}
              <Link
                href="/seo-services/ecommerce-seo-services"
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                ecommerce SEO services
              </Link>
              , your store is ready to attract qualified buyers and turn them into repeat customers.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
            "A well‑built WooCommerce store becomes your always‑on sales engine—and <strong>Vaphers</strong> helps you launch it right, from performance to SEO."
          </blockquote>

          {/* 2 */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-900 montserrat">
              Optimized for Search, Speed & Insights
            </h4>
            <p className="text-gray-600 leading-relaxed montserrat">
              WooCommerce works seamlessly with WordPress, giving you clean URLs, structured content, and full control over on‑page optimization. We back this up with detailed{' '}
              <Link
                href="/seo-services/seo-audit-services"
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                SEO audits
              </Link>
              {' '}to uncover technical issues, content gaps, and performance bottlenecks before they cost you sales. With <strong>Vaphers</strong>, you get a WooCommerce store that is fast, easy to manage, and ready to rank for the keywords that matter most to your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
