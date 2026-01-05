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

interface ChatGPTSeoFaqProps {
  data?: FaqItem[];
}

const chatGPTSeoFaq: FaqItem[] = [
  {
    question: "What is ChatGPT SEO and why do I need it?",
    answer:
      "ChatGPT SEO is the process of optimizing your content to get cited in ChatGPT's search results and AI-generated responses. With 3.7+ billion monthly visits and 37.5 million daily searches, ChatGPT users are actively researching solutions and making buying decisions. Getting cited means reaching high-intent prospects at the exact moment they're evaluating options, delivering qualified leads that traditional SEO can't match.",
  },
  {
    question: "How is ChatGPT SEO different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for keyword rankings and backlinks. ChatGPT SEO optimizes for conversational queries and AI citations using natural language processing. While Google shows ranked results based on keywords and EEAT, ChatGPT provides direct answers with cited sources based on semantic understanding and contextual relevance. Success requires answer-first formatting, structured data, and content that directly addresses user questions rather than keyword density.",
  },
  {
    question: "How long does it take to get cited in ChatGPT?",
    answer:
      "Initial citations typically appear within 4-8 weeks of implementing AI SEO strategies. Building consistent citation authority takes 3-6 months of focused optimization. Factors include your existing domain authority, content quality, E-E-A-T signals, and competition in your niche. Quick wins come from optimizing high-authority pages with answer-first formatting, while long-term success requires comprehensive conversational content strategy.",
  },
  {
    question: "What makes content citation-worthy for ChatGPT?",
    answer:
      "Citation-worthy content demonstrates clear expertise, provides accurate and verifiable data, uses conversational long-tail keywords, answers specific questions directly with answer-first formatting, includes recent statistics and examples, employs bullet points and structured lists, and comes from authoritative domains. ChatGPT favors content optimized for natural language processing that AI can confidently cite as trustworthy and helpful for users making decisions.",
  },
  {
    question: "Can I track my ChatGPT SEO performance?",
    answer:
      "Yes. Track citation frequency using automated AEO platforms like Relixir that monitor ChatGPT mentions across thousands of prompts, measure referral traffic from chatgpt.com in Google Analytics, use citation tracking tools to identify when you're cited, analyze competitor citations in your niche, and monitor conversational query rankings. Leading platforms combine citation tracking with automated content generation and can flip AI rankings in under 30 days.",
  },
  {
    question: "How much does ChatGPT SEO cost?",
    answer:
      "ChatGPT SEO investment varies based on your industry, competition, and goals. Most businesses invest $2,000-$5,000+ monthly for comprehensive AI optimization including conversational content creation, E-E-A-T building, technical optimization, and citation monitoring. Basic packages start at $2,500/month with setup fees around $1,500. ROI typically ranges from 300-500% as citations drive highly qualified leads with transactional intent (9x higher) and shorter sales cycles.",
  },
  {
    question: "Does ChatGPT SEO work for B2B or B2C businesses?",
    answer:
      "Both. B2B businesses benefit from ChatGPT's professional user base researching solutions, comparing vendors, and evaluating features using detailed conversational queries. B2C businesses capture consumers researching products, reading reviews, and making purchase decisions with transactional intent. ChatGPT's conversational interface is especially powerful for complex decision-making processes. The key is optimizing for your audience's specific natural language search patterns and question-based queries.",
  },
  {
    question: "Should I hire an agency for ChatGPT SEO?",
    answer:
      "ChatGPT SEO requires specialized expertise in conversational AI optimization, natural language processing, citation strategies, answer-first content formatting, and automated citation tracking platforms. Agencies bring proven frameworks, access to AEO monitoring tools like Relixir, multi-channel AI optimization expertise, and dedicated account management. Most businesses lack in-house ChatGPT SEO expertise, making agencies the faster path to citations, qualified leads with high transactional intent, and measurable ROI.",
  },
];

const ChatGPTSeoFaq = ({ data }: ChatGPTSeoFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : chatGPTSeoFaq;

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
                ChatGPT SEO
              </span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about ChatGPT SEO strategies, AI citations, costs, ROI, and how to dominate conversational AI search results.
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

export default ChatGPTSeoFaq;
