/** The editor can share a static origin with 3DPMM; CAD runtime assets stay root-relative. */
export function normalizeCadEntryPath(value: string | undefined): string {
  return value && /^\/[a-zA-Z0-9/_-]*\/$/.test(value) && !value.includes("//") ? value : "/";
}
export const CAD_ENTRY_PATH = normalizeCadEntryPath(process.env.NEXT_PUBLIC_CAD_ENTRY_PATH);
export function cadEditorUrl(projectId?: string | null): string {
  return `${CAD_ENTRY_PATH}?editor=1${projectId ? `&project=${encodeURIComponent(projectId)}` : ""}`;
}
