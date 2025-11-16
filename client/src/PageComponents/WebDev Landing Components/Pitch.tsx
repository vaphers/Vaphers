"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function WebDesignPitch() {
  return (
    <div className="relative"> 
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundColor: "#ffffff",
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

      <section className="relative z-10 mx-auto max-w-7xl overflow-hidden px-6 py-8 lg:py-12">
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-7">
            <h2 className="mb-5 text-center text-4xl leading-tight text-gray-700 sm:mb-4 sm:text-3xl md:text-4xl lg:mb-5 lg:text-start lg:text-5xl bungee-inline-regular">
              website designs that convert{" "}
              <span className="bg-blue-600 bg-clip-text text-transparent">visitors into customers</span>
            </h2>

            <p className="text-lg leading-8 text-muted-foreground md:text-xl">
              Production‑ready websites engineered for speed, conversions, and search visibility. Every site is built with clean code, intuitive UX, and{" "}
              <Link 
                href="https://www.vaphers.com/seo-services/technical-seo-services" 
                className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
              >
                technical SEO optimization
              </Link>{" "}
              that helps you rank and convert from day one.
            </p>

            <ul className="space-y-4 text-base md:text-lg">
              <li className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                <p>
                  <Link 
                    href="https://www.vaphers.com/website-development-services/nextjs-website-development" 
                    className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
                  >
                    Next.js website development
                  </Link>{" "}
                  – hybrid SSR/SSG rendering, automatic code splitting, and native image optimization that delivers exceptional Core Web Vitals and faster indexing.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                <p>
                  <a className="text-blue-600 hover:text-blue-800 underline" href="https://www.vaphers.com/website-development-services/wordpress-website-development">WordPress website development</a> – custom block themes, headless CMS architecture, and optimized hosting configurations that balance flexibility with performance.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                <p>
                  <a className="text-blue-600 hover:text-blue-800 underline" href="https://www.vaphers.com/seo-services">SEO‑first architecture</a> – semantic HTML5 structure, WCAG‑compliant accessibility, schema markup integration, and server‑side rendering that gives search engines fully‑formed content to index and rank.
                </p>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="h-12 px-6 text-base md:text-lg bg-blue-600 hover:bg-blue-800" asChild>
                <a href="#contact" className="inline-flex items-center">
                  Get a proposal <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base md:text-lg" asChild>
                <a href="#work">Explore More</a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-xl border bg-muted/40 p-8">
              <Image
                src="/images/web-design-hero.png"
                alt="Website mockups"
                width={1600}
                height={1000}
                priority
                className="h-auto w-full rounded-lg"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
