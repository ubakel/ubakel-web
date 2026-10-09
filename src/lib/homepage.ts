import english from '../../public/design-review/index.html?raw';
import arabic from '../content/homepage-ar.html?raw';
import { site } from '../data/site';

export function homepage(locale: 'en' | 'ar') {
  const ar = locale === 'ar';
  const title = ar ? 'UBAKEL — ذكاء اصطناعي وأتمتة على مقاس عملك' : 'UBAKEL — Custom AI, Automation & Integrations';
  const description = ar ? 'نبني وكلاء ذكاء اصطناعي وحلول أتمتة وتكامل مخصّصة لطريقة عمل شركتك.' : 'Custom AI agents, automations and integrations built around your business workflow.';
  const url = ar ? 'https://ubakel.com/ar/' : 'https://ubakel.com/';
  const labels = ar ? {
    close: 'إغلاق نموذج التواصل', kicker: 'لنبدأ بإجراء واحد', title: 'ما الذي يشغل<br>وقت فريقك؟', intro: 'أخبرنا بما يتكرر أو يتعطّل في عملك. سنراجع طلبك ونتواصل معك لمناقشة الخطوة التالية.',
    name: 'الاسم الكامل', email: 'البريد الإلكتروني للعمل', business: 'اسم الشركة', phone: 'رقم واتساب (اختياري)', workflow: 'ما الذي تود تحسينه أو أتمتته؟', placeholder: 'نقضي وقتًا طويلًا في…', submit: 'اطلب مراجعة أولية مجانية', sending: 'جارٍ إرسال الطلب…', success: 'وصل طلبك. شكرًا لك! سنتواصل معك قريبًا لمناقشة طريقة عملك.', error: 'تعذّر إرسال الطلب. حاول مرة أخرى، أو تواصل معنا عبر البريد الإلكتروني.', invalid: 'يرجى تعبئة هذا الحقل.', note: 'يُرسل هذا النموذج طلبك إلى فريق UBAKEL عبر البريد الإلكتروني.', direct: 'للتواصل مباشرةً:',
  } : {
    close: 'Close contact form', kicker: 'START WITH ONE WORKFLOW', title: 'What’s keeping<br>your team busy?', intro: 'Tell us what repeats or gets stuck. We’ll review your request and get in touch to discuss the next step.',
    name: 'Full name', email: 'Work email', business: 'Company', phone: 'WhatsApp number (optional)', workflow: 'What would you like to improve or automate?', placeholder: 'We spend a lot of time on…', submit: 'Request a free initial workflow audit', sending: 'Sending your request…', success: 'Your request has been received. Thank you! We’ll be in touch to discuss your workflow.', error: 'We couldn’t send your request. Please try again, or contact us by email.', invalid: 'Please complete this field.', note: 'This form sends your enquiry to the UBAKEL team by email.', direct: 'Contact us directly:',
  };
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const contact = `<dialog id="contact-dialog" class="contact-dialog" aria-labelledby="contact-title"><button class="dialog-close" data-close="contact-dialog" aria-label="${labels.close}">×</button><span class="eyebrow">${labels.kicker}</span><h2 id="contact-title">${labels.title}</h2><p class="dialog-intro">${labels.intro}</p>
    <form id="contact-form" action="https://api.web3forms.com/submit" method="POST" data-sending="${labels.sending}" data-success="${labels.success}" data-error="${labels.error}" data-invalid="${labels.invalid}">
      <input type="hidden" name="access_key" value="${escape(site.web3formsKey)}"><input type="hidden" name="subject" value="New workflow audit request — UBAKEL"><input type="hidden" name="from_name" value="UBAKEL Website"><input type="hidden" name="redirect" value="https://web3forms.com/success"><input type="checkbox" name="botcheck" hidden tabindex="-1" autocomplete="off">
      <div class="form-row"><label>${labels.name}<input id="name" name="name" autocomplete="name" required maxlength="100"></label><label>${labels.email}<input id="email" name="email" type="email" autocomplete="email" dir="ltr" required maxlength="254"></label></div>
      <div class="form-row"><label>${labels.business}<input id="business" name="company" autocomplete="organization" required maxlength="150"></label><label>${labels.phone}<input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr" maxlength="50"></label></div>
      <label>${labels.workflow}<textarea id="workflow" name="message" placeholder="${labels.placeholder}" required rows="3" maxlength="2000"></textarea></label>
      <button type="submit" class="button dark"><span id="submit-label">${labels.submit}</span><span aria-hidden="true">↗</span></button><p class="form-note">${labels.note} ${labels.direct} <a href="mailto:info@ubakel.com" dir="ltr">info@ubakel.com</a></p><p id="form-status" role="status" hidden></p>
    </form></dialog>`;
  const metadata = `<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="https://ubakel.com/"><link rel="alternate" hreflang="ar" href="https://ubakel.com/ar/"><link rel="alternate" hreflang="ms" href="https://ubakel.com/ms/"><link rel="alternate" hreflang="x-default" href="https://ubakel.com/"><meta property="og:site_name" content="UBAKEL"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${description}"><meta property="og:image" content="https://ubakel.com/og-image.jpg"><meta property="og:locale" content="${ar ? 'ar_AR' : 'en_US'}"><meta name="twitter:card" content="summary_large_image">${ar ? '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Cairo:wght@600;700;800&display=swap" rel="stylesheet">' : ''}`;
  const languageLinks = `<a href="/" lang="en" data-lang="en"${ar ? '' : ' aria-current="page"'}>English</a><a href="/ar/" lang="ar" data-lang="ar"${ar ? ' aria-current="page"' : ''}>العربية</a><a href="/ms/" lang="ms" data-lang="ms">Bahasa Melayu</a>`;
  return (ar ? arabic : english)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace('<meta name="robots" content="noindex, nofollow">', metadata)
    .replace('<link rel="stylesheet" href="style.css">', '<link rel="stylesheet" href="/design-review/style.css"><link rel="stylesheet" href="/homepage.css">')
    .replace('src="app.js"', 'src="/homepage.js"')
    .replaceAll('assets/', '/design-review/assets/')
    .replace(/<dialog id="contact-dialog"[\s\S]*?<\/dialog>/, contact)
    .replace('</main>', `<noscript><p style="padding:24px;text-align:center"><a href="/contact/">${ar ? 'أرسل طلبك عبر نموذج التواصل' : 'Send your enquiry through the contact form'}</a></p></noscript></main>`)
    .replace('<div class="header-actions">', `<div class="header-actions"><details class="language-menu"><summary aria-label="${ar ? 'تغيير اللغة' : 'Change language'}">${ar ? 'ع' : 'EN'}</summary><nav aria-label="${ar ? 'اللغة' : 'Language'}">${languageLinks}</nav></details>`)
    .replace('</footer>', `<nav class="languages" aria-label="${ar ? 'اللغة' : 'Language'}">${languageLinks}</nav></footer>`);
}
