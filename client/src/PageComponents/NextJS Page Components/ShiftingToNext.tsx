import Image from 'next/image'
import Link from 'next/link'

export default function NextShifting() {
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
              alt="Next.js performance and SEO dashboard"
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
              Why Companies Are Choosing <span className="bg-blue-600 bg-clip-text text-transparent">Next.js Websites</span> Over Others?
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed montserrat">
              A fully optimized Next.js website is no longer optional—it's the foundation of modern{' '}
              <Link 
                href="/website-development-services" 
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                web development
              </Link>
              {' '}that drives speed, visibility, and conversions. 
              It determines how your site performs in search rankings, page loads, and user engagement. At <strong>Vaphers</strong>, 
              we specialize in building high-performance Next.js sites that boost{' '}
              <Link 
                href="/seo-services" 
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                SEO rankings
              </Link>
              , engagement, and revenue for growing businesses.
            </p>
          </div>

          {/* 1 */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-900 montserrat">
              Lightning-Fast Speed Drives Conversions
            </h4>
            <p className="text-gray-600 leading-relaxed montserrat">
              When customers visit your site, loading speed decides whether they stay or bounce. 
              Next.js delivers server-side rendering, automatic code splitting, and optimized images 
              that ensure fast page loads and superior Core Web Vitals. This speed advantage captures high-intent visitors 
              and turns them into buyers. For{' '}
              <Link 
                href="/website-development-services/ecommerce-development" 
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                e-commerce sites
              </Link>
              , faster checkout flows mean more completed purchases and lower cart abandonment.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
            "Next.js sites load 50% faster and rank higher on Google with built-in SEO optimization, 
            and <strong>Vaphers</strong> helps you leverage this competitive edge the smart way."
          </blockquote>

          {/* 2 */}
          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-900 montserrat">
              SEO-Friendly Architecture Outranks Competition
            </h4>
            <p className="text-gray-600 leading-relaxed montserrat">
              Next.js is built for search engines with server-side rendering, automatic metadata generation, and clean semantic HTML. 
              By implementing advanced{' '}
              <Link 
                href="/seo-services/technical-seo-services" 
                className="text-blue-600 underline hover:text-blue-700 font-medium"
              >
                technical SEO strategies
              </Link>
              , your site becomes crawlable, indexable, and optimized for rich results. 
              With <strong>Vaphers</strong>, we don't just build websites—we create SEO-ready platforms 
              that consistently rank and convert for competitive search terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
