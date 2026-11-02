"""Copies Google Sheet tab values verbatim into data/sheet.json.
Rules: no math, no rounding, no filling gaps, no invented rows. Read-only Sheets scope.
Fails (exit 1, no write) if a tab or required header is missing, so stale-but-true data stays."""
import json, os, sys, datetime
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

TABS = {  # tab -> required headers (from SHEET_SCHEMA.md)
  "Traffic": ["Date", "Visits", "Unique Visitors"],
  "Sources": ["Source", "UTM Campaign", "Sessions"],
  "Content": ["Account", "Date", "Platform", "Post", "URL", "Views", "Saves", "Shares", "Comments"],
}
info = json.loads(os.environ["GCP_SA_JSON"])
creds = service_account.Credentials.from_service_account_info(
    info, scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"])
s = AuthorizedSession(creds)
sid = os.environ["SHEET_ID"]
out = {"source": f"Google Sheet {sid}", "pulled_utc": datetime.datetime.utcnow().isoformat(timespec="seconds") + "Z", "tabs": {}}
for tab, need in TABS.items():
    r = s.get(f"https://sheets.googleapis.com/v4/spreadsheets/{sid}/values/{tab}",
              params={"valueRenderOption": "FORMATTED_VALUE"}, timeout=30)
    if r.status_code != 200: sys.exit(f"{tab}: HTTP {r.status_code}")
    rows = r.json().get("values", [])
    if not rows: sys.exit(f"{tab}: empty")
    head = [h.strip() for h in rows[0]]
    miss = [h for h in need if h.lower() not in [x.lower() for x in head]]
    if miss: sys.exit(f"{tab}: missing headers {miss}")
    # values kept as the exact strings shown in the Sheet
    out["tabs"][tab] = [dict(zip(head, row + [""] * (len(head) - len(row)))) for row in rows[1:] if any(c.strip() for c in row)]
json.dump(out, open("data/sheet.json", "w"), indent=1, ensure_ascii=False)
print({t: len(v) for t, v in out["tabs"].items()})
