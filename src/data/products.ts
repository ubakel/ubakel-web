// src/data/products.ts
// Drives the /products hub and the homepage product cards.
// Interim: only real products are listed. Intelicare is a working demo, not a
// live clinic deployment, so it carries the 'Demo' status. Fluxline and
// Orchestrate were removed because they don't exist yet.

export interface WorkflowStep {
  label: string;    // node label in the workflow preview
  kind: 'source' | 'process' | 'ai' | 'output';
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: 'Live' | 'Beta' | 'Early access' | 'Demo';
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
    tagline: 'WhatsApp receptionist for clinics',
    summary:
      'A working demo of an AI receptionist for clinics on WhatsApp: it answers patient messages, checks availability, books, reschedules or cancels appointments, and hands conversations to staff when needed.',
    i18n: {
      ar: {
        tagline: 'موظف استقبال عبر واتساب للعيادات',
        summary: 'نسخة تجريبية عاملة لموظف استقبال بالذكاء الاصطناعي للعيادات عبر واتساب: يرد على رسائل المرضى، ويتحقق من المواعيد المتاحة، ويحجز المواعيد أو يعدّلها أو يلغيها، ويحوّل المحادثة إلى الموظفين عند الحاجة.',
        overview: 'يتولى Intelicare الرسائل المتكررة في مكتب الاستقبال، ويُبقي الموظفين مسؤولين عن أي حالة تحتاج إلى شخص.',
        features: [
          { title: 'إدارة المواعيد', body: 'التحقق من المواعيد المتاحة، والحجز، وإعادة الجدولة، والإلغاء.' },
          { title: 'تحويل إلى الموظفين', body: 'تُحوَّل المحادثات التي تحتاج إلى شخص إلى الموظفين مع سياقها الكامل.' },
        ],
        workflow: ['رسالة', 'تحديد المريض', 'التحقق من التوفر', 'تأكيد'],
        metrics: [],
      },
      ms: {
        tagline: 'Penyambut tetamu WhatsApp untuk klinik',
        summary: 'Demo berfungsi bagi penyambut tetamu AI untuk klinik di WhatsApp: ia menjawab mesej pesakit, menyemak kekosongan, menempah, menjadual semula atau membatalkan temujanji, dan menyerahkan perbualan kepada kakitangan apabila perlu.',
        overview: 'Intelicare mengendalikan mesej berulang di kaunter hadapan, sementara kakitangan kekal bertanggungjawab bagi apa-apa yang memerlukan seseorang.',
        features: [
          { title: 'Pengurusan temujanji', body: 'Menyemak kekosongan, menempah, menjadual semula dan membatalkan temujanji.' },
          { title: 'Serahan kepada kakitangan', body: 'Perbualan yang memerlukan seseorang diserahkan kepada kakitangan bersama konteks penuh.' },
        ],
        workflow: ['Mesej', 'Kenal pasti pesakit', 'Semak kekosongan', 'Disahkan'],
        metrics: [],
      },
    },
    status: 'Demo',
    overview:
      'Intelicare handles the repetitive messages at a clinic front desk, while staff stay in charge of anything that needs a person.',
    features: [
      { title: 'Appointment handling', body: 'Checks availability, books, reschedules and cancels appointments.' },
      { title: 'Staff handoff', body: 'Conversations that need a person are passed to staff with the full context.' },
    ],
    workflow: [
      { label: 'Message', kind: 'source' },
      { label: 'Identify patient', kind: 'process' },
      { label: 'Check availability', kind: 'ai' },
      { label: 'Confirmed', kind: 'output' },
    ],
    metrics: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
