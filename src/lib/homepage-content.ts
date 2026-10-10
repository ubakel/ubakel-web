type Locale = 'en' | 'ar';

// Benefits describe the intended value of a workflow, not measured client results.
const content = {
  en: {
    headline: 'Less busywork.<br>More time for<br><span>your business.</span>',
    description: 'We build custom automations, AI assistants and connections between your tools—so your team can prepare reports sooner, reduce repeated data entry and keep work moving.',
    audience: 'For businesses with work that repeats, tools that don’t connect, or a process that needs a better way.',
    gainsLabel: 'WHAT THIS MEANS FOR YOUR BUSINESS',
    gains: [
      ['Time back for your team', 'Spend less of the working week collecting, copying and chasing information.'],
      ['Less avoidable rework', 'Check missing or duplicate information before it becomes someone else’s problem.'],
      ['Clearer follow-through', 'Give each request a next step and a responsible person, with fewer manual handoffs.'],
    ],
    benefit: 'Business benefit', measure: 'What to measure',
    operationsBenefit: 'Less time chasing updates. Fewer requests left waiting between people and tools.',
    operationsMeasure: 'Time from approval to action · overdue requests',
    solarBenefit: 'Less manual report preparation, with missing information brought to the reviewer’s attention.',
    clinicBenefit: 'Less repetitive booking admin, with a clear route for staff to take over.',
    benefitNote: 'Intended benefit; no measured savings are claimed here.',
    illustration: 'Illustration of the client workflow',
    videoGuide: 'Watch for: an enquiry → availability check → booking confirmation → a route to staff. Clinic names in the video belong to the demonstration setup.',
    supportLabel: 'OWN THE SYSTEM. KEEP THE SUPPORT.',
    supportTitle: 'Your automation.<br><span>Support that stays.</span>',
    supportIntro: 'You may need a working system and regular follow-up, rather than a full-time AI team. UBAKEL builds the system and offers monthly retainers to maintain and adapt it as your business changes.',
    support: [
      ['You own the system', 'The automation system we build for your business belongs to you. Discuss account access and handover as part of the scope.'],
      ['Two weeks to test it', 'Your team gets two weeks to test real scenarios and identify adjustments, with a longer testing period where the project needs it.'],
      ['Recommended monthly support', 'Optional retainers for maintenance, configuration and future needs within an agreed scope. We recommend ongoing support as the default; you can opt out at any time and keep ownership of your system.'],
    ],
    beforeTitle: 'Before you commit,<br><span>know what comes next.</span>',
    beforeIntro: 'Start with one real process. Understand what is feasible, then discuss a manageable first scope.',
    next: [
      ['Describe the problem', 'A few sentences about what repeats, gets stuck or needs copying are enough. Include the tools you use.'],
      ['Discuss the fit', 'We review your request and get in touch to discuss the workflow, constraints and next step.'],
      ['Define a useful result', 'Choose what matters: staff time, turnaround, rework or missed follow-ups. Use it to evaluate a first scope.'],
    ],
    questions: [
      ['Can you help with a problem that isn’t listed?', 'Yes. The examples are starting points. We build custom automations, AI assistants and internal tools around your actual process. You don’t need to know which technology it needs.'],
      ['Will this work with our existing tools?', 'Tell us which tools you use and where information moves between them. The right approach depends on available connections, permissions and the quality of the data. These constraints belong in the initial discussion.'],
      ['What affects cost and delivery time?', 'The number of steps and systems, data quality, approval rules and testing all affect the scope. A useful first conversation is about one workflow. Before starting a build, clarify the project price, delivery milestones and any software or usage charges.'],
      ['Who owns the system, and what happens after delivery?', 'Your business owns the automation system we build for it. Your team gets two weeks to test it, or longer depending on the project. Monthly support is recommended by default, but optional. You can opt out at any time; the system remains yours. Agree the support coverage, account access and handover details in the project scope.'],
      ['What is the free initial workflow review?', 'It starts with your enquiry, followed by a discussion of one process and whether automation could help. This form requests a review; it does not reserve a meeting time. No technical brief is needed.'],
    ],
    faqLabel: 'A PRACTICAL FIRST STEP',
  },
  ar: {
    headline: 'مهام متكررة أقل.<br>ووقت أكثر<br><span>لتطوير عملك.</span>',
    description: 'نبني حلول أتمتة ومساعدين بالذكاء الاصطناعي، ونربط أدواتك الحالية؛ ليُعدّ فريقك التقارير أسرع، ويقلّل تكرار إدخال البيانات، وينجز العمل دون متابعة يدوية لكل خطوة.',
    audience: 'للشركات التي تواجه مهام متكررة، أو أدوات غير مترابطة، أو إجراءات تحتاج إلى طريقة أفضل.',
    gainsLabel: 'ما الفائدة لعملك؟',
    gains: [
      ['وقت يستفيد منه فريقك', 'وقت أقل في جمع المعلومات ونسخها ومتابعتها، ووقت أكثر لإنجاز العمل.'],
      ['عمل أقل لإصلاح الأخطاء', 'تحقّق من المعلومات الناقصة أو المكررة قبل انتقالها إلى الخطوة التالية.'],
      ['متابعة أوضح للطلبات', 'خطوة تالية ومسؤول واضح لكل طلب، مع تقليل النقل اليدوي بين الأشخاص والأدوات.'],
    ],
    benefit: 'الفائدة لعملك', measure: 'كيف تقيس التحسّن؟',
    operationsBenefit: 'وقت أقل في متابعة التحديثات، وطلبات أقل تنتظر بين الأشخاص والأدوات.',
    operationsMeasure: 'الوقت من الاعتماد إلى التنفيذ · الطلبات المتأخرة',
    solarBenefit: 'عمل يدوي أقل لإعداد التقرير، مع إظهار المعلومات الناقصة للمراجع.',
    clinicBenefit: 'مهام حجز متكررة أقل، مع إمكانية إحالة المحادثة إلى موظف عند الحاجة.',
    benefitNote: 'هذه فائدة مستهدفة، وليست نتيجة مقاسة لهذا المشروع.',
    illustration: 'رسم توضيحي لسير عمل المشروع',
    videoGuide: 'تابع الخطوات: استفسار ← التحقق من الموعد ← تأكيد الحجز ← إمكانية التواصل مع موظف. أسماء العيادات في الفيديو جزء من إعداد العرض التجريبي.',
    supportLabel: 'الحل ملكك. والدعم يستمر.',
    supportTitle: 'نظام أتمتة تملكه.<br><span>ودعم يواكب عملك.</span>',
    supportIntro: 'قد تحتاج إلى نظام يعمل ومتابعة منتظمة، بدلًا من توظيف فريق ذكاء اصطناعي بدوام كامل. نبني النظام، ونوفّر خطط دعم شهرية لصيانته وتعديله مع تغيّر احتياجات عملك.',
    support: [
      ['النظام ملك لشركتك', 'نظام الأتمتة الذي نبنيه لعملك ملك لك. ناقش صلاحيات الحسابات وتفاصيل تسليم الحل ضمن نطاق المشروع.'],
      ['أسبوعان لاختبار الحل', 'يختبر فريقك سيناريوهات العمل الفعلية ويحدّد التعديلات خلال أسبوعين، مع تمديد فترة الاختبار إذا احتاج المشروع إلى ذلك.'],
      ['دعم شهري نوصي به', 'خطط اختيارية للصيانة وتعديل الإعدادات والاحتياجات المستقبلية ضمن نطاق متفق عليه. نوصي بالدعم المستمر من البداية، ويمكنك إيقافه في أي وقت مع بقاء النظام ملكًا لك.'],
    ],
    beforeTitle: 'قبل أن تبدأ،<br><span>اعرف الخطوة التالية.</span>',
    beforeIntro: 'ابدأ بإجراء فعلي واحد. افهم ما يمكن تنفيذه، ثم ناقش نطاقًا أوليًا يناسب احتياجك.',
    next: [
      ['اشرح المشكلة', 'تكفي بضع جمل عمّا يتكرر أو يتعطّل أو يحتاج إلى نسخ يدوي. اذكر الأدوات التي تستخدمها.'],
      ['ناقش مدى ملاءمة الحل', 'نراجع طلبك ونتواصل معك لمناقشة الإجراء والقيود والخطوة التالية.'],
      ['حدّد نتيجة مفيدة', 'اختر ما يهمك: وقت الفريق، أو سرعة الإنجاز، أو إعادة العمل، أو المتابعات الفائتة. قيّم النطاق الأولي على هذا الأساس.'],
    ],
    questions: [
      ['هل تساعدوننا إذا كانت مشكلتنا مختلفة عن الأمثلة؟', 'نعم. الأمثلة نقاط بداية فقط. نبني حلول أتمتة ومساعدين بالذكاء الاصطناعي وأدوات داخلية حسب إجراءاتك الفعلية. لا تحتاج إلى تحديد التقنية المناسبة بنفسك.'],
      ['هل يمكن ربط الأدوات التي نستخدمها حاليًا؟', 'اذكر أدواتك وكيف تنتقل المعلومات بينها. يعتمد الحل المناسب على إمكانات الربط والصلاحيات وجودة البيانات. نناقش هذه القيود في البداية.'],
      ['ما الذي يحدّد التكلفة ومدة التنفيذ؟', 'يتأثر النطاق بعدد الخطوات والأنظمة وجودة البيانات وقواعد الاعتماد والاختبارات المطلوبة. ابدأ بمناقشة إجراء واحد. وقبل التنفيذ، وضّح سعر المشروع ومراحل التسليم وأي رسوم للبرامج أو الاستخدام.'],
      ['من يملك النظام؟ وماذا يحدث بعد التسليم؟', 'تملك شركتك نظام الأتمتة الذي نبنيه لها. يختبر فريقك الحل خلال أسبوعين أو أكثر حسب المشروع. نوصي بالدعم الشهري من البداية، لكنه اختياري. يمكنك إيقافه في أي وقت، ويبقى النظام ملكًا لك. حدّد تغطية الدعم وصلاحيات الحسابات وتفاصيل تسليم الحل ضمن نطاق المشروع.'],
      ['ما المقصود بالمراجعة الأولية المجانية؟', 'تبدأ بطلبك، ثم مناقشة إجراء واحد ومدى استفادته من الأتمتة. هذا النموذج لطلب المراجعة، ولا يحجز موعد اجتماع. لا تحتاج إلى وصف تقني مفصّل.'],
    ],
    faqLabel: 'خطوة أولى واضحة',
  },
};

export function enhanceHomepage(source: string, locale: Locale) {
  const c = content[locale];
  const ar = locale === 'ar';
  let html = source
    .replace(/(<h1 id="hero-title">)[\s\S]*?(<\/h1>)/, `$1${c.headline}$2`)
    .replace(/(<p class="hero-description">)[\s\S]*?(<\/p>)/, `$1${c.description}$2`)
    .replace(/(<p class="hero-note">)[\s\S]*?(<\/p>)/, `$1${ar ? 'ابدأ بمراجعة أولية مجانية لإجراء واحد.' : 'Start with a free initial review of one workflow.'}$2`)
    .replace(/<\/div>\s*<div class="hero-world"/, `<p class="hero-audience">${c.audience}</p></div>\n    <div class="hero-world"`);

  // Selectors precede the artwork in DOM order as well as on mobile.
  const picker = html.match(/    <div class="example-picker"[\s\S]*?<\/div>/)?.[0];
  if (!picker) throw new Error(`Missing example picker for ${locale}`);
  html = html.replace(picker, '').replace('    <div class="hero-world"', `${picker}\n    <div class="hero-world"`);
  const gains = `<div class="business-gains" aria-labelledby="gains-title"><p class="eyebrow" id="gains-title">${c.gainsLabel}</p><div class="gains-grid">${c.gains.map(([title, body], i) => `<article><span class="gain-number" aria-hidden="true">0${i + 1}</span><div><h2>${title}</h2><p>${body}</p></div></article>`).join('')}</div></div>`;
  html = html.replace('    </section>', `${gains}\n    </section>`);

  html = html.replace('<p id="department-outcome">', `<div><span class="outcome-label">${c.benefit}</span><p id="department-outcome">`)
    .replace(/(<p id="department-outcome">)[\s\S]*?(<\/p>)/, `$1${c.operationsBenefit}$2`);
  html = html.replace(/(<p id="department-outcome">[\s\S]*?<\/p>)/, `$1<p class="outcome-measure"><span>${c.measure}</span><span id="department-measure">${c.operationsMeasure}</span></p></div>`);
  const projectBenefit = (text: string) => `<div class="project-benefit"><span class="outcome-label">${c.benefit}</span><p>${text}</p><small>${c.benefitNote}</small></div>`;
  html = html.replace('<details><summary>', `${projectBenefit(c.solarBenefit)}<details><summary>`);
  const clinicStart = html.indexOf('<div class="project-art clinic-art">');
  html = html.slice(0, clinicStart) + html.slice(clinicStart).replace('<details><summary>', `${projectBenefit(c.clinicBenefit)}<details><summary>`);
  html = html.replace('<div class="project-copy">', `<div class="project-copy"><p class="art-caption">${c.illustration}</p>`)
    .replace(/(<video id="demo-video"[\s\S]*?<\/video>)/, `$1<p class="demo-guide">${c.videoGuide}</p>`);

  const next = `<section class="buying-guide" id="first-step" aria-labelledby="first-step-title"><div class="guide-heading"><div><span class="eyebrow">${c.faqLabel}</span><h2 id="first-step-title">${c.beforeTitle}</h2></div><p>${c.beforeIntro}</p></div><ol class="next-steps">${c.next.map(([title, body], i) => `<li><span class="step-number" aria-hidden="true">0${i + 1}</span><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol><div class="buying-questions">${c.questions.map(([question, answer]) => `<details><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join('')}</div></section>`;
  const support = `<section class="support-model" aria-labelledby="support-title"><div class="support-heading"><div><span class="eyebrow">${c.supportLabel}</span><h2 id="support-title">${c.supportTitle}</h2></div><p>${c.supportIntro}</p></div><div class="support-grid">${c.support.map(([title, body], i) => `<article><span class="support-mark" aria-hidden="true">${['✓', '◎', '↻'][i]}</span><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>`;
  html = html.replace('  <section class="closing"', `${support}\n${next}\n  <section class="closing"`);

  const edits: [string, string][] = ar ? [
    ['ابدأ الحديث معنا', 'اطلب مراجعة مجانية'],
    ['اكتشف ما يمكنك أتمتته', 'اطلب مراجعة مجانية'],
    ['اكتشف الإمكانات', 'شاهد كيف يستفيد عملك'],
    ['الفريق نفسه.<br><span>وتنسيق أقل بين الأدوات.</span>', 'الفريق نفسه.<br><span>ووقت أقل في النسخ والمتابعة.</span>'],
    ['وكلاء ومساعدون بالذكاء الاصطناعي', 'مساعدون بالذكاء الاصطناعي'],
    ['لا تجد مثالًا يشبه طريقة عملك؟', 'مشكلتك مختلفة؟ لنبدأ منها.'],
    ['هذه نقاط بداية فقط. نبني أيضًا حلول أتمتة ووكلاء وأدوات داخلية للمهام التي تخص عملك وحده.', 'أخبرنا بما تريد تحسينه والأدوات التي تستخدمها. نبني أيضًا حلولًا مخصّصة لإجراءاتك، ونبدأ بتحديد نتيجة مفيدة لعملك.'],
  ] : [
    ['Find what you can automate', 'Request a free workflow review'],
    ['Book a free initial workflow audit', 'Request a free workflow review'],
    ['Start a conversation', 'Request a free review'],
    ['Explore the possibilities', 'See the business benefits'],
    ['Your workflow doesn’t fit a category?', 'Different problem? Start there.'],
    ['These are starting points. We also build custom automations, agents and internal tools for the work unique to your business.', 'Tell us what needs to improve and which tools you use. We also build custom solutions for the work unique to your business, starting with a useful result.'],
  ];
  for (const [before, after] of edits) html = html.replaceAll(before, after);
  return html;
}
