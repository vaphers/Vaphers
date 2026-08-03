"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LANGUAGES, LS_KEY, LS_PROMPT_DISMISSED_KEY } from "./languageTypes";
import type { LanguageCode } from "./languageTypes";

// Detect user's browser language (returns null if English or unsupported)
function detectBrowserLanguage(): LanguageCode | null {
  if (typeof navigator === "undefined") return null;
  const rawLang = (navigator.language || "").toLowerCase();
  const primary = rawLang.split("-")[0];

  // Specific check for Portuguese (Brazil) or general Portuguese
  if (primary === "pt") return "pt";

  const supportedCodes = LANGUAGES.map((l) => l.code).filter((c) => c !== "en") as string[];
  if (supportedCodes.includes(primary)) {
    return primary as LanguageCode;
  }
  return null;
}

// Get initial language strictly: localStorage choice OR fallback strictly to "en"
function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LS_KEY) as LanguageCode | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      return stored;
    }
  } catch (e) {
    console.error("Failed to read localStorage:", e);
  }
  // Default is ALWAYS English unless explicitly chosen previously
  return "en";
}

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
  detectedLocalLang: LanguageCode | null;
  showTranslatePrompt: boolean;
  dismissTranslatePrompt: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  detectedLocalLang: null,
  showTranslatePrompt: false,
  dismissTranslatePrompt: () => {},
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

// Import all translation dictionaries
import { en } from "./translations/en";
import { pt } from "./translations/pt";
import { es } from "./translations/es";
import { ru } from "./translations/ru";
import { de } from "./translations/de";
import { ja } from "./translations/ja";
import { ko } from "./translations/ko";
import { id } from "./translations/id";
import { th } from "./translations/th";
import { hi } from "./translations/hi";

const dictionaries: Record<LanguageCode, Record<string, string>> = {
  en, pt, es, ru, de, ja, ko, id, th, hi,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");
  const [detectedLocalLang, setDetectedLocalLang] = useState<LanguageCode | null>(null);
  const [showTranslatePrompt, setShowTranslatePrompt] = useState<boolean>(false);

  // Initialize on mount
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLangState(initialLang);

    // Detect browser local language
    const detected = detectBrowserLanguage();
    setDetectedLocalLang(detected);

    // Show Google Translate style prompt if:
    // 1. Current language is English
    // 2. User's browser is in another supported language (e.g. Hindi, Spanish, Portuguese)
    // 3. User hasn't dismissed the prompt before
    // 4. User hasn't explicitly chosen English in localStorage
    try {
      const explicitChoice = localStorage.getItem(LS_KEY);
      const isDismissed = localStorage.getItem(LS_PROMPT_DISMISSED_KEY);
      if (!explicitChoice && !isDismissed && detected && detected !== "en" && initialLang === "en") {
        setShowTranslatePrompt(true);
      }
    } catch (e) {
      console.error("localStorage error:", e);
    }
  }, []);

  const setLang = useCallback((code: LanguageCode) => {
    setLangState(code);
    setShowTranslatePrompt(false);
    try {
      localStorage.setItem(LS_KEY, code);
      localStorage.setItem(LS_PROMPT_DISMISSED_KEY, "true");
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }, []);

  const dismissTranslatePrompt = useCallback(() => {
    setShowTranslatePrompt(false);
    try {
      localStorage.setItem(LS_PROMPT_DISMISSED_KEY, "true");
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = dictionaries[lang] || dictionaries.en;
      return dict[key] || dictionaries.en[key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        detectedLocalLang,
        showTranslatePrompt,
        dismissTranslatePrompt,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
