"use client";

import React from "react";
import { Globe, X, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { LANGUAGES } from "./languageTypes";

// Native prompts for detected languages
const NATIVE_PROMPTS: Record<string, { prompt: string; action: string }> = {
  hi: { prompt: "क्या आप इस पेज का हिन्दी में अनुवाद देखना चाहते हैं?", action: "हिन्दी में अनुवाद करें" },
  pt: { prompt: "Deseja traduzir esta página para o Português?", action: "Traduzir para Português" },
  es: { prompt: "¿Desea traducir esta página al Español?", action: "Traducir al Español" },
  ru: { prompt: "Перевести эту страницу на русский язык?", action: "Перевести на русский" },
  de: { prompt: "Möchten Sie diese Seite auf Deutsch übersetzen?", action: "Auf Deutsch übersetzen" },
  ja: { prompt: "このページを日本語に翻訳しますか？", action: "日本語に翻訳" },
  ko: { prompt: "이 페이지를 한국어로 번역하시겠습니까?", action: "한국어로 번역" },
  id: { prompt: "Terjemahkan halaman ini ke Bahasa Indonesia?", action: "Terjemahkan" },
  th: { prompt: "ต้องการแปลหน้านี้เป็นภาษาไทยหรือไม่?", action: "แปลเป็นภาษาไทย" },
};

export default function LanguagePromptBanner() {
  const { lang, setLang, detectedLocalLang, showTranslatePrompt, dismissTranslatePrompt } = useLanguage();

  if (!showTranslatePrompt || !detectedLocalLang || lang !== "en") {
    return null;
  }

  const detectedInfo = LANGUAGES.find((l) => l.code === detectedLocalLang);
  if (!detectedInfo) return null;

  const nativeData = NATIVE_PROMPTS[detectedLocalLang] || {
    prompt: `Translate this page to ${detectedInfo.nativeLabel}?`,
    action: `Translate to ${detectedInfo.nativeLabel}`,
  };

  return (
    <div
      role="banner"
      aria-label="Language translation recommendation"
      className="sticky top-0 z-[100] w-full bg-slate-900 text-white shadow-md border-b border-slate-800 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
        
        {/* Left side: Google Translate icon + message */}
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <p className="text-slate-200 font-medium">
            <span className="text-base mr-1.5">{detectedInfo.flag}</span>
            <span>{nativeData.prompt}</span>
          </p>
        </div>

        {/* Right side: Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLang(detectedLocalLang)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-sm transition-all text-xs cursor-pointer hover:scale-105"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            {nativeData.action}
          </button>
          
          <button
            type="button"
            onClick={dismissTranslatePrompt}
            className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition-colors text-xs cursor-pointer border border-slate-700"
          >
            English
          </button>

          <button
            type="button"
            onClick={dismissTranslatePrompt}
            aria-label="Dismiss translation banner"
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
