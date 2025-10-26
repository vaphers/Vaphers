import Head from "next/head";
import Banner from "@/PageComponents/Global Components/Banner";
import ContactForm from "@/PageComponents/Global Components/Contact";
import HeroSEO from "@/PageComponents/Global Components/HeroSubpage";
import Stats from "@/PageComponents/Global Components/Stats";
import Testimonial from "@/PageComponents/Global Components/Testimonial";
import ChooseCompany from "@/PageComponents/Local Seo Components/ChooseCompany";
import LocalFaq from "@/PageComponents/Local Seo Components/FAQ";
import GMB from "@/PageComponents/Local Seo Components/GMB";
import LocalLeads from "@/PageComponents/Local Seo Components/MoreLeads";
import LocalPitch from "@/PageComponents/Local Seo Components/Pitch";
import Promo from "@/PageComponents/Local Seo Components/Promo";
import LocalServicesAccordion from "@/PageComponents/Local Seo Components/Services";
import WhyLocalSEO from "@/PageComponents/Local Seo Components/WhatsLocal";

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Local SEO and why does it matter for businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Local SEO improves your visibility in Google Maps, AI-overviews, and the local 3-pack. It helps your business appear when nearby customers search for your services, driving real leads and sales."
        }
      },
      {
        "@type": "Question",
        "name": "How do AI agents like ChatGPT or Gemini use Local SEO data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI agents analyze structured data, customer reviews, and your Google Business Profile to understand what your business does and where it’s located. Well-optimized local content increases your chances of being mentioned in AI-driven search results."
        }
      },
      {
        "@type": "Question",
        "name": "How can small businesses compete with big brands using Local SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Local SEO levels the playing field by focusing on proximity and relevance. Even small businesses can outrank large corporations in local results through consistent citations, localized content, and customer engagement."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to see results from Local SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most companies see meaningful progress in 3–6 months. However, maintaining updated listings, positive reviews, and consistent on-page optimizations accelerates visibility growth in Maps and Search."
        }
      },
      {
        "@type": "Question",
        "name": "Do customer reviews impact Local SEO and AI rankings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Both Google and AI systems use reviews to measure credibility and customer satisfaction. Frequent, positive, and authentic reviews help boost search and map rankings significantly."
        }
      },
      {
        "@type": "Question",
        "name": "What are the key ranking factors for Local SEO in 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top ranking factors include Google Business Profile optimization, proximity, NAP consistency, backlinks from local sources, engagement, and structured data. AI-friendly schema markup now plays a crucial role too."
        }
      },
      {
        "@type": "Question",
        "name": "How can schema markup help with local search visibility?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Schema markup helps search engines and AI agents read your business data correctly. Adding LocalBusiness and FAQ schema improves inclusion in featured snippets, AI results, and Local Packs."
        }
      },
      {
        "@type": "Question",
        "name": "How can I optimize my business for voice search using Local SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To rank for voice search, use conversational phrases like 'near me' and short, direct answers on your website. Also, ensure your Google Business Profile includes clear hours, phone, and category details."
        }
      },
      {
        "@type": "Question",
        "name": "Does Local SEO also improve organic rankings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Effective Local SEO often boosts organic traffic because Google prioritizes location-based results. Optimizations such as on-page keywords, backlinks, and schema strengthen your domain’s overall visibility."
        }
      },
      {
        "@type": "Question",
        "name": "How can Local SEO connect with AI-driven search platforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI platforms use web data, structured markup, and user context to deliver recommendations. By maintaining an optimized Google Business Profile, AI-friendly schema, and localized content, your brand can appear in AI query responses."
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
          heading="Local SEO Services That Transform Your Business"
          subtext="Boost your local visibility with proven Local SEO strategies built for Google Maps, AI platforms, and voice search."
          badgeText="Explore our SEO solutions"
        />
        <LocalPitch />
        <WhyLocalSEO />
        <Promo />
        <Banner />
        <Testimonial />
        <GMB />
        <LocalServicesAccordion />
        <LocalLeads />
        <ChooseCompany />
        <Stats />
        <LocalFaq />
        <ContactForm />
      </main>
    </>
  );
}
