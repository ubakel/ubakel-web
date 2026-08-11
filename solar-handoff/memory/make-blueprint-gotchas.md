---
name: make-blueprint-gotchas
description: Make.com blueprint facts learned the hard way by running them — module shapes, filter semantics, IML rules and API limits that static inspection does not reveal.
metadata:
  type: reference
---

Learned by iterating a 55-module scenario to a clean run on 2026-09-14. Each of these produced a real failure. See [[solar-report-make-environment]].

**`continueWhenNoRes: true` on a search module emits ONE EMPTY BUNDLE on a miss, not zero bundles.** An Array Aggregator downstream therefore yields `length(array) == 1` even when nothing was found, so `length(x) > 0` is ALWAYS true. Test content instead: `{{4.array[1].someField}} = ""`. This silently routed every run down the wrong branch and is the single nastiest one.

**Filter arrays: the INNER list is AND, the OUTER list is OR.** `[[A,B]]` = A AND B. `[[A],[B]]` = A OR B. Easy to invert by accident.

**`{{ }}` cannot nest.** Building an expression by concatenating a string that already contains `{{x}}` yields `{{f({{x}})}}` → "Invalid IML". Inside a `{{...}}` the inner references are bare: `{{get(map(15.array; "row"; "label"; "Jan"); 1)}}`.

**`array()` is not a Make function** — the empty-array keyword is `emptyarray`.

**A module cannot reference its own output**, so the self-referencing accumulator (`{{add(56.x; item)}}` inside module 56) is invalid. Use `util:GetVariables` to read the previous value, then `util:SetVariables` to write the new one.

**Roundtrip variables are NOT readable across router routes as `{{moduleId.var}}`** — "references inaccessible module". Read them with `util:GetVariables` (mapper `{"variables": ["name", ...]}`), which works from any route.

**Required module fields that the default schema view hides:**
- `google-sheets:updateMultipleRows` needs `valueInputOption` (`USER_ENTERED` / `RAW`) — marked *advanced* but genuinely required. Fetch with `includeAdvancedFields: true`.
- `http:DownloadFile` v4 needs `parameters: {"authenticationType": "noAuth"}`; omitting `parameters` entirely throws `Cannot destructure property 'authenticationType'`.
- `google-email:sendAnEmail` v4 uses `bodyType: "rawHtml"`, NOT `contentType`. Wrong field → Gmail `[400] Precondition check failed`.
- `google-drive:uploadAFile` needs `targetType: "application/vnd.google-apps.spreadsheet"` alongside `convert: true`.

**Always diff module `version`, `mapper` keys AND `parameters` keys against a known-working blueprint before publishing.** Current versions: google-drive/* and http:DownloadFile are v4, google-sheets/* v2, gemini-ai/* and builtin/util/datastore v1. A wrong version renders as "Module Not Found" in the editor.

**`scenarios_update` replaces the blueprint wholesale and takes it inline; the practical ceiling is ~39 KB.** Trim by dropping `metadata.designer` from modules (layout is lost but function is not). Over the limit, the call truncates and fails to parse.

**A scenario that errored gets `isinvalid: true` and deactivates itself; the editor then refuses to save edits** — `lastEdit` never moves. Re-import or push via API instead of fighting the UI.

**A SAVED EDIT DOES NOT GO LIVE UNTIL THE SCENARIO IS DEACTIVATED AND REACTIVATED (proved 2026-09-23).** The canvas shows the new modules, `scenarios_get` returns the new blueprint, `lastEdit` moves, `isinvalid` is false - and the webhook still executes the OLD blueprint. A test submission ran the pre-edit version and sent nothing; after a `scenarios_deactivate` -> `scenarios_activate` cycle the identical payload ran the new version (transfer jumped 28,613 -> 124,750 bytes as the PDF export finally fired).

**`queueCount: 0` does NOT mean the live version is current.** It only means the queue is drained. There is no API field that reveals which blueprint version the running scenario holds, so the only safe practice is: **toggle after every editing session, before any test, every time.** Verifying the blueprint over the API proves what was SAVED, never what will RUN.

**Make's `if()` DOES accept a bare non-empty string as a true condition (confirmed 2026-09-23).** `{{if(74.array[1].label; map(74.array; "label"); emptyarray)}}` works correctly and returns the mapped labels. An earlier note here claimed the opposite; that was WRONG. The run that appeared to disprove it had simply executed a stale pre-edit blueprint (see the deactivate/reactivate entry above) - the expression was never the fault. **Lesson: before blaming an expression for an empty result, confirm the scenario was reactivated after the edit that introduced it.**

**The Make expression editor mangles `""` literals on paste.** Pasting an expression containing empty-string arguments produced first `; )` (both `""` and the `= ""` comparison silently dropped) and then `= ` / `+ ` on a second attempt - the signature of double-escaping. **Never paste an expression containing `""` into Make from an external source.** Either copy an existing working field in-place inside the same module, or rewrite the expression so it contains no empty-string literal at all (`length(x) > 0` instead of `ifempty(x; "") = ""`).

**Error handlers:** `builtin:Break` does NOT abort — it stores the run as an incomplete execution and RETRIES it. Use `builtin:Commit` to terminate cleanly, `builtin:Ignore` to skip. Put `[Ignore]` on every notification module so a broken mailbox cannot kill an otherwise-good run.

**`executions_get-detail` via MCP returns only status and error class — never per-module input/output**, despite its description. For module-level data the user must open the execution in Make's History tab.

**`getSheetContent` keys columns by 0-BASED NUMERIC INDEX RELATIVE TO THE RANGE, not by column letter.** With range `A1:H90`, column C is ``{{2.`2`}}``; `{{2.C}}` returns EMPTY with no error. Proved by probe: `idx2=CUSTOMER INFORMATION|Customer Name|Address|Email|Phone` while `A=||||` and `C=||||`. This silently emptied every row-anchor variable, so ranges collapsed (`F{{empty}}:F{{empty}}` -> `F:F` -> wrote to F1).

**Avoid arithmetic in range expressions.** `{{16.rowCustomer + 3}}` is ambiguous: with an empty left operand it yields `3`, which cannot distinguish numeric addition from string concatenation — if it concatenates, `6 + 3` gives `63` and writes to a wildly wrong row. Look up BOTH boundary rows by label instead (`Customer Name`→`Phone`, `Jan`→`Dec`); it is also robust to template edits.

**A Make plan can cap ACTIVE scenarios at one** — activating a second fails with "Maximum number of active scenarios has been exceeded". Deactivate before activating a probe.

**Cheap diagnostic pattern when execution detail is unavailable:** build a 4-module probe scenario (webhook → the module under test → aggregator → `datastore:AddRecord`) that writes the resolved expressions into a data store, which IS readable over the API. Far faster than guessing, and costs a handful of operations rather than a full pipeline run.

**`builtin:BasicAggregator` REQUIRES `parameters: {"feeder": <source module id>}`.** Without it Make's editor refuses to save with "Array aggregator - Source node is not set." The mapper alone is not enough, and nothing in the JSON hints at it — every working aggregator in the solar blueprint carries one (4->3, 15->14, 43->42, 74->73). The same almost certainly applies to other source-bound builtins. **A blueprint validator must assert that every aggregator has a `feeder` pointing at a visible preceding module** — a hand-written validator that only checks references, nesting and visibility will pass a blueprint the editor then rejects.

**Error-handler directive specs, from `app-module_get` (free — always check this instead of guessing a mapper shape).** `builtin:Resume` takes an **EMPTY mapper** `{}`. `builtin:Break` takes `{"retry": true, "count": <1-10000>, "interval": <minutes, 1-44640>}`, defaults count 3 / interval 15. Both are type "directive".

**`Ignore` vs `Resume` matters for diagnostics.** `Ignore` DISCARDS the bundle, so every module downstream in that chain is skipped — including any module meant to record what went wrong. `Resume` skips the error and CONTINUES the bundle, so downstream status/logging modules still run. Prefer `Resume` whenever a failure needs to be reported rather than silently swallowed. After a Resume the failed module's output is undefined, so wrap every read of it in `ifempty(<ref>; "")` or the expression can throw.

**`Break` retries cost operations** (it re-runs from the failed bundle) and only fires while the scenario is ACTIVE, leaving incomplete executions behind. Do not enable it on a credit-constrained account.

**A Make data store SILENTLY DROPS any field not declared in its data structure — `strict: false` does NOT mean "accept extra fields".** It only relaxes validation; undeclared keys are discarded on write with no error. Proved on 2026-09-16: a store whose structure declared only 6 fields accepted writes containing `recordType`, `status`, `outcome`, `startedAt`, `startedTs`, `reportYear` and persisted NONE of them, while the run reported success. This is silent and severe — `recordType` vanishing breaks every `SearchRecord` that filters on it, so returning customers are never found and every submission re-provisions. **When cloning a pipeline to a new account, declare EVERY field the blueprint writes, not just the ones the old structure listed.**

**A `number`-typed value survives a `text`-declared field.** After declaring `outcome` as text, a billyear record still reads back `"outcome": 2026` unquoted. Make coerces on read, so numeric comparisons like `billing_period_year > get(priorYears; mkey)` keep working.

**A data-store field of type `collection` with NO sub-spec holds an arbitrary dynamic map, and `datastore:AddRecord` writes one correctly (proved 2026-09-23).** `toCollection(...)` mapped into such a field stored 31 dynamic `YYYY-MM` keys with their values intact - no stringification, nothing dropped. Type `collection` is valid in a data structure; type **`any` is NOT** (`Value not found in options in parameter 'type'`).

**BUT the Make UI renders NO input control for a sub-spec-less `collection` field.** The module's field list shows the field name with no box beneath it. The mapped expression still lives in the blueprint and executes fine - **but do not open that module and press OK/Save, because a UI save rewrites the mapper from what it rendered and will drop the value**, exactly as it strips `rows` from `updateMultipleRows`. Paste it, verify over the API, and never open it in the editor.

**Prefer one record holding a map over N records holding one value each.** Rewriting 32 per-period data-store records as a single `collection` field took a production import from **80 operations to 47** and from **32 records per customer to 1**. Data-store space is finite - `data-stores_create` had already started failing with "Not enough space in storage".

**`overwrite: true` REPLACES the whole record, it does not merge.** The lock release writes `{status, contactId, finishedAt, recordType}` and the `startedTs` written at lock time is gone afterwards. Fine here (a released lock is identified by `status = "Done"`), but do not assume a field survives an overwrite.

**THE UI BLUEPRINT IMPORT SILENTLY STRIPS `rows` FROM `google-sheets:updateMultipleRows` (eu1, 2026-09-16).** Importing the exact same JSON that worked on eu2 produced four modules (21, 33, 55, 64) whose mapper kept only `range`, `sheetId`, `spreadsheetId`, `valueInputOption` — the entire `rows` array was gone. **The scenario still validates, still runs, and still reports SUCCESS**; the Sheets API call is made with no values, so nothing is written and `updatedRange` comes back as a SINGLE CELL (`D6` instead of `D6:D9`, `D31` instead of `D31:D42`). The only visible symptom is an empty report.

Why: in the `updateMultipleRows` v2 schema, `rows` is the innermost `x-nested` field under `range` -> `sheetId` -> `spreadsheetId`. When those outer fields hold mapped EXPRESSIONS rather than values picked from the RPC dropdowns, the importer appears to prune the deepest nested field. eu2's older Make preserved it; eu1's does not.

**The API does NOT strip it.** Proved with a throwaway 2-module scenario (`scenarios_create` then `scenarios_get`): all four `rows` entries survived intact. So `scenarios_create`/`scenarios_update` are safe; only the UI import is lossy.

**Detection recipe:** after ANY UI import, diff the live blueprint against the file you imported and compare mapper KEYS per module — not just references. `[k for k in sent_mapper if k not in live_mapper]` catches this instantly. Also check History: a write whose Input shows no `rows` and whose Output `updatedRange` is a single cell wrote nothing.

**Also added by the eu1 importer (harmless):** `valueRenderOption` and `dateTimeRenderOption` on `google-sheets:getSheetContent`.

**The stripped `rows` CAN be re-entered by hand in the Make UI** (my "the UI cannot render it" theory was WRONG — check before concluding a UI limitation). The Rows field defaults to MAP MODE, which turns it into one text box; toggle map off to get the nested `Rows -> Row -> Values -> Column` editor. Mistakes seen in practice, all silent: pasting every expression into the one map-mode box (stores `rows` as a STRING, not an array); creating N rows of 1 value when the module needs 1 row of N values (module 55 writes `D{row}:F{row}` = ONE row, THREE columns); and a trailing `

` left on a pasted value.

**Verify structure, not just presence.** `len(rows)` on a string returns its character count, so a naive length check reports "35 rows" for a 35-character string. Assert `isinstance(rows, list)` first, then compare each row's `values` array element-by-element against the intended blueprint.

**`google-sheets:addRow` v2 in `map` mode takes `values` as an object keyed by 0-BASED NUMERIC STRINGS** — `{"0": <col A>, "1": <col B>, ...}` — alongside `mode: "map"`, `spreadsheetId`, `sheetId` (the tab NAME), `tableFirstRow` (e.g. `"A1:Z1"`), `insertUnformatted` and `valueInputOption`. Use `RAW` for log rows so nothing in the data can be reinterpreted as a formula. Appending is also concurrency-safe in a way that `updateMultipleRows` with a computed row number is not.

**When `rpc_execute` is blocked (it needs admin "organization view"), confirm a mapper shape with a THROWAWAY SCENARIO instead of guessing:** `scenarios_create` with the module as you believe it should look, then `scenarios_get` to see what Make stored, then `scenarios_delete`. It costs no operations because the scenario is never activated or run, and `isinvalid: false` on creation plus an unchanged mapper on read-back is strong proof. This is the cheapest authoritative check available.

**A BLOCKED FILTER STOPS THE ENTIRE REST OF THE CHAIN, not just its own module.** A Make route is a linear chain: if module N's filter rejects the bundle, N and every module AFTER it in that flow is skipped. So a module that must always run — a logger, a status write, a lock release — must sit EARLY in its route, ahead of every filter, not at the end where it reads naturally. This is the same failure shape as placing a required module downstream of an `[Ignore]` handler, and it is easy to miss because the route looks like a list of independent steps. Proved live on 2026-09-19: a completion log row placed last in a route never fired because an upstream `Bill carried customer details` filter blocked on a run where no bill was accepted. **A blueprint validator should assert that no filter precedes any must-always-run module in the same flow.**

**A `builtin:BasicRouter` MUST be the last module in its own flow.** Anything appended after it in the same `flow` array is structurally invalid — the routes ARE the continuation. When you need a module to run after everything else in a route that ends in a router, insert it immediately BEFORE the router, or put a copy at the end of each of the router's routes. A validator should assert this: routers are frequently the last element already, so the mistake only appears when you append programmatically.

**An error handler is a ROUTE, not just a directive — you can put working modules in front of the directive, and they run.** `onerror: [<module>, <module>, builtin:Ignore]` executes both modules and then discards the bundle. This is how you log a failure that an `Ignore` would otherwise swallow silently, and it costs an operation only when the error actually fires. Confirmed by a live Notion blueprint whose `78.ERR` is `[notion:updateADatabaseItem, builtin:Break]` — log first, then the directive decides the control flow.

**`{{N.error.message}}` and `{{N.error.detail}}` are readable inside module N's OWN error-handler route.** That is the supported way to capture why something failed; outside that route the fields are not available.

**THE UI IMPORT WIPES A MAPPED VALUE IN A SUB-SPEC-LESS `collection` DATA-STORE FIELD (eu1, 2026-09-25).** `datastore:AddRecord` `data.prodMap: "{{44.prodMap}}"` came back as `{}`. The importer rebuilds every AddRecord `data` object from the bound data structure: it pads each undeclared-in-mapper field with `""`, and it replaces the collection with an empty object. The run still reports success, and the report silently shows 0 production. A key-only audit misses this: **diff VALUES, not just keys, against the imported file.** The value can't be re-entered in the UI (no input control), so it must be restored through `scenarios_update`.

**AN OPEN MAKE EDITOR OVERWRITES AN API UPDATE WITH ITS STALE COPY (eu1, 2026-09-25, three times in a row).** If the scenario is open in the browser when a REST PATCH or `scenarios_update` lands, the next Save in that tab pushes the old blueprint back and silently reverts EVERY API change, plain text expressions included. Always close all Make tabs before an API update, hard-reload afterwards, and confirm the new value is visible in the editor before saving.

**"Cannot initialize the scenario - Scenario validation failed - N problem(s) found" = an IML syntax error (e.g. an unbalanced bracket), and it costs 0 ops** (2026-09-25). Neither `executions_get-detail` nor `validate_module_configuration` says which field; bisect the fields. A real case: splicing a new branch into a nested `if()` chain left one extra `)`. Always run a bracket-balance check (quote-aware) over every `{{...}}` before pushing, and test new expressions in a throwaway 1-module probe, which fails the same way if the syntax is wrong. Also note that a probe's interface change needs the probe deactivated and reactivated before it takes effect.

**IML: an EMPTY value compared with `!= ""` evaluates as NOT empty (probe-proven 2026-09-26).** e.g. `if(59.heldRank != ""; …)` took the "has a value" branch when heldRank was empty. Always write `ifempty(x; "") != ""` (and `toString(ifempty(x; "")) = ""` for the equality test). Watch for this in every check on a variable that a Set Variables module may leave unset. The mirror case is proven on real Gemini output too: `if(3.result.missing_prop = ""; …)` takes the NOT-equal branch, so `x = ""` never detects a property Gemini omitted. Filters are different: text:equal / text:notequal against an empty b DO treat a missing value as "".

**PROBE BUILDERS: rename module refs with a whole-ref regex, never plain `str.replace` (2026-09-26).** `replace("52.", "2.")` also rewrote "1,952.6331" inside a prompt, which made me report a typo that live did not have. Use `re.sub(r"(?<![\w.,])52\.", ...)`, and diff the probe's copied mappers against live before trusting the probe.

**CORRECTION 2026-09-19: the `rows` stripping happens on eu2 TOO.** An earlier note guessed it was eu1-specific, or specific to importing into an existing scenario. Both guesses were wrong. Importing into a brand-new scenario on **eu2** stripped `rows` from all four `updateMultipleRows` modules (21, 33, 55, 64). Treat UI import as ALWAYS lossy for this field, in every zone, new scenario or existing. The API (`scenarios_create`/`scenarios_update`) still preserves it.

**The `rows` stripping is NOT universal — always DIFF after an import, never assume.** On 2026-09-16 the v10 import into eu1 preserved everything: all four `rows` arrays byte-identical, every filter, every parameter, every aggregator `feeder`. The earlier v8 import into the same account had stripped all four. The difference appears to be that v10 was imported as a NEW scenario while v8 was imported into an existing one — unconfirmed, but the practical rule is the same either way: **compare the live blueprint against the file you sent, module by module, and only fix what actually differs.** Handing over repair values for fields that were never damaged wastes the user's time and risks breaking something that was fine.
