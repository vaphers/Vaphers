'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignUp } from '@clerk/nextjs';

export default function ContributorSignupPage() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white libre-franklin-regular">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        .libre-franklin-regular { font-family: 'Libre Franklin', sans-serif !important; font-weight: 400 !important; }
        .libre-franklin-medium { font-family: 'Libre Franklin', sans-serif !important; font-weight: 500 !important; }
        .libre-franklin-semibold { font-family: 'Libre Franklin', sans-serif !important; font-weight: 600 !important; }

        /* Flatten Clerk Card to integrate completely into the page */
        .cl-rootBox, .cl-cardBox, .cl-card, .cl-main {
          box-shadow: none !important;
          border: none !important;
          background: transparent !important;
          background-color: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .cl-header, .cl-footer, .cl-internal-1dauvpw {
          display: none !important;
        }
        .cl-socialButtonsBlockButton {
          border: 1px solid #e2e8f0 !important;
          background: #ffffff !important;
          border-radius: 12px !important;
          height: 42px !important;
          font-weight: 500 !important;
          font-size: 13px !important;
          color: #1e293b !important;
          transition: background-color 0.2s ease !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03) !important;
        }
        .cl-socialButtonsBlockButton:hover {
          background-color: #f8fafc !important;
        }
        .cl-formFieldInput {
          background-color: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          font-size: 13px !important;
          color: #0f172a !important;
          padding: 10px 14px !important;
          transition: all 0.2s ease !important;
        }
        .cl-formFieldInput:focus {
          background-color: #ffffff !important;
          border-color: #2383e2 !important;
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(35, 131, 226, 0.15) !important;
        }
        .cl-formButtonPrimary {
          background-color: #2383e2 !important;
          border-radius: 12px !important;
          height: 42px !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          color: #ffffff !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
          transition: background-color 0.2s ease !important;
        }
        .cl-formButtonPrimary:hover {
          background-color: #1a6cb8 !important;
        }
        .cl-formFieldLabel {
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #334155 !important;
          margin-bottom: 4px !important;
        }
        .cl-dividerLine {
          background-color: #e2e8f0 !important;
        }
        .cl-dividerText {
          color: #94a3b8 !important;
          font-size: 12px !important;
        }
      `,
        }}
      />

      {/* Left 50%: High-Res Editorial Pinterest Visual */}
      <div className="hidden md:block w-1/2 h-full relative shrink-0 overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/f7/bc/67/f7bc67b17ef58de479c02c7f7ea323f1.jpg"
          alt="Vaphers Editorial Desk"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 flex flex-col justify-between p-10 lg:p-14 text-white z-10">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="Vaphers"
              width={140}
              height={36}
              priority
              className="w-auto h-8 brightness-0 invert"
            />
          </Link>

          <div className="space-y-3 max-w-md">
            <span className="px-3 py-1 rounded-full text-xs libre-franklin-medium bg-white/20 backdrop-blur-md border border-white/25 text-white inline-block">
              Author Community
            </span>
            <h2 className="text-2xl lg:text-3xl libre-franklin-semibold leading-tight text-white">
              Write. Publish. Rank.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light">
              Join 1,200+ industry contributors. Share authoritative digital marketing, SEO, and technical insights with guaranteed DoFollow backlinks.
            </p>
          </div>
        </div>
      </div>

      {/* Right 50%: Flat, Non-Popping Sign Up Section */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Vaphers"
              width={130}
              height={34}
              priority
              className="w-auto h-7"
            />
          </Link>
          <div className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link
              href="/write-for-us/login"
              className="text-[#2383e2] hover:underline libre-franklin-medium font-semibold"
            >
              Sign in &rarr;
            </Link>
          </div>
        </div>

        <div className="max-w-sm w-full mx-auto my-auto py-6">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl libre-franklin-semibold text-slate-900 tracking-tight">
              Join as a Contributor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Create your author account to start drafting and submitting technical articles.
            </p>
          </div>

          <SignUp
            routing="hash"
            signInUrl="/write-for-us/login"
            fallbackRedirectUrl="/write-for-us/dashboard"
          />

          <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
            <strong>Editorial Rights Agreement:</strong> By creating an account, you acknowledge that Vaphers holds editorial and publishing review rights over submitted articles.
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400 pt-4 border-t border-slate-100">
          Vaphers Editorial Contributor Network &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
