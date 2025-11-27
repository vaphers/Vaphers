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

interface SemFaqProps {
  data?: FaqItem[];
}

const semMarketingFaq: FaqItem[] = [
  {
    question: "What is SEM (Search Engine Marketing)?",
    answer:
      "SEM is a comprehensive digital marketing strategy that increases your website's visibility in search engine results pages (SERPs) through both paid advertising and organic optimization. It combines PPC advertising with SEO techniques to maximize your online presence and drive targeted traffic to your website.",
  },
  {
    question: "How does SEM differ from SEO and PPC?",
    answer:
      "SEM is an umbrella term that encompasses both SEO (organic search optimization) and PPC (paid search advertising). SEO focuses on long-term organic rankings through content optimization, while PPC delivers immediate paid traffic. SEM combines both strategies for maximum search visibility and results.",
  },
  {
    question: "How much does SEM cost?",
    answer:
      "SEM costs vary based on your industry, competition, keywords, and strategy mix. PPC components operate on a pay-per-click model where you set daily budgets, while SEO requires investment in content creation and optimization. A balanced SEM strategy allows flexible budget allocation across both paid and organic channels for optimal ROI.",
  },
  {
    question: "How quickly can I see results from SEM?",
    answer:
      "SEM delivers both immediate and long-term results. PPC campaigns can drive traffic within hours of launching, while SEO efforts typically take 3-6 months to show significant organic growth. This dual-timeline approach ensures continuous visibility while building sustainable long-term rankings.",
  },
  {
    question: "What platforms are used for SEM?",
    answer:
      "The primary SEM platforms include Google Ads and Microsoft Advertising (Bing) for search campaigns. These platforms offer both paid search ads and tools for organic optimization. Many businesses also extend SEM strategies to YouTube, Amazon, and social media platforms for comprehensive search visibility.",
  },
  {
    question: "Can small businesses benefit from SEM?",
    answer:
      "Absolutely! SEM is highly effective for small businesses because it allows precise targeting, budget control, and measurable results. You can start with modest budgets, target local audiences, and scale as you see ROI. The combination of paid and organic strategies helps small businesses compete with larger competitors.",
  },
  {
    question: "How do I measure SEM success?",
    answer:
      "SEM success is measured through key performance indicators like click-through rates (CTR), conversion rates, cost per acquisition (CPA), return on ad spend (ROAS), organic rankings, organic traffic growth, and overall ROI. Analytics tools provide comprehensive tracking across both paid and organic channels for continuous optimization.",
  },
  {
    question: "Should I manage SEM myself or hire an agency?",
    answer:
      "This depends on your expertise, time, and budget. Managing SEM in-house requires knowledge of both PPC platforms and SEO best practices, ongoing optimization, and staying current with algorithm changes. Many businesses hire SEM agencies or specialists to maximize results, save time, and ensure professional campaign management across all channels.",
  },
];

const SemMarketingFaq = ({ data }: SemFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : semMarketingFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-2">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              SEM Marketing
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about search engine marketing, from strategy basics to costs and results.
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

export default SemMarketingFaq;
