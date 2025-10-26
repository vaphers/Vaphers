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

const SeoAuditFaq = ({ data }: SeoFaqProps) => {
  const [value, setValue] = useState<string>();

  const seoAuditFaqs: FaqItem[] = [
    {
      question: "What is an SEO audit?",
      answer:
        "An SEO audit is a comprehensive analysis of your website's search engine optimization health and performance. It evaluates technical factors like site speed, mobile responsiveness, and crawlability; on-page elements including content quality, meta tags, and keyword optimization; and off-page factors such as backlink profiles. The audit identifies issues preventing your site from ranking higher and provides actionable recommendations to improve visibility, traffic, and conversions.",
    },
    {
      question: "How much does an SEO audit cost?",
      answer:
        "SEO audit costs vary based on website size and complexity. Basic audits for small websites (10-50 pages) typically range from $500-$2,000, while comprehensive audits for large ecommerce sites or enterprise websites can cost $3,000-$10,000+. Many agencies, including Vaphers, offer free initial audits that identify major issues, with detailed paid audits available for in-depth analysis and implementation roadmaps.",
    },
    {
      question: "How long does an SEO audit take?",
      answer:
        "A basic SEO audit typically takes 1-3 business days for small to medium websites. Comprehensive audits for larger sites with thousands of pages can take 1-2 weeks. The timeline depends on website complexity, number of pages, technical issues discovered, and depth of competitor analysis. You'll receive an initial summary quickly, followed by a detailed report with prioritized recommendations.",
    },
    {
      question: "What's included in an SEO audit?",
      answer:
        "A complete SEO audit includes technical analysis (site speed, mobile optimization, crawl errors, indexation issues), on-page SEO review (meta tags, content quality, keyword optimization, internal linking), backlink profile assessment, competitor analysis, Core Web Vitals evaluation, structured data validation, and security checks. You'll receive a prioritized action plan categorizing issues as critical, high, medium, or low priority with implementation timelines.",
    },
    {
      question: "How often should I get an SEO audit?",
      answer:
        "Most businesses should conduct comprehensive SEO audits every 6-12 months to identify new issues and opportunities. High-traffic ecommerce sites or rapidly growing businesses may benefit from quarterly audits. Additionally, perform audits after major website redesigns, platform migrations, Google algorithm updates, or if you notice significant traffic drops. Regular mini-audits every 3 months help maintain optimal performance.",
    },
    {
      question: "Can I do an SEO audit myself?",
      answer:
        "Yes, you can perform basic SEO audits using free tools like Google Search Console, Google PageSpeed Insights, and screaming frog SEO Spider. However, professional audits provide deeper insights, advanced technical analysis, competitive intelligence, and expert recommendations that DIY tools miss. Professional auditors also prioritize issues based on impact and provide implementation guidance, saving time and preventing costly mistakes.",
    },
    {
      question: "What's the difference between an SEO audit and SEO services?",
      answer:
        "An SEO audit is a diagnostic assessment that identifies problems and opportunities, providing a roadmap for improvement. SEO services involve ongoing implementation of audit recommendations, including content creation, link building, technical fixes, and continuous optimization. Think of an audit as a health checkup that diagnoses issues, while SEO services are the treatment plan that fixes problems and maintains long-term performance.",
    },
    {
      question: "Will an SEO audit improve my rankings immediately?",
      answer:
        "An audit itself won't improve rankings—it's the diagnostic step. Rankings improve after implementing audit recommendations. Quick technical fixes (like broken links or meta tag updates) may show results in 2-4 weeks, while content improvements and link building typically take 3-6 months. The audit prioritizes issues by impact, allowing you to focus on high-value fixes that deliver faster results.",
    },
    {
      question: "What tools are used in an SEO audit?",
      answer:
        "Professional SEO audits use industry-leading tools including Google Search Console and Analytics, SEMrush or Ahrefs for competitive analysis, Screaming Frog for technical crawling, GTmetrix or PageSpeed Insights for performance testing, and specialized tools for schema validation, backlink analysis, and keyword research. Expert auditors combine automated tool data with manual analysis for comprehensive insights.",
    },
    {
      question: "Do I need an SEO audit if my website is new?",
      answer:
        "Yes! A pre-launch or early-stage SEO audit is crucial for new websites. It ensures proper technical foundation, identifies crawlability issues, validates structured data implementation, confirms mobile optimization, and sets up analytics correctly from day one. Fixing issues before they impact rankings is far easier and more cost-effective than correcting problems after launch. New sites benefit from audits that establish best practices early.",
    },
  ];

  const faqContent = data && data.length ? data : seoAuditFaqs;

  return (
    <div className="flex items-center justify-center px-6 py-12 lg:py-20">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            FAQs About{' '}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              SEO Audits
            </span>
          </h4>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Common questions about SEO audits, costs, timelines, and what to expect from professional website analysis
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

export default SeoAuditFaq;
