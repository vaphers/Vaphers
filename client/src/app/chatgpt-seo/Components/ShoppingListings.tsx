"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Optimize Your Products for ChatGPT Shopping",
    details: (
      <>
        <p className="mb-4">
          ChatGPT's shopping feature allows customers to discover and purchase products directly within AI conversations. With Instant Checkout integration, your Shopify or Etsy products can appear in ChatGPT's product carousels complete with images, prices, and reviews. Our optimization services ensure your products are discoverable when customers use natural language queries like "buy running shoes under $150" or "shop for eco-friendly gifts."
        </p>
        <p>
          We optimize your product titles, descriptions, and metadata specifically for AI discovery, implementing structured data markup and semantic content strategies that help ChatGPT understand and recommend your products. By positioning your e-commerce store for conversational AI search, you'll capture customers at the exact moment they're ready to buy.
        </p>
      </>
    ),
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767602634/ChatGPT_Shopping_lbdifj.png",
    imageAlt: "AI-powered shopping interface showing ChatGPT product recommendations",
    tutorialLink: "#",
  },
  {
    title: "Boost Local Visibility with ChatGPT Citations",
    details: (
      <>
        <p className="mb-4">
          ChatGPT uses local business citations and mentions to recommend services when users ask questions like "best plumber near me" or "emergency HVAC repair". Our local citation optimization ensures your business information is structured for AI interpretation across Google Business Profile, Yelp, industry directories, and emerging AI platforms, maintaining NAP consistency and semantic relevance.
        </p>
        <p>
          We leverage AI-powered citation analysis to identify gaps, optimize competitor keywords, and strengthen your local presence across platforms that ChatGPT references. With local schema markup and location-specific content optimization, your business becomes the top recommendation for conversational AI queries in your service area.
        </p>
      </>
    ),
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1767602830/ChatGPT_Citations_infbw4.png",
    imageAlt: "Local business citations optimized for ChatGPT and AI search platforms",
    tutorialLink: "#",
  }
];

const ShoppingListing = () => {
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
            Get Discovered on{' '}
            <span className="text-blue-600">
              ChatGPT & AI Platforms
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

export default ShoppingListing;
