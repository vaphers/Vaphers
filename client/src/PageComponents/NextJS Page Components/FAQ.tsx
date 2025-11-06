"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface NextJsFaqProps {
  data?: FaqItem[];
}

const nextJsFaq: FaqItem[] = [
  {
    question: "What is Next.js and why should my business use it?",
    answer:
      "Next.js is a modern way to build fast, Google‑friendly websites that look great on mobile and desktop. It helps you get better SEO, quicker load times, and pages that convert more visitors into leads.",
  },
  {
    question: "Is Next.js good for SEO?",
    answer:
      "Yes. Next.js creates clean, search‑friendly pages that load quickly, which helps rankings and clicks from Google. It also supports structured data and best practices by default.",
  },
  {
    question: "Can I easily update my Next.js website?",
    answer:
      "Absolutely. You’ll get reusable sections and simple content workflows, so adding pages, blogs, or landing pages is easy without breaking your site’s speed.",
  },
  {
    question: "How fast can a Next.js site launch?",
    answer:
      "Most sites launch faster than traditional builds because many performance and SEO features are built‑in. Timelines depend on pages, design, and content readiness.",
  },
  {
    question: "Is Next.js only for big companies?",
    answer:
      "No. It’s perfect for startups and local businesses too. You get enterprise‑grade speed and SEO without the complexity—great value for growth-focused teams.",
  },
  {
    question: "What about ecommerce—does Next.js work for stores?",
    answer:
      "Yes. Next.js powers high‑speed product pages and supports popular backends and checkouts. It’s ideal if you want a custom storefront with strong SEO.",
  },
  {
    question: "How does Next.js compare to WordPress or Shopify?",
    answer:
      "Next.js gives you more speed and design control for lead generation. WordPress is great for blogs; Shopify is great for built‑in ecommerce. Many brands combine them with Next.js for the best results.",
  },
  {
    question: "What does your Next.js service include?",
    answer:
      "Strategy, design, development, SEO setup, analytics, form integrations, and launch support. You’ll get a fast, secure site ready to rank and convert.",
  },
  {
    question: "Is this affordable for small businesses?",
    answer:
      "Yes. Packages are tailored to your goals and budget, focusing on high‑impact pages first. Ask about affordable next js development to get a clear, fixed quote.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a quick call. Share your goals and pages needed, and you’ll get a simple plan, timeline, and pricing—no tech talk, just outcomes.",
  },
];

const NextJsFaq = ({ data }: NextJsFaqProps) => {
  const [value, setValue] = useState<string>();
  const faqContent = data && data.length ? data : nextJsFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Next.js Websites
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Clear answers to help you choose a fast, SEO‑friendly site that’s easy to manage and built to convert.
          </p>
        </div>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faqContent.slice(0, 5).map(({ question, answer }, index) => (
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

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faqContent.slice(5).map(({ question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index + 5}`}>
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
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Get affordable Next.js development
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextJsFaq;
