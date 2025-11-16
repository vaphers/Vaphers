import { Check, X } from "lucide-react";
import Link from "next/link";

export function ResponsiveVsNonResponsive() {
  return (
    <section className="w-full py-16 md:py-12 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
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

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10 md:mb-14">
          <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
            <span className="text-blue-600 ">
              Responsive   
            </span> Vs <span className="text-blue-600 ">Non-Responsive </span>
          </h3>
          <p className="mt-3 text-muted-foreground">
            Why responsiveness matters for UX, SEO, and Core Web Vitals in a mobile‑first world. 
          </p>
        </div>

        {/* Visual mock: responsive vs non-responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Responsive preview */}
          <div className="rounded-xl border bg-white p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Responsive</h4>
              <span className="inline-flex items-center gap-2 text-emerald-600">
                <Check className="h-5 w-5" />
                Mobile‑first
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Phone */}
              <div className="rounded-lg border p-3">
                <div className="h-2 w-10 bg-gray-900 rounded mb-2" />
                <div className="h-20 bg-blue-100 rounded mb-2" />
                <div className="h-2 w-16 bg-gray-400 rounded mb-1" />
                <div className="h-2 w-14 bg-gray-300 rounded" />
              </div>
              {/* Tablet */}
              <div className="rounded-lg border p-3 md:p-4">
                <div className="h-3 w-16 bg-gray-900 rounded mb-3" />
                <div className="h-24 bg-blue-100 rounded mb-3" />
                <div className="h-2 w-24 bg-gray-400 rounded mb-1" />
                <div className="h-2 w-20 bg-gray-300 rounded" />
              </div>
              {/* Desktop */}
              <div className="rounded-lg border p-4 md:p-5">
                <div className="h-3 w-24 bg-gray-900 rounded mb-4" />
                <div className="h-28 bg-blue-100 rounded mb-4" />
                <div className="h-2 w-32 bg-gray-400 rounded mb-1" />
                <div className="h-2 w-24 bg-gray-300 rounded" />
              </div>
            </div>
          </div>

          {/* Non-Responsive preview */}
          <div className="rounded-xl border bg-white p-5 md:p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Non‑Responsive</h4>
              <span className="inline-flex items-center gap-2 text-rose-600">
                <X className="h-5 w-5" />
                Pinch & zoom
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 opacity-80">
              {/* Phone: content overflows */}
              <div className="rounded-lg border p-3 relative">
                <div className="absolute -right-1 -top-1 text-rose-600 text-xs">overflow</div>
                <div className="h-2 w-24 bg-gray-900 rounded mb-2" />
                <div className="h-20 bg-blue-100 rounded mb-2 w-[180%]" />
                <div className="h-2 w-32 bg-gray-400 rounded mb-1" />
                <div className="h-2 w-28 bg-gray-300 rounded" />
              </div>
              {/* Tablet: awkward scaling */}
              <div className="rounded-lg border p-3 md:p-4">
                <div className="h-2 w-28 bg-gray-900 rounded mb-3 scale-90 origin-top-left" />
                <div className="h-24 bg-blue-100 rounded mb-3 scale-95 origin-top-left" />
                <div className="h-2 w-32 bg-gray-400 rounded mb-1 scale-95 origin-top-left" />
                <div className="h-2 w-28 bg-gray-300 rounded scale-95 origin-top-left" />
              </div>
              {/* Desktop: fixed layout */}
              <div className="rounded-lg border p-4 md:p-5">
                <div className="h-3 w-96 bg-gray-900 rounded mb-4" />
                <div className="h-28 bg-blue-100 rounded mb-4 w-[110%]" />
                <div className="h-2 w-72 bg-gray-400 rounded mb-1" />
                <div className="h-2 w-64 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Key differences table */}
        <div className="overflow-x-auto border border-blue-300 rounded-3xl">
          <table className="w-full text-left border-separate border-spacing-y-2 p-2">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2 px-3">Aspect</th>
                <th className="py-2 px-3">Responsive</th>
                <th className="py-2 px-3">Non‑Responsive</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white/70 rounded-lg">
                <td className="py-3 px-3 font-medium">UX & usability</td>
                <td className="py-3 px-3">Fluid layout adapts to any screen; no pinch‑zoom; consistent navigation.</td>
                <td className="py-3 px-3">Fixed layouts cause overflow, tiny text, awkward zooming, and higher friction.</td>
              </tr>
              <tr className="bg-white/70 rounded-lg">
                <td className="py-3 px-3 font-medium">SEO & indexing</td>
                <td className="py-3 px-3">Recommended by Google for mobile‑first indexing; single URL simplifies crawling.</td>
                <td className="py-3 px-3">Mobile usability issues, duplicate versions, and indexing gaps can hurt rankings.</td>
              </tr>
              <tr className="bg-white/70 rounded-lg">
                <td className="py-3 px-3 font-medium">Core Web Vitals</td>
                <td className="py-3 px-3">Easier to optimize LCP/INP/CLS with responsive images, fluid layouts, and lazy‑loading.</td>
                <td className="py-3 px-3">Unoptimized mobile layouts often degrade LCP/INP/CLS and engagement.</td>
              </tr>
              <tr className="bg-white/70 rounded-lg">
                <td className="py-3 px-3 font-medium">Maintenance</td>
                <td className="py-3 px-3">
                  Single codebase; faster updates; future‑proof across devices.<br/>{" "}
                  <Link 
                    href="/website-development-services/nextjs-website-development" 
                    className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
                  >
                    Modern frameworks like Next.js
                  </Link>
                  {" "}streamline responsive development with built-in optimization.
                </td>
                <td className="py-3 px-3">Multiple layouts or fixed desktop‑only views lead to higher upkeep and breakage.</td>
              </tr>
              <tr className="bg-white/70 rounded-lg">
                <td className="py-3 px-3 font-medium">Conversions</td>
                <td className="py-3 px-3">Better mobile UX reduces bounce and improves conversions.</td>
                <td className="py-3 px-3">Friction on mobile drives abandonment and lower conversion rates.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            <a href="https://developers.google.com/search/blog/2012/04/responsive-design-harnessing-power-of" className="text-blue-600 underline">Google's guidance</a> is clear: use responsive web design for easier implementation and maintenance.
          </p>
        </div>
      </div>
    </section>
  );
}
