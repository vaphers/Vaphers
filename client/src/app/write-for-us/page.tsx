'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import PropsHero from '@/PageComponents/Props Based Components/Hero'

import {
  PenTool,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  DollarSign,
  FileText,
  User,
  Zap,
  Check,
  TrendingUp,
  Target,
  Search,
  BarChart3,
  Globe,
  Layers,
} from 'lucide-react';
import MarketingGuestPostGuidelines from './Components/Guidelines';
import GuestPostBenefitsSection from './Components/WhyGuestPost';
import MarketingGuestPostPricing from './Components/Pricing';
import ContactSection from '@/PageComponents/Landing Home/ContactSection';
import MarketingPriceCalculator from '@/PageComponents/Global Components/PriceCalc';

const TOPIC_CATEGORIES = [
  {
    icon: Search,
    title: 'SEO Guest Posts & Organic Growth',
    desc: 'In-depth search engine optimization strategies, programmatic SEO architectures, keyword clustering, internal linking frameworks, and real algorithm recovery case studies.',
    tag: 'SEO Guest Post',
  },
  {
    icon: Target,
    title: 'Performance Marketing & Paid Media',
    desc: 'Actionable ad spend scaling guides, multi-touch attribution models, Google Ads & Meta conversion rate optimization, and CAC reduction experiments.',
    tag: 'Performance Marketing',
  },
  {
    icon: BarChart3,
    title: 'B2B Growth & Revenue Strategy',
    desc: 'Funnel analytics, enterprise pipeline development, marketing automation workflows, product-led growth (PLG) mechanics, and retention benchmarks.',
    tag: 'Marketing Guest Post',
  },
  {
    icon: Globe,
    title: 'Technical Web & Digital Marketing',
    desc: 'Core Web Vitals tuning, headless CMS implementations, analytics instrumentation (GA4/GTM), and modern digital marketing engineering playbooks.',
    tag: 'Digital Marketing',
  },
];

const GUIDELINES_RULES = [
  {
    num: '01',
    title: 'Individual Contributor Byline Only',
    desc: 'Every guest post must be authored by an individual industry specialist (e.g., "Alex Morgan"). Submissions with generic agency names or company brand placeholders are rejected automatically.',
    badge: 'Mandatory Policy',
    highlight: true,
  },
  {
    num: '02',
    title: 'Monthly 2 Free Publishing Slots',
    desc: 'Every registered contributor receives 2 free publishing allocations per 30-day billing period. Submissions are reviewed by our senior editorial team within 48 hours.',
    badge: 'Free Tier',
  },
  {
    num: '03',
    title: 'High-Volume Scaling ($35 / Extra Slot)',
    desc: 'Agencies and digital marketers running continuous link building or brand awareness sprints can unlock additional publication slots at $35 per post directly via their dashboard support desk.',
    badge: '$35 / Extra Post',
    highlight: true,
  },
  {
    num: '04',
    title: 'Strict 200 KB Image Compression',
    desc: 'To maintain sub-second page loads across Vaphers, every featured cover image and inline diagram must be compressed under 200 KB. Our editor provides built-in validation.',
    badge: 'Performance Standard',
  },
  {
    num: '05',
    title: 'Permanent DoFollow Editorial Backlink',
    desc: 'Approved articles feature a dedicated author bio box, links to your verified social profiles, and a contextual DoFollow backlink to your portfolio or relevant industry resource.',
    badge: 'SEO Benefit',
  },
  {
    num: '06',
    title: 'Originality & Editorial Standards',
    desc: 'Articles must be 100% original, practitioner-tested, and at least 800+ words. Vaphers retains perpetual editorial rights to refine formatting, metadata, and search targeting.',
    badge: 'Quality Standard',
  },
];

const WALKTHROUGH_STEPS = [
  {
    step: 'Step 1',
    title: 'Create Your Author Account',
    desc: 'Sign up in seconds via Clerk with Google or Email. Instantly access your private contributor desk.',
    icon: User,
  },
  {
    step: 'Step 2',
    title: 'Set Author Bio & Backlink URL',
    desc: 'Complete your personal author attribution, biographical summary, and your verified target website URL.',
    icon: PenTool,
  },
  {
    step: 'Step 3',
    title: 'Draft in Full Admin-Parity Editor',
    desc: 'Write in our TipTap suite with real-time Google SERP preview, formatted code blocks, tables, and media uploaders.',
    icon: FileText,
  },
  {
    step: 'Step 4',
    title: 'Editorial Review & Live Publishing',
    desc: 'Our editors review your submission within 48 hours. Once approved, your article goes live immediately on /blogs.',
    icon: CheckCircle2,
  },
];

export default function WriteForUsPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const lenisConfig = useMemo(() => ({ lerp: 0.1, smooth: true, wheelMultiplier: 1.3 }), []);

  useEffect(() => {
    const lenis = new Lenis(lenisConfig);
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [lenisConfig]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between overflow-x-hidden selection:bg-[#2383e2] selection:text-white font-sans">
      <NavBar />
      <PropsHero
        // 1. Badge Customization
         showBadge={true}
                badgeText="Digital Marketing & SEO Guest Post "
                badgeLink="/write-for-us/signup"
      
                // 2. Main Content
                title="Write A Post About Marketing At VAPHERS"
                description="The premier digital marketing guest post site for practitioners. Publish authoritative marketing guest posts and SEO guest posts on a high-trust platform built for performance marketing leaders."
      
                // 3. Button Customization
                showButtons={true}
                primaryBtnText="Join as Contributor"
                primaryBtnLink="/write-for-us/signup"
                secondaryBtnText="Sign In"
                secondaryBtnLink="/write-for-us/login"
      
                // 4. Image Customization (Optional)
                // imageSrc="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1770818890/ChatGPT_Image_Feb_11_2026_07_37_55_PM_q9spwb.png"
                imageAlt="Vaphers SEO Dashboard Preview"
      
                // 5. Section override (Optional)
                className="pb-20"
      />
      <MarketingGuestPostGuidelines/>
      <GuestPostBenefitsSection/>
      <MarketingGuestPostPricing/>
      <MarketingPriceCalculator/>
      <ContactSection/>
      <Footer />
    </div>
  );
}
