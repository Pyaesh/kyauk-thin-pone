"use client";
import { setLanguage } from "@/lib/i18n";
import { useLanguage } from "@/lib/useLanguage";
export function LanguageSwitch() {
  const language = useLanguage();
  const next = language === "my" ? "en" : "my";
  return <button type="button" className="cad-language-toggle" aria-label={next === "en" ? "Switch to English" : "မြန်မာဘာသာသို့ ပြောင်းရန်"} title={next === "en" ? "Switch to English" : "မြန်မာဘာသာသို့ ပြောင်းရန်"} onClick={() => setLanguage(next)}>{language === "my" ? "MM" : "EN"}</button>;
}
