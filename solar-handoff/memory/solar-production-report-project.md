---
name: solar-production-report-project
description: Client project (started 2026-09-14) — automate a solar production report from a GHL form -> Make.com webhook, filling a Google Sheet report template.
metadata:
  type: project
---

Client project: **Solar Production Report automation**. A GoHighLevel (GHL) form posts to a Make.com webhook. From that payload we must build a filled report (Google Sheet template) and email it to the client.

**Webhook payload contains** (sample contact: Naif Saad, info@slightedge.io, +17739619241, contact_id DK1H5WHAwVEdYgEG77s8, location XYZ Marketing / CC6bDU89uvFLEGC3jF63, workflow "Solar Form > Google Sheet"):
- `Contracted solar production` — a single number (sample: 2589)
- 12 fields `Jan utility bill` … `Dec utility bill` — each an array with one `https://services.leadconnectorhq.com/documents/download/<id>` URL (PDF)
- `Solar production file` — CSV of actual production
- `Utility bill before solar` — single PDF containing a 12-month bar chart (pre-solar usage)

**Five data groups to fill in the report template:**
1. Name + email + phone (orange cells in the template screenshot)
2. Contracted / expected solar production (the single number)
3. 12 utility bills — extract **grid from**, **grid to**, and the **date/billing month** from each PDF
4. Production CSV — monthly production values, **matched month-by-month to the corresponding bill** (yellow cells)
5. Pre-solar bill PDF — read the 12-month bar chart values into the report (red cells)

**Why:** end deliverable is a filled report emailed to the client's own customer.

**How to apply:** wait for the sample files the user promised (one utility bill PDF, the pre-solar bill PDF, the production CSV) before writing extraction logic. Open questions to resolve: (a) the template screenshot was referenced but did not attach — need it; (b) user said name/email/phone come "from the bills" but they are in the webhook payload — confirm which source, or whether the *service address* is what comes from the bills; (c) is the pre-solar chart machine-readable text in the PDF or only a rendered image (may need vision/OCR); (d) final output — Google Sheet copy, PDF export, or both; (e) does the build live in Make.com or in n8n/code.
