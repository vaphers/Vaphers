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
      heading: "Healthcare SEO for New Patient Growth",
      subtext: "Rank for treatments patients search + HIPAA-compliant optimization",
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
    title: "SEO for Plumbing Business | Get More Service Calls & Jobs",
    description: "Boost your plumbing business visibility on Google. Our expert plumber SEO services help you attract more local customers, increase job bookings, and drive service calls."
  },
  hero: {
    heading: "Plumber SEO for 24/7 Emergency Calls",
    subtext: "Dominate 'emergency plumber near me' searches and fill your schedule",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Plumbing SEO experts",
  },

  // Pitch for Plumbers 
  sectionGrow: {
    heading: "Grow Your Plumbing Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Plumber SEO</span>",
    subheading: "Reach More Customers Where They're Actively Searching",
    
    description: `
      If your plumbing business isn't showing up on Google when customers search for services, repairs, or nearby plumbers, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">plumber SEO services</a>  
      help businesses boost visibility, build trust, and attract customers who are ready to book jobs right now.

      We also strengthen your presence for location-based searches with strategic  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" searches, the exact places your customers look first.
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

  // why plumbers need seo 
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Plumbers Need SEO</span> In Today's Service Market?",
      
      subheading: "SEO for Plumbers That Want Consistent, High-Intent Job Enquiries",
      
      description: `
        Customers no longer choose a plumber based only on location, they research, compare, and evaluate online first. 
        That's why SEO for plumbers is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable job enquiries to competitors who do. Strong plumber SEO helps your business rank for services, 
        repairs, and locations your ideal customers are already searching for, while improving local visibility and 
        building trust through service-accurate, location-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
        We help plumbers strengthen online authority, attract ready-to-book customers, and turn search visibility 
        into consistent jobs and service calls.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section 
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Service Experts?",
      subheading: "Google Maps Compliant Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of plumbing SEO and the 
        local search standards businesses must follow. Our team builds strategies that protect service data, strengthen online 
        credibility, and help plumbing businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
        service professionals attract more job enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Business Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section - Using Link components exactly like healthcare
  servicesSection: {
      heading: "Plumber SEO Services for Local Businesses",
      subheading: "Everything you need to increase visibility, trust & job enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Technical SEO for Plumbing Websites',
          description: (
            <>
              We ensure your plumbing website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your pages accurately, so customers find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Plumbers',
          description: (
            <>
              When customers search "plumber near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and service calls.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location business support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Plumber SEO Audit',
          description: (
            <>
              A full, in-depth audit built specifically for service websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 hover:underline px-1">
                SEO audit services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'AI-Powered Plumber SEO',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              help plumbers stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Plumber SEO</span>",
      description: "Clear answers to help plumbers understand how SEO drives job enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Plumber SEO?",
          answer: "Plumber SEO helps businesses and service professionals rank higher on Google for services, repairs, and locations customers are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for plumbers different from regular SEO?",
          answer: "SEO for plumbers requires strict local accuracy, service-focused optimization, Google Maps priority, and customer-focused content. It also prioritizes local search so nearby customers can find you quickly."
        },
        {
          question: "How long does it take for a plumber to see results?",
          answer: "Most plumbers start seeing noticeable improvements in 2–3 months, with stronger job enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Plumber SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure service-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my plumbing business get more job enquiries?",
          answer: "Yes. By ranking your business for targeted service keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent job enquiries."
        },
        {
          question: "Do you offer SEO audits for plumbing websites?",
          answer: "Yes. Our in-depth plumber SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking job growth."
        },
        {
          question: "Is content creation included in your plumber SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for service pages, location guides, blogs, and FAQs, all designed to help customers choose your business with confidence."
        }
      ]
  }
},

// Interior Designers Data
interiordesigners: {
  key: "interiorDesigners",
  slug: "interior-designers",
  industry: "Interior Designers",
  meta: {
    title: "SEO for Interior Designers | Get More Client Projects & Leads",
    description: "Boost your interior design business visibility on Google. Our expert interior designer SEO services help you attract more local clients, increase project bookings, and drive consultations."
  },
  hero: {
    heading: "Interior Design SEO for Premium Projects",
    subtext: "Attract high-end clients searching for your design style",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Design SEO experts",
  },

  // Pitch for Interior Designers 
  sectionGrow: {
    heading: "Grow Your Design Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Interior Designer SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your design business isn't showing up on Google when clients search for designers, renovations, or nearby studios, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">interior designer SEO services</a>  
      help studios boost visibility, build trust, and attract clients who are ready to book consultations right now.

      We also strengthen your presence for location-based searches with strategic  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your studio ranks higher in Google Maps, local packs, and "near me" searches, the exact places your clients look first.
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

  // why interior designers need seo 
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Designers Need SEO</span> In Today's Design Market?",
      
      subheading: "SEO for Designers That Want Consistent, High-Intent Client Enquiries",
      
      description: `
        Clients no longer choose a designer based only on location, they research, compare, and evaluate online first. 
        That's why SEO for interior designers is now essential. If your studio doesn't appear on the first page of Google, you lose 
        valuable client enquiries to competitors who do. Strong designer SEO helps your studio rank for projects, 
        styles, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through portfolio-focused, design-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
        We help designers strengthen online authority, attract ready-to-book clients, and turn search visibility 
        into consistent projects and consultations.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section 
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Design Professionals?",
      subheading: "Portfolio & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of design SEO and the 
        visual search standards studios must follow. Our team builds strategies that showcase portfolios, strengthen online 
        credibility, and help design businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your studio's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
        design professionals attract more client enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Studio Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section - Using Link components exactly like healthcare
  servicesSection: {
      heading: "Interior Designer SEO Services for Design Studios",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Technical SEO for Design Websites',
          description: (
            <>
              We ensure your design website meets strict portfolio and visual-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your pages accurately, so clients find you faster.
            </>
          ),
          points: [
            'Visual-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Design schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Designers',
          description: (
            <>
              When clients search "interior designer near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and consultation calls.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location studio support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Designer SEO Audit',
          description: (
            <>
              A full, in-depth audit built specifically for design websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 hover:underline px-1">
                SEO audit services
              </Link> 
              uncover issues blocking your visibility, from portfolio gaps to outdated design content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Portfolio & design content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'AI-Powered Designer SEO',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              help designers stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced design content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Interior Designer SEO</span>",
      description: "Clear answers to help designers understand how SEO drives client enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Interior Designer SEO?",
          answer: "Interior designer SEO helps studios and design professionals rank higher on Google for projects, styles, and locations clients are actively searching for. It focuses on visibility, trust, and client acquisition."
        },
        {
          question: "How is SEO for designers different from regular SEO?",
          answer: "SEO for designers requires strict visual accuracy, portfolio-focused optimization, Google Maps priority, and client-focused content. It also prioritizes local search so nearby clients can find you quickly."
        },
        {
          question: "How long does it take for a designer to see results?",
          answer: "Most designers start seeing noticeable improvements in 2–3 months, with stronger client enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local client acquisition."
        },
        {
          question: "Is Designer SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict visual search guidelines, ensure portfolio-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my design studio get more client enquiries?",
          answer: "Yes. By ranking your studio for targeted design keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent client enquiries."
        },
        {
          question: "Do you offer SEO audits for design websites?",
          answer: "Yes. Our in-depth designer SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking client growth."
        },
        {
          question: "Is content creation included in your designer SEO services?",
          answer: "Yes. We create design-accurate, search-optimized content for project pages, style guides, blogs, and FAQs, all designed to help clients choose your studio with confidence."
        }
      ]
  }
},

// Handyman Industry Data
handyman: {
  key: "handyman",
  slug: "handyman",
  industry: "Handyman",
  meta: {
    title: "SEO for Handyman Services | Get More Repair Jobs & Calls",
    description: "Boost your handyman business visibility on Google. Our expert handyman SEO services help you attract more local customers, increase job bookings, and drive service calls."
  },
  hero: {
    heading: "Handyman SEO for Local Repair Jobs",
    subtext: "Capture 'handyman near me' searches before competitors",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Handyman SEO experts",
  },

  // Pitch for Handyman 
  sectionGrow: {
    heading: "Grow Your Handyman Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Handyman SEO</span>",
    subheading: "Reach More Customers Where They're Actively Searching",
    
    description: `
      If your handyman business isn't showing up on Google when customers search for repairs, fixes, or nearby services, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">handyman SEO services</a>  
      help businesses boost visibility, build trust, and attract customers who are ready to book jobs right now.

      We also strengthen your presence for location-based searches with strategic  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" searches, the exact places your customers look first.
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

  // why handyman need seo 
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Handymen Need SEO</span> In Today's Service Market?",
      
      subheading: "SEO for Handymen That Want Consistent, High-Intent Job Enquiries",
      
      description: `
        Customers no longer choose a handyman based only on location, they research, compare, and evaluate online first. 
        That's why SEO for handymen is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable job enquiries to competitors who do. Strong handyman SEO helps your business rank for repairs, 
        fixes, and locations your ideal customers are already searching for, while improving local visibility and 
        building trust through service-accurate, location-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
        We help handymen strengthen online authority, attract ready-to-book customers, and turn search visibility 
        into consistent jobs and service calls.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section 
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Service Professionals?",
      subheading: "Google Maps & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of handyman SEO and the 
        local search standards businesses must follow. Our team builds strategies that protect service data, strengthen online 
        credibility, and help handyman businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
        service professionals attract more job enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Business Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section - Using Link components exactly like healthcare
  servicesSection: {
      heading: "Handyman SEO Services for Local Repairs",
      subheading: "Everything you need to increase visibility, trust & job enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Technical SEO for Handyman Websites',
          description: (
            <>
              We ensure your handyman website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your pages accurately, so customers find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Handymen',
          description: (
            <>
              When customers search "handyman near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and service calls.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location business support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Handyman SEO Audit',
          description: (
            <>
              A full, in-depth audit built specifically for service websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 hover:underline px-1">
                SEO audit services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'AI-Powered Handyman SEO',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              help handymen stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Handyman SEO</span>",
      description: "Clear answers to help handymen understand how SEO drives job enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Handyman SEO?",
          answer: "Handyman SEO helps businesses and service professionals rank higher on Google for repairs, fixes, and locations customers are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for handymen different from regular SEO?",
          answer: "SEO for handymen requires strict local accuracy, service-focused optimization, Google Maps priority, and customer-focused content. It also prioritizes local search so nearby customers can find you quickly."
        },
        {
          question: "How long does it take for a handyman to see results?",
          answer: "Most handymen start seeing noticeable improvements in 2–3 months, with stronger job enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Handyman SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure service-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my handyman business get more job enquiries?",
          answer: "Yes. By ranking your business for targeted service keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent job enquiries."
        },
        {
          question: "Do you offer SEO audits for handyman websites?",
          answer: "Yes. Our in-depth handyman SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking job growth."
        },
        {
          question: "Is content creation included in your handyman SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for service pages, location guides, blogs, and FAQs, all designed to help customers choose your business with confidence."
        }
      ]
  }
},

// Locksmith Industry Data
locksmiths: {
  key: "locksmiths",
  slug: "locksmiths",
  industry: "Locksmiths",
  meta: {
    title: "SEO for Locksmith Services | Get More Emergency Calls & Jobs",
    description: "Boost your locksmith business visibility on Google. Our expert locksmith SEO services help you attract more local customers, increase emergency bookings, and drive service calls."
  },
  hero: {
    heading: "Locksmith SEO Services for Emergency Repairs",
    subtext: "Drive qualified job enquiries with proven, search-focused locksmith marketing",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Locksmith SEO experts",
  },

  // Pitch for Locksmiths 
  sectionGrow: {
    heading: "Grow Your Locksmith Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Locksmith SEO</span>",
    subheading: "Reach More Customers Where They're Actively Searching",
    
    description: `
      If your locksmith business isn't showing up on Google when customers search for lockouts, repairs, or nearby services, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">locksmith SEO services</a>  
      help businesses boost visibility, build trust, and attract customers who are ready to book jobs right now.

      We also strengthen your presence for location-based searches with strategic  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" searches, the exact places your customers look first.
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

  // why locksmiths need seo 
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Locksmiths Need SEO</span> In Today's Service Market?",
      
      subheading: "SEO for Locksmiths That Want Consistent, High-Intent Job Enquiries",
      
      description: `
        Customers no longer choose a locksmith based only on location, they research, compare, and evaluate online first. 
        That's why SEO for locksmiths is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable job enquiries to competitors who do. Strong locksmith SEO helps your business rank for lockouts, 
        repairs, and locations your ideal customers are already searching for, while improving local visibility and 
        building trust through service-accurate, location-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
        We help locksmiths strengthen online authority, attract ready-to-book customers, and turn search visibility 
        into consistent jobs and service calls.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section 
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Service Professionals?",
      subheading: "Emergency & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of locksmith SEO and the 
        local search standards businesses must follow. Our team builds strategies that protect service data, strengthen online 
        credibility, and help locksmith businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
        service professionals attract more job enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Business Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section - Using YOUR actual site Link components
  servicesSection: {
      heading: "Locksmith SEO Services for Emergency Repairs",
      subheading: "Everything you need to increase visibility, trust & job enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Technical SEO for Locksmith Websites',
          description: (
            <>
              We ensure your locksmith website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your pages accurately, so customers find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Locksmiths',
          description: (
            <>
              When customers search "locksmith near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and service calls.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location business support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Locksmith SEO Audit',
          description: (
            <>
              A full, in-depth audit built specifically for service websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'PPC for Emergency Locksmith Leads',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing" className="text-blue-600 hover:underline px-1">
                PPC marketing
              </Link> 
              help locksmiths stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Locksmith SEO</span>",
      description: "Clear answers to help locksmiths understand how SEO drives job enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Locksmith SEO?",
          answer: "Locksmith SEO helps businesses and service professionals rank higher on Google for lockouts, repairs, and locations customers are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for locksmiths different from regular SEO?",
          answer: "SEO for locksmiths requires strict local accuracy, service-focused optimization, Google Maps priority, and customer-focused content. It also prioritizes local search so nearby customers can find you quickly."
        },
        {
          question: "How long does it take for a locksmith to see results?",
          answer: "Most locksmiths start seeing noticeable improvements in 2–3 months, with stronger job enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Locksmith SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure service-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my locksmith business get more job enquiries?",
          answer: "Yes. By ranking your business for targeted service keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent job enquiries."
        },
        {
          question: "Do you offer SEO audits for locksmith websites?",
          answer: "Yes. Our in-depth locksmith SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking job growth."
        },
        {
          question: "Is content creation included in your locksmith SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for service pages, location guides, blogs, and FAQs, all designed to help customers choose your business with confidence."
        }
      ]
  }
},

// Restaurant Industry Data
restaurants: {
  key: "restaurants",
  slug: "restaurants",
  industry: "Restaurants",
  meta: {
    title: "SEO for Restaurants | Get More Diners & Online Orders",
    description: "Boost your restaurant visibility on Google. Our expert restaurant SEO services help you attract more local customers, increase table reservations, and drive online orders."
  },
  hero: {
    heading: "Restaurant SEO Services for Local Dining",
    subtext: "Drive qualified customer enquiries with proven, search-focused restaurant marketing",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Restaurant SEO experts",
  },

  // Pitch for Restaurants 
  sectionGrow: {
    heading: "Grow Your Restaurant With <span class='bg-blue-600 bg-clip-text text-transparent'>Restaurant SEO</span>",
    subheading: "Reach More Diners Where They're Actively Searching",
    
    description: `
      If your restaurant isn't showing up on Google when customers search for dining, menus, or nearby eateries, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">restaurant SEO services</a>  
      help businesses boost visibility, build trust, and attract customers who are ready to book tables right now.

      We also strengthen your presence for location-based searches with strategic  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your restaurant ranks higher in Google Maps, local packs, and "near me" searches, the exact places your customers look first.
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

  // why restaurants need seo 
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Restaurants Need SEO</span> In Today's Dining Market?",
      
      subheading: "SEO for Restaurants That Want Consistent, High-Intent Customer Enquiries",
      
      description: `
        Customers no longer choose a restaurant based only on location, they research, compare, and evaluate online first. 
        That's why SEO for restaurants is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable customer enquiries to competitors who do. Strong restaurant SEO helps your business rank for menus, 
        cuisines, and locations your ideal customers are already searching for, while improving local visibility and 
        building trust through menu-focused, location-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
        We help restaurants strengthen online authority, attract ready-to-book customers, and turn search visibility 
        into consistent reservations and walk-ins.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section 
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Restaurant Owners?",
      subheading: "Google Maps & Menu Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of restaurant SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase menus, strengthen online 
        credibility, and help restaurant businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your restaurant's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
        restaurant professionals attract more customer enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Restaurant Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section - Using YOUR actual site Link components
  servicesSection: {
      heading: "Restaurant SEO Services for Local Dining",
      subheading: "Everything you need to increase visibility, trust & customer enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Technical SEO for Restaurant Websites',
          description: (
            <>
              We ensure your restaurant website meets strict menu and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your pages accurately, so customers find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Menu schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Restaurants',
          description: (
            <>
              When customers search "restaurant near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and reservations.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location restaurant support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Restaurant SEO Audit',
          description: (
            <>
              A full, in-depth audit built specifically for restaurant websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated menu content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & menu content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'PPC for Restaurant Reservations',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing" className="text-blue-600 hover:underline px-1">
                PPC marketing
              </Link> 
              help restaurants stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced menu content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Restaurant SEO</span>",
      description: "Clear answers to help restaurants understand how SEO drives customer enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Restaurant SEO?",
          answer: "Restaurant SEO helps businesses and dining professionals rank higher on Google for menus, cuisines, and locations customers are actively searching for. It focuses on visibility, trust, and customer acquisition."
        },
        {
          question: "How is SEO for restaurants different from regular SEO?",
          answer: "SEO for restaurants requires strict local accuracy, menu-focused optimization, Google Maps priority, and customer-focused content. It also prioritizes local search so nearby diners can find you quickly."
        },
        {
          question: "How long does it take for a restaurant to see results?",
          answer: "Most restaurants start seeing noticeable improvements in 2–3 months, with stronger customer enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local customer acquisition."
        },
        {
          question: "Is Restaurant SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure menu-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my restaurant get more customer enquiries?",
          answer: "Yes. By ranking your restaurant for targeted dining keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent customer enquiries."
        },
        {
          question: "Do you offer SEO audits for restaurant websites?",
          answer: "Yes. Our in-depth restaurant SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking customer growth."
        },
        {
          question: "Is content creation included in your restaurant SEO services?",
          answer: "Yes. We create menu-accurate, search-optimized content for menu pages, location guides, blogs, and FAQs, all designed to help customers choose your restaurant with confidence."
        }
      ]
  }
},

// Real Estate Industry Data
realEstate: {
  key: "realEstate",
  slug: "real-estate",
  industry: "Real Estate",
  meta: {
    title: "SEO for Real Estate | Get More Listings & Buyer Leads",
    description: "Boost your real estate visibility on Google. Our expert real estate SEO services help you attract more local clients, increase listing views, and drive buyer inquiries."
  },
  hero: {
    heading: "Real Estate SEO for Listing Leads",
    subtext: "Generate buyer/seller inquiries from neighborhood searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Real Estate SEO experts",
  },

  // Pitch for Real Estate 
  sectionGrow: {
    heading: "Grow Your Real Estate Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Real Estate SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your real estate business isn't showing up on Google when clients search for listings, agents, or nearby properties, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">real estate SEO services</a>  
      help businesses boost visibility, build trust, and attract clients who are ready to book viewings right now.

      We also strengthen your presence for location-based searches with strategic  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO optimization</a>, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" searches, the exact places your clients look first.
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

  // why real estate need seo 
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Agents Need SEO</span> In Today's Property Market?",
      
      subheading: "SEO for Real Estate That Wants Consistent, High-Intent Client Enquiries",
      
      description: `
        Clients no longer choose an agent based only on location, they research, compare, and evaluate online first. 
        That's why SEO for real estate is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable client enquiries to competitors who do. Strong real estate SEO helps your business rank for listings, 
        neighborhoods, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through property-focused, location-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-600 underline">SEO services</a>. 
        We help agents strengthen online authority, attract ready-to-buy clients, and turn search visibility 
        into consistent listings and closings.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section 
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Real Estate Professionals?",
      subheading: "MLS & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of real estate SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase listings, strengthen online 
        credibility, and help real estate businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services" class="text-blue-300 underline">SEO services</a> to see how we help 
        real estate professionals attract more client enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Listings Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section - Using YOUR actual site Link components
  servicesSection: {
      heading: "Real Estate SEO Services for Agents & Brokers",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Technical SEO for Real Estate Websites',
          description: (
            <>
              We ensure your real estate website meets strict listing and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your pages accurately, so clients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Property schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Real Estate',
          description: (
            <>
              When clients search "real estate agent near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and listing calls.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location agency support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Real Estate SEO Audit',
          description: (
            <>
              A full, in-depth audit built specifically for real estate websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated listing content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & listing content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'PPC for Real Estate Leads',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              help agents stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced listing content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Real Estate SEO</span>",
      description: "Clear answers to help agents understand how SEO drives client enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Real Estate SEO?",
          answer: "Real estate SEO helps businesses and agents rank higher on Google for listings, neighborhoods, and locations clients are actively searching for. It focuses on visibility, trust, and client acquisition."
        },
        {
          question: "How is SEO for real estate different from regular SEO?",
          answer: "SEO for real estate requires strict local accuracy, listing-focused optimization, Google Maps priority, and client-focused content. It also prioritizes local search so nearby clients can find you quickly."
        },
        {
          question: "How long does it take for an agent to see results?",
          answer: "Most agents start seeing noticeable improvements in 2–3 months, with stronger client enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local client acquisition."
        },
        {
          question: "Is Real Estate SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure listing-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my real estate business get more client enquiries?",
          answer: "Yes. By ranking your business for targeted property keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent client enquiries."
        },
        {
          question: "Do you offer SEO audits for real estate websites?",
          answer: "Yes. Our in-depth real estate SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking client growth."
        },
        {
          question: "Is content creation included in your real estate SEO services?",
          answer: "Yes. We create listing-accurate, search-optimized content for property pages, neighborhood guides, blogs, and FAQs, all designed to help clients choose your agency with confidence."
        }
      ]
  }
},

// Doctors Industry Data
doctors: {
  key: "doctors",
  slug: "doctors",
  industry: "Doctors",
  meta: {
    title: "SEO for Doctors | Get More Patients & Appointments",
    description: "Boost your medical practice visibility on Google. Our expert doctor SEO services help you attract more local patients, increase appointment bookings, and drive consultations."
  },
  hero: {
    heading: "Doctor SEO Services for Medical Practices",
    subtext: "Drive qualified patient enquiries with proven, search-focused healthcare marketing",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Doctor SEO experts",
  },

  // Pitch for Doctors (PPC first, then Local SEO)
  sectionGrow: {
    heading: "Grow Your Practice With <span class='bg-blue-600 bg-clip-text text-transparent'>Doctor SEO</span>",
    subheading: "Reach More Patients Where They're Actively Searching",
    
    description: `
      If your medical practice isn't showing up on Google when patients search for treatments, specialists, or nearby doctors, 
      you're losing enquiries to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing" class="text-blue-600 underline">PPC marketing</a>  
      combined with <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a> 
      help practices boost visibility, build trust, and attract patients who are ready to book appointments right now.
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

  // why doctors need seo (AI first, then general SEO)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Doctors Need SEO</span> In Today's Healthcare Market?",
      
      subheading: "SEO for Practices That Want Consistent, High-Intent Patient Enquiries",
      
      description: `
        Patients no longer choose a doctor based only on location, they research, compare, and evaluate online first. 
        That's why SEO for doctors is now essential. If your practice doesn't appear on the first page of Google, you lose 
        valuable patient enquiries to competitors who do. Strong doctor SEO helps your practice rank for treatments, 
        conditions, and services your ideal patients are already searching for, while improving local visibility and 
        building trust through medically accurate, E-E-A-T-aligned content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a>. 
        We help doctors strengthen online authority, attract ready-to-book patients, and turn search visibility 
        into consistent appointments and walk-ins.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Website dev first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Medical Experts?",
      subheading: "HIPAA Compliant Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of medical SEO and the 
        compliance standards practices must follow. Our team builds strategies that protect patient data, strengthen online 
        credibility, and help healthcare businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your practice's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/website-development-services" class="text-blue-300 underline">website development services</a> to see how we help 
        medical professionals attract more patient enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Practice Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Website dev, AI SEO, Local SEO, PPC)
  servicesSection: {
      heading: "Doctor SEO Services for Medical Practices",
      subheading: "Everything you need to increase visibility, trust & patient enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Medical Website Development',
          description: (
            <>
              We ensure your medical website meets strict healthcare and data-security standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/website-development-services" className="text-blue-600 hover:underline px-1">
                website development services
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
          title: 'AI SEO for Doctors',
          description: (
            <>
              When patients search "doctor near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and appointment calls.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location practice support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Local SEO for Medical Practices',
          description: (
            <>
              A full, in-depth audit built specifically for medical websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
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
          title: 'Medical PPC Advertising',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help doctors stay ahead of competitors and rank faster with intelligent search-driven strategies.
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Doctor SEO</span>",
      description: "Clear answers to help doctors understand how SEO drives patient enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Doctor SEO?",
          answer: "Doctor SEO helps clinics and medical professionals rank higher on Google for treatments, conditions, and services patients are actively searching for. It focuses on visibility, trust, and patient acquisition."
        },
        {
          question: "How is SEO for doctors different from regular SEO?",
          answer: "SEO for doctors requires strict medical accuracy, E-E-A-T compliance, HIPAA-safe optimization, and patient-focused content. It also prioritizes local search so nearby patients can find you quickly."
        },
        {
          question: "How long does it take for a doctor to see results?",
          answer: "Most doctors start seeing noticeable improvements in 2–3 months, with stronger patient enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local patient acquisition."
        },
        {
          question: "Is Doctor SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict E-E-A-T guidelines, ensure HIPAA-safe website practices, and create medically accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my medical practice get more patient enquiries?",
          answer: "Yes. By ranking your practice for targeted healthcare keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent patient enquiries."
        },
        {
          question: "Do you offer SEO audits for medical websites?",
          answer: "Yes. Our in-depth doctor SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking patient growth."
        },
        {
          question: "Is content creation included in your doctor SEO services?",
          answer: "Yes. We create medically accurate, search-optimized content for service pages, treatment guides, blogs, and FAQs, all designed to help patients choose your practice with confidence."
        }
      ]
  }
},

// Fashion Industry Data
fashion: {
  key: "fashion",
  slug: "fashion",
  industry: "Fashion",
  meta: {
    title: "SEO for Fashion Brands | Get More Sales & Traffic",
    description: "Boost your fashion brand visibility on Google. Our expert fashion SEO services help you attract more shoppers, increase online sales, and drive store traffic."
  },
  hero: {
    heading: "Rank Higher for Trending Styles & Collections",
    subtext: "Convert fashion searches into sales with visual SEO + ecommerce optimization",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Fashion SEO experts",
  },

  // FIXED: Proper length sectionGrow (Ecommerce first, then AI SEO)
  sectionGrow: {
    heading: "Grow Your Fashion Brand With <span class='bg-blue-600 bg-clip-text text-transparent'>Fashion SEO</span>",
    subheading: "Reach More Shoppers Where They're Actively Searching",
    
    description: `
      If your fashion brand isn't showing up on Google when shoppers search for styles, trends, or nearby boutiques, 
      you're losing sales to competitors every single day. Our  
      <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-600 underline">ecommerce development</a>  
      combined with <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a> 
      help brands boost visibility, build trust, and attract shoppers who are ready to buy right now.

      We also strengthen your presence for location-based searches with strategic product optimization, 
      ensuring your collections rank higher in Google Shopping, visual search, and "near me" queries.
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

  // why fashion needs seo (Shopify first, then general SEO)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Fashion Brands Need SEO</span> In Today's Retail Market?",
      
      subheading: "SEO for Brands That Want Consistent, High-Intent Shopper Enquiries",
      
      description: `
        Shoppers no longer choose fashion brands based only on location, they research, compare, and evaluate online first. 
        That's why SEO for fashion is now essential. If your brand doesn't appear on the first page of Google, you lose 
        valuable sales enquiries to competitors who do. Strong fashion SEO helps your brand rank for styles, 
        trends, and collections your ideal shoppers are already searching for, while improving local visibility and 
        building trust through product-focused, trend-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/website-development-services/shopify-website-development" class="text-blue-600 underline">Shopify development</a>. 
        We help fashion brands strengthen online authority, attract ready-to-buy shoppers, and turn search visibility 
        into consistent sales and store visits.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Meta Ads first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Fashion Retailers?",
      subheading: "Social Commerce & Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of fashion SEO and the 
        visual search standards brands must follow. Our team builds strategies that showcase collections, strengthen online 
        credibility, and help fashion businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your brand's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" class="text-blue-300 underline">Meta Ads services</a> to see how we help 
        fashion professionals attract more shopper enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Brand Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Shopify, PPC Meta, Technical SEO, WordPress)
  servicesSection: {
      heading: "Fashion SEO Services for Brands & Boutiques",
      subheading: "Everything you need to increase visibility, trust & shopper enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Shopify Fashion Stores',
          description: (
            <>
              We ensure your fashion store meets strict ecommerce and visual-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development services
              </Link> 
              help search engines index your collections accurately, so shoppers find you faster.
            </>
          ),
          points: [
            'Visual-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Product schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Fashion Meta Ads',
          description: (
            <>
              When shoppers search "fashion near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              optimize your social presence, visual campaigns, and shopping ads to bring in more foot traffic and online sales.
            </>
          ),
          points: [
            'Instagram & Facebook shopping ads',
            'Visual trend targeting',
            'Social commerce optimization',
            'Multi-location store support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Technical SEO for Fashion',
          description: (
            <>
              A full, in-depth audit built specifically for fashion websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              uncover issues blocking your visibility, from product gaps to outdated collection content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Product & collection evaluation',
            'Local SEO & store analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'WordPress Fashion Sites',
          description: (
            <>
              From content optimization to predictive trend insights, our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              help fashion brands stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'Trend-focused content creation',
            'Predictive style keyword modelling',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Fashion SEO</span>",
      description: "Clear answers to help fashion brands understand how SEO drives shopper enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Fashion SEO?",
          answer: "Fashion SEO helps brands and boutiques rank higher on Google for styles, trends, and collections shoppers are actively searching for. It focuses on visibility, trust, and sales acquisition."
        },
        {
          question: "How is SEO for fashion different from regular SEO?",
          answer: "SEO for fashion requires strict visual accuracy, product-focused optimization, social commerce priority, and shopper-focused content. It also prioritizes local search so nearby customers can find you quickly."
        },
        {
          question: "How long does it take for a fashion brand to see results?",
          answer: "Most fashion brands start seeing noticeable improvements in 2–3 months, with stronger shopper enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local shopper acquisition."
        },
        {
          question: "Is Fashion SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict visual search guidelines, ensure product-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my fashion brand get more shopper enquiries?",
          answer: "Yes. By ranking your brand for targeted style keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent shopper enquiries."
        },
        {
          question: "Do you offer SEO audits for fashion websites?",
          answer: "Yes. Our in-depth fashion SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking shopper growth."
        },
        {
          question: "Is content creation included in your fashion SEO services?",
          answer: "Yes. We create style-accurate, search-optimized content for collection pages, trend guides, blogs, and FAQs, all designed to help shoppers choose your brand with confidence."
        }
      ]
  }
},

// Lawyers Industry Data
lawyers: {
  key: "lawyers",
  slug: "lawyers",
  industry: "Lawyers",
  meta: {
    title: "SEO for Lawyers | Get More Clients & Case Leads",
    description: "Boost your law firm visibility on Google. Our expert lawyer SEO services help you attract more local clients, increase case consultations, and drive qualified leads."
  },
  hero: {
    heading: "Lawyer SEO Services for High-Value Cases",
    subtext: "Convert legal searches into consultations with authority-focused SEO strategies",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Lawyer SEO experts",
  },

  // Pitch for Lawyers (Lead Gen first, then Local SEO)
  sectionGrow: {
    heading: "Grow Your Law Firm With <span class='bg-blue-600 bg-clip-text text-transparent'>Lawyer SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your law firm isn't showing up on Google when clients search for attorneys, legal help, or nearby lawyers, 
      you're losing cases to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" class="text-blue-600 underline">lead generation services</a>  
      combined with <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a> 
      help firms boost visibility, build authority, and attract clients ready to sign retainers right now.

      We also strengthen your presence for location-based searches with strategic practice area optimization, 
      ensuring your firm ranks higher in Google Maps, local packs, and "near me" queries where clients look first.
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

  // why lawyers need seo (Technical SEO first, then AI)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Law Firms Need SEO</span> In Today's Legal Market?",
      
      subheading: "SEO for Attorneys That Want Consistent, High-Value Client Enquiries",
      
      description: `
        Clients no longer choose lawyers based only on location, they research, compare, and evaluate online first. 
        That's why SEO for lawyers is now essential. If your firm doesn't appear on the first page of Google, you lose 
        valuable case enquiries to competitors who do. Strong lawyer SEO helps your firm rank for practice areas, 
        case types, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through authority-focused, results-driven content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-600 underline">technical SEO services</a>. 
        We help law firms strengthen online authority, attract ready-to-sign clients, and turn search visibility 
        into consistent retainers and case wins.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (WordPress first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Legal Professionals?",
      subheading: "Authority & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of lawyer SEO and the 
        authority standards firms must follow. Our team builds strategies that showcase case results, strengthen online 
        credibility, and help law firms grow with search-focused precision.

        Whether you're just learning about us or ready to scale your firm's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-300 underline">WordPress development</a> to see how we help 
        legal professionals attract more client enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Firm Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Lead Gen, WordPress, AI SEO, Search Ads)
  servicesSection: {
      heading: "Lawyer SEO Services for High-Value Cases",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Legal Lead Generation',
          description: (
            <>
              We ensure your law firm website meets strict authority and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              help search engines index your practice areas accurately, so clients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Legal schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Law Firm WordPress Sites',
          description: (
            <>
              When clients search "lawyer near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more consultations and retainers.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location firm support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'AI Lawyer SEO',
          description: (
            <>
              A full, in-depth audit built specifically for law firm websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              uncover issues blocking your visibility, from authority gaps to outdated case content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Authority & case study evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Legal Search Ads',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help lawyers stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced case study content',
            'Predictive legal keyword modelling',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Lawyer SEO</span>",
      description: "Clear answers to help law firms understand how SEO drives client enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Lawyer SEO?",
          answer: "Lawyer SEO helps law firms and attorneys rank higher on Google for practice areas, case types, and locations clients are actively searching for. It focuses on authority, trust, and client acquisition."
        },
        {
          question: "How is SEO for lawyers different from regular SEO?",
          answer: "SEO for lawyers requires strict authority signals, practice-area optimization, local search priority, and client-focused content. It also builds E-E-A-T trust so serious clients choose you first."
        },
        {
          question: "How long does it take for a law firm to see results?",
          answer: "Most law firms start seeing noticeable improvements in 2–3 months, with stronger client enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local client acquisition."
        },
        {
          question: "Is Lawyer SEO compliant with ethical guidelines?",
          answer: "Absolutely. We follow strict ABA guidelines, ensure ethical advertising practices, and create authority-focused content reviewed for compliance and trustworthiness."
        },
        {
          question: "Can SEO help my law firm get more client enquiries?",
          answer: "Yes. By ranking your firm for targeted practice area keywords, improving local presence, and building authority signals, SEO generates consistent, high-value client consultations."
        },
        {
          question: "Do you offer SEO audits for law firm websites?",
          answer: "Yes. Our in-depth lawyer SEO audits uncover technical issues, authority gaps, local ranking opportunities, and visibility problems blocking client acquisition."
        },
        {
          question: "Is content creation included in lawyer SEO services?",
          answer: "Yes. We create authority-driven, search-optimized content for practice pages, case studies, location guides, and FAQs to help clients confidently choose your firm."
        }
      ]
  }
},

// Accountants Industry Data
accountants: {
  key: "accountants",
  slug: "accountants",
  industry: "Accountants",
  meta: {
    title: "SEO for Accountants | Get More Clients & Tax Leads",
    description: "Boost your accounting firm visibility on Google. Our expert accountant SEO services help you attract more local clients, increase tax season bookings, and drive consultations."
  },
  hero: {
    heading: "Accountant SEO Services for Tax & Financial Clients",
    subtext: "Convert business searches into retainers with authority-driven SEO strategies",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Accountant SEO experts",
  },

  // Pitch for Accountants (WordPress first, then Lead Gen)
  sectionGrow: {
    heading: "Grow Your Accounting Firm With <span class='bg-blue-600 bg-clip-text text-transparent'>Accountant SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your accounting firm isn't showing up on Google when businesses search for accountants, tax help, or nearby CPAs, 
      you're losing clients to competitors every single day. Our  
      <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-600 underline">WordPress development</a>  
      combined with <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" class="text-blue-600 underline">lead generation services</a> 
      help firms boost visibility, build authority, and attract clients ready to sign retainers right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your firm ranks higher in Google Maps, local packs, and "near me" queries where businesses look first.
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

  // why accountants need seo (AI SEO first, then Technical)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Accountants Need SEO</span> In Today's Business Market?",
      
      subheading: "SEO for Firms That Want Consistent, High-Value Client Enquiries",
      
      description: `
        Businesses no longer choose accountants based only on location, they research, compare, and evaluate online first. 
        That's why SEO for accountants is now essential. If your firm doesn't appear on the first page of Google, you lose 
        valuable client enquiries to competitors who do. Strong accountant SEO helps your firm rank for tax services, 
        bookkeeping, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through expertise-focused, results-driven content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a>. 
        We help accounting firms strengthen online authority, attract ready-to-sign clients, and turn search visibility 
        into consistent retainers and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Ecommerce dev first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Accounting Professionals?",
      subheading: "Expertise & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of accountant SEO and the 
        authority standards firms must follow. Our team builds strategies that showcase credentials, strengthen online 
        credibility, and help accounting businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your firm's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-300 underline">ecommerce development</a> to see how we help 
        financial professionals attract more client enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Firm Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Search Ads, Local SEO, WordPress, Technical SEO)
  servicesSection: {
      heading: "Accountant SEO Services for Tax & Financial Clients",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Tax Season Search Ads',
          description: (
            <>
              We ensure your accounting website meets strict authority and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help search engines index your services accurately, so clients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local SEO for Accountants',
          description: (
            <>
              When businesses search "accountant near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more consultations and retainers.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location firm support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Accounting Firm Websites',
          description: (
            <>
              A full, in-depth audit built specifically for accounting websites.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              uncover issues blocking your visibility, from authority gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Authority & service evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Technical SEO for Accountants',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help accountants stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Accountant SEO</span>",
      description: "Clear answers to help accounting firms understand how SEO drives client enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Accountant SEO?",
          answer: "Accountant SEO helps firms and CPAs rank higher on Google for tax services, bookkeeping, and locations clients are actively searching for. It focuses on authority, trust, and client acquisition."
        },
        {
          question: "How is SEO for accountants different from regular SEO?",
          answer: "SEO for accountants requires strict authority signals, service-focused optimization, local search priority, and business-focused content. It builds expertise trust for serious financial clients."
        },
        {
          question: "How long does it take for an accounting firm to see results?",
          answer: "Most accounting firms start seeing noticeable improvements in 2–3 months, with stronger client enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local client acquisition."
        },
        {
          question: "Is Accountant SEO compliant with professional guidelines?",
          answer: "Absolutely. We follow strict professional standards, ensure ethical advertising practices, and create authority-focused content reviewed for compliance and trustworthiness."
        },
        {
          question: "Can SEO help my accounting firm get more client enquiries?",
          answer: "Yes. By ranking your firm for targeted financial keywords, improving local presence, and building trust signals, SEO generates consistent, high-value client consultations."
        },
        {
          question: "Do you offer SEO audits for accounting websites?",
          answer: "Yes. Our in-depth accountant SEO audits uncover technical issues, authority gaps, local ranking opportunities, and visibility problems blocking client acquisition."
        },
        {
          question: "Is content creation included in accountant SEO services?",
          answer: "Yes. We create expertise-driven, search-optimized content for service pages, tax guides, location pages, and FAQs to help clients confidently choose your firm."
        }
      ]
  }
},

// Salons Industry Data
salons: {
  key: "salons",
  slug: "salons",
  industry: "Salons",
  meta: {
    title: "SEO for Salons | Get More Appointments & Clients",
    description: "Boost your salon visibility on Google. Our expert salon SEO services help you attract more local clients, increase bookings, and drive walk-in traffic."
  },
  hero: {
    heading: "Salon SEO for Full Appointment Books",
    subtext: "Capture 'salon near me' + service searches that convert to bookings",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Salon SEO experts",
  },

  // Pitch for Salons (Meta Ads first, then Shopify)
  sectionGrow: {
    heading: "Grow Your Salon With <span class='bg-blue-600 bg-clip-text text-transparent'>Salon SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your salon isn't showing up on Google when clients search for haircuts, styling, or nearby beauty services, 
      you're losing appointments to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" class="text-blue-600 underline">Meta Ads services</a>  
      combined with <a href="https://www.vaphers.com/website-development-services/shopify-website-development" class="text-blue-600 underline">Shopify development</a> 
      help salons boost visibility, build trust, and attract clients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your salon ranks higher in Google Maps, local packs, and "near me" queries where clients look first.
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

  // why salons need seo (WordPress first, then Local SEO)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Salons Need SEO</span> In Today's Beauty Market?",
      
      subheading: "SEO for Salons That Want Consistent, High-Intent Client Enquiries",
      
      description: `
        Clients no longer choose salons based only on location, they research, compare, and evaluate online first. 
        That's why SEO for salons is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable appointment enquiries to competitors who do. Strong salon SEO helps your business rank for services, 
        styles, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through service-focused, beauty-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-600 underline">WordPress development</a>. 
        We help salons strengthen online authority, attract ready-to-book clients, and turn search visibility 
        into consistent appointments and walk-ins.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (AI SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Beauty Professionals?",
      subheading: "Visual Search & Local Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of salon SEO and the 
        visual search standards businesses must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help salon businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your salon's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-300 underline">AI SEO services</a> to see how we help 
        beauty professionals attract more client enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Salon Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Ecommerce, Technical SEO, Search Ads, Local SEO)
  servicesSection: {
      heading: "Salon SEO Services for Beauty Appointments",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Salon Ecommerce Stores',
          description: (
            <>
              We ensure your salon website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development services
              </Link> 
              help search engines index your services accurately, so clients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Technical SEO for Salons',
          description: (
            <>
              When clients search "salon near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more walk-ins and bookings.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location salon support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Salon Search Advertising',
          description: (
            <>
              A full, in-depth audit built specifically for salon websites.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Local Salon SEO',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              help salons stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Salon SEO</span>",
      description: "Clear answers to help salons understand how SEO drives client enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Salon SEO?",
          answer: "Salon SEO helps businesses and beauty professionals rank higher on Google for services, styles, and locations clients are actively searching for. It focuses on visibility, trust, and client acquisition."
        },
        {
          question: "How is SEO for salons different from regular SEO?",
          answer: "SEO for salons requires strict local accuracy, service-focused optimization, Google Maps priority, and client-focused content. It also prioritizes local search so nearby clients can find you quickly."
        },
        {
          question: "How long does it take for a salon to see results?",
          answer: "Most salons start seeing noticeable improvements in 2–3 months, with stronger client enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local client acquisition."
        },
        {
          question: "Is Salon SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure service-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my salon get more client enquiries?",
          answer: "Yes. By ranking your salon for targeted service keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent client enquiries."
        },
        {
          question: "Do you offer SEO audits for salon websites?",
          answer: "Yes. Our in-depth salon SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking client growth."
        },
        {
          question: "Is content creation included in your salon SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for service pages, style guides, blogs, and FAQs, all designed to help clients choose your salon with confidence."
        }
      ]
  }
},

// Roofers Industry Data
roofers: {
  key: "roofers",
  slug: "roofers",
  industry: "Roofers",
  meta: {
    title: "SEO for Roofers | Get More Storm Leads & Jobs",
    description: "Boost your roofing company visibility on Google. Our expert roofer SEO services help you attract more local clients, increase storm damage calls, and drive quote requests."
  },
  hero: {
    heading: "Roofer SEO for Storm Damage Leads",
    subtext: "Capture 'roof repair near me' + emergency roofing searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Roofer SEO experts",
  },

  // Pitch for Roofers (Search Ads first, then Ecommerce)
  sectionGrow: {
    heading: "Grow Your Roofing Company With <span class='bg-blue-600 bg-clip-text text-transparent'>Roofer SEO</span>",
    subheading: "Reach More Homeowners Where They're Actively Searching",
    
    description: `
      If your roofing company isn't showing up on Google when homeowners search for repairs, leaks, or storm damage services, 
      you're losing jobs to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-600 underline">search engine marketing</a>  
      combined with <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-600 underline">ecommerce development</a> 
      help roofers boost visibility, build trust, and attract homeowners ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your company ranks higher in Google Maps, local packs, and "near me" queries where homeowners look first.
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

  // why roofers need seo (Local SEO first, then AI)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Roofers Need SEO</span> In Today's Home Repair Market?",
      
      subheading: "SEO for Roofers That Want Consistent, High-Intent Job Enquiries",
      
      description: `
        Homeowners no longer choose roofers based only on location, they research, compare, and evaluate online first. 
        That's why SEO for roofers is now essential. If your company doesn't appear on the first page of Google, you lose 
        valuable job enquiries to competitors who do. Strong roofer SEO helps your business rank for repairs, 
        replacements, and locations your ideal homeowners are already searching for, while improving local visibility and 
        building trust through service-focused, storm-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a>. 
        We help roofers strengthen online authority, attract ready-to-book homeowners, and turn search visibility 
        into consistent jobs and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Technical SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Roofing Contractors?",
      subheading: "Storm Damage & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of roofer SEO and the 
        local search standards contractors must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help roofing businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your company's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-300 underline">technical SEO services</a> to see how we help 
        contractors attract more job enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Crew Booked",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Lead Gen, WordPress, AI SEO, Meta Ads)
  servicesSection: {
      heading: "Roofer SEO Services for Storm Damage Jobs",
      subheading: "Everything you need to increase visibility, trust & homeowner enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Storm Damage Lead Generation',
          description: (
            <>
              We ensure your roofing website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              help search engines index your services accurately, so homeowners find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Roofer WordPress Sites',
          description: (
            <>
              When homeowners search "roofer near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more storm jobs and repairs.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location contractor support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'AI Roofer SEO',
          description: (
            <>
              A full, in-depth audit built specifically for roofing websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Storm Damage Meta Ads',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              help roofers stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Roofer SEO</span>",
      description: "Clear answers to help roofers understand how SEO drives job enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Roofer SEO?",
          answer: "Roofer SEO helps contractors and roofing companies rank higher on Google for repairs, replacements, and locations homeowners are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for roofers different from regular SEO?",
          answer: "SEO for roofers requires strict local accuracy, service-focused optimization, Google Maps priority, and homeowner-focused content. It also prioritizes storm damage searches for immediate jobs."
        },
        {
          question: "How long does it take for roofers to see results?",
          answer: "Most roofers start seeing noticeable improvements in 2–3 months, with stronger job enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Roofer SEO effective after storms?",
          answer: "Absolutely. Storm-optimized keywords, rapid local ranking, and emergency service pages capture homeowners searching immediately after weather events for urgent repairs."
        },
        {
          question: "Can SEO help my roofing company get more job enquiries?",
          answer: "Yes. By ranking your company for targeted service keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent homeowner enquiries."
        },
        {
          question: "Do you offer SEO audits for roofing websites?",
          answer: "Yes. Our in-depth roofer SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking job growth."
        },
        {
          question: "Is content creation included in roofer SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for service pages, storm guides, location pages, and FAQs, all designed to help homeowners choose your company confidently."
        }
      ]
  }
},

// Seal Coaters Industry Data
sealcoaters: {
  key: "sealCoaters",
  slug: "seal-coating",
  industry: "Seal Coaters",
  meta: {
    title: "SEO for Seal Coating | Get More Driveway & Parking Lot Jobs",
    description: "Boost your seal coating business visibility on Google. Our expert seal coating SEO services help you attract more local contractors, increase asphalt jobs, and drive quote requests."
  },
  hero: {
    heading: "Seal Coating SEO for Asphalt Season Leads",
    subtext: "Capture 'sealcoating near me' + driveway repair searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Seal Coating SEO experts",
  },

  // Pitch for Seal Coaters (Local SEO first, then Lead Gen)
  sectionGrow: {
    heading: "Grow Your Seal Coating Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Seal Coating SEO</span>",
    subheading: "Reach More Contractors Where They're Actively Searching",
    
    description: `
      If your seal coating business isn't showing up on Google when contractors search for asphalt sealing, driveway coating, or nearby services, 
      you're losing jobs to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a>  
      combined with <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" class="text-blue-600 underline">lead generation services</a> 
      help coaters boost visibility, build trust, and attract clients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" queries where contractors look first.
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

  // why seal coaters need seo (Technical SEO first, then WordPress)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Seal Coaters Need SEO</span> In Today's Asphalt Market?",
      
      subheading: "SEO for Coaters That Want Consistent, High-Intent Job Enquiries",
      
      description: `
        Contractors no longer choose seal coaters based only on location, they research, compare, and evaluate online first. 
        That's why SEO for seal coating is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable job enquiries to competitors who do. Strong seal coating SEO helps your business rank for asphalt, 
        driveways, and locations your ideal contractors are already searching for, while improving local visibility and 
        building trust through service-focused, seasonal-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-600 underline">technical SEO services</a>. 
        We help seal coaters strengthen online authority, attract ready-to-book contractors, and turn search visibility 
        into consistent jobs and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (AI SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Asphalt Contractors?",
      subheading: "Seasonal & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of seal coating SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help seal coating businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-300 underline">AI SEO services</a> to see how we help 
        contractors attract more job enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Crew Booked",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Search Ads, Ecommerce, WordPress, Meta Ads)
  servicesSection: {
      heading: "Seal Coating SEO Services for Asphalt Jobs",
      subheading: "Everything you need to increase visibility, trust & contractor enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Asphalt Season Search Ads',
          description: (
            <>
              We ensure your seal coating website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help search engines index your services accurately, so contractors find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Seal Coating Ecommerce',
          description: (
            <>
              When contractors search "seal coating near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more asphalt jobs and contracts.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location contractor support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Seal Coating Websites',
          description: (
            <>
              A full, in-depth audit built specifically for seal coating websites.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Asphalt Contractor Meta Ads',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              help seal coaters stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Seal Coating SEO</span>",
      description: "Clear answers to help seal coaters understand how SEO drives job enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Seal Coating SEO?",
          answer: "Seal coating SEO helps businesses rank higher on Google for asphalt sealing, driveway coating, and locations contractors are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for seal coaters different from regular SEO?",
          answer: "SEO for seal coaters requires strict local accuracy, service-focused optimization, Google Maps priority, and contractor-focused content. It also prioritizes seasonal asphalt searches for peak demand."
        },
        {
          question: "How long does it take for seal coaters to see results?",
          answer: "Most seal coaters start seeing noticeable improvements in 2–3 months, with stronger job enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Seal Coating SEO effective during peak season?",
          answer: "Absolutely. Seasonal keywords, rapid local ranking, and asphalt service pages capture contractors searching during spring/summer when driveway sealing demand peaks."
        },
        {
          question: "Can SEO help my seal coating business get more job enquiries?",
          answer: "Yes. By ranking your business for targeted asphalt keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent contractor enquiries."
        },
        {
          question: "Do you offer SEO audits for seal coating websites?",
          answer: "Yes. Our in-depth seal coating SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking job growth."
        },
        {
          question: "Is content creation included in seal coating SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for service pages, asphalt guides, location pages, and FAQs, all designed to help contractors choose your business confidently."
        }
      ]
  }
},

// Signage Industry Data
signage: {
  key: "signage",
  slug: "signage",
  industry: "Signage",
  meta: {
    title: "SEO for Signage Companies | Get More Business Sign Projects",
    description: "Boost your signage business visibility on Google. Our expert signage SEO services help you attract more local businesses, increase sign orders, and drive project inquiries."
  },
  hero: {
    heading: "Signage SEO for Commercial Sign Projects",
    subtext: "Capture 'sign company near me' + business signage searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Signage SEO experts",
  },

  // Pitch for Signage (Ecommerce first, then Search Ads)
  sectionGrow: {
    heading: "Grow Your Signage Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Signage SEO</span>",
    subheading: "Reach More Businesses Where They're Actively Searching",
    
    description: `
      If your signage company isn't showing up on Google when businesses search for signs, displays, or nearby fabricators, 
      you're losing projects to competitors every single day. Our  
      <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-600 underline">ecommerce development</a>  
      combined with <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-600 underline">search engine marketing</a> 
      help signage companies boost visibility, build trust, and attract clients ready to order right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" queries where companies look first.
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

  // why signage needs seo (AI SEO first, then Local)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Sign Companies Need SEO</span> In Today's Branding Market?",
      
      subheading: "SEO for Signage That Wants Consistent, High-Intent Project Enquiries",
      
      description: `
        Businesses no longer choose sign companies based only on location, they research, compare, and evaluate online first. 
        That's why SEO for signage is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable project enquiries to competitors who do. Strong signage SEO helps your company rank for signs, 
        displays, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through project-focused, design-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a>. 
        We help signage companies strengthen online authority, attract ready-to-order clients, and turn search visibility 
        into consistent projects and installations.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (WordPress first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Sign Fabricators?",
      subheading: "Visual Branding & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of signage SEO and the 
        visual search standards businesses must follow. Our team builds strategies that showcase portfolios, strengthen online 
        credibility, and help signage companies grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-300 underline">WordPress development</a> to see how we help 
        signage professionals attract more project enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Signs Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Meta Ads, Technical SEO, Shopify, Lead Gen)
  servicesSection: {
      heading: "Signage SEO Services for Commercial Projects",
      subheading: "Everything you need to increase visibility, trust & business enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Signage Meta Advertising',
          description: (
            <>
              We ensure your signage website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              help search engines index your projects accurately, so businesses find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Project schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Technical SEO for Signage',
          description: (
            <>
              When businesses search "sign company near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more commercial projects.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location shop support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Signage Shopify Stores',
          description: (
            <>
              A full, in-depth audit built specifically for signage websites.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated project content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & project evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Sign Project Lead Generation',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              help signage companies stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced project content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Signage SEO</span>",
      description: "Clear answers to help signage companies understand how SEO drives project enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Signage SEO?",
          answer: "Signage SEO helps companies rank higher on Google for signs, displays, and locations businesses are actively searching for. It focuses on visibility, trust, and project acquisition."
        },
        {
          question: "How is SEO for signage different from regular SEO?",
          answer: "SEO for signage requires strict local accuracy, project-focused optimization, Google Maps priority, and business-focused content. It prioritizes commercial searches for signage solutions."
        },
        {
          question: "How long does it take for signage companies to see results?",
          answer: "Most signage companies start seeing noticeable improvements in 2–3 months, with stronger project enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local project acquisition."
        },
        {
          question: "Is Signage SEO effective for custom projects?",
          answer: "Absolutely. Custom signage keywords, portfolio optimization, and local authority capture businesses searching for specialized signage solutions and installations."
        },
        {
          question: "Can SEO help my signage company get more project enquiries?",
          answer: "Yes. By ranking your company for targeted signage keywords, improving local presence, and building trust signals, SEO generates consistent, high-intent business enquiries."
        },
        {
          question: "Do you offer SEO audits for signage websites?",
          answer: "Yes. Our in-depth signage SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking project growth."
        },
        {
          question: "Is content creation included in signage SEO services?",
          answer: "Yes. We create project-accurate, search-optimized content for service pages, portfolio showcases, location guides, and FAQs to help businesses choose your company confidently."
        }
      ]
  }
},

// Beauty Spa Industry Data
beautySpas: {
  key: "beautySpas",
  slug: "beauty-spas",
  industry: "Beauty Spas",
  meta: {
    title: "SEO for Beauty Spas | Get More Wellness Bookings",
    description: "Boost your beauty spa visibility on Google. Our expert spa SEO services help you attract more local clients, increase treatment bookings, and drive relaxation inquiries."
  },
  hero: {
    heading: "Beauty Spa SEO for Wellness Appointments",
    subtext: "Capture 'spa near me' + treatment searches that fill your schedule",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Beauty Spa SEO experts",
  },

  // Pitch for Beauty Spas (WordPress first, then Meta Ads)
  sectionGrow: {
    heading: "Grow Your Beauty Spa With <span class='bg-blue-600 bg-clip-text text-transparent'>Spa SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your beauty spa isn't showing up on Google when clients search for treatments, facials, or nearby wellness services, 
      you're losing bookings to competitors every single day. Our  
      <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-600 underline">WordPress development</a>  
      combined with <a href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" class="text-blue-600 underline">Meta Ads services</a> 
      help spas boost visibility, build trust, and attract clients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your spa ranks higher in Google Maps, local packs, and "near me" queries where clients look first.
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

  // why beauty spas need seo (Technical SEO first, then AI)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Beauty Spas Need SEO</span> In Today's Wellness Market?",
      
      subheading: "SEO for Spas That Want Consistent, High-Intent Client Enquiries",
      
      description: `
        Clients no longer choose beauty spas based only on location, they research, compare, and evaluate online first. 
        That's why SEO for beauty spas is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable booking enquiries to competitors who do. Strong spa SEO helps your business rank for treatments, 
        therapies, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through service-focused, wellness-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-600 underline">technical SEO services</a>. 
        We help spas strengthen online authority, attract ready-to-book clients, and turn search visibility 
        into consistent appointments and walk-ins.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Local SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Wellness Professionals?",
      subheading: "Relaxation & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of beauty spa SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase treatments, strengthen online 
        credibility, and help spa businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your spa's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-300 underline">Local SEO services</a> to see how we help 
        wellness professionals attract more client enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Spa Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Search Ads, Ecommerce, AI SEO, Lead Gen)
  servicesSection: {
      heading: "Beauty Spa SEO Services for Wellness Bookings",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Spa Search Advertising',
          description: (
            <>
              We ensure your spa website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help search engines index your treatments accurately, so clients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Spa Ecommerce Booking',
          description: (
            <>
              When clients search "spa near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more bookings and walk-ins.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location spa support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'AI Spa SEO',
          description: (
            <>
              A full, in-depth audit built specifically for spa websites.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/ai-seo-services" className="text-blue-600 hover:underline px-1">
                AI SEO services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated treatment content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & treatment evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Wellness Lead Generation',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              help spas stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced treatment content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Beauty Spa SEO</span>",
      description: "Clear answers to help beauty spas understand how SEO drives client enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Beauty Spa SEO?",
          answer: "Beauty spa SEO helps wellness businesses rank higher on Google for treatments, therapies, and locations clients are actively searching for. It focuses on visibility, trust, and client acquisition."
        },
        {
          question: "How is SEO for spas different from regular SEO?",
          answer: "SEO for beauty spas requires strict local accuracy, treatment-focused optimization, Google Maps priority, and client-focused content. It also prioritizes local search so nearby clients can find you quickly."
        },
        {
          question: "How long does it take for a spa to see results?",
          answer: "Most beauty spas start seeing noticeable improvements in 2–3 months, with stronger client enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local client acquisition."
        },
        {
          question: "Is Beauty Spa SEO safe and compliant with guidelines?",
          answer: "Absolutely. We follow strict local search guidelines, ensure treatment-safe website practices, and create accurate content reviewed for reliability and trustworthiness."
        },
        {
          question: "Can SEO help my spa get more client enquiries?",
          answer: "Yes. By ranking your spa for targeted wellness keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent client enquiries."
        },
        {
          question: "Do you offer SEO audits for spa websites?",
          answer: "Yes. Our in-depth beauty spa SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking client growth."
        },
        {
          question: "Is content creation included in your spa SEO services?",
          answer: "Yes. We create treatment-accurate, search-optimized content for service pages, wellness guides, blogs, and FAQs, all designed to help clients choose your spa with confidence."
        }
      ]
  }
},

// Builders Industry Data
builders: {
  key: "builders",
  slug: "builders",
  industry: "Builders",
  meta: {
    title: "SEO for Builders | Get More Construction Projects",
    description: "Boost your construction business visibility on Google. Our expert builder SEO services help you attract more local clients, increase project inquiries, and drive contract wins."
  },
  hero: {
    heading: "Builder SEO for Construction Contracts",
    subtext: "Capture 'builders near me' + home construction searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Builder SEO experts",
  },

  // Pitch for Builders (AI SEO first, then Local SEO)
  sectionGrow: {
    heading: "Grow Your Construction Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Builder SEO</span>",
    subheading: "Reach More Clients Where They're Actively Searching",
    
    description: `
      If your construction business isn't showing up on Google when clients search for builders, renovations, or nearby contractors, 
      you're losing projects to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a>  
      combined with <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a> 
      help builders boost visibility, build trust, and attract clients ready to sign contracts right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" queries where clients look first.
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

  // why builders need seo (Search Ads first, then Ecommerce)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Builders Need SEO</span> In Today's Construction Market?",
      
      subheading: "SEO for Builders That Want Consistent, High-Intent Project Enquiries",
      
      description: `
        Clients no longer choose builders based only on location, they research, compare, and evaluate online first. 
        That's why SEO for builders is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable project enquiries to competitors who do. Strong builder SEO helps your business rank for construction, 
        renovations, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through project-focused, construction-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-600 underline">search engine marketing</a>. 
        We help builders strengthen online authority, attract ready-to-contract clients, and turn search visibility 
        into consistent projects and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Technical SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Construction Professionals?",
      subheading: "Project Portfolio & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of builder SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase portfolios, strengthen online 
        credibility, and help construction businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-300 underline">technical SEO services</a> to see how we help 
        builders attract more project enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Crew Booked",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: WordPress, Lead Gen, Meta Ads, Shopify)
  servicesSection: {
      heading: "Builder SEO Services for Construction Projects",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Construction WordPress Sites',
          description: (
            <>
              We ensure your builder website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              help search engines index your projects accurately, so clients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Project schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Construction Lead Generation',
          description: (
            <>
              When clients search "builders near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more contracts and renovations.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location contractor support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Builder Meta Advertising',
          description: (
            <>
              A full, in-depth audit built specifically for builder websites.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated project content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & project evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Construction Shopify Portfolios',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development
              </Link> 
              help builders stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced project content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Builder SEO</span>",
      description: "Clear answers to help builders understand how SEO drives project enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Builder SEO?",
          answer: "Builder SEO helps construction businesses rank higher on Google for building, renovations, and locations clients are actively searching for. It focuses on visibility, trust, and project acquisition."
        },
        {
          question: "How is SEO for builders different from regular SEO?",
          answer: "SEO for builders requires strict local accuracy, project-focused optimization, Google Maps priority, and client-focused content. It prioritizes construction searches for commercial and residential work."
        },
        {
          question: "How long does it take for builders to see results?",
          answer: "Most builders start seeing noticeable improvements in 2–3 months, with stronger project enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local project acquisition."
        },
        {
          question: "Is Builder SEO effective for commercial projects?",
          answer: "Absolutely. Commercial construction keywords, portfolio optimization, and local authority capture businesses searching for large-scale construction and renovation solutions."
        },
        {
          question: "Can SEO help my construction business get more project enquiries?",
          answer: "Yes. By ranking your business for targeted construction keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent client enquiries."
        },
        {
          question: "Do you offer SEO audits for builder websites?",
          answer: "Yes. Our in-depth builder SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking project growth."
        },
        {
          question: "Is content creation included in builder SEO services?",
          answer: "Yes. We create project-accurate, search-optimized content for service pages, portfolio showcases, location guides, and FAQs to help clients choose your business confidently."
        }
      ]
  }
},

// Dentists Industry Data
dentists: {
  key: "dentists",
  slug: "dentists",
  industry: "Dentists",
  meta: {
    title: "SEO for Dentists | Get More Patient Appointments",
    description: "Boost your dental practice visibility on Google. Our expert dentist SEO services help you attract more local patients, increase new patient bookings, and drive consultations."
  },
  hero: {
    heading: "Dentist SEO for New Patient Growth",
    subtext: "Capture 'dentist near me' + dental treatment searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Dentist SEO experts",
  },

  // Pitch for Dentists (Ecommerce first, then Technical SEO)
  sectionGrow: {
    heading: "Grow Your Dental Practice With <span class='bg-blue-600 bg-clip-text text-transparent'>Dentist SEO</span>",
    subheading: "Reach More Patients Where They're Actively Searching",
    
    description: `
      If your dental practice isn't showing up on Google when patients search for dentists, treatments, or emergency dental care, 
      you're losing appointments to competitors every single day. Our  
      <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-600 underline">ecommerce development</a>  
      combined with <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-600 underline">technical SEO services</a> 
      help dentists boost visibility, build trust, and attract patients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your practice ranks higher in Google Maps, local packs, and "near me" queries where patients look first.
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

  // why dentists need seo (Lead Gen first, then AI SEO)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Dentists Need SEO</span> In Today's Dental Market?",
      
      subheading: "SEO for Practices That Want Consistent, High-Intent Patient Enquiries",
      
      description: `
        Patients no longer choose dentists based only on location, they research, compare, and evaluate online first. 
        That's why SEO for dentists is now essential. If your practice doesn't appear on the first page of Google, you lose 
        valuable patient enquiries to competitors who do. Strong dentist SEO helps your practice rank for treatments, 
        procedures, and locations your ideal patients are already searching for, while improving local visibility and 
        building E-E-A-T trust through dental-focused, patient-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" class="text-blue-600 underline">lead generation services</a>. 
        We help dentists strengthen online authority, attract ready-to-book patients, and turn search visibility 
        into consistent appointments and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Search Ads first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Dental Professionals?",
      subheading: "E-E-A-T & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of dentist SEO and the 
        E-E-A-T standards practices must follow. Our team builds strategies that showcase treatments, strengthen online 
        credibility, and help dental businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your practice's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-300 underline">search engine marketing</a> to see how we help 
        dental professionals attract more patient enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Practice Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Meta Ads, Local SEO, WordPress, Shopify)
  servicesSection: {
      heading: "Dentist SEO Services for New Patient Appointments",
      subheading: "Everything you need to increase visibility, trust & patient enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Dental Meta Advertising',
          description: (
            <>
              We ensure your dental website meets strict E-E-A-T and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              help search engines index your treatments accurately, so patients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Dental schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Local Dentist SEO',
          description: (
            <>
              When patients search "dentist near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/local-seo-services" className="text-blue-600 hover:underline px-1">
                Local SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more appointments.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location practice support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Dental WordPress Sites',
          description: (
            <>
              A full, in-depth audit built specifically for dental websites.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              uncover issues blocking your visibility, from E-E-A-T gaps to outdated treatment content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'E-E-A-T & treatment evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Dental Shopify Booking',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development
              </Link> 
              help dentists stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced treatment content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Dentist SEO</span>",
      description: "Clear answers to help dentists understand how SEO drives patient enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Dentist SEO?",
          answer: "Dentist SEO helps dental practices rank higher on Google for treatments, procedures, and locations patients are actively searching for. It focuses on E-E-A-T authority, trust, and patient acquisition."
        },
        {
          question: "How is SEO for dentists different from regular SEO?",
          answer: "SEO for dentists requires strict E-E-A-T compliance, treatment-focused optimization, Google Maps priority, and patient-focused content. It builds medical authority for serious dental care."
        },
        {
          question: "How long does it take for dentists to see results?",
          answer: "Most dental practices start seeing noticeable improvements in 2–3 months, with stronger patient enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local patient acquisition."
        },
        {
          question: "Is Dentist SEO compliant with medical guidelines?",
          answer: "Absolutely. We follow strict E-E-A-T guidelines, ensure dental-safe website practices, and create medically accurate content reviewed for compliance and trustworthiness."
        },
        {
          question: "Can SEO help my dental practice get more patient enquiries?",
          answer: "Yes. By ranking your practice for targeted dental keywords, improving local presence, and building trust signals, SEO generates consistent, high-intent patient consultations."
        },
        {
          question: "Do you offer SEO audits for dental websites?",
          answer: "Yes. Our in-depth dentist SEO audits uncover technical issues, E-E-A-T gaps, local ranking opportunities, and visibility problems blocking patient growth."
        },
        {
          question: "Is content creation included in dentist SEO services?",
          answer: "Yes. We create treatment-accurate, search-optimized content for procedure pages, dental guides, location pages, and FAQs to help patients choose your practice confidently."
        }
      ]
  }
},

// Chiropractors Industry Data
chiropractors: {
  key: "chiropractors",
  slug: "chiropractors",
  industry: "Chiropractors",
  meta: {
    title: "SEO for Chiropractors | Get More Patient Appointments",
    description: "Boost your chiropractic practice visibility on Google. Our expert chiropractor SEO services help you attract more local patients, increase adjustment bookings, and drive consultations."
  },
  hero: {
    heading: "Chiropractor SEO for Pain Relief Patients",
    subtext: "Capture 'chiropractor near me' + back pain treatment searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Chiropractor SEO experts",
  },

  // Pitch for Chiropractors (Local SEO first, then Lead Gen)
  sectionGrow: {
    heading: "Grow Your Chiropractic Practice With <span class='bg-blue-600 bg-clip-text text-transparent'>Chiropractor SEO</span>",
    subheading: "Reach More Patients Where They're Actively Searching",
    
    description: `
      If your chiropractic practice isn't showing up on Google when patients search for adjustments, back pain, or nearby chiropractors, 
      you're losing appointments to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a>  
      combined with <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" class="text-blue-600 underline">lead generation services</a> 
      help chiropractors boost visibility, build trust, and attract patients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your practice ranks higher in Google Maps, local packs, and "near me" queries where patients look first.
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

  // why chiropractors need seo (WordPress first, then Search Ads)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Chiropractors Need SEO</span> In Today's Wellness Market?",
      
      subheading: "SEO for Practices That Want Consistent, High-Intent Patient Enquiries",
      
      description: `
        Patients no longer choose chiropractors based only on location, they research, compare, and evaluate online first. 
        That's why SEO for chiropractors is now essential. If your practice doesn't appear on the first page of Google, you lose 
        valuable patient enquiries to competitors who do. Strong chiropractor SEO helps your practice rank for adjustments, 
        pain relief, and locations your ideal patients are already searching for, while improving local visibility and 
        building E-E-A-T trust through treatment-focused, patient-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-600 underline">WordPress development</a>. 
        We help chiropractors strengthen online authority, attract ready-to-book patients, and turn search visibility 
        into consistent appointments and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (AI SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Chiropractic Professionals?",
      subheading: "E-E-A-T & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of chiropractor SEO and the 
        E-E-A-T standards practices must follow. Our team builds strategies that showcase treatments, strengthen online 
        credibility, and help chiropractic businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your practice's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-300 underline">AI SEO services</a> to see how we help 
        wellness professionals attract more patient enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Practice Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Technical SEO, Meta Ads, Ecommerce, Search Ads)
  servicesSection: {
      heading: "Chiropractor SEO Services for Pain Relief Appointments",
      subheading: "Everything you need to increase visibility, trust & patient enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Chiropractic Technical SEO',
          description: (
            <>
              We ensure your chiropractic website meets strict E-E-A-T and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your treatments accurately, so patients find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Treatment schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Chiropractic Meta Ads',
          description: (
            <>
              When patients search "chiropractor near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more appointments.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location practice support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Chiropractic Ecommerce Booking',
          description: (
            <>
              A full, in-depth audit built specifically for chiropractic websites.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development
              </Link> 
              uncover issues blocking your visibility, from E-E-A-T gaps to outdated treatment content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'E-E-A-T & treatment evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Pain Relief Search Ads',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help chiropractors stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced treatment content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Chiropractor SEO</span>",
      description: "Clear answers to help chiropractors understand how SEO drives patient enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Chiropractor SEO?",
          answer: "Chiropractor SEO helps practices rank higher on Google for adjustments, pain relief, and locations patients are actively searching for. It focuses on E-E-A-T authority, trust, and patient acquisition."
        },
        {
          question: "How is SEO for chiropractors different from regular SEO?",
          answer: "SEO for chiropractors requires strict E-E-A-T compliance, treatment-focused optimization, Google Maps priority, and patient-focused content. It builds wellness authority for pain relief seekers."
        },
        {
          question: "How long does it take for chiropractors to see results?",
          answer: "Most chiropractic practices start seeing noticeable improvements in 2–3 months, with stronger patient enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local patient acquisition."
        },
        {
          question: "Is Chiropractor SEO compliant with medical guidelines?",
          answer: "Absolutely. We follow strict E-E-A-T guidelines, ensure treatment-safe website practices, and create medically accurate content reviewed for compliance and trustworthiness."
        },
        {
          question: "Can SEO help my chiropractic practice get more patient enquiries?",
          answer: "Yes. By ranking your practice for targeted pain relief keywords, improving local presence, and building trust signals, SEO generates consistent, high-intent patient consultations."
        },
        {
          question: "Do you offer SEO audits for chiropractic websites?",
          answer: "Yes. Our in-depth chiropractor SEO audits uncover technical issues, E-E-A-T gaps, local ranking opportunities, and visibility problems blocking patient growth."
        },
        {
          question: "Is content creation included in chiropractor SEO services?",
          answer: "Yes. We create treatment-accurate, search-optimized content for adjustment pages, pain relief guides, location pages, and FAQs to help patients choose your practice confidently."
        }
      ]
  }
},

// Veterinarians Industry Data
veterinarians: {
  key: "veterinarians",
  slug: "veterinarians",
  industry: "Veterinarians",
  meta: {
    title: "SEO for Veterinarians | Get More Pet Owner Appointments",
    description: "Boost your veterinary clinic visibility on Google. Our expert vet SEO services help you attract more local pet owners, increase appointment bookings, and drive emergency visits."
  },
  hero: {
    heading: "Veterinarian SEO for Pet Emergency Calls",
    subtext: "Capture 'vet near me' + pet emergency searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Veterinarian SEO experts",
  },

  // Pitch for Veterinarians (Search Ads first, then Local SEO)
  sectionGrow: {
    heading: "Grow Your Veterinary Clinic With <span class='bg-blue-600 bg-clip-text text-transparent'>Vet SEO</span>",
    subheading: "Reach More Pet Owners Where They're Actively Searching",
    
    description: `
      If your veterinary clinic isn't showing up on Google when pet owners search for vets, emergencies, or nearby animal care, 
      you're losing appointments to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-600 underline">search engine marketing</a>  
      combined with <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a> 
      help veterinarians boost visibility, build trust, and attract pet owners ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your clinic ranks higher in Google Maps, local packs, and "near me" queries where pet owners look first.
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

  // why veterinarians need seo (AI SEO first, then WordPress)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Veterinarians Need SEO</span> In Today's Pet Care Market?",
      
      subheading: "SEO for Clinics That Want Consistent, High-Intent Pet Owner Enquiries",
      
      description: `
        Pet owners no longer choose veterinarians based only on location, they research, compare, and evaluate online first. 
        That's why SEO for veterinarians is now essential. If your clinic doesn't appear on the first page of Google, you lose 
        valuable appointment enquiries to competitors who do. Strong vet SEO helps your clinic rank for treatments, 
        emergencies, and locations your ideal pet owners are already searching for, while improving local visibility and 
        building E-E-A-T trust through pet-focused, care-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a>. 
        We help veterinarians strengthen online authority, attract ready-to-book pet owners, and turn search visibility 
        into consistent appointments and emergency visits.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Technical SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Veterinary Professionals?",
      subheading: "E-E-A-T & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of veterinarian SEO and the 
        E-E-A-T standards clinics must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help veterinary businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your clinic's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-300 underline">technical SEO services</a> to see how we help 
        pet care professionals attract more pet owner enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Clinic Found",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Lead Gen, Ecommerce, Meta Ads, WordPress)
  servicesSection: {
      heading: "Veterinarian SEO Services for Pet Emergency Appointments",
      subheading: "Everything you need to increase visibility, trust & pet owner enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Pet Emergency Lead Generation',
          description: (
            <>
              We ensure your veterinary website meets strict E-E-A-T and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              help search engines index your services accurately, so pet owners find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Vet Ecommerce Booking',
          description: (
            <>
              When pet owners search "vet near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more appointments.
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
          title: 'Veterinary Meta Ads',
          description: (
            <>
              A full, in-depth audit built specifically for veterinary websites.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              uncover issues blocking your visibility, from E-E-A-T gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'E-E-A-T & service evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Vet Clinic WordPress',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              help veterinarians stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Veterinarian SEO</span>",
      description: "Clear answers to help veterinarians understand how SEO drives pet owner enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Veterinarian SEO?",
          answer: "Veterinarian SEO helps clinics rank higher on Google for treatments, emergencies, and locations pet owners are actively searching for. It focuses on E-E-A-T authority, trust, and patient acquisition."
        },
        {
          question: "How is SEO for vets different from regular SEO?",
          answer: "SEO for veterinarians requires strict E-E-A-T compliance, service-focused optimization, Google Maps priority, and pet owner-focused content. It builds animal care authority for emergencies."
        },
        {
          question: "How long does it take for vets to see results?",
          answer: "Most veterinary clinics start seeing noticeable improvements in 2–3 months, with stronger pet owner enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local pet owner acquisition."
        },
        {
          question: "Is Veterinarian SEO compliant with medical guidelines?",
          answer: "Absolutely. We follow strict E-E-A-T guidelines, ensure pet care-safe website practices, and create medically accurate content reviewed for compliance and trustworthiness."
        },
        {
          question: "Can SEO help my vet clinic get more pet owner enquiries?",
          answer: "Yes. By ranking your clinic for targeted pet care keywords, improving local presence, and building trust signals, SEO generates consistent, high-intent pet owner consultations."
        },
        {
          question: "Do you offer SEO audits for veterinary websites?",
          answer: "Yes. Our in-depth veterinarian SEO audits uncover technical issues, E-E-A-T gaps, local ranking opportunities, and visibility problems blocking pet owner growth."
        },
        {
          question: "Is content creation included in veterinarian SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for treatment pages, pet care guides, location pages, and FAQs to help pet owners choose your clinic confidently."
        }
      ]
  }
},

// Pest Control Industry Data
pestControl: {
  key: "pestControl",
  slug: "pest-control",
  industry: "Pest Control",
  meta: {
    title: "SEO for Pest Control | Get More Emergency Extermination Jobs",
    description: "Boost your pest control business visibility on Google. Our expert pest control SEO services help you attract more local clients, increase urgent service calls, and drive treatment bookings."
  },
  hero: {
    heading: "Pest Control SEO for Emergency Calls",
    subtext: "Capture 'pest control near me' + urgent extermination searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Pest Control SEO experts",
  },

  // Pitch for Pest Control (Technical SEO first, then Search Ads)
  sectionGrow: {
    heading: "Grow Your Pest Control Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Pest Control SEO</span>",
    subheading: "Reach More Homeowners Where They're Actively Searching",
    
    description: `
      If your pest control business isn't showing up on Google when homeowners search for extermination, bed bugs, or emergency pest services, 
      you're losing jobs to competitors every single day. Our  
      <a href="https://www.vaphers.com/seo-services/technical-seo-services" class="text-blue-600 underline">technical SEO services</a>  
      combined with <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-600 underline">search engine marketing</a> 
      help pest control companies boost visibility, build trust, and attract clients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" queries where homeowners look first.
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

  // why pest control needs seo (Local SEO first, then Lead Gen)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Pest Control Needs SEO</span> In Today's Home Services Market?",
      
      subheading: "SEO for Exterminators That Want Consistent, High-Intent Job Enquiries",
      
      description: `
        Homeowners no longer choose pest control based only on location, they research, compare, and evaluate online first. 
        That's why SEO for pest control is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable emergency enquiries to competitors who do. Strong pest control SEO helps your business rank for bed bugs, 
        termites, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through service-focused, infestation-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a>. 
        We help pest control companies strengthen online authority, attract ready-to-book homeowners, and turn search visibility 
        into consistent jobs and referrals.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (AI SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Extermination Professionals?",
      subheading: "Emergency & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of pest control SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help pest control businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-300 underline">AI SEO services</a> to see how we help 
        exterminators attract more job enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Crew Booked",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: WordPress, Meta Ads, Ecommerce, Shopify)
  servicesSection: {
      heading: "Pest Control SEO Services for Emergency Extermination",
      subheading: "Everything you need to increase visibility, trust & homeowner enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Pest Control WordPress Sites',
          description: (
            <>
              We ensure your pest control website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              help search engines index your services accurately, so homeowners find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Extermination Meta Ads',
          description: (
            <>
              When homeowners search "pest control near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more urgent jobs.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location service support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Pest Control Ecommerce',
          description: (
            <>
              A full, in-depth audit built specifically for pest control websites.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Infestation Shopify Booking',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development
              </Link> 
              help pest control companies stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Pest Control SEO</span>",
      description: "Clear answers to help pest control businesses understand how SEO drives job enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Pest Control SEO?",
          answer: "Pest control SEO helps businesses rank higher on Google for extermination, bed bugs, termites, and locations homeowners are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for pest control different from regular SEO?",
          answer: "SEO for pest control requires strict local accuracy, service-focused optimization, Google Maps priority, and homeowner-focused content. It prioritizes emergency infestation searches."
        },
        {
          question: "How long does it take for pest control to see results?",
          answer: "Most pest control businesses start seeing noticeable improvements in 2–3 months, with stronger job enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Pest Control SEO effective for emergency jobs?",
          answer: "Absolutely. Emergency keywords, rapid local ranking, and infestation service pages capture homeowners searching immediately when they discover pests in their homes."
        },
        {
          question: "Can SEO help my pest control business get more job enquiries?",
          answer: "Yes. By ranking your business for targeted extermination keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent homeowner enquiries."
        },
        {
          question: "Do you offer SEO audits for pest control websites?",
          answer: "Yes. Our in-depth pest control SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking job growth."
        },
        {
          question: "Is content creation included in pest control SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for treatment pages, infestation guides, location pages, and FAQs, all designed to help homeowners choose your business confidently."
        }
      ]
  }
},

// Gyms Industry Data
gyms: {
  key: "gyms",
  slug: "gyms",
  industry: "Gyms",
  meta: {
    title: "SEO for Gyms | Get More Membership Signups",
    description: "Boost your gym visibility on Google. Our expert gym SEO services help you attract more local fitness enthusiasts, increase membership sales, and drive trial visits."
  },
  hero: {
    heading: "Gym SEO for Membership Growth",
    subtext: "Capture 'gym near me' + fitness class searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Gym SEO experts",
  },

  // Pitch for Gyms (Meta Ads first, then Ecommerce)
  sectionGrow: {
    heading: "Grow Your Gym With <span class='bg-blue-600 bg-clip-text text-transparent'>Gym SEO</span>",
    subheading: "Reach More Fitness Enthusiasts Where They're Actively Searching",
    
    description: `
      If your gym isn't showing up on Google when people search for fitness centers, classes, or nearby gyms, 
      you're losing memberships to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" class="text-blue-600 underline">Meta Ads services</a>  
      combined with <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-600 underline">ecommerce development</a> 
      help gyms boost visibility, build trust, and attract fitness enthusiasts ready to sign up right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your gym ranks higher in Google Maps, local packs, and "near me" queries where people look first.
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

  // why gyms need seo (WordPress first, then Local SEO)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Gyms Need SEO</span> In Today's Fitness Market?",
      
      subheading: "SEO for Gyms That Want Consistent, High-Intent Membership Enquiries",
      
      description: `
        Fitness enthusiasts no longer choose gyms based only on location, they research, compare, and evaluate online first. 
        That's why SEO for gyms is now essential. If your gym doesn't appear on the first page of Google, you lose 
        valuable membership enquiries to competitors who do. Strong gym SEO helps your business rank for classes, 
        memberships, and locations your ideal fitness clients are already searching for, while improving local visibility and 
        building trust through program-focused, results-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-600 underline">WordPress development</a>. 
        We help gyms strengthen online authority, attract ready-to-signup members, and turn search visibility 
        into consistent memberships and class bookings.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (AI SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Fitness Professionals?",
      subheading: "Membership & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of gym SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase programs, strengthen online 
        credibility, and help fitness businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your gym's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-300 underline">AI SEO services</a> to see how we help 
        fitness professionals attract more membership enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Fill Your Classes",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Search Ads, Technical SEO, Lead Gen, Shopify)
  servicesSection: {
      heading: "Gym SEO Services for Membership Sales",
      subheading: "Everything you need to increase visibility, trust & fitness enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Fitness Search Advertising',
          description: (
            <>
              We ensure your gym website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help search engines index your programs accurately, so fitness enthusiasts find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Program schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Gym Technical SEO',
          description: (
            <>
              When people search "gym near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more memberships.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location gym support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Membership Lead Generation',
          description: (
            <>
              A full, in-depth audit built specifically for gym websites.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated program content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & program evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Gym Shopify Memberships',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development
              </Link> 
              help gyms stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced program content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Gym SEO</span>",
      description: "Clear answers to help gyms understand how SEO drives membership enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Gym SEO?",
          answer: "Gym SEO helps fitness centers rank higher on Google for classes, memberships, and locations fitness enthusiasts are actively searching for. It focuses on visibility, trust, and member acquisition."
        },
        {
          question: "How is SEO for gyms different from regular SEO?",
          answer: "SEO for gyms requires strict local accuracy, program-focused optimization, Google Maps priority, and fitness-focused content. It prioritizes local search so nearby fitness seekers find you quickly."
        },
        {
          question: "How long does it take for gyms to see results?",
          answer: "Most gyms start seeing noticeable improvements in 2–3 months, with stronger membership enquiries and ranking gains typically showing within 4–6 months depending on competition and location."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local member acquisition."
        },
        {
          question: "Is Gym SEO effective for class bookings?",
          answer: "Absolutely. Class-specific keywords, rapid local ranking, and program pages capture fitness enthusiasts searching for yoga, HIIT, CrossFit, and other specialized workouts."
        },
        {
          question: "Can SEO help my gym get more membership enquiries?",
          answer: "Yes. By ranking your gym for targeted fitness keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent membership enquiries."
        },
        {
          question: "Do you offer SEO audits for gym websites?",
          answer: "Yes. Our in-depth gym SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking membership growth."
        },
        {
          question: "Is content creation included in gym SEO services?",
          answer: "Yes. We create program-accurate, search-optimized content for class pages, membership guides, location pages, and FAQs, all designed to help fitness enthusiasts choose your gym confidently."
        }
      ]
  }
},

// Car Detailers Industry Data
carDetailers: {
  key: "carDetailers",
  slug: "car-detailers",
  industry: "Car Detailers",
  meta: {
    title: "SEO for Car Detailers | Get More Vehicle Cleaning Jobs",
    description: "Boost your car detailing business visibility on Google. Our expert car detailer SEO services help you attract more local clients, increase detailing bookings, and drive premium service inquiries."
  },
  hero: {
    heading: "Car Detailer SEO for Premium Bookings",
    subtext: "Capture 'car detailing near me' + auto cleaning searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Car Detailer SEO experts",
  },

  // Pitch for Car Detailers (Lead Gen first, then Shopify)
  sectionGrow: {
    heading: "Grow Your Detailing Business With <span class='bg-blue-600 bg-clip-text text-transparent'>Car Detailer SEO</span>",
    subheading: "Reach More Vehicle Owners Where They're Actively Searching",
    
    description: `
      If your car detailing business isn't showing up on Google when vehicle owners search for detailing, ceramic coating, or nearby auto cleaning, 
      you're losing bookings to competitors every single day. Our  
      <a href="https://www.vaphers.com/ppc-marketing/lead-generation-services" class="text-blue-600 underline">lead generation services</a>  
      combined with <a href="https://www.vaphers.com/website-development-services/shopify-website-development" class="text-blue-600 underline">Shopify development</a> 
      help detailers boost visibility, build trust, and attract clients ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your business ranks higher in Google Maps, local packs, and "near me" queries where vehicle owners look first.
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

  // why car detailers need seo (AI SEO first, then Technical)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Car Detailers Need SEO</span> In Today's Auto Care Market?",
      
      subheading: "SEO for Detailers That Want Consistent, High-Intent Booking Enquiries",
      
      description: `
        Vehicle owners no longer choose car detailers based only on location, they research, compare, and evaluate online first. 
        That's why SEO for car detailers is now essential. If your business doesn't appear on the first page of Google, you lose 
        valuable booking enquiries to competitors who do. Strong detailing SEO helps your business rank for ceramic coating, 
        paint correction, and locations your ideal clients are already searching for, while improving local visibility and 
        building trust through service-focused, premium-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/seo-services/ai-seo-services" class="text-blue-600 underline">AI SEO services</a>. 
        We help detailers strengthen online authority, attract ready-to-book vehicle owners, and turn search visibility 
        into consistent premium detailing jobs.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (Local SEO first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Auto Detail Professionals?",
      subheading: "Premium Service & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of car detailer SEO and the 
        local search standards businesses must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help detailing businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your business's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-300 underline">Local SEO services</a> to see how we help 
        auto professionals attract more booking enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Get Your Bay Booked",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Search Ads, WordPress, Meta Ads, Ecommerce)
  servicesSection: {
      heading: "Car Detailer SEO Services for Premium Vehicle Jobs",
      subheading: "Everything you need to increase visibility, trust & client enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Detailing Search Advertising',
          description: (
            <>
              We ensure your detailing website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" className="text-blue-600 hover:underline px-1">
                search engine marketing
              </Link> 
              help search engines index your services accurately, so vehicle owners find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Detailer WordPress Sites',
          description: (
            <>
              When vehicle owners search "car detailing near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/website-development-services/wordpress-website-development" className="text-blue-600 hover:underline px-1">
                WordPress development
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more premium bookings.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location shop support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Detailing Meta Advertising',
          description: (
            <>
              A full, in-depth audit built specifically for detailing websites.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Premium Detailing Ecommerce',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 hover:underline px-1">
                ecommerce development
              </Link> 
              help car detailers stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Car Detailer SEO</span>",
      description: "Clear answers to help car detailers understand how SEO drives booking enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Car Detailer SEO?",
          answer: "Car detailer SEO helps businesses rank higher on Google for detailing, ceramic coating, paint correction, and locations vehicle owners are actively searching for. It focuses on visibility, trust, and booking acquisition."
        },
        {
          question: "How is SEO for car detailers different from regular SEO?",
          answer: "SEO for car detailers requires strict local accuracy, service-focused optimization, Google Maps priority, and vehicle owner-focused content. It prioritizes premium service searches."
        },
        {
          question: "How long does it take for detailers to see results?",
          answer: "Most car detailing businesses start seeing noticeable improvements in 2–3 months, with stronger booking enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local booking acquisition."
        },
        {
          question: "Is Car Detailer SEO effective for premium services?",
          answer: "Absolutely. Premium service keywords like ceramic coating and paint protection film capture high-value clients searching for luxury vehicle detailing solutions."
        },
        {
          question: "Can SEO help my detailing business get more booking enquiries?",
          answer: "Yes. By ranking your business for targeted detailing keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent vehicle owner enquiries."
        },
        {
          question: "Do you offer SEO audits for detailing websites?",
          answer: "Yes. Our in-depth car detailer SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking booking growth."
        },
        {
          question: "Is content creation included in car detailer SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for detailing pages, service guides, location pages, and FAQs, all designed to help vehicle owners choose your business confidently."
        }
      ]
  }
},

// Mechanic Industry Data
mechanics: {
  key: "mechanics",
  slug: "mechanics",
  industry: "Mechanics",
  meta: {
    title: "SEO for Mechanics | Get More Auto Repair Jobs",
    description: "Boost your auto repair shop visibility on Google. Our expert mechanic SEO services help you attract more local drivers, increase repair bookings, and drive emergency service calls."
  },
  hero: {
    heading: "Mechanic SEO for Repair Shop Bookings",
    subtext: "Capture 'mechanic near me' + auto repair emergency searches",
    ctaText: "Free Website Audit",
    ctaSecondaryText: "Book Strategy Call",
    badgeText: "Mechanic SEO experts",
  },

  // Pitch for Mechanics (Ecommerce first, then Local SEO)
  sectionGrow: {
    heading: "Grow Your Auto Repair Shop With <span class='bg-blue-600 bg-clip-text text-transparent'>Mechanic SEO</span>",
    subheading: "Reach More Drivers Where They're Actively Searching",
    
    description: `
      If your auto repair shop isn't showing up on Google when drivers search for mechanics, breakdowns, or nearby auto service, 
      you're losing jobs to competitors every single day. Our  
      <a href="https://www.vaphers.com/website-development-services/ecommerce-development" class="text-blue-600 underline">ecommerce development</a>  
      combined with <a href="https://www.vaphers.com/seo-services/local-seo-services" class="text-blue-600 underline">Local SEO services</a> 
      help mechanics boost visibility, build trust, and attract drivers ready to book right now.

      We also strengthen your presence for location-based searches with strategic service optimization, 
      ensuring your shop ranks higher in Google Maps, local packs, and "near me" queries where drivers look first.
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

  // why mechanics need seo (Search Ads first, then AI SEO)
  sectionAttract: {
      heading: "Why <span class='text-blue-600'>Mechanics Need SEO</span> In Today's Auto Repair Market?",
      
      subheading: "SEO for Shops That Want Consistent, High-Intent Repair Enquiries",
      
      description: `
        Drivers no longer choose mechanics based only on location, they research, compare, and evaluate online first. 
        That's why SEO for mechanics is now essential. If your shop doesn't appear on the first page of Google, you lose 
        valuable repair enquiries to competitors who do. Strong mechanic SEO helps your business rank for brakes, 
        transmissions, and locations your ideal drivers are already searching for, while improving local visibility and 
        building trust through service-focused, repair-optimized content.
        <br/><br/>
        If you want a structured approach to long-term growth, explore our 
        <a href="https://www.vaphers.com/ppc-marketing/search-engine-marketing" class="text-blue-600 underline">search engine marketing</a>. 
        We help auto shops strengthen online authority, attract ready-to-book drivers, and turn search visibility 
        into consistent repair jobs and maintenance contracts.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765461558/PPC_e5mps4.png",
      reverse: true
  },

  // promotion Section (WordPress first)
  sectionPromo: {
      heading: "Why Vaphers is Trusted by Auto Repair Professionals?",
      subheading: "Breakdown & Local Search Strategies",
      
      description: `
        At <span class='text-blue-300 font-bold'>Vaphers</span>, we understand the unique challenges of mechanic SEO and the 
        local search standards shops must follow. Our team builds strategies that showcase services, strengthen online 
        credibility, and help auto repair businesses grow with search-focused precision.

        Whether you're just learning about us or ready to scale your shop's visibility, start with our 
        <a href="https://www.vaphers.com" class="text-blue-300 underline">homepage</a> or explore our 
        <a href="https://www.vaphers.com/website-development-services/wordpress-website-development" class="text-blue-300 underline">WordPress development</a> to see how we help 
        mechanics attract more repair enquiries and improve long-term search performance.
      `,
      
      imageUrl: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761549097/why-ecommerce-seo_scnbgg.png",
      reverse: false,
      ctaText: "Fill Your Bays",
      ctaHref: "https://www.vaphers.com/contact-us"
  },

  // Services Section (SHUFFLED: Technical SEO, Meta Ads, Lead Gen, Shopify)
  servicesSection: {
      heading: "Mechanic SEO Services for Auto Repair Jobs",
      subheading: "Everything you need to increase visibility, trust & driver enquiries",
      
      services: [
        {
          id: 1,
          number: '01',
          title: 'Auto Repair Technical SEO',
          description: (
            <>
              We ensure your repair shop website meets strict service and local-search standards.  
              From improving site speed to resolving schema and crawling issues, our  
              <Link href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 hover:underline px-1">
                technical SEO services
              </Link> 
              help search engines index your services accurately, so drivers find you faster.
            </>
          ),
          points: [
            'Local-search safe technical optimization',
            'Faster Core Web Vitals performance',
            'Service schema & structured data',
            'Indexing, crawling & security fixes'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457114/why-technical-seo-and-on-site-se_jdnufa.jpg',
          color: 'from-cyan-500 to-blue-600'
        },

        {
          id: 2,
          number: '02',
          title: 'Mechanic Meta Advertising',
          description: (
            <>
              When drivers search "mechanic near me," you need to be the first name they see.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/meta-ads-management-services" className="text-blue-600 hover:underline px-1">
                Meta Ads services
              </Link> 
              optimize your Google Business Profile, local citations, and location pages to bring in more repair jobs.
            </>
          ),
          points: [
            'Google Business Profile optimization',
            'Local keyword targeting',
            'NAP, citations & map ranking strategy',
            'Multi-location shop support'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457109/benefits-of-local-seo-Twitter_xil2ul.jpg',
          color: 'from-purple-500 to-pink-600'
        },

        {
          id: 3,
          number: '03',
          title: 'Repair Shop Lead Generation',
          description: (
            <>
              A full, in-depth audit built specifically for mechanic websites.  
              Our  
              <Link href="https://www.vaphers.com/ppc-marketing/lead-generation-services" className="text-blue-600 hover:underline px-1">
                lead generation services
              </Link> 
              uncover issues blocking your visibility, from local gaps to outdated service content and technical errors.
            </>
          ),
          points: [
            'Complete on-page & technical scan',
            'Local SEO & service content evaluation',
            'Local SEO & GBP analysis',
            'Competitor & keyword opportunity mapping'
          ],
          image: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765457080/seo-audit_ggcrks.jpg',
          color: 'from-blue-500 to-indigo-600'
        },

        {
          id: 4,
          number: '04',
          title: 'Mechanic Shopify Booking',
          description: (
            <>
              From content optimization to predictive keyword insights, our  
              <Link href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 hover:underline px-1">
                Shopify development
              </Link> 
              help mechanics stay ahead of competitors and rank faster with intelligent search-driven strategies.
            </>
          ),
          points: [
            'AI-enhanced service content creation',
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
      heading: "FAQs About <span class='bg-blue-600 bg-clip-text text-transparent'>Mechanic SEO</span>",
      description: "Clear answers to help mechanics understand how SEO drives repair enquiries and long-term growth.",
      ctaText: "Get Your Free Audit",
      ctaLink: "/contact",

      faqs: [
        {
          question: "What is Mechanic SEO?",
          answer: "Mechanic SEO helps auto repair shops rank higher on Google for brakes, transmissions, and locations drivers are actively searching for. It focuses on visibility, trust, and job acquisition."
        },
        {
          question: "How is SEO for mechanics different from regular SEO?",
          answer: "SEO for mechanics requires strict local accuracy, service-focused optimization, Google Maps priority, and driver-focused content. It prioritizes breakdown and repair emergency searches."
        },
        {
          question: "How long does it take for mechanics to see results?",
          answer: "Most auto repair shops start seeing noticeable improvements in 2–3 months, with stronger repair enquiries and ranking gains typically showing within 4–6 months depending on competition."
        },
        {
          question: "Do you help with Google Business Profile optimization?",
          answer: "Yes. We optimize your Google Business Profile to improve map rankings, increase calls, and boost visibility for 'near me' searches, essential for local job acquisition."
        },
        {
          question: "Is Mechanic SEO effective for emergency repairs?",
          answer: "Absolutely. Breakdown keywords, rapid local ranking, and emergency service pages capture drivers searching immediately when their vehicles break down on the road."
        },
        {
          question: "Can SEO help my repair shop get more job enquiries?",
          answer: "Yes. By ranking your shop for targeted repair keywords, improving local presence, and building trust signals, SEO helps generate consistent, high-intent driver enquiries."
        },
        {
          question: "Do you offer SEO audits for mechanic websites?",
          answer: "Yes. Our in-depth mechanic SEO audits uncover technical issues, content gaps, local ranking opportunities, and visibility problems blocking repair job growth."
        },
        {
          question: "Is content creation included in mechanic SEO services?",
          answer: "Yes. We create service-accurate, search-optimized content for repair pages, maintenance guides, location pages, and FAQs, all designed to help drivers choose your shop confidently."
        }
      ]
  }
},


};
