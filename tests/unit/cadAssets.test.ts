import { expect, it } from "vitest";
import { toolbarShapeAssets } from "@/lib/shapeCatalog";
it("loads shape previews from the same root assets at the nested CAD entry", () => {
  for (const shape of toolbarShapeAssets) {
    for (const url of [shape.src, shape.menuIcon]) {
      if (url && url.includes("assets/")) expect(new URL(url, "https://3dpmm.confotype.com/cad/").pathname).toMatch(/^\/assets\//);
    }
  }
});
