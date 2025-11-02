'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import ContactForm from '@/PageComponents/Global Components/Contact'
import PpcHero from '@/PageComponents/PPC Marketing Components/Hero'
import PpcPitch from '@/PageComponents/PPC Marketing Components/Pitch'
import WhatIsPPCMarketing from '@/PageComponents/PPC Marketing Components/WhatsPPC'
import Promo from '@/PageComponents/PPC Marketing Components/Promo'
import SeoVsPpc from '@/PageComponents/PPC Marketing Components/SEOvsPPC'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import HowPpcWork from '@/PageComponents/PPC Marketing Components/HowPPC'
import PPCAdTypesSection from '@/PageComponents/PPC Marketing Components/PpcType'
import PPCMarketingServicesAccordion from '@/PageComponents/PPC Marketing Components/Services'
import PPCMarketingProcess from '@/PageComponents/PPC Marketing Components/Process'
import Stats from '@/PageComponents/Global Components/Stats'
import PpcMarketingFaq from '@/PageComponents/PPC Marketing Components/FAQ'

export default function Page() {
  const lenisRef = useRef<Lenis | null>(null)

  const lenisConfig = useMemo(
    () => ({
      lerp: 0.1,
      smooth: true,
      wheelMultiplier: 1.3,
    }),
    []
  )

  useEffect(() => {
    const initLenis = () => {
      const lenis = new Lenis(lenisConfig)

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
      lenisRef.current = lenis
      lenis.scrollTo(0)

      return () => {
        lenis.destroy()
      }
    }

    const timeoutId = setTimeout(initLenis, 100)

    return () => {
      clearTimeout(timeoutId)
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [lenisConfig])

  // Inject FAQ JSON-LD Schema dynamically
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is PPC marketing and how does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PPC marketing, or pay-per-click advertising, is a model where you pay only when users click your ads. It allows targeted advertising on platforms like Google Ads and Facebook Ads, reaching the right audience at the right time.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does PPC marketing cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost varies based on industry, competition, and keywords. You control your budget, and costs are per click, making it scalable and cost-effective with proper management.',
          },
        },
        {
          '@type': 'Question',
          name: 'What platforms support PPC advertising?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popular PPC platforms include Google Ads, Microsoft Advertising, Facebook Ads, Instagram Ads, LinkedIn Ads, and Twitter Ads, allowing you to reach diverse audiences across search engines and social media.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is PPC different from SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PPC drives immediate paid traffic and quick results by bidding on ad placements. SEO builds organic search rankings over time but costs less per visit in the long run. Combining both strategies often yields the best results for sustainable growth.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good click-through rate (CTR) for PPC ads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A good CTR varies by industry and platform, but typically ranges between 2-5% for search ads. Higher CTRs indicate well-targeted, relevant ads that resonate with your audience.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can small businesses benefit from PPC marketing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, PPC allows small businesses to compete with larger brands by targeting local or niche audiences, controlling budgets, and quickly generating leads with measurable results.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I measure PPC marketing success?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Success is measured through metrics like click-through rate, cost per click, conversion rates, return on ad spend, and overall ROI. Continuous monitoring and optimization are key.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I get started with PPC marketing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start by defining clear goals, choosing platforms and keywords, setting a budget, and either managing campaigns yourself or hiring expert PPC services to maximize ad spend effectiveness.',
          },
        },
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(faqSchema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <>
      <div>
        <PpcHero />
        <PpcPitch />
        <WhatIsPPCMarketing />
        <Promo />
        <Banner />
        <SeoVsPpc />
        <Testimonial />
        <HowPpcWork />
        <PPCAdTypesSection />
        <PPCMarketingServicesAccordion />
        <PPCMarketingProcess />
        <Stats />
        <PpcMarketingFaq />
        <ContactForm />
      </div>
    </>
  )
}
