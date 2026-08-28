'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import { FileCheck, ShieldAlert, DollarSign, Scale, UserCheck, AlertTriangle } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const lenisConfig = useMemo(() => ({ lerp: 0.1, smooth: true, wheelMultiplier: 1.3 }), []);
  const [price, setPrice] = useState<number>(25);

  useEffect(() => {
    fetch('/api/guest/pricing')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.price === 'number') setPrice(d.price);
      })
      .catch(() => {});
  }, []);

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

      <main className="flex-grow pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="space-y-4 border-b border-slate-200 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2383e2]">
            <Scale size={14} />
            <span>Contributor &amp; Service Agreement &bull; Effective August 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            Welcome to Vaphers. By accessing our platform, registering as a guest author, submitting content, or utilizing our marketing services, you agree to comply with and be bound by the following terms and editorial guidelines.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1: Guest Post Publishing & Fee */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">1.</span> Guest Post Publishing Fee (${Number(price).toFixed(2)}) &amp; Payment Terms
            </h2>
            <p>
              Vaphers operates a paid publication infrastructure for digital marketing, performance marketing, and SEO guest contributions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Drafting is Free:</strong> Registered contributors may compose, edit, format, and store an unlimited number of article drafts within their dashboard editor at no cost.
              </li>
              <li>
                <strong>Publication Fee:</strong> To publish a specific article live on <Link href="/blogs" className="text-[#2383e2] hover:underline font-semibold">/blogs</Link>, a one-time, non-refundable publication fee of **${Number(price).toFixed(2)} USD** is payable per article via our integrated Razorpay payment gateway.
              </li>
              <li>
                <strong>Instant Publishing:</strong> Upon successful transaction verification, the article is published live and queued for search engine indexation immediately.
              </li>
              <li>
                <strong>Refund Policy:</strong> Because publishing grants instant public distribution, server hosting, and permanent backlink attribution, all completed ${price % 1 === 0 ? price : price.toFixed(2)} publication transactions are final and non-refundable.
              </li>
            </ul>
          </section>

          {/* Section 2: Individual Author Byline Policy */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">2.</span> Mandatory Individual Author Attribution
            </h2>
            <p>
              To maintain genuine thought leadership and comply with Google E-E-A-T search quality guidelines:
            </p>
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1 text-amber-950">
              <span className="font-semibold block text-xs">Real Person Rule:</span>
              <p className="text-xs">
                Articles must be attributed to an individual human author with a real name (e.g., "Daniel Croft"). Attributing articles to company names, business aliases, or generic keyword placeholders (e.g., "Best SEO Agency LLC") is strictly prohibited and subject to immediate editorial revision tickets.
              </p>
            </div>
          </section>

          {/* Section 3: Post Dispute & Resolution Ticket System */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">3.</span> Post-Publication Editorial Audits &amp; Ticket Resolution
            </h2>
            <p>
              While articles publish instantly upon payment, Vaphers maintains active quality oversight:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Admin Editorial Tickets:</strong> If a published article violates guidelines (e.g., broken links, spammy keyword stuffing, misleading claims, non-compliant imagery), our editorial team will open a **Post Resolution Ticket** directly linked to the article in the Contributor Support Desk.
              </li>
              <li>
                <strong>Contributor Revision Window:</strong> The author has 7 calendar days to revise the article according to ticket guidelines.
              </li>
              <li>
                <strong>Admin Modification &amp; Takedown Rights:</strong> Vaphers retains perpetual editorial rights to modify metadata, optimize formatting, update broken links, or unpublish content that fails to meet quality standards after notice.
              </li>
              <li>
                <strong>Contributor-Initiated Tickets:</strong> Authors may open a ticket on any of their posts at any time to request updates, slug corrections, or author bio refinements.
              </li>
            </ul>
          </section>

          {/* Section 4: Content Standards & Prohibitions */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">4.</span> Prohibited Content &amp; Spam Guidelines
            </h2>
            <p>We enforce zero tolerance for the following categories. Submissions containing these will be removed immediately without refund:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Plagiarized, copied, or scraper-generated content with no original practitioner insight.</li>
              <li>Online gambling, casinos, betting, sportsbooks, or crypto wagering.</li>
              <li>Adult content, escort services, or explicit materials.</li>
              <li>Payday loans, high-risk predatory financing, or get-rich-quick schemes.</li>
              <li>Illicit pharmaceuticals, restricted substances, or weapons.</li>
              <li>Malware distribution, deceptive affiliate redirect chains, or phishing links.</li>
            </ul>
          </section>

          {/* Section 5: Image Performance Standards */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">5.</span> Technical Media Guidelines (200 KB Limit)
            </h2>
            <p>
              All uploaded cover images and in-body screenshots must be optimized and compressed strictly under **200 KB** to preserve Core Web Vitals and mobile responsiveness across the network.
            </p>
          </section>

          {/* Section 6: Permanent DoFollow Backlink Guarantee */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">6.</span> Permanent DoFollow Backlink Guarantee
            </h2>
            <p>
              For all compliant articles, Vaphers guarantees permanent live indexation, author bio attribution, and active contextual DoFollow backlink preservation for the lifetime of the platform, subject to target domains remaining active, secure (HTTPS), and compliant with search engine webmaster guidelines.
            </p>
          </section>

          {/* Section 7: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">7.</span> Limitation of Liability
            </h2>
            <p>
              Vaphers shall not be held liable for any indirect, incidental, or consequential damages resulting from search engine algorithmic rank fluctuations, third-party indexing latency, or temporary server maintenance.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
