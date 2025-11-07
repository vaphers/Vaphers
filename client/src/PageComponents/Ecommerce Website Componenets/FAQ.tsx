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

interface EcommerceFaqProps {
  data?: FaqItem[];
}

const ecommerceFaq: FaqItem[] = [
  {
    question: "Why invest in a custom eCommerce website?",
    answer:
      "A custom eCommerce site maximizes your brand impact, streamlines customer experience, and gives you control over design, features, and performance. Your store looks unique, loads faster, and is built to scale sales.",
  },
  {
    question: "How do you build eCommerce sites for better SEO?",
    answer:
      "We use clean code, mobile-first layouts, fast page loads, and SEO best practices. Your site gets organized product categories, proper meta tags, schema markup, and lightning-fast structure to improve Google rankings.",
  },
  {
    question: "Can I easily update products and content myself?",
    answer:
      "Yes. You’ll have a simple dashboard to add products, update descriptions, and manage inventory—no coding needed. Simple content workflows help you add offers or new categories anytime.",
  },
  {
    question: "How secure is the checkout on your eCommerce sites?",
    answer:
      "Every store uses HTTPS/SSL security, trusted payment gateways, and regular updates to protect your business and earn customer trust. Security is built in from day one.",
  },
  {
    question: "Can you integrate WhatsApp, analytics, and marketing tools?",
    answer:
      "Absolutely. We connect your site with Google Analytics, Facebook Pixel, WhatsApp chat, email marketing platforms, and more, so you can analyze, engage, and automate your sales.",
  },
  {
    question: "What does your eCommerce SEO service include?",
    answer:
      "We provide keyword research, SEO-optimized product/category pages, technical SEO (like sitemaps and robots.txt), and competitor analysis to make sure your online store gets discovered.",
  },
  {
    question: "How is your service different from Shopify or WordPress?",
    answer:
      "Our sites are tailor-made with more design freedom, lightning speed, and SEO flexibility compared to boxed solutions. You get a real competitive edge and only the features you need.",
  },
  {
    question: "Is eCommerce SEO affordable for small businesses?",
    answer:
      "Yes. Packages are made for every budget, focusing on pages and strategies that actually drive sales. You get results-driven, affordable eCommerce SEO from day one.",
  },
  {
    question: "How long does it take to launch my SEO-ready store?",
    answer:
      "Stores usually launch in 2–6 weeks, depending on design and content. We use a clear roadmap and fast communication to keep your project moving quickly.",
  },
  {
    question: "How do I get started with your eCommerce SEO services?",
    answer:
      "Book a quick call or send your details. We’ll map out your goals, product focus, and strategy—no jargon, just a direct plan to increase your online sales.",
  },
];

const EcommerceDevFaq = ({ data }: EcommerceFaqProps) => {
  const [value, setValue] = useState<string>();
  const faqContent = data && data.length ? data : ecommerceFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              eCommerce Website SEO
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Detailed answers about launching a secure, high-ranking online store designed to grow your business.
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

export default EcommerceDevFaq;
