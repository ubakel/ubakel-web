# Contact lead API (`/api/contact`)

A serverless function on Cloudflare Workers that captures every website enquiry and
forwards it to n8n. It is the only non-prerendered route; every page is still static.

## Flow

1. Both contact forms (homepage dialog and `/contact/`) send the enquiry to Web3Forms
   exactly as before **and**, in parallel, to `/api/contact`. The email path never waits
   for or depends on this endpoint.
2. The endpoint validates the fields (required, lengths, email format) and drops
   honeypot (bot) submissions.
3. It builds a `lead_id` (hash of email + message) and skips duplicates within 24 hours.
4. It forwards the lead to the n8n webhook, retrying 3 times (0.5s, 1.5s back-off) on
   timeouts, network errors, 429 and 5xx.
5. Leads that still fail are kept in a retry queue for 14 days. After the next successful
   delivery the endpoint re-sends up to 5 queued leads automatically (self-healing).
6. Every outcome is logged as structured JSON (`lead.delivered`, `lead.duplicate`,
   `lead.delivery_failed`, `lead.recovered`), visible in Cloudflare Workers logs.

## Lead payload sent to n8n

```json
{ "lead_id": "712b6b5e04513c50", "received_at": "2026-11-05T00:04:10.000Z",
  "source": "ubakel.com", "locale": "en", "name": "…", "email": "…",
  "company": "…", "phone": "…", "message": "…", "country": "MY" }
```

## Setup (one time)

Without any setup the endpoint still validates and logs; it simply has nowhere to forward.

1. n8n: create a workflow with a **Webhook** node (POST). Optionally check the
   `X-Lead-Secret` header with an IF node.
2. Secrets:
   ```sh
   npx wrangler secret put N8N_LEAD_WEBHOOK_URL
   npx wrangler secret put N8N_LEAD_WEBHOOK_SECRET
   ```
3. Optional KV (de-duplication + retry queue):
   ```sh
   npx wrangler kv namespace create LEADS
   ```
   then add `{ "binding": "LEADS", "id": "<id from the command>" }` to `kv_namespaces`
   in `wrangler.jsonc`.

## Responses

| Case | Status | Body |
| --- | --- | --- |
| Accepted | 202 | `{ "ok": true, "lead_id": "…" }` |
| Duplicate | 202 | `{ "ok": true, "lead_id": "…", "duplicate": true }` |
| Invalid | 400 | `{ "ok": false, "errors": { "email": "invalid email" } }` |
| Wrong method | 405 | `{ "ok": false, "error": "method not allowed" }` |

## Verified locally (`wrangler dev`, fake n8n webhook)

- Valid lead → delivered to the webhook with the secret header; Arabic referer → `locale: "ar"`.
- Same lead again → `duplicate: true`, not forwarded twice.
- Missing fields / bad email / 2001-character message → 400 with field errors.
- Honeypot filled → 202, nothing forwarded.
- Webhook returning 500 → 3 attempts, lead queued; next lead after recovery → both delivered,
  `lead.recovered` logged.
- Homepage and `/contact/` still return 200; production build succeeds.

Test with curl:

```sh
curl -X POST https://ubakel.com/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","message":"Test lead"}'
```
