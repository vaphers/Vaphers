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

const faq = [
  {
    question: "What is digital marketing?",
    answer:
      "Digital marketing is the promotion of your business through online channels like search engines, social media, email, and websites. It helps you reach your target audience where they spend their time online and is more cost-effective than traditional marketing.",
  },
  {
    question: "How long does it take to see SEO results?",
    answer:
      "SEO typically takes 3-6 months to show significant results. However, you may notice small improvements within the first few weeks. SEO is a long-term investment that delivers sustainable organic traffic and continues working for your business over time.",
  },
  {
    question: "What is the difference between SEO and PPC?",
    answer:
      "SEO (Search Engine Optimization) focuses on improving organic search rankings and provides long-term results. PPC (Pay-Per-Click) delivers immediate visibility through paid ads but stops when you stop paying. Both strategies work best when used together.",
  },
  {
    question: "How much should I budget for digital marketing?",
    answer:
      "Most small businesses allocate 7-12% of their revenue to marketing. The exact budget depends on your goals, industry, and competition. We offer affordable packages starting with essential services and scaling up as your business grows.",
  },
  {
    question: "Do I need social media for my business?",
    answer:
      "Yes, social media helps you connect with customers, build brand awareness, and drive website traffic. Focus on platforms where your target audience spends time, whether that's Facebook, Instagram, LinkedIn, or others relevant to your industry.",
  },
  {
    question: "What is local SEO and why does it matter?",
    answer:
      "Local SEO helps your business appear in local search results when people search for services near them. It's crucial for businesses with physical locations or serving specific areas, helping you attract nearby customers actively looking for your services.",
  },
  {
    question: "How do Google Ads work?",
    answer:
      "Google Ads displays your ads when people search for keywords related to your business. You only pay when someone clicks your ad. With proper targeting and optimization, Google Ads can generate qualified leads and provide immediate visibility at the top of search results.",
  },
  {
    question: "What is a conversion rate?",
    answer:
      "Conversion rate is the percentage of website visitors who complete a desired action, like making a purchase or filling out a contact form. A higher conversion rate means your marketing efforts are effectively turning visitors into customers or leads.",
  },
  {
    question: "Can I do digital marketing myself?",
    answer:
      "While basic digital marketing is possible on your own, effective campaigns require expertise, time, and ongoing optimization. An experienced agency provides strategy, tools, and knowledge to maximize your ROI while you focus on running your business.",
  },
  {
    question: "How do you measure digital marketing success?",
    answer:
      "We track key metrics like website traffic, search rankings, conversion rates, cost per lead, click-through rates, and ROI. You'll receive regular reports showing exactly how your campaigns perform and the real business results we're delivering for your investment.",
  },
];

const Faq = () => {
  const [value, setValue] = useState<string>();

  return (
    <div className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-(--breakpoint-xl)">
        <h4 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
          FAQS About <span className="bg-blue-600 bg-clip-text text-transparent">Digital Marketing</span>
        </h4>
        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(0, 5).map(({ question, answer }, index) => (
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
            {faq.slice(5).map(({ question, answer }, index) => (
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
      </div>
    </div>
  );
};

export default Faq;
