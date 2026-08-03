"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { LANGUAGES } from "./languageTypes";
import type { Language, LanguageCode } from "./languageTypes";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, detectedLocalLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const selectLanguage = (code: LanguageCode) => {
    setLang(code);
    setOpen(false);
  };

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={containerRef} className={`relative ${className}`} id="lang-switcher">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold text-gray-800 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-500 transition-colors duration-200 outline-none select-none cursor-pointer"
      >
        <Globe className="w-4 h-4 shrink-0 text-blue-600" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="max-w-[110px] truncate">{current.nativeLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-2 w-64 bg-white border border-blue-500 rounded-2xl overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Select Language
            </span>
            <Globe className="w-3.5 h-3.5 text-blue-500" />
          </div>

          <ul className="py-1.5 max-h-80 overflow-y-auto divide-y divide-gray-50">
            {LANGUAGES.map((langItem) => {
              const isActive = langItem.code === lang;
              const isDetected = detectedLocalLang === langItem.code && langItem.code !== "en";

              return (
                <li key={langItem.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectLanguage(langItem.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "bg-blue-50/90 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg leading-none shrink-0">{langItem.flag}</span>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="block truncate font-medium">{langItem.nativeLabel}</span>
                        {isDetected && !isActive && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                            <Sparkles className="w-2.5 h-2.5" /> Local
                          </span>
                        )}
                      </div>
                      <span className="block text-[11px] text-gray-400 truncate">{langItem.label}</span>
                    </div>
                    {isActive && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
