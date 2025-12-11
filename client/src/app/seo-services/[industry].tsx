"use client";
import { industriesData } from './data';
import IndustryHero from '@/PageComponents/Industry Components/Hero';
import AttractCustomers from '@/PageComponents/Industry Components/Pitch';
import EcommercePromoDynamic from '@/PageComponents/Industry Components/Promo';

interface Props {
  params: { industry: string };
}

export default function IndustryPage({ params }: Props) {
  const data = industriesData[params.industry as keyof typeof industriesData];
  
  if (!data) {
    return <div>Industry not found</div>;
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
    </div>
  );
}
