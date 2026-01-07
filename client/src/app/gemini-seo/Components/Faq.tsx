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

interface GeminiSeoFaqProps {
  data?: FaqItem[];
}

const geminiSeoFaq: FaqItem[] = [
  {
    question: "What is Gemini SEO and why do I need it?",
    answer:
      "Gemini SEO is the process of optimizing your content to get cited in Google's AI Overviews and Gemini search results. With 650 million monthly active users and AI Overviews appearing in 60% of searches, Gemini users are actively researching solutions and making informed decisions. Getting cited means reaching high-intent prospects at the exact moment they're evaluating options, delivering qualified leads that traditional SEO can't match.",
  },
  {
    question: "How is Gemini SEO different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for keyword rankings and organic traffic. Gemini SEO optimizes for AI citations and AI Overview features. While traditional Google shows organic listings, AI Overviews provide direct answers with cited sources at the top of results. Success requires schema markup, conversational content, topical authority, and structured data. You're not just competing for rankings, you're competing to be Google's AI trusted source.",
  },
  {
    question: "How long does it take to get cited in Google AI Overviews?",
    answer:
      "Initial AI Overview appearances typically occur within 6-10 weeks of implementing Gemini SEO strategies. Building consistent citation authority takes 3-6 months of focused optimization. Factors include your existing domain authority, content quality, structured data implementation, and competition in your niche. Quick wins come from optimizing high-authority pages with FAQ schema, while long-term success requires comprehensive LLM content strategy.",
  },
  {
    question: "What makes content citation-worthy for Google Gemini?",
    answer:
      "Citation-worthy content demonstrates clear topical authority, provides accurate and verifiable information, uses structured formatting like FAQ schema and HowTo markup, answers questions conversationally and directly, includes recent statistics and examples, features natural language patterns, and comes from trusted domains. Gemini favors content that AI can confidently cite as helpful for users making complex decisions.",
  },
  {
    question: "Can I track my Gemini SEO performance?",
    answer:
      "Yes. Track AI Overview appearances by monitoring target queries in Google Search Console, measure referral traffic from google.com AI features in Google Analytics, use SERP tracking tools to monitor AI Overview visibility, analyze competitor citations in your niche, and track conversational keyword rankings. Our Gemini SEO services include real-time AI Overview monitoring, weekly optimization reports, and transparent ROI metrics showing citation frequency and traffic impact.",
  },
  {
    question: "How much does Gemini SEO cost?",
    answer:
      "Gemini SEO investment varies based on your industry, competition level, and business goals. Most businesses invest $2,000-$6,000+ monthly for comprehensive AI optimization including schema implementation, conversational content creation, technical optimization, and AI Overview monitoring. ROI typically ranges from 400-600% as AI citations drive highly qualified leads with strong purchase intent, shorter sales cycles, and better conversion rates compared to traditional organic traffic.",
  },
  {
    question: "Does Gemini SEO work for B2B or B2C businesses?",
    answer:
      "Both benefit significantly. B2B businesses benefit from Gemini's professional user base researching complex solutions, comparing vendors, and evaluating enterprise features through multi-step queries. B2C businesses capture consumers researching products, reading comparisons, and making purchase decisions via voice and mobile search. Local B2C businesses especially benefit from conversational queries and location-based AI recommendations. The key is optimizing for your audience's specific search patterns and decision journey.",
  },
  {
    question: "Should I hire an agency for Gemini SEO?",
    answer:
      "Gemini SEO requires specialized expertise in schema markup, conversational content optimization, AI Overview targeting, and structured data implementation. Agencies bring proven frameworks, access to AI tracking tools, multi-platform LLM optimization expertise, and dedicated account management. Most businesses lack in-house Gemini SEO knowledge, making agencies the faster path to AI Overview citations, qualified leads, and measurable ROI with transparent reporting.",
  },
];

const GeminiSeoFaq = ({ data }: GeminiSeoFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : geminiSeoFaq;

  return (
    <div className="w-full relative bg-white">
      {/* Dashed Grid Background */}
      <div
        className="absolute inset-0 z-0"
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

      <div className="flex items-center justify-center px-6 py-12 lg:py-14 relative z-10">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-12">
            <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
              FAQs About{" "}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Gemini SEO
              </span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about Gemini SEO strategies, AI Overview optimization, costs, ROI, and how to dominate Google's AI search results.
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
              {faqContent.slice(0, 4).map(({ question, answer }, index) => (
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
              {faqContent.slice(4).map(({ question, answer }, index) => (
                <AccordionItem key={question} value={`question-${index + 4}`}>
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
        </div>
      </div>
    </div>
  );
};

export default GeminiSeoFaq;
