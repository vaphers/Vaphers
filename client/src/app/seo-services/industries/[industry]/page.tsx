import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { industriesData } from '../../industries/data'; 

import IndustryHero from '@/PageComponents/Industry Components/Hero';
import AttractCustomers from '@/PageComponents/Industry Components/why';
import EcommercePromoDynamic from '@/PageComponents/Industry Components/Promo';
import DynamicGrowSEO from '@/PageComponents/Industry Components/NewTop';
import DynamicFaq from '@/PageComponents/Industry Components/Faq';
import SeoAgencyVsDiy from '@/PageComponents/Industry Components/DiyVsAgency';
import { IndustryServicesAccordion } from '@/PageComponents/Industry Components/Services';
import SmoothScrollHero from '@/PageComponents/Landing Home/Results';
import IndustryFiller from '@/PageComponents/Industry Components/Filler';
import Banner from '@/PageComponents/Global Components/Banner';
import Testimonial from '@/PageComponents/Global Components/Testimonial';
import ContactForm from '@/PageComponents/Global Components/Contact';

type PageProps = {
  params: Promise<{ industry: string }>;
};

export function generateStaticParams() {
  return Object.keys(industriesData).map((industryKey) => ({
    industry: industryKey,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { industry } = await params;
  
  const data = industriesData[industry as keyof typeof industriesData];

  if (!data || !data.meta) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry page could not be found.',
    };
  }
  
  return {
    title: data.meta.title,
    description: data.meta.description,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { industry } = await params;
  
  const data = industriesData[industry as keyof typeof industriesData];

  if (!data) {
    notFound();
  }

  return (
    <div>
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
