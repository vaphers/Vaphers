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
          Our specialized Shopify SEO services are designed to boost your store&apos;s rankings in Google search results and drive sustainable organic traffic. We go beyond basic optimization by implementing advanced strategies tailored specifically for Shopify&apos;s architecture. From optimizing product pages with high-converting descriptions and keyword-rich titles to enhancing collection pages and fixing technical issues like crawlability, site speed, and mobile responsiveness—we cover it all.
        </p>
        <p>
          Our team also implements structured data markup (schema) to help your products appear in rich snippets, Google Shopping, and product carousels. Whether you&apos;re launching a new Shopify store or looking to scale an existing one, we provide end-to-end SEO solutions that turn search visibility into measurable revenue growth.
        </p>
      </>
    ),
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Person working on Shopify store optimization with laptop and shopping analytics",
    tutorialLink: "#",
  },
  {
    title: "Drive Revenue with Data-Driven Ecommerce SEO",
    details: (
      <>
        <p className="mb-4">
          Whether you&apos;re running a WooCommerce store, OpenCart platform, or Squarespace shop, our comprehensive ecommerce SEO strategies are built to increase product visibility, enhance user experience, and deliver a strong return on investment. We start with in-depth keyword research to identify high-intent search terms that drive conversions, not just traffic. Our team optimizes category pages, product descriptions, and blog content to target buyers at every stage of their journey.
        </p>
        <p>
          We also implement advanced technical SEO tactics including schema markup for products, reviews, and FAQs, site speed optimization, mobile-first indexing, and internal linking strategies that guide customers seamlessly through your store. With transparent reporting and continuous optimization, we help you outrank competitors, reduce cart abandonment, and turn casual browsers into loyal, repeat customers.
        </p>
      </>
    ),
    image: "https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=800",
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
          <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight bungee-inline-regular">
            Why Choose Vaphers for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ecommerce SEO?
            </span>
          </h2>
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

export default ShopifyWoo;
