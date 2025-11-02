'use client';

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

const metaAdsFaq: FaqItem[] = [
  { question: "How do Meta ads generate leads?", answer: "Use the Leads objective and choose a conversion location like Instant Forms or Click‑to‑Message. Instant Forms capture details on Facebook/Instagram, while Click‑to‑Message opens chats in Messenger or WhatsApp for real‑time qualification and booking." },
  { question: "Instant Forms vs Click‑to‑Message—what should I use?", answer: "Instant Forms reduce friction with prefill and custom questions for higher submit rates. Click‑to‑Message starts a chat to qualify and schedule fast. Many brands pair both: form for qualification plus messaging for follow‑up." },
  { question: "What setup is required to start?", answer: "Create a Business Manager, connect Pages/IG, verify domain, install Pixel + Conversions API, and set up events. In Ads Manager, choose the Leads objective and select conversion location: website, Instant Forms, calls, or messaging." },
  { question: "How much do Meta lead ads cost?", answer: "Costs vary by niche, audience size, and creative quality. Expect CPC/CPM to fluctuate; optimize for cost per lead and qualified lead. Use Advantage budget and creative testing to reduce CPL over time." },
  { question: "How do I improve lead quality?", answer: "Use Higher‑Intent forms with review step, add qualifying questions, exclude junk audiences, and connect to CRM for rapid follow‑up. For WhatsApp, use reply templates and quick replies to filter and book faster." },
  { question: "Can leads go directly to my CRM?", answer: "Yes. Use native integrations, Lead Center, or connectors/webhooks to push Instant Form submissions and messaging leads into your CRM for immediate outreach and tracking." },
  { question: "Which placements work best for lead gen?", answer: "Use Advantage+ placements to start, then review performance by family (Feeds, Stories, Reels, Messaging). Keep vertical 9:16 video for Stories/Reels and test static vs short video for Feeds." },
  { question: "How does attribution work on Meta?", answer: "Default attribution is typically 7‑day click/1‑day view. Compare with your CRM timestamps, use UTM parameters, and monitor both ‘leads’ and ‘conversion leads’ to align quantity with intent." },
];

const MetaFaq = ({ data }: PpcFaqProps) => {
  const [value, setValue] = useState<string>();
  const faqContent = data && data.length ? data : metaAdsFaq;

  return (
    <section className="relative">
      <div className="relative z-10 flex items-center justify-center px-6 py-12 lg:py-20">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-12">
            <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
              FAQs About{" "}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Meta Ads Lead Generation
              </span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Clear answers on Instant Forms, Click‑to‑Message, costs, attribution, setup, and improving lead quality.
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
    </section>
  );
};

export default MetaFaq;
