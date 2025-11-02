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


interface LeadGenFaqProps {
  data?: FaqItem[];
}


const leadGenerationFaq: FaqItem[] = [
  {
    question: "What is lead generation and why do I need it?",
    answer:
      "Lead generation is the process of attracting and converting potential customers into leads—prospects who have shown interest in your products or services. You need it to build a pipeline of qualified prospects that your sales team can convert into paying customers. Effective lead generation ensures a steady stream of qualified buyers, accelerates sales cycles, and drives sustainable business growth.",
  },
  {
    question: "What are the best lead generation strategies?",
    answer:
      "Top lead generation strategies include SEO optimization for organic traffic, targeted Google Ads and PPC campaigns for immediate visibility, LinkedIn marketing for B2B professionals, personalized email outreach, account-based marketing (ABM) for enterprise prospects, compelling content marketing, webinars and interactive tools, and strategic partnerships. The best approach combines multiple channels based on your target audience and sales cycle.",
  },
  {
    question: "How much does lead generation cost?",
    answer:
      "Lead generation costs vary based on your industry, competition, channels used, and target audience. SEO lead generation requires investment in content and optimization but delivers long-term value. PPC and Google Ads operate on a cost-per-click or cost-per-lead model with daily budget control. Most businesses invest between $500-$5,000+ monthly depending on scale and goals. ROI typically ranges from 200-400% with optimized campaigns.",
  },
  {
    question: "How quickly can I see results from lead generation?",
    answer:
      "Results depend on your strategy mix. Paid channels like Google Ads deliver immediate traffic and leads within days. SEO-based lead generation typically shows results in 3-6 months of consistent effort. Performance Max campaigns can scale leads within 2-4 weeks. Most businesses combine paid and organic strategies to get immediate results while building long-term organic momentum.",
  },
  {
    question: "What qualifies as a 'qualified lead'?",
    answer:
      "A qualified lead is a prospect who matches your ideal customer profile, has genuine interest in your solution, has budget authority or influence, and is actively searching for solutions. Qualified leads are scored based on fit, company size, industry, buying stage, and decision-making authority. Working with qualified leads reduces sales cycle time, improves conversion rates, and maximizes your ROI.",
  },
  {
    question: "How do you measure lead generation ROI?",
    answer:
      "Lead generation ROI is calculated using: (Customer Lifetime Value × Number of Customers - Total Cost) / Total Cost. Key metrics include Cost Per Lead (CPL), conversion rates, Customer Acquisition Cost (CAC), and sales-qualified leads (SQLs). Successful campaigns typically generate 2-4x ROI, with each dollar spent returning $2-$4 in revenue. Track these metrics continuously for optimization.",
  },
  {
    question: "What's the difference between lead generation for B2B vs B2C?",
    answer:
      "B2B lead generation targets decision-makers with longer sales cycles, higher deal values, and multiple stakeholders. Strategies include LinkedIn marketing, account-based marketing, whitepapers, and webinars. B2C lead generation targets individual consumers with shorter cycles and typically uses social media, content marketing, giveaways, and email campaigns. B2B focuses on relationship building; B2C focuses on volume and conversions.",
  },
  {
    question: "Should I manage lead generation in-house or hire an agency?",
    answer:
      "This depends on your expertise, budget, and resources. In-house management offers control but requires expertise in multiple channels and ongoing optimization. Agencies bring proven strategies, access to advanced tools, multi-channel expertise, and dedicated account management. Many successful businesses combine in-house SEO with agency-managed paid campaigns for balanced growth and expertise coverage.",
  },
];


const LeadGenerationFaq = ({ data }: LeadGenFaqProps) => {
  const [value, setValue] = useState<string>();


  const faqContent = data && data.length ? data : leadGenerationFaq;


  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-14">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Lead Generation
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about lead generation strategies, costs, ROI, and best practices for B2B and B2C businesses.
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


export default LeadGenerationFaq;
