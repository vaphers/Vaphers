"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck as BookCheck,
  BarChart3 as ChartPie,
  Link2 as FolderSync,
  Target as Goal,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BookCheck,
    title: "Transparent Pricing & Scope",
    description:
      "Ask for an itemized proposal with clear inclusions, exclusions, revision policy, and change-order terms to avoid hidden costs and scope creep.",
    img: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1200",
    note: "Look for line items like pages, copy/SEO, integrations, QA, training, and support windows.",
  },
  {
    icon: Goal,
    title: "Portfolio Relevance & Results",
    description:
      "Review live projects similar to your industry and complexity, and verify outcomes such as conversions, speed, and mobile experience.",
    img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200",
    note: "Case studies with measurable KPIs indicate execution quality over aesthetics alone.",
  },
  {
    icon: ChartPie,
    title: "Performance & SEO Foundations",
    description:
      "Ensure Core Web Vitals targets, responsive images, semantic HTML, metadata, sitemaps, and basic schema are part of the build.",
    img: "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    note: "Mobile-first, CWV, and on-page SEO basics safeguard visibility and UX.",
  },
  {
    icon: Users,
    title: "Process, Communication, and Revisions",
    description:
      "Request a milestone plan with a single point of contact, weekly updates, and defined rounds of design revisions before development.",
    img: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200",
    note: "Clarity on approvals avoids delays and keeps budgets intact.",
  },
  {
    icon: FolderSync,
    title: "Ownership, Access, and Handover",
    description:
      "Confirm you own code, content, and accounts (domain, hosting, CMS, analytics) and will receive documentation, credentials, and training at handoff.",
    img: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=1200",
    note: "Ownership and access prevent vendor lock-in and ensure continuity.",
  },
  {
    icon: Zap,
    title: "Support, Maintenance, and TCO",
    description:
      "Clarify post-launch support windows, maintenance plans, update cadence, and total cost of ownership across hosting, plugins, and licenses.",
    img: "https://images.pexels.com/photos/3183142/pexels-photo-3183142.jpeg?auto=compress&cs=tinysrgb&w=1200",
    note: "A predictable maintenance model reduces risk and downtime.",
  },
];

const ChooseCompany = () => {
  return (
    <section className="w-full relative">
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

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="max-w-7xl w-full py-12 lg:py-12 px-6">
          <div className="lg:text-left mb-8 lg:mb-12">
            <h4 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
              How to Choose an{" "}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Affordable Web Design Company
              </span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center lg:mx-0">
              Evaluate providers with a checklist that balances budget, transparency, performance, SEO, and long‑term ownership and support. [web:63][web:69][web:72]
            </p>
          </div>

          <div className="mt-8 md:mt-12 w-full mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Accordion defaultValue="item-0" type="single" collapsible className="w-full">
                {features.map(({ title, description, icon: Icon, img, note }, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="group/accordion-item border-b data-[state=open]:border-b-2 data-[state=open]:border-primary"
                  >
                    <AccordionTrigger className="text-lg [&>svg]:hidden group-first/accordion-item:pt-0">
                      <div className="flex items-center gap-4">
                        <Icon className="text-blue-600" />
                        {title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[17px] leading-relaxed text-muted-foreground">
                      {description} [web:63]
                      <div className="text-sm text-gray-500 mt-2">
                        {note} [web:69][web:72]
                      </div>
                      {/* Mobile image when open */}
                      <div className="mt-6 mb-2 md:hidden aspect-video w-full relative rounded-xl overflow-hidden">
                        <Image
                          src={img}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="hidden md:block w-full">
              <div className="relative rounded-xl overflow-hidden shadow-2xl min-h-[480px] lg:sticky lg:top-24">
                <Image
                  src={features[0].img}
                  alt="Affordable web design — evaluating transparent proposals"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseCompany;
