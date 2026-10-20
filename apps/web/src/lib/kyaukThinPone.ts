/** Myanmar-related places and objects, never personal names. */
const DESIGN_NOUNS = ["Bagan Pagoda", "Thanaka Leaf", "Inle Lake", "Pathein Umbrella", "Mandalay Palace", "Irrawaddy River", "Shan Hills", "Myanmar Teak", "Lotus Flower", "Bamboo Basket", "Lacquerware Bowl"];
export function suggestDesignName(number: number): string {
  const index = Math.max(1, Math.floor(number));
  return `${DESIGN_NOUNS[(index - 1) % DESIGN_NOUNS.length]} ${index}`;
}
