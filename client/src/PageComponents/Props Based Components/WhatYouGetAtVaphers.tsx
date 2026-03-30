'use client'

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Importing default icons just for the default props example
import { ScanSearch, TestTube, Users } from "lucide-react";

interface FeatureTab {
  id: string | number;
  label: string;
  contentTitle: string;
  // NEW: A prop specifically for a Lucide icon component
  lucideIcon?: React.ReactNode; 
  // NEW: A prop for a larger content image (optional)
  contentImage?: string; 
  // The main text content, which can be JSX
  content: React.ReactNode; 
}

interface FeaturesSectionProps {
  topStats?: string[];
  heading?: string;
  // description is a ReactNode to allow multiple P tags with spacing
  description?: React.ReactNode; 
  tabs?: FeatureTab[];
}

export default function FeaturesSection({
  // Providing comprehensive default props based on your image example
  topStats = [
    "750+ DIGITAL EXPERTS",
    "30-YEAR TRACK RECORD",
    "1,100+ REVIEWS",
    "IN-HOUSE TECHNOLOGY"
  ],
  heading = "Improve your website's UX to boost your revenue",
  description = (
    <div className="space-y-6">
      <p>
        Your website's UX directly impacts your revenue and bottom-line growth. With a positive UX, you keep your audience engaged on your site, potentially increasing conversions and sales.
      </p>
      <p>
        To find out if you're providing excellent user experience, you can invest in UX analysis services. These services uncover the bottlenecks that your audience faces when navigating your website and help you improve their experience.
      </p>
    </div>
  ),
  tabs = [
    {
      id: "tab-1",
      label: "Custom UX analysis strategy",
      contentTitle: "Custom UX analysis strategy",
      // Passing the instantiated Lucide component
      lucideIcon: <ScanSearch className="w-8 h-8 text-blue-600" />,
      // Using a larger placeholder image to show it to the left
      contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047475/girl-laptop_kwggux.png", 
      content: (
        <div className="space-y-4">
          <p>Every business has a unique website and UX analysis needs. That's why we use a custom approach for your website's UX analysis.</p>
          <p>Your custom UX analysis starts with your website's initial conversion audit. At this stage, we identify your site elements with the highest potential for optimization.</p>
          <p>These parts will get tested further and optimized for conversions. Our team will then provide recommendations to optimize these elements to drive conversions for your business.</p>
        </div>
      )
    },
    {
      id: "tab-2",
      label: "CRO testing",
      contentTitle: "Conversion Rate Optimization",
      lucideIcon: <TestTube className="w-8 h-8 text-blue-600" />,
      // No contentImage here, the component handles it gracefully
      content: (
        <p>We implement rigorous A/B testing and multivariate testing to ensure every change made to your site is backed by hard data, driving maximum conversions.</p>
      )
    },
    {
      id: "tab-3",
      label: "Dedicated project manager",
      contentTitle: "Your Dedicated Expert",
      lucideIcon: <Users className="w-8 h-8 text-blue-600" />,
      contentImage: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773732050/We-would-love-to-hear-from-you_nhu2qt.jpg",
      content: (
        <p>You'll be assigned a dedicated project manager who will be your single point of contact, ensuring your goals are met seamlessly and transparently.</p>
      )
    }
  ]
}: FeaturesSectionProps) {
  // State to track which tab is currently selected. Defaults to the first tab's ID.
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  // Find the data for the currently active tab
  const activeTabData = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  // A boolean to check if the current tab should render an image to the left
  const hasContentImage = !!activeTabData.contentImage;

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. Top Stats Bar with Dividers */}
        {topStats && topStats.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-y-4 text-center">
            {topStats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 px-4 md:px-6">
                  {stat}
                </span>
                {/* Divider (hidden on the very last item) */}
                {index < topStats.length - 1 && (
                  <span className="hidden md:block h-5 w-px bg-gray-300"></span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 2. Header & Description */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {heading}
          </h2>
          <div className="text-base md:text-lg text-gray-700 text-left md:text-center leading-relaxed">
            {description}
          </div>
        </div>

        {/* 3. Interactive Sidebar & Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start pt-8">
          
          {/* Left Sidebar (Tabs) - Takes 4 columns on desktop */}
          <div className="md:col-span-4 flex flex-col pt-2">
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`py-5 text-left text-lg font-bold border-b transition-all duration-300 flex items-center justify-between ${
                    isActive 
                      ? "text-blue-600 border-blue-600" 
                      : "text-gray-900 border-gray-200 hover:text-blue-500"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && <motion.span layoutId="activeTabUnderline" className="text-blue-600">→</motion.span>}
                </button>
              );
            })}
          </div>

          {/* Right Content Area - Takes 8 columns on desktop */}
          <div className="md:col-span-8 min-h-[400px]">
            {/* AnimatePresence allows us to animate out the old content and animate in the new content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabData.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* Content Header (Icon + Title) */}
                <div className="flex items-center gap-5 pt-3">
                  {activeTabData.lucideIcon && (
                    <div className="flex-shrink-0">
                      {activeTabData.lucideIcon}
                    </div>
                  )}
                  <h3 className="text-2xl md:text-4xl font-extrabold text-blue-600 leading-tight">
                    {activeTabData.contentTitle}
                  </h3>
                </div>

                {/* Sub-Layout: Content Body with Image to the Left (optional) */}
                <div className={`grid grid-cols-1 ${hasContentImage ? "lg:grid-cols-[2fr_3fr] gap-12 items-start" : "md:max-w-3xl"}`}>
                  
                  {/* Left: The Content Image (optional) */}
                  {activeTabData.contentImage && (
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:aspect-square flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <Image 
                        src={activeTabData.contentImage} 
                        alt={activeTabData.contentTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Right: The Text Content (User defined JSX) */}
                  <div className="text-gray-700 text-lg leading-relaxed flex-1">
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




// How to use ts:


// export default function Page() {
//   // 2. Define your sidebar tabs and their custom content
//   const customTabs = [
//     {
//       id: "tab-1",
//       label: "Modular ERP Core",
//       contentTitle: "Our Flexible ERP Core",
//       // Pass the fully instantiated icon component here
//       lucideIcon: <Cog className="w-10 h-10 text-blue-600" />,
//       // Pass a larger image URL for the left side of the content
//       contentImage: "/images/erp-modular.jpg", 
//       content: (
//         <div className="space-y-4">
//           <p>
//             We build our ERP systems with a modular core architecture. This isn't just a marketing slogan; it's a technical implementation that uses a message bus to allow different components to scale independently.
//           </p>
//           <p>
//             Our microservices-based approach ensures that updating the inventory module won't crash the entire system. <strong>This keeps your uptime at 99.9%.</strong>
//           </p>
//         </div>
//       )
//     },
//     {
//       id: "tab-2",
//       label: "Instant API Integration",
//       contentTitle: "Connects with Real-Time Speed",
//       lucideIcon: <Zap className="w-10 h-10 text-blue-600" />,
//       // Notice: No image passed here, the component shifts the text to fill the gap.
//       content: (
//         <p>
//           Leveraging our optimized event bus, we enable near-instant integration with popular third-party tools like Shopify, Salesforce, and Stripe. Your order data propagates through your entire supply chain in milliseconds.
//         </p>
//       )
//     },
//     {
//       id: "tab-3",
//       label: "Customizable UI Engine",
//       contentTitle: "Tailored to your teams",
//       lucideIcon: <CodeXml className="w-10 h-10 text-blue-600" />,
//       contentImage: "/images/custom-dashboards.jpg",
//       content: (
//         <div className="space-y-4">
//           <p>We provide a proprietary visual UI builder on top of the ERP's data layer.</p>
//           <button className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold text-sm">
//             Watch UI Builder Demo
//           </button>
//         </div>
//       )
//     }
//   ];

//   return (
//     <main>
//       <FeaturesSection 
//         heading="Enterprise Performance, Built with Vaphers Logic"
//         description="Stop fighting off-the-shelf software. We construct digital dashboards that map exactly to your business operations."
//         tabs={customTabs}
//       />
//     </main>
//   );
// }