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

  meta: {
    title: string;
    description: string;
  };

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
    meta: {
      title: "SEO for Healthcare Business | Get More Diners & Online Orders",
      description: "Boost your restaurant's visibility on Google. Our expert restaurant SEO services help you attract more local customers, increase table reservations, and drive online orders."
    },
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
      
      mainImageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      ctaLink: "/contact-us",

      floatingIcons: [
        {
          src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png",
          alt: "Google",
          width: 80,
          height: 80,
          positionClass: "absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3",
          className: "w-12 h-12 sm:w-10 sm:h-10 lg:w-18 lg:h-18"
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
        
        imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
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
        
        imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
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

// Plumber Industry Data
plumbers: {
  key: "plumbers",
  slug: "plumbers",
  industry: "Plumbers",
      meta: {
      title: "SEO for Dentists | Dental SEO to Book More Patients",
      description: "Attract high-value patients directly from Google. Our dental SEO services are designed to rank your practice for the most profitable treatments and fill your appointment book."
    },
  hero: {
    heading: "Plumber SEO Services to Dominate Your Service Area",
    subtext: "Get more calls, book more jobs, and grow your plumbing business with proven search marketing.",
    ctaText: "Get Your Free Service Area Audit",
    ctaSecondaryText: "Book a Strategy Call",
    badgeText: "Plumbing SEO Experts",
  },

  // Pitch for Plumbers 
  sectionGrow: {
    heading: "Grow Your Plumbing Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Plumber SEO</span>",
    subheading: "Reach More Homeowners Where They're Actively Searching",
    description: `
      If your plumbing business isn’t showing up when homeowners search for “emergency plumber” or “pipe repair near me”, you’re losing jobs to competitors every single day. Our 
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">plumber SEO services</a> 
      help you dominate local search, build trust, and attract homeowners who need to book a job right now.
      <br/><br/>
      We also strengthen your presence for location-based searches with strategic 
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your business ranks higher in Google Maps, local packs, and “near me” searches—the exact places your customers look first.
    `,
    mainImageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
    ctaLink: "/contact-us",
    floatingIcons: [
      {
        src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747776/Google-G-icon-favicon-PNG-large_lcye0c.png",
        alt: "Google Icon",
        width: 80,
        height: 80,
        positionClass: "absolute top-2 left-1 sm:top-4 sm:left-2 lg:top-8 lg:-left-1 p-1 sm:p-2 lg:p-3",
        className: "w-12 h-12 sm:w-10 sm:h-10 lg:w-18 lg:h-18"
      },
      {
        src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761747669/Rank_One_On_Google_v7q5as.png",
        alt: "Top Google Ranking Icon",
        width: 176,
        height: 176,
        positionClass: "absolute -top-20 right-1 sm:top-0 sm:right-2 lg:top-70 lg:-right-1",
        className: "w-28 h-28 sm:w-28 sm:h-28 lg:w-44 lg:h-44"
      }
    ]
  },

  // why plumbers need seo 
  sectionAttract: {
    heading: "Why <span class='text-blue-600'>Plumbers Need SEO</span> In Today’s Market?",
    subheading: "For Consistent, High-Intent Job Bookings",
    description: `
      Homeowners no longer look in the yellow pages; they search online. If your plumbing business doesn't appear on the first page of Google, you lose valuable job requests to competitors who do. Strong SEO for plumbers helps your business rank for profitable services like 'drain cleaning' or 'water heater installation' your ideal customers are already searching for, while improving local visibility and building trust.
      <br/><br/>
      If you want a structured approach to long-term growth, explore our 
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
      We help plumbers strengthen online authority, attract ready-to-book customers, and turn search visibility into consistent jobs.
    `,
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png", // Changed alt-text relevant image
    reverse: true
  },

  // promotion Section 
  sectionPromo: {
    heading: "Why Vaphers is Trusted by Local Service Businesses",
    subheading: "Lead-Focused & Hyperlocal Strategies",
    description: `
      At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of marketing for tradespeople. Our team builds strategies that generate local leads, strengthen your service area authority, and help you grow with search-focused precision.
      <br/><br/>
      Whether you're just learning about us or ready to scale your visibility, explore our 
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-300 underline">local SEO services</a> to see how we help plumbers attract more job requests and improve long-term search performance.
    `,
    imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
    reverse: false,
    ctaText: "Get More Plumbing Jobs",
    ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section
  servicesSection: {
    heading: "Plumber SEO Services for Service Area Dominance",
    subheading: "Everything you need to increase visibility, trust & job bookings",
    services: [
      {
        id: 1,
        number: '01',
        title: 'Local SEO for Plumbers',
        description: `When homeowners search “plumber near me,” you need to be the first name they see. Our <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 hover:underline px-1">Local SEO services</a> optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and appointment calls.`,
        points: [
          'Google Business Profile optimization',
          'Local keyword & service area targeting',
          'NAP, citations & map ranking strategy',
          'Online review & reputation management'
        ],
        image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
        color: 'from-cyan-500 to-blue-600'
      },
      {
        id: 2,
        number: '02',
        title: 'Websites That Convert Calls',
        description: `A slow, confusing website costs you jobs. Our <a href="https://www.vaphers.com/website-development-services" class="text-blue-600 hover:underline px-1">website development services</a> create fast, mobile-friendly sites with clear 'Call Now' buttons, service listings, and contact forms designed to generate leads.`,
        points: [
          'Mobile-first & fast-loading design',
          'Click-to-call functionality',
          'Clear service & pricing pages',
          'Lead capture forms & booking integration'
        ],
        image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
        color: 'from-purple-500 to-pink-600'
      },
      {
        id: 3,
        number: '03',
        title: 'Pay-Per-Click (PPC) for Plumbers',
        description: `Need leads now? Our <a href="https://www.vaphers.com/ppc-marketing" class="text-blue-600 hover:underline px-1">Google Ads campaigns</a> put your business at the top of search results for urgent keywords like “emergency plumber,” driving immediate calls and job bookings.`,
        points: [
          'Immediate lead generation',
          'Target high-intent keywords',
          'Geo-targeted ad campaigns',
          'Maximize ad spend ROI'
        ],
        image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 4,
        number: '04',
        title: 'Plumbing SEO Audits',
        description: `Our <a href="https://www.vaphers.com/seo-services/seo-audit-services" class="text-blue-600 hover:underline px-1">SEO audit services</a> uncover issues blocking your visibility, from local ranking gaps to technical errors and competitor weaknesses in your service area.`,
        points: [
          'Complete on-page & technical scan',
          'Local SEO & GBP analysis',
          'Competitor & keyword opportunity mapping',
          'Actionable roadmap for growth'
        ],
        image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457049/ai-seo-tools-blog-post-image_l6vssq.jpg',
        color: 'from-green-500 to-emerald-600'
      }
    ]
  },

  // Faq Section
  sectionFaq: {
    heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Plumber SEO</span>",
    description: "Clear answers to help plumbers understand how SEO drives job bookings and long-term growth.",
    ctaText: "Get Your Free Audit",
    ctaLink: "/contact",
    faqs: [
      {
        question: "What is Plumber SEO?",
        answer: "Plumber SEO helps your plumbing business rank higher on Google for services like 'drain cleaning' or 'emergency repairs' that homeowners are actively searching for. It focuses on local visibility, trust, and lead generation."
      },
      {
        question: "How does local SEO help my plumbing business?",
        answer: "Local SEO optimizes your online presence to appear in 'near me' searches and on Google Maps. It's the most effective way to connect with customers in your immediate service area who need help fast."
      },
      {
        question: "How long until I get more calls from SEO?",
        answer: "Most plumbing businesses see a noticeable increase in local traffic and calls in 2-3 months, with significant job growth typically showing within 4-6 months as your authority builds."
      },
      {
        question: "Do you help with my Google Business Profile?",
        answer: "Yes. Optimizing your Google Business Profile is a core part of our strategy. We help improve your map rankings, increase calls directly from search, and manage customer reviews."
      },
      {
        question: "Is SEO better than buying leads from other services?",
        answer: "SEO builds your own business asset that generates exclusive leads for you over the long term, often at a lower cost per lead than shared lead services. You own the customer relationship from the start."
      },
      {
        question: "Can you build a new website for my plumbing business?",
        answer: "Yes. We design fast, mobile-friendly websites with clear calls-to-action, service listings, and contact forms designed to convert visitors into booked jobs."
      },
      {
        question: "How much does SEO for plumbers cost?",
        answer: "Our SEO plans are tailored to your service area, competition, and business goals. We focus on delivering a strong return on investment by driving profitable job bookings."
      },
      {
        question: "How do I get started?",
        answer: "Book a free consultation call with our team. We'll analyze your current online presence and provide a clear, no-obligation proposal with a strategy to help you get more plumbing jobs."
      }
    ]
  }
},

};
