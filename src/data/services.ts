// src/data/services.ts
// Drives both the homepage Services grid and /services/[slug].

export interface Service {
  slug: string;
  index: string;            // display index, e.g. "01"
  title: string;
  summary: string;          // short — card + hub
  overview: string;         // longer — detail hero
  capabilities: { title: string; body: string }[];
  outcomes: string[];       // bullet outcomes on the detail page
  i18n?: Partial<Record<'ar' | 'ms', {
    title: string;
    summary: string;
    overview: string;
    capabilities: { title: string; body: string }[];
    outcomes: string[];
  }>>;
}

export const services: Service[] = [
  {
    slug: 'process-automation',
    index: '01',
    title: 'Intelligent Process Automation',
    summary:
      'End-to-end orchestration that connects disparate CRMs, ERPs, and legacy systems into unified, zero-touch pipelines.',
    i18n: {
      ar: {
        title: 'أتمتة العمليات الذكية',
        summary: 'تنسيق شامل يربط أنظمة CRM وERP والأنظمة القديمة المتفرقة في مسارات عمل موحّدة بلا تدخل بشري.',
        overview: 'نرسم خريطة العملية التجارية كما تعمل فعليًا — بما في ذلك الاستثناءات التي يتعامل معها الجميع يدويًا — ثم نعيد بناءها كخط أنابيب قابل للمراقبة يُنفَّذ دون أي تسليم يدوي بين الأشخاص.',
        capabilities: [
          { title: 'تكامل الأنظمة', body: 'مزامنة ثنائية الاتجاه عبر أنظمة CRM وERP وقواعد البيانات القديمة، باستخدام موصلات آمنة عند إعادة المحاولة وغير قابلة للتكرار الخاطئ.' },
          { title: 'تنسيق الأحداث', body: 'مسارات عمل معتمدة على قوائم الانتظار في n8n وخدمات مخصّصة، تصمد أمام إعادة التشغيل وضغط الحمل الزائد.' },
          { title: 'معالجة الاستثناءات', body: 'مسارات واضحة للحالات الاستثنائية، مع تصعيد لتدخل بشري فقط حين يكون ذلك ضروريًا فعلاً.' },
          { title: 'قابلية المراقبة', body: 'كل عملية تشغيل تُتتبَّع من البداية إلى النهاية، لتتمكن من مشاهدة النظام وهو يعمل وإثبات أنه فعل ذلك.' },
        ],
        outcomes: [
          'إزالة إعادة الإدخال اليدوي، لا نقله فحسب',
          'أوقات الدورة تُقاس بالثواني، لا بالنوبات',
          'سجل تدقيق كامل لكل معاملة',
        ],
      },
      ms: {
        title: 'Automasi Proses Pintar',
        summary: 'Orkestrasi hujung-ke-hujung yang menghubungkan CRM, ERP dan sistem lama yang berasingan menjadi saluran kerja bersepadu tanpa sentuhan manual.',
        overview: 'Kami memetakan proses perniagaan sebagaimana ia sebenarnya beroperasi — termasuk pengecualian yang selalunya diuruskan secara manual — kemudian membinanya semula sebagai saluran yang boleh dipantau dan berjalan tanpa sebarang serahan tangan manusia.',
        capabilities: [
          { title: 'Integrasi sistem', body: 'Penyegerakan dwihala merentasi CRM, ERP dan pangkalan data lama menggunakan penyambung idempoten yang selamat untuk cuba semula.' },
          { title: 'Orkestrasi peristiwa', body: 'Aliran kerja tahan lasak disokong baris gilir dalam n8n dan perkhidmatan tersuai, yang bertahan melalui but semula dan tekanan beban.' },
          { title: 'Pengendalian pengecualian', body: 'Laluan jelas untuk kes-kes luar biasa, dengan peningkatan kepada campur tangan manusia hanya apabila benar-benar berbaloi.' },
          { title: 'Kebolehpantauan', body: 'Setiap proses dijejak hujung ke hujung, supaya anda dapat menyaksikan sistem berfungsi dan membuktikannya.' },
        ],
        outcomes: [
          'Kemasukan semula manual dihapuskan, bukan sekadar dipindahkan',
          'Masa kitaran diukur dalam saat, bukan syif',
          'Jejak audit lengkap untuk setiap transaksi',
        ],
      },
    },
    overview:
      'We map a business process as it truly runs — including the exceptions everyone works around — then rebuild it as an observable pipeline that executes without human hand-offs.',
    capabilities: [
      { title: 'System integration', body: 'Bidirectional sync across CRMs, ERPs, and legacy databases with idempotent, retry-safe connectors.' },
      { title: 'Event orchestration', body: 'Durable, queue-backed workflows in n8n and custom services that survive restarts and back-pressure.' },
      { title: 'Exception handling', body: 'Explicit paths for the edge cases, with human-in-the-loop escalation only where it earns its keep.' },
      { title: 'Observability', body: 'Every run traced end to end, so you can watch the system work and prove that it did.' },
    ],
    outcomes: [
      'Manual re-keying removed, not relocated',
      'Cycle times measured in seconds, not shifts',
      'A full audit trail for every transaction',
    ],
  },
  {
    slug: 'ai-agents',
    index: '02',
    title: 'Autonomous AI Agents',
    summary:
      'Cognitive agents that reason over your knowledge, retrieve securely, and execute complex operations on their own.',
    i18n: {
      ar: {
        title: 'وكلاء ذكاء اصطناعي مستقلون',
        summary: 'وكلاء معرفيون يستدلّون من بيانات مؤسستك، ويسترجعون المعلومات بأمان، وينفّذون عمليات معقدة من تلقاء أنفسهم.',
        overview: 'نُشغّل وكلاء يقومون بعمل حقيقي: يخطّطون، ويستدعون الأدوات، ويسترجعون سياقًا موثوقًا، وينفّذون — ضمن ضوابط تحافظ على أمانهم وقابليتهم للتدقيق والتزامهم بالميزانية.',
        capabilities: [
          { title: 'مستند إلى الاسترجاع', body: 'إجابات مرتكزة على بياناتك عبر البحث المتجهي، مع الاستشهاد بالمصادر وضوابط وصول صارمة.' },
          { title: 'استخدام الأدوات', body: 'وكلاء يشغّلون أنظمتك عبر أدوات محددة الصلاحيات، لا تخمينات حرة الشكل.' },
          { title: 'ضوابط الأمان', body: 'حدود للسياسات والتكلفة والسلامة مُطبَّقة على طبقة التنسيق، مع نصوص كاملة لكل عملية.' },
          { title: 'التقييم', body: 'مجموعات تقييم غير متصلة ومراقبة حية، لتكون الجودة رقمًا يمكن تتبّعه لا انطباعًا عامًا.' },
        ],
        outcomes: [
          'حل دعم المستوى الأول دون قائمة انتظار بشرية',
          'إجابات موثوقة ومُستنَدة يمكن لفريقك الوثوق بها',
          'التكلفة والجودة مرئيتان على لوحة تحكم واحدة',
        ],
      },
      ms: {
        title: 'Ejen AI Autonomi',
        summary: 'Ejen kognitif yang menaakul berdasarkan pengetahuan anda, mendapatkan semula data secara selamat, dan melaksanakan operasi kompleks dengan sendirinya.',
        overview: 'Kami melaksanakan ejen yang benar-benar berfungsi: merancang, memanggil alat, mendapatkan semula konteks bersandarkan data, dan bertindak — dalam garis pagar yang mengekalkan keselamatan, kebolehauditan, dan kawalan kos.',
        capabilities: [
          { title: 'Bersandarkan capaian', body: 'Jawapan berpandukan data anda melalui carian vektor, lengkap dengan rujukan dan kawalan akses yang ketat.' },
          { title: 'Penggunaan alat', body: 'Ejen yang mengendalikan sistem anda melalui alat berjenis dan berkebenaran — bukan tekaan bebas bentuk.' },
          { title: 'Garis pagar', body: 'Had polisi, kos dan keselamatan dikuatkuasakan pada lapisan orkestrasi, lengkap dengan transkrip penuh.' },
          { title: 'Penilaian', body: 'Suite penilaian luar talian dan pemantauan langsung, supaya kualiti menjadi angka yang boleh dijejak, bukan sekadar rasa.' },
        ],
        outcomes: [
          'Sokongan tahap-1 diselesaikan tanpa barisan gilir manusia',
          'Jawapan bersandarkan data dan bersumberkan rujukan yang boleh dipercayai pasukan anda',
          'Kos dan kualiti kelihatan pada satu papan pemuka',
        ],
      },
    },
    overview:
      'We deploy agents that do real work: they plan, call tools, retrieve grounded context, and act — inside guardrails that keep them safe, auditable, and on budget.',
    capabilities: [
      { title: 'Retrieval-grounded', body: 'Answers anchored to your data via vector search, with citations and strict access controls.' },
      { title: 'Tool use', body: 'Agents that operate your systems through typed, permissioned tools — not free-form guesses.' },
      { title: 'Guardrails', body: 'Policy, cost, and safety limits enforced at the orchestration layer, with full transcripts.' },
      { title: 'Evaluation', body: 'Offline eval suites and live monitoring so quality is a number you can track, not a vibe.' },
    ],
    outcomes: [
      'Tier-1 support resolved without a human queue',
      'Grounded, cited answers your team can trust',
      'Cost and quality visible on a single dashboard',
    ],
  },
  {
    slug: 'document-processing',
    index: '03',
    title: 'Intelligent Document Processing',
    summary:
      'Turn unstructured invoices, contracts, and forms into structured data synced straight to your core systems.',
    i18n: {
      ar: {
        title: 'معالجة ذكية للمستندات',
        summary: 'نحوّل الفواتير والعقود والنماذج غير المنظّمة إلى بيانات مهيكلة تُزامَن مباشرة مع أنظمتك الأساسية.',
        overview: 'تصل المستندات في حالة من الفوضى. نحوّلها إلى سجلات مصنّفة — عبر الاستخراج والتحقق وتسوية البيانات بدرجات ثقة، مع مسار مراجعة بشرية واضح لما تبقّى.',
        capabilities: [
          { title: 'الاستخراج', body: 'تحليل واعٍ بالتخطيط لملفات PDF والمسحات الضوئية ومرفقات البريد الإلكتروني وتحويلها إلى حقول مهيكلة.' },
          { title: 'التحقق', body: 'فحوصات قواعد العمل وعتبات الثقة التي توجّه العناصر منخفضة اليقين إلى المراجعة.' },
          { title: 'التسوية', body: 'مطابقة بنود الفواتير مع أوامر الشراء ودفاتر الحسابات والبيانات الرئيسية قبل تسجيل أي شيء.' },
          { title: 'المزامنة', body: 'سجلات نظيفة تُرسَل إلى نظام ERP أو قاعدة البيانات لديك بمجرد اجتيازها للتحقق.' },
        ],
        outcomes: [
          'تحرير فرق إدخال البيانات للتفرغ لأعمال تتطلب حكمًا بشريًا',
          'معالجة مباشرة كاملة للمستندات السليمة',
          'أخطاء ومرتجعات لاحقة أقل',
        ],
      },
      ms: {
        title: 'Pemprosesan Dokumen Pintar',
        summary: 'Menukar invois, kontrak dan borang tidak berstruktur kepada data berstruktur yang disegerakkan terus ke sistem teras anda.',
        overview: 'Dokumen tiba dalam keadaan huru-hara. Kami menukarnya menjadi rekod berstruktur — mengekstrak, mengesahkan dan menyesuaikan data dengan skor keyakinan, dan laluan semakan manusia yang jelas untuk selebihnya.',
        capabilities: [
          { title: 'Pengekstrakan', body: 'Penghuraian sedar-susun-atur bagi PDF, imbasan dan lampiran e-mel menjadi medan berstruktur.' },
          { title: 'Pengesahan', body: 'Semakan peraturan perniagaan dan ambang keyakinan yang menghalakan item bertahap keyakinan rendah untuk disemak.' },
          { title: 'Penyesuaian', body: 'Pemadanan item baris dengan PO, lejar dan data induk sebelum apa-apa direkodkan.' },
          { title: 'Segerak', body: 'Rekod bersih dihantar ke ERP atau pangkalan data anda sebaik sahaja lulus pengesahan.' },
        ],
        outcomes: [
          'Pasukan kemasukan data dibebaskan untuk kerja yang memerlukan pertimbangan',
          'Pemprosesan langsung menyeluruh untuk dokumen yang bersih',
          'Ralat dan pembalikan susulan yang lebih sedikit',
        ],
      },
    },
    overview:
      'Documents arrive as chaos. We turn them into typed records — extracting, validating, and reconciling data with confidence scores and a clean human-review lane for the rest.',
    capabilities: [
      { title: 'Extraction', body: 'Layout-aware parsing of PDFs, scans, and email attachments into structured fields.' },
      { title: 'Validation', body: 'Business-rule checks and confidence thresholds that route low-certainty items to review.' },
      { title: 'Reconciliation', body: 'Line-item matching against POs, ledgers, and master data before anything is written.' },
      { title: 'Sync', body: 'Clean records pushed to your ERP or database the moment they clear validation.' },
    ],
    outcomes: [
      'Data entry teams freed for judgement work',
      'Straight-through processing for clean documents',
      'Fewer downstream errors and reversals',
    ],
  },
  {
    slug: 'enterprise-infrastructure',
    index: '04',
    title: 'Custom Enterprise Infrastructure',
    summary:
      'Bespoke, self-reconciling backends. Secure, containerized systems engineered around your exact bottlenecks.',
    i18n: {
      ar: {
        title: 'بنية تحتية مؤسسية مخصّصة',
        summary: 'أنظمة خلفية مصمّمة خصيصًا وتُصحّح نفسها تلقائيًا. أنظمة آمنة ومُحوسبة داخل حاويات، مبنية حول اختناقاتك الفعلية بدقة.',
        overview: 'حين تتوقف الحلول الجاهزة عن مناسبتك، نصمم البنية الخلفية التي تحتاجها فعلاً — محوسبة داخل حاويات، مؤمَّنة، مزوّدة بأدوات مراقبة وموثّقة، ليتمكن فريقك من امتلاكها بعد التسليم.',
        capabilities: [
          { title: 'البنية المعمارية', body: 'نماذج خدمات وبيانات مصمّمة خصيصًا لحجم الحمل لديك، لا وفق قالب عام.' },
          { title: 'الأمان', body: 'وصول بأقل الصلاحيات، وإدارة للأسرار، وتشفير أثناء النقل وفي حالة التخزين.' },
          { title: 'النشر', body: 'إصدارات محوسبة وقابلة لإعادة الإنتاج، مع تكامل ونشر مستمرَّين وبنية تحتية مُعرَّفة بالكود.' },
          { title: 'التسليم', body: 'أدلة تشغيل ولوحات معلومات وتوثيق كامل، ليصبح النظام مِلكًا لك تشغّله بنفسك.' },
        ],
        outcomes: [
          'بنية تحتية تناسب المشكلة تمامًا',
          'قابلة لإعادة الإنتاج وللمراقبة وآمنة بشكل افتراضي',
          'تسليم نظيف يستطيع فريقك صيانته',
        ],
      },
      ms: {
        title: 'Infrastruktur Perusahaan Tersuai',
        summary: 'Backend tersuai yang menyelaras sendiri. Sistem selamat dan dikontainerkan, direkayasa khusus untuk kesesakan sebenar operasi anda.',
        overview: 'Apabila penyelesaian sedia ada tidak lagi sesuai, kami merekayasa backend yang benar-benar anda perlukan — dikontainerkan, diamankan, diinstrumentasi dan didokumentasikan, supaya pasukan anda dapat memilikinya selepas serah terima.',
        capabilities: [
          { title: 'Seni bina', body: 'Model perkhidmatan dan data direka untuk profil beban anda, bukan templat generik.' },
          { title: 'Keselamatan', body: 'Akses keistimewaan minimum, pengurusan rahsia, dan penyulitan semasa transit dan simpanan.' },
          { title: 'Penggunaan', body: 'Binaan dikontainerkan dan boleh dihasilkan semula, dengan CI/CD dan infrastruktur sebagai kod.' },
          { title: 'Serah terima', body: 'Buku panduan operasi, papan pemuka dan dokumentasi supaya sistem itu menjadi milik anda untuk dikendalikan.' },
        ],
        outcomes: [
          'Infrastruktur yang sesuai tepat dengan masalahnya',
          'Boleh dihasilkan semula, boleh dipantau, dan selamat secara lalai',
          'Serah terima yang bersih dan boleh diselenggara oleh pasukan anda',
        ],
      },
    },
    overview:
      'When off-the-shelf stops fitting, we engineer the backend you actually need — containerized, secured, instrumented, and documented so your team can own it after we hand it over.',
    capabilities: [
      { title: 'Architecture', body: 'Service and data models designed for your load profile, not a generic template.' },
      { title: 'Security', body: 'Least-privilege access, secrets management, and encryption in transit and at rest.' },
      { title: 'Deployment', body: 'Containerized, reproducible builds with CI/CD and infrastructure as code.' },
      { title: 'Handover', body: 'Runbooks, dashboards, and documentation so the system is yours to operate.' },
    ],
    outcomes: [
      'Infrastructure that fits the problem exactly',
      'Reproducible, observable, and secure by default',
      'A clean handover your team can maintain',
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
