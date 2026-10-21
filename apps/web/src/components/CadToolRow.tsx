"use client";
import { useEffect, useState, type ReactNode } from "react";
import { CadFeatureGroup } from "./CadFeatureGroup";
/** Wide screens expose every command; compact screens expand each group on demand. */
export function CadToolRow({ group, title, icon, children }: { group: string; title: string; icon: ReactNode; children: ReactNode }) {
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1279px)");
    const sync = () => setCompact(media.matches);
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return compact ? <CadFeatureGroup group={group} title={title} icon={icon}>{children}</CadFeatureGroup> : <section className="cad-inline-tools" data-group={group} aria-label={title}>{children}</section>;
}
