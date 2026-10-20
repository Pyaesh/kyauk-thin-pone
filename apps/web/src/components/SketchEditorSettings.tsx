"use client";
import { useEffect, useState } from "react";
import { WorkspaceSettingsModal } from "@/components/workplane/WorkspaceSettingsModal";
import type { WorkplaneWorkspaceSettings, GridSize } from "@/types/layerling";
import type { AppThemePreference } from "@/lib/appTheme";
import { saveWorkspaceDefault } from "@/lib/workplaneSettings";

/** Settings remain usable while the 3D viewport is unmounted for an active sketch. */
export function SketchEditorSettings({ workspace, snap, onChange, themePreference, onThemeChange }: { workspace: WorkplaneWorkspaceSettings; snap: GridSize; onChange: (value: { workspace: WorkplaneWorkspaceSettings; snap: GridSize }) => void; themePreference: AppThemePreference; onThemeChange?: (value: AppThemePreference) => void }) {
  const [open, setOpen] = useState(false);
  const read = (name: string) => { try { return localStorage.getItem(`layerling.editor.${name}`) !== "false"; } catch { return true; } };
  const [move, setMove] = useState(() => read("moveDimensionsEnabled"));
  const [origin, setOrigin] = useState(() => read("originDimensionsEnabled"));
  const [perspective, setPerspective] = useState(() => read("startInPerspective"));
  const store = (name: string, value: boolean) => { try { localStorage.setItem(`layerling.editor.${name}`, String(value)); } catch { /* Settings still apply to this session. */ } };
  useEffect(() => { const show = () => setOpen(true); window.addEventListener("layerling:open-workspace-settings", show); return () => window.removeEventListener("layerling:open-workspace-settings", show); }, []);
  return open ? <WorkspaceSettingsModal workspace={workspace} snap={snap} themePreference={themePreference} moveDimensionsEnabled={move} originDimensionsEnabled={origin} startInPerspective={perspective} onWorkspaceChange={workspace => onChange({ workspace, snap })} onSnapChange={snap => onChange({ workspace, snap })} onThemePreferenceChange={onThemeChange} onMoveDimensionsEnabledChange={value => { setMove(value); store("moveDimensionsEnabled", value); }} onOriginDimensionsEnabledChange={value => { setOrigin(value); store("originDimensionsEnabled", value); }} onStartInPerspectiveChange={value => { setPerspective(value); store("startInPerspective", value); }} onMakeDefault={() => saveWorkspaceDefault(workspace, snap)} onClose={() => setOpen(false)} /> : null;
}
