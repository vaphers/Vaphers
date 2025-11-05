"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Next.js Ecommerce Website That Sells",
    details: (
      <>
        <p className="mb-4">
          Launch a fast, mobile-friendly store with secure checkout, easy product management, and SEO built-in—so your products get discovered and customers buy with confidence. From clean product pages and smart filters to cart and checkout flows that convert, everything is designed to drive real sales.
        </p>
        <p>
          You also get lightning-fast load times, optimized images, and structured data for Google Shopping and rich results. Whether you’re starting fresh or upgrading, our end-to-end setup turns browsers into buyers with clear tracking and simple updates your team can manage.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761565925/Get_Customers_With_shopifySEO_1_bylphq.png",
    imageAlt: "Modern Next.js ecommerce store with products and analytics",
    tutorialLink: "#",
  },
  {
    title: "Next.js Landing Pages for Leads & SEO",
    details: (
      <>
        <p className="mb-4">
          Get high-converting landing pages that load fast, rank on Google, and turn visitors into leads. Perfect for campaigns, services, and local SEO—built with strong on-page SEO, clear messaging, trust signals, and simple forms that boost response rates.
        </p>
        <p>
          Enjoy reusable sections, A/B testing support, analytics, and pixel setup for ads. With server-side rendering and best practices baked in, your pages perform better out of the box—ideal for growth-focused businesses looking for affordable next js development.
        </p>
      </>
    ),
    image:
      "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt: "Next.js landing page performance with graphs and conversions",
    tutorialLink: "#",
  },
];

const NextServices = () => {
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
            Grow Faster with{" "}
            <span className="text-blue-600 ">
              Affordable Next.js Development
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

export default NextServices;
