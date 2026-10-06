// src/data/site.ts
// Single source of truth for site-wide constants. Swap these for real values.

export const site = {
  name: 'Ubakel',
  domain: 'ubakel.com',
  email: 'info@ubakel.com',
  whatsapp: {
    display: '+60 17-738 7589',
    href: 'https://wa.me/60177387589',
  },
  // Web3Forms access key (client-side, safe to expose).
  web3formsKey: 'df637e21-9fe1-40e6-984e-847f18999e25',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ubakel/' },
    { label: 'Upwork',   href: 'https://www.upwork.com/agencies/1980826233367275357/' },
  ],
} as const;

// Primary navigation (labels are resolved through the i18n dictionary by key).
export const nav = [
  { key: 'nav.services', href: '/services' },
  { key: 'nav.products', href: '/products' },
  { key: 'nav.about',    href: '/#about' },
] as const;

// Tech partner ticker. Each name is looked up against the icon map in
// PartnerTicker.astro — add real logos there if you add a name here.
export const partners = [
  'OpenAI', 'Anthropic', 'n8n', 'Make', 'LangChain', 'CrewAI',
  'HubSpot', 'Salesforce', 'Zapier', 'Google Gemini', 'Microsoft',
  'PostgreSQL', 'Supabase', 'Pinecone', 'Botpress',
  'WhatsApp', 'Meta', 'Instagram', 'Facebook',
] as const;
