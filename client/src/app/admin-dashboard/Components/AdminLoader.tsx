"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface AdminLoaderProps {
  message?: string;
  className?: string;
}

export default function AdminLoader({ message, className = "" }: AdminLoaderProps) {
  return (
    <div className={`flex-1 w-full h-full min-h-[75vh] flex flex-col items-center justify-center bg-slate-50 text-slate-900 montserrat-regular py-12 px-4 ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      ` }} />
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <h1 className="text-4xl sm:text-5xl tracking-tight leading-none text-slate-900 select-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
          V<span className="text-[#2383e2]">aphers</span>
        </h1>
        <Loader2 className="animate-spin text-[#2383e2] mt-6" size={32} />
        {message && <p className="text-xs sm:text-sm text-slate-500 montserrat-medium mt-4">{message}</p>}
      </div>
    </div>
  );
}
