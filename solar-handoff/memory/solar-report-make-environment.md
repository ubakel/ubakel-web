---
name: solar-report-make-environment
description: The real Make.com environment, template layout and existing scenarios for the solar report project — IDs, what is already built, and the two questions it answered.
metadata:
  type: project
---

Inspected via the Make MCP on 2026-09-14. Extends [[solar-production-report-project]] and [[solar-report-file-formats]].

**Make environment** — zone `eu2.make.com`, org 5181685 "My Organization", team **2641953** "My Team".

**Already built (not greenfield):**
- Scenario **9787368 "Solar Bill"** — ACTIVE, webhook `hy9qavidhn0ymq5ch6zt0pbk4bavval3`
- Scenario **9798467 "Solar Bill (v2 - review)"** — inactive, 92 modules, webhook `fma6aizaqtuwuvombemd4ielsh97ni0d`
- Data Store **184785** "Solar Bill Customer Records" (structure 625622): contactId, email, firstName, lastName, folderId, spreadsheetId — plus `reportYear` written at runtime though absent from the declared spec. It is a **workspace registry, not a lock** (no status/timestamp field, key = contactId alone).
- Template Sheet **1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0**, super folder **12xGWw_WyT_wwqo7eoINydNH3opmA-15C**, tab name **"Bill Review"** (ONE tab, not three).
- Connections (all on info@ubakel.com): Gmail 14583679, Google/Sheets 14583689, Drive 14583685, Gemini AI 14583705. Also HTTP OAuth 2.0 11935813.
- opsEmail `info@ubakel.com`, baherEmail `ahmedalaqel26@gmail.com`.

**ANSWERED — the report's "Solar Produced" column is `Solar (kWh)` (col E), NOT `Peer`.** Template values match the workbook exactly on all 12 months (Jan 662/662.258 … Dec 433/433.205). Peer for 2026-07 is 1960 vs the template's 1735. Settled, no need to re-ask.

**ANSWERED — the bill is the source of truth for customer name and address.** Modules 2012/2014 overwrite the form-supplied name with `account_holder_name` and `service_address` extracted from the bill. That is what the user originally meant by "filled from the bills".

**Template layout ("Bill Review" tab), label-driven — the scenario finds a row by its label via `filterRows`, then writes `D{{__ROW_NUMBER__}}`:**
- CUSTOMER INFORMATION: Customer Name / Address / Email / Phone → value in col D
- MONTHLY USAGE & SOLAR PRODUCTION: C=Month, D=Grid Import, E=Grid Export, F=Solar Produced, H=Total Home Usage; rows Jan–Dec + TOTAL
- PRE-SOLAR vs POST-SOLAR: C=Month, D=Pre-Solar Usage, F=Post-Solar Usage, H=Usage Change
- PERFORMANCE SUMMARY: Solar Produced (Actual), Contracted/Expected Production (written to col F), Production vs Contracted kWh and %, Under/Over Production, Total Home Usage, Usage vs Contracted System Size, verdict line.

**The 12 months display in calendar order but need not be one calendar year.** The worked example spans **Aug 2025 → Jul 2026** — contiguous, just rendered Jan–Dec. Any contiguity check must sort chronologically first.

**Grid Import column == the bar chart.** 11 of 12 values in the template match bill-1's bar chart exactly, confirming the chart is a free cross-check on `From Grid` (only Jul differs, being a 2026 bill vs the chart's 2025 bar).

**Live risk:** the template file itself still contains Hussein Saleh's filled data. Pre-solar cells are explicitly blanked before writing (modules 2130-2141) but the 12x3 monthly grid is not — so a month whose extraction fails inherits the previous customer's number.

**Existing Gemini prompts are good** (model `gemini-3.5-flash-lite`): they already exclude the average-daily-use tiles and cross-check meter table against charge lines. They instruct the model to *ignore* the bar chart as a source — correct for sourcing, but it is still usable as an independent verification.


## SECOND Make account (added 2026-09-16) — the MCP connector SWITCHED to it

The Make MCP connection no longer reaches the original eu2 account at all; `organizations_list` returns only this one. Anything needed from the old account must be read there before switching back.

**New account:** user `mmor6195@gmail.com` (id 9308906, "Ahmed ubakel"), org **9004764** "My Organization", zone **eu1.make.com**, team **2814151** "My Team", private space 2814152. Plan: **Free**.

**Created there on 2026-09-16:** data structure **584368** and data store **189208**, both named "Solar Bill Customer Records". Structure is `strict: false` with the same six declared text fields as the original (contactId, email, firstName, lastName, folderId, spreadsheetId) — non-strict is essential, since the blueprint also writes recordType, status, outcome, startedAt, startedTs and reportYear without declaring them.

**Free-plan limits that matter for this pipeline** (from the org license block):
- **`executionTime: 5` minutes MAX per run** — the biggest risk. The v5 12-bill run took ~4-5 minutes on the paid account, so a full 12-bill run may TIME OUT here. Test with few bills first.
- `operations: 1000` per month (resets monthly) — far more headroom than the old account's remaining credits.
- `scenarios: 2` maximum, `dslimit: 1` data store (now used), `dsslimit`/store cap 1 MB.
- `fslimit: 5 MB` per file — sample bills are 0.5-2.2 MB, so fine.
- `interval: 15` min minimum scheduling; irrelevant for an instant webhook.
- `retention: 7` days, `apiLimit: 30`.

**Zone difference: webhooks here are `hook.eu1.make.com`, not eu2.** A scenario imported here gets a BRAND-NEW webhook URL, so GHL would need repointing for real traffic; for testing, POST to the new URL directly.

**`Solar-Report-Pipeline-v8-eu1.json`** is v8 with `datastore` re-pointed to 189208 on all 8 modules (3, 10, 13, 65, 73, 77, 993, 996) and `hook` set to null so Make mints a fresh eu1 webhook. Validated: 82 modules, 0 problems, no drift.

**STILL BLOCKING in the new account — only the user can do these (OAuth):** there are NO Google or Gemini connections, only "Make's AI Provider (default)" (10946517). The blueprint's `__IMTCONN__` ids are all from the old account and must be re-pointed after creating new connections:
- **14583679** google-email — modules 6, 7, 8, 9, 34, 62, 63, 66
- **14583685** google-drive — modules 11, 12, 36, 41, 46, 57
- **14583689** google-sheets — modules 14, 17, 18, 19, 21, 33, 42, 45, 55, 64
- **14583705** gemini-ai — modules 31, 32, 52, 53

Also: the template sheet `1lwwk6nQ...` and parent folder `12xGWw_W...` live in the OLD account's Drive (owned by obai.2452002@gmail.com) — the new Google account must be granted access to both, or they must be copied and the IDs updated in module 2's variables.
