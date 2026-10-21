"use client";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** Keep properties over the library, including when the editor switches modes. */
export function ShapeInspectorDock({ children }: { children: ReactNode }) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const sync = () => { const next = document.getElementById("cad-inspector-host"); setHost(current => current === next ? current : next); };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return host ? createPortal(children, host) : null;
}
