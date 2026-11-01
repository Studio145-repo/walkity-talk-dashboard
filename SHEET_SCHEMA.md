# Walkity Talk dashboard: Google Sheet schema

Set `SHEET` in index.html to the Sheet ID. Share it as "Anyone with the link can view". Each tab is read through the gviz CSV endpoint. The header row must match these names exactly (case-insensitive).

| Tab | Columns | Feeds | Likely source |
|---|---|---|---|
| `Traffic` | Date (YYYY-MM-DD), Visits, Unique Visitors | (a) Page traffic | Wix Analytics export (Traffic overview, filtered to /walkitytalk), or GA4 property G-9JQVXR6NCX |
| `Sources` | Source (Instagram, TikTok, YouTube, X, Direct, Search, Email, Referral), UTM Campaign, Sessions | (b) Traffic sources | Wix Analytics "Traffic by source" + UTM report, GA4 Acquisition |
| `Content` | Account (`studio` or `instagram`), Date, Platform, Post, URL, Views, Saves, Shares, Comments | (c) Content performance (RR v2 is computed by the page) | Instagram export / Insights (@thatwalkytalkstudio), TikTok, YouTube Studio, X analytics |
| `Sales` | Date, Orders, Revenue, Sessions | (d) Sales KPIs (conv. rate = Orders ÷ Sessions) | Wix Stores / shop platform orders export |
| `Products` | Product, Units, Revenue | (d) Top products | Wix Stores sales by product |
| `Funnel` | Stage (Resonance, Sustain, Harmonic, Crescendo, Resolution), Count, Metric | (e) Funnel strip | Stage win conditions from the Studio 145 funnel SOP |

Resonance Rate v2 = (Saves + Shares + Comments) ÷ Views × 1000.
Bands: Push only (Dim) under 5 · Solid (Steady) 5–15 · Strong (Bright) 15–30 · Outlier 30+.

While `SHEET` is the placeholder (or a tab is missing), the page shows clearly labeled EXAMPLE data.

## Accounts
Content is split into two separate accounts. Every Content row needs an `Account` value:

| Account id | Name | Handle | What it covers |
|---|---|---|---|
| `studio` | Community page | @thatwalkitytalkstudio | Studio / talk-show reels |
| `instagram` | Store page | @walkitytalk | Brand and store feed (campaign carousels, product posts) |

In `data/live.json` this is the `accounts` list plus an `account` field on each `content` item. The page's All / Community page / Store page filter, the per-account KPI cards, the Account column, and the Accounts sheet/table in the Excel and PDF exports all key off it. Rows without a value are not shown under either single-account filter. @walkitytalk has account-level totals only (from Instagram reports) until a per-post export is added; the page labels that gap.

## Ownership
Temporary: hosted on the personal dexrayrobinson account because GitHub sign-ups were rate-limited on 2026-11-01. Transfer to a Studio 145 company account once one exists.
