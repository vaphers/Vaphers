import React from 'react'
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

const Page = () => {
  return (
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
      <Essential/>
      <GoogleAdsServicesAccordion/>
      <GoogleAdsProcess/>
    </main>
  )
}

export default Page
