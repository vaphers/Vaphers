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

export interface FaqItem {
  question: string;
  answer: string;
}

interface DynamicFaqProps {
  heading: string;
  description?: string;
  faqs: FaqItem[];
  ctaText?: string;
  ctaLink?: string; 
  onCtaClick?: () => void; 
}

const DynamicFaq = ({ 
  heading, 
  description, 
  faqs, 
  ctaText = "Get Started Today",
  ctaLink,
  onCtaClick 
}: DynamicFaqProps) => {
  const [value, setValue] = useState<string>();

  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            <span dangerouslySetInnerHTML={{ __html: heading }} />
          </h4>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10 items-start">
          {/* Left Column */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {leftColumnFaqs.map(({ question, answer }, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
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

          {/* Right Column */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {rightColumnFaqs.map(({ question, answer }, index) => (
              <AccordionItem key={index} value={`item-${index + midPoint}`}>
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
            {ctaLink ? (
                <a href={ctaLink}>
                     <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        {ctaText}
                    </button>
                </a>
            ) : (
                <button 
                  onClick={onCtaClick}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                    {ctaText}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default DynamicFaq;
