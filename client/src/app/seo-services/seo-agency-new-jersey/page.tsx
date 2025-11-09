import Head from "next/head";

import Banner from "@/PageComponents/City Page Components/Banner";
import CityPageFAQ from "@/PageComponents/City Page Components/FAQ";
import CityHero from "@/PageComponents/City Page Components/Hero";
import LeadingAgency from "@/PageComponents/City Page Components/LeadingAgency";
import SeoPitchSection from "@/PageComponents/City Page Components/Pitch";
import SeoProcessSection from "@/PageComponents/City Page Components/Process";
import PremierServiceProvider from "@/PageComponents/City Page Components/ServiceProvider";
import SeoServicesAccordion from "@/PageComponents/City Page Components/Services";
import WhatsSEO from "@/PageComponents/City Page Components/WhatsSEO";
import WhyUs from "@/PageComponents/City Page Components/WhyUs";
import Stats from "@/PageComponents/Global Components/Stats";
import Testimonial from "@/PageComponents/Global Components/Testimonial";
import SmoothScrollHero from "@/PageComponents/Landing Home/Results";
import ContactForm from "@/PageComponents/Global Components/Contact";
import AiSection from "@/PageComponents/City Page Components/AiSection";
import SeoEssential from "@/PageComponents/City Page Components/Essential";

// Example FAQ data, ideally import from FAQ component file if exported
const faqData = [
 {
    question: "How much does a professional website cost?",
    answer:
      "Budgets vary by scope, but most custom small–mid websites fall in a broad range depending on page count, design depth, integrations, e‑commerce, and content creation. Ask for an itemized scope with inclusions (pages, copy/SEO, integrations, QA, training, support) so proposals are comparable.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "A focused small business site can launch in 3–6 weeks across discovery, design, development, QA, and launch. Complex features (e‑commerce, portals, custom integrations) extend timelines. Clear milestones and approvals help keep schedules predictable.",
  },
  {
    question: "What’s included in web design services?",
    answer:
      "Typical inclusions: discovery and sitemap, UX/UI design, mobile‑responsive build, content integration, on‑page SEO basics (meta, headings, alt text, schema where relevant), performance tuning, QA, analytics/search console setup, and launch support.",
  },
  {
    question: "Do I own my website, code, and content?",
    answer:
      "Yes—ownership should transfer at handoff. Ensure your contract states you own code, content, and accounts (domain, hosting, CMS, analytics). Request access and documentation at project completion.",
  },
  {
    question: "Is SEO included with my website?",
    answer:
      "Most projects include on‑page SEO foundations (semantics, metadata, clean URLs, internal links, alt text, schema where relevant) and technical best practices (sitemaps, performance, mobile responsiveness). Ongoing SEO campaigns are typically separate.",
  },
  {
    question: "How many design revisions are included?",
    answer:
      "A common model is unlimited design revisions before development, then change requests via a simple change order once build starts. Confirm revision rounds and what constitutes a change vs. scope expansion.",
  },
  {
    question: "Do you provide maintenance and support?",
    answer:
      "Post‑launch support often covers backups, security updates, and minor fixes for 30–60 days, followed by monthly maintenance plans as needed. Ask about staging updates, uptime monitoring, and response SLAs.",
  },
  {
    question: "Which platform should I choose (WordPress, Shopify, custom)?",
    answer:
      "Match platform to needs: WordPress for content‑led sites, Shopify for e‑commerce, and custom frameworks for specialized apps. Consider editorial workflow, integrations, scalability, TCO, and performance when selecting.",
  },
];

export default function Page() {
  const cityName = "New Jersey";

  // Generate FAQ schema JSON-LD format
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          key="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main>
        <CityHero cityName={cityName} />
        <SeoPitchSection cityName={cityName} />
        <SmoothScrollHero />
        <SeoServicesAccordion cityName={cityName} />
        <WhyUs cityName={cityName} />
        <Banner cityName={cityName} />
        <Testimonial />
        <AiSection cityName="New Jersey"/>
        <WhatsSEO cityName={cityName} />
        <SeoProcessSection cityName={cityName} />
        <LeadingAgency cityName={cityName} />
        <SeoEssential cityName="New Jersey"/>
        <PremierServiceProvider cityName={cityName} />
        <Stats />
        <CityPageFAQ cityName={cityName} data={faqData} />
        <ContactForm/>
      </main>
    </>
  );
}
