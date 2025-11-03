"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PlusIcon } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface WebDesignFaqProps {
  data?: FaqItem[];
  heading?: string;
  subheading?: string;
  defaultOpen?: number[]; 
}

const defaultFaq: FaqItem[] = [
  {
    question: "How much does a professional website cost?",
    answer:
      "Budgets vary by scope, but most custom small–mid websites fall in a broad range depending on page count, design depth, integrations, e‑commerce, and content creation. Ask for an itemized scope with inclusions (pages, copy/SEO, integrations, QA, training, support) so proposals are comparable.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "A focused small business site can launch in 3–6 weeks across discovery, design, development, QA, and launch. Complex features (e‑commerce, portals, custom integrations) extend timelines. Clear milestones and approvals help keep schedules predictable.",
  },
  {
    question: "What’s included in web design services?",
    answer:
      "Typical inclusions: discovery and sitemap, UX/UI design, mobile‑responsive build, content integration, on‑page SEO basics (meta, headings, alt text, schema where relevant), performance tuning, QA, analytics/search console setup, and launch support.",
  },
  {
    question: "Do I own my website, code, and content?",
    answer:
      "Yes—ownership should transfer at handoff. Ensure your contract states you own code, content, and accounts (domain, hosting, CMS, analytics). Request access and documentation at project completion.",
  },
  {
    question: "Is SEO included with my website?",
    answer:
      "Most projects include on‑page SEO foundations (semantics, metadata, clean URLs, internal links, alt text, schema where relevant) and technical best practices (sitemaps, performance, mobile responsiveness). Ongoing SEO campaigns are typically separate.",
  },
  {
    question: "How many design revisions are included?",
    answer:
      "A common model is unlimited design revisions before development, then change requests via a simple change order once build starts. Confirm revision rounds and what constitutes a change vs. scope expansion.",
  },
  {
    question: "Do you provide maintenance and support?",
    answer:
      "Post‑launch support often covers backups, security updates, and minor fixes for 30–60 days, followed by monthly maintenance plans as needed. Ask about staging updates, uptime monitoring, and response SLAs.",
  },
  {
    question: "Which platform should I choose (WordPress, Shopify, custom)?",
    answer:
      "Match platform to needs: WordPress for content‑led sites, Shopify for e‑commerce, and custom frameworks for specialized apps. Consider editorial workflow, integrations, scalability, TCO, and performance when selecting.",
  },
];

export default function WebDesignFaq({
  data,
  heading = "FAQs About Web Design",
  subheading = "Clear answers about pricing, timelines, process, ownership, SEO, and maintenance so you know exactly what to expect.",
  defaultOpen = [0],
}: WebDesignFaqProps) {
  const [value, setValue] = useState<string>();
  const items = data?.length ? data : defaultFaq;

  const defaultValues = defaultOpen
    .filter((i) => i >= 0 && i < items.length)
    .map((i) => `question-${i}`);

  return (
    <section className="flex items-center justify-center px-6 py-12 lg:py-14">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            {heading.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              {heading.split(" ").slice(-2).join(" ")}
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subheading}</p>
        </div>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
          {/* Left column */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
            defaultValue={defaultValues[0]} // open first by default
          >
            {items.slice(0, Math.ceil(items.length / 2)).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg"
                    )}
                  >
                    {question}
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right column */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {items.slice(Math.ceil(items.length / 2)).map(({ question, answer }, idx) => {
              const index = idx + Math.ceil(items.length / 2);
              return (
                <AccordionItem key={question} value={`question-${index}`}>
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                        "text-start text-lg"
                      )}
                    >
                      {question}
                      <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-base text-muted-foreground text-pretty">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
