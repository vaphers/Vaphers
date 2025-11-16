"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Optimize Your Shopify Store for Maximum Visibility",
    details: (
      <>
        <p className="mb-4">
          Our specialized{' '}
          <a href="https://www.vaphers.com/website-development-services/shopify-website-development" className="text-blue-600 underline font-medium">
            Shopify development
          </a>
          {' '}and SEO services are designed to boost your store's rankings in Google search results and drive sustainable organic traffic. We go beyond basic optimization by implementing advanced strategies tailored specifically for Shopify's architecture, from optimizing product pages with conversion-focused descriptions and keyword-rich titles to enhancing collection pages, improving site speed, and ensuring mobile-first responsiveness. Our comprehensive approach includes{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline font-medium">
            technical SEO tactics
          </a>
          {' '}like fixing crawlability issues, implementing breadcrumb navigation, and optimizing Core Web Vitals.
        </p>
        <p>
          We also implement advanced{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline font-medium">
            structured data markup
          </a>
          {' '}(schema) to help your products appear in rich snippets with star ratings, prices, and availability, significantly increasing click-through rates from Google Shopping, product carousels, and organic search. Whether you're launching a new Shopify store or scaling an existing one, we provide end-to-end SEO solutions that transform search visibility into measurable revenue growth and improved customer acquisition.
        </p>
      </>
    ),
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761565925/Get_Customers_With_shopifySEO_1_bylphq.png",
    imageAlt: "Person working on Shopify store optimization with laptop and shopping analytics",
    tutorialLink: "https://www.vaphers.com/website-development-services/shopify-website-development",
  },
  {
    title: "Drive Revenue with Data-Driven Ecommerce SEO",
    details: (
      <>
        <p className="mb-4">
          Whether you're running a{' '}
          <a href="https://www.vaphers.com/website-development-services/ecommerce-development" className="text-blue-600 underline font-medium">
            WooCommerce store
          </a>
          , OpenCart platform, or Squarespace shop, our comprehensive ecommerce SEO strategies are built to increase product visibility, enhance user experience, and deliver strong ROI. We start with in-depth{' '}
          <a href="https://www.vaphers.com/seo-services/seo-audit-services" className="text-blue-600 underline font-medium">
            keyword research
          </a>
          {' '}to identify high-intent, long-tail search terms that drive conversions, not just traffic. Our team optimizes category pages, product descriptions, and educational blog content to target buyers at every stage of their journey, from discovery through final purchase decision.
        </p>
        <p>
          We implement advanced{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline font-medium">
            technical SEO tactics
          </a>
          {' '}including Product and Review{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline font-medium">
            schema markup
          </a>
          , mobile-first optimization, site speed enhancements, and strategic{' '}
          <a href="https://www.vaphers.com/seo-services/technical-seo-services" className="text-blue-600 underline font-medium">
            internal linking strategies
          </a>
          {' '}that guide customers seamlessly through your store. With transparent reporting, continuous optimization, and a focus on user experience, we help you outrank competitors, reduce cart abandonment, and turn casual browsers into loyal, repeat customers who drive sustainable revenue growth.
        </p>
      </>
    ),
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt: "Ecommerce analytics dashboard showing sales growth and conversion data",
    tutorialLink: "#",
  }
];

const ShopifyWoo = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50" ref={sectionRef}>
      <motion.div
        className="max-w-7xl w-full py-10 px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Heading */}
        <motion.div className="text-center mb-12 md:mb-16" variants={headingVariants}>
          <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
            Platform-Specific SEO for{' '}
            <span className="text-blue-600">
              Shopify & Ecommerce Stores
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
                  className="object-contain object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* Content */}
              <motion.div className="basis-1/2 shrink-0" variants={contentVariants}>
                <h3 className="my-3 text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <div className="text-muted-foreground leading-relaxed">
                  {feature.details}
                </div>
                <Button asChild size="lg" className="mt-6 rounded-full bg-blue-600 gap-3">
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

export default ShopifyWoo;
