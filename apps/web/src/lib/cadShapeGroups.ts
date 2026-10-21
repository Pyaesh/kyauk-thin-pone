export const CAD_SHAPE_GROUPS = [
  { id: "basic", en: "Basic shapes", my: "အခြေခံ ပုံသဏ္ဌာန်များ" },
  { id: "curves", en: "Curves and tubes", my: "အကွေးနှင့် ပြွန်များ" },
  { id: "holes", en: "Holes", my: "အပေါက်များ" },
  { id: "mechanical", en: "Mechanical parts", my: "စက်အစိတ်အပိုင်းများ" },
  { id: "text", en: "Text and tags", my: "စာသားနှင့် အမည်ပြားများ" },
  { id: "custom", en: "Custom shapes", my: "မိမိသိမ်းထားသော ပုံများ" },
] as const;
export type CadShapeGroup = (typeof CAD_SHAPE_GROUPS)[number]["id"];
const SPECIAL_GROUPS: Record<string, CadShapeGroup> = {
  torus: "curves", loft: "curves", tube: "curves", bentTube: "curves",
  counterbore: "holes", countersink: "holes", doubleCountersink: "holes", teardrop: "holes",
  thread: "mechanical", spring: "mechanical", gridfinity: "mechanical", gear: "mechanical", knurl: "mechanical", hinge: "mechanical", dovetail: "mechanical", ruler: "mechanical",
  text: "text", nameTag: "text", iconTag: "text", qrCode: "text",
};
export function cadShapeGroup(id: string): CadShapeGroup { return SPECIAL_GROUPS[id] ?? "basic"; }
