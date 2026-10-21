"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
export function CadFeatureGroup({ group, title, icon, children, containerRef }: { group: string; title: string; icon: ReactNode; children: ReactNode; containerRef?: RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => { const outside = (event: PointerEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false; }; const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && ref.current?.open) { ref.current.open = false; ref.current.querySelector("summary")?.focus(); } }; document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape); return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); }; }, []);
  return <details ref={ref} className="toolbar-section cad-feature-group" data-group={group} onToggle={event => { if (event.currentTarget.open) document.querySelectorAll<HTMLDetailsElement>(".cad-feature-group[open]").forEach(element => { if (element !== event.currentTarget) element.open = false; }); }}><summary title={title} aria-label={title}>{icon}<ChevronDown size={10} /></summary><div className="cad-feature-popover" ref={containerRef}>{children}</div></details>;
}
