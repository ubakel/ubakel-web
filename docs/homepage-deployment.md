# UBAKEL homepage deployment

The approved composition is published through `src/lib/homepage.ts` at `/` and `/ar/`. The Arabic page has edited Arabic copy, Cairo/IBM Plex Sans Arabic typography, RTL layout, localized workflow data, form messages and accessibility labels. Department arrow-key navigation follows RTL direction. Malay and the existing service/product pages retain their current routes.

The primary contact dialog uses the existing Web3Forms submission service and configured public form access key. It collects name, work email, company, optional WhatsApp number and message. Success/error feedback is localized; failed requests retain input and allow retry. Native POST remains available when JavaScript is unavailable. Direct WhatsApp and email links remain separate contact channels. `/contact/` retains the original enquiry component as another entry point.

Validation:

- Production build: 25 pages generated successfully.
- Arabic at 1440/1024/768/390/320px: no document or header overflow.
- Arabic desktop/mobile typography and composition reviewed in Chromium.
- All five hero examples and department data have Arabic content.
- Arabic RTL keyboard navigation and reporting comparison verified.
- Form success and error responses tested with intercepted, synthetic requests. No real test enquiry was sent.
- Production canonical metadata, indexability, artwork and language links checked.
- Earlier checks cover menu/Escape, motion pause/replay/reduced-motion and clinic video decoding/playback.

Other browser engines have not been tested. Cloudflare's existing GitHub integration builds and publishes the merged production branch.
