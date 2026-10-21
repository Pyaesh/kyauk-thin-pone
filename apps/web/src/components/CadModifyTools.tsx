"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import { CadFeatureGroup } from "./CadFeatureGroup";
/** Five primary commands stay visible; less common edits expand beside them. */
export function CadModifyTools({ title, primary, more }: { title: string; primary: ReactNode; more: ReactNode }) {
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const sync = () => setCompact(media.matches);
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return compact ? <CadFeatureGroup group="modify" title={title} icon={<Pencil size={23}/>}><div className="toolbar-section-label">{title}</div><div className="toolbar-section-tools">{primary}{more}</div></CadFeatureGroup> : <section className="cad-inline-tools cad-modify-tools" data-group="modify" aria-label={title}><div className="toolbar-section-tools">{primary}<CadFeatureGroup group="modify-more" title={title} icon={<ChevronDown size={17}/>}><div className="toolbar-section-label">{title}</div><div className="toolbar-section-tools">{more}</div></CadFeatureGroup></div></section>;
}
