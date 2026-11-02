# Walkity Talk dashboard
Static GitHub Pages dashboard for studio145.ca/walkitytalk. Data: `data/live.json` (see `SHEET_SCHEMA.md`). Clip tools: `tools/clips/HOWTO.md`. Sheet refresh (pending): `scripts/workflow-pending/`.

## CREDITS
- Charts: [Apache ECharts](https://github.com/apache/echarts) 6.1.0 — Apache-2.0.
- UI pieces from [Uiverse.io](https://uiverse.io) (MIT, [license](https://github.com/uiverse-io/galaxy/blob/main/LICENSE)), restyled to the Walkity Talk brand:
  - Loading bar — mrhyddenn, "tasty-crab-98"
  - KPI card hover lift — ercnersoy, "serious-skunk-43"
  - Download buttons (press + light sweep) — catraco, "funny-impala-9"
  - Dark-mode switch — anonithrax, "brown-dragon-59"
- Excel/PDF export: SheetJS, jsPDF, jsPDF-AutoTable (vendored in `assets/`).
