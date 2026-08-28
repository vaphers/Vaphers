'use client'

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck2, Link2Off, Target, ShieldAlert } from "lucide-react";

interface GuidelineTab {
  id: string;
  label: string;
  contentTitle: string;
  icon: React.ReactNode;
  contentImage: string;
  content: React.ReactNode;
}

const TOP_HIGHLIGHTS = [
  "100% ORIGINAL CONTENT",
  "MARKETING NICHE ONLY",
  "INSTANT PUBLISHING ($25)",
  "STRICT ZERO-SPAM POLICY"
];

const GUIDELINE_TABS: GuidelineTab[] = [
  {
    id: "content-guidelines",
    label: "1. Content Quality & AI Policy",
    contentTitle: "Human-Written & Value-Driven",
    icon: <FileCheck2 className="w-8 h-8 text-blue-600" />,
    contentImage: "https://i.pinimg.com/736x/bd/04/07/bd0407dec1e867fea63121b279127766.jpg",
    content: (
      <div className="space-y-3 montserrat-medium text-sm md:text-base text-gray-600">
        <p className="text-gray-900 font-semibold">
          Every <span className="text-blue-600 font-bold">SEO guest post</span> must deliver original, actionable marketing insights.
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Zero AI Content:</strong> Unedited or automated AI-generated drafts are not accepted.</li>
          <li><strong>No Search Manipulation:</strong> Articles written solely for keyword stuffing will be rejected.</li>
          <li><strong>Actionable Insights:</strong> Content must include real data, examples, or practical frameworks.</li>
        </ul>
      </div>
    )
  },
  {
    id: "link-placements",
    label: "2. Natural Link Placements",
    contentTitle: "Contextual Links Only",
    icon: <Link2Off className="w-8 h-8 text-blue-600" />,
    contentImage: "https://i.pinimg.com/736x/da/1d/78/da1d782b04c23c58738176e9bb460b9c.jpg",
    content: (
      <div className="space-y-3 montserrat-medium text-sm md:text-base text-gray-600">
        <p className="text-gray-900 font-semibold">
          Links must serve the reader naturally within context.
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>Submitting a <strong>guest post for ads agency</strong> or growth topics requires natural reference links.</li>
          <li>Exact-match commercial anchor texts will be stripped or modified.</li>
          <li>No backlinks to low-value landing pages, thin affiliate offers, or spam directories.</li>
        </ul>
      </div>
    )
  },
  {
    id: "niche-relevance",
    label: "3. Marketing Niche Focus",
    contentTitle: "Strictly Marketing Niche",
    icon: <Target className="w-8 h-8 text-blue-600" />,
    contentImage: "https://i.pinimg.com/1200x/30/98/56/309856db28629134003cdc77471968a3.jpg",
    content: (
      <div className="space-y-3 montserrat-medium text-sm md:text-base text-gray-600">
        <p className="text-gray-900 font-semibold">
          We exclusively publish content within digital marketing niche.
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Accepted Topics:</strong> SEO, PPC, Ads Strategy, Content Marketing, CRO/UX, Branding & Designing .</li>
          <li><strong>Rejected Niches:</strong> Casino/iGaming, Crypto, Real Estate, Finance, and generic Tech.</li>
          <li><strong>Target Audience:</strong> Pitches must cater to marketing managers, founders, and practitioners.</li>
        </ul>
      </div>
    )
  },
  {
    id: "spam-multi-accounts",
    label: "4. Anti-Spam & Account Bans",
    contentTitle: "Account & Submission Integrity",
    icon: <ShieldAlert className="w-8 h-8 text-blue-600" />,
    contentImage: "https://i.pinimg.com/1200x/16/56/b8/1656b8893cc1ca8f599086b6845e8bd6.jpg",
    content: (
      <div className="space-y-3 montserrat-medium text-sm md:text-base text-gray-600">
        <p className="text-gray-900 font-semibold">
          System abuse or multi-accounting results in a permanent domain ban.
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Multi-Accounting:</strong> Creating multiple burner accounts to bypass editorial limits is prohibited.</li>
          <li><strong>Recycled Pitches:</strong> Submitting duplicate or scraped content leads to instant blacklisting.</li>
          <li><strong>Post-Publish Edits:</strong> Swapping links after approval without editorial permission is banned.</li>
        </ul>
      </div>
    )
  }
];

export default function MarketingGuestPostGuidelines() {
  const [activeTabId, setActiveTabId] = useState<string>(GUIDELINE_TABS[0].id);
  const [price, setPrice] = useState<number>(25);

  React.useEffect(() => {
    fetch('/api/guest/pricing')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.price === 'number') setPrice(d.price);
      })
      .catch(() => {});
  }, []);

  const highlights = [
    "100% ORIGINAL CONTENT",
    "MARKETING NICHE ONLY",
    `INSTANT PUBLISHING ($${price % 1 === 0 ? price : price.toFixed(2)})`,
    "STRICT ZERO-SPAM POLICY"
  ];

  const activeTabData =
    GUIDELINE_TABS.find((tab) => tab.id === activeTabId) || GUIDELINE_TABS[0];

  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 1. Top Highlights Bar */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-y-4 md:gap-y-0 md:divide-x md:divide-gray-200 text-center">
          {highlights.map((stat, index) => (
            <div key={index} className="flex flex-col items-center px-4 md:px-8">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-800">
                {stat}
              </span>
            </div>
          ))}
        </div>

        {/* 2. Header & Description */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl text-gray-900 bungee-shade tracking-tight leading-tight">
            Marketing Guest Post Guidelines
          </h2>
          <p className="text-sm md:text-base text-gray-600 montserrat-medium leading-relaxed">
            Follow our submission standards to ensure your article gets approved swiftly.
          </p>
        </div>

        {/* 3. Interactive Sidebar & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-4">
          
          {/* Left Sidebar (Tabs) */}
          <div 
            className="lg:col-span-4 flex flex-col gap-2 relative" 
            role="tablist" 
            aria-label="Guest post guidelines navigation"
          >
            {GUIDELINE_TABS.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative w-full text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between group z-10 ${
                    isActive ? "text-blue-700 font-semibold" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {/* Sliding Background Highlight */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabBackground" 
                      className="absolute inset-0 bg-blue-50/80 rounded-xl -z-10 border border-blue-100"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  
                  <span className={`text-sm md:text-base transition-colors montserrat-medium ${isActive ? 'text-blue-700 font-bold' : 'text-gray-700'}`}>
                    {tab.label}
                  </span>
                  
                  {/* Animated Arrow */}
                  <motion.span 
                    animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
                    className="text-blue-600 font-bold text-sm"
                  >
                    →
                  </motion.span>
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabData.id}
                id={`panel-${activeTabData.id}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6 bg-white"
              >
                {/* Content Header */}
                <h3 className="text-xl md:text-3xl bungee-shade text-gray-900 leading-tight">
                  {activeTabData.contentTitle}
                </h3>

                {/* Sub-Layout: Content Body with Image on All Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center">
                  
                  {/* Image */}
                  <div className="relative w-full h-[220px] md:h-[260px] flex-shrink-0 rounded-xl overflow-hidden group">
                    <Image 
                      src={activeTabData.contentImage} 
                      alt={activeTabData.contentTitle}
                      fill
                      className="object-contain transition-transform duration-500 "
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    {activeTabData.content}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}