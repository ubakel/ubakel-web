---
name: solar-pending-updates
description: Consolidated list of scenario updates still pending after 2026-09-26 (manual alignment, bill-reading accuracy, pre-solar checks, handover), with priorities and open client decisions
metadata:
  type: project
---

**STATUS 2026-09-26 17:25:** A1–A5, B1, B2, B5, B6, B7, C1, C2 and C3 are LIVE as of v4.1 (2026-09-26), which also fixed the pre-solar detection and the missing-month gate after a real-bill Gemini probe (see [[solar-report-status]]). B7 and C3 were settled by the user: a checker in both paths now rejects bills in the wrong box and sends an email. NOT approved and still open: A6, B3, B4, B8. D and E are unchanged.

**2026-10-04:** the final audit found F1 (a production file sent later is not written to months on file), F2 ("ready" needs a bill in the same run) and F3 (an empty contracted field wipes the saved value). The user declined fixing them for now. Handover settings are still open: ops inbox, Gmail sender, Drive ownership, Gemini key, GHL field names/webhook, test-data cleanup, client plan.

Listed for the user on 2026-09-26. Order agreed in principle: plan upgrade (D1), then client answers on B7/C3, then ONE bundled update (A+B+C) pushed via the REST PATCH routine, then the E tests. See [[solar-report-status]], [[solar-client-manual]], [[solar-report-file-formats]].

A (match manual): A1 remove customer email [66]; A2 rename 8 subjects; A3 plain flag texts; A4 Ubakel-styled ops emails as on manual pp. 8–9; A5 show processing problems (errBill) in the needs-review email; A6 client inbox + reconnect the Gmail sender.
B (bill reading): B1 drop Net Metering Credit as the export source/cross-check (HIGH); B2 check import against the DFC kWh, and export via supplier kWh (DFC − supplier) (HIGH); B3 never-use list: community solar / rollover / "Fixed Price" variant; B4 period from Charge Details when there is no SERVICE FROM line; B5 same month twice → latest "Issued" date wins (HIGH); B6 same month from 2 years in one submission → newer year wins; B7 pre-solar bill in a monthly slot (WAITING FOR CLIENT: reject/flag/accept); B8 account binding by majority, not the first bill processed.
C (pre-solar): C1 account check (HIGH); C2 the chart must end before the first post-solar bill; C3 warn when a post-solar bill is in the pre-solar slot (WAITING FOR CLIENT).
D (handover): plan upgrade, GHL webhook, Drive ownership + [2] ids, Run Log sharing, test-data cleanup, revoke tokens, optional webhook key.
E (tests, ~400–450 ops): customer B's 12 latest bills; customer C's set; re-send the hostile T2; one clean run to compare the emails with the manual.
