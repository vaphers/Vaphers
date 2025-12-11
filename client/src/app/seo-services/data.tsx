export interface IndustryData {
  key: string;
  slug: string;
  industry: string;

  hero: {
    heading: string;
    subtext: string;
    ctaText: string;
    ctaSecondaryText?: string;
    badgeText?: string;
  };

  sectionAttract: {
    heading: string;
    subheading?: string;
    description: string; 
    imageUrl: string;
    reverse?: boolean; 

    // optional
    ctaText?: string;
    ctaHref?: string;
  };

  sectionPromo?: {
    heading: string;
    subheading?: string;
    description: string;   
    imageUrl: string;
    altText?: string;
    reverse?: boolean;
    ctaText?: string;
    ctaHref?: string;
  };

}


export const industriesData: Record<string, IndustryData> = {


  ecommerce: {
    key: "ecommerce",
    slug: "e-commerce",
    industry: "E-commerce",

    hero: {
      heading: "SEO for E-commerce Stores in India",
      subtext: "Rank higher, get more traffic, convert more visitors",
      ctaText: "Get Free Audit",
      ctaSecondaryText: "Talk to Experts",
      badgeText: "E-commerce SEO specialists",
    },

    sectionAttract: {
      heading: "Attract More Customers with Results-Driven Ecommerce SEO",
      subheading: "Scale your revenue without overspending on ads",

      description: `
        Our ecommerce SEO services deliver measurable results for online stores looking to scale sustainably. 
        We optimize your product pages, collections, technical structure, and conversion funnels to drive 
        meaningful growth. Whether you run a 
        <a href="https://www.vaphers.com/website-development-services/shopify-website-development" 
           class="text-blue-600 underline font-medium">Shopify store</a>
        or a 
        <a href="https://www.vaphers.com/website-development-services/ecommerce-development" 
           class="text-blue-600 underline font-medium">WooCommerce platform</a>, 
        our strategies are built for long-term profitability and consistent organic sales.
      `,

      imageUrl:
        "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v1761569143/Frame_1_s7kydx.png",

      reverse: false 
    },

    sectionPromo: {
      heading: "Why Vaphers Delivers Ecommerce Growth",
      subheading: "Platform-Specific Expertise for Shopify, WooCommerce & More",

      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we combine
        <a href="https://www.vaphers.com/seo-services" class="text-blue-200 underline">
          proven SEO strategies
        </a>
        with platform-specific optimization...
      `,

      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/.../why-ecommerce-seo.png",
      altText: "Ecommerce SEO platforms",
      reverse: false,

      ctaText: "Partner With Vaphers Today",
      ctaHref: "https://www.vaphers.com/contact-us"
    },

    
  },


// healthcare sectoin

  healthcare: {
    key: "healthcare",
    slug: "healthcare",
    industry: "Healthcare",

    hero: {
      heading: "SEO for Clinics & Hospitals in India",
      subtext: "Get more patients from Google searches",
      ctaText: "Free Clinic Audit",
      ctaSecondaryText: "Book Strategy Call",
      badgeText: "Healthcare SEO experts",
    },

    sectionAttract: {
      heading: "Grow Your Patient Base With Targeted Healthcare SEO",
      subheading: "Attract high-intent patients searching for your services",

      description: `
        Patients now search online before choosing a clinic or specialist. Our healthcare SEO strategies ensure 
        your practice appears prominently for treatments, symptoms, and local searches. 
        We follow strict medical content guidelines (E-E-A-T) to build trust while improving rankings. Whether you're a 
        <a href="https://www.vaphers.com" class="text-blue-600 underline font-medium">multi-specialty hospital</a> 
        or an independent clinic, we help you grow patient appointments sustainably.
      `,

      imageUrl:
        "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit,w_600/v12345/healthcare-seo.png",

      reverse: true // image on RIGHT
    },

    sectionPromo: {
      heading: "Why Vaphers Delivers Ecommerce Growth",
      subheading: "Platform-Specific Expertise for Shopify, WooCommerce & More",

      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we combine
        <a href="https://www.vaphers.com/seo-services" class="text-blue-200 underline">
          proven SEO strategies
        </a>
        with platform-specific optimization...
      `,

      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/.../why-ecommerce-seo.png",
      altText: "Ecommerce SEO platforms",
      reverse: false,

      ctaText: "Partner With Vaphers Today",
      ctaHref: "https://www.vaphers.com/contact-us"
    },

  },
};
