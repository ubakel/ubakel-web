// src/data/work.ts
// Drives the homepage bento preview, /work (index), and /work/[slug].

export interface CaseStudy {
  slug: string;
  client: string;         // placeholder client / sector
  sector: string;
  title: string;          // one-line result
  summary: string;
  /** Bento sizing hint for the homepage grid. */
  size: 'lg' | 'md' | 'sm';
  problem: string;
  solution: string;
  architecture: string[]; // ordered pipeline stages (schematic)
  stack: string[];
  metrics: { value: string; label: string }[];
  i18n?: Partial<Record<'ar' | 'ms', {
    client: string;
    sector: string;
    title: string;
    summary: string;
    problem: string;
    solution: string;
    architecture: string[];
    metrics: { value: string; label: string }[];
  }>>;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'insurance-claims-platform',
    client: 'Private Hospital Group',
    sector: 'Healthcare insurance',
    title: 'Hospital insurance claims, closed out automatically.',
    summary:
      'An AI-powered claims platform that drafts guarantee letters, reads insurer replies, and keeps finance and leadership updated automatically — from registration to reconciliation.',
    size: 'lg',
    problem:
      'Claims processing was manual, slow, and scattered across emails and loose files. Data was siloed, statuses were unclear, and every handoff between registration, finance, and the insurer was a place errors could creep in.',
    solution:
      "A unified platform gives each team a role-specific portal, while an AI automation engine drafts and sends guarantee letters, reads the insurer's replies, extracts covered amounts, and updates the dashboard and finance team the moment there's something to act on.",
    architecture: ['Registration', 'IGL sent', 'Insurer reply read', 'Bill uploaded', 'FGL & reconciled'],
    stack: ['Custom web portals', 'Email automation', 'AI document parsing'],
    metrics: [
      { value: '2', label: 'Guarantee letters automated' },
      { value: '3', label: 'Role-specific portals' },
      { value: '0', label: 'Manual status chasing' },
    ],
    i18n: {
      ar: {
        client: 'مجموعة مستشفيات خاصة',
        sector: 'تأمين الرعاية الصحية',
        title: 'مطالبات تأمين المستشفى، تُغلق تلقائيًا.',
        summary: 'منصة مطالبات مدعومة بالذكاء الاصطناعي تصيغ خطابات الضمان، وتقرأ ردود شركة التأمين، وتُبقي فريقي المالية والإدارة على اطلاع تلقائيًا — من التسجيل حتى التسوية.',
        problem: 'كانت معالجة المطالبات يدوية وبطيئة ومبعثرة بين رسائل البريد الإلكتروني والملفات المتفرقة. كانت البيانات معزولة، والحالات غير واضحة، وكل نقطة تسليم بين التسجيل والمالية وشركة التأمين كانت موضعًا محتملًا للخطأ.',
        solution: 'توفر منصة موحّدة لكل فريق واجهة خاصة بدوره، بينما يتولى محرك أتمتة بالذكاء الاصطناعي صياغة خطابات الضمان وإرسالها، وقراءة ردود شركة التأمين، واستخراج المبالغ المغطاة، وتحديث لوحة المعلومات وإخطار فريق المالية بمجرد وجود ما يستدعي التصرف.',
        architecture: ['التسجيل', 'خطاب الضمان الأولي', 'قراءة رد التأمين', 'رفع الفاتورة', 'خطاب الضمان النهائي والتسوية'],
        metrics: [
          { value: '2', label: 'خطابا ضمان مؤتمتان' },
          { value: '3', label: 'واجهات خاصة بكل دور' },
          { value: '0', label: 'متابعة يدوية للحالة' },
        ],
      },
      ms: {
        client: 'Kumpulan Hospital Swasta',
        sector: 'Insurans penjagaan kesihatan',
        title: 'Tuntutan insurans hospital, ditutup secara automatik.',
        summary: 'Platform tuntutan berkuasa AI yang merangka surat jaminan, membaca balasan penanggung insurans, dan memaklumkan pasukan kewangan serta kepimpinan secara automatik — dari pendaftaran hingga penyelarasan.',
        problem: 'Pemprosesan tuntutan adalah manual, perlahan dan berselerak merentasi e-mel dan fail berasingan. Data terpencil, status tidak jelas, dan setiap peralihan antara pendaftaran, kewangan dan penanggung insurans adalah titik di mana ralat boleh berlaku.',
        solution: 'Platform bersepadu memberikan setiap pasukan portal khusus peranan, manakala enjin automasi AI merangka dan menghantar surat jaminan, membaca balasan penanggung insurans, mengekstrak jumlah yang dilindungi, dan mengemas kini papan pemuka serta memaklumkan pasukan kewangan sebaik sahaja terdapat sesuatu yang perlu ditindaklanjuti.',
        architecture: ['Pendaftaran', 'Surat jaminan awal', 'Balasan insurans dibaca', 'Bil dimuat naik', 'Surat jaminan akhir & penyelarasan'],
        metrics: [
          { value: '2', label: 'Surat jaminan diautomasikan' },
          { value: '3', label: 'Portal khusus peranan' },
          { value: '0', label: 'Susulan status manual' },
        ],
      },
    },
  },
  {
    slug: 'grounded-support-agent',
    client: 'SaaS Platform',
    sector: 'Customer operations',
    title: 'A grounded support agent that resolves tier-1 on its own',
    summary:
      'A retrieval-grounded agent now handles the front line, citing sources and escalating cleanly.',
    size: 'md',
    problem:
      'Support volume outpaced hiring. Answers were inconsistent and slow, and knowledge lived in scattered docs.',
    solution:
      'A retrieval-grounded agent answers from a single indexed knowledge base, acts through permissioned tools, and hands off with a full transcript.',
    architecture: ['Message in', 'Retrieve', 'Reason', 'Act / escalate', 'Resolve'],
    stack: ['OpenAI', 'Anthropic', 'Pinecone', 'n8n'],
    metrics: [
      { value: '3×', label: 'Throughput per agent' },
      { value: '<30s', label: 'First response' },
      { value: '100%', label: 'Cited answers' },
    ],
    i18n: {
      ar: {
        client: 'منصة SaaS',
        sector: 'عمليات خدمة العملاء',
        title: 'وكيل دعم موثوق يحل مشكلات المستوى الأول بمفرده',
        summary: 'أصبح وكيل يعتمد على الاسترجاع يتولى خط المواجهة الأول، مستشهدًا بمصادره ومُصعّدًا الحالات بوضوح عند الحاجة.',
        problem: 'تجاوز حجم طلبات الدعم وتيرة التوظيف. كانت الإجابات غير متسقة وبطيئة، والمعرفة مبعثرة في مستندات متفرقة.',
        solution: 'وكيل يعتمد على الاسترجاع يجيب من قاعدة معرفة واحدة مفهرسة، وينفّذ الإجراءات عبر أدوات محددة الصلاحيات، ويُسلّم الحالات مع نص كامل للمحادثة.',
        architecture: ['استلام الرسالة', 'الاسترجاع', 'الاستدلال', 'التنفيذ / التصعيد', 'الحل'],
        metrics: [
          { value: '3×', label: 'الإنتاجية لكل وكيل' },
          { value: '<30ث', label: 'أول استجابة' },
          { value: '100%', label: 'إجابات موثّقة بالمصدر' },
        ],
      },
      ms: {
        client: 'Platform SaaS',
        sector: 'Operasi Pelanggan',
        title: 'Ejen sokongan bersandarkan data yang menyelesaikan aduan tahap-1 sendiri',
        summary: 'Ejen bersandarkan capaian kini mengendalikan barisan hadapan, memetik sumber dan meningkatkan kes dengan jelas apabila perlu.',
        problem: 'Jumlah sokongan melebihi kadar pengambilan pekerja. Jawapan tidak konsisten dan lambat, dan pengetahuan tersebar dalam pelbagai dokumen.',
        solution: 'Ejen bersandarkan capaian menjawab daripada satu pangkalan pengetahuan berindeks, bertindak melalui alat berkebenaran, dan menyerah kes dengan transkrip penuh.',
        architecture: ['Mesej masuk', 'Dapatkan semula', 'Taakul', 'Bertindak / Tingkatkan', 'Selesai'],
        metrics: [
          { value: '3×', label: 'Produktiviti setiap ejen' },
          { value: '<30s', label: 'Respons pertama' },
          { value: '100%', label: 'Jawapan bersumberkan rujukan' },
        ],
      },
    },
  },
  {
    slug: 'invoice-pipeline',
    client: 'Finance Operations',
    sector: 'Accounts payable',
    title: 'Straight-through invoice processing',
    summary:
      'Invoices flow from inbox to ledger with validation and reconciliation built in.',
    size: 'md',
    problem:
      'Accounts payable manually keyed thousands of invoices a month, with errors surfacing weeks later.',
    solution:
      'A document pipeline extracts, validates, and reconciles each invoice, writing clean records and queueing only ambiguous ones.',
    architecture: ['Invoice in', 'Extract', 'Validate', 'Reconcile', 'Ledger'],
    stack: ['OpenAI', 'Docker', 'PostgreSQL'],
    metrics: [
      { value: '90%+', label: 'Straight-through' },
      { value: '10×', label: 'Faster entry' },
      { value: '↓ errors', label: 'Downstream reversals' },
    ],
    i18n: {
      ar: {
        client: 'عمليات مالية',
        sector: 'الحسابات الدائنة',
        title: 'معالجة فواتير مباشرة وكاملة',
        summary: 'تتدفق الفواتير من صندوق الوارد إلى دفتر الحسابات مع التحقق والتسوية المدمجَين.',
        problem: 'كان قسم الحسابات الدائنة يُدخل يدويًا آلاف الفواتير شهريًا، وكانت الأخطاء تظهر بعد أسابيع.',
        solution: 'خط أنابيب للمستندات يستخرج كل فاتورة ويتحقق منها ويسوّيها، ويسجّل السجلات السليمة ولا يُدرج في قائمة الانتظار سوى الحالات الغامضة.',
        architecture: ['استلام الفاتورة', 'الاستخراج', 'التحقق', 'التسوية', 'دفتر الحسابات'],
        metrics: [
          { value: '%90+', label: 'معالجة مباشرة' },
          { value: '10×', label: 'إدخال أسرع' },
          { value: '↓ الأخطاء', label: 'المرتجعات اللاحقة' },
        ],
      },
      ms: {
        client: 'Operasi Kewangan',
        sector: 'Akaun Belum Bayar',
        title: 'Pemprosesan invois langsung menyeluruh',
        summary: 'Invois mengalir dari peti masuk ke lejar dengan pengesahan dan penyesuaian terbina dalam.',
        problem: 'Akaun belum bayar memasukkan beribu-ribu invois secara manual setiap bulan, dengan ralat baru kelihatan berminggu-minggu kemudian.',
        solution: 'Saluran dokumen mengekstrak, mengesahkan dan menyesuaikan setiap invois, merekodkan entri bersih dan hanya mengantrikan item yang tidak jelas.',
        architecture: ['Invois masuk', 'Ekstrak', 'Sahkan', 'Selaraskan', 'Lejar'],
        metrics: [
          { value: '90%+', label: 'Pemprosesan langsung' },
          { value: '10×', label: 'Kemasukan lebih pantas' },
          { value: '↓ Ralat', label: 'Pembalikan susulan' },
        ],
      },
    },
  },
  {
    slug: 'pipeline-control-plane',
    client: 'Operations Team',
    sector: 'Platform',
    title: 'One control plane for every automation',
    summary:
      'Dozens of scattered workflows brought under a single observable control plane.',
    size: 'sm',
    problem:
      'Automations had sprawled across tools with no shared view, and failures went unnoticed until customers complained.',
    solution:
      'A control plane centralizes runs, retries, cost governance, and observability so operators can see and steer everything.',
    architecture: ['Trigger', 'Schedule', 'Execute', 'Observe', 'Alert'],
    stack: ['n8n', 'Docker', 'AWS'],
    metrics: [
      { value: '1', label: 'Pane of glass' },
      { value: '0', label: 'Silent failures' },
    ],
    i18n: {
      ar: {
        client: 'فريق العمليات',
        sector: 'المنصة',
        title: 'لوحة تحكم واحدة لكل عمليات الأتمتة',
        summary: 'عشرات مسارات العمل المتفرقة أصبحت تحت لوحة تحكم واحدة قابلة للمراقبة.',
        problem: 'انتشرت الأتمتة عبر أدوات متعددة دون رؤية موحدة، وكانت الأعطال تمر دون ملاحظة حتى يشتكي العملاء.',
        solution: 'لوحة تحكم مركزية تجمع عمليات التشغيل وإعادة المحاولة وحوكمة التكلفة وقابلية المراقبة، ليتمكن المشغّلون من رؤية كل شيء والتحكم به.',
        architecture: ['المشغّل', 'الجدولة', 'التنفيذ', 'المراقبة', 'التنبيه'],
        metrics: [
          { value: '1', label: 'لوحة رؤية موحّدة' },
          { value: '0', label: 'أعطال صامتة' },
        ],
      },
      ms: {
        client: 'Pasukan Operasi',
        sector: 'Platform',
        title: 'Satu satah kawalan untuk semua automasi',
        summary: 'Berpuluh-puluh aliran kerja yang berselerak kini disatukan di bawah satu satah kawalan yang boleh dipantau.',
        problem: 'Automasi berselerak merentasi pelbagai alat tanpa pandangan bersama, dan kegagalan tidak disedari sehingga pelanggan mengadu.',
        solution: 'Satah kawalan memusatkan larian, cuba semula, tadbir urus kos dan kebolehpantauan supaya pengendali dapat melihat dan mengawal semuanya.',
        architecture: ['Pencetus', 'Jadual', 'Laksana', 'Pantau', 'Amaran'],
        metrics: [
          { value: '1', label: 'Satu paparan menyeluruh' },
          { value: '0', label: 'Kegagalan senyap' },
        ],
      },
    },
  },
];

export const getCase = (slug: string) => caseStudies.find((c) => c.slug === slug);
