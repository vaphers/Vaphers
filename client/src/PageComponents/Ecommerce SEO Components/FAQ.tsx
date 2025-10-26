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

const EcommerceFaq = ({ data }: SeoFaqProps) => {
  const [value, setValue] = useState<string>();

  const ecommerceSeoFaq: FaqItem[] = [
    {
      question: "How long does it take to see results from ecommerce SEO?",
      answer:
        "Most ecommerce stores begin seeing initial improvements within 3-6 months. However, competitive product categories may take 6-12 months for significant ranking gains. Quick wins like technical fixes and on-page optimization can show results faster, while link building and content strategies deliver long-term growth.",
    },
    {
      question: "What's the difference between Shopify SEO and WooCommerce SEO?",
      answer:
        "Shopify is a hosted platform with built-in SEO features but limited customization, while WooCommerce offers more flexibility as a WordPress plugin. Shopify handles technical SEO automatically but has URL structure limitations, whereas WooCommerce allows complete control over permalinks, plugins, and server optimization. Both require platform-specific strategies for best results.",
    },
    {
      question: "How do I optimize product pages for search engines?",
      answer:
        "Effective product page optimization includes unique, keyword-rich descriptions (avoid manufacturer content), optimized title tags and meta descriptions, high-quality images with descriptive alt text, customer reviews, schema markup for rich snippets, clear product specifications, and fast page load speeds. Each product should target specific long-tail keywords.",
    },
    {
      question: "Does ecommerce SEO work for small online stores?",
      answer:
        "Yes! Small ecommerce stores can compete effectively by targeting long-tail keywords, focusing on niche products, building local SEO presence, creating detailed product content, and leveraging customer reviews. Unlike paid ads, SEO provides sustainable organic traffic that improves over time without increasing costs per click.",
    },
    {
      question: "How important is site speed for ecommerce SEO?",
      answer:
        "Site speed is critical for ecommerce SEO. Google uses Core Web Vitals as ranking factors, and slow sites have higher bounce rates and lower conversions. Aim for page load times under 3 seconds on mobile. Optimize images, enable compression, use CDNs, minimize JavaScript, and choose fast hosting to improve both rankings and user experience.",
    },
    {
      question: "Should I use paid ads or SEO for my online store?",
      answer:
        "The best strategy combines both. SEO provides long-term, cost-effective organic traffic with higher trust and better ROI over time, while paid ads deliver immediate visibility and sales. Start with foundational SEO, then supplement with paid campaigns for new products, seasonal promotions, and competitive keywords where organic ranking is difficult.",
    },
    {
      question: "What is schema markup and why does my ecommerce store need it?",
      answer:
        "Schema markup is structured data code that helps search engines understand your product information. It enables rich snippets showing prices, ratings, availability, and reviews directly in search results. This increases click-through rates by 20-30%, improves visibility in Google Shopping, and helps your products appear in voice search results.",
    },
    {
      question: "How can I rank my products in Google Shopping?",
      answer:
        "To appear in Google Shopping, set up a Google Merchant Center account, create a product feed with accurate titles, descriptions, prices, and images, implement Product schema markup on your site, optimize product data with relevant keywords, maintain competitive pricing, and ensure high-quality images. Paid Google Shopping ads can supplement organic visibility.",
    },
    {
      question: "What are the most common ecommerce SEO mistakes to avoid?",
      answer:
        "Common mistakes include duplicate content from manufacturer descriptions, thin product pages with minimal text, ignoring mobile optimization, slow site speed, poor internal linking, missing alt tags on images, no customer reviews, weak or missing meta descriptions, neglecting technical SEO issues, and failing to optimize category pages.",
    },
    {
      question: "How do I handle SEO for out-of-stock products?",
      answer:
        "Keep out-of-stock product pages live with 'currently unavailable' messaging rather than deleting them. This preserves SEO value, backlinks, and rankings. Add email signup for restock notifications, suggest similar available products, and use schema markup to indicate availability status. Only use 301 redirects if the product is permanently discontinued.",
    },
  ];

  const faqContent = data && data.length ? data : ecommerceSeoFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{' '}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Ecommerce SEO Services
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Common questions about optimizing online stores for search engines and driving organic sales
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

export default EcommerceFaq;
