"use client";

import { Moon, Sun } from "lucide-react";
import { setAppTheme, type AppThemePreference } from "@/lib/appTheme";
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useAppTheme } from "@/lib/useAppTheme";

export function ThemeChoices({ value, onChange }: { value: AppThemePreference; onChange: (value: AppThemePreference) => void }) {
  return <div className="theme-day-night" role="group" aria-label={t("common.theme")}>
    <button type="button" aria-label={t("workspace.themeLight")} title={t("workspace.themeLight")} aria-pressed={value === "light"} onClick={() => onChange("light")}><Sun size={22} aria-hidden="true" /></button>
    <button type="button" aria-label={t("workspace.themeDark")} title={t("workspace.themeDark")} aria-pressed={value === "dark" || value === "graphite"} onClick={() => onChange("dark")}><Moon size={22} aria-hidden="true" /></button>
  </div>;
}

export function ThemeSwitch() {
  const theme = useAppTheme();
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => { const media = window.matchMedia("(prefers-color-scheme: dark)"); const sync = () => setSystemDark(media.matches); sync(); media.addEventListener("change", sync); return () => media.removeEventListener("change", sync); }, []);
  const dark = theme === "dark" || theme === "graphite" || (theme === "system" && systemDark);
  const label = t(dark ? "workspace.themeLight" : "workspace.themeDark");
  return <button type="button" className="cad-theme-toggle" aria-label={label} title={label} onClick={() => setAppTheme(dark ? "light" : "dark")}>{dark ? <Sun size={22} aria-hidden="true" /> : <Moon size={22} aria-hidden="true" />}</button>;
}
