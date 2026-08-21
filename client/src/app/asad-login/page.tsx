'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AsadLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Hard refresh ensures Middleware catches the new cookie
        window.location.href = '/admin-dashboard';
      } else {
        setErrorMsg(data.error || 'Invalid email or password.');
      }
    } catch (error: any) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white libre-franklin-regular">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        .libre-franklin-regular { font-family: 'Libre Franklin', sans-serif !important; font-weight: 400 !important; }
        .libre-franklin-medium { font-family: 'Libre Franklin', sans-serif !important; font-weight: 500 !important; }
        .libre-franklin-semibold { font-family: 'Libre Franklin', sans-serif !important; font-weight: 600 !important; }
      `,
        }}
      />

      {/* Left 50%: High-Res Editorial Pinterest Banner */}
      <div className="hidden md:block w-1/2 h-full relative shrink-0 overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/f7/bc/67/f7bc67b17ef58de479c02c7f7ea323f1.jpg"
          alt="Vaphers Admin Workspace"
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
            <span className="px-3 py-1 rounded-full text-xs libre-franklin-medium bg-white/20 backdrop-blur-md border border-white/25 text-white inline-flex items-center gap-1.5">
              <ShieldCheck size={13} />
              <span>Admin Studio</span>
            </span>
            <h2 className="text-2xl lg:text-3xl libre-franklin-semibold leading-tight text-white">
              Control center for publishing, editorial tickets, and pricing.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light">
              Secure administrative access for managing Vaphers blogs, performance marketing, and contributor workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Right 50%: Flat, Non-Popping Login Form */}
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
            Contributor?{' '}
            <Link
              href="/write-for-us/login"
              className="text-[#2383e2] hover:underline libre-franklin-medium font-semibold"
            >
              Contributor Login &rarr;
            </Link>
          </div>
        </div>

        <div className="max-w-sm w-full mx-auto my-auto py-6">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl libre-franklin-semibold text-slate-900 tracking-tight">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Enter your administrative credentials to access the control panel.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-700 block libre-franklin-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vaphers.com"
                required
                disabled={isLoading}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2383e2] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-700 block libre-franklin-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#2383e2] focus:outline-none focus:ring-2 focus:ring-blue-500/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#2383e2] hover:bg-[#1a6cb8] text-white rounded-xl h-11 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-60 cursor-pointer libre-franklin-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Log In to Admin Studio</span>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-[11px] text-slate-400 pt-4 border-t border-slate-100">
          Vaphers Admin Management &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}