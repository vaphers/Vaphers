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

interface PpcFaqProps {
  data?: FaqItem[];
}

const ppcMarketingFaq: FaqItem[] = [
  {
    question: "What is PPC marketing and how does it work?",
    answer:
      "PPC marketing, or pay-per-click advertising, is a digital advertising model where you pay only when someone clicks your ad. It helps businesses quickly target customers searching for specific products or services online with targeted ads.",
  },
  {
    question: "How much does PPC marketing cost?",
    answer:
      "The cost of PPC marketing varies depending on your industry, target keywords, competition, and budget. You control your daily or monthly spend, and only pay when users click your ads. Proper campaign management maximizes efficiency to deliver great ROI.",
  },
  {
    question: "What platforms support PPC advertising?",
    answer:
      "Popular PPC platforms include Google Ads (search, display, shopping), Microsoft Advertising, Facebook Ads, Instagram Ads, LinkedIn Ads, and Twitter Ads, allowing you to reach diverse audiences across search engines and social media.",
  },
  {
    question: "How is PPC different from SEO?",
    answer:
      "PPC drives immediate paid traffic and quick results by bidding on ad placements. SEO builds organic search rankings over time but costs less per visit in the long run. Combining both strategies often yields the best results for sustainable growth.",
  },
  {
    question: "What is a good click-through rate (CTR) for PPC ads?",
    answer:
      "A good CTR varies by industry and platform, but typically ranges between 2-5% for search ads. Higher CTRs indicate well-targeted, relevant ads that resonate with your audience.",
  },
  {
    question: "Can small businesses benefit from PPC marketing?",
    answer:
      "Absolutely! PPC allows small businesses to compete with larger brands by targeting local or niche audiences, controlling budgets, and quickly generating leads with measurable results.",
  },
  {
    question: "How do I measure PPC marketing success?",
    answer:
      "Success is measured through metrics like click-through rates, cost per click, conversion rates, return on ad spend (ROAS), and overall campaign ROI. Effective management includes constant tracking, analysis, and optimization to improve these metrics.",
  },
  {
    question: "How do I get started with PPC marketing?",
    answer:
      "You can start by defining clear goals, choosing the right platforms and keywords, setting a budget, and either managing campaigns yourself or hiring expert PPC services to maximize your ad spend effectiveness.",
  },
];

const PpcMarketingFaq = ({ data }: PpcFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : ppcMarketingFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              PPC Marketing
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about PPC marketing, from costs to strategies and results.
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
  );
};

export default PpcMarketingFaq;
