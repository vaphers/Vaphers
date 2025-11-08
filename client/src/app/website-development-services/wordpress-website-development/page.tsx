'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import Script from 'next/script'
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from '@/PageComponents/Global Components/HeroSubpage'
import { PortfolioMarquee } from '@/PageComponents/Global Components/ImageMarqee'    
import WordpressPitch from '@/PageComponents/Wordpress Components/Pitch'
import WhatsWP from '@/PageComponents/Wordpress Components/WhatsWP'
import MakeAnyWebsite from '@/PageComponents/Wordpress Components/MakeAnyWebsite'
import Banner from '@/PageComponents/Global Components/Banner'
import Testimonial from '@/PageComponents/Global Components/Testimonial'
import SMB from '@/PageComponents/Wordpress Components/SMB'
import HiringComparision from '@/PageComponents/Wordpress Components/HiringComparison'
import WordPressServicesAccordion from '@/PageComponents/Wordpress Components/Services'
import Stats from '@/PageComponents/Global Components/Stats'
import WordPressFaq from '@/PageComponents/Wordpress Components/FAQ'

const portfolioImages = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166010/FixItNow_fbpzfx.png',
    alt: 'Website Design 1',
    title: 'E-Commerce Platform',
  },
  {
    id: '2',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166006/Interio_gqpsbc.png',
    alt: 'Website Design 2',
    title: 'SaaS Dashboard',
  },
  {
    id: '3',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166003/Trivaa_jvqmzk.png',
    alt: 'Website Design 3',
    title: 'Corporate Website',
  },
  {
    id: '4',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762166001/Verzon_owqvnt.png',
    alt: 'Website Design 4',
    title: 'Mobile App UI',
  },
  {
    id: '5',
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_60,c_limit,w_1200/v1762165991/Dravii_Lifestyles_1_jcavgn.png',
    alt: 'Website Design 5',
    title: 'Fitness Landing Page',
  },
];

// FAQ Schema Data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is WordPress and why should I use it for my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WordPress is a powerful, user-friendly platform that powers over 43% of all websites globally. It's perfect for businesses because you can easily update content without coding skills, it's SEO-friendly, and has thousands of plugins to add features as you grow. You get enterprise-level capabilities at affordable costs."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a WordPress website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A basic business website (5-7 pages) typically takes 2-4 weeks. More complex sites with ecommerce, custom features, or membership systems take 6-8 weeks. We'll provide a detailed timeline after discussing your specific requirements and goals."
      }
    },
    {
      "@type": "Question",
      "name": "Can I update my WordPress website myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! WordPress is designed to be user-friendly. We'll provide training on managing content, adding pages, uploading images, and making updates. You can handle day-to-day changes yourself without technical skills—no developer needed for basic updates."
      }
    },
    {
      "@type": "Question",
      "name": "Will my WordPress website work on mobile devices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100%. All our WordPress websites are fully responsive and mobile-optimized from day one. Your site will look great and function perfectly on smartphones, tablets, and desktops. Mobile optimization is standard in our development process."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a WordPress website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic business websites start around $2,000-5,000. Ecommerce sites range from $5,000-15,000+. Custom enterprise solutions vary based on requirements. We'll provide a clear, fixed quote after understanding your needs—no hidden fees or surprises."
      }
    },
    {
      "@type": "Question",
      "name": "Is WordPress good for SEO and Google rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! WordPress is SEO-friendly by default with clean code structure. We optimize your site with proper meta tags, schema markup, fast loading speeds, and mobile responsiveness—all factors Google loves. Many top-ranking websites use WordPress."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add ecommerce to my WordPress site later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! WordPress is highly scalable. You can start with a simple business site and add WooCommerce, booking systems, membership features, or custom functionality anytime. We design sites with future growth in mind."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns the website after it's built?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You own 100% of your website, content, and code. You'll have full admin access, hosting credentials, and all files. You're never locked into our services—though we hope you'll stay for ongoing support and maintenance."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide website maintenance and support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer comprehensive maintenance packages including regular WordPress updates, security monitoring, daily backups, performance optimization, and priority support. Issues are resolved within 24 hours, keeping your site secure and running smoothly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get started with my WordPress website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Book a free consultation call. We'll discuss your business goals, required features, and budget. Then you'll receive a detailed proposal with timeline, pricing, and next steps—simple and straightforward, no tech jargon."
      }
    }
  ]
}

export default function Page() {
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
    <>
      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <div>
        <SubHero
          heading="Professional WordPress Development That Grows Your Business"
          subtext="Launch a powerful WordPress website tailored to your needs. From custom designs to seamless functionality, we create WordPress sites that are easy to manage and built to convert visitors into customers."
          badgeText="Start Your WordPress Project"
        />
        <WordpressPitch/>
        <PortfolioMarquee images={portfolioImages} pxPerSec={140} />
        <WhatsWP/>
        <MakeAnyWebsite/>
        <Banner/>
        <Testimonial/>
        <SMB/>
        <HiringComparision/>
        <WordPressServicesAccordion/>
        <Stats/>
        <WordPressFaq/>
        <ContactForm />
      </div>
    </>
  )
}
