// Shared language types and constants
export type LanguageCode = "en" | "pt" | "es" | "ru" | "de" | "ja" | "ko" | "id" | "th" | "hi";

export interface Language {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English",            nativeLabel: "English",          flag: "🇺🇸" },
  { code: "pt", label: "Portuguese (Brazil)", nativeLabel: "Português (Brasil)", flag: "🇧🇷" },
  { code: "es", label: "Spanish",            nativeLabel: "Español",          flag: "🇪🇸" },
  { code: "ru", label: "Russian",            nativeLabel: "Русский",          flag: "🇷🇺" },
  { code: "de", label: "German",             nativeLabel: "Deutsch",          flag: "🇩🇪" },
  { code: "ja", label: "Japanese",           nativeLabel: "日本語",            flag: "🇯🇵" },
  { code: "ko", label: "Korean",             nativeLabel: "한국어",            flag: "🇰🇷" },
  { code: "id", label: "Indonesian",         nativeLabel: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "th", label: "Thai",              nativeLabel: "ภาษาไทย",           flag: "🇹🇭" },
  { code: "hi", label: "Hindi",             nativeLabel: "हिन्दी",             flag: "🇮🇳" },
];

export const LS_KEY = "geminiWatermarkLang";
export const LS_PROMPT_DISMISSED_KEY = "geminiWatermarkPromptDismissed";
