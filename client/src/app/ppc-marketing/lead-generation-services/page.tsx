import React from 'react'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import ContactForm from '@/PageComponents/Global Components/Contact'
import LeadGenerationPitch from '@/PageComponents/Lead Generation Components/Pitch'
import LeadGenerationAdvantage from '@/PageComponents/Lead Generation Components/Advantage'
import WhyLeadGeneration from '@/PageComponents/Lead Generation Components/Need'
import Banner from '@/PageComponents/Global Components/Banner'
import InboundVsOutbound from '@/PageComponents/Lead Generation Components/InboundVsOutbound'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import LeadGenerationServices from '@/PageComponents/PPC Marketing Components/SeoAndB2B'
import GoogleAdsComparison from '@/PageComponents/Lead Generation Components/GSAvsPFvsYT'
import LeadGenerationAgencySection from '@/PageComponents/Lead Generation Components/FillerSection'
import Stats from '@/PageComponents/Global Components/Stats'
import LeadGenerationFaq from '@/PageComponents/Lead Generation Components/FAQ'

const Page = () => {
  return (
    <>
      <main>
        <SubHero
        heading="Generate Quality Leads That Convert Into Customers"
        subtext="Capture high-intent prospects with targeted campaigns, strategic landing pages, and data-driven optimization. We build systems that consistently fill your pipeline with qualified leads ready to buy."
        badgeText="Results-Driven Lead Generation"
        />
        <LeadGenerationPitch/>
        <LeadGenerationAdvantage/>
        <WhyLeadGeneration/>
        <Banner/>
        <InboundVsOutbound/>
        <Testimonial/>
        <LeadGenerationServices/>
        <LeadGenerationAgencySection/>
        <GoogleAdsComparison/>
        <Stats/>
        <LeadGenerationFaq/>
        <ContactForm />
      </main>
    </>
  )
}

export default Page
