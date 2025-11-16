"use client";

import { motion, Variants } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Layers,
  Accessibility,
  Gauge,
  Rows3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 2, transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const keys = [
  {
    title: "Clarity & Focus",
    desc:
      "Reduce cognitive load with one clear primary action per view, plain language, and scannable content.",
    tip: "Limit choices and keep CTAs prominent and unambiguous.",
    icon: CheckCircle2,
    accent: "from-blue-500/25 to-cyan-500/20",
    href: "/website-development-services/ecommerce-development",
  },
  {
    title: "Visual Hierarchy",
    desc:
      "Guide attention using size, contrast, spacing, and placement so the right elements stand out.",
    tip: "Use clear headings and generous spacing to group related content.",
    icon: Layers,
    accent: "from-violet-500/25 to-fuchsia-500/20",
    href: "/website-development-services/shopify-website-development",
  },
  {
    title: "Accessibility",
    desc:
      "Follow WCAG with semantic HTML, keyboard access, and sufficient color contrast for inclusive UX.",
    tip: "Ensure visible focus states and label every form control.",
    icon: Accessibility,
    accent: "from-emerald-500/25 to-teal-500/20",
    href: "/seo-services/technical-seo-services",
  },
  {
    title: "Performance (CWV)",
    desc:
      "Optimize Core Web Vitals for faster loads, responsive interactions, and stable layouts.",
    tip: "Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.",
    icon: Gauge,
    accent: "from-amber-500/25 to-orange-500/20",
    href: "/seo-services/seo-audit-services",
  },
  {
    title: "Consistency",
    desc:
      "Use a shared system of components, spacing, and tone so interfaces feel predictable and trustworthy.",
    tip: "Centralize tokens and patterns in a style guide.",
    icon: Rows3,
    accent: "from-sky-500/25 to-indigo-500/20",
    href: "/website-development-services/wordpress-website-development",
  },
  {
    title: "Credibility & Trust",
    desc:
      "Reinforce trust with clear policies, real testimonials, and transparent messaging across touchpoints.",
    tip: "Showcase reviews, security badges, and contact details.",
    icon: ShieldCheck,
    accent: "from-rose-500/25 to-pink-500/20",
    href: "/website-development-services/ecommerce-development",
  },
];

export default function SixKeysDesignSection() {
  return (
    <section className="w-full py-16 md:py-20 relative">
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

      <motion.div
        className="mx-auto max-w-7xl px-6 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading */}
        <motion.div className="text-center mb-12 md:mb-16" variants={item}>
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
            6 Keys To <span className="text-blue-600">Exceptional Website Design</span>
          </h4>
          <p className="mt-3 text-muted-foreground">
            Practical, accessible, and performance‑minded guidelines to elevate every page.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {keys.map((k, idx) => {
            const Icon = k.icon;
            return (
              <motion.div key={k.title} variants={item}>
                <Link href={k.href} className="block h-full group">
                  <Card
                    className={cn(
                      "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
                      "border border-border/60 bg-gradient-to-b",
                      k.accent
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 ring-1 ring-border group-hover:ring-primary transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </span>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {idx + 1}. {k.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-5">
                      <p className="text-sm text-gray-500">{k.desc}</p>
                      <Separator className="my-4 bg-gray-300" />
                      <p className="text-xs text-gray-500 italic">{k.tip}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
