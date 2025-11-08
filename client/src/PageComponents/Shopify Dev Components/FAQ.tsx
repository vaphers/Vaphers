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

interface ShopifyFaqProps {
  data?: FaqItem[];
}

const shopifyFaq: FaqItem[] = [
  {
    question: "What is Shopify and why should I use it for my online store?",
    answer:
      "Shopify is an all-in-one e-commerce platform that powers 5.8+ million stores globally. It's perfect for online businesses because you get hosting, security, payment processing, and inventory management in one place—no technical setup required. Launch in minutes, manage everything from one dashboard, and scale effortlessly with the world's highest-converting checkout.",
  },
  {
    question: "How long does it take to build a Shopify store?",
    answer:
      "A basic Shopify store can be set up in 1-3 days if you're using templates. Professional custom-designed stores typically take 2-8 weeks depending on complexity, custom features, and product catalog size. We'll provide a detailed timeline after understanding your specific requirements and design preferences.",
  },
  {
    question: "How much does a Shopify store cost?",
    answer:
      "Shopify plans start at $25-79/month for the platform. Professional store development ranges from $3,000-7,000 for mid-level stores, and $15,000-50,000+ for enterprise Shopify Plus stores with custom features. Monthly costs include your plan ($25-299), apps ($30-250), and marketing budget—predictable, all-inclusive pricing.",
  },
  {
    question: "Can I manage my Shopify store myself without coding?",
    answer:
      "Absolutely! Shopify is designed for non-technical users. You can easily add products, manage inventory, process orders, and update content through an intuitive dashboard—no coding needed. We provide training and documentation so you can confidently run your store independently after launch.",
  },
  {
    question: "Is Shopify mobile-friendly and responsive?",
    answer:
      "Yes, 100%. All Shopify themes are mobile-responsive by default, and 70% of shoppers browse on mobile. Our stores are optimized for seamless experiences across smartphones, tablets, and desktops with fast load times (309ms average) and mobile-optimized checkout that converts 64% better than desktop-only designs.",
  },
  {
    question: "What's the difference between Shopify and WooCommerce?",
    answer:
      "Shopify is fully hosted with hosting, security, and support included—launch in minutes. WooCommerce is self-hosted on WordPress, requiring you to manage hosting, updates, and security yourself. Shopify is 2.5x faster (309ms vs 776ms), has 24/7 support, and offers hassle-free management—perfect for entrepreneurs focused on selling, not server maintenance.",
  },
  {
    question: "Can I migrate my existing store to Shopify?",
    answer:
      "Yes! We can migrate your store from WooCommerce, Magento, BigCommerce, or any platform to Shopify. This includes products, customer data, order history, and SEO settings. Migration typically takes 1-4 weeks depending on store size. We ensure zero downtime and minimal disruption to your business.",
  },
  {
    question: "Who owns my Shopify store and data?",
    answer:
      "You own 100% of your business data, customer information, and content. You have full admin access and can export all data anytime. While Shopify hosts the platform, you control your store completely and can migrate to another platform if needed—though we hope you'll love staying on Shopify!",
  },
  {
    question: "Do you provide Shopify maintenance and support?",
    answer:
      "Yes! We offer comprehensive Shopify maintenance including theme updates, app management, performance optimization, security monitoring, and priority technical support. Issues are resolved within 24 hours. Our maintenance packages keep your store fast, secure, and running smoothly 24/7 so you can focus on growing sales.",
  },
  {
    question: "How do I get started with my Shopify store?",
    answer:
      "Book a free consultation call with our team. We'll discuss your business goals, product catalog, design preferences, and budget. You'll receive a detailed proposal with pricing, timeline, and feature recommendations—clear and straightforward. No tech jargon, just honest advice to help you succeed.",
  },
];

const ShopifyFaq = ({ data }: ShopifyFaqProps) => {
  const [value, setValue] = useState<string>();
  const faqContent = data && data.length ? data : shopifyFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Shopify Store Development
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Clear answers to common questions about building a high-converting Shopify store for your e-commerce business.
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

        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Start Your Shopify Store Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyFaq;
