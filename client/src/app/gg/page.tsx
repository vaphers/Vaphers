"use client"

import React, { useEffect, useRef, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import PropsHero from '@/PageComponents/Props Based Components/Hero'
import NavBar from '@/PageComponents/Global Components/Header'
import ExplainSection from '@/PageComponents/Props Based Components/Explain'
import WhatYouGetAtVaphers from '@/PageComponents/Props Based Components/WhatYouGetAtVaphers'


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
      contentImage: "/icons/scale.png", // Optional image!
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
      contentImage: "/icons/chart.png",
      content: (
        <p>Get insights immediately with our optimized database structures and fast front-end rendering using Next.js.</p>
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
        <ExplainSection
          cards={myCards}
          hero={{
            heading: "Boost Your Vaphers Site",
            //                   description: "Vaphers is the leading SaaS web design agency focused on building websites that convert traffic into real business outcomes. Every layout is crafted for performance, ensuring your site supports growth from day one. As a trusted Next.js website development agency, we build fast, scalable, and SEO-friendly platforms. We also specialize in JavaScript SEO, ensuring that complex, framework-driven websites are fully discoverable and rank highly on search engines. With our expertise in Next.js development, we create custom solutions that align with your unique business goals. Whether you need a complete redesign or ongoing SEO support, our team is here to help you succeed in the competitive online landscape.",
            description: (
              <div className="space-y-6">
                <p>
                  Vaphers is the leading SaaS web design agency focused on building websites that convert traffic into real business outcomes. Every layout is crafted for performance, ensuring your site supports growth from day one. As a trusted Next.js website development agency, we build fast, scalable, and SEO-friendly platforms
                </p>
                <p>
                  We also specialize in JavaScript SEO, ensuring that complex, framework-driven websites are fully discoverable and rank highly on search engines. With our expertise in Next.js development, we create custom solutions that align with your unique business goals. Whether you need a complete redesign or ongoing SEO support, our team is here to help you succeed in the competitive online landscape
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Learn More
                </button>
              </div>
            ),
            heroImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047483/MoreLeads_dpwsz2.png"
          }}
        />
        <WhatYouGetAtVaphers 
        topStats={myStats}
        heading="Enterprise-Grade ERP Solutions"
        description="Stop fighting with off-the-shelf software. We build custom dashboards that map exactly to your business operations."
        tabs={myTabs}
        />
      </main>
    </>
  );
}
