"use client";
import { industriesData } from './data';
import IndustryHero from '@/PageComponents/Industry Components/Hero';

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
    </div>
  );
}
