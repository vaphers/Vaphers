import Link from "next/link";
import { FaqItem } from "@/PageComponents/Industry Components/Faq";

export interface FloatingIconData {
  src: string;
  alt: string;
  width: number;
  height: number;
  positionClass: string;
  className?: string;
}

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

  sectionGrow?: {
    heading: string;
    subheading?: string;
    description: string;
    mainImageUrl: string;
    floatingIcons: FloatingIconData[];
    ctaText?: string;
    ctaLink?: string;
  };

  sectionAttract: {
    heading: string;
    subheading?: string;
    description: string;
    imageUrl: string;
    reverse?: boolean;
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

  servicesSection?: {
    heading: string;
    subheading: string;
    services: {
      id: number;
      number: string;
      title: string;
      description: React.ReactNode; 
      points: string[];
      image: string;
      color: string;
    }[];
  };

  sectionFaq?: {
    heading: string;
    description: string;
    faqs: FaqItem[];
    ctaText?: string;
    ctaLink?: string;
  };
}

export const industriesData: Record<string, IndustryData> = {
// Healthcare Industry Data
  healthcare: {
    key: "healthcare",
    slug: "healthcare",
    industry: "Healthcare",
    hero: {
      heading: "Healthcare SEO Services for Clinics & Hospitals",
      subtext: "Drive qualified patient enquiries with proven, search-focused healthcare marketing",
      ctaText: "Free Website Audit",
      ctaSecondaryText: "Book Strategy Call",
      badgeText: "Healthcare SEO experts",
    },

    // Pitch for Healthcare 
    sectionGrow: {
      heading: "Grow Your Clinic With <span class='bg-blue-600 bg-clip-text text-transparent'>Healthcare SEO</span>",
      subheading: "Reach More Patients Where They're Actively Searching",
      
      description: `
        If your clinic isn’t showing up on Google when patients search for treatments, specialists, or nearby services, 
        you’re losing enquiries to competitors every single day. Our  
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">healthcare SEO services</a>  
        help clinics boost visibility, build trust, and attract patients who are ready to book appointments right now.

        We also strengthen your presence for location-based searches with strategic  
        <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
        ensuring your clinic ranks higher in Google Maps, local packs, and “near me” searches, the exact places your patients look first.
      `,
      
      mainImageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765455276/Healthcare_page_lioj95.png",
      ctaLink: "/contact",

      floatingIcons: [
        {
          src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png",
          alt: "Google",
          width: 80,
          height: 80,
          positionClass: "absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3",
          className: "w-12 h-12 sm:w-10 sm:h-10 lg:w-24 lg:h-24"
        },
        {
          src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747669/Rank_One_On_Google_v7q5as.png",
          alt: "SEO Rank",
          width: 176,
          height: 176,
          positionClass: "absolute -top-20 right-1 sm:top-0 sm:right-2 lg:top-70 lg:-right-1",
          className: "w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44"
        }
      ]
    },

    // why healthcare need seo 
    sectionAttract: {
        heading: "Why <span class='text-blue-600'>Clinics Need SEO</span> In Today’s Healthcare Market?",
        
        subheading: "SEO for Clinics That Want Consistent, High-Intent Patient Enquiries",
        
        description: `
          Patients no longer choose a clinic based only on location, they research, compare, and evaluate online first. 
          That’s why SEO for clinics is now essential. If your clinic doesn't appear on the first page of Google, you lose 
          valuable patient enquiries to competitors who do. Strong healthcare SEO helps your clinic rank for treatments, 
          conditions, and services your ideal patients are already searching for, while improving local visibility and 
          building trust through medically accurate, E-E-A-T-aligned content.
          <br/><br/>
          If you want a structured approach to long-term growth, explore our 
          <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
          We help clinics strengthen online authority, attract ready-to-book patients, and turn search visibility 
          into consistent appointments and walk-ins.
        `,
        
        imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765456549/Healthcare_Graphics_2_2_a35c8b.png",
        reverse: true
    },

    // promotion Section 
    sectionPromo: {
        heading: "Why Vaphers is Trusted by Medical Experts?",
        subheading: "HIPAA Compliant Strategies",
        
        description: `
          At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of medical SEO and the 
          compliance standards clinics must follow. Our team builds strategies that protect patient data, strengthen online 
          credibility, and help healthcare practices grow with search-focused precision.

          Whether you're just learning about us or ready to scale your clinic’s visibility, start with our 
          <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
          <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
          medical professionals attract more patient enquiries and improve long-term search performance.
        `,
        
        imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765455736/Gemini_Generated_Image_ttrb0bttrb0bttrb_wsesh7.png",
        reverse: false,
        ctaText: "Get Your Practice Found",
        ctaHref: "https://www.vaphers.com/contact-us"
    },

    // Services Section
    servicesSection: {
        heading: "Healthcare SEO Services for Clinics & Hospitals",
        subheading: "Everything you need to increase visibility, trust & patient enquiries",
        
        services: [
          {
            id: 1,
            number: '01',
            title: 'Technical SEO for Healthcare Websites',
            description: (
              <>
                We ensure your clinic’s website meets strict medical and data-security standards.  
                From improving site speed to resolving schema and crawling issues, our  
                <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                  technical SEO services
                </Link> 
                help search engines index your pages accurately, so patients find you faster.
              </>
            ),
            points: [
              'HIPAA-safe technical optimization',
              'Faster Core Web Vitals performance',
              'Healthcare schema & structured data',
              'Indexing, crawling & security fixes'
            ],
            image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
            color: 'from-cyan-500 to-blue-600'
          },

          {
            id: 2,
            number: '02',
            title: 'Local SEO for Clinics',
            description: (
              <>
                When patients search “clinic near me,” you need to be the first name they see.  
                Our  
                <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                  Local SEO services
                </Link> 
                optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and appointment calls.
              </>
            ),
            points: [
              'Google Business Profile optimization',
              'Local keyword targeting',
              'NAP, citations & map ranking strategy',
              'Multi-location clinic support'
            ],
            image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
            color: 'from-purple-500 to-pink-600'
          },

          {
            id: 3,
            number: '03',
            title: 'Healthcare SEO Audit',
            description: (
              <>
                A full, in-depth audit built specifically for medical websites.  
                Our  
                <Link href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 hover:underline px-1">
                  SEO audit services
                </Link> 
                uncover issues blocking your visibility, from E-E-A-T gaps to outdated medical content and technical errors.
              </>
            ),
            points: [
              'Complete on-page & technical scan',
              'E-E-A-T & medical content evaluation',
              'Local SEO & GBP analysis',
              'Competitor & keyword opportunity mapping'
            ],
            image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
            color: 'from-blue-500 to-indigo-600'
          },

          {
            id: 4,
            number: '04',
            title: 'AI-Powered Healthcare SEO',
            description: (
              <>
                From content optimization to predictive keyword insights, our  
                <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                  AI SEO services
                </Link> 
                help clinics stay ahead of competitors and rank faster with intelligent search-driven strategies.
              </>
            ),
            points: [
              'AI-enhanced medical content creation',
              'Predictive keyword modelling',
              'Automated optimization insights',
              'Smart competitor analysis'
            ],
            image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457049/ai-seo-tools-blog-post-image_l6vssq.jpg',
            color: 'from-green-500 to-emerald-600'
          }
        ]
    },

    // Faq Section
    sectionFaq: {
        heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Healthcare SEO</span>",
        description: "Clear answers to help clinics understand how SEO drives patient enquiries and long-term growth.",
        ctaText: "Get Your Free Audit",
        ctaLink: "/contact",

        faqs: [
          {
            question: "What is Healthcare SEO?",
            answer: "Healthcare SEO helps clinics and medical professionals rank higher on Google for treatments, conditions, and services patients are actively searching for. It focuses on visibility, trust, and patient acquisition."
          },
          {
            question: "How is SEO for clinics different from regular SEO?",
            answer: "SEO for clinics requires strict medical accuracy, E-E-A-T compliance, HIPAA-safe optimization, and patient-focused content. It also prioritizes local search so nearby patients can find you quickly."
          },
          {
            question: "How long does it take for a clinic to see results?",
            answer: "Most clinics start seeing noticeable improvements in 2–3 months, with stronger patient enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
          },
          {
            question: "Do you help with Google Business Profile optimization?",
            answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for ‘near me’ searches, essential for local patient acquisition."
          },
          {
            question: "Is Healthcare SEO safe and compliant with guidelines?",
            answer: "Absolutely. We follow strict E-E-A-T guidelines, ensure HIPAA-safe website practices, and create medically accurate content reviewed for reliability and trustworthiness."
          },
          {
            question: "Can SEO help my clinic get more patient enquiries?",
            answer: "Yes. By ranking your clinic for targeted healthcare keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent patient enquiries."
          },
          {
            question: "Do you offer SEO audits for medical websites?",
            answer: "Yes. Our in-depth healthcare SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking patient growth."
          },
          {
            question: "Is content creation included in your healthcare SEO services?",
            answer: "Yes. We create medically accurate, search-optimized content for service pages, treatment guides, blogs, and FAQs, all designed to help patients choose your clinic with confidence."
          }
        ]
    }

  },
};
