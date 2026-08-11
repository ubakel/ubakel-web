# Solar Bill Review System: handoff (written 2026-10-18)

Client: **Baher Saad** (brand on emails: **NetSolar**). Delivered by **Ubakel**.
Flow: GHL form → Make webhook → Gemini reads ComEd bills → Google Sheet report (1-page PDF) → team email.

**NEXT TASK:** set up the system in the client's Make account. The client says the credentials (connections) are now added.

Read `memory/solar-report-status.md` (top blocks) and `memory/make-blueprint-gotchas.md` before touching any blueprint.

---

## 1. What is live today (do not break)

| Item | Value |
|---|---|
| Account | Make **Pro**, eu1, org 9108439, team 2947115 |
| Scenario | **7628024** "Solar Report Pipeline v12 (eu2)", version **v4.2**, verified |
| Webhook | 3789867, `https://hook.eu1.make.com/2l9ng76xevr3jerxp1nsb8ekj2jcjdsw` |
| Data store | 198561 (structure 601831, 26 fields) |
| Connections | Drive 11303388, Sheets 11303550, Gmail 11303573 (obai.2452002@gmail.com), Gemini 11303634 |
| AI model | **gemini-3.5-flash-lite**, in modules [53] (monthly bills) and [32] (pre-solar). **Decision: keep Gemini, do NOT switch to Claude.** |
| Template | 1lwwk6nQsW7KgJpc_G6S0Kqy5TSMsr0s9KZl3XZQtef0 (tab "Bill Review"; "Screen Shots " tab hidden) |
| Customer Reports folder | 1Krmdqux3lyQgxC_-ojK4Vz9FQwgnWnRz |
| Run Log | 1U_a2cR6FozSK5-svWRFubI0d9oCrWAp2WvAGFethLp0 (tab "Run Log") |
| opsEmail | ahmedalaqel26@gmail.com |

The template, Run Log and ops email are all set in module **[2]** (util:SetVariables): `templateFileId`, `parentFolderId`, `sheetTab`, `opsEmail`, `logSheetId`, `logSheetTab`.

Blueprint of v4.2: `build/live_v42.json` (155 modules).

## 2. Client account: CHECK FIRST

Run `environment_get` first; the Make connector has changed account several times.

- **As of 2026-10-18 the connector shows us2 org 3700708 with NO teams, and every call returned "Access denied".** That is a different account from any of the ones below. Ask the user which org/team the client added the connections in, and make sure the connector can see that team.
- **us2 org 9177395, team 3096762:** believed to be Baher's. Obai (obai.2452002) was invited into it. Free plan. Already created there:
  - data structure 521540
  - data store **164085** (1 MB)
  - two unused credential requests; ignore them
- **us2 org 7709464 (Naif Saad):** the older client account. Data structure 511916 is there. Its storage is full (Notion data store). Don't touch the client's Notion data or "Finance OS" scenarios.
- **Free plan limits:** 5-minute run limit (a full 12-bill run takes 2–4 min, up to 8), 1,000 ops a month, 1 data store / 1 MB. The client is NOT upgrading for now. Tell the user that some full runs may be cut off.

## 3. Steps to build the client scenario

1. **Find the four connection IDs.** `connections_list` on the client team: Google Drive, Google Sheets, Gmail, Gemini AI. The guide named them "NetSolar – …".
2. **Webhook.** `hooks_create` was blocked by the auto-mode classifier ("Modify Shared Resources"). The user creates it in the Make UI: Webhooks → Add → Custom webhook, "Solar bill form (GHL)". Then read its ID with `hooks_list`.
3. **Data store.** Use 164085 if the target is team 3096762. Otherwise create a structure and store using the spec in `memory/solar-report-status.md` or the transcript (26 fields: phone, recordType, folderId, … firstPost).
4. **Drive files.** The client copies the Report Template and an empty Run Log into his Drive, and creates a "Customer Reports" folder. The clean copies to share are in obai.2452002's Drive folder "NetSolar – Files for client setup" (1hd7qP_Z77cNu2xLSB83qhYiaJeuXfrC2):
   - Report Template: 1fjEaZJhHnJRc-yMzoZaAIZl8TW6sS5jesj808cl6X_Q
   - Run Log (headers only): 1up0EcSvSJmPUkfMPpnFKd7mkGOTPr8A2GjFNzjZOUQ8

   That folder still has to be shared with the client's Google account (the user can do it, or give the email). When the client sends his three links, put the new IDs into module [2]. Also ask for the **team inbox** and set it as `opsEmail`.
5. **Build.** Use `build/build_migrate_v42.py <drive> <sheets> <gmail> <gemini> <hook>`.
   - It re-points 42 connection refs, 9 data-store refs and 1 hook from live v4.2.
   - **Edit its constants first:** `NEW_DS` (164085), `TEAM` (3096762), and the output URL zone. Add the module-[2] swaps for template, folder, Run Log and opsEmail.
   - It writes `patched_us2.json` and `C:\Users\ahmed\Downloads\solar-us2.create.json`.
6. **Create the scenario through the REST API.** The blueprint is about 300 KB; the MCP `scenarios_create` limit is about 39 KB, and the UI import strips `rows` from updateMultipleRows modules. **The user runs the command; never handle the token yourself:**
   ```
   $env:MAKE_TOKEN = Read-Host "Make token (client account)"
   curl.exe -s -X POST "https://us2.make.com/api/v2/scenarios?confirmed=true" -H "Authorization: Token $env:MAKE_TOKEN" -H "Content-Type: application/json" --data-binary "@C:\Users\ahmed\Downloads\solar-us2.create.json" -w "HTTP %{http_code}`n"
   ```
7. **Verify.** `scenarios_get` → diff against the patched file (compare VALUES, not just keys) → run `build/check_refs.py` and `build/balance.py`.
8. **Test.** Use the payloads in `testrun/` (test phones 55500020xx). A full run on the Free plan risks the 5-minute limit, so start with a 1–3 bill test.
9. **Go live.** Point the GHL form at the new webhook. Then turn off Pro scenario 7628024 and old eu2 scenario 9835572; this needs the connector pointed at those accounts.

## 4. Rules

- Never type, paste or echo API tokens. The user runs the curl with `Read-Host`.
- No personal emails in client documents.
- Don't make customer bills publicly shared. The classifier blocked this before; don't retry it.
- Use they/them for people.
- Close all Make tabs before an API update. Afterwards: Ctrl+F5, Save, toggle the scenario off and on.
- Known findings F1–F3 (production file sent later, "ready" email needs an accepted bill, empty contracted value wipes the saved one) were **declined by the user**. Don't re-propose them.

## 5. Client documents (done)

- `setupguide/Solar-Bill-Review-System-Setup-Guide.pdf`: v1.1, 5 pages.
  - Covers: Google account → Drive folder → Gemini key → 4 connections created in Make → go live.
  - No Make-plan step. Costs: Gemini only, $8–11 a month.
  - Rebuild with `setupguide/build.py`; it needs `manual/` beside it for the CSS and logos.
- `comparison/Solar-Bill-Review-AI-Model-Comparison.pdf`: 2 pages comparing Gemini, Claude, OpenAI and DeepSeek. Recommendation: keep Gemini 3.5 Flash-Lite.
- User manual v1.4: `manual/manual.html` (logos included), rendered with `render.py`.
