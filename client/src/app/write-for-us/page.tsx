'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
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

      <main className="flex-grow pt-28 sm:pt-32 pb-20 space-y-20 sm:space-y-28">
        {/* ── Signature Vaphers Hero Section ── */}
        <section className="relative mx-auto flex max-w-full flex-col items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600 lg:-mt-24 lg:pt-36 lg:pb-20 lg:mx-4 lg:rounded-4xl text-center px-4 overflow-hidden shadow-2xl">
          {/* Subtle Grid / Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(35,131,226,0.35),transparent_70%)] pointer-events-none" />

          {/* Top Pill matching Home & Services Hero */}
          <div className="relative z-10 border border-blue-400/40 bg-blue-900/40 backdrop-blur-md p-1.5 px-4 rounded-full flex items-center gap-3 mb-6 shadow-sm">
            <span className="text-xs sm:text-sm font-medium text-blue-100 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>Digital Marketing &amp; SEO Guest Post Network</span>
            </span>
            <Link
              href="/write-for-us/signup"
              className="w-6 h-6 rounded-full flex justify-center items-center bg-blue-500 hover:bg-blue-400 transition-colors"
              aria-label="Join Contributor Network"
            >
              <ArrowRight size={13} className="text-white" />
            </Link>
          </div>

          {/* Main Hero Heading in Bungee Shade */}
          <div className="relative z-10 max-w-5xl mx-auto px-2 space-y-4">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-slate-100 uppercase tracking-wide leading-none"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              WRITE FOR <span className="text-[#60a5fa]">VAPHERS</span>
            </h1>

            {/* Keyword-Rich Subheading */}
            <p className="max-w-2xl mx-auto text-sm sm:text-lg text-blue-100/90 font-normal leading-relaxed">
              The premier <strong className="font-semibold text-white">digital marketing guest post site</strong> for practitioners. Publish authoritative <strong className="font-semibold text-white">marketing guest posts</strong> and <strong className="font-semibold text-white">SEO guest posts</strong> on a high-trust platform built for <strong className="font-semibold text-white">performance marketing</strong> leaders.
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mx-auto">
            <Link href="/write-for-us/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-60 rounded-xl bg-white px-6 py-3 font-semibold text-blue-900 transition-all hover:bg-blue-50 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 text-sm shadow-md">
                <span>Join as Contributor</span>
                <ArrowRight size={15} />
              </button>
            </Link>

            <Link href="/write-for-us/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-60 rounded-xl border border-blue-300/50 bg-blue-950/40 backdrop-blur-sm px-6 py-3 font-semibold text-white transition-all hover:bg-blue-900/60 cursor-pointer text-sm">
                <span>Sign In to Dashboard</span>
              </button>
            </Link>
          </div>

          {/* Metrics Showcase Bar */}
          <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-0.5">
              <span className="text-xl sm:text-2xl font-bold block">2 Free Posts</span>
              <span className="text-[11px] sm:text-xs text-blue-200 block">Monthly Free Quota</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-0.5">
              <span className="text-xl sm:text-2xl font-bold block">$35 / Post</span>
              <span className="text-[11px] sm:text-xs text-blue-200 block">Agency Extra Slots</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-0.5">
              <span className="text-xl sm:text-2xl font-bold block">48 Hours</span>
              <span className="text-[11px] sm:text-xs text-blue-200 block">Editorial Review</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white space-y-0.5">
              <span className="text-xl sm:text-2xl font-bold block">DoFollow</span>
              <span className="text-[11px] sm:text-xs text-blue-200 block">Permanent Backlink</span>
            </div>
          </div>
        </section>

        {/* ── Topic Focus: What We Publish (SEO, Performance Marketing, Digital Strategy) ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2383e2] font-mono">
              Editorial Scope
            </span>
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              TOPICS <span className="text-[#2383e2]">WE ACCEPT</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal">
              We focus exclusively on data-backed, practical marketing insights that educate founders, search specialists, and growth engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOPIC_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/40 hover:shadow-md transition-all space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2383e2] flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#1a6cb8] border border-blue-100 font-mono">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Guidelines & Rules Section ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2383e2] font-mono">
              Editorial Standards
            </span>
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              EDITORIAL <span className="text-[#2383e2]">RULES &amp; POLICIES</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal">
              To protect organic search rankings and ensure maximum backlink value for our contributors, every post adheres to clear editorial rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDELINES_RULES.map((rule, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 space-y-3 ${
                  rule.highlight
                    ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2383e2] font-semibold">{rule.num}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      rule.highlight
                        ? 'bg-[#2383e2] text-white'
                        : 'bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {rule.badge}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4-Step Walkthrough Section ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2383e2] font-mono">
              Submission Process
            </span>
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              HOW IT <span className="text-[#2383e2]">WORKS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal">
              Seamless end-to-end publishing pipeline from draft to live indexation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WALKTHROUGH_STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all space-y-3 text-left group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2383e2] flex items-center justify-center group-hover:bg-[#2383e2] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-mono text-[#2383e2] block uppercase font-semibold">
                    {s.step}
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Publishing Quotas & Scale Tiers ── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2383e2] font-mono">
              Contributor Plans
            </span>
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              PUBLISHING <span className="text-[#2383e2]">QUOTAS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Fair, permanent publication slots for independent writers and agency teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier Card */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  Individual Contributors
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 font-normal">/ Free forever</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>2 Guest Articles</strong> per 30-day rolling window</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Permanent DoFollow author backlink</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Full TipTap rich text editor with live SERP preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Standard 48-hour editorial peer review</span>
                </li>
              </ul>
              <Link
                href="/write-for-us/signup"
                className="block text-center py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Sign Up Free &rarr;
              </Link>
            </div>

            {/* Extra Slot Agency Card */}
            <div className="p-8 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#2383e2] text-white font-mono">
                AGENCY SCALE
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-[#1a6cb8]">
                  Extra Publication Slots
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#2383e2]">$35</span>
                  <span className="text-xs text-slate-500 font-normal">/ extra article</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span><strong>Unlimited extra slots</strong> beyond the 2 free/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>1-Click support ticket boost from Contributor Dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Expedited priority editorial review (24 hours)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Dedicated editorial communication channel</span>
                </li>
              </ul>
              <Link
                href="/write-for-us/signup"
                className="block text-center py-3 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Get Started &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
