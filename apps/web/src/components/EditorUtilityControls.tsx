"use client";
import { Settings, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";

export function EditorUtilityControls() {
  const language = useLanguage();
  const profile = useRef<HTMLDialogElement>(null);
  return <div className="editor-utility-box">
    <button className="editor-profile-control" aria-label={language === "my" ? "အသုံးပြုသူ ပရိုဖိုင်" : "User profile"} title={language === "my" ? "အသုံးပြုသူ ပရိုဖိုင်" : "User profile"} onClick={() => profile.current?.showModal()}><UserRound size={24} aria-hidden="true" /></button>
    <button className="editor-settings-control" aria-label={t("editor.workspaceSettings")} title={t("editor.workspaceSettings")} onClick={() => window.dispatchEvent(new Event("layerling:open-workspace-settings"))}><Settings size={24} aria-hidden="true" /></button>
    {typeof document !== "undefined" && createPortal(<dialog ref={profile} className="editor-profile-dialog" aria-labelledby="editor-profile-title"><button className="profile-close" aria-label={language === "my" ? "ပိတ်မယ်" : "Close"} onClick={() => profile.current?.close()}><X size={22} /></button><UserRound size={32} /><h2 id="editor-profile-title">{language === "my" ? "ဧည့်သည်" : "Guest"}</h2><p>{language === "my" ? "အကောင့်မဝင်ဘဲ သုံးနေသည်။ ပုံစံများကို ဤ browser ထဲတွင် သိမ်းထားသည်။ အခြားစက်တွင် ဖွင့်ရန် ဖိုင်ထုတ်ပြီး သိမ်းယူနိုင်သည်။" : "You are using the editor as a guest. Designs are saved in this browser. Export a project file to open it on another device."}</p></dialog>, document.body)}
  </div>;
}

export function TapeMeasureIcon({ size = 26, strokeWidth = 2.2 }: { size?: number; strokeWidth?: number; "aria-hidden"?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 19V10a7 7 0 0 1 14 0v9H3Zm14-8h5v10M17 17h5M7 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" /></svg>;
}

export function WorkplanePlacementIcon({ size = 25 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 16 13-7 5 5-13 7zM9 12 7 5l7-3 3 8" /></svg>;
}
export function DropToPlaneIcon({ size = 25 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v8m-3-3 3 3 3-3M6 13h12l2 7H4zm-3 9h18M8 13v3m4-3v3m4-3v3" /></svg>;
}

export function HomeViewIcon() { return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path fill="#aed8cf" d="m3 13 11-10 11 10-3 0v12h-6v-8h-4v8H6V13z" /></svg>; }
export function FitViewIcon() { return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9V4h5m10 0h5v5M4 19v5h5m10 0h5v-5" /><path fill="#aed8cf" d="m14 8 6 6-6 6-6-6z" /></svg>; }
export function ProjectionViewIcon() { return <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path fill="#aed8cf" d="m14 3 9 5v12l-9 5-9-5V8z" /><path d="m5 8 9 5 9-5M14 13v12M1 16l4 4m18 0 4-4" /></svg>; }

export function WorkplaneSidebarTools({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { const sync = () => { const next = document.getElementById("cad-workplane-tools"); setTarget(current => current === next ? current : next); }; sync(); const observer = new MutationObserver(sync); observer.observe(document.body, { childList: true, subtree: true }); return () => observer.disconnect(); }, []);
  return target ? createPortal(children, target) : null;
}
