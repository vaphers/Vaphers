export interface IndustryData {
  industry: string;
  hero: {
    heading: string;
    subtext: string;
    ctaText: string;
    ctaSecondaryText: string;
    badgeText: string;
  };
  // ... other sections
}

export const industriesData: Record<string, IndustryData> = {
  ecommerce: {
    industry: "E-commerce",
    hero: {
      heading: "SEO for E-commerce Stores in India",
      subtext: "Rank higher, get more traffic, convert more visitors",
      ctaText: "Get Free Audit",
      ctaSecondaryText: "Talk to Experts",
      badgeText: "E-commerce SEO specialists"
    }
  },
  healthcare: {
    industry: "Healthcare",
    hero: {
      heading: "SEO for Clinics & Hospitals in India",
      subtext: "Get more patients from Google searches",
      ctaText: "Free Clinic Audit",
      ctaSecondaryText: "Book Strategy Call",
      badgeText: "Healthcare SEO experts"
    }
  }
  // Add more industries
};
