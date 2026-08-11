---
name: solar-report-status
description: Solar report pipeline. CURRENT STATE IS THE BLOCK AT THE TOP — as of 2026-09-25 the connector points at a NEW account (eu1, org 9021279, team 2836344) and a rebuild is starting there; the proven eu2 scenario 9835572 is now only a reference implementation. Everything below the top block is dated history.
metadata:
  type: project
---

# ======== CURRENT STATE — READ ONLY THIS TO RESUME (2026-09-25) ========

**THE MAKE CONNECTOR NOW POINTS AT A DIFFERENT ACCOUNT AND A DIFFERENT ZONE. Every ID in the older blocks below is STALE.** Run `environment_get` first, every session, without exception — this has now changed twice.

## 2026-10-18 test records for 5550002101 DELETED from store 164085 (5 keys). The Drive folder NetSolarSetup_Test and the Run Log test row are left for the user to remove. Template cell technique (for the client): [14] getSheetContent A1:H90 → [15] aggregator {row, label = column C, gridFrom = D} → [16] finds rows by exact label text in column C (Customer Name, Phone, the 1st Jan..Dec = grid table, the 2nd Jan/Dec = pre-solar table, "Contracted / Expected Production"). Writes go to fixed columns: [64] D Customer Name..Phone (4 rows in order), [55] D:F, [33] D, [21] F. Moving rows is safe; moving columns, renaming labels or reordering breaks it.

## 2026-10-18 03:54Z FIRST CLIENT TEST PASSED on 6676911 (exec eccc305c125c4f31a6cc2c7c0ff3f03a: status 1, 62 ops, 20 s). The user activated it, and the queued submission ran. Report 1Em52gKiW5hYw_DwILX3f6jItNtZJsXaHHye6l4RS4so in folder "NetSolarSetup_Test" 1hMcgiZttAs_uAc_GXa-HmYSGuhGLzXqV (owner netsolaradvisor): Jan 2706/285, Solar 662, name from the form. Folder also holds Jan_2026_utility_bill.pdf, solar_production, and the source xlsx. Run Log: Done/complete, flagged (none), errors (none), and no email-failure row, so the email was sent. 5 data-store records for 5550002101 (test data to clean up). An editor save at 03:54:12 changed nothing (re-diff: 0 field diffs). Ops: 62/1000 used. Remaining: test cleanup, GHL to the new hook, turn off Pro 7628024 + eu2 9835572.

## 2026-10-18 CLIENT SCENARIO CREATED: **6676911** "Solar Bill Review System v4.2" (team 3096762, hook 2890745), via the user's REST POST at 03:47:36Z. Read-back diff against build/patched_us2.json: 0 field diffs, same structure, sequential on, refs and brackets clean (copy in build/live_us2_6676911.json). INACTIVE. Next: the user shares the Drive folder with netsolaradvisor, activates the scenario, and POSTs testrun/US2_T1_client.json (Jan bill + production, phone 5550002101, links verified 200 PDF/xlsx), about 55 ops. Then GHL goes to the new hook, and Pro 7628024 + eu2 9835572 are turned off.

## 2026-10-18 CLIENT ACCOUNT CONFIRMED: us2 org 9177395, team 3096762 (Free, 0/1000 ops, reset 2026-11-03, 0 scenarios)
Make connector OAuth picks ONE org at sign-in; the picker shows 4 orgs all named "My Organization" (3700708 no teams, 5085211 eu2 old test, 7709464 Naif, 9177395 = the client's). Client connections (author 9488341, Google = netsolaradvisor@gmail.com): Drive **11777224**, Sheets **11777240** (type `google`, MISNAMED "NetSolar – Google Drive"), Gmail **11777218**, Gemini **11777209**. Webhook already exists, unused: **2890745** "GHL form" `https://hook.us2.make.com/myq6azs3vo5ujk6d5xuz891qz2cw72rg`. Data store 164085 (0 records), structure 521540 has all 26 fields. Builder dry run OK: `python build_migrate_v42.py 11777224 11777240 11777218 11777209 2890745` → 42/9/1, 303 KB. STILL NEEDED before the build: module [2] values (templateFileId, parentFolderId, logSheetId, opsEmail). The files must be owned by or shared with netsolaradvisor@gmail.com.
Drive files for module [2] (2026-10-18): Obai's folder "Solar Automation System" 14ktXzJEez-zzykRBQOewpO5na_kskDIp holds Report Template **1fjEaZJhHnJRc-yMzoZaAIZl8TW6sS5jesj808cl6X_Q**, Run Log **1up0EcSvSJmPUkfMPpnFKd7mkGOTPr8A2GjFNzjZOUQ8**, and an empty "Client Solar Reports" folder **1Q-UE09qSb0j17BKkVwjSS_ZnHsVusEa9** (= parentFolderId). The user will share it with Baher and transfer ownership, which keeps the IDs. Folder ownership transfer does NOT move the files inside, so each file must be transferred separately. opsEmail is still open.

## 2026-10-06 (later) DECISION REVERSED: AI STAYS GEMINI 3.5 Flash-Lite (no Claude rebuild). Guide v1.1 (5 pp, setupguide/body.html; Claude version saved as body_v1_claude.html): client creates 4 connections himself in Make → Connections (Drive, Sheets, Gmail, Gemini AI), NO credential-request link, NO Make plan step (client not upgrading for now), costs Gemini only $8–11/month. Also built comparison/ AI-Model-Comparison PDF (2 pp).

## 2026-10-06 CLIENT WILL USE THE CLAUDE API (not Gemini) + client setup guide
User: "the client will use claude api". Bill reading must be REBUILT: Gemini modules [52]/[53] (monthly bills) and [31]/[32] (pre-solar) -> Claude, then re-test on real bills; keep the error handlers (errBill / errPreUpload) and the 4-connection credential request (replace gemini-ai with the Claude app). Not started.
Built the client-facing "Setup Guide & Running Costs" v1.0 (7 pp, Ubakel-branded, reuses manual CSS): setupguide/body.html + build.py -> Downloads/Solar-Bill-Review-System-Setup-Guide.pdf. Steps: Make Core 20k credits; one Google account with Gmail; Drive folder "NetSolar – Solar Reports" with copies of Report Template + Run Log + "Customer Reports" folder (client sends 3 links); Claude Console (platform.claude.com) billing $50 + $100 spend limit, key created on the call; connect 4 apps on a 15-min call; team inbox + GHL address. Cost basis: Claude Sonnet 5.5 ($2/$10 per MTok), est. 6.5c/bill, 13 reads/full request = ~$0.85 ($0.60-1.40); 50-70/month = $43-60; Make Core 20k $16-19 (third-party sources, unverified); total ~$60-80/month, ~$1.20/report. Opus 5.5 ~2x. DONE 2026-10-06: Drive folder 'NetSolar – Files for client setup' 1hd7qP_Z77cNu2xLSB83qhYiaJeuXfrC2 (obai.2452002) holds 'Report Template' 1fjEaZJhHnJRc-yMzoZaAIZl8TW6sS5jesj808cl6X_Q (copy of master) and an EMPTY 'Run Log' 1up0EcSvSJmPUkfMPpnFKd7mkGOTPr8A2GjFNzjZOUQ8 (tab 'Run Log', 13 header cols only). Not yet shared with the client (needs their Google email). Guide v1.0 now 8 pp, NO call: client uses credential request 17f68c33-daf7-4e74-924b-63a4d6f6bab4 (Drive, Sheets, Gmail, anthropic-claude) in team 3096762. Old Gemini request 8f640e49 could not be deleted (Access denied) - ignore it.

## 2026-10-04 (later) CONNECTOR SWITCHED AGAIN — new empty account
User said "new session". environment_get: us2.make.com, org 9177395 "My Organization", team 3096762 "My Team" + private space 3096810 "Obai's space". Free plan, created 2026-10-03, 0 scenarios, 0 ops used (1,000/month, reset 3 Nov), executionTime 5 min, 2 active scenarios, 1 data store / 1 MB. NOT the Pro account (eu1 9108439, live v4.2 scenario 7628024) and NOT the client account (us2 7709464). User: "if it is for bahir move everything there". Owner name is NOT visible via API (org "My Organization"; logged-in user = Obai 5318458 obai.2452002, invited; org created by a new Make user, likely id 9488341 = author of the default AI connection; country 202/tz 301 = same as the client org 7709464, unlike Obai's orgs 135/214). Treated as the client's. CREATED: data structure 521540, data store 164085 (1 MB), credential request 8f640e49-bfd0-42f3-b841-50990c49be58 (pending; Drive/Sheets/Gmail/Gemini). hooks_create was DENIED by the auto-mode classifier (Modify Shared Resources) - do not retry; the user creates the webhook in the UI. Builder: v4/build_migrate_v42.py <drive> <sheets> <gmail> <gemini> <hook> (from live_v42.json; dry run OK 42/9/1, 303 KB) -> Downloads/solar-us2.create.json, user POSTs to https://us2.make.com/api/v2/scenarios?confirmed=true with a us2 token. Free plan 5-min run limit will cut full 12-bill runs - needs a paid plan. After go-live: GHL -> new hook, turn off Pro 7628024 + eu2 9835572.

## 2026-10-04 FINAL PRE-HANDOVER AUDIT (user: "check everything, up to 5000 credits; tell serious findings before fixing")
Live tests (testrun/final_*.json, customers 5550002004/2006/2007/2011). PASSED: T11 incomplete (5 ops); T12 phone "(555) 000-2006" matched the existing customer + "Mar slot – duplicate bill for Jan…"; T9 PNG in the pre-solar slot handled (preStatus "FAILED - pre-solar extraction returned nothing", review email).
**SERIOUS FINDINGS (confirmed, NOT fixed — the user DECLINED on 2026-10-04: "no need all these are fine for now"; do not re-propose unless asked):**
- F1: a production file sent LATER never fills "Solar Produced" for months already on file. Only [55] writes column F, and only for bills accepted in that run. T8/T8b: customer 2007's Jan production stayed empty although prodTxt has 2026-01=662.
- F2: "Solar report ready" never fires on a run with no accepted bills (production-only or pre-solar-only resubmission of a complete customer). [62] requires length(distinct(60.accounts))=1, and accounts = accounts of bills accepted THIS run. HP run on 2004 (12 months, no flags) → [63] "needs review". Fix idea: <=1 in [62], >1 in [63]; keep [1003] =1.
- F3: an empty "Contracted solar production" on a resubmission WIPES the saved value. [21] writes F{rowContract} unconditionally (USER_ENTERED). T10 on 2006 → blank, and the summary says "Enter the contracted production above…". Fix idea: filter non-empty + strip non-numeric.
Handover config: opsEmail ahmedalaqel26 (personal); Gmail sender obai.2452002; template/folder/Run Log owned by obai.2452002 (shared to info@ubakel.com); Gemini key owner; GHL field names + list format + webhook URL; test data cleanup; client plan.
Minor: pre-solar has no PDF check (generic message); a name starting with = or + becomes a formula (USER_ENTERED); only ComEd layouts tested; newer-year/older-bill only probe-verified (needs customer B's 2025+2026 files from Drive).

## 2026-10-04: v4.2 IS LIVE AND VERIFIED on 7628024 (lastEdit 2026-10-04T02:19:52.799Z, active, valid, hook 3789867)
- Live is identical to v4/patched_v42.json: 155 modules, 0 field diffs, same structure and route filters, refs clean, brackets balanced, NetSolar ×13, UBAKEL ×0, [64] name from the form.
- **TESTED 2026-10-04 02:25 UTC (62 ops, 26 s):** test customer 5550002006 "Sara FormCheck" (testrun/T7_v42.json: Jan bill of Hussein Saleh + production).
  - Report "FormCheck_Sara - Solar Bill Review 2026" (1XgwB3-BgCP_wD0C5N9KNLQDBcyL5_VpVT8-HF-_Ok1I): Customer Name = "Sara FormCheck" (form); address/phone from the bill; Drive PDF export = 1 page, no note markers.
  - Run Log row "Done/complete" with NO email-failure row, so the email was sent. The user should eyeball the NetSolar header.
  - Test customers in the Pro data store are now 5550002001–2006 (cleanup = D item).

## 2026-10-02 — user requests: (1) customer NAME from the FORM, not the bills; (2) the PDF must be ONE page
- (2) DONE, no scenario change. The 3-page PDF came from the TEMPLATE: page 2 = the 2nd tab "Screen Shots " (note the trailing space), page 3 = the 7 cell notes [1]–[7] (Google prints notes as endnotes in Drive PDF export).
  - Via a throwaway Make scenario (Sheets makeAPICall batchUpdate, conn 11303550): hid the "Screen Shots " tab (updateSheetProperties hidden) and cleared all notes on "Bill Review" (repeatCell note "" fields note).
  - Applied to template 1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0 and the HappyPath test report. Both now export as 1 page; verified by exporting.
  - Note texts backed up: Downloads/solar-template-cell-notes-backup.txt.
  - Older reports keep 3 pages (test data only). The helper scenario was deleted.
- 2026-10-04: v4.2 ALSO changes the email header wordmark UBAKEL → **NetSolar** in all 13 sendAnEmail modules (`letter-spacing:.5px">NetSolar<span`). The "contact Ubakel" support lines in 3002/3005/3008/3023 stay. v4.2 now changes 14 modules: 64 + 13 emails. Live is unchanged since 2026-09-26. The manual is v1.4: the email mock-ups show the text "NetSolar | Solar Bill Review" (no logo image).
- (1) BUILT, NOT PUSHED: v4.2 = live 7628024 (new_live.json) with [64] changed (plus the wordmark above). The name is now "{{1.first_name}} {{1.last_name}}" (was 60.billName). The filter is now OR [billName != ""] [4.array[1].phone = "" (new customer)].
  - Address and phone are still from the bills; email is from the form. Body: Downloads/solar-v42.patch.json, built by v4/build_v42.py. Refs and brackets are OK.
  - After the push: diff live against v4/patched_v42.json.
- Manual → v1.3: the common-situations row now reads "address or phone differs from the form → name/email from form, address/phone from bills". Source backup: manual_v1.2.html.
- render.py: Edge headless needs `--user-data-dir=<manual>/edge_profile` (it silently printed nothing while another Edge was open); the 2nd arg sets the output name.

## 2026-09-27: CONNECTOR BACK ON THE PRO ACCOUNT (eu1, org 9108439, team 2947115) — the user will make changes here; the client will upgrade their Make plan and come back later for the client-account setup below.
- Scenario 7628024 unchanged: no runs or edits since the customer C test (12:17 UTC 2026-09-26).

## CLIENT ACCOUNT SETUP IN PROGRESS 2026-09-26 13:45 UTC — connector now on the CLIENT's Make (the user: "this is the client Make.com ... set up everything there")
- us2.make.com, org **7709464**, team **2313094**. Created by Naif Saad (info@slightedge.io); obai.2452002@gmail.com has access. **FREE plan**: 1000 ops (reset 2026-10-25), **5-min execution limit**, **dslimit 1 + 1 MB storage already used by the client's "Notion Data Store 1" (100783)**, 2 active scenarios max. The client's 2 inactive "Finance OS" Notion/Claude scenarios — do NOT touch.
- Done: data structure **511916** (26 fields).
- BLOCKED: data-store create → "Not enough space in storage". Needs a paid plan (Core/Pro). Never delete/shrink the client's Notion store.
- Webhook to use: existing unused **2860883** "GHL form" `https://hook.us2.make.com/5ri9rjlp2s5sbyag87ajm6bt33y2dpqe`.
- Connections: credential request `be574cba-f3f5-4a7e-9c71-df47840c7a15` pending (Drive/Sheets as the account with access to the template etc., Gmail as a real Gmail inbox, Gemini key).
- Builder: `v4/build_migrate_client.py <drive> <sheets> <gmail> <gemini> <datastore>` (hook 2860883, team 2313094) → `Downloads/solar-client.create.json` (REST POST body).
- The scenario then needs creating via REST with a CLIENT-account token (or UI import + PATCH), then a diff-verify.

## CONNECTOR SWITCHED AGAIN 2026-09-26 ~13:30 UTC — now on the OLD eu2 account (obai.2452002@gmail.com, org 5085211, team 2580948, FREE, 36 ops left until 2026-10-01)
- PRODUCTION is still the Pro account scenario 7628024 (eu1), which is NOT reachable while the connector points here. Run `environment_get` before any action.
- eu2 still has the OLD pre-fix scenario 9835572 **ACTIVE** (lastEdit 2026-09-24) on hook `https://hook.eu2.make.com/262bf7vny241ym41pa7wcbzoilaeay22` "GHL form", with data store 187666 (15 old test records). Risk: if GHL still posts here, real submissions run the old logic and stop when the 36 ops run out.
- Recommended: point GHL at the Pro hook, then deactivate 9835572 (ask the user first; the classifier earlier blocked me deactivating production-like scenarios).

## MIGRATION TO PRO ACCOUNT DONE AND VERIFIED (2026-09-26 11:10) — the connector now points HERE
- **LIVE SCENARIO IS NOW 7628024** (team 2947115), lastEdit 2026-09-26T11:10:25.112Z, active, valid, hook 3789867, scheduling immediately. After the user's PATCH + Save it matches patched_migrate.json (v4.1 with the new IDs): 155 modules, same structure and filters, sequential on, refs clean, brackets balanced, no old IDs. The only difference: the editor Save re-adds `""` for unmapped TEXT fields prodTxt/firstPost in [77], which is harmless.
- Fact: `""` mapped into a NUMBER data-store field is fine. The old live [77] always had prodKwh "" and wrote records OK.
- NEXT: E tests (10k ops available), point the GHL form at the new hook URL, deactivate old scenario 7602259 (old account, user only). Future PATCHes go to 7628024 with a NEW-account token.
- **FULL TEST ROUND 2026-09-26 11:15–11:24 on 7628024: 406 ops.** Payloads are in the session workspace `testrun/T1..T4.json`; bills are GHL document links.
  - All data paths PASSED:
    - T1 (12 bills + production, customer 5550002001 "FullRun_Test"): every import/export/production figure is correct, no flags.
    - T1b: the pre-solar bill from acct 2673135000 was rejected with the account-mismatch message.
    - T2 (5550002002: Jan mxg12 + pre-solar GRTqe + production): both accepted, all 12 pre-solar bars written.
    - T3 (5550002003, swapped): both rejected with the right messages.
    - T4 (resubmit 2001: dead Mar link, PNG Apr, valid May, PDF as production): Apr flagged "file is not a PDF", Mar "Processing problem – Mar bill could not be downloaded", production conversion failed and old prodTxt was kept.
  - **ALL EMAILS FAILED:** Gmail 400 "Precondition check failed". Cause: the Gmail connection 11303573 is info@ubakel.com, whose mail is on ZOHO (MX mx.zoho.com), so it is a Google account with no Gmail. Fix: reauthorize "Solar – Gmail" with a real Gmail mailbox (the ID stays the same, no blueprint change), OR switch the 13 email modules to Zoho/SMTP (bigger change, relates to A6).
  - The Run Log is readable via the Drive connector: download_file_content with text/csv (read_file_content returns a stale/truncated sample).
  - Test customers 5550002001/2/3 + Drive folders FullRun_Test/PreSolar_Test/Swap_Test now exist (cleanup = D item).
- **Gmail reauthorized by the user as obai.2452002@gmail.com** (same connection 11303573).
- **HAPPY PATH PASSED 2026-09-26 11:53–11:57** (customer 5550002004 "HappyPath_Test", 12 bills + production, no pre-solar; 172 ops, 235 s).
  - Run Log: Done/complete, flagged (none), errors (none), and NO email-failure row. The email was sent; the user should confirm receipt.
  - The folder holds the report, the bills saved as <Mon>_<YYYY>_utility_bill.pdf, and solar_production + source xlsx.
  - Ops used today on the Pro account: about 580 of 10,000.
- **CUSTOMER C REAL-CROSSOVER TEST PASSED 2026-09-26 12:10–12:17** (5550002005 "CustomerC_Test", acct 2673135000; 150 ops, 7m10s; one bill took 3 min in Gemini).
  - Input: 9 post bills (set c bill119..bill112, Jan–Sep 2026) + pre-solar bill121 (Dec25, ends 12/9/25 = firstPost 20251209, boundary accepted) + test production xlsx.
  - All 18 import/export figures match the PDFs exactly, including the corrected May bill115 (500/847) and the 23-day Aug bill111.
  - Pre-solar: 12 months read (Jan 1030 … Nov 822, Dec 1064).
  - Run Log: "Done with issues", with the only flag "Sep 2026 – no solar production figure" (the test production file stops at 2026-08). No email-failure row, so the needs-review email was sent.
  - The files were shared by the USER as "anyone with link" for the test (my own attempt to share via a Make API call was blocked by the auto-mode classifier as data exfiltration — do not retry; ask the user to share). The user was told to set them back to Restricted afterwards.
- (history of this migration below)
- Account **obaiosama.shaaban@student.aiu.edu.my**, zone **eu1**, org **9108439**, team **2947115** "My Team" (private space 2947116). Plan **Pro**: 10,000 ops/month (reset 2026-10-26), 10 MB data-store quota.
- Created by me:
  - data structure **601831** (26 fields, same as the old 587038);
  - data store **198561** (5 MB).
- Webhook **3789867** "GHL form" (`https://hook.eu1.make.com/2l9ng76xevr3jerxp1nsb8ekj2jcjdsw`) was made by the user and is unused. The GHL form must be pointed at it.
- Connections: a credential request `cd08b193-393e-4298-9333-223c27d4b1bc` is pending for google-drive, google-sheets, google-email and gemini-ai. Drive/Sheets must use info@ubakel.com, because the [2] file ids live in obai.2452002's Drive, shared with it.
- Builder `v4/build_migrate.py <drive> <sheets> <gmail> <gemini>` re-points live_v41.json:
  - 42 connection refs;
  - 9 datastore refs (190593→198561);
  - hook 3782641→3789867.
  - It writes the REST POST body `Downloads/solar-migrate.create.json` (blueprint string + teamId + scheduling string).
- The user creates the scenario via REST POST (needs a NEW API token from the new account). Then verify by diff, then the user activates, then the old-account scenario 7602259 should be deactivated.
- **11:05 the user UI-imported the scenario: 7628024**, active, on hook 3789867. Connections (all info@ubakel.com except Gemini): Drive 11303388, Sheets 11303550 (accountName "google"), Gmail 11303573 (the sender is now info@ubakel.com; opsEmail is still ahmedalaqel26@gmail.com), Gemini 11303634.
- Diff against the expected v4.1 (patched_migrate.json): 155 modules, same structure and filters, rows intact. ONLY difference: the importer added `""` for unmapped billRank/prodTxt/firstPost in AddRecord [13, 3077, 77, 65, 1003]. billRank is a number field → possible failure risk. Fix: PATCH body `Downloads/solar-migrate.patch.json` onto 7628024 (the user needs a new-account token).
- The old account (ahmedalaqel2610, org 9021279) is no longer reachable via the connector. Test data was NOT migrated.

## LATEST 2026-09-26 — v4.1 IS LIVE AND VERIFIED (lastEdit 2026-09-26T09:55:55.225Z)
- **v4.1 was pushed by the user and verified.** It is active and valid. The live blueprint is identical to patched_v41.json: 155 modules, 0 field diffs, same structure and route filters, refs clean, brackets balanced, and the F1/F2/F3 markers are present. **Gemini re-probe on v4.1, 2026-09-26 10:02 (5 ops, probe deleted):** the real pre-solar bill `GRTqe…` through the live v4.1 [53] now returns has_net_metering_lines=false, values_found=false (with a note that no export is printed) and confidence medium; billType is pre, and the gate rejects it with "bill from before solar was installed…". [32] returns pre and preCheck OK, with the same 13 bars. The F2 wording is confirmed on the real bill. NEXT: D items (plan upgrade etc.), then the E tests. About 49 ops are left until 2026-10-17.
- v4.1 history: built and probed 2026-09-26 ~09:55. It is F1–F3 on top of live v4. The body is `Downloads/solar-v12-prodmap-fix.body.json` (= v4/patched_v41.json).
  - F1 [59].billType (and its copy inlined in gateReason): General Service + registers + no kwh_to_grid → "pre"; NM and supplier signals are ignored in that branch.
  - F2: the [53] and [32] prompt text and has_net_metering_lines descriptions now say the line must be printed on the bill itself.
  - F3: the gate uses `ifempty(month; "") = ""`.
  - Rule probe: 11/11 correct, using the real Gemini values (bill A → pre + gate rejects, bill B → post + OK, missing month caught, g1/g4 pre, g7 export=0 → unclear, g8 unclear, g5 post, g6 unclear).
  - Only [53], [59] and [32] changed. Refs are clean and brackets are balanced.
  - After the push: diff live against patched_v41.json.
  - CORRECTION: the "1,92.6331 typo" was NOT in live. My probe builder's plain `.replace('52.', '2.')` mangled "1,952.6331". The builders now use a regex that only renames whole module refs.
- **GEMINI PROBE 2026-09-26 09:43 (10 ops, probe deleted): v4 has a live DEFECT, and the fix is proposed but NOT approved or built yet.**
  - The real pre-solar bill (GHL `GRTqe…`, acct 2673135000, Nov 2025, General Service, registers printed) went through the live [53] prompt. Gemini wrongly returned has_net_metering_lines=true, so billType came out "unclear" and the gate returned OK. **The monthly path would ACCEPT a pre-solar bill.**
  - The [32] read of the same bill was correct ("pre", preCheck OK).
  - The post bill (`yuN3Qz…`, Jan 2026) was fully correct on both schemas: import 2706, export 285, supplier 2421.265, DFC 2706, issued 2026-01-28, post, and the pre-slot check rejected it.
  - Proposed fix F1: in [59].billType, General Service + registers + no kwh_to_grid → "pre", with the NM/supplier signals no longer consulted in that branch.
  - Proposed fix F2: harden the [53] has_net_metering_lines description, and fix the "1,92.6331" typo.
  - Proposed fix F3: the [59] gate `53.result.billing_period_month_abbr = ""` does NOT match a missing value (probe: "plain = misses"). It must become `ifempty(...; "") = ""`. This is the only such case in the live IML; the filters are fine because text operators treat empty as "".
- **v4 was pushed by the user and verified** (lastEdit 2026-09-26T09:34:20.358Z, active, valid). The live blueprint is identical to patched_v4.json: 155 modules, 0 field diffs, same structure, route filters identical, refs clean, brackets balanced. Only the editor's setupValidation caches and one restore hint differ. Structure 587038 has billRank and firstPost. NEXT: an optional live Gemini test of the new fields (user's call; about 60 ops left), then D/E.
- Before the push, live scenario **7602259** was v3 (lastEdit 2026-09-25T14:47:33.658Z). The v4 body (name/flow/metadata only, 155 modules) is `Downloads/solar-v12-prodmap-fix.body.json` and is pushed with the usual REST PATCH routine: close Make tabs → PATCH → Ctrl+F5 → Save → toggle. After the push: re-fetch, diff against the file, then run check_refs and balance.
- v4 contains the approved items A1–A5, B1, B2, B5 and B6, plus the user's **bill-type checker in both paths**, which covers B7, C2 and C3, plus C1. Not approved: A6, B3, B4, B8 (see [[solar-pending-updates]]).
  - Monthly path: a bill of type "pre" is rejected with the flag "bill from before solar was installed…".
  - Same month twice: the later issue date wins. The rank is year*1e8 + issue YYYYMMDD. The flags are "duplicate…" and "older than the M bill already on file".
  - The new module [5001] runs the pre-solar checks and rejects the pre-solar bill when it is post-solar, for another account, or its chart ends after `firstPost`. The pre-solar route now runs after the bills route.
- Probes: every new expression was evaluated in throwaway scenarios. All passed, including 6/6 accept cases after the empty-comparison fix. The probe scenario and records were deleted.
- **Not tested live:** Gemini returning the 7 new [53] fields and 2 new [32] fields on real bills. About 60 ops are left until 2026-10-17.
- Build files are in the TEMPORARY session workspace `scratch-2026-09-25-8854ec/v4/`: build_v4.py, patched_v4.json, base.json (=v3). The Downloads body file is the durable copy.
- Manual updated to **v1.1** to match v4. It adds flag rows for pre-solar and older bills, a swapped-bills situation, "latest issued copy" and the pre-solar checks (see [[solar-client-manual]]).

## Current target: NEW account, rebuild in progress

| | value |
|---|---|
| Account | ahmedalaqel2610@gmail.com |
| Zone | **eu1.make.com** (was eu2) |
| Organization | **9021279** (was 5085211) |
| Team | **2836344** "My Team" (was 2580948). A private space **2836347** "Ahmed's space" also exists — use My Team unless told otherwise |
| Plan | Free — **1000 ops**, `dslimit: 1` (ONE data store only), max 2 active scenarios, 1 MB data-store size |
| Ops | **1000 unused, 0 consumed**, resets **2026-10-17 13:26 UTC** |
| Scenarios | none of ours yet; `7467853` "Integration Webhooks, Tools" exists and owns the connections |

## Connections in the NEW account (the imported blueprint references the OLD ids — every one must be re-pointed)

| purpose | NEW id | account | OLD id in blueprint |
|---|---|---|---|
| Google Drive | **11008225** | info@ubakel.com | 14608158 |
| Google (Sheets?) | **11009602** "Solar_Project" | info@ubakel.com | 14608165 |
| Gmail | **11007605** "Solar_Project" | ahmedalaqel26@gmail.com | 14607860 |
| Gemini AI | **11022334** "Solar_Project" (`gemini-ai-q9zyjp`) | — | 14608212 |
| Make's AI Provider | 11005553 | — | not used |

**VERIFY before relying on it:** the Sheets connection shows `accountName: "google"`, not `google-sheets`. The blueprint's sheet modules are `google-sheets:*`. Confirm 11009602 actually satisfies them, or create a proper Google Sheets connection.

## DONE 2026-09-25 — data structure extended to 23 fields (verified by read-back)

Data store **190593** "Solar Bill Customer Records" (0 records) is bound to structure **587038**. `dslimit` is 1, so **do NOT create a second store**.

Structure 587038 now declares all **23** fields (`strict: false`). Read-back with `data-structures_get` confirmed every name and type. **Next step: the user imports the blueprint JSON**, then work through the "AFTER the import" list below.

The original 8 were `phone, recordType, folderId, spreadsheetId, email, firstName, lastName, accountNumber`. The 15 added: `monthKey`(text), `monthLabel`(text), `billYear`(**number**), `summary`(text), `issues`(text), `preStatus`(text), `runId`(text), `status`(text), `stage`(text), `startedAt`(text), `finishedAt`(text), `log`(text), `errors`(text), `prodKwh`(**number**), `prodMap`(**collection**).

`data-structures_update` REPLACES the spec wholesale — send all 23. Type `collection` is valid and holds arbitrary dynamic keys; type `any` is NOT valid. **An undeclared field is silently dropped on write while the run still reports success** — this is the single most dangerous trap in this project.

## IMPORTED 2026-09-25 — scenario 7602259 audited over the API, CLEAN

Scenario **7602259** "Solar Report Pipeline v12 (eu2)" in team 2836344, webhook **3782641** `https://hook.eu1.make.com/yahut12c5wl8y37qi1db8mimauvqyo58`, isActive true, isinvalid false, 147 modules. Audit script: scratchpad `audit.py` of the 2026-09-25-8854ec session. Findings, which supersede items 1-3 and 7 below:
- Connections already re-pointed by the importer: gmail 11007605 x12, drive 11008225 x7, sheets 11009602 x16 (the `google`-type connection was accepted), gemini 11022334 x4. Zero old ids remain.
- All 9 `datastore` params = 190593. All 5 AddRecord write exactly the 23 declared fields (none undeclared).
- `rows` INTACT on 21/33/55/64: shapes [1], [1]x12, [3], [1]x4. All 5 aggregator feeders present.
- `[2]` Drive ids unchanged, and all three are shared with info@ubakel.com as **writer**, so no change needed. The log sheet `1U_a2c...` is also "anyone with link: reader" — flagged to the user as a privacy concern.
- **Still open:** point the GHL form at the new hook; confirm opsEmail. (Toggle not needed: activation 03:33:44 came after the last save 03:33:40. An API deactivate was blocked by the permission classifier anyway.)
- **CORRECTION: the audit above MISSED one defect** — see next block. "All 5 AddRecord write the 23 fields" was checked by KEY only; the prodMap VALUE had been wiped.

## FIRST TEST 2026-09-25 04:40Z — run OK but PRODUCTION MISSING (defect found, NOT fixed)

Execution `126b1440522a41db8658f34d80ef0a9a`: status 1, 178 ops (~822 left), 126 s. All 12 months accepted (summary Jan..Dec), preStatus "OK - all 12 pre-solar months read", account 4646862222. Sheet `1H63y8A7YnsHrT_9zIbx64XdwGK_-EBBxOhsDsSesRdQ`: grid import/export and pre-solar correct, BUT column F Solar Produced is blank and the summary falsely says "UNDER-produced by 2,589 kWh (100% below contract)".

**Root cause (proved by diffing the imported file `Downloads/Solar Report Pipeline v12 (eu2).blueprint (2).json` against the live blueprint):** the UI importer replaced [3077] "Store production map" `data.prodMap: "{{44.prodMap}}"` with `{}`. The ONLY other difference is the hook id. So the prodmap record stores `{}`, [3071] reads `{}`, [55] writes blank F. The production xlsx itself is fine. **The UI import ALWAYS drops a mapped value in a sub-spec-less collection field** (it rebuilds AddRecord mappers from the data structure and pads every other field with ""). It cannot be re-entered in the UI (no input control). Fix must go through `scenarios_update`, but the blueprint is 246 KB minified / 89 KB with designer metadata stripped, well over the ~39 KB inline ceiling.

Before re-testing, delete this customer's data-store records (key prefix `1139006613`), or every month counts as "already held" and [55] will not rewrite F.

**FIXED 2026-09-25 07:26:04Z** — test records deleted (all 16). [3077] `prodMap` restored to `"{{44.prodMap}}"` by the USER running a Make REST `PATCH /api/v2/scenarios/7602259?confirmed=true` with body `{"blueprint": "<string>"}` from `Downloads/solar-v12-prodmap-fix.body.json`. Verified by read-back: the only non-layout diff vs the pre-fix backup is that one value. **The REST route is how to push a full-size blueprint** (it takes the full 246 KB with layout intact). The blueprint may contain ONLY `name`, `flow` and `metadata` — including the `scheduling`/`interface` keys that `scenarios_get` returns gave HTTP 400. Claude never handles the token: the user runs `Read-Host` then curl. The user's Make token was pasted into chat — they were told to revoke it. Revoking tokens seems to have invalidated the Make MCP connector (the user had to reconnect it).
At 07:3x the executions log showed NO stop/start event after the 07:26:04 modify, although the user said they had toggled. Confirm a start event appears after the last modify before the next test. Next test NOT yet run (per the user).

**07:33Z: the fix was WIPED AGAIN by the user's UI saves** (modify events 07:33:01 and 07:33:13). Diff showed [3077] prodMap back to `{}`, nothing else changed. **Treat ANY editor save of this scenario as wiping it** (not yet known whether [3077] was opened during those saves). Rule: after the REST patch, never press Save in the editor. Just toggle, which does not save. Check the executions log for `modify` events after the patch, and re-diff before every test. The body file has been rebuilt from the 07:33 live version, awaiting the user's re-PATCH.
**prodArr ATTEMPT FAILED 07:41Z:** after the user's PATCH + editor Save, [3077] `prodArr` came back as `[]` (the editor renders an array field in item-list mode, restore `mode: chose`, and saves zero items), AND [3071] reverted to its old text. The editor was open during the PATCH and saved its stale copy. **Rules: (1) only TEXT data-store fields survive editor saves. (2) Close the scenario editor tab BEFORE a REST PATCH, and reload it before any Save.**
**PERMANENT FIX v3 (TEXT) — structure DONE 07:45Z, blueprint AWAITING the user's PATCH:** structure 587038 = the 23 fields + `prodTxt` (text); `prodArr` removed. Patch (`patched_v3.json`, backup `live_backup_0741.json`): [43] aggregator gains `pair: "{{substring(42.`0`; 0; 7)}}={{42.`4`}}"`; [3077] `prodTxt: ";{{join(map(43.array; "pair"); ";")}};"`; [3071] adds var `prodTxt = {{3070.data.prodTxt}}`; [58] also gets `prodTxt`; [55] F = `if(contains(58.prodTxt; ";"+K+"="); replace(58.prodTxt; "/.*;"+K+"=([^;]*);.*/"; "$1"); get(58.prodMap; K))` with K = `53.result.billing_period_year + "-" + 81.mmTrue`. A 1-op probe (07:43Z) PROVED join/contains/dynamic-regex replace with `$1`: it returned 1386.159061 for 2026-08 and the fallback for a missing key. [55] is the ONLY consumer of prodMap.
**07:47Z: v3 was ALSO fully reverted: the PATCH at 07:46:45 and an editor Save 38 s later at 07:47:23.** ALL five edits were gone, including the plain-text [3071]/[58]/[55] expressions. **Conclusion: the editor SAVES A STALE COPY loaded before the PATCH.** This is probably also what wiped prodMap at 07:33 and prodArr at 07:41, so "the UI wipes collection/array fields" is UNPROVEN: every wipe came right after a PATCH with the editor open. The required order: close ALL Make tabs, PATCH, then open Make fresh with a hard reload (Ctrl+F5), check a changed module shows its new value BEFORE any Save, and only then Save. No stop/start was logged after 07:47:23. Body rebuilt from the 07:47 live version (`patched_v3b.json`, identical changes).
**v3 TEXT FIX IS LIVE AND SURVIVES AN EDITOR SAVE (2026-09-25 07:52Z).** The order that worked: all Make tabs closed, PATCH (07:50:12), Ctrl+F5, check, then editor Save (07:52:24). Re-diff after the Save: 0 non-metadata differences from `patched_v3b.json`, all five edits present, `rows` intact on 21/33/55/64. No stop/start was logged after 07:52:24, so ask for a toggle before the next test. **Not yet proven end-to-end:** a real run filling column F (needs a full test, ~178 ops; the user must approve the ops). The data store is empty.
**FULL TEST PASSED 2026-09-25 07:54Z. THE eu1 PIPELINE WORKS END TO END, AND [62] "COMPLETE" FIRED FOR THE FIRST TIME EVER.** Execution `d58ca4e8c5d044d097746fc147313c16`: status 1, 178 ops, 117 s. `prodTxt` stored 31 months (2024-02..2026-08). New sheet `155EAHsKoIxwN72CsdDEdZ32-Ag0WExbay-3pHr9bOfE`: column F filled with the correct year-month for all 12 months (Jan-Jul 2026, Aug-Dec 2025), total 15,144 kWh. The Run Log row reads `Done | complete | Jan..Dec`. Ops left ≈ 642 (resets 2026-10-17). An older sheet `1H63y8...` and its folder from the first (broken) test still exist in Drive; the user may delete them. Open question for the user: "Contracted solar production" 2589 vs 15,144 actual gives "484.9% above contract", so check whether 2589 is annual.
**LIVE 2026-09-25 10:47Z:** the user PATCHed at 10:47:05, saved at 10:48:47, and toggled at 10:48:51/53. Re-diff after the Save: 0 non-metadata diffs from `patched_prod.json`, 157 modules, refs clean, brackets balanced, isinvalid false, sequential still false. My webhook POST of a no-email validation submission was BLOCKED by the permission classifier ("Production Deploy"), so the user must send any live test themselves. 10:51:38Z: the user sent a no-email validation submission. Execution `eab360ae...` returned status 1 with 5 ops and the malformed-submission email arrived, so Make accepts the patched blueprint at init. No full bill run since the patch. Ops left ≈ 635 (365 used: 2 full runs × 178, 4 probe ops, 5 validation).
13:44Z: Jan+Feb-only test (returning customer), execution `9c22a53a...`, status 1, 56 ops, 47 s, ops left ≈ 579. The Jan slot held a bill for a DIFFERENT account (2673135000), so it was correctly REJECTED as an account mismatch and flagged. Feb was accepted. Log row: "Done with issues", errors (none), so the review email (not Complete) should have fired. Cosmetic issue: billLog prints "REJECTED - OK [account mismatch]". The report sheet 155EAH... was NOT found via the Drive connector afterwards, probably trashed by the user in cleanup while the 16 data-store records still exist, so returning-customer runs write into a trashed sheet with no error.
**v2 LIVE 14:05Z** (PATCH 14:05:06, Save 14:07:30, toggle 14:07:32/33). Re-diff after the Save: 0 non-metadata diffs from `patched_v2.json`, refs and brackets clean.
**14:13Z: v2 PROVEN on a clean slate.** The user deleted all data-store records and the test Drive folders. A single Jan bill (yuN3..., account 4646862222) was sent as a NEW customer. Execution `cf0a3070...`: status 1, 54 ops, 22 s, ops left ≈ 525. New folder `1yOEJ7iZ7mMBMkquA5e4KNKXiqw6wseER`, sheet `1Mc7VFNhoDy_hyUpO74Riqsb_uC3CQUp4g9Y8l7EWoNw`. Jan row 2706/285 with F blank. The folder holds only `Jan_2026_utility_bill.pdf` (archive after accept works). Records: registry, billyear_jan, run, acct = 4646862222. Run Log: "Done with issues", flag "Jan 2026 - no solar production figure..." (F4 works in a real run). The data store now holds these 4 records for the user's number.
**14:20Z: pre-solar-only test found a DEFECT.** The user cleared the store again. Payload: no monthly bills, and the Feb POST-solar bill (v46X..., 2-row meter table incl. To Grid) put in the "Utility bill before solar" slot. Execution `cda580b1...`: status 1, 49 ops, ops left ≈ 476. The pipeline ACCEPTED it as pre-solar: preStatus "OK - all 12 pre-solar months read", and the Pre-Solar column was filled from the post-solar bill's usage chart (Jan 2706, Feb 2187, ... total 28985). **Nothing checks that the pre-solar bill predates solar.** Also: Run Log status "Done" with flagged "(none)" although 0 bills were processed, and the customer email lists an empty "Months we have on file". **The user said this behaviour is WANTED, so no pre-solar check will be added.** Proposals (b) and (c) below were also not taken up.
**14:28Z test: the pre-solar bill (GRTq..., account 2673135000, one-row meter table) was sent as the only monthly bill (Jan slot).** Execution `e247193f...`: status 1, 54 ops, ops left ≈ 422. It was read as Nov 2025, grid 822, export MISSING ("?"), and still ACCEPTED: the gate never requires kwh_to_grid (undefined < 0 is false). The export cell is left blank. Folder holds `Nov_2025_utility_bill.pdf` plus the report. Account bound to 2673135000. Asked the user whether a missing To-Grid figure should reject a monthly bill.
**PATCH v3 built, AWAITING the user's PATCH** (`build_v3.py` → `patched_v3.json`, base `live_after_v2.json`; no modify since 14:07:30): Drive archive moved after successful processing on the two other routes. Pre-solar [36] moved from before Gemini into [3082] route 1 after [33], so it is only saved when all 12 months were read and written. Production [46] (raw xlsx copy) moved after [44] (figures read). Order-only change: 0 config changes, refs and brackets OK. [41] (the converted Google-Sheet copy) must stay before reading because it IS the reading mechanism.
**RELIABILITY TESTS 14:36-14:42Z (on v2 live, store cleared first). ONLY 69 OPS LEFT AFTER THESE (931/1000); resets 2026-10-17.**
- T1, full 12-bill new customer (payload.json): exec `97592dee...`, status 1, 179 ops, 137 s. "Done", all 12 ACCEPTED, no flags or errors, bills archived as `Mon_YYYY_utility_bill.pdf`, prodTxt stored. PASS.
- T2, hostile resubmission (Mar = fake link → HTTP 400; Apr = PNG; May = valid; production = a PDF): exec `7d274817...`, 66 ops, status 1. F1 handler PASS (log row "Failed/convert-production-file", run continued). Download failure recorded. May accepted using stored prodTxt. "Done with errors". **REGRESSION FOUND:** the PNG was NOT caught by the not-a-PDF guard. v2 moved [57], which carried the "Looks like a PDF" filter, so route 1 of [3086] had no gate and the PNG went to Gemini ([400] invalid argument), then was rejected as "Not recognised". The route-0 "not a PDF" flag is overwritten by route 1's stale 58.flagged read.
- T3, same new customer (+15550001111 "Dup Test") POSTed twice concurrently: 2 executions, 54 ops each, and TWO "Test_Dup" folders (1q2S... registered, 1ZWh... orphaned). Proves F12 is needed.
**v3 now ALSO contains:** the "Looks like a PDF" filter restored on [52] (the new first module of the bill route), and F12 `metadata.scenario.sequential = true`. v3 = Drive-order moves (36, 46) + [52] filter + sequential. Refs and brackets OK. **v3 LIVE 14:46Z** (PATCH 14:46:02, Save 14:47:33, toggle 14:47:36/38). Re-diff after the Save: 0 non-metadata diffs from `patched_v3.json`, sequential true, [52] gated by "Looks like a PDF", refs and brackets clean. Not exercised by a live run: only 69 ops left, so the user must upgrade before any further test. The next live test should resend the T2 PNG case and confirm the "file is not a PDF" flag.
Test leftovers: the Dup Test records (4) + 2 Test_Dup folders; the Ahmed customer (16 records) + folder 1HQeg...
Old proposals, for the record: (a) [32] schema gets a `shows_solar_export` boolean, which gates [33], sets preStatus to REJECTED and emails ops via [34]; (b) [2047] status "Done - incomplete (n/12)" when fewer than 12 months; (c) [66]/[63] print "none yet" instead of blank.
**FOLLOW-UP PATCH v2 (built ~14:00Z; `build_v2.py` → `patched_v2.json`, base `live_after_patch.json`)** answers the user's 2 complaints about the review email. (1) "Written: 12 months" was really months ON FILE: added a `newMonths` roundtrip var ([3040] sets it, [58]/[60] read it). Emails [62]/[63]/[4030] now show "Updated by this submission" plus "Months on file", and [66] says "Months we have on file". [56] accounts now counts accepted bills only (was: gate OK), so a rejected bill's account no longer shows as "accounts: 2". [56] billLog gives the real rejection reason ("account mismatch" / "duplicate, or older..."), no more "REJECTED - OK". (2) [57] Drive archive moved from before extraction to the END of the bill route (after [77]), with filter `81.accept = yes` and filename `{billMonth}_{year}_utility_bill.pdf`, so rejected or foreign bills are no longer archived into the customer's folder. Checks: refs OK, brackets OK, 0 modules added or removed, 9 changed.
**PRODUCTION-READINESS PATCH (2026-09-25 ~10:10Z), built and verified** (body in `Downloads/solar-v12-prodmap-fix.body.json`, source `patched_prod.json`, builder `build_prod.py`, base = 07:52 live). The user approved F1 F2 F3 F4 F7 F8 F9 F10 F11. REJECTED: F5 (daily-data check; their production files are monthly) and F6 (bill-year gate). F12 (sequential processing) got no answer, so it was NOT applied. Changes: F1 [41] gets an error route (4001 log + 4002 Resume, 4003 ops email + 4004 Resume, 4005 Ignore). F2 [957]/[936]/[946] Ignore→Resume. F3 [42] filter `45.index = 0`. F4 [56] flagged gets a final branch: accepted month with an empty production lookup → "Mon YYYY - no solar production figure...". F7 [59] acctOk and [56] accounts/knownAccount compare digits only. F8/F9/F11: new [4020] GetVariables (all err* vars incl. errPdf) between [3034] and [61]; [62] requires no system error and no errPdf; [63] also fires on a system error and requires no errPdf; [66] requires no system error; new [61] route 3 [4030] no-attachment email when errPdf is set (4031/4032/4033 its error route). F10: [3011]/[3014]/[3017] + 4003 now say the report is built WITHOUT production. Adds +1 op per run (4020). Verified: reference checker (157 modules, 0 problems; planted bad refs caught), bracket balance, and 1-op probes of all new expressions (all expected values). The user declined a full test run.
Also, the Make plan is Free: 1000 ops, 5-min execution limit, 5 MB file limit. The user is aware.
**SUPERSEDED prodArr design:** stop depending on the sub-spec-less collection. Structure 587038 now has a **24th field `prodArr`**: array of collection `{monthKey text, solar text}` (the UI renders it, so saves should keep it). Patched blueprint (in the Downloads body file; local copy `patched_v2.json`, pre-change backup `live_backup_0733.json` in the session scratchpad): [3077] writes `prodArr: "{{43.array}}"` (plus `prodMap: "{{44.prodMap}}"` as legacy); [3071] reads `{{if(length(3070.data.prodArr) > 0; toCollection(3070.data.prodArr; "monthKey"; "solar"); ifempty(3070.data.prodMap; emptyarray))}}`. [55] is unchanged: it still does `get(58.prodMap; year-mm)`. After the PATCH: have the user press Save once in the editor, then re-diff. prodArr must survive; prodMap is expected to be wiped, which is harmless. Any future data-structure update must send all 24 fields.
**1-op probe PASSED 07:34Z:** throwaway scenario (1x datastore:AddRecord, the same mapper as 3077, `prodMap: "{{var.input.pm}}"`, input via scenario interface type `collection`, run with `scenarios_run` data) stored `{"2026-07":1734.989424,"2026-08":1386.159061}` intact on store 190593. This proves eu1 runtime persists a mapped collection. Probe scenario and record deleted. **Cheapest single-module test pattern: an interface input instead of a trigger, so no trigger op is spent.**

## AFTER the import — things that WILL break and must be fixed

1. **Every module's `__IMTCONN__`** points at the old account's connection ids (table above).
2. **Every `datastore` parameter** says `187666`; it must say **190593**.
3. **`[2]` hardcodes Google file ids that live in obai.2452002@gmail.com's Drive** — `templateFileId 1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0`, `parentFolderId 1Krmdqux3lyQgxC_-ojK4Vz9FQwgnWnRz`, `logSheetId 1U_a2cR6FozSK5-svWRFubI0d9oCrWAp2WvAGFethLp0`. The new Drive connection is **info@ubakel.com**, a different Google account. Either share those files with info@ubakel.com or recreate template, parent folder and log sheet in the new Drive and update `[2]`.
4. **`opsEmail`** in `[2]` is `ahmedalaqel26@gmail.com` — confirm that is still the intended recipient.
5. **A new webhook** will be created on import; the GHL form must be repointed to the new URL. The old eu2 hook `https://hook.eu2.make.com/262bf7vny241ym41pa7wcbzoilaeay22` is dead to this account.
6. **Toggle deactivate -> activate after the import and after every edit** — a saved blueprint does NOT go live until you do, and no API field reveals this.
7. **Diff `rows` on the four `updateMultipleRows` modules** (old ids 21, 33, 55, 64) after any UI import — expected shapes `[1]`, `[1]x12`, `[3]`, `[1]x4`.

## The eu2 system is the REFERENCE IMPLEMENTATION — do not assume it is reachable

Scenario **9835572** on eu2 (org 5085211, team 2580948) is the fully working, fully tested pipeline described in the blocks below. As of 2026-09-25 that account had **36 of 1000 ops left**, resetting 2026-10-01. The connector can no longer reach it. Treat every eu2/obai id below as documentation of what the blueprint SHOULD look like, not as something to call.

## The one test never completed on eu2

`[62]` "Complete" has never fired — eleven months are held, November is missing because two slots contained the same Sep-2025 bill. A synthetic November bill was generated for this: **`Nov_TEST_bill.pdf`**, 15,365 bytes, `%PDF-1.7`, in the 2026-09-21 session folder (generator kept at `scratchpad/make_bill.py`, built with PyMuPDF — reportlab and matplotlib are not installed). A 2026-09-25 attempt failed only because the PNG preview was uploaded instead of the PDF; the non-PDF guard caught it correctly.

**Verify any submission URL for free before spending ops:**
`curl -sL --max-time 25 "<url>" -o /tmp/chk.bin -w "%{http_code} %{size_download} %{content_type}"; head -c 8 /tmp/chk.bin | xxd -p`
`-L` is essential — GHL links answer 401 to HEAD. A good bill is `application/pdf`, magic `255044462d`.

## FULL TEST PAYLOAD READY AND VERIFIED 2026-09-25

A fresh GHL payload with **all 14 documents verified by direct fetch** (zero Make ops): twelve bills all `application/pdf`, pre-solar `application/pdf` (1.6 MB), production `xlsx` 6,370 bytes. **November is 15,365 bytes `%PDF` — the synthetic TESTCO sample bill, uploaded correctly this time.**

Saved as **`payload-full-verified.json`** in the 2026-09-21 session folder, ready to POST to whatever webhook the rebuilt scenario creates.

**This payload gives TWELVE DISTINCT MONTHS for the first time** — the earlier sets only ever yielded eleven because two slots held the same Sep-2025 bill. It is therefore the run that should finally make `[62]` "Complete" fire, and it also exercises pre-solar and production in the same pass. Budget ~172 operations; the new eu1 account has the full 1000.

URL ids (valid as of 2026-09-25, GHL links may expire): Jan `yuN3QzVzwNeKUBkVPCy1`, Feb `v46XOTwcCLTXGmQrf1oF`, Mar `WzVvCzvz94WAdL57W1hC`, Apr `sXHlShSelzqfsoQIzd93`, May `3TwUX4Uq7zRfxhnL02Z5`, Jun `7O3lMQpwjbAqKbnJOVLA`, Jul `I1Jj1147BPMg4yNLN0P7`, Aug `6NBOHqr7jCR5Xk1LOGzL`, Sep `q9yKjSWWwyuv0URknguJ`, Oct `V4gtTM6nI9PthxjotKmd`, Nov `h97rhu7I9vMZDzpy02q6`, Dec `fpn9tANQ51BcbSMONSr2`, pre-solar `GRTqeioiw9p3kSnh9xvm`, production `C0qZpHVU3KHPWifGLYDX`.

**Always re-verify the URLs with the free curl check before spending ops** — they are per-submission and the last set had a PNG in the Nov slot.

# ======== END CURRENT STATE ========

# ======== PREVIOUS ACCOUNT (eu2 / obai) — reference implementation, read on demand ========


## eu2 state as of 2026-09-21 (superseded by the block above)

**Everything after this block is HISTORICAL ARCHAEOLOGY (v3 through v11, older accounts, superseded findings). Do not read it top-to-bottom. Search it only when you need to know why a specific decision was made.**

**LIVE SYSTEM:** Make scenario **9835572** "Solar Report Pipeline v12 (eu2)", team **2580948**, org **5085211**, zone **eu2**, 132 modules.
- Webhook (point GHL here): **`https://hook.eu2.make.com/262bf7vny241ym41pa7wcbzoilaeay22`** (hook 4383405)
- Data store **187666**, structure **630007** (21 fields, strict false)
- Template (now BLANK, keeps labels + formulas): `1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0` · pre-clear backup with the worked example: `1QB5J5RWBbX3fDopJhJzSD6Ia24sJMgvkh1Tn0o0IOsA`
- Parent folder `1Krmdqux3lyQgxC_-ojK4Vz9FQwgnWnRz` "Client Solar Reports" · log sheet `1U_a2cR6FozSK5-svWRFubI0d9oCrWAp2WvAGFethLp0` "Solar_Logs", tab `Run Log`
- Connections: Drive 14608158 · Sheets 14608165 · Gmail 14607860 · Gemini 14608212, all obai.2452002@gmail.com
- Ops: ~850 of 1000 left, resets 2026-10-01. A full 12-bill report costs ~160.
- **`environment_get` FIRST every session — the Make connector's account has already changed once mid-project.**

**PROVEN WORKING** (first eu2 production run 2026-09-20, status 1, 142 ops, 115s): slot->true-month routing, duplicate detection in-run and across runs, returning-customer workspace reuse, account binding, grid + Solar values matching the reference exactly, customer block from the bill, contracted value, log sheet row, two-tier error handling with alert emails.

**OPEN ITEMS, in priority order:**
1. ~~Change module [32] model to `gemini-3.5-flash-lite`.~~ **DONE - verified 2026-09-22: BOTH [32] and [53] already read `model: "gemini-3.5-flash-lite"` in the live blueprint.** Do not re-raise this item.
2. **The Contracted figure is wrong and it is client-visible.** Reports currently say "OVER-produced by 372.6% above contract" because the form supplies 2589 against a cell the template expects to hold an ANNUAL figure (its own example pairs 17564 with 15144 = 86.2%). Unresolved since the start of the project. Nothing in the pipeline can fix it; the input is wrong.
3. Delete the duplicate `errors` header in column **N1** of the log sheet.
4. **Deactivate old eu1 scenario 7492784** so it cannot catch a stray submission (the connector can no longer reach that account).
5. Confirm module [66] should email the CUSTOMER at `{{1.email}}` — it fires whenever fewer than 12 months are held, which is most runs.

**HARD-WON OPERATIONAL RULES:**
- **Any blueprint edit or activating a second scenario STALLS the webhook queue.** `hooks_get.queueCount` sticks above 0 while the scenario reads active and nothing runs. A deactivate -> activate toggle drains it. Seen five times.
- **UI blueprint import ALWAYS strips `rows` from `google-sheets:updateMultipleRows`** (modules 21, 33, 55, 64) in every zone. Diff after every import. The API does not strip it.
- **Scheduling reverts to `indefinitely/900` after UI saves.** Must be `immediately`. Fix it in the UI panel, not just via API, or it comes back.
- Read any sheet Make creates by repointing a throwaway probe scenario at it (getSheetContent -> aggregator -> datastore record), or directly via the Drive connector now that obai owns the files.

## OPS EXHAUSTED 2026-09-25 — the [62] "Complete" test is the ONLY thing left, resume after the reset

**`organizations_get(5085211)` is the authoritative quota source**: `operations` used, `unusedOperations` left, `nextReset`. Free plan = **1000 ops/month**. As of 2026-09-25 02:15 UTC: **36 unused**, next reset **2026-10-01 06:35 UTC**. A one-bill run costs ~50, so nothing further can be tested until then. DO NOT start a run that cannot finish - a truncated execution leaves the report half-written.

**THE ONE REMAINING TEST:** `[62]` "Complete" has never fired. It needs `okMonths = 12` AND `flagged` empty AND exactly one account AND `errBill` empty. Eleven months are already stored and written; **only November is missing**, because two slots held the same Sep-2025 bill. **A Nov-only submission (~50 ops) is sufficient** - do NOT re-send all twelve bills (~172 ops), they are already proven.

**Synthetic November test bill:** `Nov_TEST_bill.pdf` in the 2026-09-21 session folder - 15,365 bytes, `%PDF-1.7`, generated with PyMuPDF (`fitz`; reportlab and matplotlib are NOT installed). Headed "SAMPLE BILL - GENERATED TEST DATA" from "TESTCO ELECTRIC" so it is unmistakably not a real ComEd document, but structurally a utility bill so `document_is_utility_bill` returns true. Highlighted final NOV bar = 2298 matching the meter table's `kWh From Grid`, so the cross-check agrees and confidence should be high. Account number 4646862222 matches the bound account so `acctOk` passes. Generator script kept at `scratchpad/make_bill.py`.

**The 2026-09-25 attempt FAILED for a trivial reason:** the GHL Nov URL served **image/png, 106,899 bytes** - the `Nov_TEST_bill_preview.png` preview was uploaded instead of the PDF. The pipeline behaved perfectly: `[3087]` flagged `"Nov slot - file is not a PDF and was ignored"`, nothing was stored, status "Done with issues". First real-world catch by that guard.

**REUSABLE TECHNIQUE - verify a submission URL for FREE before spending Make ops:**
```
curl -sL --max-time 25 "<url>" -o /tmp/chk.bin -w "%{http_code} %{size_download} %{content_type}"; head -c 8 /tmp/chk.bin | xxd -p
```
`-L` is essential - these GHL links answer 401 to HEAD and return a redirect body to a plain GET. A good bill shows `application/pdf` and magic `255044462d` (`%PDF-`). Check every URL this way before any test run.

## NON-PDF HANDLING FIXED AND PROVEN 2026-09-24 10:18

Route 7 now reads: `[51]` (filter Bill supplied) -> **`[3086]` `builtin:BasicRouter`** "Usable file?" with
- **route 1: `[3087]`** `util:SetVariables` "Flag unusable file", filter `{{substring(51.data; 0; 4)}} text:notequal "%PDF"`, value `{{add(ifempty(58.flagged; emptyarray); 50.month + " slot - file is not a PDF and was ignored")}}`
- **route 2: `[57]`** carrying filter `{{substring(51.data; 0; 4)}} text:equal "%PDF"`, then `[52]` -> `[53]` -> `[59]` -> `[81]` -> `[56]` -> `[55]` -> `[3040]` -> `[77]`.

`[52]`'s own `%PDF` filter was REMOVED - the gate now lives once, on route 2's entry.

**PROVEN:** re-running the xlsx-in-the-Nov-slot test gave **40 ops, status "Done with issues"**, log `flagged: Nov slot - file is not a PDF and was ignored`, and **no new file in the customer folder**. Before the fix the same input gave status "Done", `flagged: (none)`, and a 6,370-byte spreadsheet stored as `Nov_utility_bill.pdf`.

**KEY PLACEMENT INSIGHT:** the router could go BEFORE `[57]` because **`[52]` reads `{{51.data}}` directly, not `[57]`'s output** - `[57]` and `[52]` are independent siblings fed from the download. So a rejected file never reaches Drive. Always check what a downstream module actually references before assuming a chain dependency.

**Ops cost is net zero:** routers are free, the flag module costs 1, and skipping `[57]`'s upload saves 1.

**Stray file to delete (pre-fix test artefact):** `10EsDchJeOGyZMv8ua3L5vmRa8ZdbsYo0` - `Nov_utility_bill.pdf`, 6,370 bytes, actually a spreadsheet, in folder `1fBGU5NVvukG3GSGiDmiQjmQm3iEbsW2r`.

## NON-PDF TEST 2026-09-24 09:57 — wrong file type is SILENTLY DISCARDED

Test: the production `.xlsx` URL placed in the `Nov utility bill` slot. Run `1790215023`: **40 ops, status Done**, log row `bills: (no bills processed)`, `flagged: (none)`, `errors: (none)`.

`[52]`'s gate is a correct magic-byte check - `{{substring(51.data; 0; 4)}} text:equal "%PDF"` - and it properly refused the xlsx. But a blocked filter stops the chain, so `[53]`, `[59]` and `[56]` never ran, and `[56]` is the ONLY place flags are recorded. Net effect: a customer uploads a file, it is discarded, the month stays blank, and NOTHING in the report, the log or the ops email says why.

**FIX (not yet applied):** insert a `util:SetVariables` between `[57]` and `[52]` with **NO filter of its own** (a filter there would become the next blocked-chain trap), computing:
```
flagged = {{if(substring(51.data; 0; 4) = "%PDF"; ifempty(58.flagged; emptyarray); add(ifempty(58.flagged; emptyarray); 50.month + " slot - file is not a PDF and was ignored"))}}
```
Unconditional module, conditional expression - the same shape `[56]` already uses. Safe against `[56]` clobbering it: when the file is NOT a PDF, `[52]` blocks so `[56]` never runs and the flag survives; when it IS a PDF the expression is a no-op rewrite. Contains no empty-string literal, so the editor cannot mangle it.

**Minor:** the type check runs AFTER `[51]` downloads and `[57]` uploads to Drive, so a rejected file is already stored in the customer's folder (~2 wasted ops plus one stray file per bad upload).

## CONTACT GATE FIXED AND PROVEN 2026-09-24 01:42

`[2]` now defines the shared verdict, and BOTH routes of `[5]` read it - they can no longer drift:
```
contactOk = {{if(length(1.email) = 0; "no"; if(length(replace(1.phone; "/[^0-9]/g"; "")) < 10; "no"; if(length(1.first_name) = 0; "no"; "yes")))}}
```
`[6]` filters `{{2.contactOk}} = "no"`; `[22]` filters `{{1.email}} != "" AND {{2.contactOk}} = "yes"`. `[34]` restored to TWO condition groups (OR).

**PROVEN by two live runs:**
- Valid returning customer, no files: **38 ops**, status 1, processed normally, run record updated.
- Malformed (`phone: "123"`): **5 ops**, status 1, 839 bytes - down from **42 ops**. Datastore verified afterwards: NO `123` registry record, NO `run_123`, no folder, no sheet. Junk is now rejected at the gate.

**TWO WRONG INTERMEDIATE VERSIONS, both caught before any real traffic hit them:**
1. `[22]` was briefly `{{length(2.phoneKey)}} number:less 10` - INVERTED. It passed only for phones SHORTER than 10 digits, so every legitimate submission was blocked and only junk got through.
2. `contactOk` was first pasted as `{{if((1.email = ) + ; "no"; if(length(replace(1.phone; "/[^0-9]/g"; )) < 10; ...` - the THIRD occurrence of the editor double-escaping `""`, this time also deleting `replace()`'s third argument entirely. It made `contactOk` return `"no"` for everyone, blocking all traffic.

**WORKING REMEDY for the recurring quote mangling:** write `length(x) = 0` instead of `x = ""`, which removes most empty-string literals; for any that remain (e.g. `replace()`'s third argument), COPY THE FRAGMENT FROM AN EXISTING WORKING FIELD INSIDE THE MAKE UI rather than pasting from chat. That combination finally stuck.

## DEFECT FOUND 2026-09-23 12:24 — a MALFORMED submission still provisions a workspace

Test: `{"first_name":"Zed","last_name":"Testcase","email":"...","phone":"123"}` - a 3-digit phone. Expected ~4 ops and a rejection. **Got status 1, 42 ops**, and it CREATED: registry record `123`, Drive folder `1qs70BU6CJkw3cNKcD_LmjEPwH8JYusXq`, a full template copy `1ddV2M_tyj0XBlDk2M_SYfJ9fTaEN06Y52L-jXGs0AgY`, and run record `run_123`.

**ROOT CAUSE - the two gates disagree.**
- `[6]` "Missing core contact data" (route 1 of `[5]`) is STRICT: `if(1.email = ""; "x"; if(length(replace(1.phone; "/[^0-9]/g"; "")) < 10; "x"; if(1.first_name = ""; "x"; "ok"))) = "x"`. Phone "123" -> 3 digits -> "x" -> the warning email FIRES.
- `[22]` "Valid submission" (route 2 of `[5]`) is WEAK: only `{{1.email}} != ""` AND `{{2.phoneKey}} != ""`. `phoneKey` for "123" is `"123"` - non-empty - so it PASSES and provisioning proceeds.

Router routes are independent, so BOTH run. The customer gets an email stating *"Nothing was created - no folder, no sheet, no bills processed"* while a folder and sheet are being created. **The email is factually false**, and any bot/partial/test form fill provisions Drive clutter and burns ~42 ops.

**RECOMMENDED FIX (the professional one):** compute the verdict ONCE in `[2]` as a roundtrip variable, e.g. `contactOk = {{if(1.email = ""; "no"; if(length(replace(1.phone; "/[^0-9]/g"; "")) < 10; "no"; if(1.first_name = ""; "no"; "yes")))}}`, then `[6]` filters on `{{2.contactOk}} = "no"` and `[22]` on `{{2.contactOk}} = "yes"`. Exactly one route can run, and the two tests can never drift apart again - which is precisely how this bug arose. A quick fix (duplicating `[6]`'s expression into `[22]` with `= "ok"`) works but re-creates the duplication.

**BONUS FINDING:** this accidentally proved the **first-submission provisioning path works** - `[11]` createAFolder, `[12]` copyAFile and `[13]` registry AddRecord all succeeded for a brand-new phone key. That branch had never been tested in this session.

**Cleanup done:** datastore records `123` and `run_123` deleted. **STILL TO DELETE MANUALLY:** Drive folder `1qs70BU6CJkw3cNKcD_LmjEPwH8JYusXq` and sheet `1ddV2M_tyj0XBlDk2M_SYfJ9fTaEN06Y52L-jXGs0AgY`.

## PRE-SOLAR FIXED AND PROVEN 2026-09-23 12:18 — and the cause was a BAD RECOMMENDATION

Pre-solar-only submission, run `f8bfda9d…`: **status 1, 45 ops**. The PRE-SOLAR column is now FILLED: Jan 530, Feb 456, Mar 465, Apr 528, May 502, Jun 657, Jul 1176, Aug 985, Sep 649, Oct 577, Nov 410, Dec 445, TOTAL **7380**.

**ROOT CAUSE of the blank column, and it was MY error.** I recommended moving `[34]` (chart-unreadable warning) AHEAD of `[33]` (pre-solar write) so the warning would fire before the write. That put a FILTERED module upstream of the write - so whenever the chart read CLEANLY, `[34]`'s filter blocked and `[33]` was skipped with it. A successful extraction therefore GUARANTEED the write was skipped. Exactly the "a blocked filter stops the entire rest of the chain" rule in [[make-blueprint-gotchas]], which I had quoted myself earlier in the same session.

**THE CORRECT FIX (user's, 12:15):** a new `builtin:BasicRouter` **`[3082]`** at the end of route 5, with `[34]` on route 1 and `[33]` on route 2. Independent routes, neither can gate the other. **GENERAL RULE: when two modules each carry their own filter and both must be able to run, they belong on separate ROUTER ROUTES - never in sequence. Reordering never fixes a blocked-chain problem, it only moves which module gets skipped.**

**OUTSTANDING: `[34]`'s filter was flipped from OR to AND in the same edit.** Now `[[{chart != true}, {confidence = low}]]` - one group, so BOTH must hold. It should be two groups `[[{chart != true}], [{confidence = low}]]` so EITHER triggers the warning. As it stands the warning fires almost never.

Note: Nov shows pre-solar 410 against post-solar 0 (Usage Change -410) because no supplied bill resolves to November - correct given the input.

## FULL 12-BILL RUN 2026-09-23 13:24 — PASSED, with ONE new defect found

Run `1790140902`: 12 bills + pre-solar bill + production file. **status 1, 172 ops, 187 s, 17 MB.**

**NEW FIRSTS:**
- **The pre-solar route EXTRACTED successfully for the first time ever**: `preStatus = "OK - all 12 pre-solar months read"`. `[32]` gemini-3.5-flash-lite read all twelve bars, and `[34]` sitting ahead of `[33]` did not block it. (The 2026-09-20 run had `FAILED - pre-solar extraction returned nothing`.)
- **Feb and Mar written for the first time** (`Jul slot -> Feb2026 grid 2187/463`, `Aug slot -> Mar2026 grid 1834/631`). Their production came from the stored map and matches exactly: Feb 926 = `2026-02` 926.019569, Mar 1207 = `2026-03` 1207.041234.
- 11 unique months now held. **November is genuinely absent** - two slots (Feb and Nov) both contained the SAME Sep-2025 bill, so one was correctly REJECTED as a duplicate, and no supplied bill resolves to November. Not a pipeline fault.
- `status = "Done with issues"` and `[63]` fired, which is CORRECT: 11 months != 12 and one flag present. `[62]` "Complete" has still never fired, because the data has never actually been complete.

**NEW DEFECT — the pre-solar values are extracted but never appear on the report.** `[33]` writes `D{{79.rowJanPre}}:D{{79.rowDecPre}}` (should be D31:D42). After the run the PRE-SOLAR vs POST-SOLAR block is still entirely blank, TOTAL 0. Ruled out by inspection: `[33]`'s filter shares its expression with `preStatus`, which said OK, so the filter passed; `[33]`'s handler is `[2025 SetVariables errPreWrite, 2026 Resume]` and the log's `errors` column says `(none)`, so it did not error; `[33].rows` is intact as 12 rows x 1 value; `[15].label` correctly reads `{{14.`2`}}` (column C, 0-based); `[16]` correctly takes the SECOND "Jan"/"Dec" match (`get(map(...); 2)`) for the pre-solar anchors.

**Two surviving hypotheses:** (a) `[33]` wrote twelve EMPTY strings because the `split`/`get` parse of `32.result.bars` yields nothing despite the string containing `JAN=` etc.; (b) `rowJanPre`/`rowDecPre` resolved EMPTY, collapsing the range to `D:D` so the write landed on D1:D12 among merged title/customer cells and was then partly overwritten by `[64]` - which would look exactly like this.

**NEXT STEP - instrument, do not guess.** `[79]` runs FIRST in route 5, so `[35]` can read its outputs. Extend `[35]`'s `preStatus` to append `" | preRows " + ifempty(79.rowJanPre; "?") + "-" + ifempty(79.rowDecPre; "?") + " | bars " + substring(ifempty(32.result.bars; ""); 0; 80)`. One pre-solar-only submission (~45 ops) then prints both the resolved row anchors and the raw bar string into the log sheet's `preStatus` column, settling which hypothesis is right.

**Ops:** ~537 consumed 2026-09-23, roughly **310 remaining** before the 2026-10-01 reset.

## STATE AT END OF 2026-09-23 SESSION

**Hardened `[3070]`/`[3071]` (production map loader):** `limit: 1` (prevents a multi-record search from running the ENTIRE bill loop once per record - there is no aggregator in v2 to collapse bundles), `onerror: [3080 SetVariables errProdLoad, 3081 Resume]` (Resume NOT Ignore - Ignore would discard the bundle and silently skip all bill processing while route 8 still reported success), and `[3071]` guards with `ifempty(...; emptyarray)` since a Resume leaves the failed module's output undefined.

**OUTSTANDING DEFECT (as of 05:16):** `[3071]`'s variable VALUE field contains `prodMap = {{ifempty(3070.data.prodMap; emptyarray)}}` - the variable NAME got pasted into the value. It must contain ONLY `{{ifempty(3070.data.prodMap; emptyarray)}}`. Left as-is, prodMap becomes a literal string and column F blanks on every run.

**CLOSED BY USER DECISION:** per-month bill year on the report = not needed. eu1 scenario 7492784 = not connected, no action. Contracted figure + errBill-survives-Ignore = noted, accepted as-is.

**`[62]` headline now reads** "The solar production report is complete - twelve months on file, newest bill for each month." (genuine U+2014 em dash, stored correctly). Log sheet N1 duplicate `errors` header removed - the sheet now has 13 columns.

**BIGGEST UNTESTED GAP: the pre-solar route has NEVER produced output.** The 2026-09-20 run logged `preStatus = "FAILED - pre-solar extraction returned nothing (model error or no chart found)"`, and every 2026-09-23 test logged `(pre-solar route did not run)` because no pre-solar bill was submitted. The report's entire PRE-SOLAR vs POST-SOLAR section is blank (all twelve Pre-Solar Usage cells empty, TOTAL 0). The `[34]`-before-`[33]` reorder is therefore also untested. A submission carrying `Utility bill before solar` is needed.

**Also never run since the changes:** a full 12-bill submission. Every test today used 0 or 2 bills.

**`prodKwh` (field 22 of structure 630007) is now dead** - nothing writes it under v2. Harmless.

**Ops:** ~365 consumed 2026-09-23, roughly **485 remaining**, resets 2026-10-01.

## v2 PRODUCTION PERSISTENCE — LIVE AND PROVEN 2026-09-23 (supersedes v1 below)

**Live modules:** route 6 ends `[44]` -> **`[3077]` `datastore:AddRecord`** "Store production map" (key `prodmap_{{2.phoneKey}}`, `recordType: "prodmap"`, `prodMap = {{44.prodMap}}`, `overwrite: true`, onerror `[3078 SetVariables errProd, 3079 Ignore]`). Route 7 head: **`[3070]` `datastore:SearchRecord`** (recordType=prodmap, phone, continueWhenNoRes) -> **`[3071]` `util:SetVariables`** (`prodMap = {{3070.data.prodMap}}`) -> `[50]`. No aggregator - one record is one bundle.

**Measured results:** production-only run **47 ops** (was 80). Record `prodmap_1139006613` holds a single `collection` with **31 dynamic `YYYY-MM` keys**, values intact, no stringification. Bills-only follow-up run rewrote Jun and Oct from that map alone: sheet shows Jun 2631/635/**1602**, Oct 2183/618/**1205**, TOTAL Solar 12235 - production sourced ONLY from the stored map.

**`2026-09` self-excluded** because its Solar cell is empty, so the extra solar-value filter discussed for v1's `[3062]` was never needed.

**Structure 630007 now has 23 fields**: the 21 originals + `prodKwh` (number, now DEAD - nothing writes it under v2, harmless to leave) + `prodMap` (collection).

**DO NOT OPEN `[3077]` IN THE EDITOR.** The Make UI renders no input control for a sub-spec-less `collection` field, so pressing OK/Save rewrites the mapper from what it rendered and will drop `prodMap`. See [[make-blueprint-gotchas]]. Paste-and-verify-over-API only.

**v1 records deleted** - all 32 `prod_1139006613_*` gone; store is 13 records (registry, 9 billyear, run, acct, prodmap).

## PRODUCTION PERSISTENCE v2 — ONE RECORD, NOT 32 (designed 2026-09-23, awaiting paste + test)

v1 (per-period records) WORKED but cost **33 operations per production upload** and **32 data-store records per customer**. The store is already near capacity - `data-stores_create` failed with "Not enough space in storage" - so 32 records x N customers does not scale. Replaced by a single-record map.

**OPERATION ACCOUNTING, measured not estimated (2026-09-23):**
- baseline run, no files = **36 ops**; production-only (v1) = **80**; two bills, no production = **61**.
- The 44-op delta on the production run decomposes EXACTLY as: 32 AddRecords + 1 feeder (33) + `[80]``[40]``[46]``[41]``[45]``[42]``[43]``[44]` (8) + loader (3).
- **Therefore `google-sheets:getSheetContent` costs ONE operation even when it returns 32 rows.** Make bills the module CALL, not the bundles it emits. `AddRecord` cost 32 only because a feeder genuinely invoked it 32 times. **When trimming ops, look for modules driven by a feeder, not for modules that return many rows.**

**PROVEN by direct API probe (no scenario run needed):** a data-structure field of type **`collection` with NO sub-spec accepts arbitrary dynamic keys**. `data-store-records_create` with `prodMap: {"2024-02": 882.371063, "2026-06": 1601.937796, "2025-10": 1204.570301}` stored and returned all three intact. Type **`any` is NOT a valid** data-structure type; `collection` is. Structure **630007 now has 23 fields** - `prodMap` type `collection` added 2026-09-23.

**v2 design** (paste files `v2-route6-persist-map.json`, `v2-route7-load-map.json` in the 2026-09-21 session folder):
- DELETE `[3061]` feeder + `[3062]` AddRecord from route 6; replace with ONE `datastore:AddRecord` key `prodmap_{{2.phoneKey}}`, `recordType: "prodmap"`, `prodMap = {{44.prodMap}}`, `overwrite: true`. **1 op.**
- DELETE `[3065]` + `[3066]` + `[3067]` from the route 7 head; replace with `datastore:SearchRecord` (recordType=prodmap, phone, continueWhenNoRes) -> `util:SetVariables prodMap = {{<search>.data.prodMap}}`. **2 ops, no aggregator** - one record means one bundle.
- Result: production upload +33 -> **+1 op**; every run +3 -> **+2 ops**; records per customer 32 -> **1**.
- The solar-value filter discussed for `[3062]` becomes UNNECESSARY: `toCollection` maps an empty Solar cell to `""`, `get()` returns `""`, and `[55]` writes blank - which is the correct outcome.
- No `merge()` needed; whole-map replace IS the agreed newest-overwrites rule.

**STILL UNPROVEN:** whether `datastore:AddRecord` inside a scenario serialises a collection expression `{{44.prodMap}}` into a `collection` field correctly, rather than stringifying it. The API path is proven; the MODULE path is not. One production-only run (~48 ops) settles it. **Fallback if it stringifies:** store the converted `solar_production` sheet's file id instead and re-read it with `listSheets` + `getSheetContent` on later runs - cheap now that getSheetContent is known to cost 1 op.

**Migration done 2026-09-23:** all 32 `prod_1139006613_*` records deleted via `data-store-records_delete`. Store back to 12 records (registry, 9 billyear, run, acct).


## PRODUCTION PERSISTENCE — BUILT AND PROVEN 2026-09-23

Live module ids (after a re-paste; the FIRST paste was silently lost to an editor undo while fixing `[75]` - see below):
- Route 6, appended after `[44]`: **`[3061]` `builtin:BasicFeeder`** (`array = {{43.array}}`) -> **`[3062]` `datastore:AddRecord`** (key `prod_{{2.phoneKey}}_{{3061.monthKey}}`, `overwrite: true`, `prodKwh = {{3061.solar}}`, filter `monthKey != "" AND length = 7`, onerror `[SetVariables errProd, Ignore]`).
- Route 7 HEAD, before `[50]`: **`[3065]` SearchRecord** (recordType=production, phone) -> **`[3066]` BasicAggregator** (`parameters.feeder = 3065`, `pkey`/`pval`) -> **`[3067]` SetVariables** (`prodMap = toCollection(3066.array; "pkey"; "pval")`).
- Structure **630007** gained `{"name": "prodKwh", "type": "number"}` (22 fields now).

**PROVEN by three live runs on 2026-09-23:**
- Production-only submission (80 ops) wrote **32 records** `prod_1139006613_YYYY-MM` spanning 2024-02..2026-09, values byte-matching the source sheet.
- Bills-only submission with **NO production file** (61 ops) wrote Jun and Oct rows and filled column F with **1602** and **1205** - matching `prod_2026-06` (1601.937796) and `prod_2025-10` (1204.570301). The only possible source was the store, so the loader is confirmed.
- Both bills were **ACCEPTED** though Jun2026/Oct2025 were already held at the same year, confirming the `[81]` `>=` change. The 2026-09-20 log shows the equivalent case being REJECTED under strict `>`.

**Production file shape (verified):** an export with a header row then ~32 monthly rows. `[42]` reads `A2:E200`; column 0 = `Time` as `2026-09-01T00:00:00.000-05:00` (so `substring(...; 0; 7)` = `2026-09`), column 4 = `Solar (kWh)`. Rows can have an EMPTY Solar cell (2026-09 did) - that writes a record with `monthKey` and NO `prodKwh`. Consider also filtering on a non-empty solar value.

**`prodKwh` reads back as a STRING** (`"1386.159061"`) despite being declared `number`; Make coerces on use and the sheet shows the rounded integer correctly.

## DIAGNOSTIC UNLOCK 2026-09-23 — read Make's sheets over the Drive connector

`executions_get-detail` still returns only `{"status": "SUCCESS"}` - useless. But the **Google Drive MCP connector can read these files directly**, no probe scenario needed:
- Run Log: `read_file_content(fileId="1U_a2cR6FozSK5-svWRFubI0d9oCrWAp2WvAGFethLp0")` - returns every log row including the per-slot `bills` column (`Jan slot -> Jun2026 | grid 2631/635 | conf high | ACCEPTED`), which is the single best evidence of what a run actually did.
- Report sheet: `read_file_content(fileId="1SKUs29J27o_ij2CwQZVaCY0YU4ED3esc7DZbJgdpWAU")` - full D:F grid, customer block, performance summary.
- Customer folder listing: `search_files(query="parentId = '1fBGU5NVvukG3GSGiDmiQjmQm3iEbsW2r'")` - shows every uploaded bill/production artefact with timestamps, so you can tell which modules ran.

**A PASTE CAN BE SILENTLY UNDONE.** The Phase 1/2 modules were verified present at 02:49, then absent at 03:04 after unrelated edits to `[75]` - Ctrl+Z in the Make editor rolls back an entire paste. **Re-verify module ids after ANY subsequent editing session, not just after the paste.**

## BEHAVIOURAL TEST 2026-09-23 03:07 UTC — PASSED, first real verification of the whole 09-22/23 batch

Test: POST to the live webhook, returning customer `1139006613`, **no files attached at all**:
`{"email":"ahmedalaqel26@gmail.com","first_name":"Ahmed","last_name":"Al-Aqel","phone":"1139006613","Contracted solar production":"2589"}`

Result: **status 1, 36 operations, 6.5 s, transfer 124,750 bytes.**

**CONFIRMED WORKING:**
- `[75]` okMonths seeding - run record `summary` came back `"Jan,Aug,Sep,Dec,Apr,May,Oct,Jul,Jun"` (9 months from stored `billyear` records) on a submission carrying NO bills. The production-only delivery case works.
- `[3048]` router - `[64]` and `[1003]` both correctly declined (run record `accountNumber` empty, `acct_1139006613` untouched at 4646862222) while route 3 ran regardless. Pre-fix this submission died at `[64]` and sent nothing.
- `[3034]` PDF export + `[63]` attachment - **user confirmed the email arrived WITH the PDF attached.**
- Workspace reuse - registry found, existing sheet reused, nothing new created.

**THE RUN THAT FAILED FIRST, AND WHY IT MATTERS:** an identical POST 12 minutes earlier returned status 1 / 36 ops / transfer 28,613 and sent NO email, because the webhook was still executing the PRE-EDIT blueprint. See the deactivate/reactivate entry in [[make-blueprint-gotchas]] - this is the single most expensive lesson of the project so far.

**STILL NOT TESTED BEHAVIOURALLY:** Phase 1 production persistence (`[3053]`/`[3054]`) - needs a submission carrying a production file; there are still zero `prod_*` records in store 187666. Also untested: the bill loop under the new `[55] -> Ignore -> [3040] -> [77]` arrangement, and whether `errBill` survives the `Ignore` to reach `[62]`'s fourth filter condition.

## SHIPPED 2026-09-23 — trunk filters removed, okMonths seeded (verified, lastEdit 2026-09-23T02:28:11Z)

Blueprint **137 modules**. Route 8 delivery is now unconditional:

```
[60] -> [65] -> [2046] -> [2047] -> [3048] builtin:BasicRouter   (NO filter on the router)
                                       |- Route 1: [64]   filter {{60.billName}} != ""
                                       |- Route 2: [1003] filter length(distinct(60.accounts)) = 1
                                       |- Route 3: [3034] -> [61] -> [62]/[63]/[66]
```

`[3048]` is new. `[64]` and `[1003]` keep their original filters but now block ONLY their own route, so the PDF export and all three notifications always run. **Open item "64/1003 gate the trunk" is CLOSED.**

**Two wrong intermediate states worth remembering, both caught by diffing:**
1. The filter was first placed on the ROUTER `[3048]` itself. A filter on a router gates every route, so this reproduced the original bug one level up. Filters belong on the CONNECTION leaving the router - i.e. the `filter` property of each route's FIRST module.
2. `[75].okMonths` was mangled twice by the Make expression editor. First attempt dropped both `""` literals AND the `= ""` comparison (inverting the branches); second attempt produced `= """"` and `+ """"` - the signature of double-escaping on paste.

**`[75]` now has three variables.** The seeding fix landed as a QUOTE-FREE expression to dodge the editor's escaping:
```
okMonths = {{if(74.array[1].label; map(74.array; "label"); emptyarray)}}
```
Relies on `if()` truthiness instead of `= ""`, and omits `remove(...; "")` because all three consumers (`[62]`, `[63]`, `[66]`) already apply `remove(60.okMonths; "")` themselves. **LESSON: when a Make expression needs an empty-string literal, either copy an existing working field in-place or rewrite the expression to avoid `""` entirely.**

Effect: `okMonths` now means "months HELD" (seeded from stored billyear records in route 4) rather than "months written this run", so a production-only submission can reach `[62]` "Complete" instead of falsely reporting missing months.

**`rows` re-verified after every one of these edits** - `[21]` 1x1, `[33]` 12x1, `[55]` 1x3, `[64]` 4x1. Never stripped across the whole 2026-09-22/23 editing session.

**Free module ids now start at 3051** (3034-3036, 3040, 3046, 3048 taken).

## STILL OPEN after 2026-09-23

1. **`[62]` body still says "The solar production report is complete. All twelve months read and validated."** - overstates the filter and implies continuity the period rule does not provide. Suggested: `<p>The solar production report is complete - twelve months on file, newest bill for each month.</p>`. Also `[62]` has a `Months on file / held::` double-colon typo.
2. Contracted figure still wrong and client-visible (372.6%).
3. Per-month bill year still not shown on the report.
4. Duplicate `errors` header in log sheet N1.
5. Retired eu1 scenario 7492784 still active.
6. Delivery-path test (`scenarios_create` clone at ~220 KB) still NOT run.
7. UNVERIFIED: that a roundtrip variable set in an error handler survives an `Ignore`. `[62]`'s `errBill` condition depends on it.
8. Production persistence - plan agreed, not built. See the PRODUCTION PERSISTENCE block.
9. **No end-to-end run has been made since ANY of these changes.** Everything is verified structurally against the blueprint, nothing is verified behaviourally. ~850 ops, ~160 per full run, resets 2026-10-01.


## SHIPPED 2026-09-22 — verified against the live blueprint (lastEdit 2026-09-22T05:15:56Z, isinvalid false, isActive true, scheduling `immediately`, hook queueCount 0)

Blueprint now **219 KB minified, 136 modules**. All of the following were made in the Make UI and verified by diffing two `scenarios_get` snapshots:

- **`[66]` moved to ROUTE 3 of router `[61]`.** `[62]` "Complete" is now reachable for the first time. (Was: unreachable, mutually exclusive filters.)
- **`[34]` moved AHEAD of `[33]`** in route 5, so the chart-unreadable / low-confidence warning fires before the pre-solar write instead of behind its filter.
- **`[81]` accept rule is now `>=`** (`53.result.billing_period_year >= get(58.priorYears; 59.mkey)`), so a same-month/same-year bill can be resubmitted to correct a bad read.
- **`[56]` slimmed to nine variables** — `okMonths` and `seenCsv` removed; `rowThisMonth`, `flagged`, `accounts`, `barChecks`, `billName`, `billAddress`, `billPhone`, `knownAccount`, `billLog` all retained (these MUST stay upstream of `[55]` because rejected bills never reach it).
- **New `[3040]` `util:SetVariables`** between `[55]` and `[77]` sets `okMonths` + `seenCsv`. Still carries a redundant `if(81.accept = "yes"; ...)` test — harmless, it is downstream of `[55]`'s filter.
- **`[55]`'s error handler is now `[2035 util:SetVariables (errBill)] -> [3046 builtin:Ignore]`** (flat route, correct). First attempt mis-wired `Ignore` as an onerror OF `[2035]`, leaving `[55]` with no terminating directive; corrected 2026-09-22. **Net effect: a failed grid write now skips `[3040]` and `[77]`, so `okMonths`, `seenCsv` and the stored `billyear` all mean "actually written".**
- **`[60]` now also reads `errBill`.**
- **`[62]` filter gained a fourth AND condition** `{{length(ifempty(60.errBill; emptyarray))}} = 0`, so a failed write demotes the run to `[63]`.
- **PDF attachment INSTALLED.** `[3034] google-drive:getAFile` v4 (conn 14608158, `file = {{60.sheetId}}`, all four `format*` = application/pdf), sits after `[1003]` and before `[61]`, handler `[3035 SetVariables, 3036 Resume]`. `[62]` and `[63]` both carry `attachments: [{filename: "{{1.last_name}}_{{1.first_name}} - Solar Bill Review {{formatDate(now; \"YYYY\")}}.pdf", data: "{{3034.data}}"}]`.

**`rows` integrity re-verified after every edit** — `[21]` 1x1, `[33]` 12x1, `[55]` 1x3, `[64]` 4x1. The UI edits did NOT strip anything this time. Keep diffing anyway.

**Free module ids start at 3050** (3034-3036, 3040, 3046 now taken; 3043 was used then removed).

## STILL OPEN after 2026-09-22

1. **`[64]` and `[1003]` remain in the trunk ahead of `[3034]` and `[61]`.** `[64]` needs `{{60.billName}} != ""`, `[1003]` needs exactly one `60.accounts`. A run without a bill read this run - including any production-only submission - still stops before the PDF export AND before every notification. This is the single biggest remaining structural gap.
2. `[62]` body still says "All twelve months read and validated" - overstates what the filter checks and implies continuity the period rule does not provide.
3. Contracted figure still wrong and client-visible (372.6%).
4. Per-month bill year still not shown on the report.
5. Duplicate `errors` header in log sheet N1.
6. Retired eu1 scenario 7492784 still active.
7. Delivery path still unsettled - 219 KB vs the ~39 KB inline ceiling; the free `scenarios_create` clone test has NOT been run.
8. UNVERIFIED ASSUMPTION: that a roundtrip variable set in an error handler survives an `Ignore`. The whole `errBill` -> `[60]` -> `[62]` chain now depends on it. Worth a probe before trusting `[62]`'s new condition.

## PRODUCTION PERSISTENCE — plan agreed, NOT built (2026-09-22)

User reopened this and set the rule: **newest upload overwrites; stored production is used when no production file is submitted.**

Design settled (one record per period makes merge-vs-overwrite moot - `overwrite: true` on a per-period key replaces that period and leaves others intact):
- **Phase 0:** add `{"name": "prodKwh", "type": "number"}` to structure **630007** (21 fields today, no value field; `monthKey` text already fits `2026-01`). MUST be first - undeclared fields are dropped silently.
- **Phase 1 (route 6, appended after `[44]`, touches nothing existing):** `builtin:BasicFeeder` over `{{43.array}}` -> `datastore:AddRecord` key `prod_{{2.phoneKey}}_{{<feeder>.monthKey}}`, `overwrite: true`, handler `[SetVariables errProd, Ignore]`. **Needs a filter `monthKey != ""` (and length 7)** because `[42]` reads `A2:E200` and most rows are blank.
- **Phase 2 (NEW route on router `[22]`, inserted AFTER route 6 and BEFORE the bills route):** `datastore:SearchRecord` (`recordType = "production"`, `phone = {{2.phoneKey}}`) -> `builtin:BasicAggregator` (`pkey`/`pval`, **with `parameters.feeder`**) -> `util:SetVariables prodMap = toCollection(<agg>.array; "pkey"; "pval")`. Mirrors `[73]`/`[74]`/`[75]` exactly.
- Persist-then-reload was chosen over merging inside `[44]` so Make's `merge()` with a possibly-empty left operand never has to be trusted. `[44]` becomes redundant but is left alone rather than risk route 6's aggregator chain.
- Nothing in this path may use `ifempty` on a production value - zero is valid.
- Cost: ~3 ops every run, plus up to 12 writes when a production file is uploaded.


## AUDIT 2026-09-21 — five defects verified against the live blueprint (NOT yet fixed)

1. **`okMonths` records intent, not outcome.** Route 7 order is `[56] -> [55] -> [77]`. `[56]` adds the month to `okMonths` before `[55]` writes. Two silent paths: (a) `[55]` errors -> its `Resume` continues -> `[77]` records `billyear` anyway; (b) `[55]`'s filter blocks on `rowThisMonth = ""` -> `[77]` is skipped too (blocked filter stops the chain) but `okMonths` already counted it. In (b) NOTHING anywhere records the failure.
2. **`[62]` "Complete" is structurally UNREACHABLE.** `[66]` sits in the trunk ahead of router `[61]` with filter `okMonths != 12`; `[62]` requires `okMonths = 12`. Mutually exclusive, so every clean run exits silently and `[62]` has never fired. `[64]` (billName) and `[1003]` (one account) gate the same trunk.
3. **`[62]` tests too little** — only `okMonths=12`, `flagged=0`, `accounts=1`. No production coverage, no pre-solar validity, no write confirmation. Production in column F comes from `get(58.prodMap; year + "-" + mmTrue)`; a lookup miss writes BLANK silently.
4. **Same-year correction impossible.** `[81]` accepts only `billing_period_year > get(58.priorYears; mkey)` (strict). A corrected bill for the same month+year is rejected, so a failed write is permanently unrepairable via the form.
5. **Pre-solar warning sits behind the write filter.** `[34]` (chart unreadable / low confidence) follows `[33]`, whose filter counts twelve `"XXX="` tokens. Shares no condition, so incomplete extraction never warns, and low-confidence-with-12-bars writes BEFORE warning.

**Already-collected evidence that nothing reads:** `[55]`'s error handler (module 2035) builds an `errBill` array with the failure message, but `errBill` is NOT in `[60]`'s GetVariables list, so it is discarded. Surfacing it is a one-element change.

**Gemini prompt contradictions (module 53):** (a) schema `billing_period_end` ends "This date determines the reporting month." while `billing_period_month_abbr` and prompt section 4 say the highlighted bar OVERRIDES the dates — delete that one sentence. (b) Section 2 self-check says a kWh figure that "also appears in a comparison tile or a history bar" came from the wrong place, but for the CURRENT month the meter table and the final highlighted bar SHOULD agree, and section 9 plus the `high` confidence definition treat that agreement as the cross-check passing — scope section 2 to bars OTHER than the final highlighted one.

## DECISION 2026-09-21 — reporting period

**Chosen: "the newest available bill for each named month."** Not a calendar year, not the latest twelve consecutive months. Keeps datastore keys as `billyear_{phoneKey}_{mkey}` (no year in key) and the `[81]` accept shape.

Consequences accepted: the twelve months need NOT form a continuous period, so Jan-2025 can sit beside Feb-2026. Therefore (a) the per-month bill YEAR must become visible on the report itself — `[77]` already stores `billYear` per month, so the data exists and it is a template placement question; (b) `[62]`'s "All twelve months read and validated" overstates it and must be reworded; (c) the annual contracted figure is being compared against a deliberately non-continuous twelve months and needs a stated caveat, not just a corrected input.

## DECISION 2026-09-21 (later) — production work is PARKED, spec above is NOT to be built as written

Superseding the PENDING SPEC block below. After walking through the options the user decided:

- **Production handling stays AS IS for now.** Do not build the rebuild/reconciler stage, and do not split `[55]`'s D:F write.
- **Agreed rule: no bill for a month => no production written for that month.** The "provisional production without a bill" idea was considered and rejected.
- **Persisting production to the data store is DEFERRED, flagged for later.** The motivation stands - a second submission should not require re-uploading the production file - but it is not being built now. When it is revisited, note that the user's preferred shape is TWO SEPARATE WRITES (production path writes production; bill path matches and overwrites), NOT a single rebuild stage.

**Why two writers was accepted over a single rebuild:** it works for the stated requirements once the bill path loads stored production (which the spec required anyway), and it is cheaper in operations because the production write only fires when a production file is uploaded. Conceded: my claim that two writers reproduces the partial-submission gap was wrong - it assumed away the "load saved production every run" requirement.

**Conditions to hold it to WHEN it is eventually built:** (a) the bill path must EXPLICITLY clear a production cell when it has no matching year, not just skip it, or a stale figure from the previous year survives and looks correct - this is the highest-risk item, a silent wrong number rather than a visible gap; (b) both paths must read year-matching from ONE shared variable module, or the duplicated logic will drift; (c) accept that there is no self-healing - a failed write stays wrong until someone re-uploads production, so the missing/mismatched list must be prominent in the ops email.

**Still unclarified:** the user said "the sheet is ordered based on the most recent". Unclear whether that means the twelve rows stay labelled Jan-Dec with the newest bill winning per month (the agreed decision), or the rows themselves are ordered newest-first. The row lookup maps month NAMES to fixed rows, so if it is the second, it affects far more than production. ASK before planning anything that touches row order.


## PENDING SPEC 2026-09-21 — production handling across submissions (user-supplied, NOT started)

Goal: bills and production data may arrive in SEPARATE submissions, in either order, and partial production uploads must accumulate. Re-uploading bills is not a workaround because `[81]` rejects an already-recorded month/year.

Current break: `[43]` aggregates production rows to `monthKey`/`solar`; `[44]` builds `prodMap` via `toCollection(43.array; "monthKey"; "solar")` at scope roundtrip — never persisted; `[58]` reads that temporary map; `[55]` writes D:F together and is downstream of the `[51]` "Bill supplied for this month" filter and needs `81.accept = "yes"`. So production-only submissions never write, and later bill submissions cannot see earlier production.

Requested (keep existing architecture):
1. Persist production per customer + `YYYY-MM` (e.g. datastore records keyed by phoneKey + period). Merge partial uploads, never delete stored periods. Conflicting value for an existing period -> FLAG, pending a replacement policy that is still UNDECIDED.
2. Build `prodMap` from persisted records on EVERY submission, including when no production file is uploaded.
3. `[55]` writes bill figures to D:E only. A separate production-update stage runs AFTER the bill route and BEFORE `[60]`, independent of filters `[51]` and `[55]`.
4. That stage must RELOAD the `billyear` state after bill processing (mirroring `[73]`-`[75]`, which load it before) so newly accepted bills are included. Match production to the bill year actually held in each row: a January 2026 bill takes key `2026-01`.
5. Write only column F, preserving D:E. Numeric ZERO is valid production. If a newer bill replaced an older year and no matching production exists, CLEAR the old year's production and flag the missing match.
6. Production-only updates must reach delivery: `[64]` (requires `60.billName`) and `[1003]` (requires exactly one `60.accounts`) depend on THIS run's bill extraction and will block a production-only run. Use saved customer/account state and ensure neither filter can stop the report or the problem notification reaching Bahir.

Acceptance tests: bills-then-production fills cells; production-then-bills uses saved values; partial production accumulates across submissions; newer-year bill either matches new-year production or is flagged and old-year production is cleared; a production-only update delivers the sheet/PDF to Bahir with remaining issues listed.

**Implementation cautions for this spec:** (a) data store 187666 / structure 630007 declares 21 fields and SILENTLY DROPS undeclared ones — new production fields MUST be added to the structure BEFORE any write, or they vanish while the run reports success; (b) do NOT use `ifempty()` on a production value, since it would swallow a legitimate numeric 0 — test against `""` explicitly; (c) the column-F write is 12 rows x 1 value, a different `rows` shape from `[55]`'s 1 row x 3 values; (d) the new stage belongs as a new ROUTE on router `[22]` inserted before the final route, since a router must be last in its own flow; (e) a production-only submission must still pass the `[22]` "Valid submission" gate and reach workspace reuse at `[71]`, which keys off `4.array[1].phone`.

## DELIVERY CONSTRAINT (measured 2026-09-21)

Live blueprint is **216,523 bytes minified**; dropping every `metadata.designer` saves only ~4 KB (212,470). That is far past the ~39 KB inline ceiling noted below for `scenarios_update`, so the whole-blueprint API path is likely unavailable for this scenario and the ceiling itself is UNTESTED at this size. UI import risks the `rows` stripping on modules 21/33/55/64. Canvas paste (clipboard format `{"subflows":[{"flow":[...]}],"metadata":{"version":1}}`) touches only the pasted modules and is the safest path so far, but Make RENUMBERS pasted module ids, so every `{{id.field}}` reference into a pasted module must be re-pointed by hand afterwards.

## PDF ATTACHMENT (prepared 2026-09-21, NOT installed)

`google-drive:getAFile` v4, connection 14608158, `file = {{60.sheetId}}`, all FOUR `format*` fields required despite rendering as advanced (`validate_module_configuration` -> valid). Place between `[66]` and router `[61]`; onerror `[util:SetVariables(errPdf), builtin:Resume]` so a failed export still lets the ops email go. Then add `attachments` to `[62]`/`[63]` with `data: {{<new id>.data}}` — the Attachments field must NOT be left in map mode. Caveat: Drive exports with DEFAULT page setup (every tab, portrait); if layout is wrong, switch to `google-drive:makeApiCall` against the Sheets export endpoint with `gid`/`fitw`/`gridlines`/`portrait`/`range`. Blocked until `[66]` moves, since `[62]` cannot currently fire. JSON saved at `pdf-export-module.json` in the 2026-09-21 session folder.


# ======== END CURRENT STATE — everything below is history ========

Resume point for [[solar-production-report-project]]. Also read [[make-blueprint-gotchas]] before touching any blueprint, and [[solar-report-make-environment]] for IDs and the Bill Review layout.

**(HISTORICAL, 2026-09-14) In Make right now:** **v4 IS IMPORTED.** Scenario **9809574 "Solar Report Pipeline v4"**, created 2026-09-14T21:10Z, last saved 21:18Z, `isinvalid: false`, scheduling `immediately`, **deactivated**. It owns hook **4365343** = `https://hook.eu2.make.com/hy9qavidhn0ymq5ch6zt0pbk4bavval3` (the GHL URL — the import took the right hook, and v3's `hookId` is now null). **Execution history is empty — only two `modify` events, so v4 has never run.**

v3 (**9804287**) still exists, deactivated, hookless. The older **"Solar Bill" (9787368)** and **"Solar Bill (v2 - review)" (9798467)** scenarios are **gone from the team list**. No scenario in team 2641953 is active right now, so the one-active-scenario cap is free.

**FIRST v4 RUN COMPLETED 2026-09-14T21:26Z — execution `b15b343e6421415cb6264baf5b0d7f35`, status SUCCESS.** Fired by POSTing the original real GHL payload (contact `DK1H5WHAwVEdYgEG77s8`, Naif Saad, contracted 2589) to the hook. Sheet produced: `1WRO3he4leUDGD5loeYfUh9Mb9eS24A56nH3_BgwK5vw` in folder `1hcz5mw4YA7Q7ZFZIHdDKV65DlJTWlDs7`. Scenario deactivated again afterwards.

**THE MONTH-ROUTING WORKS. v3's gate-05 failure is fixed.** 9 distinct months accepted and `billyear_` records written: Jan-Jul 2026, Dec 2025, Oct 2025. `flagged` was EMPTY (every bill passed the Gemini quality gate) and `barChecks` was EMPTY (every accepted bill's bar-chart cross-check matched its From Grid meter value). `accounts=4646862222` — one distinct account across all twelve, so no cross-customer contamination.

**The 3 "missing" months are a DATA problem, not a pipeline problem — proved by parsing the 12 PDFs locally.** The twelve upload slots contain only NINE distinct files. Slot -> true billing month (ComEd labels by END month):
Jan->Jun26, Feb->May26, Mar->Apr26, Apr->Jul26, May->Jun26 (byte-identical dup of Jan slot), Jun->May26 (dup of Feb slot), Jul->Feb26, Aug->Mar26, Sep->Feb26 (dup of Jul slot), Oct->Jan26, Nov->Dec25, Dec->Oct25.
So **Aug 2025, Sep 2025 and Nov 2025 were never uploaded** — the customer uploaded three duplicates instead. v4 correctly routed by each bill's own month and correctly refused the three duplicates. Do NOT "fix" the pipeline for this.

**Four real defects the run exposed:**
1. **Duplicate rejections are silent.** `flagged` only accumulates when `59.gateReason != "OK"`; a bill refused by gate 81 (`accept != "yes"`, i.e. month already held at same-or-newer year) is added to neither `okMonths` nor `flagged`. The customer-facing incomplete notice therefore lists what arrived but never says "you uploaded Feb's bill three times and never sent Aug/Sep/Nov" — which is the one thing that would let them fix it.
2. **`okMonths` carries a leading EMPTY element**, so `length(distinct(60.okMonths))` reads 10 when 9 real months are held. This is the `continueWhenNoRes: true` empty-bundle gotcha again: module 73 returns one empty bundle on a first run, aggregator 74 turns it into `priorMonths = [""]`, and `ifempty([""]; ...)` does not treat that as empty. **The completeness test `= 12` therefore fires at ELEVEN real months.** Off by one. Confirmed live: `have=,Jun,May,Apr,Jul,Feb,Mar,Jan,Dec,Oct`.
3. **The lock is vestigial.** `lock_<contact>` is written with `overwrite: false` at module ~502 and there is NO module anywhere that reads it and no `datastore:DeleteRecord` in the whole blueprint (only 2 SearchRecord + 4 AddRecord). So there is no concurrency guard despite the appearance of one, and the stale `status: Processing` record is still sitting in store 184785.
4. **Gmail still cannot send**, so the incomplete-notice email from this run reached nobody.

**ROOT CAUSE FOUND — the monthly grid writes into the WRONG SECTION. One bug, three symptoms.**

`rowMap` (module 78) is built as `{{toCollection(15.array; "label"; "row")}}`. The labels `Jan`..`Dec` each appear **TWICE** in the Bill Review tab — once in MONTHLY USAGE & SOLAR PRODUCTION and once in PRE-SOLAR vs POST-SOLAR. `toCollection` cannot hold a duplicate key, so `rowMap["Jun"]` resolves to the **pre-solar** row, not the grid row. The blueprint already knows about the duplication everywhere else: `rowJanGrid` is `get(map(15.array;"row";"label";"Jan"); 1)` (FIRST match) and `rowJanPre` is the same with `; 2)` (SECOND match). Only `rowThisMonth` (module 56, `{{get(58.rowMap; 81.billMonth)}}`) skips that discipline.

Consequence: module 2183 writes `D{{56.rowThisMonth}}:F{{56.rowThisMonth}}` = [gridImport, gridExport, solarProduced] onto the PRE-SOLAR row, so D(Pre-Solar Usage)=grid import, E=grid export, F(Post-Solar Usage)=solar produced.

**Proved against the live sheet:** the Jun Pre-Solar cell reads **2631**, which is exactly bill-1's `kWh From Grid` meter value for Hussein Saleh — a grid-import number sitting in a pre-solar cell. Symptoms it explains together: (a) MONTHLY USAGE grid entirely blank, TOTAL row 0; (b) Pre-Solar Usage column holding bill grid-import figures instead of bar-chart figures, and only for the 9 accepted months; (c) Post-Solar Usage column populated; (d) PERFORMANCE SUMMARY "Solar Produced (Actual)" = 0 and "Production vs Contracted" = -2589.

**Fix:** `rowThisMonth` must take the FIRST label match like every other grid anchor. `toCollection` cannot express that, so build twelve roundtrip anchors `rowJanGrid`..`rowDecGrid` (each `get(map(15.array;"row";"label";"<Mon>");1)`) at the module-78 stage and select with a 12-way `if()` chain on `81.billMonth`, mirroring how `billMonth` itself is built. **Do NOT use `rowJanGrid + monthIndex` arithmetic** — see the range-arithmetic warning in [[make-blueprint-gotchas]]. Note v4 (~49.8 KB) is over the ~39 KB `scenarios_update` ceiling, so a fix ships as a file to import through the Make UI.

**Confirmed correct in this run:** customer block sourced from the BILL — the sheet shows `Hussein Saleh` / `(224) 600-9096`, matching the PDF exactly (the Naif Saad vs Hussein Saleh mismatch is only the known sample-data mismatch, not a defect). Contracted figure 2589 written to the right cell.

**v5 BUILT 2026-09-15, not yet imported.** `Solar-Report-Pipeline-v5.json` (79 modules, 51,993 bytes compact). Validated: 0 nested-`{{}}`, 0 self-references, 0 forward/cross-route reference errors, 0 duplicate ids, and **zero drift in any module `version`, `module` or `parameters`** vs v4 — only mappers changed, plus new modules 993/994. Over the ~39 KB push ceiling, so **import via the Make UI**; expect it to take hook 4365343 off v4 exactly as v4 took it off v3.

The four fixes:
1. **Grid rows** — module 16 gains `rowFebGrid`..`rowNovGrid` (each `get(map(15.array;"row";"label";"<Mon>");1)`, FIRST match), module 58 fetches all twelve, and `56.rowThisMonth` is now a 12-way `if()` chain instead of `get(58.rowMap; ...)`. `rowMap` deleted from modules 16 and 58 so the collapsing `toCollection` cannot be reused. (`haveGrid` is also dead but was left alone.)
2. **Duplicate reporting** — `56.flagged` now also fires when `81.accept != "yes"`, emitting `"<slot> slot - duplicate bill for <month>, that month is already held"`.
3. **Off-by-one** — `75.priorMonths` guarded with `if(74.array[1].mkey = ""; emptyarray; ...)`, and all 8 `distinct(60.okMonths)` sites hardened to `distinct(remove(60.okMonths; ""))`.
4. **Lock release** — new module 993 after module 66 in routes8 writes `lock_{contact}` -> `status: Done` with `overwrite: true` (Ignore handler 994).

**Lock caveat — NOT fully solved.** Module 10 writes the lock with `overwrite: false` and its `onerror` is `builtin:Commit`, so the uniqueness violation IS the refusal mechanism (it was never "vestigial"). v5 releases the lock on the happy path, but **a run that dies mid-flight still leaves a `Processing` tombstone that permanently blocks that contact's first-time provisioning**, because module 10 only runs when no registry record exists. A real fix needs staleness logic in module 10's filter — deliberately deferred, it is structural and needs a test-run budget.

**Builder note:** patch the tree IN PLACE. Serializing, string-replacing and `json.loads`-ing back orphans every object edited afterwards — the exact bug that put three errors into v4. Also, a string replacement on serialized JSON must be JSON-escaped or it corrupts the file.

**v5 IMPORTED AND RUN 2026-09-15.** Scenario **9811869 "Solar Report Pipeline v5"**, hook 4365343 (taken off v4 as predicted), execution `b5451b01872f420c8c611b893627e38b` at 10:08:42Z, **status SUCCESS**. Fresh provisioning: folder `1rdKIgorbrY7tGz2UkGQcayHjqTjnOlh8`, sheet **`1zueaShtfAmoovBx6ljB-i_31N1b3cdmvb5Vd7NqBSZ0`**. Deactivated afterwards. All four patches CONFIRMED present in the live blueprint (`rowFebGrid`/`rowNovGrid` x3 each, module 993, "duplicate bill for", `remove(60.okMonths`, `74.array[1].mkey`, and `rowMap` gone) — so the import was clean and the v5 file is good.

**Three of the four fixes did NOT take effect, each for its own reason. Grid fix (1) still unverified.**

**CORRECTION to the earlier v4 analysis: gate 81 does NOT dedupe within a run.** `priorYears` is computed once at module 75 from the datastore at run start and is never updated as bills are processed, so every one of the twelve bills gets `accept = "yes"`. The nine `billyear_` records are the result of **key overwrites** (`billyear_<contact>_<mkey>`, `overwrite: true`), not rejections. Proof: fix 2 is live and fires on `81.accept != "yes"`, yet `flagged` came back EMPTY — zero rejections out of twelve bills. Dedup therefore only works ACROSS submissions, never within one. Earlier claim that "v4 correctly refused the three duplicates" was wrong.

**Fix 2 (duplicate reporting) cannot fire** until in-run dedup exists. Real fix: compare against the accumulating `58.okMonths` (or a roundtrip `seenYears` collection updated per bill) instead of the static `58.priorYears`.

**Fix 3 (leading empty) failed — the phantom element is NOT an empty string.** `remove(60.okMonths; "")` and the `74.array[1].mkey = ""` guard are both live and both missed it, so the element is null/undefined from the `continueWhenNoRes` empty bundle. `remove(x; "")` does not strip null, and `null = ""` is false in IML. Need a different test — e.g. guard on `length(74.array)` combined with a non-empty content probe, or filter with `map()` over a collection field that is reliably present.

**Fix 4 (lock release) failed — WRONG PLACEMENT, my error.** routes8 order is `60 -> 65 -> 64 -> 66 (google-email, [Ignore]) -> 993 (lock release) -> 61 (router)`. Gmail still cannot send, module 66 errors, and **`builtin:Ignore` discards the bundle so every downstream module in that chain is skipped** — 993 never ran. Move the lock release to BEFORE module 66 (immediately after 65 or 64). General rule: **never place a required module downstream of one carrying an `[Ignore]` handler.**

**FIX 1 CONFIRMED WORKING — the monthly grid now fills the correct rows.** Sheet `1zueaShtfAmoovBx6ljB-i_31N1b3cdmvb5Vd7NqBSZ0` shows 9 rows populated (Jan-Jul 2026, Oct + Dec 2025) with Aug/Sep/Nov correctly blank. Grid Import and Grid Export were verified row-by-row against the PDFs and match (e.g. Jun 2631/635 = bill-1's meter table exactly). One value to re-check: Feb Grid Export reads 483 in the sheet but my pdfplumber parse says 463.

**NEW ROOT CAUSE — the Solar Produced lookup keys off the UPLOAD SLOT, not the bill's real month.** Live expression: `{{get(58.prodMap; 53.result.billing_period_year + "-" + 50.mm)}}`. `50.mm` is the feeder's hardcoded slot month ("01".."12"), combined with the bill's TRUE year — while the ROW is chosen by `81.billMonth` (true month). So every Solar figure sits in the wrong row. Verified against the xlsx for all 9 rows: row Jun (from the Jan+May slots) got 2026-05's 1840; row Apr (Mar slot) got 2026-03's 1207; row Oct (Dec slot) got 2025-12's 433; row Jan (Oct slot) is BLANK because the key became 2026-10, which has no data. **Fix: derive a 2-digit `mmTrue` from `59.mkey` (12-way if) and use `53.result.billing_period_year + "-" + mmTrue`.**

**PRE-SOLAR SOLVED BY PROBE — root cause was the MODEL, not the config.** Probe scenario **9812109 "PROBE presolar chart"** (4 modules: http:DownloadFile -> gemini-ai:uploadAFile -> extractStructuredData -> datastore:AddRecord writing key `probe_presolar`). Six variants, ~3 ops each, ~18 ops total instead of ~600. Now deactivated; keep it as the harness for any future Gemini tuning.

What each variant proved:
- `thinkingConfig: {"thinkingBudget": 0}` -> **`[400] Request contains an invalid argument`**. Gemini 3 replaced thinkingBudget with **thinkingLevel**; do NOT use thinkingBudget on `gemini-3.5-*`.
- `maxOutputTokens: 4096` alone -> still only aug+sep. Not a truncation problem.
- `thinkingLevel: "low"` -> accepted, output byte-identical. Thinking budget was never the constraint.
- month fields `number` -> `string` -> killed the degenerate float (`3050.0000000000005` became `3050`) but months still missing. **The float was a symptom, not the cause.**
- Capturing `{{3.candidates[1].finishReason}}` and the raw `candidates[1].content.parts[1].text` gave **`finish=STOP`** with a self-closed 2-month JSON — proving **`gemini-3.5-flash-lite` simply only reads 2 of the 13 bars**. All config theories were wrong.
- Switching model to **`gemini-3.5-flash`** -> read ALL 13 bars correctly, but with `thinkingLevel: "low"` it spilled its reasoning into the `sep` string field.

**VERIFIED WORKING CONFIG for module 32:** model **`gemini-3.5-flash`**; all twelve month fields **`type: "string"`**; `generationConfig: {"thinkingConfig": {}, "mediaResolution": "media_resolution_high", "maxOutputTokens": 8192}`; prompt insists "read EVERY bar", "digits only, no words, no reasoning — put commentary in notes". Result: all 12 months, clean digits, `finish=STOP`, confidence high.

**Accuracy: 11/12 exact vs ground truth; Gemini read apr=2488 where the PDF text layer prints 2486** (a single-digit vision misread, 0.08%, still reported "high" confidence). Do not assume "high" confidence means exact.

**GROUND TRUTH for the pre-solar chart (Aug 2024 -> Aug 2025, 13 bars), parsed deterministically from the PDF text layer with pdfplumber:** jan 2205, feb 2652, mar 2226, apr 2486, may 2176, jun 3117, jul 3169, aug 2660, sep 3050, oct 1662, nov 1487, dec 2035. Method: month labels share a row at top~316; value labels sit ~1.4px right of each label's x-centre; the `2024`/`2025` words at top~188 are YEAR markers, not values — exclude them.

**Do NOT change module 53** (per-bill extractor). It is `flash-lite` and succeeds 12/12; only the 12-value chart read needs the stronger model.

**SCALE QUESTION for the user:** PERFORMANCE SUMMARY now reads "System OVER-produced by 7,810 kWh (301.7% above contract)", comparing 9 months of Solar (10,399 kWh) against Contracted 2,589. Confirm whether 2,589 is an ANNUAL or MONTHLY figure before this goes to any customer.

**Reading generated sheets:** the Claude Drive connector is `obai.2452002@gmail.com` and CANNOT open sheets Make creates under `info@ubakel.com`. Verification needs a human screenshot or an in-Make probe.

**v6 BUILT 2026-09-15, not yet imported.** `Solar-Report-Pipeline-v6.json`, 79 modules, 52,235 bytes compact (still over the ~39 KB push ceiling -> **import via the Make UI**; expect it to take hook 4365343 off v5). Validated against v5 as baseline: 0 problems, no new issues, **zero version/module/parameter drift**; exactly 6 mappers changed (32, 55, 56, 58, 75, 81) plus module 993 repositioned.

The five fixes, each grounded in evidence rather than hypothesis:
- **A (the real correctness bug)** module 55 Solar value: `50.mm` -> `81.mmTrue`, a 12-way if() on `59.mkey` giving "01".."12" from the BILL's own month. Placed in 81 (not 59) to avoid self-reference, and 81 precedes 55 in routes7 (`50,58,51,57,52,53,59,81,56,55,77`).
- **B** module 32: model **`gemini-3.5-flash`**, months -> `string`, `thinkingConfig {}`, `maxOutputTokens 8192`, prompt rewritten. Exactly the config the probe proved.
- **C** module 993 moved: routes8 is now `60,65,64,993,66,61` — the lock release runs BEFORE the Gmail module whose `[Ignore]` discards the bundle.
- **D** in-run dedup: `81.accept` now also rejects when `contains(ifempty(58.seenCsv; ","); "," + 59.mkey + ",")`. New `56.seenCsv` accumulator, fetched by 58. Uses **text** `contains()` (certain to exist) rather than an array containment function I had not verified. `56.flagged` now reports those duplicates.
- **E** `75.priorMonths` wrapped in `ifempty(74.array[1].label; "")` so the null from the empty bundle is normalised before the test.

**Expected on a clean v6 run with the sample payload:** 9 grid rows (Jan-Jul 2026, Oct + Dec 2025) with Solar matching the xlsx per row (Jan 662, Feb 926, Mar 1207, Apr 1420, May 1840, Jun 1602, Jul 1735, Oct 1205, Dec 433); 3 duplicate entries in `flagged`; Pre-Solar column filled with the 12 chart values; `have=` with no leading empty; lock `Done`.

**v6 IMPORTED AND TESTED 2026-09-15 — scenario 9812224, hook 4365343.** Tested with a **3-bill payload** instead of 12 (`test-payload-3bill.json`) to save credits: Oct slot (= the Jan-2026 bill, blank in v5), Jan slot (= the Jun-2026 bill), May slot (byte-identical copy of that Jun bill, to force an in-run duplicate), plus the production xlsx and pre-solar PDF. **This works because module 51 carries the filter "Bill supplied for this month" — the hardcoded 12-bundle feeder (module 50) still emits all twelve, but omitted slots stop at that filter before any paid module.** Roughly 45 ops instead of ~100. Fresh sheet `1Tm0_GZrArLK6J3ubr-_buW6p4YSsftYxgcpgmgECHYU`, folder `1JIAQCjgjr9vFnJP5tWuZeHeuF2r7t7tg`. Deactivated after.

**CONFIRMED FIXED (from the data store, no screenshot needed):**
- **C lock release** — `status: "Done"`, `finishedAt: 2026-09-15T11:04:22Z`. It survived past the Gmail module this time.
- **D in-run dedup + reporting** — `outcome: "May slot - duplicate bill for Jun, already recorded from another slot"`, and only TWO `billyear_` records (jun, jan) rather than three. The text-`contains` seenCsv approach works.
- **E phantom element** — `status: "have=Jun,Jan"`, no leading comma.
- Cross-checks still clean: `accounts=4646862222`, `bars=` empty.

**A CONFIRMED FIXED.** Sheet `1Tm0_...` shows Jan = 2706 / 285 / **662** and Jun = 2631 / 635 / **1602**, every other month blank, totals 5337 / 920 / 2264. The Solar figure now tracks the bill's true month. **The grid is fully correct; this was the last correctness bug in it.**

**B ONLY HALF WORKS — AND THE EXTRACTION IS NONDETERMINISTIC.** The Pre-Solar column filled 6 of 12: Jan 2205, Mar 2226, May 2176, Sep 3050, Oct 1662, Nov 1487 (TOTAL 12806). Every value present is CORRECT; Feb, Apr, Jun, Jul, Aug, Dec are simply absent. Same model and config that returned 12/12 in the probe — so **one clean probe run does NOT prove reliability for a stochastic vision call.** Note the 6 returned here closely resemble the partial set (jan, mar, may, oct) from the earlier `thinkingLevel: low` variant: asking for twelve OPTIONAL properties lets the model silently drop half of them.

**Next idea to test on probe 9812109 (~3 ops), NOT yet verified:** replace the twelve optional month properties with ONE REQUIRED string field, e.g. `bars` = "AUG=2660,SEP=3050,OCT=1662,..." covering every bar left to right, then split it in Make. A single required field is far harder to partially omit than twelve optional ones. If that still drops bars, add a completeness check that routes to human review rather than silently writing a half-empty column.

**PERFORMANCE SUMMARY IS MISLEADING ON AN INCOMPLETE REPORT — design issue, needs a decision.** It compares the SUM of whatever months are present against the contracted figure, with no scaling: 2 months gave "UNDER-produced by 325 kWh (12.5% below contract)" (2264 vs 2589), while the 9-month v5 run gave "OVER-produced by 7,810 kWh (301.7% above contract)" (10399 vs 2589). The verdict is only meaningful when all 12 months are present. Either gate that section on 12/12 months or scale it pro-rata. Still unanswered: is 2,589 annual or monthly?

**(superseded) STILL TO CONFIRM: A (Solar values) and B (pre-solar column)** — both need a human to read sheet `1Tm0_GZrArLK6J3ubr-_buW6p4YSsftYxgcpgmgECHYU`, since the Claude Drive connector (`obai.2452002@gmail.com`) cannot open sheets Make creates under `info@ubakel.com`. Expected: **Jan row Solar = 662** (blank in v5) and **Jun row Solar = 1602** (wrongly 1840 in v5), every other month blank, and the Pre-Solar column carrying the 12 chart values.

**Cheap-test recipe worth reusing:** pick bills whose SLOT month differs from their TRUE month (tests the month routing), include one byte-identical pair (tests dedup), and always include the production file — module 10's filter refuses the whole run without `Solar production file`.

**v7 BUILT 2026-09-15 — every mechanic probe-verified before shipping.** `Solar-Report-Pipeline-v7.json`, 82 modules, 53,522 bytes compact. Import via the Make UI. Validated vs v6: 0 problems, no new issues, zero version/module/parameter drift. New ids 995 (Ignore handler), 996, 997.

**USER DIRECTIVE: do NOT touch the Performance Summary / contracted-value logic.** The client owns those sheet formulas; the pipeline's only job is to write `Contracted solar production` into its cell. The earlier "gate the summary on 12/12 months" idea is CANCELLED. (For reference if it ever comes up: 2589 fits nothing cleanly — actual solar is 14,787 kWh/yr, monthly avg 1,232, pre-solar usage avg 2,410/mo; 2589 is within 7% of the pre-solar monthly average.)

**Probe results that drove v7 (all on scenario 9812109):**
- **Single REQUIRED `bars` string field returns 13/13 bars** vs 6/12 for twelve optional fields: `AUG=2660,SEP=3050,OCT=1662,NOV=1487,DEC=2035,JAN=2205,FEB=2652,MAR=2226,APR=2488,MAY=2176,JUN=3117,JUL=3169,AUG=2660`. Models silently drop OPTIONAL properties; one required field is far more reliable.
- **`{{timestamp}}` is epoch SECONDS, not milliseconds** (1789479811 alongside now=2026-09-15T13:43:31Z). Arithmetic on it works, so lock staleness needs no date parsing.
- **IML verified by a pure-logic probe (no Gemini, ~3 ops):** `get(split(get(split(S; "JAN="); 2); ","); 1)` -> 2205; last-occurrence via `get(split(...); length(split(...)))` -> works; the 12-term `contains()` counter gives 12 on a full string and 6 on a partial one; `timestamp - <empty>` evaluates STALE, so legacy lock records without startedTs are safely treated as abandoned.
- **`gemini-3.5-flash` returned `[503] high demand` twice in a row.** Transient, but module 32 had **NO error handler**, so a 503 killed the entire run after provisioning — which is exactly what strands a lock and bricks a contact. The two bugs were the same bug.
- Available builtin error handlers confirmed via `app-modules_list`: Rollback, **Break** (retry), **Resume** (skip error, continue bundle), **Commit**, **Ignore** (discard bundle).

**What v7 changes:**
1. **32** — schema is now one REQUIRED `bars` field; prompt demands every bar; **`[Ignore]` handler added** so a 503 degrades instead of killing the run.
2. **33** — values parsed out of `bars` taking the **LAST** occurrence per month (13-bar charts repeat one month; rightmost = most recent), and a **filter refuses to write unless all 12 months are present**. A half-read chart now leaves the column blank instead of silently wrong.
3. **35** — moved to run directly after 32, before the guarded write, so it always reports. preStatus reads "OK - all 12 pre-solar months read" or "INCOMPLETE - only N of 12 ...". **Diagnostic key: preStatus EMPTY = the Gemini call itself failed; preStatus "INCOMPLETE" = it ran but read too few bars.**
4. **10 + new 996/997** — a lock lease. 996 searches recordType=lock for the contact, 997 aggregates it, and module 10's filter now also requires the lock to be absent, `Done`, or older than 1800s. Module 10 writes `startedTs={{timestamp}}` with `overwrite: true` so an abandoned lease can be retaken. **Trade-off accepted deliberately:** the old `overwrite:false` + Commit was an atomic guard but unrecoverable; the lease recovers automatically at the cost of a millisecond race if two first-time submissions for the same brand-new contact land simultaneously.

**OPERATION COST IS ALMOST ALL FIXED OVERHEAD — cutting bills barely saves anything.** Measured exactly from `executions_list` (`operations` and `centicredits` fields; 1 op = 1 credit here):
- **1-bill run = 63 operations / 6300 centicredits**, 77s (execution `85887410cb2e4de88d7b70576e9214b4`, 2026-09-15).
- A 12-bill run reached ~101 operations.
- So **fixed overhead is ~59 ops** (lock + registry + Drive folder + template copy + getSheetContent + 3 clears + production xlsx parse + pre-solar branch + finalize) and each extra bill is only **~3.5 ops**.
- **I estimated a 1-bill run at ~35 ops and it cost 63.** Do not promise savings from trimming bills; the only real lever is not running at all. A complete 12-month client-ready report costs ~101 credits — budget for that.
- `executions_list` returns `operations`, `centicredits`, `duration` and `transfer` per EXECUTION_END event. **Use it after every run to track spend** — it is the only reliable cost source.

**v7 1-BILL TEST (scenario 9813606, hook 4365343): status 1, SUCCESS.** Payload: Oct slot (= Jan-2026 bill) + production xlsx + pre-solar PDF, with the legacy lock record deliberately left in place.
- **Lock lease CONFIRMED against a real legacy record.** `lock_...` existed with `status: Done` and NO `startedTs`; provisioning still proceeded (modules 996/997 + the new filter read it as free) and the release then rewrote it `Done` with a fresh `finishedAt`. Both halves of the lease work.
- **The [Ignore] handler on module 32 CONFIRMED working** — the run completed end to end (registry, billyear, run record, lock release all written) instead of dying.
- `have=Jan` (no leading empty), `outcome` empty (no duplicates, correct for one bill), `accounts=4646862222`, `bars=` empty.
- Fresh sheet `156I82fXbH6LrjsFvU9S7Es7SBFGLSXGy7H8W-bAInpU`, folder `10gOHZNh7NEkNRHzzsHUVI1fHMsSRgq7s`.
- **`preStatus` came back EMPTY**, which by the v7 diagnostic key means the Gemini call itself failed (very likely another 503) and `[Ignore]` discarded the bundle before module 35 could run.

**SHEET CONFIRMED (v7, 1-bill run):** Jan = 2706 / 285 / **662**, every other month blank, TOTAL 2706 / 285 / 662. Grid and Solar-by-true-month are correct. **Pre-Solar column BLANK with TOTAL 0 — the completeness guard correctly refused to write a partial column.** The guard is proven; the extraction is not.

**PRE-SOLAR IS NOW AN AVAILABILITY PROBLEM, NOT A LOGIC PROBLEM.** `gemini-3.5-flash` has returned `[503] high demand` on 3 of 4 attempts (2 probe + 1 live run); the one success returned a perfect 13/13. `gemini-3.5-flash-lite` has NEVER 503'd but only reads 2 of 13 bars, so it is not a usable fallback. Recommended next change: **`builtin:Break` (label "Retry") on module 32 instead of `Ignore`** — it saves the failed bundle and retries automatically, which suits a transient 503. Caveat from experience: Break stores the run as an INCOMPLETE EXECUTION and the scenario must stay active for the retry to process. NOT yet tested.

**DELIVERY NOTE: the client's own template labels that section "PRE-SOLAR vs POST-SOLAR USAGE (optional)".** A blank pre-solar block is therefore acceptable for a first delivery — the monthly grid and performance summary are complete without it.

**DESIGN WEAKNESS in v7 worth fixing later:** because `[Ignore]` discards the bundle at module 32, module 35 never runs, so a Gemini failure leaves `preStatus` empty — which is INDISTINGUISHABLE from "the pre-solar route never ran at all" (e.g. no pre-solar file supplied). Better: `builtin:Resume` on module 32 with substitute empty values, so module 35 still executes and can record "pre-solar extraction call failed". `Resume` is confirmed to exist via `app-modules_list`; its mapper shape is NOT yet verified.

**v8 BUILT 2026-09-16 (not yet imported or run).** `Solar-Report-Pipeline-v8.json`, 82 modules, 54,925 bytes compact. Surgical change from v7 — the ONLY structural diff is module 995 switching `builtin:Ignore` -> `builtin:Resume`; validated 0 problems, no new issues, no other version/module/parameter drift, aggregator feeders intact (997->996).
- **32** `onerror` is now `builtin:Resume` with an empty mapper, so a Gemini 503 no longer discards the bundle and module 35 still runs.
- **33 / 35** every read of `32.result.bars` is wrapped in `ifempty(...; "")`, because after a Resume that output is undefined and an unguarded `contains()` could throw.
- **35** `preStatus` now distinguishes four states: EMPTY = the pre-solar route never ran (no file supplied); **"FAILED - ... returned nothing"** = the model call failed (the 503 case); **"INCOMPLETE - only N of 12"** = it ran but read too few bars; **"OK - all 12 pre-solar months read"** = success.
- Deliberately NOT enabled: `builtin:Break` retry. It costs operations per retry, needs the scenario left active, and leaves incomplete executions — wrong for a near-zero credit balance. To turn it on later, replace module 995 with `{"id":995,"module":"builtin:Break","version":1,"mapper":{"retry":true,"count":3,"interval":15}}`.

**PRE-SOLAR FINALLY WORKS — eu1, 2026-09-16.** Scenario **7437769** "Solar Report Pipeline v8 (eu1)", webhook `https://hook.eu1.make.com/lbmpavosiy70rso5i9r69ggiqckgj5wt` (hook 3730137). Two 1-bill runs, both status 1: **66 operations, ~42-43 seconds each** (vs 77s on eu2). `preStatus` = **"OK - all 12 pre-solar months read"** — the first successful end-to-end pre-solar extraction in the entire project. **No 503 in eu1**, so the `gemini-3.5-flash` congestion that blocked this on eu2 appears to be region-specific.

Run 2 (after the structure fix) wrote every field correctly: lock `recordType/status "Done"/finishedAt`; registry `recordType "registry"/reportYear "2026"`; billyear `recordType/status "jan"/outcome 2026`; run `recordType/status "have=Jan"/outcome ""`. Sheet `1cRhc_-a4JrRIHvEmYQ4rodzH_5v5ipMB4Js64bwv0YY`, folder `1TQMG62KT2BFV5PUAGF264WI3hurfJ79o`.

**MY BUG, caught and fixed in this session:** I created structure 584368 with only the 6 fields the old structure declared. The store then silently discarded `recordType`, `status`, `outcome`, `startedAt`, `startedTs` and `reportYear` while reporting success — see the new entry in [[make-blueprint-gotchas]]. Structure 584368 now declares **13** fields (the 6 plus recordType, status, outcome, startedAt, finishedAt, startedTs as number, reportYear). Anyone cloning this pipeline again must declare all 13.

**Cost profile on eu1 Free plan:** 66 ops per 1-bill run, 1000 ops/month, 132 used so far. A 12-bill run should be ~104 ops and, at ~42s for 1 bill, is very likely to stay inside the **5-minute execution cap** — eu1 is materially faster than eu2 was.

**STILL TO CONFIRM (needs the user, costs nothing):** (a) does the pre-solar column actually show 12 values in sheet `1cRhc_-a4JrRIHvEmYQ4rodzH_5v5ipMB4Js64bwv0YY`; (b) **did the Gmail email actually arrive** at ahmedalaqel26@gmail.com — connection 10946623 is a real mailbox, unlike the old info@ubakel.com one, so this is the first genuine test of the email path.

**EMAIL IS NOW LIVE — operational warning.** Because Gmail can finally send, the customer-facing "we could not read a full twelve months" email will genuinely go to whatever address the form supplies. On eu2 it was always silently swallowed. The test payload deliberately used contact `TESTEU1DK1H5WHAwVEd` with `email: ahmedalaqel26@gmail.com` so nothing reached the real third party `info@slightedge.io`. Confirm with the client that outbound customer email is wanted before pointing GHL at this webhook.

**MODULE-LEVEL PROOF THAT THE SHEET WRITES WORK (eu1 run 1, 02:55 UTC / 10:55 local).** Make History shows all three writes succeeding against spreadsheet **`14eJ2X1wyOChZeJ2nhGX7cxzMND8bCRbP59lC1kvenho`**, tab "Bill Review", `USER_ENTERED`:
- module **64** Range **D6:D9** -> customer name / address / email / phone
- module **55** Range **D14:F14** -> Jan row (grid import, export, solar)
- module **33** Range **D31:D42** -> **twelve pre-solar rows**. The completeness guard PASSED and a full pre-solar column was written — the first time in the project.

**Row anchors in the real template:** customer block D6:D9, monthly grid starts row 14 (Jan), pre-solar block rows 31-42.

**CONFUSION TO AVOID: two eu1 runs created two different sheets.** Run 1 (02:55 UTC) -> `14eJ2X1wy...` (the one with data). Run 2 (02:59 UTC, after I cleared the data store to re-test the structure fix) -> `1cRhc_-a4JrRIHvEmYQ4rodzH_5v5ipMB4Js64bwv0YY`. I pointed the user at run 2's sheet, which appeared blank; the History screenshots they sent were from run 1. Always cross-check the `spreadsheetId` in the History against the `run_`/registry record before concluding a write failed.

**The template `1lwwk6nQ...` is NOT empty — it holds a complete worked example** (Hussein Saleh, mosaleh23@gmail.com, (773) 675-0735; grid Jan 2706/285/662 ... Dec 2524/227/433; TOTAL 28640 / 6895 / 15144; pre-solar 2411...2119 TOTAL 34945; **Contracted 17564**). So a freshly copied, cleared report shows blank sections but KEEPS Contracted 17564 until the write lands — exactly what a partially-written copy looks like. Do not mistake that for a failed run.

**EVIDENCE ON THE CONTRACTED FIGURE (for the client, not for us to change):** the template's own example pairs Contracted **17564** with Solar TOTAL **15144** = 86.2%, so in the client's reference that value is **ANNUAL**. The GHL form's 2589 is therefore not an annual figure, which is why the percentages looked absurd.

**INDEPENDENT CONFIRMATION OF FIX A:** the template's hand-built Solar column (Jan 662, Feb 926, Mar 1207, Apr 1420, May 1840, Jun 1602, Jul 1735, Aug 1743, Sep 1595, Oct 1205, Nov 776, Dec 433) matches the production xlsx by CALENDAR MONTH across Aug 2025 -> Jul 2026 — precisely what v6's `mmTrue` keying produces.

**eu1 RUN AFTER THE MANUAL `rows` REPAIR (2026-09-16 03:48Z).** Scenario 7437769, status 1. Sheet **`1rWPbeUvAXIcVO2NEt6_l-xff5HfLYoAU3GVb4cBo2ow`**, folder `1bJtcjLa1K894-m9nY7jbQEHIahjPfIqc`. `preStatus` = "OK - all 12 pre-solar months read", `have=Jan`, lock released to Done, accounts/bars checks clean.

**Verified before running (free, via scenarios_get + structural diff): modules 21, 55 and 64 are EXACT.** Module 33 is exact on rows 2-12; row 1 (JAN) still carries a trailing `

` after three attempts, so January's pre-solar cell may land as text `2205
` and be excluded from the pre-solar TOTAL. Everything else should be correct. That is the ONLY known defect in the eu1 build.

**Sheet lineage on eu1 — check the ID before judging a run.** 14eJ2X1wy (run 1), 1cRhc_-a4 (run 2), 1rWPbeUvAX (run 3, post-repair). Runs 1 and 2 were made BEFORE the `rows` repair and are legitimately blank; only run 3's sheet should contain data.

## *** FULL 12-BILL RUN SUCCEEDED — 2026-09-16 03:55Z ***

Scenario 7437769, execution `1a59905782e7409bb1431d718fe4b92c`, **status 1, 159 operations, 128 seconds** (well inside the Free plan's 5-minute cap — the timeout risk was unfounded). Sheet **`1eMmqTFxwCK_-wPTuZXta_NwyAkVof2JxLf3HohO0i_U`**, folder `1lBs61OSN4if6H93_Q0lT7ZW1QX1u0c4t`. **GMAIL CONFIRMED WORKING — the user received the email.** That was the last unproven component of the whole system.

Every mechanism fired correctly in one run:
- **9 billyear records** (jan-jul 2026, oct + dec 2025); `have=Jun,May,Apr,Jul,Feb,Mar,Jan,Dec,Oct` with **no leading empty**.
- **All three duplicates caught and named**: "May slot - duplicate bill for Jun", "Jun slot - duplicate bill for May", "Sep slot - duplicate bill for Feb" — exactly matching the SHA-256 analysis of the 12 PDFs.
- `preStatus` = "OK - all 12 pre-solar months read"; `accounts=4646862222` (single account); `bars=` empty (every chart cross-check passed); lock released to Done.

**Expected sheet figures (all cross-checked against the client's own hand-built template example):** Jan 2706/285/662, Feb 2187/463/926, Mar 1834/631/1207, Apr 1922/811/1420, May 1659/942/1840, Jun 2631/635/1602, Jul 4783/309/1735, Oct 2183/618/1205, Dec 2524/227/433; Aug/Sep/Nov blank (never uploaded). TOTAL 22429 / 4921 / 11030. **Every Solar figure matches the template's reference column exactly.**

**Real eu1 cost model (measured, supersedes earlier estimates):** 1 bill = 66 ops / ~42s; 12 bills = **159 ops / 128s**. Marginal cost ~8.5 ops per bill, fixed overhead ~57. Budget ~160 ops per full report, not the ~104 I had projected from eu2 figures.

## *** THE PIPELINE IS WORKING END TO END (2026-09-16, eu1 sheet `1rWPbeUvAXIcVO2NEt6_l-xff5HfLYoAU3GVb4cBo2ow`) ***

Verified against the live sheet, 1-bill payload:
- **Customer block from the BILL** — Hussein Saleh / 5006 N Kolmar Ave *Hse Chicago, IL 60630 / (224) 600-9096. Email shows the redirected test address, as intended.
- **Grid row** Jan = 2706 / 285 / **662**, all other months blank, TOTAL 2706 / 285 / 662, Total Home Usage 3083. Solar keyed to the bill's TRUE month.
- **PRE-SOLAR COLUMN FULLY POPULATED, all 12 months**: 2205, 2652, 2226, 2488, 2176, 3117, 3169, 2660, 3050, 1662, 1487, 2035. **11 of 12 match the pdfplumber ground truth EXACTLY**; only Apr differs (2488 vs 2486 — the known single-digit Gemini vision misread, 0.08%).
- **Contracted 2589 written**, replacing the template's leftover 17564.
- File auto-named "Saad_Naif - Solar Bill Review 2026".

**The trailing `

` on module 33 row 1 turned out to be HARMLESS.** Pre-Solar TOTAL reads **28927**, which equals the exact sum of all twelve cells — so January was parsed as a number and included. `USER_ENTERED` trims trailing whitespace. No need to chase it further.

**Remaining before client delivery:** (a) confirm the Gmail send actually lands at ahmedalaqel26@gmail.com — the last unproven component; (b) run the full 12-bill payload (~104 ops) to produce the complete report; (c) get the client's answer on whether 2589 is annual or monthly (their own template's example uses 17564 annually).

**Ops used on eu1: 198 of 1000.**

**KEY CHANGED FROM contact_id TO PHONE (v9, built 2026-09-16, not yet imported).** User's decision: `contact_id` must not appear anywhere; the FORM PHONE is the identity for everything.

**Verified phone-normalisation expression** (probe on eu1, since deleted): `{{substring(replace(1.phone; "/[^0-9]/g"; ""); length(replace(1.phone; "/[^0-9]/g"; "")) - 10; length(replace(1.phone; "/[^0-9]/g"; "")))}}`. Digits-only is NOT enough — `+17739619241` gives `17739619241` while `(773) 961-9241` gives `7739619241`, i.e. two keys for one person. Taking the LAST 10 DIGITS collapses `+17739619241`, `(773) 961-9241`, `773-961-9241`, `" +1 773 961 9241 "` and `7739619241` all to **7739619241**. `replace()` with a `/regex/g` literal works in Make. **Caveat: last-10 assumes US numbers.**

Defined once as `phoneKey` in module [2] (which also rebuilds `lockKey` as `lock_<phone>`, since a module cannot reference its own output). Everything else references `{{2.phoneKey}}`.

**What changed:** 21 expression references and 10 field names across ~16 modules — keys on [13] (registry), [65] (`run_`), [77] (`billyear_`), [993] + [10] (lock); search filters on [3] [73] [996]; aggregator mappings on [4] [997]; gate filters on [8] [9] [10] [11] [71]; and **[6] now rejects a phone with fewer than 10 digits** instead of checking contact_id. Validated: 82 modules, 0 problems, no regressions vs the live blueprint.

**Data store 189208 / structure 584368 updated**: `contactId` REPLACED by `phone`; all old `TESTEU1...` records deleted (they were orphaned by the key change). Structure still 13 fields, still `strict: false`.

**DELIVERY METHOD — import, do not hand-edit.** 16 scattered UI edits is the shape of change that went wrong with the `rows` fields. A blueprint import applies all 16 at once; its only known casualty is stripping `rows` from modules 21/33/55/64, which is a known, repairable, free-to-verify problem. **Import into the EXISTING scenario 7437769** (⋮ → Import Blueprint) so hook 3730137 is preserved. File: `Solar-Report-Pipeline-v9-phone.json`.

**NOT included deliberately:** the returning-customer fix (deleting [10]'s first condition). It stays gated until the account-number guard exists, because allowing top-ups without it lets a second household's bills merge into an existing report. Phone keying does NOT solve that — phone identifies the form-filler, exactly as contact_id did.

**Also noticed:** the earlier UI import stripped `maxOutputTokens: 8192` from module 32's generationConfig. Pre-solar still reads 12/12 without it, so it was left alone rather than reintroduced.

**v10 BUILT 2026-09-16 (not yet imported) — the big simplification + the account binding.** `Solar-Report-Pipeline-v10.json`, **79 modules** (was 82). Validated: 0 problems, no regressions, no dangling references, `rows` and aggregator feeders intact.

**REMOVED at the user's instruction:**
- **The whole lock mechanism** — modules [10] (lock write + Commit handler), [993] (release), [996] (lock search), [997] (aggregator), and `lockKey` from [2]. The 30-minute lease is gone. **[10] also carried the gate for route 4, so that filter moved onto router [22]** as "Valid submission": email present, phoneKey present, production file present. The `4.array[1].phone = ""` and lease conditions were dropped, which is what finally enables top-ups.
- **`reportYear`** everywhere — [4], [13] and the structure. It labelled a slot-based report with a calendar year and had no function.
- **Route 3 / module [9]** (different-year refusal) AND its now-empty route. **Deleting a module does NOT delete its route — the empty route must be removed separately or the router is left with a dead branch.**
- **`haveGrid`** in [16] — set but never read. It was the only genuinely dead variable; everything else that looked dead was referenced directly as `{{N.name}}` rather than through GetVariables, so check BOTH before deleting.
- **Route 2 / [8] no longer refuses** — it is now an "additional bills received, report updated" notice filtered on `{{4.array[1].phone}} != ""`.

**ADDED — the account number bound to the phone:**
- **[1000] [1001] [1002]** at the end of router [22] route 4: search `recordType = account` for this phone, aggregate, set `knownAccount`. Route 4 runs before the bill loop, so the value is ready.
- **[59] `acctOk`** = `if(ifempty(58.knownAccount; "") = ""; "yes"; if(53.result.account_number = 58.knownAccount; "yes"; "no"))`. Written as nested ifs deliberately — avoids depending on an `and()` function I have not verified.
- **[81] accept** gains `if(59.acctOk != "yes"; "no"; ...)` as its second test, so a bill from another account never reaches [55].
- **[56]** flags it by name ("bill is for account X but this report belongs to account Y") and accumulates `knownAccount` = `ifempty(58.knownAccount; if(59.gateReason = "OK"; 53.result.account_number; ""))` — which also guards the FIRST run, where nothing is stored yet: bill 1 sets it, bills 2-12 must match.
- **[1003]** in route 8 writes `acct_<phone>`, filtered on `length(distinct(60.accounts)) = 1` so a run that saw two accounts binds nothing.

**Data structure 584368 rebuilt with 14 honest fields** — phone, recordType, email, firstName, lastName, folderId, spreadsheetId, monthKey, monthLabel, billYear (number), accountNumber, summary, issues, preStatus. The old field REUSE is gone (billyear no longer stores the month in `firstName`, the run record no longer stores `have=` in `status`). **Verified programmatically that the set of fields the blueprint writes equals the set declared — that check is what catches the silent-drop bug.** Data store 189208 is empty.

**Open question still unanswered:** whether 2,589 is annual or monthly (client). Everything else on the issue list is now either fixed or deliberately closed.

**v10 IMPORTED CLEAN 2026-09-16 — NEW scenario id `7443798`** (the old 7437769 is gone; `scenarios_get` on it now returns "Insufficient rights", which is what a deleted scenario looks like). It kept **hook 3730137**, so the webhook URL `https://hook.eu1.make.com/lbmpavosiy70rso5i9r69ggiqckgj5wt` is unchanged. `isinvalid: false`, 0 executions, deactivated.

**Verified by full diff against the file I sent: NOTHING was stripped.** 79 modules both sides, no lost mapper keys, no filter differences, no lost parameters, aggregator feeders all intact (4→3, 15→14, 43→42, 74→73, 1001→1000), datastore 189208 everywhere, and all four `rows` arrays byte-identical (21:1, 33:12, 55:1, 64:4). Spot-checked: [2] has phoneKey and no lockKey; [22] carries the 3-condition gate; [59] has gateReason/mkey/acctOk; [1002] and [1003] present and correct.

**So v10 needs no manual repair.** Next step is the first run — which will be the first execution ever of the returning-customer path and the account binding.

## *** v10 PROVEN — THE RETURNING-CUSTOMER PATH AND THE ACCOUNT BINDING BOTH WORK (2026-09-16) ***

Two runs on scenario **7443798**, both status 1, both deactivated afterwards. Sheet **`19uXqqZJsE9BthiSaTit-PWJaX3Kg4dnVX_5YUbUco0c`**, folder `1-vDWO5XRcfWuDIezpwJa4lJUJPCtW8tG`.

**Run 1 — one bill** (Oct slot = the Jan-2026 bill) + production + pre-solar. **66 ops, 38s.** Wrote registry key `7739619241`, `billyear_..._jan` (monthKey/monthLabel/billYear 2026), `run_...` with `summary: "Jan"` and `preStatus: "OK - all 12 pre-solar months read"`, and — first time ever — **`acct_7739619241` holding accountNumber 4646862222**. No lock record anywhere.

**Run 2 — three DIFFERENT months, same customer.** **73 ops, 35s.** This was the first execution in the project's history of module [71] and the whole returning path. Results:
- **`summary: "Jan,Jun,May,Apr"`** — the January from run 1 PLUS the three new months. `okMonths` seeding from `priorMonths` works.
- **Same `spreadsheetId` and `folderId` as run 1** — [71] reused the workspace instead of provisioning a second one.
- Registry NOT duplicated; [13] correctly skipped.
- Four `billyear_` records now (jan, jun, may, apr).
- **`issues: ""`** — no false duplicates, and `acctOk` passed on all three bills against the stored account.
- **`preStatus` absent from the record** — run 2 supplied no pre-solar file, so route 5 never ran and preStatus stayed empty. Exactly the documented "(empty) = route never ran" state.

**Two deliberate variations in run 2, both confirmed working:**
1. The phone was sent as **`773-961-9241`** while run 1 used **`+1 (773) 961-9241`**. Both normalised to `7739619241` and hit the same report — the last-10-digits key works in production, not just in the probe.
2. No pre-solar file was attached, proving a top-up does not disturb the existing pre-solar column.

**Cost model on v10:** 1 bill = 66 ops, 3-bill top-up = 73 ops. The account lookup/bind adds ~3 ops. ~496 of 1000 used this month.

**STILL TO EYEBALL (needs the user, free):** sheet `19uXqqZJsE9...` should now show FOUR filled grid rows — Jan 2706/285/662, Apr, May, Jun — plus the full pre-solar column written in run 1 and untouched by run 2.

**Local artifacts from this run** (session scratchpad, non-persistent): all 14 input files downloaded to `bills/`, plus `payload.json` — the exact replayable webhook body. Downloads need a browser `User-Agent` header; plain urllib gets 403.

**Verified working in v3 (a full run reached 101 operations, status 1, no errors):**
lock + registry records; Drive folder creation; template copy; row anchors from `getSheetContent`; three `clearValuesFromRange` calls; the customer block written from the BILL (name, service address, phone — confirmed correct in the sheet); the contracted figure in the right cell; all twelve bills extracted by Gemini with valid kWh.

**Known broken / unverified:**
- The monthly grid never filled. Root cause was gate 05 rejecting all twelve months ("Bill is not for the month slot it was uploaded into"), confirmed from module 59's output. v4 removes that gate and routes by the bill's own month instead.
- `get(prodMap; billing_period_year + "-" + mm)` — the Solar Produced lookup — has NEVER executed successfully, because no run reached it with working anchors. This is the highest-risk remaining expression.
- **Gmail cannot send.** Connection 14583679 authenticates as `info@ubakel.com`, which appears to be a Google account with Drive but no Gmail mailbox; every send returns `[400] Precondition check failed`. All email modules carry `[Ignore]` handlers so this no longer kills a run, but it means refusals are silent — which the user explicitly ruled out. Needs a new Gmail connection on a mailbox-enabled account; only the user can do that OAuth.

**What v4 adds (all unverified):** two-route provisioning so returning customers reuse their folder/sheet instead of being refused; clears only on a freshly copied template; per-month `billyear_{contact}_{mon}` records so a bill is accepted only if the month is missing or the year is newer; every uploaded file archived to the customer folder; completeness counted across submissions via `distinct(okMonths)` seeded from months already held.

**Hard constraints discovered:**
- `scenarios_update` takes the blueprint inline and the call truncates near **39,000 bytes**. v4 is ~49,800 — it CANNOT be pushed, only imported by file. Make itself has no such limit (v2 was 120,983 bytes).
- The plan allows **one active scenario at a time**.
- A full run costs ~100 operations. The user is credit-constrained — do not run tests without asking.

**Process lesson:** verify a blueprint against the live scenario before editing. A local copy silently lost module 64 during an edit, and a later builder bug (`json.loads` rebuilding the tree, orphaning objects edited afterwards) produced three errors the validator missed. The validator must check cross-route visibility, self-reference, AND forward reference within a branch.

## *** DECISION 2026-09-19: v10 IS THE BASELINE. THE SIMPLIFICATION REWRITE IS PARKED. ***

**USER DIRECTIVE: "I will stick to V10."** Do not propose replacing v10 with a ground-up simplification again unless the user reopens it.

The user built a partial rewrite — `C:\Users\ahmed\Downloads\Integration Webhooks, Tools.blueprint.json`, 49 modules / 91,403 bytes compact, hook 3740110, datastore 190593 — aiming to cut operations by hardcoding sheet cells instead of looking up row anchors. It was reviewed, not run, and deliberately abandoned.

**Why it was parked — the ops math, from our own measured figures.** It would save ~12 ops/run (159 -> ~147, about 7.5%). But re-proving it costs a full 12-bill run at ~150-160 ops, realistically 2-3 of them = 300-480 ops, because the rewrite had broken six things v10 already proved. Payback is 25-40 reports. With ~496/1000 ops used that month (roughly three test runs left) and the client delivery two free questions from done, spending the remaining budget re-validating a rewrite was the wrong trade. **General rule for this project: a change that needs a full re-validation run must save more than ~160 ops to pay for itself.**

**What was wrong in that file** (recorded so the review is not repeated from scratch): module 82 still carried pre-renumbering references (`2.phoneKey`, `59.mkey`, `81.accept`, `53.result...`) and pointed at the OLD datastore 189208, so no `billyear_` record could ever be written; module 35's completeness filter compared the string `JAN=1,FEB=1,...` to `"12"` with `text:equal` and could never pass; module 33 had reverted to `gemini-3.5-flash-lite`, which the probe proved reads only 2 of 13 bars; module 52 aggregated a single column with no key column, so `prodMap` was empty and every Solar cell would be blank; module 53's `priorMonths`/`priorYears` read pre-v10 field names (`label`, `mkey`, `year`) that the rebuilt structure no longer has; the whole bill pipeline sat downstream of the pre-solar `[Ignore]` modules, so a submission with no pre-solar PDF produced no report at all; and everything hung off module 18's "First submission" filter, which removed the returning-customer path entirely.

**THE THREE IDEAS WORTH PORTING INTO v10** as small independent diffs (agreed direction, not yet applied):
1. **Hardcode the cells** — F48, D31:D42, and `rowThisMonth` as a 12-way `if()` on `billMonth` returning literal row numbers. Retires `getSheetContent` on the report, its aggregator, and the three `clearValuesFromRange` calls: ~5-6 ops, but the real value is killing the 0-based-index landmine and the row-anchor fragility that caused the original wrong-section bug. **Jan = row 14 is confirmed; verify Feb-Dec are contiguous 15-25 against the template before trusting it** (pre-solar at 31-42 makes a TOTAL at 26 plausible, unproven).
2. **Drop the per-bill Drive archive** (v10's bill-PDF upload) — **12 ops, the single biggest lever in the pipeline.** Ask the client first whether they need PDF copies in the customer folder.
3. **Drop the duplicate raw xlsx upload**, keeping only the converted copy — 1 op.

Together ~19 ops off a proven baseline (~140/run), each change small enough to reason about, none touching the paths that took eight versions to get right.

## *** v11 IMPORTED AND PARTLY TESTED 2026-09-19 — scenario 7492784 ***

**Imported CLEAN into a NEW scenario `7492784`. Diffed live-vs-sent: 127/127 modules, ZERO differences** — no stripped `rows` (21:1, 33:12, 55:1, 64:4 all intact), no lost mapper/parameter keys, no filter drift, all 9 `addRow` modules present. The v10 scenario 7443798 still exists untouched as the rollback.

**THE WEBHOOK URL CHANGED — DELIVERY BLOCKER.** v11 took a NEW hook **3748692** = `https://hook.eu1.make.com/28o2femchmc3nkjwnc3rsbudu3rdf6cr`. v10 keeps hook 3730137 = `https://hook.eu1.make.com/lbmpavosiy70rso5i9r69ggiqckgj5wt`, which is what GHL still points at. Importing as a NEW scenario creates a new hook; importing INTO an existing scenario preserves it. Recommended: repoint GHL to the new URL and leave v10 untouched, because then rollback is just changing the URL back.

**Log sheet is `1BusiBcfcy979xOnIzh26YeHDUdmp7V4vUT95QlWEhwc`, tab `Run Log`** (the user created it and pasted the ID into [2] themselves). It is NOT shared with obai.2452002@gmail.com, so Claude cannot read it directly. **It also has NO HEADER ROW** — the first data row landed in row 1.

**Workaround for reading the log: probe scenario `7492825` "ZZ READ LOG probe"** (getSheetContent A1:N40 -> aggregator -> datastore record `ZZLOGDUMP`). ~3 ops per read, left DEACTIVATED. Delete it or keep it as the log reader; note the Free plan nominally allows 2 scenarios and there are now 3.

**TEST 1 PASSED — Tier-1 error handling + sheet logging, 2026-09-19T05:00Z.** Execution `fb495fd2e0af48fcafdb11262a1d8e86`, **status 1, 27 operations, 40s**. Payload: valid phone/email/first_name + `Solar production file` pointing at a deliberate 404, no bills, no pre-solar. Result:
- Provisioning ran ([11][12][13] created folder + template copy + registry).
- [40] failed on the 404, the Tier-1 handler wrote the log row, then `Commit` ended the run.
- **Row read back verbatim:** `2026-09-19 13:01:12 ~ 1789794033 ~ 5550101199 ~ LOGTEST TierOne ~ st=Failed ~ stg=download-production-file ~ ... ~ err=Production file download failed: Not Found | <html>404 Not Found...`
- Every column correct: timestamp, runId (epoch secs), phone normalised to last-10, customer, status, the exact failing stage, and the real `error.message` PLUS `error.detail`.
- **`isinvalid` stayed FALSE and the scenario stayed ACTIVE after a module error** — that is the proof `Commit` terminates cleanly. Historically an unhandled error set `isinvalid: true` and self-deactivated the scenario.

**TEST 2 — FOUND A REAL BUG. status 1, 54 operations, 24s**, execution `1ecefdfdf3c04b24b7d74c9bb301ae7f`. Payload: new phone 5550102200, a public CSV as the production file, and a public non-bill PDF in the Jan slot. The run completed the whole path (provision -> production parse -> bill loop -> Gemini -> gate rejection -> r9) and the run record was correct, including the new `runId: 1789794637` field and `issues: "Jan - Not recognised as an electric utility bill"`. **But NO completion log row was written.**

**ROOT CAUSE — route 22.r9 is a SINGLE LINEAR CHAIN and three of its modules carry FILTERS.** Order was `60 -> 65 -> 64 -> 1003 -> 66 -> 2046 -> 2047 -> 61`. Module [64] has filter `Bill carried customer details` (`60.billName != ""`). No bill was accepted, so billName was empty, [64]'s filter blocked, and **every module after it in the chain was skipped** — [1003], [66], the log row, and router [61]. **A blocked FILTER stops the rest of the chain exactly like an `[Ignore]` does.** This is the third time this shape of bug has appeared in this project (v5 lock release behind an Ignore; v11 log row behind a router; now v11 log row behind a filter). **Rule: anything that MUST always run belongs as early in its route as possible, ahead of every filter, and a validator should assert that no filter precedes it.**

**This also exposes a PRE-EXISTING v10 BUG worth telling the client about:** [1003] (account binding), [66] (missing-months email) and router [61] (both customer completion emails) have ALWAYS sat downstream of [64]'s filter. So on any run where no bill carries a customer name, the customer gets NO email at all and no account is bound. It never surfaced because every proven run had bills with names on them.

**FIX SHIPPED as `Solar-Report-Pipeline-v11-FIXED.json`** (not yet imported at time of writing): a pure REORDER of the live blueprint moving [2046]/[2047] to directly after [65]. Verified 127 -> 127 modules with **ZERO content differences** — only ordering changed. New r9 order `60, 65, 2046, 2047, 64, 1003, 66, 61`. Import into the EXISTING scenario 7492784 to preserve hook 3748692.

**Deliberately NOT pushed via `scenarios_update`** even though it might fit: doing so would require re-emitting ~70 KB of JSON by hand into a tool call, where a single stray character corrupts the live scenario. A UI import of the on-disk file has no transcription risk. **Prefer a file import over an inline API push for any large blueprint.**

**Public test files that work and carry no privacy risk** (real customer bills must never be uploaded anywhere public — they carry name, service address, phone and utility account number): production-file stand-in `https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv` (converts cleanly to a Google Sheet), bill stand-in `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf` (real `%PDF`, Gemini correctly rejects it as not a utility bill). Google Sheets `export?format=xlsx` URLs return 401 and are useless as test URLs.

## *** THE PRE-SOLAR 503 PROBLEM IS SOLVED — USE flash-lite, NOT RETRIES (2026-09-21) ***

**Probe result: `gemini-3.5-flash-lite` reads 13/13 bars with confidence "high"** using module [32]'s exact current prompt and single-required-`bars` schema. Output: `JUL=1089,AUG=985,SEP=649,OCT=577,NOV=410,DEC=445,JAN=530,FEB=456,MAR=465,APR=528,MAY=502,JUN=657,JUL=1176`.

**THE OLD "flash-lite only reads 2 of 13 bars" FINDING IS OBSOLETE AND MISLEADING.** That was measured against the ORIGINAL schema of twelve separate OPTIONAL month properties. Once the schema became ONE REQUIRED `bars` string, flash-lite handles the chart perfectly. The two variables were changed at different times and the conclusion was never re-tested against the new schema — a stale benchmark that made an entire zone migration look risky for no reason.

**FIX: change module [32] model from `gemini-3.5-flash` to `gemini-3.5-flash-lite`.** One field. flash-lite has NEVER returned a 503 in this project, across every zone; `gemini-3.5-flash` 503'd on 3 of 4 eu2 attempts and failed the first eu2 production run. This also puts the whole pipeline on one model, since [53] (per-bill extractor) is already flash-lite and has been reliable throughout.

**DO NOT USE `builtin:Break` FOR THIS.** Break stores the run as an INCOMPLETE EXECUTION and retries from the failed bundle, so the ENTIRE report — grid, customer block, emails — is deferred until the retry runs, on an interval measured in MINUTES. Deferring a whole customer report because an OPTIONAL section hiccuped is the wrong trade. It also costs ops per retry, needs the scenario left active, and litters the queue with incomplete executions.

**If a same-run retry is ever wanted instead**, the cheap pattern is a duplicate extract module gated on `ifempty(32.result.bars; "") = ""` with its own Resume, then reading `ifempty(32.result.bars; 32b.result.bars)` downstream. Costs an op only when the first attempt fails and adds no delay. Not needed if flash-lite holds.

**Caveat, learned the hard way earlier in this project: one clean probe run does NOT prove reliability for a stochastic vision call.** Watch `preStatus` over the first several real runs. The blast radius is bounded either way — the completeness guard on [33] refuses to write a partial column, so a bad read leaves the section blank rather than wrong.

## *** FIRST eu2 PRODUCTION RUN SUCCEEDED 2026-09-20T04:48Z — pipeline works end to end ***

Execution `fe41e4babea74a3ea7f07804a3451cae` on scenario 9835572, **status 1, 142 operations, 115.5 seconds**. 10 bill slots + production + pre-solar. Report `1SKUs29J27o_ij2CwQZVaCY0YU4ED3esc7DZbJgdpWAU`, folder `1fBGU5NVvukG3GSGiDmiQjmQm3iEbsW2r`.

**EVERY WRITTEN GRID VALUE MATCHES THE REFERENCE EXACTLY** (checked against the template's original worked example): Jan 2706/285/662, Apr 1922/811/1420, May 1659/942/1840, Jun 2631/635/1602, Jul 4783/309/1735, Aug 2660/614/1743, Sep 1775/861/1595, Oct 2183/618/1205, Dec 2524/227/433. Feb/Mar/Nov blank — correct, those months were not among the bills. TOTAL 22843 / 5302 / 12235. Contracted 2589 written.

**Slot -> true-month routing proved again on a completely new bill set.** Ten slots resolved to nine distinct true months plus one duplicate, none of them matching their slot: `Jan->Jan2026, Feb->Aug2025, Mar->Sep2025, Apr->Dec2025, May->Jan2026 (REJECTED duplicate), Aug->Apr2026, Sep->May2026, Oct->Oct2025, Nov->Jul2026, Dec->Jun2026`. All `conf high`.

**Malaysian phone `+601139006613` normalised to key `1139006613`** (last 10 digits). Worked, but confirms the last-10 rule is US-shaped — a non-US number silently loses its country code. Fine as long as the key is only ever used as an internal identity.

**PRE-SOLAR FAILED, exactly as predicted for eu2:** `preStatus = "FAILED - pre-solar extraction returned nothing (model error or no chart found)"`. The `Resume` handler on [32] degraded it correctly — the run completed, every other section wrote, and because the template is now blank the pre-solar column is genuinely EMPTY rather than showing stale example data. The blanked template plus the completeness guard worked together as designed. **This is the eu2 `gemini-3.5-flash` 503 problem and it will recur.**

**THE ONE THING THAT SHOULD STOP A CLIENT SEND: the Performance Summary reads "System OVER-produced by 9,646 kWh (372.6% above contract)."** It compares nine months of solar (12,235) against Contracted 2,589. The template's own worked example pairs Contracted 17564 with annual solar 15144 = 86.2%, so that cell expects an ANNUAL figure and the GHL form is supplying something else. Every report will claim 300-400% over-production until the contracted figure is settled. The pipeline is doing exactly what it was told; the number it is told is wrong.

**Customer block is populated from the BILL, not the form:** the report shows "Hussein Saleh / (224) 600-9096" while the form said "Ahmed Al-Aqel". That is the documented intended behaviour, but confirm the client expects the bill's name on the report.

**LOG SHEET WORKS. Tab name is correct.** One row written, correctly aligned. The user's header dropped `newWorkspace` and the module no longer writes it, so the earlier `{{2046.isNew}}` defect is resolved by removal. **Only remaining flaw: column N carries a duplicate `errors` header and is always empty — delete N1.**

**Ops on eu2 after this run: ~854 of 1000 remaining** (4 for the template clear, 142 for this run). Resets 2026-10-01.

**MY ERROR THIS SESSION:** I first POSTed this payload to the OLD eu1 URL `hook.eu1.make.com/28o2fem...` (scenario 7492784) instead of the new eu2 one. That scenario was still active and will have picked it up; it should fail at [12] copyAFile since info@ubakel.com lost template access. **Deactivate 7492784.** The correct live endpoint is **`https://hook.eu2.make.com/262bf7vny241ym41pa7wcbzoilaeay22`** (hook 4383405) — the third webhook URL in this project's history.

## *** FINAL eu2 AUDIT 2026-09-20T02:39Z — scenario 9835572, STRUCTURALLY CLEAN BUT NEVER RUN ***

Live: **scenario 9835572 "Solar Report Pipeline v12 (eu2)", hook 4383405, 132 modules, isinvalid false, dlq 0, ZERO EXECUTIONS.**

**PASSED:** all four `rows` arrays restored by hand and correct (21 = 1x1, 33 = 12x1, 55 = 1x3, 64 = 4x1, no empty values); `folderId` added to [60]; datastore 187666 at every reference; every connection populated; all aggregator feeders visible; no duplicate ids; no nested `{{}}`, no self-references, no cross-route invisible references; every error-handler chain ends in a directive; every router last in its flow. Drive targets verified via the Drive API: parent folder `1Krmdqux3lyQgxC_-ojK4Vz9FQwgnWnRz` "Client Solar Reports" (canAddChildren true) and log sheet `1U_a2cR6FozSK5-svWRFubI0d9oCrWAp2WvAGFethLp0` "Solar_Logs" with the 14-column header present.

**SCHEDULING KEEPS REVERTING TO `indefinitely / 900`.** Fixed via the API twice now (14:49 and 02:39); the user's UI saves reset it each time. A webhook scenario must be `immediately` or every submission waits up to 15 minutes and, with `maxResults: 1`, they process one per cycle. **The fix must be made in the Make UI scheduling panel, not just via the API, or it will revert again.**

**OPEN MINOR BUG: [2046] does not fetch `isNew`**, but [2047] uses `{{2046.isNew}}` for the log sheet's `newWorkspace` column — that column will always be blank. One-variable fix: add `isNew` to [2046]. Log-only, does not affect the report.

**UNVERIFIABLE BY CLAUDE, MUST BE CHECKED BY HAND: the log sheet's TAB NAME must be exactly `Run Log`** (module [2] `logSheetTab`). The Drive API cannot report tab names. If the tab is still "Sheet1", every log write fails — and because all log `addRow` modules carry `Ignore` handlers, it fails SILENTLY with no trace anywhere.

**THE REAL RISK AT HANDOVER: this scenario has never executed once on eu2.** Every connection (Drive 14608158, Sheets 14608165, Gmail 14607860, Gemini 14608212), the parent folder, the blanked template and the log sheet are all new and have never been exercised. A single 1-bill run costs ~66 of the 1000 available ops and is the only thing that converts "structurally correct" into "known working". Strongly recommended before any client submission.

## *** TEMPLATE BLANKED 2026-09-19 — ROUTE 4 (the clears) IS NOW REMOVABLE ***

**The template `1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0` is now OWNED BY obai.2452002@gmail.com and has been cleared of the worked example.** Backup of the pre-clear version with all example data: **`1QB5J5RWBbX3fDopJhJzSD6Ia24sJMgvkh1Tn0o0IOsA`**.

**CONSEQUENCE FOR eu1: `info@ubakel.com` no longer appears on the template's permissions at all.** The eu1 scenario's Drive connection is that account, so **[12] copyAFile now fails for every new customer on eu1**. The eu1 production pipeline is effectively broken; migrating to eu2 is no longer optional.

**Exact ranges cleared** (via a throwaway Make scenario on eu2 using google connection 14608165, 4 ops, since the Drive MCP can only edit file metadata, not cells):
`D6:F9` customer block · `D14:F25` grid (12 months x 3 cols) · `D31:D42` pre-solar · `F48` contracted.

**Everything load-bearing was preserved and verified after the clear:** all column-C labels (Customer Name / Address / Email / Phone / Month / Jan..Dec / TOTAL), all section headers, all column headers, and every formula. The formulas recalculated to 0 and the summary banner switched from "⚠️ System UNDER-produced by 2,420 kWh" to **"Enter the contracted production above to see results."** — proving the client's template has a designed EMPTY STATE, so a blank template is its intended starting condition.

**WHY column C must never be cleared:** [14] reads `A1:H90`, [15] aggregates `label = {{14.\`2\`}}` (**column C**), and [16] derives all 17 row anchors by matching label text (`get(map(15.array; "row"; "label"; "Customer Name"); 1)`). Blank the labels and every anchor resolves empty, ranges collapse from `D{{empty}}:F{{empty}}` to `D:F`, and writes land in **F1** — silently, reporting success.

**Confirmed row map (cross-checked three ways: markdown read, live sheet probe, and the blueprint's anchors):** title 2-3 · CUSTOMER INFORMATION 5 · Customer Name 6 · Address 7 · Email 8 · Phone 9 · MONTHLY USAGE 11 · grid header 13 · **Jan 14 … Dec 25** · grid TOTAL 26 · PRE-SOLAR header 28 · pre-solar col header 30 · **Jan 31 … Dec 42** · pre-solar TOTAL 43 · PERFORMANCE SUMMARY 45 · Solar Produced (Actual) F47 · **Contracted F48** · Production vs Contracted 50-51 · Under/Over 53-54 · Total Home Usage 56 · Usage vs Contracted 57 · verdict banner 59.

**Route 4 ([78] GetVariables + [17][18][19] clears) is now safe to delete — verified only modules 17/18/19 reference `78.*`, nothing else does.** Saves 4 ops on first submissions only (returning customers already skip it). **Deleting the modules does NOT delete the route — the empty branch must be removed from router [22] separately.** Trade-off accepted: "template is blank" becomes a permanent invariant with no safety net; if anyone ever leaves data in D:F it silently appears in every new customer's report.

## *** MIGRATION TO A NEW MAKE ACCOUNT ON eu2, 2026-09-19 ***

The user re-authorized the Make connector to a NEW account. **The connector now points at zone `eu2.make.com`, org 5085211, team 2580948** (the old production account was eu1, org 9004764, team 2814151). The old eu1 account and scenario 7492784 are NO LONGER REACHABLE through the connector. **Always run `environment_get` first — the connector's account can change between sessions.**

New account is Free, **1000 operations unused, 0 consumed, resets 2026-10-01** — which solves the credit exhaustion that blocked delivery on eu1 (70 ops left there vs 161 needed for one report).

**Built on the new account:** data structure **630007** and data store **187666** ("Solar Bill Customer Records"), 1 MB, all 21 fields, `strict: false`. Field list identical to eu1's 584368.

**Prepared `Solar-Report-Pipeline-v12-eu2.json`** — the LIVE eu1 v12 blueprint with all 7 references to datastore 189208 swapped to 187666, verified as a clean swap with nothing else altered.

**### THE BIG RISK OF MOVING TO eu2: `gemini-3.5-flash` 503s THERE.**
This is the exact reason the project moved from eu2 to eu1 on 2026-09-16. On eu2, `gemini-3.5-flash` (module [32], the pre-solar 13-bar chart read) returned **`[503] high demand` on 3 of 4 attempts**; on eu1 it never 503'd and returned a perfect 13/13. Runs were also slower on eu2 (77s vs 42s for a 1-bill run). **Expect the pre-solar column to fail intermittently on eu2.**
Mitigations, in order of preference:
- It already degrades gracefully: [32] has `Resume` + logging, so a 503 leaves `preStatus = "FAILED - ..."`, the pre-solar column blank, and the rest of the report complete. The client's own template labels that block "PRE-SOLAR vs POST-SOLAR USAGE (optional)", so a blank block is acceptable.
- **Now that operations are plentiful, enabling `builtin:Break` retry on [32] is finally affordable** — replace its Resume handler with `{"module":"builtin:Break","version":1,"mapper":{"retry":true,"count":3,"interval":15}}`. Caveats: costs ops per retry, needs the scenario ACTIVE, and leaves incomplete executions.

**Remaining migration steps (all require the user):**
1. **43 modules need their connection re-picked** after import — the `__IMTCONN__` ids are eu1-specific and invalid on eu2: google-drive 10946635, google-sheets 10946643, google-email 10946623, gemini-ai 10946681.
2. **Google Drive access** — template `1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0` and parent folder `12xGWw_WyT_wwqo7eoINydNH3opmA-15C` live in info@ubakel.com's Drive. Whatever Google account the new connections use must be able to read/write them.
3. **Log sheet** `1BusiBcfcy979xOnIzh26YeHDUdmp7V4vUT95QlWEhwc` must be reachable by the new Sheets connection.
4. **A THIRD webhook URL** will be generated on import — GHL must be repointed again.
5. Re-verify after import: diff live vs the file, check all four `rows` arrays. **On eu2 the older importer PRESERVED `rows`; on eu1 it stripped them** — so eu2 may actually be kinder here, but still diff.

## *** FINAL PRE-DELIVERY STATE 2026-09-19T09:15Z — v12 LIVE AND TESTED (eu1, now unreachable) ***

**Live production scenario: 7492784 "Solar Report Pipeline v12", hook 3748692, ACTIVE, isinvalid false, dlqCount 0, 138 modules.** Audited against the reference: all six Tier-1 chains are `addRow -> sendAnEmail -> Commit`, all four `rows` arrays intact (21:1, 33:12, 55:1, 64:4), all five aggregator feeders intact, log sheet wired to `1BusiBcfcy979xOnIzh26YeHDUdmp7V4vUT95QlWEhwc` / tab `Run Log`.

**#1 DELIVERY BLOCKER — GHL POINTS AT A DEAD ENDPOINT.** GHL posts to `https://hook.eu1.make.com/lbmpavosiy70rso5i9r69ggiqckgj5wt` = hook 3730137 = scenario **7443798 (v10), which is isActive FALSE**. A real submission today queues against a deactivated scenario and does nothing at all — no report, no email, no error. **GHL must be repointed to `https://hook.eu1.make.com/28o2femchmc3nkjwnc3rsbudu3rdf6cr`.**

**#2 DEFECT IN THE HAND-EDITED [13] HANDLER.** The user replaced the whole handler with a single `sendAnEmail`; both the `SetVariables` (errRegistry) and, critically, the terminating **`Resume` are missing**. Every other handler in the blueprint ends in a directive. Without one, a registry-write failure does not cleanly continue. **Fix: add `Resume` after that email module.** Only fires on a registry-write failure, so it is a latent bug rather than an immediate blocker.

**TIER-1 ALERT TEST PASSED (the last unproven mechanism).** Execution `577d6d82201442aabac1464f8f881079`, **status 1, 28 operations, 23.5s**, 404 on the production file. Log row written: `2026-09-19 17:13:59 | PROD AlertCheck | st=Failed | stg=download-production-file | err=Production file download failed: Not Found | <html>404...`. The identical test on v11 cost **27** ops; the extra operation is the alert email module executing. Clean `Commit`, scenario stayed valid.

**Datastore 189208 CLEANED** — every test record deleted (5550102200 / 5550103300 / 5550104400 / 5550105500 families, ZZLOGDUMP, ZZSHEETDUMP). Only the real customer `7739619241` family remains. The log SHEET still holds all three test rows as evidence; that is intentional.

**Ops remaining ~73 of 1000.** Not enough for another 12-bill run (161).

**STILL UNVERIFIABLE BY CLAUDE:** whether any email is actually DELIVERED. Gmail accepts the sends (no error in any run), but `opsEmail` is `info@ubakel.com`, historically a Google account with Drive and possibly no mailbox. The user can settle it in seconds by checking **ahmedalaqel26@gmail.com** for "FAILED: solar report not created - PROD AlertCheck". If info@ubakel.com is dead, [6] [7] [8] [34] [63] have been mailing nowhere and should be repointed.

## *** EDGE-CASE TESTS A + B PASSED 2026-09-19T08:20-08:24Z — sheet-verified ***

**STATE OF THE LIVE SCENARIO 7492784 (verified by diff, do not assume):** still 127 modules, still named "v11". **v12 was NEVER imported** — none of the six Tier-1 alert emails exist, so fatal provisioning failures remain silent green runs. Of the two hand edits the user reported doing, only ONE landed:
- **[80] filter "Production File Exist" IS present** and correct (`{{1.\`Solar production file\`[1]}}` text:notequal ""). 
- **[13]'s alert email is NOT present** — its handler is still `SetVariables -> Resume`, so a registry-write failure is still silent and the customer stays unregistered.
- The user ALSO removed the production-file condition from **[22]**, which now checks only email + phoneKey. That makes the [80] filter load-bearing.
- Side effect to watch: [7] "No production file" still fires, so a submission with no production file now sends that email AND builds a full report.

**Test A — no production file at all.** Fresh phone 5550104400, one bill in the Oct slot (a Jun-2026 bill), pre-solar supplied, NO production file. **status 1, 61 ops, 29.3s.** Log row: `st=Done, mo=Jun, pre=OK - all 12 pre-solar months read, bills=Oct slot -> Jun 2026 | grid 2631/635 | conf high | ACCEPTED, flag=(none), err=(none)`. **The key result is `err=(none)`: `get(58.prodMap; ...)` against an UNDEFINED collection does NOT throw**, so the grid row still writes and only the Solar cell is empty. That was the real risk in Edit 2 and it is cleared.

**Test B — returning customer, WITH production file.** Same phone typed as `(555) 010-4400` instead of `+1 (555) 010-4400`; Oct slot = a Jan-2026 bill (new month), Jan slot = the same Jun-2026 bill already held from Test A. **status 1, 64 ops, 28.1s.** Results: `new=no`, `mo=Jun,Jan` (cross-submission accumulation), the Jun bill correctly `REJECTED` with `flag=Jan slot - duplicate bill for Jun, already recorded from another slot` (**cross-run dedup works**), same spreadsheetId reused, registry not duplicated, `pre=(pre-solar route did not run)` (correct four-state diagnostic), `err=(none)`.

**SHEET-LEVEL PROOF (report `1Qi8MEWM7_C-34sq0Id482WbPQEtY6Rkr4DoVg3fpkMs`, rows 13-27 read via the probe):**
`row14 Jan D=2706 E=285 F=662` · `row19 Jun D=2631 E=635 F=(blank)` · `TOTAL D=5337 E=920 F=662`.
Jan came from the run WITH a production file and its Solar is **662**, matching the known-good baseline exactly — so the [80] filter passes correctly when the file is present. Jun came from the run WITHOUT one and has grid values but no Solar. Totals reconcile. Both rows coexist in ONE sheet across two submissions.

**The probe scenario 7492825 can be repointed at ANY sheet** to read it back into datastore key `ZZSHEETDUMP` (~3 ops). This is the workaround for Claude not being able to open sheets Make creates under info@ubakel.com. Current config reads `Bill Review!A13:F27`. Row 13 is the grid header; Jan starts at row 14.

**QUEUE-STALL GOTCHA, now seen THREE times:** a webhook POST does not process and `hooks_get.queueCount` sticks at 1 while `scenarioIsActive` is true. Triggered by a blueprint `modify` AND by activating a SECOND scenario (the probe) on this Free plan. **A deactivate -> activate toggle on the main scenario drains it immediately.** Practical rule: never run the probe while a payload is in flight, and always check `queueCount` when an expected execution never starts.

**Ops after these tests: ~104 of 1000 remaining** (resets 2026-10-16).

## *** v12 BUILT 2026-09-19 — FATAL FAILURES ARE NO LONGER SILENT (user caught this) ***

**The user spotted a real design defect in my v11 Tier-1 handlers and they were right.** The chain was `[log row -> Commit]` with NO notification. Because `Commit` terminates cleanly, the execution reports **status 1 / green in Make's UI**, so Make sends no error notification either. If Drive folder creation failed for a new customer, the customer got no report and the ONLY trace was a row in a log sheet nobody watches. **This was strictly QUIETER than v10**, where the same failure threw a red execution, triggered Make's own error email to the account owner, and (after maxErrors) deactivated the scenario. Handling an error cleanly is not the same as reporting it — **a clean terminate must always be paired with an explicit alert.**

`Solar-Report-Pipeline-v12.json`, 139 modules, 76,060 bytes. **Built by patching the LIVE v11 blueprint (`v11_live2.json`), not v10**, so the diff is only the intended change. Verified: 127 -> 139 modules, 19 added, 7 removed (the old `Ignore` handlers), **ZERO pre-existing module bodies changed**, no duplicate ids, aggregator feeders intact, all four `rows` arrays intact, 0 expression problems. The new email module was checked key-for-key against the known-good [62]: version 4, `to`/`subject`/`bodyType`/`content`, connection 10946623.

What changed:
1. **Each Tier-1 chain is now `log row -> ALERT EMAIL -> Commit`** for [11] [12] [14] [40] [42] [45]. Subject "FAILED: solar report not created - <name>", body names the stage, the customer, runId, `error.message` and `error.detail`, and states plainly that nothing reached the customer. Sent to **both** opsEmail and baherEmail.
2. **Log rows inside those chains: `Ignore` -> `Resume`**, because Ignore discards the bundle and would skip the Commit.
3. **Completion log row [2047]: `Ignore` -> `Resume`**, so a logging failure cannot skip router [61] and swallow the customer's email.

**Why both recipients:** `opsEmail` is info@ubakel.com, which older notes describe as a Google account with Drive but possibly NO Gmail mailbox. If that is still true, every alert sent only to opsEmail — including the existing [6] [7] [8] [34] [63] — goes nowhere. **Worth verifying that info@ubakel.com can actually RECEIVE mail**; if not, repoint those five modules to baherEmail.

**STILL OPEN (flagged, not fixed):** [62] "Complete" fires on months=12 AND flagged=0 AND accounts=1, with no condition on the error variables — so a run that hit Tier-2 errors but still held 12 clean months would email "report is complete" while errors occurred. Add an errors-empty condition to [62], or an errors-present condition to [63].

## *** TEST 3 — v11 FULLY PROVEN ON REAL DATA, 2026-09-19T05:28Z. NO REGRESSION vs v10. ***

The FIXED blueprint was imported by the user into 7492784 and verified byte-identical to the file sent (127 modules, zero differing modules, r9 now `60, 65, 2046, 2047, 64, 1003, 66, 61`, all four `rows` arrays intact).

Full 12-bill run with the REAL GHL payload: execution `efc24c5e60684f58b37b2d6ba47663bf`, **status 1, 161 operations, 129.6 seconds** — the v10 baseline was 159 ops / 128s, so the logging costs exactly the predicted +2. Sheet `1XKsqXtrV1v8Qqsu0XiOC6n519XRD_aTxhvtYwTpD1z0`, folder `1_hvbSCuQLmhNuALLDLxJRJTCwHG_iVGd`, test phone 5550103300.

**Every grid value matches the v10 known-good baseline EXACTLY**, and the slot -> true-month routing is confirmed end to end:
`Jan slot->Jun 2631/635 | Feb->May 1659/942 | Mar->Apr 1922/811 | Apr->Jul 4783/309 | Jul->Feb 2187/463 | Aug->Mar 1834/631 | Oct->Jan 2706/285 | Nov->Dec2025 2524/227 | Dec->Oct2025 2183/618`, all `conf high`. 9 billyear records, `summary: "Jun,May,Apr,Jul,Feb,Mar,Jan,Dec,Oct"`, `preStatus: "OK - all 12 pre-solar months read"`, `acct_` bound to 4646862222, `errors: (none)`, status `Done with issues`. All three duplicates caught and named (May slot dup Jun, Jun slot dup May, Sep slot dup Feb).

**COSMETIC BUG FOUND, not a blocker:** duplicate rejections render in the `bills` column as **"REJECTED - OK"**. Cause: `56.billLog` falls back to `ifempty(59.gateReason; ...)`, and on a duplicate the gate genuinely reads `OK` (the bill is fine; it is the dedup test that rejects it). The `flagged` column carries the correct wording, so no information is lost. Fix when convenient: in `56.billLog`, branch on the rejection reason the same way `56.flagged` does — test `59.gateReason != "OK"`, then `59.acctOk != "yes"`, then fall through to "duplicate".

**RUNBOOK NOTE — a webhook POST during a blueprint import gets STUCK IN THE QUEUE.** The user imported the fix at the same moment a payload was POSTed; `hooks_get` showed `queueCount: 1` with `scenarioIsActive: true`, and nothing drained for eight minutes. A **deactivate -> activate toggle drained it immediately**. Check `hooks_get.queueCount` whenever an expected execution never starts.

**EMAIL SAFETY — module [66] sends to `{{1.email}}`, the CUSTOMER'S address**, subject "Action needed: your solar report is missing some months", and its filter fires whenever fewer than 12 months are held — which is ALWAYS true for this customer's data (only 9 distinct months exist). Every test payload MUST override `email` to ahmedalaqel26@gmail.com or it will mail the real client at **info@slightedge.io**. The other six email modules are safe: [6] [7] [8] [34] [63] go to opsEmail (info@ubakel.com) and [62] to baherEmail.

**Test artifacts cleaned up:** datastore records `5550101199` and `ZZLOGDUMP` deleted. Still littering the user's Drive: folder `136j5CV471YimJjKqtclICuQBImLNmNW4` and sheet `13JMxiEG20o1rbF6UydQSuoD8YRbZ78YvBkFqolEtvmE` for "LOGTEST TierOne".

**STILL UNTESTED ON v11: the happy path.** No completion (`Done`) log row has ever been written, and no real report has been produced by v11. This needs real bill URLs, which only a GHL submission can provide. **Claude CANNOT self-serve these:** the Drive MCP `share_file` only grants per-email access (no "anyone with link"), so no public download URL can be manufactured, and uploading the real `bill-1.pdf` to any public host is a privacy problem — it carries a real customer's name, service address, phone and utility account number. Do not do it.

**Ops: 501 remaining at the start of this session, ~471 after testing.** Resets 2026-10-16. Budget ~161 for a full 12-bill run.

## *** v11 BUILT 2026-09-19 — LOGGING + TWO-TIER ERROR HANDLING ***

**USER DIRECTIVE: the log goes to a GOOGLE SHEET, not the data store.** A central master log spreadsheet, one row per run, all customers in one place — chosen over a per-customer "Run Log" tab because the customer's report is a delivered document and a debug trail does not belong in it. The data store still holds STATE (registry, billyear, acct, `run_`); only the LOG moved to the sheet.

**BLOCKED ON THE USER:** module [2] carries `logSheetId = "PASTE_LOG_SPREADSHEET_ID_HERE"`. They must create the spreadsheet with a tab named **`Run Log`**, paste the 14-column header, share it with **info@ubakel.com** (the Google account behind sheets connection 10946643 — without this Make cannot write) and ideally with **obai.2452002@gmail.com** so Claude can read it back to verify runs. Columns A-N: finishedAt, runId, phone, customer, status, stage, months, preStatus, accounts, newWorkspace, reportLink, bills, flagged, errors.

**`google-sheets:addRow` v2 mapper shape — VERIFIED, do not guess it again.** `mode: "map"`, `spreadsheetId`, `sheetId` (tab NAME), `tableFirstRow: "A1:Z1"`, `insertUnformatted: false`, `valueInputOption`, and **`values` as an object keyed by 0-BASED NUMERIC STRINGS** (`{"0": colA, "1": colB, ...}`). Proved with a throwaway scenario (`scenarios_create` then `scenarios_get`, then deleted) — Make preserved the mapper byte-for-byte. `rpc_execute` on `rpcSheetInput` is NOT available on this account (needs admin "organization view"), so the throwaway-scenario trick is the only way to confirm a mapper shape here. All log rows use **`valueInputOption: "RAW"`** so nothing in a bill string or error message can be reinterpreted as a formula, and each carries its own `builtin:Ignore` handler so a logging failure never compounds the error it is reporting.

`Solar-Report-Pipeline-v11.json`, **127 modules** (v10 had 79), 68,620 bytes compact. Built from the LIVE v10 pulled via `scenarios_get` on 7443798, not from a local copy. Validated: 0 problems, 0 warnings — no drift in any kept module's `module`/`version`/`parameters`/`filter`, all four `rows` arrays byte-identical, aggregator feeders intact, no nested `{{}}`, no self-references, no cross-route invisible references, every router still last in its flow.

**Data structure 584368 was updated to 21 fields** (added runId, status, stage, startedAt, finishedAt, log, errors). Only `runId` is still written after the move to sheet logging; the other six are harmless leftovers, left declared deliberately. Additive only, so v10 still runs unchanged.

**Ops cost: +2 on the happy path** (one GetVariables + one addRow). ~159 -> ~161 for a 12-bill run. Error-handler modules cost an op only when they fire.

**The logging design — everything accumulates into EXISTING SetVariables modules, so per-bill logging is free.**
- `[2]` gains `runId` = `{{timestamp}}` (epoch seconds) and `startedAt`.
- `[56]` gains `billLog`: one line for EVERY bill, accepted or rejected — slot, true month, year, grid import/export, confidence, ACCEPTED/REJECTED + reason, account-mismatch marker. Zero added ops because [56] already runs per bill.
- New `[2046]` GetVariables + `[2047]` `google-sheets:addRow` append one row per run to the central log. Appending also fixes the fact that `run_<phone>` uses `overwrite: true` and so DESTROYS the previous run's evidence.
- `status` is three-valued: `Done` / `Done with issues` (flagged non-empty) / `Done with errors` (any error variable set).

**PYTHON BUILDER TRAP that got past the validator once: inside an f-string, `}}` collapses to a single `}`.** The status expression shipped as `...}` instead of `...}}`, leaving the IML expression unclosed. Build Make expressions with plain concatenation, never f-strings. The validator now asserts brace depth returns to ZERO at the end of every string and flags any stray single `}` — a depth>1 nesting check alone does NOT catch an unclosed expression. Verified the new check fires by deliberately re-breaking the file.

**Two-tier error handling, ported from the Finance OS blueprint's "log first, then decide" ordering:**
- **Tier 1 (fatal — continuing is pointless): write an `err_<phone>_<runId>` record to the datastore, THEN `builtin:Commit`.** Applied to [11] createAFolder, [12] copyAFile, [14] getSheetContent (row anchors), [40] production download, [45] listSheets, [42] production getSheetContent. Commit terminates cleanly, which also avoids the `isinvalid: true` self-deactivation.
- **Tier 2 (recoverable): set an error variable, THEN `builtin:Resume`.** Applied to [13] [21] [31] [33] [64] [65], and inside the per-bill loop to [52] [53] [55] which accumulate into `errBill` via [58].
- **[53] `gemini-ai:extractStructuredData` had NO handler in v10** — 12 calls per run on the known-503-prone path, any one of which killed the entire run. That was the single biggest gap and is now Tier 2.
- **Existing `Ignore` handlers gained a logging module IN FRONT of the directive** ([30] [51] [57] [77] [66]). The handler-route modules still run before the directive discards the bundle — proved by the Finance OS blueprint, where `78.ERR` is `[notion log, Break]`.
- `{{N.error.message}}` / `{{N.error.detail}}` inside a module's own error route is the confirmed-working pattern (Finance OS uses it live).

**STRUCTURAL RULE LEARNED: a `builtin:BasicRouter` must be the LAST module in its flow.** The first build appended the log modules after router [61] in route 22.r9; that is invalid. Correct order is now `[60, 65, 64, 1003, 66, 2038, 2039, 61]`. Because the log record must precede [61], it cannot see errors from [62]/[63] inside 61's routes — so those two got their own `err_<phone>_<runId>_email*` records instead. **Add a router-position assertion to any blueprint validator.**

**Known limitation, accepted:** if both [52] and [53] fail on the SAME bill, only [53]'s line survives in `errBill` — both handlers read `58.errBill` (the value at the start of that iteration), so the later writer wins. The bill is still reported as failed; only the first of the two causes is lost.

**NOT yet done:** import into 7443798 and a test run. After importing, diff the live blueprint against the file — the `rows`-stripping behaviour differs between importing into a NEW scenario and an EXISTING one.

**Why the per-bill chain cannot be trimmed further:** the three sequential `SetVariables` (gateReason/mkey/acctOk -> accept/billMonth/mmTrue -> rowThisMonth/okMonths/seenCsv/flagged/...) each reference the previous one, and a module cannot read its own output, so they cannot be merged. The `GetVariable2` that reads `seenCsv` is the correct cross-iteration accumulator pattern, not waste. Those ~48 ops are structural.
