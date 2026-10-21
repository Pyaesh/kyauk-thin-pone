"use client";
import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/useLanguage";
export function CadFullscreenButton() {
  const language = useLanguage();
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(false);
  useEffect(() => { const sync = () => setActive(Boolean(document.fullscreenElement)); setAvailable(Boolean(document.fullscreenEnabled)); sync(); document.addEventListener("fullscreenchange", sync); return () => document.removeEventListener("fullscreenchange", sync); }, []);
  const label = language === "my" ? (active ? "မျက်နှာပြင်အပြည့်မှ ထွက်ရန်" : "မျက်နှာပြင်အပြည့် ပြရန်") : (active ? "Exit fullscreen" : "Enter fullscreen");
  return <button className="cad-fullscreen" type="button" disabled={!available} title={label} aria-label={label} aria-pressed={active} onClick={async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { setAvailable(Boolean(document.fullscreenEnabled)); } }}>{active ? <Minimize size={19} /> : <Maximize size={19} />}</button>;
}
