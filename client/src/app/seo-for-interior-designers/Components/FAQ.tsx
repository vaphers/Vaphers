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

const interiorDesignFaq: FaqItem[] = [
  {
    question: "How long does SEO take to show results for an interior design studio?",
    answer:
      "Most interior design studios begin seeing meaningful improvements within 3–6 months. Early wins typically come from local map pack visibility and image search indexation — your project galleries start appearing in Google Images and Pinterest search results. Ranking for competitive terms like 'luxury interior designer [city]' or 'commercial interior design firm near me' usually takes 6–12 months of consistent effort, but the traffic compounds over time and continues working long after the initial investment.",
  },
  {
    question: "How do you optimize my portfolio images without slowing down the site?",
    answer:
      "We use a combination of next-gen image formats (WebP and AVIF), intelligent lazy loading that preserves indexation, responsive srcset attributes so each device loads the right size, and CDN-based compression that maintains visual quality while cutting file sizes by 60–80%. We also implement structured data for your project galleries so Google can properly index and surface them in image search results. The goal is simple: your before-and-afters and project renders should look stunning to visitors and load fast enough to pass Core Web Vitals.",
  },
  {
    question: "Can SEO help me attract high-budget residential clients?",
    answer:
      "Absolutely. High-end residential clients typically research extensively online before reaching out — they browse portfolios, read case studies, and compare designers for weeks. SEO puts your work in front of these buyers during that research phase. We target long-tail keywords like 'luxury home interior designer [city]', 'high-end kitchen remodel designer', and 'whole-home renovation interior design' that signal serious buying intent. When your portfolio ranks for these searches, the inquiries that come through are pre-qualified and ready to discuss budgets.",
  },
  {
    question: "Do you help with Houzz and Pinterest visibility too?",
    answer:
      "Yes. Houzz and Pinterest are two of the highest-intent visual discovery platforms for interior design. We optimize your Houzz profile, project descriptions, and review strategy to improve your ranking within the platform. For Pinterest, we build keyword-optimized boards around your design niches (modern kitchens, luxury bathrooms, biophilic office design, etc.), optimize pin descriptions for search, and drive referral traffic back to your main website where visitors can book a consultation.",
  },
  {
    question: "What's the difference between your service and a generic SEO agency?",
    answer:
      "A generic agency applies the same playbook to a plumber, a law firm, and a design studio. Interior design SEO is fundamentally different — it's visual-first, portfolio-driven, and targets clients with long research cycles and high project values. We understand that your project photography IS your sales pitch. We optimize for Google Images, Pinterest, and Houzz alongside traditional organic search. We know how design clients actually search and decide, and we build every strategy around that buying journey.",
  },
  {
    question: "Will SEO work if I only serve a specific metro area?",
    answer:
      "Local SEO is one of the highest-ROI strategies for interior designers who serve a defined geographic area. We optimize your Google Business Profile with project photos and client reviews, build location-specific landing pages for each neighbourhood or suburb you serve, and target hyper-local keywords like 'interior designer in [neighbourhood]' or 'home staging company [city]'. The Google Map Pack (the top-3 local results) drives an outsized share of clicks for design searches, and getting your studio into that pack is a core part of our strategy.",
  },
  {
    question: "How do you measure success for an interior design SEO campaign?",
    answer:
      "We track metrics that actually matter for your business: consultation form submissions, phone calls from organic search, portfolio page views, Google Images impressions, local map pack visibility, and keyword rankings for your target service areas and design niches. You'll get a monthly report with clear before-and-after data — no vanity metrics or fluff. If the phone isn't ringing more and better, we're not doing our job.",
  },
  {
    question: "I get most of my clients from referrals. Why do I need SEO?",
    answer:
      "Referrals are excellent, but they're unpredictable. One slow quarter can empty your pipeline. SEO doesn't replace referrals — it runs alongside them as a consistent, compounding source of qualified inquiries. The people who find you through search have already seen your portfolio, read your about page, and decided you're worth contacting. They're often further along in their decision-making than a cold referral. Over time, organic search becomes the most reliable and cost-effective channel for filling your project calendar.",
  },
];

export default function InteriorDesignFaq() {
  const [value, setValue] = useState<string>();

  const items = interiorDesignFaq;

  return (
    <section className="flex items-center justify-center px-6 py-12 lg:py-14">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About SEO for{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Interior Designers
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Honest answers about timelines, portfolio optimization, local rankings, and what it actually takes to fill your studio's pipeline through organic search.
          </p>
        </div>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
          {/* Left */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
            defaultValue="question-0"
          >
            {items
              .slice(0, Math.ceil(items.length / 2))
              .map(({ question, answer }, index) => (
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

          {/* Right */}
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
