// src/pages/api/contact.ts
//
// Lead-capture endpoint for the website's contact forms. Runs as a
// serverless function on Cloudflare Workers (the only route that is not
// prerendered).
//
// Flow: validate → de-duplicate → forward to the n8n lead webhook with
// retries → keep anything that still fails in a retry queue, which is
// flushed automatically on the next successful delivery.
//
// The Web3Forms email path in the browser is unchanged, so the enquiry email
// still arrives even if this endpoint or n8n is down.
//
// Configuration (all optional — the endpoint degrades gracefully):
//   N8N_LEAD_WEBHOOK_URL     secret: n8n Webhook node production URL
//   N8N_LEAD_WEBHOOK_SECRET  secret: sent as X-Lead-Secret for n8n to check
//   LEADS                    KV binding: de-duplication + failed-delivery queue
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

type Lead = {
  lead_id: string;
  received_at: string;
  source: string;
  locale: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  country: string | null;
};

type KV = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(opts: { prefix: string; limit?: number }): Promise<{ keys: { name: string }[] }>;
};

const vars = env as unknown as {
  N8N_LEAD_WEBHOOK_URL?: string;
  N8N_LEAD_WEBHOOK_SECRET?: string;
  LEADS?: KV;
};

const LIMITS = { name: 100, email: 254, company: 150, phone: 50, message: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DEDUPE_TTL = 60 * 60 * 24; // same person + same message within 24h = duplicate
const FAILED_TTL = 60 * 60 * 24 * 14; // keep undelivered leads for 14 days
const ATTEMPTS = 3;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const log = (level: 'info' | 'warn' | 'error', event: string, data: Record<string, unknown> = {}) =>
  console[level](JSON.stringify({ event, ...data }));

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) return (await request.json()) as Record<string, unknown>;
  return Object.fromEntries(await request.formData());
}

export function validate(raw: Record<string, unknown>) {
  const value = (k: string) => String(raw[k] ?? '').trim();
  const fields = {
    name: value('name'),
    email: value('email').toLowerCase(),
    company: value('company'),
    phone: value('phone'),
    message: value('message'),
  };
  const errors: Record<string, string> = {};
  for (const k of ['name', 'email', 'company', 'message'] as const) {
    if (!fields[k]) errors[k] = 'required';
  }
  for (const [k, max] of Object.entries(LIMITS)) {
    if (fields[k as keyof typeof fields].length > max) errors[k] = `max ${max} characters`;
  }
  if (fields.email && !errors.email && !EMAIL_RE.test(fields.email)) errors.email = 'invalid email';
  return { fields, errors };
}

async function leadId(email: string, message: string) {
  const data = new TextEncoder().encode(`${email}\n${message.replace(/\s+/g, ' ').toLowerCase()}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// POSTs the lead to n8n; retries network errors, timeouts, 429 and 5xx.
async function deliver(lead: Lead): Promise<{ ok: boolean; status?: number; error?: string }> {
  const url = vars.N8N_LEAD_WEBHOOK_URL;
  if (!url) return { ok: false, error: 'N8N_LEAD_WEBHOOK_URL not configured' };
  let last: { ok: boolean; status?: number; error?: string } = { ok: false };
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(vars.N8N_LEAD_WEBHOOK_SECRET ? { 'X-Lead-Secret': vars.N8N_LEAD_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) return { ok: true, status: res.status };
      last = { ok: false, status: res.status };
      if (res.status < 500 && res.status !== 429) break; // 4xx other than 429 won't fix itself
    } catch (err) {
      last = { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
    if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, 500 * 3 ** (attempt - 1)));
  }
  return last;
}

// Self-healing: once n8n is reachable again, re-send leads that failed earlier.
async function flushFailed(kv: KV) {
  const { keys } = await kv.list({ prefix: 'failed:', limit: 5 });
  for (const { name } of keys) {
    const stored = await kv.get(name);
    if (!stored) continue;
    const result = await deliver(JSON.parse(stored) as Lead);
    if (!result.ok) {
      log('warn', 'lead.retry_failed', { key: name, ...result });
      return; // still down; try again next time
    }
    await kv.delete(name);
    log('info', 'lead.recovered', { key: name });
  }
}

async function process(lead: Lead) {
  const kv = vars.LEADS;
  const result = await deliver(lead);
  if (result.ok) {
    log('info', 'lead.delivered', { lead_id: lead.lead_id, status: result.status });
    if (kv) await flushFailed(kv);
    return;
  }
  log('error', 'lead.delivery_failed', { lead_id: lead.lead_id, ...result });
  if (kv) await kv.put(`failed:${lead.lead_id}`, JSON.stringify(lead), { expirationTtl: FAILED_TTL });
}

export const POST: APIRoute = async ({ request, locals }) => {
  let raw: Record<string, unknown>;
  try {
    raw = await readBody(request);
  } catch {
    return json(400, { ok: false, error: 'unreadable body' });
  }

  // Honeypot filled in = bot. Answer like a success so it learns nothing.
  if (raw.botcheck) return json(202, { ok: true });

  const { fields, errors } = validate(raw);
  if (Object.keys(errors).length) return json(400, { ok: false, errors });

  const id = await leadId(fields.email, fields.message);
  const kv = vars.LEADS;
  if (kv) {
    if (await kv.get(`seen:${id}`)) {
      log('info', 'lead.duplicate', { lead_id: id });
      return json(202, { ok: true, lead_id: id, duplicate: true });
    }
    await kv.put(`seen:${id}`, '1', { expirationTtl: DEDUPE_TTL });
  }

  const referer = request.headers.get('referer') ?? '';
  const lead: Lead = {
    lead_id: id,
    received_at: new Date().toISOString(),
    source: 'ubakel.com',
    locale: /\/ar(\/|$)/.test(new URL(referer || 'https://ubakel.com/').pathname) ? 'ar' : 'en',
    ...fields,
    country: ((request as Request & { cf?: { country?: string } }).cf?.country) ?? null,
  };

  // Answer the visitor immediately; delivery and retries continue in the background.
  const work = process(lead).catch((err) => log('error', 'lead.unexpected', { lead_id: id, error: String(err) }));
  const ctx = (locals as { cfContext?: { waitUntil(p: Promise<unknown>): void } }).cfContext;
  if (ctx) ctx.waitUntil(work);
  else await work;

  return json(202, { ok: true, lead_id: id });
};

export const ALL: APIRoute = () => json(405, { ok: false, error: 'method not allowed' });
