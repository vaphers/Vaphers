import React from 'react'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import ContactForm from '@/PageComponents/Global Components/Contact'
import MetaAdsPitch from '@/PageComponents/Meta Ads Components/Pitch'
import WhatsMetaAds from '@/PageComponents/Meta Ads Components/WhatsMetaAds'
import WhoNeedsMetaAds from '@/PageComponents/Meta Ads Components/WhoNeedsMetaAds'
import Banner from '@/PageComponents/Global Components/Banner'
import CampaignTypes from '@/PageComponents/Meta Ads Components/Campaign'
import FacebookVsInstagramAds from '@/PageComponents/Meta Ads Components/FaceBookvsInsta'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import MetaAdsServicesAccordion from '@/PageComponents/Meta Ads Components/Services'
import MetaAdsPromo from '@/PageComponents/Meta Ads Components/Promo'
import MetaLeads from '@/PageComponents/Meta Ads Components/HowItGenerateLeads'
import Stats from '@/PageComponents/Global Components/Stats'
import MetaFaq from '@/PageComponents/Meta Ads Components/Faq'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do Meta ads generate leads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Use the Leads objective and select a conversion location like Instant Forms or Click-to-Message. Instant Forms capture details in-app on Facebook or Instagram, while Click-to-Message opens Messenger or WhatsApp for real-time conversations and booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Instant Forms vs Click-to-Message—what should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Instant Forms reduce friction using prefill and custom questions, improving submit rates; Click-to-Message starts a chat to qualify quickly and schedule. Many brands run both: form for qualification plus messaging for fast follow-up.',
      },
    },
    {
      '@type': 'Question',
      name: 'What setup is required to start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Set up Business Manager, connect Pages and Instagram, verify domain, install Pixel and Conversions API, configure events, then choose the Leads objective in Ads Manager and pick your conversion location (Instant Forms, messaging, calls, or website).',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do Meta lead ads cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Costs vary by niche, audience size, and creative quality. Optimize toward cost per lead and qualified lead. Use Advantage budget and creative testing to lower CPL as data accumulates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I improve lead quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Use Higher-Intent forms with a review step, add qualifying questions, exclude low-quality segments, and push leads to your CRM for rapid follow-up. In WhatsApp, use templates and quick replies to qualify and book faster.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can leads go directly to my CRM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Use native integrations, Lead Center, or webhooks/connectors to sync Instant Form submissions and messaging leads to your CRM for immediate outreach and tracking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which placements work best for lead gen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Start with Advantage+ placements, then analyze performance by family (Feeds, Stories, Reels, Messaging). Maintain vertical 9:16 video for Stories/Reels and test static versus short video in Feeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does attribution work on Meta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Default attribution commonly uses 7-day click/1-day view. Compare with CRM timestamps, add UTM parameters, and track both “leads” and “conversion leads” to align volume with intent.',
      },
    },
  ],
}

const Page = () => {
  return (
    <>
      <main>
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
          }}
        />

        <SubHero
          heading="Affordable Meta Ads Management Services"
          subtext="Drive more conversions across Google and Meta platforms—expert campaign setup, audience targeting, and optimization to maximize every ad dollar with full transparency."
          badgeText="Affordable Meta Ads solutions"
        />
        <MetaAdsPitch />
        <WhatsMetaAds />
        <WhoNeedsMetaAds />
        <Banner />
        <FacebookVsInstagramAds />
        <CampaignTypes />
        <Testimonial />
        <MetaAdsServicesAccordion />
        <MetaAdsPromo />
        <MetaLeads />
        <Stats />
        <MetaFaq />
        <ContactForm />
      </main>
    </>
  )
}

export default Page
