"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Next.js Ecommerce Store",
    details: (
      <>
        <p className="mb-4">
          Launch a fast, SEO-ready store that looks great on mobile and converts more visitors into buyers with clean product pages, quick filtering, and a smooth checkout experience built for growth. Our{' '}
          <Link 
            href="/website-development-services/nextjs-website-development" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            Next.js development services
          </Link>
          {' '}deliver performance that scales.
        </p>
        <p>
          Enjoy blazing load speeds, image optimization, and tracking setup, with an admin your team can manage, perfect for brands wanting performance and affordable development that scales.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761565925/Get_Customers_With_shopifySEO_1_bylphq.png",
    imageAlt: "Next.js ecommerce storefront with products and analytics dashboard",
    tutorialLink: "/website-development-services/nextjs-website-development",
  },
  {
    title: "Shopify Store Setup & Growth",
    details: (
      <>
        <p className="mb-4">
          Get a clean, modern{' '}
          <Link 
            href="/website-development-services/shopify-website-development" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            Shopify store
          </Link>
          {' '}set up with the right theme, essential apps, payments, and shipping, so you can start selling quickly with a store that's easy to manage every day.
        </p>
        <p>
          We handle product import, collections, navigation, and on-page SEO, plus conversion best practices like trust badges, reviews, and upsells to increase average order value.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt: "Shopify storefront with collections and conversion elements",
    tutorialLink: "/website-development-services/shopify-website-development",
  },
  {
    title: "WooCommerce Store on WordPress",
    details: (
      <>
        <p className="mb-4">
          Build a flexible{' '}
          <Link 
            href="/website-development-services/wordpress-website-development" 
            className="font-medium text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            WooCommerce store on WordPress
          </Link>
          {' '}with fast product pages, secure checkout, and SEO-friendly structure that helps your products rank and get discovered.
        </p>
        <p>
          From themes and plugins to payments, shipping, and tax setup, we configure everything for easy control, ideal if you need content + ecommerce in one place.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt: "WooCommerce product catalog with WordPress CMS controls",
    tutorialLink: "/website-development-services/wordpress-website-development",
  },
  {
    title: "BigCommerce Store for Scale",
    details: (
      <>
        <p className="mb-4">
          Launch a reliable BigCommerce store built for catalogs, multi-channel selling, and stable performance, even during traffic spikes and seasonal campaigns.
        </p>
        <p>
          We set up products, categories, payments, and integrations, with clean UX and best-practice SEO to drive organic traffic and dependable conversions at scale.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt: "BigCommerce storefront optimized for large catalogs",
    tutorialLink: "/contact",
  },
];

const EcommerceServices = () => {
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
            Ecommerce Website Development{" "}
            <span className="text-blue-600 ">
              That Converts & Scales
            </span>
          </h3>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Stores that load fast, rank higher, and convert better—built on the platform that fits your business today and scales tomorrow.
          </p>
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

export default EcommerceServices;
