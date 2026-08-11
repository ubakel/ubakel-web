// src/data/products.ts
// Drives /products (hub) and /products/[slug] (detail template).

export interface WorkflowStep {
  label: string;    // node label in the live workflow preview
  kind: 'source' | 'process' | 'ai' | 'output';
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: 'Live' | 'Beta' | 'Early access';
  overview: string;
  features: { title: string; body: string }[];
  workflow: WorkflowStep[];   // rendered by <PipelineDiagram />
  metrics: { value: string; label: string }[];
  i18n?: Partial<Record<'ar' | 'ms', {
    tagline: string;
    summary: string;
    overview: string;
    features: { title: string; body: string }[];
    workflow: string[];
    metrics: string[];
  }>>;
}

export const products: Product[] = [
  {
    slug: 'intelicare',
    name: 'UBAKEL Intelicare',
    tagline: 'Autonomous care operations',
    summary:
      'An agentic operations layer that triages, routes, and resolves service requests around the clock — grounded in your own knowledge base.',
    i18n: {
      ar: {
        tagline: 'عمليات رعاية مستقلة',
        summary: 'طبقة تشغيل وكيلة تُصنّف طلبات الخدمة وتوجّهها وتحلّها على مدار الساعة، بالاستناد إلى قاعدة معرفتك الخاصة.',
        overview: 'يعمل Intelicare أمام عملية الخدمة لديك ويتولى الجزء الوسيط المتكرر: يفهم الطلب، ويسترجع السياق الصحيح، ويتخذ الإجراء الآمن، ولا يُصعّد إلا ما يحتاج فعلاً إلى شخص.',
        features: [
          { title: 'تصنيف مرتكز على البيانات', body: 'يُصنّف كل طلب وارد ويُرتّب أولويته وفق سياساتك وسجلك التاريخي.' },
          { title: 'حل مستقل', body: 'يُنجز الإجراءات الروتينية عبر أدوات محددة الصلاحيات، من البداية إلى النهاية.' },
          { title: 'تصعيد بشري', body: 'يُسلّم الحالات المعقدة مع نص كامل وواضح للمحادثة واقتراح للخطوة التالية.' },
          { title: 'تحليلات مباشرة', body: 'معدل الحل ونسبة التحويل والتكلفة تُتابَع باستمرار على لوحة واحدة.' },
        ],
        workflow: ['طلب وارد', 'تصنيف', 'استرجاع السياق', 'تنفيذ / حل', 'تم الحل'],
        metrics: ['تغطية بلا قائمة انتظار', 'الوسيط لأول إجراء', 'الإنتاجية لكل وكيل'],
      },
      ms: {
        tagline: 'Operasi penjagaan autonomi',
        summary: 'Lapisan operasi bersifat ejen yang menilai, mengarah dan menyelesaikan permintaan perkhidmatan sepanjang masa — bersandarkan pangkalan pengetahuan anda sendiri.',
        overview: 'Intelicare beroperasi di hadapan operasi perkhidmatan anda dan mengendalikan bahagian tengah yang berulang: ia memahami permintaan, mendapatkan semula konteks yang betul, mengambil tindakan yang selamat, dan hanya meningkatkan kes yang benar-benar memerlukan seseorang.',
        features: [
          { title: 'Triaj bersandarkan data', body: 'Mengklasifikasikan dan mengutamakan setiap permintaan masuk berdasarkan polisi dan sejarah anda.' },
          { title: 'Penyelesaian autonomi', body: 'Menyelesaikan tindakan rutin melalui alat berkebenaran, hujung ke hujung.' },
          { title: 'Peningkatan kepada manusia', body: 'Menyerahkan kes kompleks dengan transkrip penuh yang mudah dibaca dan cadangan langkah seterusnya.' },
          { title: 'Analitis langsung', body: 'Kadar penyelesaian, pemesongan dan kos dijejak secara berterusan pada satu papan.' },
        ],
        workflow: ['Permintaan masuk', 'Triaj', 'Dapatkan semula konteks', 'Bertindak / Selesaikan', 'Selesai'],
        metrics: ['Liputan, tiada baris gilir', 'Median tindakan pertama', 'Produktiviti setiap ejen'],
      },
    },
    status: 'Live',
    overview:
      'Intelicare sits in front of your service operation and handles the repetitive middle: it understands the request, retrieves the right context, takes the safe action, and escalates only what genuinely needs a person.',
    features: [
      { title: 'Grounded triage', body: 'Classifies and prioritises every incoming request against your policies and history.' },
      { title: 'Autonomous resolution', body: 'Completes routine actions through permissioned tools, end to end.' },
      { title: 'Human escalation', body: 'Hands off complex cases with a full, readable transcript and suggested next step.' },
      { title: 'Live analytics', body: 'Resolution rate, deflection, and cost tracked continuously on one board.' },
    ],
    workflow: [
      { label: 'Request in', kind: 'source' },
      { label: 'Triage', kind: 'process' },
      { label: 'Retrieve context', kind: 'ai' },
      { label: 'Act / resolve', kind: 'process' },
      { label: 'Resolved', kind: 'output' },
    ],
    metrics: [
      { value: '24/7', label: 'Coverage, no queue' },
      { value: '<30s', label: 'Median first action' },
      { value: '3×', label: 'Throughput per agent' },
    ],
  },
  {
    slug: 'fluxline',
    name: 'UBAKEL Fluxline',
    tagline: 'Zero-touch document pipeline',
    summary:
      'Drop documents in one end; structured, validated, reconciled records come out the other — synced straight to your systems.',
    i18n: {
      ar: {
        tagline: 'خط مستندات بلا تدخل بشري',
        summary: 'أدخل المستندات من طرف؛ وتخرج من الطرف الآخر سجلات مهيكلة ومُتحقَّق منها ومُسوّاة — تُزامَن مباشرة مع أنظمتك.',
        overview: 'يحوّل Fluxline المستندات الواردة إلى بيانات موثوقة. يستخرج البيانات، ويتحقق منها وفق قواعد عملك، ويسوّيها مقابل السجلات المصدرية، ويكتب صفوفًا نظيفة — ولا يُشير إلا إلى الحالات الغامضة للمراجعة.',
        features: [
          { title: 'أي صيغة مدخلة', body: 'تحليل ملفات PDF والمسحات الضوئية ومرفقات البريد الإلكتروني بوعي كامل بالتخطيط.' },
          { title: 'محرك القواعد', body: 'منطق التحقق الخاص بك يُطبَّق قبل كتابة أي سجل واحد.' },
          { title: 'التسوية', body: 'مطابقة تلقائية مع أوامر الشراء ودفاتر الحسابات والبيانات الرئيسية.' },
          { title: 'مسار المراجعة', body: 'قائمة انتظار نظيفة للنسبة القليلة من العناصر التي تحتاج إلى مراجعة بشرية.' },
        ],
        workflow: ['مستند وارد', 'استخراج', 'تحقق', 'تسوية', 'سجل مُزامَن'],
        metrics: ['معدل المعالجة المباشرة', 'أسرع من الإدخال اليدوي', 'استخراجات قابلة للتدقيق'],
      },
      ms: {
        tagline: 'Saluran dokumen tanpa sentuhan',
        summary: 'Masukkan dokumen di satu hujung; rekod berstruktur, disahkan dan diselaraskan keluar di hujung satu lagi — disegerakkan terus ke sistem anda.',
        overview: 'Fluxline menukar dokumen masuk kepada data yang boleh dipercayai. Ia mengekstrak, mengesahkan mengikut peraturan perniagaan anda, menyesuaikan dengan rekod sumber, dan menulis baris data yang bersih — hanya menandakan yang tidak jelas untuk disemak.',
        features: [
          { title: 'Sebarang format', body: 'PDF, imbasan dan lampiran e-mel dihurai dengan kesedaran susun atur.' },
          { title: 'Enjin peraturan', body: 'Logik pengesahan anda dikuatkuasakan sebelum mana-mana rekod ditulis.' },
          { title: 'Penyesuaian', body: 'Pemadanan automatik dengan PO, lejar dan data induk.' },
          { title: 'Laluan semakan', body: 'Baris gilir bersih untuk sebahagian kecil item yang memerlukan semakan manusia.' },
        ],
        workflow: ['Dokumen masuk', 'Ekstrak', 'Sahkan', 'Selaraskan', 'Rekod disegerak'],
        metrics: ['Kadar pemprosesan langsung', 'Lebih pantas daripada kemasukan manual', 'Pengekstrakan boleh diaudit'],
      },
    },
    status: 'Beta',
    overview:
      'Fluxline turns inbound documents into trustworthy data. It extracts, validates against your business rules, reconciles against source records, and writes clean rows — flagging only the ambiguous ones for review.',
    features: [
      { title: 'Any format in', body: 'PDFs, scans, and email attachments parsed with layout awareness.' },
      { title: 'Rules engine', body: 'Your validation logic enforced before a single record is written.' },
      { title: 'Reconciliation', body: 'Automatic matching against POs, ledgers, and master data.' },
      { title: 'Review lane', body: 'A clean queue for the small share of items that need a human.' },
    ],
    workflow: [
      { label: 'Document in', kind: 'source' },
      { label: 'Extract', kind: 'ai' },
      { label: 'Validate', kind: 'process' },
      { label: 'Reconcile', kind: 'process' },
      { label: 'Record synced', kind: 'output' },
    ],
    metrics: [
      { value: '90%+', label: 'Straight-through rate' },
      { value: '10×', label: 'Faster than manual entry' },
      { value: '100%', label: 'Auditable extractions' },
    ],
  },
  {
    slug: 'orchestrate',
    name: 'UBAKEL Orchestrate',
    tagline: 'The pipeline control plane',
    summary:
      'A control plane for your automations: run, observe, retry, and govern every workflow from one place.',
    i18n: {
      ar: {
        tagline: 'لوحة تحكم خطوط الأنابيب',
        summary: 'لوحة تحكم لعمليات الأتمتة لديك: شغّل، راقب، أعد المحاولة، واحكم كل مسار عمل من مكان واحد.',
        overview: 'Orchestrate هو المكان الذي تعيش فيه خطوط الأنابيب لديك بمجرد أن تصبح فعلية. يمنح المشغّلين رؤية موحدة لكل عملية تشغيل، وإعادة محاولة معتمدة، وحوكمة للتكلفة والمعدل، وقابلية مراقبة تحوّل الأتمتة من صندوق أسود إلى أداة قياس.',
        features: [
          { title: 'لوحة تحكم واحدة', body: 'كل مسار عمل وبيئة وعملية تشغيل مرئية في مكان واحد.' },
          { title: 'تنفيذ معتمد', body: 'عمليات تشغيل مدعومة بقوائم انتظار تصمد أمام إعادة التشغيل، مع إعادة محاولة تلقائية آمنة.' },
          { title: 'الحوكمة', body: 'حدود قصوى للتكلفة، وحدود للمعدل، وسياسة وصول مُطبَّقة مركزيًا.' },
          { title: 'مراقبة عميقة', body: 'تتبّعات وسجلات ومقاييس لكل عملية تشغيل — مع تنبيه عند انحراف أي خط أنابيب.' },
        ],
        workflow: ['المشغّل', 'الجدولة', 'التنفيذ', 'المراقبة', 'التقرير'],
        metrics: ['لوحة رؤية موحّدة', 'هدف موثوقية التشغيل', 'أعطال صامتة'],
      },
      ms: {
        tagline: 'Satah kawalan saluran automasi',
        summary: 'Satah kawalan untuk automasi anda: jalankan, pantau, cuba semula dan tadbir setiap aliran kerja dari satu tempat.',
        overview: 'Orchestrate adalah tempat saluran anda beroperasi sebaik sahaja ia menjadi nyata. Ia memberikan pengendali satu pandangan bagi setiap larian, cuba semula yang tahan lasak, tadbir urus kos dan kadar, serta kebolehpantauan yang mengubah automasi daripada kotak hitam kepada instrumen.',
        features: [
          { title: 'Satu satah kawalan', body: 'Setiap aliran kerja, persekitaran dan larian kelihatan di satu tempat.' },
          { title: 'Pelaksanaan tahan lasak', body: 'Larian disokong baris gilir yang bertahan melalui but semula, dengan cuba semula automatik yang selamat.' },
          { title: 'Tadbir urus', body: 'Siling kos, had kadar dan polisi akses dikuatkuasakan secara berpusat.' },
          { title: 'Kebolehpantauan mendalam', body: 'Jejak, log dan metrik bagi setiap larian — memberi amaran apabila saluran menyimpang.' },
        ],
        workflow: ['Pencetus', 'Jadual', 'Laksana', 'Pantau', 'Laporan'],
        metrics: ['Satu paparan menyeluruh', 'Sasaran ketahanan larian', 'Kegagalan senyap'],
      },
    },
    status: 'Early access',
    overview:
      'Orchestrate is where your pipelines live once they’re real. It gives operators a single view of every run, durable retries, cost and rate governance, and the observability that turns automation from a black box into an instrument.',
    features: [
      { title: 'One control plane', body: 'Every workflow, environment, and run visible in a single place.' },
      { title: 'Durable execution', body: 'Queue-backed runs that survive restarts, with safe automatic retries.' },
      { title: 'Governance', body: 'Cost ceilings, rate limits, and access policy enforced centrally.' },
      { title: 'Deep observability', body: 'Traces, logs, and metrics per run — alerting when a pipeline drifts.' },
    ],
    workflow: [
      { label: 'Trigger', kind: 'source' },
      { label: 'Schedule', kind: 'process' },
      { label: 'Execute', kind: 'process' },
      { label: 'Observe', kind: 'ai' },
      { label: 'Report', kind: 'output' },
    ],
    metrics: [
      { value: '1', label: 'Pane of glass' },
      { value: '99.9%', label: 'Run durability target' },
      { value: '0', label: 'Silent failures' },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
