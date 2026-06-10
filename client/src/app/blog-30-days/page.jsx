import { useState } from "react";

const TOPICS = {
  SEO: "SEO",
  LOCAL: "Local SEO",
  TECH: "Technical SEO",
  ECOM: "eCommerce SEO",
  PPC: "PPC / Ads",
  WEB: "Web Dev",
  AI: "AI & AEO",
  SAAS: "SaaS Marketing",
};

const COLORS = {
  SEO: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  LOCAL: { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E" },
  TECH: { bg: "#FFF7ED", text: "#C2410C", dot: "#F97316" },
  ECOM: { bg: "#FDF4FF", text: "#7E22CE", dot: "#A855F7" },
  PPC: { bg: "#FFF1F2", text: "#BE123C", dot: "#F43F5E" },
  WEB: { bg: "#F0F9FF", text: "#0369A1", dot: "#0EA5E9" },
  AI: { bg: "#FAFAFA", text: "#374151", dot: "#6B7280" },
  SAAS: { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
};

const schedule = [
  // WEEK 1
  {
    day: 1, week: 1,
    blogs: [
      {
        title: "What Is Technical SEO? A Complete Beginner's Guide",
        slug: "what-is-technical-seo",
        topic: "TECH",
        target: "technical SEO beginners",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in intro paragraph" },
          { keyword: "SEO audit", url: "/seo-services/seo-audit-services", note: "Link when mentioning audits" },
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link in the on-page section" },
        ],
      },
      {
        title: "Core Web Vitals Explained: What They Are and Why They Matter",
        slug: "core-web-vitals-explained",
        topic: "TECH",
        target: "site owners, devs",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in conclusion CTA" },
          { keyword: "Next.js website development", url: "/website-development-services/nextjs-website-development", note: "Mention Next.js for performance" },
          { keyword: "what is technical SEO", url: "/blogs/what-is-technical-seo", note: "Link in intro as prerequisite read" },
        ],
      },
    ],
  },
  {
    day: 2, week: 1,
    blogs: [
      {
        title: "How to Do a Keyword Research for SEO (Step-by-Step)",
        slug: "how-to-do-keyword-research",
        topic: "SEO",
        target: "SEO beginners / small biz",
        internalLinks: [
          { keyword: "SEO services", url: "/seo-services", note: "Link in intro" },
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link when mentioning on-page optimization" },
          { keyword: "SEO made simple", url: "/blogs/seo-made-simple-laymans-guide", note: "Link as a foundational read" },
        ],
      },
      {
        title: "What Is a Sitemap and Why Does Every Website Need One?",
        slug: "what-is-a-sitemap",
        topic: "TECH",
        target: "website owners",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in conclusion" },
          { keyword: "website development services", url: "/website-development-services", note: "Mention that devs handle this" },
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link when mentioning sitemap audit" },
        ],
      },
    ],
  },
  {
    day: 3, week: 1,
    blogs: [
      {
        title: "Google Business Profile Optimization: The Complete 2026 Guide",
        slug: "google-business-profile-optimization",
        topic: "LOCAL",
        target: "local business owners",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro and conclusion" },
          { keyword: "local SEO for small businesses", url: "/blogs/local-seo-for-small-businesses", note: "Link as foundational context" },
          { keyword: "directory submissions", url: "/blogs/directory-submissions-local-seo", note: "Link in citations section" },
        ],
      },
      {
        title: "NAP Consistency: Why Your Business Name, Address & Phone Matter for SEO",
        slug: "nap-consistency-local-seo",
        topic: "LOCAL",
        target: "local business owners",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro" },
          { keyword: "directory submissions for local SEO", url: "/blogs/directory-submissions-local-seo", note: "Link in directory section" },
          { keyword: "Google Business Profile optimization", url: "/blogs/google-business-profile-optimization", note: "Link as companion piece" },
        ],
      },
    ],
  },
  {
    day: 4, week: 1,
    blogs: [
      {
        title: "What Are Google Shopping Ads and How Do They Work?",
        slug: "what-are-google-shopping-ads",
        topic: "ECOM",
        target: "ecommerce store owners",
        internalLinks: [
          { keyword: "ecommerce SEO services", url: "/seo-services/ecommerce-seo-services", note: "Link in intro" },
          { keyword: "Google Ads management services", url: "/ppc-marketing/google-ads-management-services", note: "Link in the ads setup section" },
          { keyword: "Shopify website development", url: "/website-development-services/shopify-website-development", note: "Link when mentioning Shopify stores" },
        ],
      },
      {
        title: "WooCommerce vs Shopify: Which Platform Is Better for SEO?",
        slug: "woocommerce-vs-shopify-seo",
        topic: "ECOM",
        target: "ecommerce store owners",
        internalLinks: [
          { keyword: "Shopify website development", url: "/website-development-services/shopify-website-development", note: "Link in Shopify section" },
          { keyword: "ecommerce development", url: "/website-development-services/ecommerce-development", note: "Link in conclusion" },
          { keyword: "Shopify SEO guide", url: "/blogs/shopify-seo-guide", note: "Link as a deeper read" },
        ],
      },
    ],
  },
  {
    day: 5, week: 1,
    blogs: [
      {
        title: "What Is Google Ads Quality Score and How to Improve It",
        slug: "google-ads-quality-score",
        topic: "PPC",
        target: "PPC beginners",
        internalLinks: [
          { keyword: "Google Ads management services", url: "/ppc-marketing/google-ads-management-services", note: "Link in intro and CTA" },
          { keyword: "PPC marketing", url: "/ppc-marketing", note: "Link in intro" },
          { keyword: "what is PPC marketing", url: "/blogs/what-is-ppc-marketing-and-how-it-helps-businesses", note: "Link as foundational article" },
        ],
      },
      {
        title: "Schema Markup: What It Is and How to Add It to Your Website",
        slug: "schema-markup-guide",
        topic: "TECH",
        target: "SEO practitioners",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in intro and conclusion" },
          { keyword: "SERP feature optimization", url: "/blogs/serp-feature-optimization", note: "Link in rich results section" },
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link in the broader context section" },
        ],
      },
    ],
  },
  {
    day: 6, week: 1,
    blogs: [
      {
        title: "What Is Domain Authority and How Do You Increase It?",
        slug: "what-is-domain-authority",
        topic: "SEO",
        target: "SEO learners",
        internalLinks: [
          { keyword: "how to get backlinks", url: "/blogs/how-to-get-backlinks", note: "Link in the backlinks section" },
          { keyword: "backlinks impact on SEO rankings", url: "/blogs/backlinks-impact-on-seo-rankings", note: "Link as supporting read" },
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
        ],
      },
      {
        title: "How to Rank Higher on Google Maps in 2026",
        slug: "rank-higher-google-maps",
        topic: "LOCAL",
        target: "local business owners",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro" },
          { keyword: "rank service area business", url: "/blogs/rank-service-area-business", note: "Link as companion piece" },
          { keyword: "Google Business Profile optimization", url: "/blogs/google-business-profile-optimization", note: "Link in GBP section" },
        ],
      },
    ],
  },
  {
    day: 7, week: 1,
    blogs: [
      {
        title: "What Is Search Intent and Why It's the Key to SEO Success",
        slug: "what-is-search-intent",
        topic: "SEO",
        target: "content creators, SEO learners",
        internalLinks: [
          { keyword: "how to do keyword research", url: "/blogs/how-to-do-keyword-research", note: "Link in keywords section" },
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
          { keyword: "google ranking factors", url: "/blogs/google-ranking-factors", note: "Link as supplementary read" },
        ],
      },
      {
        title: "How to Write Meta Titles and Descriptions That Get Clicks",
        slug: "how-to-write-meta-titles-descriptions",
        topic: "SEO",
        target: "content writers, SEO beginners",
        internalLinks: [
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link in intro" },
          { keyword: "SERP feature optimization", url: "/blogs/serp-feature-optimization", note: "Link in CTR section" },
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link in conclusion for audit mention" },
        ],
      },
    ],
  },

  // WEEK 2
  {
    day: 8, week: 2,
    blogs: [
      {
        title: "What Is Anchor Text and How to Use It for SEO",
        slug: "what-is-anchor-text",
        topic: "SEO",
        target: "link builders, SEO learners",
        internalLinks: [
          { keyword: "how to get backlinks", url: "/blogs/how-to-get-backlinks", note: "Link in backlink strategy section" },
          { keyword: "do nofollow links help SEO", url: "/blogs/do-nofollow-links-help-seo", note: "Link in nofollow anchor section" },
          { keyword: "backlinks impact on SEO", url: "/blogs/backlinks-impact-on-seo-rankings", note: "Link as supplementary read" },
        ],
      },
      {
        title: "Next.js vs WordPress: Which Is Better for SEO?",
        slug: "nextjs-vs-wordpress-seo",
        topic: "WEB",
        target: "business owners, developers",
        internalLinks: [
          { keyword: "Next.js website development", url: "/website-development-services/nextjs-website-development", note: "Link in Next.js advantages section" },
          { keyword: "WordPress website development", url: "/website-development-services/wordpress-website-development", note: "Link in WordPress section" },
          { keyword: "choose website framework for business", url: "/blogs/choose-website-framework-for-business", note: "Link as foundational read" },
        ],
      },
    ],
  },
  {
    day: 9, week: 2,
    blogs: [
      {
        title: "PPC vs SEO: Which Is Better for Your Business in 2026?",
        slug: "ppc-vs-seo",
        topic: "PPC",
        target: "small business owners",
        internalLinks: [
          { keyword: "SEO services", url: "/seo-services", note: "Link in SEO section" },
          { keyword: "PPC marketing", url: "/ppc-marketing", note: "Link in PPC section" },
          { keyword: "do small businesses need marketing", url: "/blogs/do-small-businesses-need-marketing", note: "Link in intro" },
        ],
      },
      {
        title: "How to Do an SEO Competitor Analysis (Step-by-Step)",
        slug: "seo-competitor-analysis",
        topic: "SEO",
        target: "SEO practitioners",
        internalLinks: [
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link in audit section" },
          { keyword: "how to get backlinks", url: "/blogs/how-to-get-backlinks", note: "Link in backlink gap analysis section" },
          { keyword: "google ranking factors", url: "/blogs/google-ranking-factors", note: "Link in ranking signals section" },
        ],
      },
    ],
  },
  {
    day: 10, week: 2,
    blogs: [
      {
        title: "What Is Answer Engine Optimization (AEO) and Why It Matters",
        slug: "what-is-aeo",
        topic: "AI",
        target: "SEO / content marketers",
        internalLinks: [
          { keyword: "AI SEO services", url: "/seo-services/ai-seo-services", note: "Link in intro and conclusion" },
          { keyword: "optimize for AI overviews", url: "/blogs/optimize-for-ai-overviews", note: "Link in AI overview section" },
          { keyword: "SaaS AEO guide", url: "/blogs/saas-aeo-guide", note: "Link for SaaS-specific context" },
        ],
      },
      {
        title: "How to Set Up Google Analytics 4 for SEO Tracking",
        slug: "google-analytics-4-seo-setup",
        topic: "TECH",
        target: "website owners, marketers",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in conclusion CTA" },
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link when mentioning auditing performance" },
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link as an action follow-up" },
        ],
      },
    ],
  },
  {
    day: 11, week: 2,
    blogs: [
      {
        title: "Ecommerce Product Page SEO: How to Rank Your Products on Google",
        slug: "ecommerce-product-page-seo",
        topic: "ECOM",
        target: "ecommerce store owners",
        internalLinks: [
          { keyword: "ecommerce SEO services", url: "/seo-services/ecommerce-seo-services", note: "Link in intro and conclusion" },
          { keyword: "Shopify SEO guide", url: "/blogs/shopify-seo-guide", note: "Link for Shopify-specific readers" },
          { keyword: "how to do image SEO", url: "/blogs/how-to-do-image-seo", note: "Link in product image section" },
        ],
      },
      {
        title: "What Is Link Building and How Does It Work in 2026?",
        slug: "what-is-link-building",
        topic: "SEO",
        target: "SEO learners",
        internalLinks: [
          { keyword: "how to get backlinks", url: "/blogs/how-to-get-backlinks", note: "Link as tactics deep-dive" },
          { keyword: "backlinks impact on SEO rankings", url: "/blogs/backlinks-impact-on-seo-rankings", note: "Link as data-backed read" },
          { keyword: "do nofollow links help SEO", url: "/blogs/do-nofollow-links-help-seo", note: "Link in nofollow section" },
        ],
      },
    ],
  },
  {
    day: 12, week: 2,
    blogs: [
      {
        title: "Google Ads Bidding Strategies Explained: Which One Should You Use?",
        slug: "google-ads-bidding-strategies",
        topic: "PPC",
        target: "Google Ads users",
        internalLinks: [
          { keyword: "Google Ads management services", url: "/ppc-marketing/google-ads-management-services", note: "Link in intro and conclusion" },
          { keyword: "search engine marketing", url: "/ppc-marketing/search-engine-marketing", note: "Link in SEM section" },
          { keyword: "Google Ads quality score", url: "/blogs/google-ads-quality-score", note: "Link as companion piece" },
        ],
      },
      {
        title: "How to Build Topical Authority with Content Clusters",
        slug: "topical-authority-content-clusters",
        topic: "SEO",
        target: "content strategists, SEO pros",
        internalLinks: [
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
          { keyword: "how to do keyword research", url: "/blogs/how-to-do-keyword-research", note: "Link in keyword clustering section" },
          { keyword: "google rewards authority", url: "/blogs/google-rewards-authority", note: "Link as supporting evidence" },
        ],
      },
    ],
  },
  {
    day: 13, week: 2,
    blogs: [
      {
        title: "Local Citations: What They Are and How to Build Them for Local SEO",
        slug: "local-citations-guide",
        topic: "LOCAL",
        target: "local business owners",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro and conclusion" },
          { keyword: "directory submissions for local SEO", url: "/blogs/directory-submissions-local-seo", note: "Link in directory section" },
          { keyword: "NAP consistency", url: "/blogs/nap-consistency-local-seo", note: "Link as companion piece" },
        ],
      },
      {
        title: "How to Create an SEO-Friendly URL Structure",
        slug: "seo-friendly-url-structure",
        topic: "TECH",
        target: "developers, site owners",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in conclusion" },
          { keyword: "website development services", url: "/website-development-services", note: "Link in site architecture section" },
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link as an action checklist" },
        ],
      },
    ],
  },
  {
    day: 14, week: 2,
    blogs: [
      {
        title: "How to Use Google Search Console to Improve Your SEO",
        slug: "google-search-console-guide",
        topic: "SEO",
        target: "website owners",
        internalLinks: [
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link when mentioning auditing" },
          { keyword: "technical SEO", url: "/seo-services/technical-seo-services", note: "Link in crawl errors section" },
          { keyword: "google ranking factors", url: "/blogs/google-ranking-factors", note: "Link in ranking signals section" },
        ],
      },
      {
        title: "What Is Content Marketing and How Does It Help SEO?",
        slug: "what-is-content-marketing-seo",
        topic: "SEO",
        target: "small biz owners",
        internalLinks: [
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
          { keyword: "topical authority content clusters", url: "/blogs/topical-authority-content-clusters", note: "Link in content strategy section" },
          { keyword: "SaaS content marketing strategy", url: "/blogs/saas-content-marketing-strategy-for-driving-demos", note: "Link for SaaS readers" },
        ],
      },
    ],
  },

  // WEEK 3
  {
    day: 15, week: 3,
    blogs: [
      {
        title: "What Is Meta Ads and How to Use Facebook & Instagram Ads for Business",
        slug: "what-is-meta-ads",
        topic: "PPC",
        target: "small business owners",
        internalLinks: [
          { keyword: "Meta Ads management services", url: "/ppc-marketing/meta-ads-management-services", note: "Link in intro and CTA" },
          { keyword: "PPC marketing", url: "/ppc-marketing", note: "Link in overview section" },
          { keyword: "lead generation services", url: "/ppc-marketing/lead-generation-services", note: "Link in lead gen section" },
        ],
      },
      {
        title: "How Page Speed Affects SEO Rankings (And How to Fix It)",
        slug: "page-speed-seo-impact",
        topic: "TECH",
        target: "site owners, devs",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in intro and conclusion" },
          { keyword: "Core Web Vitals explained", url: "/blogs/core-web-vitals-explained", note: "Link in CWV section" },
          { keyword: "Next.js website development", url: "/website-development-services/nextjs-website-development", note: "Link as a performance solution" },
        ],
      },
    ],
  },
  {
    day: 16, week: 3,
    blogs: [
      {
        title: "SEO for Dentists: How to Rank #1 in Your City",
        slug: "seo-for-dentists",
        topic: "LOCAL",
        target: "dental practices",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro and conclusion" },
          { keyword: "Google Ads for doctors", url: "/blogs/google-ads-for-doctors", note: "Link as companion PPC piece" },
          { keyword: "rank higher on Google Maps", url: "/blogs/rank-higher-google-maps", note: "Link in GMB section" },
        ],
      },
      {
        title: "Robots.txt and Noindex: How to Control What Google Crawls",
        slug: "robots-txt-noindex-guide",
        topic: "TECH",
        target: "SEO practitioners, devs",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in conclusion" },
          { keyword: "what is a sitemap", url: "/blogs/what-is-a-sitemap", note: "Link as companion technical piece" },
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link when mentioning crawl audits" },
        ],
      },
    ],
  },
  {
    day: 17, week: 3,
    blogs: [
      {
        title: "How to Write SEO-Optimized Blog Posts That Rank on Google",
        slug: "how-to-write-seo-blog-posts",
        topic: "SEO",
        target: "bloggers, content writers",
        internalLinks: [
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link in the optimization section" },
          { keyword: "what is search intent", url: "/blogs/what-is-search-intent", note: "Link in intent section" },
          { keyword: "how to write meta titles", url: "/blogs/how-to-write-meta-titles-descriptions", note: "Link in metadata section" },
        ],
      },
      {
        title: "B2B Lead Generation Strategies That Actually Work in 2026",
        slug: "b2b-lead-generation-strategies",
        topic: "PPC",
        target: "B2B marketers",
        internalLinks: [
          { keyword: "lead generation services", url: "/ppc-marketing/lead-generation-services", note: "Link in intro and conclusion" },
          { keyword: "search engine marketing", url: "/ppc-marketing/search-engine-marketing", note: "Link in SEM section" },
          { keyword: "B2B SaaS marketing funnel", url: "/blogs/b2b-saas-marketing-funnel", note: "Link in funnel section" },
        ],
      },
    ],
  },
  {
    day: 18, week: 3,
    blogs: [
      {
        title: "How to Do Link Building for a New Website (From Scratch)",
        slug: "link-building-new-website",
        topic: "SEO",
        target: "new website owners",
        internalLinks: [
          { keyword: "how to get backlinks", url: "/blogs/how-to-get-backlinks", note: "Link as the tactical follow-up" },
          { keyword: "what is link building", url: "/blogs/what-is-link-building", note: "Link as foundational piece" },
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion CTA" },
        ],
      },
      {
        title: "How LLMs Like ChatGPT and Claude Decide What to Recommend",
        slug: "how-llms-decide-recommendations",
        topic: "AI",
        target: "SEO / brand marketers",
        internalLinks: [
          { keyword: "how LLMs choose citations", url: "/blogs/how-llms-choose-citations", note: "Link as the deep-dive companion" },
          { keyword: "AI SEO services", url: "/seo-services/ai-seo-services", note: "Link in conclusion" },
          { keyword: "optimize for AI overviews", url: "/blogs/optimize-for-ai-overviews", note: "Link in practical tips section" },
        ],
      },
    ],
  },
  {
    day: 19, week: 3,
    blogs: [
      {
        title: "SEO for Law Firms: How to Get More Clients from Google",
        slug: "seo-for-law-firms",
        topic: "LOCAL",
        target: "law firm owners",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro and conclusion" },
          { keyword: "SEO for dentists", url: "/blogs/seo-for-dentists", note: "Link as a related niche piece" },
          { keyword: "local search engine marketing", url: "/blogs/what-is-local-search-engine-marketing", note: "Link in paid section" },
        ],
      },
      {
        title: "How to Use Internal Linking to Boost Your SEO",
        slug: "internal-linking-seo-guide",
        topic: "SEO",
        target: "content strategists",
        internalLinks: [
          { keyword: "on-page SEO checklist", url: "/blogs/on-page-seo-checklist", note: "Link as action follow-up" },
          { keyword: "topical authority content clusters", url: "/blogs/topical-authority-content-clusters", note: "Link in cluster strategy section" },
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link when mentioning link audits" },
        ],
      },
    ],
  },
  {
    day: 20, week: 3,
    blogs: [
      {
        title: "How to Optimize Your Shopify Store for SEO (Complete 2026 Checklist)",
        slug: "shopify-seo-checklist-2026",
        topic: "ECOM",
        target: "Shopify store owners",
        internalLinks: [
          { keyword: "Shopify website development", url: "/website-development-services/shopify-website-development", note: "Link in store setup section" },
          { keyword: "Shopify SEO guide", url: "/blogs/shopify-seo-guide", note: "Link as foundational piece" },
          { keyword: "ecommerce SEO services", url: "/seo-services/ecommerce-seo-services", note: "Link in conclusion" },
        ],
      },
      {
        title: "What Is Google's E-E-A-T and How to Build It for Your Website",
        slug: "google-eeat-guide",
        topic: "SEO",
        target: "content marketers, site owners",
        internalLinks: [
          { keyword: "google rewards authority", url: "/blogs/google-rewards-authority", note: "Link as supporting piece" },
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
          { keyword: "cybersecurity SEO guide", url: "/blogs/cybersecurity-seo-guide", note: "Link for trust signals in security niche" },
        ],
      },
    ],
  },
  {
    day: 21, week: 3,
    blogs: [
      {
        title: "How to Retarget Website Visitors Using Google and Meta Ads",
        slug: "retargeting-google-meta-ads",
        topic: "PPC",
        target: "ecommerce + service businesses",
        internalLinks: [
          { keyword: "Google Ads management services", url: "/ppc-marketing/google-ads-management-services", note: "Link in Google section" },
          { keyword: "Meta Ads management services", url: "/ppc-marketing/meta-ads-management-services", note: "Link in Meta section" },
          { keyword: "8 proven strategies to attract new customers", url: "/blogs/8-proven-strategies-attract-new-customers-online-store", note: "Link as broader ecommerce guide" },
        ],
      },
      {
        title: "What Is Structured Data and How Does It Improve SEO?",
        slug: "structured-data-seo",
        topic: "TECH",
        target: "developers, SEO practitioners",
        internalLinks: [
          { keyword: "schema markup guide", url: "/blogs/schema-markup-guide", note: "Link as companion deep-dive" },
          { keyword: "SERP feature optimization", url: "/blogs/serp-feature-optimization", note: "Link in rich results section" },
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in conclusion" },
        ],
      },
    ],
  },

  // WEEK 4
  {
    day: 22, week: 4,
    blogs: [
      {
        title: "SEO for Real Estate Agents: How to Dominate Local Search",
        slug: "seo-for-real-estate-agents",
        topic: "LOCAL",
        target: "real estate agents",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro and conclusion" },
          { keyword: "SEO for law firms", url: "/blogs/seo-for-law-firms", note: "Link as related niche piece" },
          { keyword: "rank higher on Google Maps", url: "/blogs/rank-higher-google-maps", note: "Link in local presence section" },
        ],
      },
      {
        title: "Headless CMS vs Traditional CMS: Which Is Better for SEO?",
        slug: "headless-cms-vs-traditional-seo",
        topic: "WEB",
        target: "developers, businesses",
        internalLinks: [
          { keyword: "Next.js website development", url: "/website-development-services/nextjs-website-development", note: "Link in headless section" },
          { keyword: "website development services", url: "/website-development-services", note: "Link in conclusion" },
          { keyword: "Next.js vs WordPress SEO", url: "/blogs/nextjs-vs-wordpress-seo", note: "Link as related comparison" },
        ],
      },
    ],
  },
  {
    day: 23, week: 4,
    blogs: [
      {
        title: "How to Rank for Featured Snippets on Google (With Examples)",
        slug: "how-to-rank-featured-snippets",
        topic: "SEO",
        target: "content marketers",
        internalLinks: [
          { keyword: "SERP feature optimization", url: "/blogs/serp-feature-optimization", note: "Link as companion piece" },
          { keyword: "schema markup guide", url: "/blogs/schema-markup-guide", note: "Link in structured data section" },
          { keyword: "AI search optimization guide", url: "/blogs/ai-search-optimization-guide", note: "Link in AI context section" },
        ],
      },
      {
        title: "SaaS SEO Strategy: How to Drive Signups Through Organic Search",
        slug: "saas-seo-strategy",
        topic: "SAAS",
        target: "SaaS founders, marketers",
        internalLinks: [
          { keyword: "AI SEO services", url: "/seo-services/ai-seo-services", note: "Link in AI-driven SEO section" },
          { keyword: "SaaS content marketing strategy", url: "/blogs/saas-content-marketing-strategy-for-driving-demos", note: "Link as companion piece" },
          { keyword: "SaaS AEO guide", url: "/blogs/saas-aeo-guide", note: "Link in AEO section" },
        ],
      },
    ],
  },
  {
    day: 24, week: 4,
    blogs: [
      {
        title: "How to Run a PPC Campaign for a Local Service Business",
        slug: "ppc-for-local-service-business",
        topic: "PPC",
        target: "local service businesses",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link as the organic alternative" },
          { keyword: "lead generation services", url: "/ppc-marketing/lead-generation-services", note: "Link in CTA" },
          { keyword: "local search engine marketing", url: "/blogs/what-is-local-search-engine-marketing", note: "Link as foundational read" },
        ],
      },
      {
        title: "What Is Crawl Budget and Why Does It Matter for Large Sites?",
        slug: "crawl-budget-explained",
        topic: "TECH",
        target: "enterprise site owners, devs",
        internalLinks: [
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in intro and conclusion" },
          { keyword: "robots.txt and noindex guide", url: "/blogs/robots-txt-noindex-guide", note: "Link as companion piece" },
          { keyword: "what is a sitemap", url: "/blogs/what-is-a-sitemap", note: "Link in crawlability section" },
        ],
      },
    ],
  },
  {
    day: 25, week: 4,
    blogs: [
      {
        title: "How to Scale Your Ecommerce Store With SEO in 2026",
        slug: "scale-ecommerce-with-seo-2026",
        topic: "ECOM",
        target: "ecommerce store owners",
        internalLinks: [
          { keyword: "scale ecommerce store using organic SEO", url: "/blogs/scale-ecommerce-store-using-organic-seo", note: "Link as foundational piece" },
          { keyword: "ecommerce SEO services", url: "/seo-services/ecommerce-seo-services", note: "Link in intro and CTA" },
          { keyword: "8 proven strategies to attract new customers", url: "/blogs/8-proven-strategies-attract-new-customers-online-store", note: "Link in traffic strategies section" },
        ],
      },
      {
        title: "What Is Generative Engine Optimization (GEO)?",
        slug: "what-is-generative-engine-optimization",
        topic: "AI",
        target: "forward-looking marketers, SEOs",
        internalLinks: [
          { keyword: "AI SEO services", url: "/seo-services/ai-seo-services", note: "Link in intro and conclusion" },
          { keyword: "what is AEO", url: "/blogs/what-is-aeo", note: "Link as companion piece" },
          { keyword: "AI changing search behavior", url: "/blogs/ai-changing-search-behavior", note: "Link in context section" },
        ],
      },
    ],
  },
  {
    day: 26, week: 4,
    blogs: [
      {
        title: "Why Your Website Isn't Ranking on Google (And How to Fix It)",
        slug: "website-not-ranking-google",
        topic: "SEO",
        target: "frustrated site owners",
        internalLinks: [
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link in intro and conclusion — high intent" },
          { keyword: "google ranking factors", url: "/blogs/google-ranking-factors", note: "Link in ranking signals section" },
          { keyword: "SEO myths beginners believe", url: "/blogs/seo-myths-beginners-believe", note: "Link in common misconceptions section" },
        ],
      },
      {
        title: "How to Market Your SaaS Product to Small and Medium Businesses",
        slug: "market-saas-to-smbs",
        topic: "SAAS",
        target: "SaaS founders",
        internalLinks: [
          { keyword: "marketing ERP software to SMBs", url: "/blogs/marketing-erp-software-to-smbs", note: "Link as companion piece" },
          { keyword: "SaaS content marketing strategy", url: "/blogs/saas-content-marketing-strategy-for-driving-demos", note: "Link in content section" },
          { keyword: "B2B SaaS marketing funnel", url: "/blogs/b2b-saas-marketing-funnel", note: "Link in funnel section" },
        ],
      },
    ],
  },
  {
    day: 27, week: 4,
    blogs: [
      {
        title: "Complete Ecommerce SEO Audit Checklist (2026 Edition)",
        slug: "ecommerce-seo-audit-checklist",
        topic: "ECOM",
        target: "ecommerce store owners",
        internalLinks: [
          { keyword: "ecommerce SEO services", url: "/seo-services/ecommerce-seo-services", note: "Link in conclusion" },
          { keyword: "SEO audit services", url: "/seo-services/seo-audit-services", note: "Link in intro" },
          { keyword: "ecommerce product page SEO", url: "/blogs/ecommerce-product-page-seo", note: "Link in product page section" },
        ],
      },
      {
        title: "Bing SEO vs Google SEO: Are There Real Differences?",
        slug: "bing-seo-vs-google-seo",
        topic: "SEO",
        target: "SEO learners",
        internalLinks: [
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
          { keyword: "google ranking factors", url: "/blogs/google-ranking-factors", note: "Link in Google factors section" },
          { keyword: "AI search optimization guide", url: "/blogs/ai-search-optimization-guide", note: "Link in emerging search section" },
        ],
      },
    ],
  },
  {
    day: 28, week: 4,
    blogs: [
      {
        title: "How to Choose the Right Digital Marketing Agency for Your Business",
        slug: "how-to-choose-digital-marketing-agency",
        topic: "SEO",
        target: "business owners researching agencies",
        internalLinks: [
          { keyword: "about Vaphers", url: "/about-us", note: "Link in trust signals section" },
          { keyword: "pricing", url: "/pricing", note: "Link in budget section" },
          { keyword: "do small businesses need marketing", url: "/blogs/do-small-businesses-need-marketing", note: "Link in intro" },
        ],
      },
      {
        title: "How to Use RSS Feeds for Content Distribution and SEO",
        slug: "rss-feeds-content-distribution-seo",
        topic: "SEO",
        target: "bloggers, content marketers",
        internalLinks: [
          { keyword: "what is RSS feed URL", url: "/blogs/what-is-rss-feed-url", note: "Link as foundational companion piece" },
          { keyword: "marketing your website guide", url: "/blogs/marketing-your-website-guide", note: "Link in distribution section" },
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion" },
        ],
      },
    ],
  },
  {
    day: 29, week: 4,
    blogs: [
      {
        title: "SEO for Accountants: How to Get More Clients from Google",
        slug: "seo-for-accountants",
        topic: "LOCAL",
        target: "accountants, CPAs",
        internalLinks: [
          { keyword: "local SEO services", url: "/seo-services/local-seo-services", note: "Link in intro and conclusion" },
          { keyword: "SEO for law firms", url: "/blogs/seo-for-law-firms", note: "Link as related professional services piece" },
          { keyword: "local search engine marketing", url: "/blogs/what-is-local-search-engine-marketing", note: "Link for paid options" },
        ],
      },
      {
        title: "How AI Is Changing the Future of SEO in 2026 and Beyond",
        slug: "ai-future-of-seo",
        topic: "AI",
        target: "SEO practitioners, marketers",
        internalLinks: [
          { keyword: "AI SEO services", url: "/seo-services/ai-seo-services", note: "Link in intro and conclusion" },
          { keyword: "AI changing search behavior", url: "/blogs/ai-changing-search-behavior", note: "Link as companion piece" },
          { keyword: "generative engine optimization", url: "/blogs/what-is-generative-engine-optimization", note: "Link in GEO section" },
        ],
      },
    ],
  },
  {
    day: 30, week: 4,
    blogs: [
      {
        title: "How to Build a Complete Digital Marketing Strategy in 2026",
        slug: "digital-marketing-strategy-2026",
        topic: "SEO",
        target: "business owners, marketers",
        internalLinks: [
          { keyword: "SEO services", url: "/seo-services", note: "Link in organic section" },
          { keyword: "PPC marketing", url: "/ppc-marketing", note: "Link in paid section" },
          { keyword: "website development services", url: "/website-development-services", note: "Link in website foundation section" },
          { keyword: "AI SEO services", url: "/seo-services/ai-seo-services", note: "Link in AI section" },
        ],
      },
      {
        title: "The Ultimate SEO Glossary: 100+ Terms Every Marketer Should Know",
        slug: "seo-glossary",
        topic: "SEO",
        target: "SEO beginners",
        internalLinks: [
          { keyword: "SEO made simple layman's guide", url: "/blogs/seo-made-simple-laymans-guide", note: "Link in intro for beginners" },
          { keyword: "SEO services", url: "/seo-services", note: "Link in conclusion CTA" },
          { keyword: "technical SEO services", url: "/seo-services/technical-seo-services", note: "Link in technical terms section" },
        ],
      },
    ],
  },
];

const weekColors = ["#EFF6FF", "#F0FDF4", "#FFF7ED", "#FDF4FF"];
const weekBorders = ["#BFDBFE", "#BBF7D0", "#FED7AA", "#E9D5FF"];

export default function BlogSchedule() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [filterTopic, setFilterTopic] = useState("ALL");
  const [filterWeek, setFilterWeek] = useState("ALL");

  const weeks = [1, 2, 3, 4];
  const topicKeys = Object.keys(TOPICS);

  const filtered = schedule.filter(d => {
    const weekMatch = filterWeek === "ALL" || d.week === parseInt(filterWeek);
    const topicMatch = filterTopic === "ALL" || d.blogs.some(b => b.topic === filterTopic);
    return weekMatch && topicMatch;
  });

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", background: "#FAFAFA", color: "#171717" }}>
      {/* Minimal Header (Removed gradient, added flat dark tone) */}
      <div style={{ background: "#111827", padding: "36px 28px 32px", borderBottom: "1px solid #1F2937" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "#3B82F6", borderRadius: 2, padding: "4px 8px", fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: 1.2, textTransform: "uppercase" }}>Vaphers</div>
            <div style={{ color: "#9CA3AF", fontSize: 13, fontWeight: 500 }}>Editorial Strategy</div>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 600, color: "#F9FAFB", letterSpacing: -0.5 }}>30-Day Blog Publishing Schedule</h1>
          <p style={{ margin: 0, color: "#9CA3AF", fontSize: 14 }}>60 blogs · 2 per day · Full internal linking plan · Topical authority across all service clusters</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        {/* Stats - Crisper edges, thinner lines */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Blogs", value: "60" },
            { label: "Topic Clusters", value: "8" },
            { label: "Days", value: "30" },
            { label: "Weeks", value: "4" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 4, border: "1px solid #E5E5E5", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 500, color: "#171717" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#737373", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters - Squared-off buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#737373", fontWeight: 600, letterSpacing: 0.5, marginRight: 4 }}>WEEK:</span>
            {["ALL", "1", "2", "3", "4"].map(w => (
              <button key={w} onClick={() => setFilterWeek(w)}
                style={{ padding: "6px 14px", borderRadius: 4, border: "1px solid", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                  borderColor: filterWeek === w ? "#3B82F6" : "#E5E5E5",
                  background: filterWeek === w ? "#EFF6FF" : "#fff",
                  color: filterWeek === w ? "#1D4ED8" : "#525252" }}>
                {w === "ALL" ? "All" : `Week ${w}`}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#737373", fontWeight: 600, letterSpacing: 0.5, marginRight: 4 }}>TOPIC:</span>
            {["ALL", ...topicKeys].map(t => (
              <button key={t} onClick={() => setFilterTopic(t)}
                style={{ padding: "6px 14px", borderRadius: 4, border: "1px solid", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                  borderColor: filterTopic === t ? (t === "ALL" ? "#3B82F6" : COLORS[t]?.dot) : "#E5E5E5",
                  background: filterTopic === t ? (t === "ALL" ? "#EFF6FF" : COLORS[t]?.bg) : "#fff",
                  color: filterTopic === t ? (t === "ALL" ? "#1D4ED8" : COLORS[t]?.text) : "#525252" }}>
                {t === "ALL" ? "All Topics" : TOPICS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {weeks.filter(w => filterWeek === "ALL" || w === parseInt(filterWeek)).map(week => {
            const weekDays = filtered.filter(d => d.week === week);
            if (weekDays.length === 0) return null;
            return (
              <div key={week} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ background: weekColors[week-1], border: `1px solid ${weekBorders[week-1]}`, borderRadius: 4, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#374151" }}>
                    Week {week}
                  </div>
                  <div style={{ height: 1, flex: 1, background: "#E5E5E5" }} />
                  <div style={{ fontSize: 12, color: "#A3A3A3", fontWeight: 500 }}>Days {(week-1)*7+1}–{Math.min(week*7, 30)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {weekDays.map(day => (
                    <div key={day.day}
                      onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                      style={{ background: "#fff", border: `1px solid ${selectedDay === day.day ? "#3B82F6" : "#E5E5E5"}`, borderRadius: 4, overflow: "hidden", cursor: "pointer", transition: "all 0.1s ease" }}>
                      
                      {/* Day header */}
                      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderBottom: selectedDay === day.day ? "1px solid #E5E5E5" : "none" }}>
                        <div style={{ minWidth: 32, height: 32, borderRadius: 2, background: "#F4F4F5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#525252" }}>
                          {day.day}
                        </div>
                        <div style={{ flex: 1, display: "flex", gap: 12, flexWrap: "wrap" }}>
                          {day.blogs.map((blog, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 200 }}>
                              {/* Changed 50% radius to tiny 2px square dot */}
                              <span style={{ width: 6, height: 6, borderRadius: 1, background: COLORS[blog.topic]?.dot, flexShrink: 0 }} />
                              <span style={{ fontSize: 13, fontWeight: 500, color: "#171717", lineHeight: 1.4 }}>{blog.title}</span>
                              <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 2, background: COLORS[blog.topic]?.bg, color: COLORS[blog.topic]?.text, fontWeight: 500, flexShrink: 0 }}>
                                {TOPICS[blog.topic]}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div style={{ color: selectedDay === day.day ? "#3B82F6" : "#A3A3A3", fontSize: 14, paddingLeft: 8 }}>
                          {selectedDay === day.day ? "▴" : "▾"}
                        </div>
                      </div>

                      {/* Expanded detail - Thinner lines, less background color noise */}
                      {selectedDay === day.day && (
                        <div style={{ padding: "20px", background: "#FAFAFA", display: "flex", gap: 16, flexWrap: "wrap" }}>
                          {day.blogs.map((blog, i) => (
                            <div key={i} style={{ flex: 1, minWidth: 280, background: "#fff", borderRadius: 4, border: `1px solid #E5E5E5`, overflow: "hidden" }}>
                              <div style={{ background: "#FAFAFA", padding: "12px 16px", borderBottom: `1px solid #E5E5E5` }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS[blog.topic]?.text, marginBottom: 6, letterSpacing: 0.5 }}>BLOG {i+1} · {TOPICS[blog.topic].toUpperCase()}</div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#171717", lineHeight: 1.4 }}>{blog.title}</div>
                                <div style={{ fontSize: 12, color: "#737373", marginTop: 8 }}>
                                  <span style={{ fontWeight: 500, color: "#525252" }}>Slug:</span> /blogs/{blog.slug}
                                </div>
                                <div style={{ fontSize: 12, color: "#737373", marginTop: 4 }}>
                                  <span style={{ fontWeight: 500, color: "#525252" }}>Target:</span> {blog.target}
                                </div>
                              </div>
                              <div style={{ padding: "16px" }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: "#525252", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Internal Links Map</div>
                                {blog.internalLinks.map((link, j) => (
                                  <div key={j} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: j < blog.internalLinks.length - 1 ? "1px solid #F0F0F0" : "none" }}>
                                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                      <span style={{ fontSize: 11, fontWeight: 600, color: "#3B82F6", background: "#EFF6FF", padding: "2px 6px", borderRadius: 2, flexShrink: 0 }}>Keyword</span>
                                      <span style={{ fontSize: 12, fontWeight: 500, color: "#171717", marginTop: 1 }}>"{link.keyword}"</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 6 }}>
                                      <span style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", background: "#F5F3FF", padding: "2px 6px", borderRadius: 2, flexShrink: 0 }}>Links to</span>
                                      <span style={{ fontSize: 12, color: "#6D28D9", fontFamily: "monospace", marginTop: 1 }}>{link.url}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#737373", marginTop: 6, paddingLeft: 2 }}>— {link.note}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Topic Legend */}
        <div style={{ marginTop: 32, background: "#fff", borderRadius: 4, border: "1px solid #E5E5E5", padding: "20px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#525252", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>Topic Clusters Covered</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {topicKeys.map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 4, background: COLORS[t]?.bg }}>
                <span style={{ width: 6, height: 6, borderRadius: 1, background: COLORS[t]?.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: COLORS[t]?.text }}>{TOPICS[t]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "#A3A3A3", fontWeight: 500 }}>
          Click any day to expand blog details and internal linking instructions
        </div>
      </div>
    </div>
  );
}