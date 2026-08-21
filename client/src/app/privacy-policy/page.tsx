'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import NavBar from '@/PageComponents/Global Components/Header';
import Footer from '@/PageComponents/Global Components/Footer';
import { ShieldCheck, Lock, FileText, Globe, Eye, Server, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const lenisConfig = useMemo(() => ({ lerp: 0.1, smooth: true, wheelMultiplier: 1.3 }), []);

  useEffect(() => {
    const lenis = new Lenis(lenisConfig);
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
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
            <ShieldCheck size={14} />
            <span>Official Legal Document &bull; Last Updated August 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            At Vaphers (accessible from https://www.vaphers.com), one of our main priorities is the privacy of our visitors, clients, and guest contributors. This Privacy Policy document outlines the types of information we collect, how we communicate with authors, and how your data is protected.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">1.</span> Information We Collect
            </h2>
            <p>
              When you use our services, create a contributor account, or submit articles, we collect personal and analytical information to provide our services securely:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Contributor Profile Details:</strong> Your name, email address, author biography, and portfolio website provided during account registration and editor setup via Clerk Authentication.
              </li>
              <li>
                <strong>Submitted Content &amp; Drafts:</strong> Blog text, draft articles, featured imagery, custom metadata, and contextual backlink target domains submitted for publication.
              </li>
              <li>
                <strong>Transaction &amp; Payment Data:</strong> Payment order IDs, transaction statuses, and payment receipts processed via Razorpay. We do not store full credit card or banking numbers on our servers.
              </li>
              <li>
                <strong>Technical &amp; Log Data:</strong> IP address, browser type, referring URLs, timestamps, and interaction telemetry to monitor performance and prevent multi-account spam abuse.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">2.</span> How We Use Your Information
            </h2>
            <p>We use the collected information for the following specific operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>To host, publish, and index approved articles on <Link href="/blogs" className="text-[#2383e2] hover:underline">/blogs</Link> with accurate author attribution.</li>
              <li>To process one-time article publication payments securely via Razorpay.</li>
              <li>To maintain anti-abuse protections, preventing search manipulation, duplicate target domain stuffing, and fraudulent registration networks.</li>
              <li>To enable real-time editorial communication through the Contributor Support Desk.</li>
              <li>To analyze aggregate traffic, improve Core Web Vitals, and enhance platform performance.</li>
            </ul>
          </section>

          {/* Section 3: Contributor Email Communications & Draft Reminders */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">3.</span> Contributor Email Communications &amp; Draft Reminders
            </h2>
            <p>
              When you register as a contributor and create article drafts on Vaphers, we may use your registered email address to send essential service-related and editorial communications, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Draft Follow-Ups &amp; Reminders:</strong> Friendly notifications regarding unfinished article drafts saved in your editor to assist you in completing and publishing your post.</li>
              <li><strong>Editorial Review &amp; Resolution Tickets:</strong> Notices when an editor leaves feedback, requests guideline revisions, or opens a resolution ticket on a submission.</li>
              <li><strong>Publication &amp; Payment Confirmations:</strong> Transaction receipts, live indexation links, and permanent backlink verifications.</li>
            </ul>
            <p className="text-slate-600">
              We respect your inbox. You may opt out of non-essential draft reminders at any time by replying directly to the email or by contacting our team at <a href="mailto:privacy@vaphers.com" className="text-[#2383e2] font-semibold hover:underline">privacy@vaphers.com</a>.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">4.</span> Payment Security &amp; Razorpay Processing
            </h2>
            <p>
              Publication fees for guest articles are processed via **Razorpay Payment Gateway**. Razorpay adheres to the strict security standards set by PCI-DSS (Payment Card Industry Data Security Standard) managed by the PCI Security Standards Council.
            </p>
            <p>
              Your payment credentials are encrypted directly through Razorpay’s secure checkout. Vaphers only retains transaction verification identifiers (`razorpay_payment_id`, `razorpay_order_id`) to confirm publication entitlement.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">5.</span> Third-Party Service Providers
            </h2>
            <p>
              We utilize trusted industry-standard infrastructure partners to operate Vaphers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs mb-1">Clerk Authentication</span>
                <p className="text-[11px] text-slate-500">Secure user account identity, session tokens, and OAuth Google authentication.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs mb-1">Razorpay</span>
                <p className="text-[11px] text-slate-500">Encrypted payment gateway handling publication transactions.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs mb-1">Google Cloud &amp; Firebase</span>
                <p className="text-[11px] text-slate-500">Encrypted database storage and reliable content delivery infrastructure.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs mb-1">Vercel Inc.</span>
                <p className="text-[11px] text-slate-500">Global edge hosting network and SSL/TLS endpoint encryption.</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">6.</span> Cookies &amp; Tracking Technologies
            </h2>
            <p>
              Vaphers uses essential cookies to maintain contributor login sessions, remember draft autosaves, and monitor platform performance. You can choose to disable cookies through your individual browser settings; however, disabling essential cookies may impact account access and editor functionality.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">7.</span> Contributor Rights &amp; Data Deletion
            </h2>
            <p>
              You have the right to access, update, or request the deletion of your personal author profile data at any time. To request data deletion or inquire regarding stored information, you may contact our editorial privacy desk at <a href="mailto:privacy@vaphers.com" className="text-[#2383e2] hover:underline font-semibold">privacy@vaphers.com</a> or via the Contributor Dashboard support desk.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#2383e2]">8.</span> Updates to This Policy
            </h2>
            <p>
              We may update our Privacy Policy periodically to reflect technological improvements or regulatory requirements. Any modifications will be posted directly on this page with an updated revision date.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
