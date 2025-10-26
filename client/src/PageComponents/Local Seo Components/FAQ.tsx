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

interface SeoFaqProps {
  data?: FaqItem[];
}

const LocalFaq = ({ data }: SeoFaqProps) => {
  const [value, setValue] = useState<string>();

  // Default Local SEO FAQ data optimized for AI and local search
  const localSeoFaq: FaqItem[] = [
    {
      question: "What is Local SEO and why is it important?",
      answer:
        "Local SEO helps your business show up when people near you search for your services. It ensures your business appears in Google Maps, local 3-packs, and AI search results like ChatGPT and voice assistants. Strong local SEO converts local searches into real customers.",
    },
    {
      question: "How do AI agents like ChatGPT use Local SEO data?",
      answer:
        "AI agents analyze structured business information such as your Google Business Profile, reviews, schema markup, and website FAQs to recommend your business. Optimizing local listings and answering common questions helps AI-driven search engines accurately understand and promote your services.",
    },
    {
      question: "How long does it take to see results from Local SEO?",
      answer:
        "Most businesses start noticing improvements in 3 to 6 months. However, if you regularly update your Google Business Profile, collect reviews, and maintain consistent NAP data across platforms, visibility improves faster — including in AI-assisted search results.",
    },
    {
      question: "How can I optimize my business for AI and voice search?",
      answer:
        "Focus on natural, conversational keywords that match how people talk to AI assistants. Add structured schema markup like FAQ and LocalBusiness schema to your site, use simple answers, and ensure your business information is clear, readable, and up to date across Google and Maps.",
    },
    {
      question: "What role do customer reviews play in Local SEO?",
      answer:
        "AI search tools and Google algorithms rely heavily on reviews to assess trust and authority. Responding to reviews and maintaining a steady stream of positive feedback helps your business rank higher and improves recommendation rates in AI and voice-based searches.",
    },
    {
      question: "Does Local SEO help small businesses compete with big brands?",
      answer:
        "Yes. AI-driven search engines now prioritize localized, context-rich data. Small businesses can outperform larger competitors by providing detailed, location-specific content, accurate data, and fast updates that align with local intent and real community presence.",
    },
    {
      question: "What are the key ranking factors for Local SEO in 2025?",
      answer:
        "The main factors are proximity, relevance, and prominence. AI-friendly updates include accurate Google Business Profiles, consistent NAP data, local backlinks, positive reviews, high-quality local content, and strong structured data for rich snippets and AI interpretations.",
    },
    {
      question: "How can schema markup improve my local rankings?",
      answer:
        "Schema markup helps AI engines and search crawlers understand your business details faster. Adding FAQ schema, LocalBusiness schema, geo-coordinates, reviews, and opening hours can increase the chances of appearing in AI overviews and map-rich snippets.",
    },
    {
      question: "What is the connection between Local SEO and AI search results?",
      answer:
        "AI search systems use a combination of structured data, user intent, and conversational cues to display business results. The more complete, accurate, and conversationally optimized your data is, the more likely AI systems like Perplexity or ChatGPT will mention your business.",
    },
    {
      question: "How can Local SEO increase voice search visibility?",
      answer:
        "To rank in voice searches, answer common queries concisely (under 40 words) and target 'near me' or location-based phrases. Voice assistants like Siri and Alexa pull results directly from well-optimized Google Business Profiles and schema-enriched websites.",
    },
  ];

  // Use passed data or fall back to default local SEO FAQs
  const faqContent = data && data.length ? data : localSeoFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Local SEO & AI Optimization
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how optimizing for AI search, Google Maps, and voice
            assistants can boost your business visibility and lead generation.
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
      </div>
    </div>
  );
};

export default LocalFaq;
