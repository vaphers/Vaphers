"use client";

import React, { useEffect, useRef, useMemo } from 'react'
import { useParams } from 'next/navigation'; 
import { industriesData } from '../../industries/data'; 
import DynamicFaq from '@/PageComponents/Industry Components/Faq';
import Lenis from '@studio-freight/lenis'

// Components
import IndustryHero from '@/PageComponents/Industry Components/Hero';
import AttractCustomers from '@/PageComponents/Industry Components/why';
import EcommercePromoDynamic from '@/PageComponents/Industry Components/Promo';
import DynamicGrowSEO from '@/PageComponents/Industry Components/NewTop';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import Banner from '@/PageComponents/Global Components/Banner';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import ContactForm from '@/PageComponents/Global Components/Contact';
import SeoAgencyVsDiy from '@/PageComponents/Industry Components/DiyVsAgency';
import {IndustryServicesAccordion} from '@/PageComponents/Industry Components/Services';
import SmoothScrollHero from '@/PageComponents/Landing Home/Results';
import IndustryFiller from '@/PageComponents/Industry Components/Filler';

export default function IndustryPage() {
  const params = useParams();
  const industryKey = typeof params.industry === 'string' ? params.industry : '';
  const data = industriesData[industryKey as keyof typeof industriesData];
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Industry Not Found</h1>
      </div>
    );
  }

  const lenisRef = useRef<Lenis | null>(null)

  const lenisConfig = useMemo(() => ({
    lerp: 0.1,
    smooth: true,
    wheelMultiplier: 1.3,
  }), [])

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


  return (
    <div>
      {/* <NavBar /> */}

      <IndustryHero
        heading={data.hero.heading}
        subtext={data.hero.subtext}
        ctaText={data.hero.ctaText}
        ctaSecondaryText={data.hero.ctaSecondaryText}
        badgeText={data.hero.badgeText}
      />
      
      {data.sectionGrow && (
        <DynamicGrowSEO
          heading={data.sectionGrow.heading}
          subheading={data.sectionGrow.subheading}
          description={data.sectionGrow.description}
          mainImageUrl={data.sectionGrow.mainImageUrl}
          floatingIcons={data.sectionGrow.floatingIcons}
          ctaText={data.sectionGrow.ctaText}
          ctaLink={data.sectionGrow.ctaLink}
        />
      )}

      <SmoothScrollHero/>
      
      <AttractCustomers
        heading={data.sectionAttract.heading}
        subheading={data.sectionAttract.subheading}
        description={data.sectionAttract.description}
        imageUrl={data.sectionAttract.imageUrl}
        reverse={data.sectionAttract.reverse}
      />

      {data.sectionPromo && (
        <EcommercePromoDynamic
          heading={data.sectionPromo.heading}
          subheading={data.sectionPromo.subheading}
          description={data.sectionPromo.description}
          imageUrl={data.sectionPromo.imageUrl}
          altText={data.sectionPromo.altText}
          reverse={data.sectionPromo.reverse}
          ctaText={data.sectionPromo.ctaText}
          ctaHref={data.sectionPromo.ctaHref}
        />
      )}

      <Banner/>
      <Testimonial/>    
      <SeoAgencyVsDiy/>
      <IndustryServicesAccordion services={data.servicesSection?.services || []} />
      <IndustryFiller/>
      {data.sectionFaq && (
      <DynamicFaq
        heading={data.sectionFaq.heading}
        description={data.sectionFaq.description}
        faqs={data.sectionFaq.faqs}
        ctaText={data.sectionFaq.ctaText}
        ctaLink={data.sectionFaq.ctaLink}
      />
      )}
      <ContactForm/>
    </div>
  );
}
