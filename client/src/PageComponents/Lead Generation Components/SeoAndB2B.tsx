"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Generate Qualified Leads Through SEO Optimization",
    details: (
      <>
        <p className="mb-4">
          Our SEO lead generation strategy drives high-intent prospects directly to your website through organic search. We combine technical SEO, content optimization, and keyword research to target users actively searching for solutions you provide. By ranking for conversion-focused keywords, we help you attract prospects ready to take action—not just casual browsers.
        </p>
        <p>
          We optimize landing pages for targeted keywords, create bottom-of-funnel content that drives decision-stage leads, and implement schema markup to improve visibility in search results. Our data-driven approach ensures every piece of content is designed to capture contact information and nurture leads through your sales funnel. Watch your organic traffic transform into a consistent stream of qualified prospects.
        </p>
      </>
    ),
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761565925/Get_Customers_With_shopifySEO_1_bylphq.png",
    imageAlt: "SEO dashboard showing keyword rankings, organic traffic growth, and lead conversion metrics",
    tutorialLink: "#",
  },
  {
    title: "B2B Lead Generation: Convert Businesses Into Clients",
    details: (
      <>
        <p className="mb-4">
          Our B2B lead generation services connect you with decision-makers and qualified prospects in your industry. We leverage LinkedIn marketing, targeted PPC campaigns, webinar promotion, and strategic content to reach businesses actively seeking solutions. Our approach focuses on quality over quantity—we attract leads with genuine purchase intent and decision-making authority.
        </p>
        <p>
          From account-based marketing strategies to personalized email campaigns and lead scoring systems, we build a complete lead generation funnel designed for B2B success. We segment leads by company size, industry, and buying stage, then nurture them with relevant touchpoints that move them closer to conversion. Our transparent reporting shows you exactly where each lead comes from and the ROI of every campaign.
        </p>
      </>
    ),
    image: "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto,c_limit/v1761558398/Get_Customers_With_Ecommerce_SEO_5_xhfnzo.png",
    imageAlt: "B2B lead generation pipeline showing qualified prospects, conversion rates, and revenue attribution",
    tutorialLink: "#",
  }
];

const LeadGenerationServices = () => {
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
            Get Qualified Leads With{' '}
            <span className="text-blue-600 ">
              SEO & B2B Lead Generation
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

export default LeadGenerationServices;
