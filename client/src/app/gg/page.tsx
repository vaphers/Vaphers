"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import PropsHero from '@/PageComponents/Props Based Components/Hero'
import NavBar from '@/PageComponents/Global Components/Header'
import WhatYouGetAtVaphers from '@/PageComponents/Props Based Components/WhatYouGetAtVaphers'
import Explain from '@/PageComponents/Props Based Components/Explain'
import Features1 from '@/PageComponents/Props Based Components/Features1'
import Feature2 from '@/PageComponents/Props Based Components/Features2'
import Charts from '@/PageComponents/Props Based Components/Chart'





// ----------- EXPLAIN SECTION COMPONENT ----------- //


const sampleHeading = 'Working with global businesses that shape the market.';
const sampleParagraphs = [
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  'Ullamcorper eget nulla facilisi etiam dignissim diam quis. Aliquet lectus proin nibh nisl condimentum. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Sagittis id consectetur purus ut faucibus pulvinar.',
];
const sampleImages = [
  {
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg', // Stock living room
    alt: 'Modern living room with brick wall and city view',
    className: 'lg:h-full', // Stretch the first image on desktop
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop', // Stock business collaboration
    alt: 'Team collaborating with laptops around a table',
  },
  {
    src: 'https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg', // Stock home office
    alt: 'Tidy wooden desk with an all-in-one computer and plants',
  },
];



// charts section data

const heroData = {
    mainTitle: "Unlocking business growth with expert consulting solutions",
    mainDescription: "We partner with businesses to design smart strategies, optimize operations, and unlock growth opportunities that create measurable impact and long-term sustainable competitive advantage.",
    topStatLabel: "Total revenue generated",
    topStatValue: "50M+",
    stats: [
      {
        id: "1",
        category: "Projects completed",
        value: "200k",
        subtext: "Trusted teams deliver proven results driving growth across global markets.",
        cardHeight: "220px", // Shortest
      },
      {
        id: "2",
        category: "Awards winning",
        value: "125+",
        subtext: "Honored firm achieves industry awards showcasing impact and excellence.",
        cardHeight: "300px", 
      },
      {
        id: "3",
        category: "Clients satisfaction",
        value: "99%",
        subtext: "Expert advice ensures lasting success with trusted client solutions.",
        cardHeight: "420px", // Tallest
        isStriped: true,     // Triggers the CSS repeating background
      },
      {
        id: "4",
        category: "Years of experience",
        value: "25+",
        subtext: "Decades proven guiding businesses toward growth and sustainable success.",
        cardHeight: "260px", 
      }
    ]
  };





const myCards = [
  {
    title: "Web Design",
    description: "Whether you are opening your first location or scaling globally, our strategies adapt to your needs. As a leading franchise marketing agency and a dedicated search engine marketing company, we provide tailored, data-driven solutions .",
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg"
  },
  {
    title: "SEO Audit",
    description: "Whether you are opening your first location or scaling globally, our strategies adapt to your needs. As a leading franchise marketing agency and a dedicated search engine marketing company, we provide tailored, data-driven solutions.",
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773337877/download_jibv47.jpg"
  },
  {
    title: "Content Strategy",
    description: "Whether you are opening your first location or scaling globally, our strategies adapt to your needs. As a leading franchise marketing agency and a dedicated search engine marketing company, we provide tailored, data-driven solutions.",
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg"
  }
];


const customLogos = [
  "https://logo-url-1.png",
  "https://logo-url-1.png",
  "https://logo-url-1.png",
  "https://logo-url-2.png",
  "https://logo-url-3.png",
  "https://logo-url-4.png",
  "https://logo-url-5.png",
];



const myTabs = [
  {
    id: "tab-1",
    label: "Multi-Tenant Architecture",
    contentTitle: "Built for Scale",
    contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg", // Optional image!
    content: (
      <div className="space-y-4">
        <p>We design ERP systems that can handle multiple tenants securely from day one.</p>
        <p>Our modular approach means you only load the services you need, keeping your infrastructure costs low and performance high.</p>
      </div>
    )
  },
  {
    id: "tab-2",
    label: "Seamless Integration",
    contentTitle: "Connects with Everything",
    // Notice: No image passed here, the component handles it gracefully!
    content: (
      <p>Our event bus architecture ensures that your new ERP talks flawlessly to your existing payment gateways, CRMs, and email providers.</p>
    )
  },
  {
    id: "tab-3",
    label: "Real-Time Reporting",
    contentTitle: "Data at your fingertips",
    contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg",
    content: (
      <p>Get insights immediately with our optimized database structures and fast front-end rendering using Next.js.</p>
    )
  },
  {
    id: "tab-4",
    label: "Real-Time Reporting",
    contentTitle: "Data at your fingertips",
    contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg",
    content: (
      <p>Get insights immediately with our optimized database structures and fast front-end rendering using Next.js.</p>
    )
  },
  {
    id: "tab-5",
    label: "Real-Time Reporting",
    contentTitle: "Data at your fingertips",
    contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg",
    content: (
      <div className="space-y-4">
        <p>We design ERP systems that can handle multiple tenants securely from day one.</p>
        <p>Our modular approach means you only load the services you need, keeping your infrastructure costs low and performance high.</p>
        <p>Our modular approach means you only load the services you need, keeping your infrastructure costs low and performance high.</p>

      </div>
    )
  }
];


const myStats = [
  "50+ ERP SYSTEMS BUILT",
  "99% UPTIME",
  "MODULAR ARCHITECTURE",
  "KOLKATA BASED"
];

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
      <main>
        <NavBar />
        <PropsHero
          // 1. Badge Customization
          showBadge={true}
          badgeText="Check out our SEO case studies"
          badgeLink="/case-studies"

          // 2. Main Content
          title="SEO Services That Transform Your Business"
          description="Grow your brand faster with data-driven digital marketing strategies designed to increase traffic, leads, and measurable revenue."

          // 3. Button Customization
          showButtons={true}
          primaryBtnText="View Pricing"
          primaryBtnLink="/pricing"
          secondaryBtnText="Book a Call"
          secondaryBtnLink="/contact"

          // 4. Image Customization (Optional)
          // imageSrc="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1770818890/ChatGPT_Image_Feb_11_2026_07_37_55_PM_q9spwb.png"
          imageAlt="Vaphers SEO Dashboard Preview"

          // 5. Section override (Optional)
          className="pb-10"
        />
        <WhatYouGetAtVaphers
          topStats={myStats}
          heading="Enterprise-Grade ERP Solutions"
          description="Stop fighting with off-the-shelf software. We build custom dashboards that map exactly to your business operations."
          tabs={myTabs}
        />
//       <Explain
          heading={sampleHeading}
          paragraphs={sampleParagraphs}
          ctaLabel="More about us"
          ctaHref="#"
          images={sampleImages}
        />

        <Features1
          heading="Clients growth with my services"
          ctaLabel="Sign Up"
          ctaHref="/signup"

          // --- NEW: Visual Config Props ---
          businessHealthPercentage={92}
          companyGrowthTitle="Revenue Scaling"
          modernIndustriesTitle="Supported Sectors"
          industriesList={["E-Commerce", "SaaS", "FinTech", "Logistics", "EdTech"]}
          // -------------------------------

          cards={[
            {
              title: "Strategy",
              description: "Fusce neque. Quisque malesuada placerat nisl. Praesent porttitor, nulla vitae posuere."
            },
            {
              title: "Analytics",
              description: "We dive deep into your company growth. Praesent porttitor, nulla vitae posuere iaculis."
            },
            {
              title: "Industries",
              description: "Adapting to modern markets. Quisque malesuada placerat nisl. Praesent porttitor."
            }
          ]}
        />
        <Feature2/>
<Charts {...heroData} />
      

      </main>
    </>
  );
}



