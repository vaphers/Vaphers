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

interface GoogleAdsFaqProps {
  data?: FaqItem[];
}

const googleAdsFaq: FaqItem[] = [
  {
    question: "What is Google Ads and how does it work?",
    answer:
      "Google Ads is an online advertising platform that helps businesses display their ads on Google search, YouTube, and partner websites. You pay only when users click your ads (pay-per-click), making it a cost-effective way to target high-intent customers.",
  },
  {
    question: "Why should I use an affordable Google Ads management service?",
    answer:
      "Professional and affordable Google Ads management ensures your campaigns are expertly set up, optimized, and continuously monitored, so you get the best results without overspending. Services like Vaphers focus on maximizing your ROI and minimizing wasted ad spend.",
  },
  {
    question: "How quickly can I see results with Google Ads?",
    answer:
      "You can start seeing targeted traffic and leads within days of launching your campaigns. However, continuous optimization is key to improving results over time through better targeting, ad copy, and budget management.",
  },
  {
    question: "What's included in an affordable Google Ads management service?",
    answer:
      "Typical services include campaign setup, keyword research, ad creative design, bid strategy, negative keyword management, tracking and reporting, and ongoing optimization. Vaphers tailors every aspect to fit your business needs and budget.",
  },
  {
    question: "How do I know if my Google Ads are performing well?",
    answer:
      "You'll receive regular reports detailing clicks, impressions, conversions, and ad spend. Our affordable Google Ads management service includes transparent dashboards so you can always track your return on investment.",
  },
  {
    question: "Can Google Ads help my small business compete with larger brands?",
    answer:
      "Absolutely! With precise targeting and smart bidding, even a small budget can reach ideal customers looking for your services. Affordable Google Ads management helps you compete by focusing on hyper-relevant keywords and audiences.",
  },
  {
    question: "Are there hidden costs in Google Ads management?",
    answer:
      "No. Our affordable Google Ads management service is fully transparent—no hidden fees or commissions. You'll know exactly what you're paying for and where your budget goes.",
  },
  {
    question: "How do I get started with Vaphers' Google Ads management?",
    answer:
      "Simply request a free audit or consultation. We'll review your goals, propose a budget, and tailor a Google Ads management plan that fits your business. Affordable packages are available for startups and established businesses alike.",
  },
];

const GoogleAdsFaq = ({ data }: GoogleAdsFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : googleAdsFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
            Google Ads Management Service
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find out how the right strategy and expert support can help you
            grow faster with Google Ads, no matter your budget.
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

export default GoogleAdsFaq;
