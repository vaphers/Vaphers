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

interface PerplexitySeoFaqProps {
  data?: FaqItem[];
}

const perplexitySeoFaq: FaqItem[] = [
  {
    question: "What is Perplexity SEO and why do I need it?",
    answer:
      "Perplexity SEO is the process of optimizing your content to get cited in Perplexity AI's search results. With 780 million monthly queries across 238 countries, Perplexity users are actively researching solutions and making buying decisions. Getting cited means reaching high-intent prospects at the exact moment they're evaluating options, delivering qualified leads that traditional SEO can't match.",
  },
  {
    question: "How is Perplexity SEO different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for keyword rankings and traffic. Perplexity SEO optimizes for AI citations and recommendations. While Google shows 10 blue links, Perplexity provides direct answers with 3-5 cited sources. Success requires E-E-A-T signals, structured data, authoritative content, and citation-worthy expertise. You're not competing for rankings—you're competing to be the AI's trusted recommendation.",
  },
  {
    question: "How long does it take to get cited in Perplexity?",
    answer:
      "Initial citations typically appear within 4-8 weeks of implementing AI SEO strategies. Building consistent citation authority takes 3-6 months of focused optimization. Factors include your existing domain authority, content quality, E-E-A-T signals, and competition in your niche. Quick wins come from optimizing high-authority pages, while long-term success requires comprehensive AI content strategy.",
  },
  {
    question: "What makes content citation-worthy for Perplexity?",
    answer:
      "Citation-worthy content demonstrates clear expertise, provides accurate and verifiable data, uses structured formatting (lists, tables, definitions), answers specific questions directly, includes recent statistics and examples, and comes from authoritative domains. Perplexity favors content that AI can confidently cite as trustworthy, accurate, and helpful for users making decisions.",
  },
  {
    question: "Can I track my Perplexity SEO performance?",
    answer:
      "Yes. Track citation frequency by monitoring branded queries, measure referral traffic from perplexity.ai in Google Analytics, use citation monitoring tools to track when you're mentioned, analyze competitor citations in your niche, and monitor rankings for target queries. Our AI SEO Services include real-time citation tracking, weekly optimization reports, and transparent ROI metrics.",
  },
  {
    question: "How much does Perplexity SEO cost?",
    answer:
      "Perplexity SEO investment varies based on your industry, competition, and goals. Most businesses invest $1,500-$5,000+ monthly for comprehensive AI optimization including content creation, E-E-A-T building, technical optimization, and citation monitoring. ROI typically ranges from 300-500% as citations drive highly qualified leads with strong purchase intent and shorter sales cycles.",
  },
  {
    question: "Does Perplexity SEO work for B2B or B2C businesses?",
    answer:
      "Both. B2B businesses benefit from Perplexity's professional user base researching solutions, comparing vendors, and evaluating features. B2C businesses capture consumers researching products, reading reviews, and making purchase decisions. Perplexity Voice (40% of mobile queries) is especially powerful for local B2C businesses. The key is optimizing for your audience's specific search patterns and decision-making process.",
  },
  {
    question: "Should I hire an agency for Perplexity SEO?",
    answer:
      "AI SEO requires specialized expertise in algorithm behavior, citation strategies, E-E-A-T optimization, and structured data implementation. Agencies bring proven frameworks, access to citation monitoring tools, multi-channel AI optimization expertise, and dedicated account management. Most businesses lack in-house AI SEO expertise, making agencies the faster path to citations, qualified leads, and measurable ROI.",
  },
];

const PerplexitySeoFaq = ({ data }: PerplexitySeoFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : perplexitySeoFaq;

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
                Perplexity SEO
              </span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about Perplexity SEO strategies, AI citations, costs, ROI, and how to dominate AI search results.
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

export default PerplexitySeoFaq;
