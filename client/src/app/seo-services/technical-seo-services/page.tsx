import Head from "next/head";
import Banner from "@/PageComponents/Global Components/Banner";
import ContactForm from "@/PageComponents/Global Components/Contact";
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import TechnicalSeoPitch from "@/PageComponents/Technical SEO Components/Pitch";
import WhatsTechnicalSEO from "@/PageComponents/Technical SEO Components/What";
import WhyTechnical from "@/PageComponents/Technical SEO Components/Why";
import Testimonial from "@/PageComponents/Global Components/Testimonial";
import TechnicalFAQ from "@/PageComponents/Technical SEO Components/FAQ";
import TechnicalServicesAccordion from "@/PageComponents/Technical SEO Components/Services";
import TechnicalSEOSection from "@/PageComponents/Technical SEO Components/TechnicalSeoFirst";
import PromoFiller from "@/PageComponents/Technical SEO Components/Filler";

export default function Page() {
  // FAQ Schema data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is technical SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Technical SEO refers to the process of optimizing your website's infrastructure and backend elements to help search engines crawl, render, index, and rank your content more effectively. Unlike on-page SEO which focuses on content quality, technical SEO deals with site speed, mobile responsiveness, XML sitemaps, structured data, HTTPS security, crawlability, URL structure, and Core Web Vitals. It ensures search engines can efficiently access and understand your website while providing users with fast, secure browsing experiences."
        }
      },
      {
        "@type": "Question",
        "name": "How much do technical SEO services cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Technical SEO service costs vary based on website complexity and issues discovered. Basic technical audits for small websites typically range from $500-$1,500, while comprehensive technical SEO services for medium sites cost $2,000-$5,000 monthly. Enterprise-level technical SEO can exceed $10,000+ per month. Many agencies offer affordable technical SEO packages starting at $1,000-$2,500 monthly, including ongoing monitoring, fixes, and optimization. One-time technical audits with implementation guides are also available for budget-conscious businesses."
        }
      },
      {
        "@type": "Question",
        "name": "Why is site speed important for SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Site speed is a confirmed Google ranking factor and critical for user experience. Pages that load in under 2 seconds have significantly lower bounce rates and higher conversion rates. Google's Core Web Vitals metrics measure loading performance, interactivity, and visual stability. Slow-loading sites frustrate both users and search engine crawlers, leading to reduced crawl efficiency and lower rankings. A one-second delay in page load time can reduce conversions by 7% and increase bounce rates by 32%, directly impacting your bottom line."
        }
      },
      {
        "@type": "Question",
        "name": "What is mobile-first indexing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mobile-first indexing means Google predominantly uses the mobile version of your website for indexing and ranking. Since most searches now happen on mobile devices, Google switched to mobile-first indexing for all websites. If your mobile site has less content, functionality, or different URLs than desktop, you may experience ranking drops. Ensuring responsive design, identical content across devices, fast mobile loading speeds, and touch-friendly navigation is essential for maintaining search visibility in today's mobile-dominated landscape."
        }
      },
      {
        "@type": "Question",
        "name": "How do I fix crawl errors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crawl errors prevent search engines from accessing your pages and can harm rankings. Fix them by accessing Google Search Console's Coverage report to identify 404 errors, server errors, and redirect issues. For 404 errors, either restore the missing page, create a 301 redirect to relevant content, or return proper 404 status codes for intentionally removed pages. Address server errors by checking hosting performance and fixing broken code. Use tools like Screaming Frog to identify broken links, then update or remove them systematically."
        }
      },
      {
        "@type": "Question",
        "name": "What is structured data and why does it matter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Structured data (schema markup) is code that helps search engines understand your content's context and meaning. It enables rich results like review stars, FAQ accordions, product information, and recipe cards in search results, improving click-through rates by up to 30%. Common schema types include Organization, Product, Article, FAQ, and Local Business. Implementing structured data doesn't directly improve rankings but enhances visibility and user engagement. Use Google's Rich Results Test to validate your schema implementation and identify errors."
        }
      },
      {
        "@type": "Question",
        "name": "How does HTTPS affect SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HTTPS is a confirmed Google ranking signal since 2014 and essential for website security. Sites using HTTPS encrypt data between users and servers, protecting sensitive information like passwords and payment details. Google Chrome marks non-HTTPS sites as 'Not Secure,' damaging user trust and increasing bounce rates. Migrating from HTTP to HTTPS requires installing an SSL/TLS certificate, which can be obtained free from Let's Encrypt. After migration, implement 301 redirects from HTTP to HTTPS versions and update internal links to prevent security warnings."
        }
      },
      {
        "@type": "Question",
        "name": "What are Core Web Vitals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Core Web Vitals are Google's page experience metrics measuring loading performance, interactivity, and visual stability. The three key metrics are: Largest Contentful Paint (LCP) measuring loading speed (ideal under 2.5 seconds), First Input Delay (FID) measuring interactivity (ideal under 100ms), and Cumulative Layout Shift (CLS) measuring visual stability (ideal under 0.1). Poor Core Web Vitals scores can negatively impact rankings. Improve them by optimizing images, minimizing JavaScript, using browser caching, and eliminating layout shifts from dynamically loaded content."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use www or non-www for my domain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both www and non-www versions work for SEO, but you must choose one as your canonical version to avoid duplicate content issues. The choice doesn't affect rankings, but consistency matters. Once decided, implement 301 redirects from the non-preferred version to your chosen version, set your preferred domain in Google Search Console, and use canonical tags consistently. Most modern sites prefer non-www for cleaner URLs, but established brands often keep www for historical reasons and cookie management across subdomains."
        }
      },
      {
        "@type": "Question",
        "name": "How do I optimize my XML sitemap?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An optimized XML sitemap helps search engines discover and index your important pages efficiently. Include only canonical URLs you want indexed, exclude pages with noindex tags, keep individual sitemaps under 50MB or 50,000 URLs, use sitemap index files for larger sites, and update sitemaps when adding or removing pages. Submit your sitemap to Google Search Console and Bing Webmaster Tools. Include lastmod dates for pages that change frequently, and remove URLs that return 404 errors or redirect to maintain sitemap cleanliness and crawl efficiency."
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
        <TechnicalSeoPitch/>
        <WhatsTechnicalSEO/>
        <WhyTechnical/>
        <Banner/>
        <Testimonial/>
        <TechnicalServicesAccordion/>
        <PromoFiller/>
        <TechnicalSEOSection/>
        <TechnicalFAQ/>
        <ContactForm />
      </main>
    </>
  );
}
