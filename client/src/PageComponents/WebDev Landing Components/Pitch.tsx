"use client"

import Image from "next/image"
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
              Modern, performant websites built on production‑ready stacks with clean UI, clear messaging, and SEO‑first structure to turn clicks into customers.
            </p>

            <ul className="space-y-4 text-base md:text-lg">
              <li className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                <p>Next.js website development - hybrid SSR/SSG, file‑based routing, and image optimization for strong Core Web Vitals.</p>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                <p>WordPress website development - custom themes, block‑editor workflows, and secure, scalable builds you can manage easily.</p>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                <p>SEO‑ready architecture - semantic HTML, accessible components, and fast loads that help pages rank and convert.</p>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="h-12 px-6 text-base md:text-lg bg-blue-600 hover:bg-blue-800" asChild>
                <a href="#contact" className="inline-flex items-center">
                  Get a proposal <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base md:text-lg" asChild>
                <a href="#work">View recent work</a>
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
