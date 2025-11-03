"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "WordPress Website Development",
    details: (
      <>
        <p className="mb-4">
          Launch a fast, secure, and easy-to-manage WordPress site tailored to your brand and goals. From custom themes and block-based designs to performance, SEO, and accessibility best practices, your website is built to scale and convert. Content management stays effortless with reusable blocks, custom post types, and role-based workflows.
        </p>
        <p>
          Integrations include form automations, CRM, analytics, and schema markup to improve search visibility and lead capture. Clean code, image optimization, and caching ensure great Core Web Vitals, while advanced security and backups keep your site stable and protected.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761565925/Get_Customers_With_shopifySEO_1_bylphq.png",
    imageAlt:
      "WordPress website layouts showing custom blocks, CMS editing, and performance metrics",
    tutorialLink: "#wordpress-development",
  },
  {
    title: "Shopify Website Development",
    details: (
      <>
        <p className="mb-4">
          Build a conversion-focused Shopify store with custom themes, optimized product pages, and checkout enhancements. Implement structured data, metafields, and collection strategies to improve discoverability while keeping the storefront blazing fast and mobile-first for higher add-to-cart rates.
        </p>
        <p>
          Power growth with integrations across payments, shipping, email, CRM, and analytics, plus custom apps or sections where needed. Scale confidently with performance optimization, robust security, and a streamlined admin tailored to your operations and merchandising workflow.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt:
      "Shopify storefront with product grid, PDP optimization, and checkout conversion analytics",
    tutorialLink: "#shopify-development",
  },
  {
    title: "Next.js Website Development",
    details: (
      <>
        <p className="mb-4">
          Ship modern, high-performance web apps with Next.js using SSR, SSG, or ISR for the perfect blend of speed, SEO, and dynamic content. Enjoy lightning-fast routing, image optimization, and API routes—all engineered for Core Web Vitals and scalability.
        </p>
        <p>
          Integrate headless CMS, payments, auth, and analytics with a clean TypeScript codebase and reusable UI components. From marketing sites to complex dashboards, get a production-grade stack ready for growth, maintainability, and internationalization.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761565925/Get_Customers_With_shopifySEO_1_bylphq.png",
    imageAlt:
      "Next.js app showing routes, ISR/SSR pages, and Lighthouse performance scores",
    tutorialLink: "#nextjs-development",
  },
];

const WordpressShopifyNext = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      ref={sectionRef}
    >
      <motion.div
        className="max-w-7xl w-full py-10 px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={headingVariants}
        >
          <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
            Build High‑Performance Sites with{" "}
            <span className="text-blue-600 ">
              WordPress, Shopify & Next.js
            </span>
          </h3>
        </motion.div>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
              variants={featureVariants}
            >
              {/* Image */}
              <motion.div
                className="w-full aspect-[4/3] rounded-xl border border-border/50 basis-1/2 overflow-hidden relative"
                variants={imageVariants}
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                className="basis-1/2 shrink-0"
                variants={contentVariants}
              >
                <h3 className="my-3 text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <div className="text-muted-foreground leading-relaxed">
                  {feature.details}
                </div>
                <Button
                  asChild
                  size="lg"
                  className="mt-6 rounded-full bg-blue-600 gap-3"
                >
                  <Link href={feature.tutorialLink}>
                    Learn More <ArrowRight />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WordpressShopifyNext;
