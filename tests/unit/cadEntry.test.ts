import { describe, expect, it } from "vitest";
import { normalizeCadEntryPath, cadEditorUrl, CAD_ENTRY_PATH } from "@/lib/cadEntry";
describe("shared-origin CAD navigation", () => {
  it("accepts an absolute local directory, otherwise uses root", () => {
    expect(normalizeCadEntryPath("/cad/")).toBe("/cad/");
    for (const value of [undefined, "//host/", "/../", "https://host/", "/cad?x/", "cad/"])
      expect(normalizeCadEntryPath(value)).toBe("/");
  });
  it("keeps editor URLs inside the configured entry and encodes project ids", () => {
    expect(cadEditorUrl()).toBe(`${CAD_ENTRY_PATH}?editor=1`);
    expect(cadEditorUrl("test & model")).toBe(`${CAD_ENTRY_PATH}?editor=1&project=test%20%26%20model`);
  });
});
