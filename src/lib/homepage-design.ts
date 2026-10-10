type Locale = 'en' | 'ar';

/** The workflow illustration uses the same accessible controls as the homepage. */
export function designHomepage(html: string, locale: Locale) {
  const ar = locale === 'ar';
  const picker = html.match(/<div class="example-picker"[\s\S]*?<\/div>/)?.[0];
  if (!picker) throw new Error('Homepage example controls are missing');
  const t = ar ? {
    label: 'من خطوات متفرّقة إلى مسار واضح', title: 'عملك، بانسيابية أكبر.', input: 'فاتورة واردة', inputText: 'فاتورة جديدة تحتاج إلى إدخال بياناتها.', engine: 'النظام ينجز المهام المتكررة', detail: 'يربط المعلومات، ويطبّق قواعدك، ويجهّز الخطوة التالية.', result: 'جاهزة لمراجعتك', outputText: 'استُخرجت البيانات. وحُدّدت الحالات التي تحتاج مراجعة.', category: 'معالجة المستندات', control: 'يبقى القرار بيد فريقك', note: 'مثال توضيحي', replay: 'إعادة العرض', choose: 'اختر مثالًا',
  } : {
    label: 'FROM SCATTERED TASKS TO A CLEAR FLOW', title: 'Work, moving together.', input: 'INCOMING INVOICE', inputText: 'Another attachment to enter.', engine: 'The repeat work, handled.', detail: 'Connect the information. Apply your rules. Prepare the next step.', result: 'READY FOR YOUR REVIEW', outputText: 'Details extracted. Exceptions flagged.', category: 'Document processing', control: 'Your team stays in control', note: 'Illustrative workflow', replay: 'Replay', choose: 'EXPLORE A WORKFLOW',
  };
  const world = `<div class="hero-world workflow-preview" id="hero-world" aria-label="${t.note}">
    <div class="preview-heading"><span class="eyebrow">${t.label}</span><h2>${t.title}</h2></div>
    <div class="preview-controls"><span class="preview-label">${t.choose}</span>${picker}</div>
    <div class="workflow-canvas">
      <div class="workflow-node workflow-input"><span class="node-symbol" aria-hidden="true">↙</span><div><span class="ticket-label" id="input-label">${t.input}</span><p id="input-text">${t.inputText}</p></div></div>
      <div class="workflow-path" aria-hidden="true"><span></span><i></i><span></span></div>
      <div class="workflow-engine"><span class="engine-symbol" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 3v26M3 16h26M7 7l18 18M7 25 25 7"/></svg></span><div><strong>${t.engine}</strong><p>${t.detail}</p></div><span class="engine-status" aria-hidden="true">···</span></div>
      <div class="workflow-path" aria-hidden="true"><span></span><i></i><span></span></div>
      <div class="workflow-node workflow-output"><span class="node-symbol" aria-hidden="true">✓</span><div><span class="ticket-label" id="output-label">${t.result}</span><p id="output-text">${t.outputText}</p></div></div>
      <div class="workflow-human"><span aria-hidden="true">◎</span>${t.control}</div>
    </div>
    <div class="world-base"><span class="illustrative">${t.note} · <span id="hero-category">${t.category}</span></span><button id="hero-replay" aria-label="${t.replay}">${t.replay} <span aria-hidden="true">↻</span></button><span class="world-number" hidden>01 / 05</span></div>
  </div>`;
  html = html.replace(picker, '').replace(/<div class="hero-world"[\s\S]*?(?=\s*<div class="business-gains")/, world + '\n');
  // The illustration and example picker are a single self-contained panel.
  return html.replace('<body>', '<body class="design-v2"><div class="reading-progress" aria-hidden="true"></div>')
    .replace('<link rel="stylesheet" href="/homepage.css">', '<link rel="stylesheet" href="/homepage.css"><link rel="stylesheet" href="/homepage-design.css">')
    .replace('</body>', '<script src="/homepage-motion.js" defer></script></body>');
}
