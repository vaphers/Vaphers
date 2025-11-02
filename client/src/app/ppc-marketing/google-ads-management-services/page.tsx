import React from 'react'
import Head from 'next/head'
import GoogleAdsPitch from '@/PageComponents/Google Ads Components/Pitch'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import WhatIsGoogleAds from '@/PageComponents/Google Ads Components/WhatsGoogleAds'
import Promo from '@/PageComponents/Google Ads Components/Promo'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import Campaigns from '@/PageComponents/Google Ads Components/Campaigns'
import Essential from '@/PageComponents/Google Ads Components/Essential'
import GoogleAdsServicesAccordion from '@/PageComponents/Google Ads Components/Services'
import GoogleAdsProcess from '@/PageComponents/Google Ads Components/Process'
import WhyUs from '@/PageComponents/Global Components/WhyUs'
import GoogleAdsFaq from '@/PageComponents/Google Ads Components/Faq'
import ContactForm from '@/PageComponents/Global Components/Contact'
import AffordableAds from '@/PageComponents/Google Ads Components/AffordableAds'

const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Google Ads and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads is an online advertising platform that helps businesses display their ads on Google search, YouTube, and partner websites. You pay only when users click your ads (pay-per-click), making it a cost-effective way to target high-intent customers."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I use an affordable Google Ads management service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional and affordable Google Ads management ensures your campaigns are expertly set up, optimized, and continuously monitored, so you get the best results without overspending. Services like Vaphers focus on maximizing your ROI and minimizing wasted ad spend."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I see results with Google Ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can start seeing targeted traffic and leads within days of launching your campaigns. However, continuous optimization is key to improving results over time through better targeting, ad copy, and budget management."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in an affordable Google Ads management service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical services include campaign setup, keyword research, ad creative design, bid strategy, negative keyword management, tracking and reporting, and ongoing optimization. Vaphers tailors every aspect to fit your business needs and budget."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if my Google Ads are performing well?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll receive regular reports detailing clicks, impressions, conversions, and ad spend. Our affordable Google Ads management service includes transparent dashboards so you can always track your return on investment."
      }
    },
    {
      "@type": "Question",
      "name": "Can Google Ads help my small business compete with larger brands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! With precise targeting and smart bidding, even a small budget can reach ideal customers looking for your services. Affordable Google Ads management helps you compete by focusing on hyper-relevant keywords and audiences."
      }
    },
    {
      "@type": "Question",
      "name": "Are there hidden costs in Google Ads management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our affordable Google Ads management service is fully transparent—no hidden fees or commissions. You'll know exactly what you're paying for and where your budget goes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get started with Vaphers' Google Ads management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simply request a free audit or consultation. We'll review your goals, propose a budget, and tailor a Google Ads management plan that fits your business. Affordable packages are available for startups and established businesses alike."
      }
    }
  ]
}

const Page = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
        />
      </Head>
      <main>
        <SubHero
          heading="Affordable Google Ads Management Services"
          subtext="Drive more conversions and maximize your ad spend—expert campaign setup, optimization, and transparent reporting without breaking the bank."
          badgeText="Budget-friendly PPC solutions"
        />
        <GoogleAdsPitch />
        <WhatIsGoogleAds />
        <Promo />
        <Banner />
        <Testimonial />
        <Campaigns />
        <Essential />
        <AffordableAds />
        <GoogleAdsServicesAccordion />
        <GoogleAdsProcess />
        <WhyUs />
        <GoogleAdsFaq />
        <ContactForm />
      </main>
    </>
  )
}

export default Page
