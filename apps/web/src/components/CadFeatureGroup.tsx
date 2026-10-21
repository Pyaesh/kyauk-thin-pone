"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
export function CadFeatureGroup({ group, title, icon, children, containerRef }: { group: string; title: string; icon: ReactNode; children: ReactNode; containerRef?: RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (ref.current && !ref.current.contains(event.target as Node)) ref.current.open = false; };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && ref.current?.open) {
        event.stopPropagation();
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    };
    const resize = () => { if (ref.current) ref.current.open = false; };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape, true);
    window.addEventListener("resize", resize);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape, true); window.removeEventListener("resize", resize); };
  }, []);
  return <details ref={ref} className="toolbar-section cad-feature-group" data-group={group} onToggle={event => {
    if (!event.currentTarget.open) return;
    document.querySelectorAll<HTMLDetailsElement>(".cad-feature-group[open]").forEach(element => { if (element !== event.currentTarget) element.open = false; });
    const popover = event.currentTarget.querySelector<HTMLElement>(".cad-feature-popover");
    if (popover) {
      popover.style.removeProperty("transform");
      const bounds = popover.getBoundingClientRect();
      const offset = Math.max(12 - bounds.top, Math.min(0, window.innerHeight - 12 - bounds.bottom));
      if (offset) popover.style.transform = `translateY(${offset}px)`;
    }
  }}><summary title={title} aria-label={title}>{icon}<ChevronDown size={10} /></summary><div className="cad-feature-popover" ref={containerRef}>{children}</div></details>;
}
