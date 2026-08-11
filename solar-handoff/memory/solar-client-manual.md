---
name: solar-client-manual
description: The client-facing user manual PDF for the Solar Bill Review System (Ubakel for Baher Saad), and the promises it makes that the live scenario must match
metadata:
  type: project
---

Built 2026-09-26: `Downloads/Solar-Bill-Review-System-User-Manual.pdf` (14 pp, US Letter, Ubakel branding: logo, palette #6b1a2a / #1a0a10 / #f3f4f6 / #0d0d0d / #D90429 / #4B5563, plus a muted green and amber for status only). The source HTML, render.py (Edge headless → PDF) and polish.py are in the session workspace `manual/`, which is temporary.

The client is **Baher Saad**, from Ubakel. The form is filled in by **homeowners**. The user rejected an earlier developer-style handover doc; the manual is for the client's staff: no Make, module ids, report-reading or support section. The ops inbox is shown as the placeholder `reports@yourcompany.com`, and no personal emails appear anywhere. Running cost is shown in **operations only** (full ≈180, a few bills 55–70, pre-solar/production only ≈50, incomplete 5), never the Make plan.

**The manual describes the system AFTER changes the user told me to "consider done" but which are NOT yet in the live scenario** (see [[solar-report-status]]):
- the customer "missing months" email [66] is REMOVED;
- the new email subjects: Solar report ready / Solar report needs review / Report ready – PDF not attached / Pre-solar bill needs review / Production file could not be read / Report could not be created / Customer record not saved / Incomplete submission – not processed;
- the client-friendly flag texts on manual p.10 (e.g. "the bill could not be read with confidence", "grid usage figures are missing from this bill", "grid usage is outside the normal range", "Processing problem – file could not be downloaded", "Chart check differs for months");
- the ops emails REDESIGNED in Ubakel style exactly like manual pp.8–9 (dark header with logo, status band, Open report / Open folder buttons, a 4-cell summary: months on file, updated now, flagged, utility account or pre-solar; a flagged box; the PDF attached).

**v1.1 (2026-09-26)** matches the v4 blueprint word for word. It adds the check chips "From after solar was installed" and "Latest issued copy of its month". The pre-solar card now says it is "checked first: from before solar, same account, chart ends before the first solar bill", and "a corrected (re-issued) bill replaces the original" is added. The pre-solar email row lists every reason. New flag rows: "bill from before solar was installed, so it cannot be used as a monthly bill" and "older than the <month> bill already on file". Duplicate reads "the copy issued most recently is kept". There is a new situation: "pre-solar and monthly bill swapped". The v1.0 source is kept as `manual_v1.0.html`. v4 implements A1–A5, so once v4 is pushed the "NOT yet in the live scenario" list above no longer applies.

**v1.2 (2026-09-26 evening)**, still 14 pp:
- Uses the FULL Ubakel logo (mark + name) supplied by the user: white version on the cover (2.7in) and in the email mock-up headers; burgundy small version plus a divider in every page header. Transparent PNGs were made from the user's JPG (alpha = red channel) and copied to `Downloads/ubakel-logo/`.
- Figures measured in the live tests: 12 bills take 2–4 min; a few bills about 1 min; 5 full requests 15–20 min; a single request up to 8 min when Gemini is slow.
- Ops: full request 190 (was 180); a few bills 55–75; monthly 1,900 / 3,800 / 7,600; worked example ≈ 4,330.
- Pre-solar card: "chart must not run past the start of the first solar bill; the last bill before solar is ideal".
- Production-unreadable row: "keeps figures already on record".
- New row: "The name on the report differs from the form → uses the account holder's name, address and phone printed on the bills".
- The user earlier said NOT to write "Optional", so the pre-solar bill is never labelled optional. The v1.1 source is kept as `manual_v1.1.html`. The real emails still use a text UBAKEL wordmark (an image needs a public URL).

**v1.3 (2026-10-02):** the name now comes from the form (scenario v4.2), so the p.11 row reads "address or phone differs from the form" (name and email from the form, address and phone from the bills). Footer and cover say v1.3 / October 2026.

**v1.4 (2026-10-04):** the email mock-up headers (pp. 8–9) read "NetSolar | Solar Bill Review" in text, matching the real emails after v4.2. The page headers and cover keep the Ubakel logo, since Ubakel prepared the manual.

**Why:** the user explicitly asked to build the PDF first and not get stuck on scenario updates.
**How to apply:** before handover, the live scenario must be updated to match the manual word for word. That is the remaining system work.
