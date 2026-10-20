"use client";

import { Moon, Sun } from "lucide-react";
import { setAppTheme, type AppThemePreference } from "@/lib/appTheme";
import { t } from "@/lib/i18n";
import { useAppTheme } from "@/lib/useAppTheme";

export function ThemeChoices({ value, onChange }: { value: AppThemePreference; onChange: (value: AppThemePreference) => void }) {
  return <div className="theme-day-night" role="group" aria-label={t("common.theme")}>
    <button type="button" aria-label={t("workspace.themeLight")} title={t("workspace.themeLight")} aria-pressed={value === "light"} onClick={() => onChange("light")}><Sun size={22} aria-hidden="true" /></button>
    <button type="button" aria-label={t("workspace.themeDark")} title={t("workspace.themeDark")} aria-pressed={value === "dark" || value === "graphite"} onClick={() => onChange("dark")}><Moon size={22} aria-hidden="true" /></button>
  </div>;
}

export function ThemeSwitch() {
  const theme = useAppTheme();
  return <ThemeChoices value={theme} onChange={setAppTheme} />;
}
