# UBAKEL homepage design review

Proposed homepage direction at `/design-review/`. Open this directory's `index.html` through a local HTTP server. The page explains custom AI agents, workflow automation and integrations, with five hero examples and an animated explorer for operations, finance, customer support and sales/admin. Other custom workflows are explicitly welcomed.

The complete media set is included: robot render, alpha mask, font, logo, clinic video and poster. Solar Review is presented as a client workflow; Intelicare is a working demonstration using demonstration data. Typography uses Manrope with consistent body copy and display headings.

The contact form prepares a WhatsApp draft for the visitor to review and send. It does not send or store submissions. Integration into the production homepage still requires retaining the existing backend, language routes and reviewed translations. This draft route does not replace the production homepage.

## Verified on October 9, 2026

- No horizontal overflow or missing images at 1440, 1024, 768, 390 and 320px.
- Desktop hero and department explorer visually inspected; mobile layout visually inspected.
- All five hero example selectors, department tabs and arrow-key navigation, and manual/automated reporting controls work.
- Mobile menu opens and closes with Escape; section numbering is consistent.
- Animation pause/resume, replay and emulated system reduced-motion preference work.
- Contact dialog prepares a correctly encoded draft using synthetic test data; no message was sent.
- Supplied video decodes and plays, has a 68.27-second duration, and pauses when the dialog closes.

Checks cover Chromium via the supported browser tools. Other browser engines and production contact/backend integration remain outside this isolated design review. The actual build outcome is recorded in `qa/verification.json`.
