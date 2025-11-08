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

interface WordPressFaqProps {
  data?: FaqItem[];
}

const wordPressFaq: FaqItem[] = [
  {
    question: "What is WordPress and why should I use it for my website?",
    answer:
      "WordPress is a powerful, user-friendly platform that powers over 43% of all websites globally. It's perfect for businesses because you can easily update content without coding skills, it's SEO-friendly, and has thousands of plugins to add features as you grow. You get enterprise-level capabilities at affordable costs.",
  },
  {
    question: "How long does it take to build a WordPress website?",
    answer:
      "A basic business website (5-7 pages) typically takes 2-4 weeks. More complex sites with ecommerce, custom features, or membership systems take 6-8 weeks. We'll provide a detailed timeline after discussing your specific requirements and goals.",
  },
  {
    question: "Can I update my WordPress website myself?",
    answer:
      "Absolutely! WordPress is designed to be user-friendly. We'll provide training on managing content, adding pages, uploading images, and making updates. You can handle day-to-day changes yourself without technical skills—no developer needed for basic updates.",
  },
  {
    question: "Will my WordPress website work on mobile devices?",
    answer:
      "Yes, 100%. All our WordPress websites are fully responsive and mobile-optimized from day one. Your site will look great and function perfectly on smartphones, tablets, and desktops. Mobile optimization is standard in our development process.",
  },
  {
    question: "How much does a WordPress website cost?",
    answer:
      "Basic business websites start around $2,000-5,000. Ecommerce sites range from $5,000-15,000+. Custom enterprise solutions vary based on requirements. We'll provide a clear, fixed quote after understanding your needs—no hidden fees or surprises.",
  },
  {
    question: "Is WordPress good for SEO and Google rankings?",
    answer:
      "Yes! WordPress is SEO-friendly by default with clean code structure. We optimize your site with proper meta tags, schema markup, fast loading speeds, and mobile responsiveness—all factors Google loves. Many top-ranking websites use WordPress.",
  },
  {
    question: "Can I add ecommerce to my WordPress site later?",
    answer:
      "Absolutely! WordPress is highly scalable. You can start with a simple business site and add WooCommerce, booking systems, membership features, or custom functionality anytime. We design sites with future growth in mind.",
  },
  {
    question: "Who owns the website after it's built?",
    answer:
      "You own 100% of your website, content, and code. You'll have full admin access, hosting credentials, and all files. You're never locked into our services—though we hope you'll stay for ongoing support and maintenance.",
  },
  {
    question: "Do you provide website maintenance and support?",
    answer:
      "Yes! We offer comprehensive maintenance packages including regular WordPress updates, security monitoring, daily backups, performance optimization, and priority support. Issues are resolved within 24 hours, keeping your site secure and running smoothly.",
  },
  {
    question: "How do I get started with my WordPress website?",
    answer:
      "Book a free consultation call. We'll discuss your business goals, required features, and budget. Then you'll receive a detailed proposal with timeline, pricing, and next steps—simple and straightforward, no tech jargon.",
  },
];

const WordPressFaq = ({ data }: WordPressFaqProps) => {
  const [value, setValue] = useState<string>();
  const faqContent = data && data.length ? data : wordPressFaq;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              WordPress Website Design
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Clear answers to common questions about building a professional WordPress website for your business.
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
            Start Your WordPress Project Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordPressFaq;
