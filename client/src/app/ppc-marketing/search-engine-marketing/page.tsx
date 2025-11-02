import React from 'react'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import ContactForm from '@/PageComponents/Global Components/Contact'
import SEMPitch from '@/PageComponents/SEM Components/Pitch'
import WhatIsSEM from '@/PageComponents/SEM Components/WhatsSEM'
import WhySEMInvestment from '@/PageComponents/SEM Components/Investment'
import Banner from '@/PageComponents/Global Components/Banner'
import WhatAreSearchEngines from '@/PageComponents/SEM Components/SearchEngines'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import SEMAgencySection from '@/PageComponents/SEM Components/FillerSection'
import SEOvsPPCvsSEM from '@/PageComponents/SEM Components/SEOvsPPCvsSEM'
import SEMServicesAccordion from '@/PageComponents/SEM Components/Services'
import SEMBenefitsSection from '@/PageComponents/SEM Components/Benifit'
import SemMarketingFaq from '@/PageComponents/SEM Components/FAQ'

const Page = () => {
  return (
    <>
      <main>
        <SubHero
          heading="Affordable Meta Ads Management Services"
          subtext="Drive more conversions across Google and Meta platforms—expert campaign setup, audience targeting, and optimization to maximize every ad dollar with full transparency."
          badgeText="Affordable Meta Ads solutions"
        />
        <SEMPitch/>
        <WhatIsSEM/>
        <WhySEMInvestment/>
        <Banner/>
        <WhatAreSearchEngines/>
        <Testimonial/>
        <SEMAgencySection/>
        <SEOvsPPCvsSEM/>
        <SEMServicesAccordion/>
        <SEMBenefitsSection/>
        <SemMarketingFaq/>
        <ContactForm />
      </main>
    </>
  )
}

export default Page
