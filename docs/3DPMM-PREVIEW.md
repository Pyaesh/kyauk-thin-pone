# KyaukThinPone preview

This branch is a preview of the separate CAD app. It does not deploy or modify `Pyaesh/3dpmm` or its live site.

## Local preview

```sh
npm ci
npm run typecheck
npm test
npm run export
python3 -m http.server 4180 --directory apps/web/.next-export
```

Open http://localhost:4180/. Create a design, add a shape, change measurements, test undo/redo, and export STL and LYL. Switch between Burmese and English; the explicit choice persists. Test the same flows on mobile.

The generated static files include all CAD workers and WebAssembly runtimes. Serve them at the root of their own hostname, not a subfolder. No Node process is needed for this export. Projects remain in browser storage unless users download them; the optional public shared-project folder is not enabled. Google Drive login/save is not implemented by this preview.

## Changes

- Visible name and cube mark: ကျောက်သင်ပုန်း · KyaukThinPone, with 3DPMM green/slate UI and workplane colours.
- Default language: Burmese. Core labels and the getting-started guide are translated; advanced tools fall back to English. All upstream languages remain selectable.
- Default new workplane: Bambu Lab A1, 256 × 256 mm. The upstream printer library and custom sizes remain available in settings. Existing files and user defaults are preserved.
- New names combine Myanmar-related non-person nouns and a number. Names remain editable.
- Footer links to 3DPMM, the fork's corresponding source for the build revision, AGPL licensing, and upstream Layerling attribution.

## Source and deployment

`NEXT_PUBLIC_SOURCE_CODE_URL` can override the repository URL; the default is this public fork. Next's build configuration records the Git revision, and the Source link targets that revision. Commit and push the source before distributing its build. Source archives without Git metadata may set `NEXT_PUBLIC_SOURCE_REVISION` explicitly.

Set `NEXT_PUBLIC_SITE_URL` to the chosen CAD origin before a production build. No new production domain or DNS changes are made here. The main site's existing homepage layout can remain unchanged, with its CAD buttons pointing to the dedicated editor once approved.

The preview workflow uploads static build files as a GitHub Actions artifact. It does not publish to GitHub Pages or the VPS. Retain the AGPL license, copyright notices and prominent source link in any deployed version. Review third-party notices before distribution.
