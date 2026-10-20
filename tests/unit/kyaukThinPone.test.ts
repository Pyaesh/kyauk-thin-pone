import { describe, expect, it } from "vitest";
import { suggestDesignName } from "@/lib/kyaukThinPone";
import { createCatalogueStore } from "@/lib/i18n";
import { MESSAGES_EN } from "@/lib/messages.en";
import { MESSAGES_MY } from "@/lib/messages.my";
import { DEFAULT_WORKPLANE_WORKSPACE } from "@/lib/workplaneSettings";
import { DEFAULT_SOURCE_CODE_URL } from "@/lib/appUpdate";
describe("3DPMM adaptation", () => {
  it("suggests editable non-person noun names", () => {
    expect(suggestDesignName(1)).toBe("Bagan Pagoda 1");
    expect(suggestDesignName(2)).toBe("Thanaka Leaf 2");
    expect(suggestDesignName(12)).toBe("Bagan Pagoda 12");
  });
  it("translates core tools and falls back to English for untranslated text", () => {
    const store = createCatalogueStore({ en: MESSAGES_EN, my: MESSAGES_MY }, {});
    expect(store.text("my", "editor.tool.undo")).toBe("ပြန်ဆုတ်");
    expect(store.text("my", "workspace.printer")).toBe("ပရင်တာ");
    const untranslated = Object.keys(MESSAGES_EN).find(key => !(key in MESSAGES_MY)) as keyof typeof MESSAGES_EN;
    expect(store.text("my", untranslated)).toBe(MESSAGES_EN[untranslated]);
  });
  it("uses the A1 plate and offers the fork source", () => {
    expect(DEFAULT_WORKPLANE_WORKSPACE).toMatchObject({ width: 256, depth: 256, printer: "bambu-lab-a1" });
    expect(DEFAULT_SOURCE_CODE_URL).toBe("https://github.com/Pyaesh/kyauk-thin-pone");
  });
});
