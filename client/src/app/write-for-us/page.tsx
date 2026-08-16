'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
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
  Image as ImageIcon,
  Check,
  HelpCircle,
} from 'lucide-react';

const GUIDELINES_RULES = [
  {
    num: '01',
    title: 'Individual Person Name Attribution Only',
    desc: 'You can only publish under a real individual person’s name (e.g., "Sarah Jenkins"). Company, brand, or generic agency names are strictly prohibited and will be rejected by our review team.',
    badge: 'Mandatory Policy',
    highlight: true,
  },
  {
    num: '02',
    title: 'Monthly Publishing Quota (2 Free Posts/Month)',
    desc: 'Each registered contributor receives 2 free publishing slots per 30-day billing cycle. All submissions undergo our 48-hour editorial quality review before publishing live to /blogs.',
    badge: 'Free Tier',
  },
  {
    num: '03',
    title: 'Extra Publishing Slots ($35 per Blog)',
    desc: 'If you are an agency or marketer needing more than 2 posts per month for rapid outreach sprints, you can request extra publishing slots at $35 per post via a fast-track support ticket in your dashboard.',
    badge: '$35 / Extra Post',
    highlight: true,
  },
  {
    num: '04',
    title: 'Strict 200 KB Image Size Limit',
    desc: 'To preserve lightning-fast Core Web Vitals, every featured header image and in-body screenshot must be compressed strictly under 200 KB. Our editor enforces automated pre-upload validation.',
    badge: 'Performance Rule',
  },
  {
    num: '05',
    title: 'High-Authority Permanent DoFollow Backlink',
    desc: 'Approved articles include a dedicated Author Box with your personal bio and a permanent DoFollow backlink to your personal portfolio or business website.',
    badge: 'SEO Benefit',
  },
  {
    num: '06',
    title: 'Originality & Editorial Publishing Rights',
    desc: 'Submissions must be 100% original (minimum 800+ words) and data-backed. Vaphers retains perpetual editorial and publishing rights to format, update meta tags, and optimize content for organic search rankings.',
    badge: 'Quality Standard',
  },
];

const WALKTHROUGH_STEPS = [
  {
    step: 'Step 1',
    title: 'Create Your Author Account',
    desc: 'Sign up in seconds using Clerk with Google or Email. Instantly access your personal contributor portal.',
    icon: User,
  },
  {
    step: 'Step 2',
    title: 'Configure Your Author Profile',
    desc: 'Add your individual author name, author bio, and your target website URL for your permanent DoFollow backlink.',
    icon: PenTool,
  },
  {
    step: 'Step 3',
    title: 'Draft with Full Admin-Parity Editor',
    desc: 'Write in our TipTap rich text suite with live Google SERP preview, code blocks, tables, and <200KB media uploader.',
    icon: FileText,
  },
  {
    step: 'Step 4',
    title: '48-Hour Peer Review & Publication',
    desc: 'Our editorial team reviews your draft within 48 hours. Once approved, your post is immediately published live to /blogs.',
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

      <main className="flex-grow pt-28 sm:pt-36 pb-20 space-y-24 sm:space-y-32">
        {/* Hero Section (Light Theme) */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2383e2]"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Vaphers Contributor Network &bull; 2 Free Posts / Month</span>
          </motion.div>

          {/* Heading with Bungee Shade Font */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl tracking-wide text-slate-900 leading-none uppercase font-normal"
            style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
          >
            WRITE FOR <span className="text-[#2383e2]">VAPHERS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Share your marketing, technical SEO, and engineering expertise with over <strong className="font-semibold text-slate-900">50,000+ monthly digital leaders</strong>. Earn permanent high-authority backlinks and build verified thought leadership.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/write-for-us/signup"
              className="px-7 py-3.5 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-sm font-semibold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 group cursor-pointer"
            >
              <span>Join as Contributor (Sign Up)</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/write-for-us/login"
              className="px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Sign In to Dashboard</span>
            </Link>
          </motion.div>

          {/* Quick Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6"
          >
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-2xl font-bold text-slate-900">2 Blogs</span>
              <span className="text-xs text-slate-500 block font-medium">Free Monthly Quota</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-2xl font-bold text-[#2383e2]">$35</span>
              <span className="text-xs text-slate-500 block font-medium">Extra Slot / Post</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-2xl font-bold text-emerald-600">48 Hours</span>
              <span className="text-xs text-slate-500 block font-medium">Peer Review Window</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
              <span className="text-2xl font-bold text-amber-600">DoFollow</span>
              <span className="text-xs text-slate-500 block font-medium">Permanent Backlink</span>
            </div>
          </motion.div>
        </section>

        {/* Guidelines & Rules Section (Light Theme) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              EDITORIAL <span className="text-[#2383e2]">RULES &amp; GUIDELINES</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
              We uphold strict editorial integrity. Please review our mandatory guidelines prior to submitting your draft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDELINES_RULES.map((rule, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 space-y-3.5 ${
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
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Walkthrough Section (Light Theme) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              HOW IT <span className="text-[#2383e2]">WORKS</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
              From account signup to live publication in 4 simple steps.
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

        {/* Pricing & Quota Section (Light Theme) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2
              className="text-3xl sm:text-5xl text-slate-900 tracking-wide uppercase leading-none font-normal"
              style={{ fontFamily: 'var(--font-bungee-shade), "Bungee Shade", cursive' }}
            >
              PUBLISHING <span className="text-[#2383e2]">QUOTAS</span>
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Transparent, fair contributor slots with agency scaling options.
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
                  <span><strong>2 Guest Articles</strong> per 30-day cycle</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Permanent DoFollow author backlink</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Full admin TipTap rich editor suite</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Standard 48-hour editorial review</span>
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
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#2383e2] text-white">
                AGENCY SPRINT
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
                  <span>Instant ticket request via Contributor Dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Priority 24-hour expedited editorial review</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span>Dedicated agency support channel</span>
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
