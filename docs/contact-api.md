# Contact lead API (`/api/contact`)

A serverless function on Cloudflare Workers that captures every website enquiry and
sends an instant alert to Telegram. It is the only non-prerendered route; every page is still static.

## Flow

1. Both contact forms (homepage dialog and `/contact/`) send the enquiry to Web3Forms
   exactly as before **and**, in parallel, to `/api/contact`. The email path never waits
   for or depends on this endpoint.
2. The endpoint validates the fields (required, lengths, email format) and drops
   honeypot (bot) submissions.
3. It builds a `lead_id` (hash of email + message) and skips duplicates within 24 hours.
4. It sends a Telegram message to the configured chat, retrying 3 times (0.5s, 1.5s back-off) on
   timeouts, network errors, 429 and 5xx.
5. Leads that still fail are kept in a retry queue for 14 days. After the next successful
   delivery the endpoint re-sends up to 5 queued leads automatically (self-healing).
6. Every outcome is logged as structured JSON (`lead.delivered`, `lead.duplicate`,
   `lead.delivery_failed`, `lead.recovered`), visible in Cloudflare Workers logs.

## Telegram message

```
New website lead (EN)
Name: Sara Ali
Company: Clinic One
Email: sara@example.com
WhatsApp: +60 12
Country: MY

We book patients by hand

Lead ID: b6501401744f66cf · 2026-11-05T00:24:58.441Z
```

## Setup (one time)

Without setup the endpoint still validates and logs; it simply has nowhere to send alerts.

1. In Telegram, message **@BotFather** → `/newbot` → copy the bot token.
2. Send any message to your new bot (or add it to a group), then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`
   (group ids start with `-`).
3. Cloudflare dashboard → Workers & Pages → **ubakel-web** → Settings → Variables and Secrets:
   - `TELEGRAM_BOT_TOKEN` (type **Secret**)
   - `TELEGRAM_CHAT_ID` (type Text)

   or from the terminal:
   ```sh
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   ```
4. Optional KV (de-duplication + retry queue):
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

## Verified locally (`wrangler dev`, fake Telegram API)

- Valid lead → Telegram message to the configured chat; Arabic referer → `(AR)`.
- Same lead again → `duplicate: true`, not sent twice.
- Missing fields / bad email / 2001-character message → 400 with field errors.
- Honeypot filled → 202, nothing sent.
- Telegram returning 500 → 3 attempts, lead queued; next lead after recovery → both sent,
  `lead.recovered` logged.
- Homepage and `/contact/` still return 200; production build succeeds.

Test with curl:

```sh
curl -X POST https://ubakel.com/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","company":"Test Co","message":"Test lead"}'
```
