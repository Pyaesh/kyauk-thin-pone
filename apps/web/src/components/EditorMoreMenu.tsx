"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { useLanguage } from "@/lib/useLanguage";
import { SOURCE_CODE_VERSION_URL } from "@/lib/appUpdate";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeSwitch } from "@/components/ThemeSwitch";

export function EditorMoreMenu({ children }: { children: ReactNode }) {
  const language = useLanguage(), details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!details.current?.contains(event.target as Node) && details.current) details.current.open = false; };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return <details ref={details} className="editor-more-menu" onKeyDown={event => { if (event.key === "Escape" && details.current) { event.stopPropagation(); details.current.open = false; details.current.querySelector("summary")?.focus(); } }}>
    <summary aria-label={language === "my" ? "နောက်ထပ် ကိရိယာများနှင့် မူရင်းကုဒ်" : "More tools and source code"} title={language === "my" ? "နောက်ထပ် ကိရိယာများနှင့် မူရင်းကုဒ်" : "More tools and source code"}><ChevronDown size={24} aria-hidden="true" /></summary>
    <div className="editor-more-content"><div className="editor-more-actions" onClick={event => { if ((event.target as Element).closest("button") && details.current) details.current.open = false; }}>{children}</div><div className="editor-more-preferences"><LanguageSwitch /><ThemeSwitch /></div><div className="editor-more-links"><a href={SOURCE_CODE_VERSION_URL} target="_blank" rel="noreferrer">Source code · AGPL-3.0</a><a href="https://github.com/henmedia/layerling" target="_blank" rel="noreferrer">Based on Layerling</a><a href="https://3dpmm.confotype.com/">3DPMM</a></div></div>
  </details>;
}
