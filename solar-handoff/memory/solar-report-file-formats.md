---
name: solar-report-file-formats
description: Verified formats of the three input files for the solar production report project (ComEd bills + monthly interval xlsx), and the parsing approach that works.
metadata:
  type: project
---

Verified 2026-09-14 against real samples for [[solar-production-report-project]].

**Utility bills are ComEd PDFs, 3 pages, fully text-extractable — no OCR needed.**

Post-solar bill (`bill-1.pdf`, Hussein Saleh, rate class "Retail Delivery Service - Res Single"):
- p1 header: `SERVICE FROM 5/27/26 THROUGH 6/25/26 (29 DAYS)`, `Issued`, `Account #`, name/address/phone.
- p2 METER INFORMATION has **two** rows: `kWh From Grid` (2631) and `kWh To Grid` (635).
- p1 TOTAL USAGE bar chart = 13 monthly **From Grid** values with month labels.

Pre-solar bill (Rose Turner, rate class "Residential - Single") is **structurally different**: METER INFORMATION has **one** row, `General Service Total kWh` (1176) — no From/To Grid split. Same 13-bar chart.

**Self-check that validates every parse:** the last (highlighted) bar always equals the current month's From Grid / Total kWh meter value. Confirmed on both samples.

**Parsing method that works:** `pdfplumber.extract_words()` + geometry. pypdf's `visitor_text` is NOT usable — it returns the month labels collapsed into one token ("JUN JUL AUG SEP…") and reports x=0,y=0 for TJ-array continuations. Algorithm: find the horizontal row shared by the most month labels (that's the axis), then match each numeric word above it to the nearest label by x-centre. Working prototype saved at `%TEMP%\claude\solar\parse2.py`.

**Production file is .xlsx (not .csv), one sheet, 12 columns, 32 data rows (2024-02 → 2026-09, newest first).** Columns: Time, System Production, Battery Charge, Battery Discharge, **Solar (kWh)**, Consumption, Self Consumption, Export, Import, **Peer (kWh)**, Legacy Peer Adjusted, Contracted. Only **Solar (col E)** and **Peer (col J)** are populated; everything else is empty — including `Contracted`, which is why the contracted number comes from the GHL form field instead. Peer runs ~12-15% above Solar. Last row (2026-09) has Peer but **no Solar** — incomplete current month, must be excluded.

**Month-alignment problem, now concrete:** a bill labelled JUN covers 5/27–6/25; the xlsx row is calendar `2026-06-01`. ~25 of 30 days overlap. ComEd labels each bill by its **end** month.

**Sample files are three different customers** (webhook = Naif Saad, bill = Hussein Saleh, pre-solar = Rose Turner), so cross-validation between them is not possible.

**Name, phone and service address ARE printed on the bill**; email is not (webhook only).

**2026-09-26 analysis of 29 bills** (Drive folder `16ejovptPARuMvtx9IUEjNXHaOg0D14gU`: 16 bills of customer B, account ...6000, ComEd supply, Jan 2025 to Apr 2026; plus the 11 test bills of customer A, account ...2222, XOOM supplier; plus the test pre-solar bill, account ...5000, a THIRD customer). Script: session `bills/analyse.py`.
- **The meter table is the only source that gives BOTH figures on every bill**: row `kWh From Grid` = import, row `kWh To Grid` = export (Load Type `I/O w/ Flow Thru`, Previous/Present show "Actual", not numbers).
- Cross-checks that held on 27/27: **Distribution Facility Charge kWh = From Grid**; ComEd-supply `Electricity Supply Charge` kWh = From Grid (16/16); XOOM `ENERGY SERVICE ... KWH` lines summed = From − To (11/11). The last chart bar = From Grid (all).
- **`Net Metering Credit - Delivery` kWh is NOT export:** it equals To Grid only when the rollover bank is 0 (13/27). With banked `Net Metering Excess Gen - Rollover` it equals From Grid (13/27) or export + bank (Jan 2026: 81 + 457 = 538). The current Gemini prompt names it as the secondary export source and cross-check. That is a risk for customer B: disagreement leads to low confidence and a rejection. UNTESTED live.
- **Pre vs post:** pre = 1 meter row, Load `General Service`, Reading `Total kWh`, real register numbers, no Net Metering lines. Post = 2 rows (From/To Grid), `I/O w/ Flow Thru`, Net Metering Credit/Adjustment/Rollover lines. The rate name is NOT a signal ("Residential - Single" vs "Retail Delivery Service" reflects the supplier). A post-solar chart shows grid import (net of self-consumed solar), not consumption.
- Month = the last bar label = file-name month in all 27 bills. Periods end between the 24th and 28th.
- **"set c" subfolder `1UglrRrVIKbgYf1S9DN70mZ6fPteaJoZ8`, 13 bills, customer C (account ...5000, the test pre-solar customer) CROSSING OVER to solar.** PRE (1 row, General Service): bill122 Oct25, bill123 Nov25 (= the test pre-solar bill), bill121 Dec25, bill120 May26 (the original May bill). POST (I/O): bill119 Jan26 … bill116 Apr26, bill115 May26, bill114 Jun26, bill113 Jul26, bill111 Aug26 (23-day period), bill112 Sep26.
- **Re-issued bills exist:** bill115 (issued 8/21/26) is a CORRECTED May26 bill (4/9–5/14, I/O 500/847) replacing bill120 (issued 5/12/26, General Service 490). The Jan–Apr26 bills were issued in June and Jun–Jul26 in late August, so net metering was applied retroactively. The system has no concept of issue date, so the same month can have 2 official bills with different numbers. bill115 has no "SERVICE FROM" line on p1 (the period is only in CHARGE DETAILS).
- Customer C also has **community solar** (ESP Dekalb LLC: "Renewable Community Supply Details", "Generation kWh", "Community Solar Credit") = NOT rooftop production or export. Net-metering line name variant: "Net Metering Credit - Fixed Price". The supplier switches between ComEd and SmartEnergy ("Commodity Charge N KWH"). The meter number is the same before and after (270843558), so it does NOT distinguish pre from post.
