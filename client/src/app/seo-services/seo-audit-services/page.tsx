import Head from "next/head";
import Banner from "@/PageComponents/Global Components/Banner";
import ContactForm from "@/PageComponents/Global Components/Contact";
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import SeoAuditPitch from "@/PageComponents/SEO Audit Coponents/Pitch";
import SEOAuditBenefits from "@/PageComponents/SEO Audit Coponents/HowItHelps";
import Testimonial04 from "@/PageComponents/Global Components/Testimonial";
import AuditServicesAccordion from "@/PageComponents/SEO Audit Coponents/Services";
import SeoAuditFaq from "@/PageComponents/SEO Audit Coponents/FAQ";

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an SEO audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An SEO audit is a comprehensive analysis of your website's search engine optimization health and performance. It evaluates technical factors like site speed, mobile responsiveness, and crawlability; on-page elements including content quality, meta tags, and keyword optimization; and off-page factors such as backlink profiles. The audit identifies issues preventing your site from ranking higher and provides actionable recommendations to improve visibility, traffic, and conversions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does an SEO audit cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO audit costs vary based on website size and complexity. Basic audits for small websites (10-50 pages) typically range from $500-$2,000, while comprehensive audits for large ecommerce sites or enterprise websites can cost $3,000-$10,000+. Many agencies, including Vaphers, offer free initial audits that identify major issues, with detailed paid audits available for in-depth analysis and implementation roadmaps."
        }
      },
      {
        "@type": "Question",
        "name": "How long does an SEO audit take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A basic SEO audit typically takes 1-3 business days for small to medium websites. Comprehensive audits for larger sites with thousands of pages can take 1-2 weeks. The timeline depends on website complexity, number of pages, technical issues discovered, and depth of competitor analysis. You'll receive an initial summary quickly, followed by a detailed report with prioritized recommendations."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in an SEO audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A complete SEO audit includes technical analysis (site speed, mobile optimization, crawl errors, indexation issues), on-page SEO review (meta tags, content quality, keyword optimization, internal linking), backlink profile assessment, competitor analysis, Core Web Vitals evaluation, structured data validation, and security checks. You'll receive a prioritized action plan categorizing issues as critical, high, medium, or low priority with implementation timelines."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I get an SEO audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most businesses should conduct comprehensive SEO audits every 6-12 months to identify new issues and opportunities. High-traffic ecommerce sites or rapidly growing businesses may benefit from quarterly audits. Additionally, perform audits after major website redesigns, platform migrations, Google algorithm updates, or if you notice significant traffic drops. Regular mini-audits every 3 months help maintain optimal performance."
        }
      },
      {
        "@type": "Question",
        "name": "Can I do an SEO audit myself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can perform basic SEO audits using free tools like Google Search Console, Google PageSpeed Insights, and Screaming Frog SEO Spider. However, professional audits provide deeper insights, advanced technical analysis, competitive intelligence, and expert recommendations that DIY tools miss. Professional auditors also prioritize issues based on impact and provide implementation guidance, saving time and preventing costly mistakes."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between an SEO audit and SEO services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An SEO audit is a diagnostic assessment that identifies problems and opportunities, providing a roadmap for improvement. SEO services involve ongoing implementation of audit recommendations, including content creation, link building, technical fixes, and continuous optimization. Think of an audit as a health checkup that diagnoses issues, while SEO services are the treatment plan that fixes problems and maintains long-term performance."
        }
      },
      {
        "@type": "Question",
        "name": "Will an SEO audit improve my rankings immediately?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An audit itself won't improve rankings—it's the diagnostic step. Rankings improve after implementing audit recommendations. Quick technical fixes (like broken links or meta tag updates) may show results in 2-4 weeks, while content improvements and link building typically take 3-6 months. The audit prioritizes issues by impact, allowing you to focus on high-value fixes that deliver faster results."
        }
      },
      {
        "@type": "Question",
        "name": "What tools are used in an SEO audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional SEO audits use industry-leading tools including Google Search Console and Analytics, SEMrush or Ahrefs for competitive analysis, Screaming Frog for technical crawling, GTmetrix or PageSpeed Insights for performance testing, and specialized tools for schema validation, backlink analysis, and keyword research. Expert auditors combine automated tool data with manual analysis for comprehensive insights."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need an SEO audit if my website is new?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! A pre-launch or early-stage SEO audit is crucial for new websites. It ensures proper technical foundation, identifies crawlability issues, validates structured data implementation, confirms mobile optimization, and sets up analytics correctly from day one. Fixing issues before they impact rankings is far easier and more cost-effective than correcting problems after launch. New sites benefit from audits that establish best practices early."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main>
        <HeroSEO
        heading="Get Your Free SEO Audit & Transform Your Rankings"
        subtext="Discover critical issues holding your website back with our comprehensive free SEO audit. Get actionable recommendations to boost traffic, improve rankings, and outperform competitors."
        badgeText="Request Your Free Audit"
        />
        <SeoAuditPitch/>
        <SEOAuditBenefits/>
        <Testimonial04/>
        <AuditServicesAccordion/>
        <SeoAuditFaq/>
        <ContactForm />
      </main>
    </>
  );
}
