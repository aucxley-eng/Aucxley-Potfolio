export const classes = [
  { id: 1, grade: 'Grade 3', stream: 'A', teacher: 'Jane Wanjiru' },
  { id: 2, grade: 'Grade 4', stream: 'A', teacher: 'David Kiptoo' },
  { id: 3, grade: 'Grade 4', stream: 'B', teacher: 'Grace Achieng' },
  { id: 4, grade: 'Grade 5', stream: 'A', teacher: 'Samuel Mwangi' },
  { id: 5, grade: 'Grade 6', stream: 'A', teacher: 'Faith Njeri' },
  { id: 6, grade: 'Grade 6', stream: 'B', teacher: 'Brian Otieno' },
  { id: 7, grade: 'Grade 7', stream: 'A', teacher: 'Lucy Chemutai' },
  { id: 8, grade: 'Grade 8', stream: 'A', teacher: 'Peter Kariuki' },
];

export const students = [
  { id: 1, admission: 'S-2023-0421', name: 'Amani Ochieng', className: 'Grade 4-A', guardian: 'Mary Ochieng', guardPhone: '+254 712 345 678', curriculum: 'CBC', uli: 'ULI-2026-000142', outstanding: 12000, gifted: false, orphan: false, specialNeeds: false },
  { id: 2, admission: 'S-2023-0487', name: 'Zawadi Njeri', className: 'Grade 4-A', guardian: 'Peter Njeri', guardPhone: '+254 721 556 890', curriculum: 'CBC', uli: 'ULI-2026-000143', outstanding: 0, gifted: true, orphan: false, specialNeeds: false },
  { id: 3, admission: 'S-2022-0310', name: 'Baraka Wafula', className: 'Grade 8-A', guardian: 'Elias Wafula', guardPhone: '+254 733 908 112', curriculum: '8-4-4', uli: 'ULI-2026-000199', outstanding: 0, gifted: false, orphan: false, specialNeeds: false },
  { id: 4, admission: 'S-2024-0761', name: 'Nasir Ali', className: 'Grade 5-A', guardian: 'Halima Ali', guardPhone: '+254 740 221 445', curriculum: 'CBC', uli: 'ULI-2026-000217', outstanding: 10000, gifted: false, orphan: false, specialNeeds: false },
  { id: 5, admission: 'S-2024-0812', name: 'Wanjiru Mwangi', className: 'Grade 3-A', guardian: 'Grace Mwangi', guardPhone: '+254 703 884 901', curriculum: 'CBC', uli: 'ULI-2026-000240', outstanding: 3000, gifted: false, orphan: true, specialNeeds: false },
  { id: 6, admission: 'S-2023-0518', name: 'Brian Odhiambo', className: 'Grade 4-A', guardian: 'Rose Odhiambo', guardPhone: '+254 757 332 118', curriculum: 'CBC', uli: 'ULI-2026-000179', outstanding: 6000, gifted: false, orphan: false, specialNeeds: true },
  { id: 7, admission: 'S-2022-0654', name: 'Cynthia Chebet', className: 'Grade 7-A', guardian: 'Ronald Chebet', guardPhone: '+254 726 450 233', curriculum: 'CBC', uli: 'ULI-2026-000185', outstanding: 0, gifted: true, orphan: false, specialNeeds: false },
  { id: 8, admission: 'S-2023-0590', name: 'Dennis Kiprop', className: 'Grade 6-A', guardian: 'Kiptoo Kiprop', guardPhone: '+254 769 700 654', curriculum: 'CBC', uli: 'ULI-2026-000205', outstanding: 8000, gifted: false, orphan: false, specialNeeds: false },
];

export const roleWorkspaces = {
  head: 'School summaries and exceptions',
  admissions: 'Applications and learner records',
  bursar: 'Balances and unmatched payments',
  teacher: 'Assigned classes and lessons',
  transport: "Today's trips",
  attendant: 'Current passenger list',
  kitchen: 'Meal requirements',
  storekeeper: 'Stock movements',
  parent: 'Linked children',
};

export const headQuestions = [
  {
    q: 'Which registers are incomplete?',
    detail: 'Grade 6-B and Grade 7-A registers are not yet reviewed today. Absence SMS only leaves after review + the 10:00 cutoff.',
    count: 2,
    tone: 'warn',
    metric: '6 of 8 classes reviewed',
  },
  {
    q: 'Which payments need matching?',
    detail: 'KES 500 sits in Suspense — account S-2024-0999 matches no learner. Provider callback verified, payer unknown.',
    count: 1,
    tone: 'warn',
    metric: '98.4% auto-matched',
  },
  {
    q: 'Which trip has an unresolved passenger?',
    detail: 'Amani Ochieng boarded bus KBY 118C but no handover was recorded after drop-off. A vehicle location does not prove an authorised handover.',
    count: 1,
    tone: 'bad',
    metric: '3 of 46 handovers pending',
  },
  {
    q: 'Which reports await approval?',
    detail: 'Term 3 CBC report template submitted by Grade 4-A staff. Rubric version needs the head teacher\'s review before publish.',
    count: 1,
    tone: 'ok',
    metric: '1 awaiting approval',
  },
];

export const applications = [
  { no: 'APP-2026-0119', name: 'Imani Muthoni', dob: '2018-04-12', grade: 'Grade 3', guardian: 'Cynthia Muthoni', phone: '+254 701 223 445', stage: 'Documents', uli: 'pending' },
  { no: 'APP-2026-0120', name: 'Khalid Hassan', dob: '2017-09-30', grade: 'Grade 4', guardian: 'Salim Hassan', phone: '+254 733 118 902', stage: 'Guardian verification', uli: 'pending' },
  { no: 'APP-2026-0121', name: 'Achieng Okoth', dob: '2018-11-05', grade: 'Grade 3', guardian: 'Dan Okoth', phone: '+254 724 990 331', stage: 'KEMIS check', uli: 'ULI-2026-000301' },
];

export const guardianLinks = [
  { learner: 'Zawadi Njeri', admission: 'S-2023-0487', guardian: 'Peter Njeri', relationship: 'Father', phone: '+254 721 556 890', view: true, pay: true, collect: false, verified: true },
  { learner: 'Zawadi Njeri', admission: 'S-2023-0487', guardian: 'Mercy Njeri', relationship: 'Mother', phone: '+254 740 802 118', view: true, pay: false, collect: true, verified: true },
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', guardian: 'Mary Ochieng', relationship: 'Mother', phone: '+254 712 345 678', view: true, pay: true, collect: false, verified: true },
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', guardian: 'Tom Ochieng', relationship: 'Uncle', phone: '+254 790 118 445', view: false, pay: false, collect: false, verified: false },
];

export const enrolmentHistory = [
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', academicYear: '2024', term: 'T1', class: 'Grade 2-A', status: 'Completed' },
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', academicYear: '2024', term: 'T2', class: 'Grade 2-A', status: 'Completed' },
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', academicYear: '2025', term: 'T1', class: 'Grade 3-A', status: 'Completed' },
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', academicYear: '2026', term: 'T2', class: 'Grade 3-A', status: 'Completed' },
  { learner: 'Amani Ochieng', admission: 'S-2023-0421', academicYear: '2026', term: 'T3', class: 'Grade 4-A', status: 'Active' },
];

export const competencies = [
  { code: 'CC', name: 'Communication & Collaboration' },
  { code: 'CT', name: 'Critical Thinking & Problem Solving' },
  { code: 'IC', name: 'Imagination & Creativity' },
  { code: 'CI', name: 'Citizenship' },
  { code: 'DL', name: 'Digital Literacy' },
  { code: 'SE', name: 'Self-Efficacy' },
  { code: 'LL', name: 'Learning to Learn' },
];

export const rubricLevels = [
  { level: 4, name: 'Exceeding Expectations', mark: 'E' },
  { level: 3, name: 'Meeting Expectations', mark: 'M' },
  { level: 2, name: 'Approaching Expectations', mark: 'A' },
  { level: 1, name: 'Below Expectations', mark: 'B' },
];

export const cbcAssessments = {
  1: [
    { code: 'CC', level: 3, narrative: 'Confident in group work. No longer needs prompting to share ideas.' },
    { code: 'CT', level: 3, narrative: 'Solves word problems methodically with minimal help.' },
    { code: 'IC', level: 2, narrative: 'Attempts creative tasks but relies on familiar patterns.' },
    { code: 'CI', level: 4, narrative: 'Volunteers for class leadership roles; strong sense of fairness.' },
    { code: 'DL', level: 3, narrative: 'Uses the school tablet safely for research tasks.' },
    { code: 'SE', level: 2, narrative: 'Often needs reminders to complete homework on time.' },
    { code: 'LL', level: 3, narrative: 'Reflects on feedback and applies it in next attempts.' },
  ],
  2: [
    { code: 'CC', level: 4, narrative: 'Leads discussions confidently and involves quieter peers.' },
    { code: 'CT', level: 3, narrative: 'Asks strong follow-up questions during investigations.' },
    { code: 'IC', level: 4, narrative: 'Builds original models and experiments with new media.' },
    { code: 'CI', level: 3, narrative: 'Takes part in community clean-up activities every term.' },
    { code: 'DL', level: 4, narrative: 'Teaches classmates how to use new apps.' },
    { code: 'SE', level: 3, narrative: 'Plans weekly tasks and sticks to deadlines.' },
    { code: 'LL', level: 3, narrative: 'Uses a learning journal to track progress.' },
  ],
  4: [
    { code: 'CC', level: 2, narrative: 'Shares ideas when asked; needs support speaking up in groups.' },
    { code: 'CT', level: 2, narrative: 'Attempts problems but sometimes guesses instead of testing ideas.' },
    { code: 'IC', level: 3, narrative: 'Enjoys drawing and building; gaining confidence to share work.' },
    { code: 'CI', level: 2, narrative: 'Learns school routines; needs reminders about community roles.' },
    { code: 'DL', level: 2, narrative: 'Uses devices for games; building guided research skills.' },
    { code: 'SE', level: 2, narrative: 'Finishes tasks with encouragement and short check-ins.' },
    { code: 'LL', level: 3, narrative: 'Improves when feedback is repeated and positive.' },
  ],
  6: [
    { code: 'CC', level: 2, narrative: 'Shares ideas when asked; needs support speaking up in groups.' },
    { code: 'CT', level: 3, narrative: 'Works through problems step by step with encouragement.' },
    { code: 'IC', level: 2, narrative: 'Prefers following examples over inventing new approaches.' },
    { code: 'CI', level: 3, narrative: 'Respects school rules and is considerate of others.' },
    { code: 'DL', level: 3, narrative: 'Comfortable with typing and guided internet searches.' },
    { code: 'SE', level: 2, narrative: 'Needs a checklist to stay organized across subjects.' },
    { code: 'LL', level: 3, narrative: 'Benefits from clear, repeated instructions.' },
  ],
};

export const observationLog = [
  { learner: 'Amani Ochieng', competency: 'CC', observations: 6, lastEvidence: 'Group debate — video evidence', date: '16 Sep 2026', tone: 'ok' },
  { learner: 'Amani Ochieng', competency: 'SE', observations: 3, lastEvidence: 'Homework journal — photo', date: '18 Sep 2026', tone: 'warn' },
  { learner: 'Zawadi Njeri', competency: 'DL', observations: 5, lastEvidence: 'Coding challenge — artefact', date: '15 Sep 2026', tone: 'ok' },
  { learner: 'Brian Odhiambo', competency: 'CT', observations: 2, lastEvidence: '— pending', date: '—', tone: 'neut' },
];

export const attendance = {
  today: [
    { id: 1, name: 'Amani Ochieng', admission: 'S-2023-0421', status: 'present' },
    { id: 2, name: 'Zawadi Njeri', admission: 'S-2023-0487', status: 'present' },
    { id: 6, name: 'Brian Odhiambo', admission: 'S-2023-0518', status: 'late' },
    { id: 7, name: 'Cynthia Chebet', admission: 'S-2022-0654', status: 'present' },
    { id: 8, name: 'Dennis Kiprop', admission: 'S-2023-0590', status: 'absent' },
  ],
  monthly: [
    { month: 'Apr', rate: 94 }, { month: 'May', rate: 91 }, { month: 'Jun', rate: 96 },
    { month: 'Jul', rate: 89 }, { month: 'Aug', rate: 93 }, { month: 'Sep', rate: 95 },
  ],
  registers: [
    { class: 'Grade 3-A', teacher: 'Jane Wanjiru', reviewed: true, submitted: '09:05', absences: 1, sms: 'Sent 10:02' },
    { class: 'Grade 4-A', teacher: 'David Kiptoo', reviewed: true, submitted: '08:52', absences: 1, sms: 'Sent 10:02' },
    { class: 'Grade 4-B', teacher: 'Grace Achieng', reviewed: false, submitted: '—', absences: '—', sms: 'Waiting — cutoff 10:00' },
    { class: 'Grade 6-B', teacher: 'Brian Otieno', reviewed: false, submitted: '—', absences: '—', sms: 'Waiting — cutoff 10:00' },
    { class: 'Grade 7-A', teacher: 'Lucy Chemutai', reviewed: false, submitted: '—', absences: '—', sms: 'Waiting — cutoff 10:00' },
  ],
};

export const feeBreakdown = [
  { category: 'Tuition', paid: 95000, pending: 23500, overdue: 12400 },
  { category: 'Transport', paid: 32000, pending: 9800, overdue: 5400 },
  { category: 'Canteen', paid: 18400, pending: 4200, overdue: 3100 },
  { category: 'Examination', paid: 12600, pending: 2300, overdue: 0 },
  { category: 'Uniform', paid: 8600, pending: 1500, overdue: 900 },
];

export const feeCategories = [
  { name: 'Tuition', amount: 15000 },
  { name: 'Transport', amount: 4500 },
  { name: 'Canteen', amount: 2500 },
  { name: 'Examination', amount: 3000 },
  { name: 'Uniform', amount: 2000 },
];

export const feeAging = [
  { bucket: 'Current (0–30 days)', amount: 38400, tone: 'ok', learners: 41 },
  { bucket: '31–60 days', amount: 17200, tone: 'warn', learners: 18 },
  { bucket: '61–90 days', amount: 8600, tone: 'warn', learners: 7 },
  { bucket: '90+ days', amount: 4100, tone: 'bad', learners: 3 },
];

export const capitation = {
  term: 'Term 1, 2026',
  perPupilRate: 4200,
  enrollmentCount: 360,
  allocated: 1512000,
  received: 1134000,
  receivedDate: '12 Jan 2026',
  expectedNext: '10 Apr 2026',
  spentOn: 'Utilities, teaching materials, feeding top-up',
};

export const invoice = {
  no: 'INV-2026-0314',
  learner: 'Amani Ochieng',
  admission: 'S-2023-0421',
  total: 22000,
  status: 'Partially paid',
  lines: [
    { category: 'Tuition', amount: 15000 },
    { category: 'Transport', amount: 4000 },
    { category: 'Meals', amount: 3000 },
  ],
  paid: 10000,
  remaining: 12000,
};

export const allocations = [
  { ref: 'SDJ7HJ2KQ8', date: 'Today 08:14', learner: 'Amani Ochieng', amount: 10000, toInvoice: 'INV-2026-0314', note: '10,000 of 22,000 applied — 12,000 remains' },
  { ref: 'SD93JNV2LP', date: 'Today 08:15', learner: 'Amani Ochieng', amount: 10000, toInvoice: 'INV-2026-0311', note: 'Sibling allocation — covers Nasir Ali\'s fees' },
  { ref: 'SDK2KL9M01', date: 'Yesterday 17:42', learner: 'Zawadi Njeri', amount: 6000, toInvoice: 'INV-2026-0310', note: 'Full settlement' },
];

export const journalEntries = [
  { no: 'JRN-2026-0501', ref: 'REC-2026-0012', dr: 'Bank / M-Pesa', drAmount: 10000, cr: 'Fees receivable', crAmount: 10000, date: 'Today', status: 'Posted' },
  { no: 'JRN-2026-0500', ref: 'REC-2026-0011', dr: 'Bank / M-Pesa', drAmount: 6000, cr: 'Fees receivable', crAmount: 6000, date: 'Today', status: 'Posted' },
  { no: 'JRN-2026-0498', ref: 'REC-2026-0009', dr: 'Bank / M-Pesa', drAmount: 10000, cr: 'Fees receivable', crAmount: 10000, date: 'Yesterday', status: 'Reversed (duplicate callback)' },
];

export const financeActions = [
  { text: 'Unmatched C2B of KES 500 — account S-2024-0999 matches no learner. Confirm with the payer before receipting.', kind: 'warn', cta: 'Review' },
  { text: 'Waiver request KES 4,000 for Wanjiru Mwangi (orphan) awaiting bursar approval.', kind: 'warn', cta: 'Approve' },
  { text: 'Credit note KES 2,000 created for Brian Odhiambo — overpayment on meals subscription.', kind: 'ok', cta: 'Post' },
  { text: 'Reconciliation ran at 08:00 — 1 disputed M-Pesa reference identified against settlement.', kind: 'neut', cta: 'View' },
];

export const mpesaTransactions = [
  { time: 'Today 08:14', admission: 'S-2023-0421', name: 'Amani Ochieng', amount: 10000, sign: '+', ref: 'SDJ7HJ2KQ8', type: 'C2B', status: 'Success' },
  { time: 'Today 08:15', admission: 'S-2023-0421', name: 'Amani Ochieng', amount: 10000, sign: '+', ref: 'SD93JNV2LP', type: 'C2B', status: 'Success' },
  { time: 'Today 07:52', admission: 'S-2022-0654', name: 'Cynthia Chebet', amount: 6000, sign: '+', ref: 'SDK2KL9M01', type: 'C2B', status: 'Success' },
  { time: 'Yesterday 12:03', admission: 'S-2024-0761', name: 'Nasir Ali', amount: 10000, sign: '+', ref: 'SD8KMFT77P', type: 'C2B', status: 'Success' },
  { time: 'Yesterday 09:21', admission: 'S-2024-0812', name: 'Wanjiru Mwangi', amount: 3000, sign: '+', ref: 'SD77PLK9W0', type: 'STK Push', status: 'Success' },
  { time: '2 days ago', admission: 'S-2024-0999', name: 'Unmatched — Suspense', amount: 500, sign: '+', ref: 'SD5NVB1M2F', type: 'C2B', status: 'Needs review' },
  { time: '3 days ago', admission: 'S-2022-0310', name: 'Baraka Wafula', amount: 10000, sign: '-', ref: 'SD3QZX8C4D', type: 'Reversal', status: 'Reversed' },
];

export const receipts = [
  { no: 'REC-2026-0012', name: 'Amani Ochieng', amount: 10000, method: 'M-Pesa (Paybill 522533)', date: 'Today' },
  { no: 'REC-2026-0011', name: 'Zawadi Njeri', amount: 10000, method: 'M-Pesa (Paybill 522533)', date: 'Today' },
  { no: 'REC-2026-0010', name: 'Cynthia Chebet', amount: 6000, method: 'M-Pesa (Paybill 522533)', date: 'Today' },
  { no: 'REC-2026-0009', name: 'Nasir Ali', amount: 10000, method: 'M-Pesa (Paybill 522533)', date: 'Yesterday' },
  { no: 'REC-2026-0008', name: 'Wanjiru Mwangi', amount: 3000, method: 'M-Pesa (Paybill 522533)', date: 'Yesterday' },
];

export const smsTemplates = [
  { name: 'Attendance alert', body: '{student_name} was marked absent on {date} after the register review. Kindly contact the office. - SchoolHub Academy', lastUsed: 'Today 10:02' },
  { name: 'Payment confirmation', body: 'Payment of KES {amount} received for {student_name}. Ref: {transaction_id}. - SchoolHub Academy', lastUsed: 'Today 08:16' },
  { name: 'Fee reminder', body: 'Dear {parent_name}, {student_name} balance is KES {amount}. Pay via M-Pesa paybill 522533. - SchoolHub Academy', lastUsed: 'Yesterday 17:00' },
  { name: 'Term results', body: '{student_name} results for {term}: {competency_summary}. Full report available. - SchoolHub Academy', lastUsed: '18 Sep 2026' },
  { name: 'School news / event', body: 'Announcement: {message}. - SchoolHub Academy', lastUsed: '14 Sep 2026' },
];

export const smsLogs = [
  { time: 'Today 10:02', recipient: '+254 721 556 890', message: 'Dennis Kiprop was marked absent on 19 Sep 2026 after register review. Contact the office.', status: 'Delivered' },
  { time: 'Today 09:11', recipient: '+254 769 700 654', message: 'Brian Odhiambo was marked absent on 19 Sep 2026. Contact the office.', status: 'Delivered' },
  { time: 'Today 08:16', recipient: '+254 712 345 678', message: 'Payment of KES 10000 received for Amani Ochieng. Ref: SDJ7HJ2KQ8', status: 'Delivered' },
  { time: 'Tomorrow 08:00', recipient: '+254 740 221 445', message: 'Dear Halima Ali, Nasir Ali balance is KES 10000. Pay via M-Pesa paybill 522533.', status: 'Pending' },
  { time: 'Yesterday 16:20', recipient: '+254 769 700 654', message: 'Cynthia Chebet results for Term 3: 4 competencies at Meeting. View online.', status: 'Failed' },
];

export const reportData = {
  reportCards: 342,
  columns: [
    { name: 'Communication & Collaboration', score: 'Level 4 - Exceeding', pct: 92 },
    { name: 'Critical Thinking & Problem Solving', score: 'Level 3 - Meeting', pct: 76 },
    { name: 'Imagination & Creativity', score: 'Level 3 - Meeting', pct: 70 },
    { name: 'Citizenship', score: 'Level 4 - Exceeding', pct: 95 },
    { name: 'Digital Literacy', score: 'Level 3 - Meeting', pct: 80 },
    { name: 'Self-Efficacy', score: 'Level 3 - Meeting', pct: 66 },
    { name: 'Learning to Learn', score: 'Level 3 - Meeting', pct: 74 },
  ],
  distribution: [
    { label: 'Lv 4', value: 84 },
    { label: 'Lv 3', value: 164 },
    { label: 'Lv 2', value: 72 },
    { label: 'Lv 1', value: 22 },
  ],
  approvals: [
    { doc: 'Term 3 CBC report template', class: 'Grade 4-A', submitted: '18 Sep 2026', by: 'David Kiptoo', status: 'Awaiting approval' },
    { doc: 'KEMIS draft export', class: 'Whole school', submitted: '17 Sep 2026', by: 'Admissions office', status: 'Approved' },
    { doc: 'Term 2 competency overview', class: 'Grade 6-B', submitted: '15 Sep 2026', by: 'Brian Otieno', status: 'Returned for edit' },
  ],
};

export const kemis = {
  readiness: 97,
  errors: 2,
  fields: [
    { name: 'ULI numbers captured', pct: 98 },
    { name: 'Birth certificates', pct: 92 },
    { name: 'County / ward codes', pct: 99 },
    { name: 'Class & section assigned', pct: 100 },
    { name: 'Special needs flagged', pct: 99 },
  ],
  issues: [
    { msg: 'Dennis Kiprop (S-2023-0590) is missing a birth certificate number.', ref: 'learner record · ULI-2026-000205' },
    { msg: 'Amani Ochieng (S-2023-0421) has an invalid county ward code.', ref: 'learner record · ULI-2026-000142' },
  ],
};

export const routes = [
  { name: 'R1 — Kasarani Loop', stops: ['Kasarani', 'Roysambu', 'Thome', 'Mirema'], serviceDays: 'Mon–Fri', vehicle: 'KBX 043D', capacity: 14 },
  { name: 'R2 — Baba Dogo', stops: ['Baba Dogo', 'Kariobangi', 'Donholm'], serviceDays: 'Mon–Fri', vehicle: 'KBY 118C', capacity: 14 },
  { name: 'R3 — Ruaraka', stops: ['Ruaraka', 'Githurai', 'Kahawa'], serviceDays: 'Mon–Fri', vehicle: 'KBX 071E', capacity: 16 },
];

export const todayTrips = [
  { route: 'R1 — Kasarani Loop', direction: 'Morning', bus: 'KBX 043D', driver: 'Joseph Mwangi', attendant: 'Ann Wambui', capacity: 14, boarded: 13, phase: 'Completed', handovers: '13 / 13', attention: null, status: 'ok' },
  { route: 'R2 — Baba Dogo', direction: 'Morning', bus: 'KBY 118C', driver: 'Peter Otieno', attendant: 'Grace Achieng', capacity: 14, boarded: 12, phase: 'Alighting', handovers: '9 / 12', attention: '3 handovers pending', status: 'warn' },
  { route: 'R3 — Ruaraka', direction: 'Morning', bus: 'KBX 071E', driver: 'Samuel Kariuki', attendant: 'Faith Njeri', capacity: 16, boarded: 15, phase: 'Boarding', handovers: '0 / 15', attention: 'Boarding in progress', status: 'warn' },
  { route: 'R1 — Kasarani Loop', direction: 'Afternoon', bus: 'KBX 043D', driver: 'Joseph Mwangi', attendant: 'Ann Wambui', capacity: 14, boarded: 0, phase: 'Planned', handovers: '—', attention: 'Starts 15:20 · service days Mon–Fri', status: 'neut' },
];

export const manifestPassengers = [
  { name: 'Amani Ochieng', admission: 'S-2023-0421', stop: 'Roysambu', pickup: 'Kasarani', board: true, alight: true, handover: false, collector: 'Not yet recorded' },
  { name: 'Zawadi Njeri', admission: 'S-2023-0487', stop: 'Mirema', pickup: 'Kariobangi', board: true, alight: true, handover: true, collector: 'Mercy Njeri (mother) · ID · 08:07' },
  { name: 'Brian Odhiambo', admission: 'S-2023-0518', stop: 'Kariobangi', pickup: 'Baba Dogo', board: true, alight: false, handover: false, collector: 'Not yet recorded' },
  { name: 'Cynthia Chebet', admission: 'S-2022-0654', stop: 'Donholm', pickup: 'Kariobangi', board: true, alight: true, handover: true, collector: 'Ronald Chebet (father) · ID · 08:11' },
  { name: 'Dennis Kiprop', admission: 'S-2023-0590', stop: 'Githurai', pickup: 'Ruaraka', board: false, alight: false, handover: false, collector: 'Not yet recorded' },
];

export const incidents = [
  { time: 'Today 07:52', route: 'R2 — Baba Dogo', type: 'Delay', detail: 'Morning trip left 12 min late — brake inspection before dispatch.', status: 'Resolved', owner: 'Transport coordinator' },
  { time: 'Today 07:58', route: 'R3 — Ruaraka', type: 'Failed handover', detail: 'Dennis Kiprop alighted unaccompanied at Githurai — guardian not present.', status: 'In investigation', owner: 'Attendant · Grace Achieng' },
  { time: 'Yesterday 15:31', route: 'R1 — Kasarani Loop', type: 'Wrong stop', detail: 'Learner boarded at Mirema instead of Roysambu; guard contacted immediately.', status: 'Resolved', owner: 'Attendant · Ann Wambui' },
];

export const meals = {
  pipeline: { subscription: 96, forecast: 88, prepared: 88, served: 85, leftOver: 3, shortage: 0 },
  today: [
    { item: 'Githeri with vegetables', prepared: 88, served: 85, leftOver: 2, dietary: 0 },
    { item: 'Porridge (breakfast)', prepared: 90, served: 88, leftOver: 1, dietary: 0 },
  ],
  notes: [
    { note: '6 new meal subscriptions added this morning — forecast updated 09:10 by kitchen.', tone: 'ok' },
    { note: 'Attendance still pending for 3 classes — kitchen uses the 09:00 cutoff estimate (88 portions).', tone: 'warn' },
    { note: 'Dietary flags (2 nut allergies) are visible to kitchen staff only — never on reports.', tone: 'neut' },
  ],
};

export const stock = {
  pipeline: [
    { no: 'PR-2026-115', item: 'Exercise books (pack of 10)', qty: 200, by: 'Storekeeper', stage: 'Submitted', status: 'ok' },
    { no: 'PR-2026-116', item: 'School uniforms (shirt + shorts)', qty: 40, by: 'Storekeeper', stage: 'Approved', status: 'ok' },
    { no: 'PO-2026-082', item: 'Githeri ingredients (maize + beans)', qty: 150, by: 'Kitchen', stage: 'Purchase order issued', status: 'warn' },
    { no: 'GRN-2026-041', item: 'Cement (compound path)', qty: 10, by: 'Bursar', stage: 'Goods received', status: 'warn' },
    { no: 'ISS-2026-203', item: 'Exercise books', qty: 80, by: 'Grade 4-A teacher', stage: 'Issued to class', status: 'ok' },
  ],
  items: [
    { item: 'Exercise books', unit: 'pack', reorderLevel: 20, available: 65, status: 'ok' },
    { item: 'Pencils', unit: 'piece', reorderLevel: 100, available: 140, status: 'ok' },
    { item: 'School uniforms', unit: 'set', reorderLevel: 25, available: 14, status: 'warn' },
    { item: 'Cement', unit: 'bag', reorderLevel: 8, available: 6, status: 'warn' },
    { item: 'Maize (githeri)', unit: 'kg', reorderLevel: 60, available: 58, status: 'warn' },
    { item: 'Beans', unit: 'kg', reorderLevel: 30, available: 44, status: 'ok' },
  ],
  counts: [
    { item: 'Exercise books', counted: 65, system: 65, variance: 0, owner: 'Storekeeper' },
    { item: 'Cement', counted: 5, system: 6, variance: -1, owner: 'Storekeeper' },
  ],
};

export const teacherView = {
  name: 'David Kiptoo', role: 'Grade 4 Class Teacher', load: 82,
  classes: [
    { grade: 'Grade 4', stream: 'A', subject: 'Mathematics', avg: 3.4, done: true, pending: 0 },
    { grade: 'Grade 4', stream: 'B', subject: 'Mathematics', avg: 3.1, done: false, pending: 4 },
    { grade: 'Grade 4', stream: 'A', subject: 'Science & Technology', avg: 3.3, done: true, pending: 0 },
  ],
  reminders: [
    { text: '4 CBC observations still outstanding for Grade 4-B Mathematics.', when: 'Due tomorrow', tone: 'warn' },
    { text: 'Submit Term 3 draft KEMIS class data by Friday.', when: 'Due 22 Sep', tone: 'warn' },
    { text: 'Register reviewed for Grade 4-A — absence SMS queued for 10:02.', when: 'Done today', tone: 'ok' },
    { text: 'Parent meeting for Nasir Ali attendance scheduled.', when: 'Thu 15:30', tone: 'ok' },
  ],
};

export const notifications = [
  { text: 'Payment of KES 10,000 verified for Amani Ochieng — allocated, receipted, journal posted.', time: 'Today 08:16', tone: 'ok' },
  { text: 'SMS delivered - Attendance alert to 3 guardians after register review', time: 'Today 10:03', tone: 'ok' },
  { text: 'M-Pesa transaction unmatched - acct S-2024-0999 moved to Suspense', time: '2 days ago', tone: 'warn' },
  { text: 'Failed handover flagged on R3 - Dennis Kiprop, guardian not at Githurai stop', time: 'Today 07:58', tone: 'bad' },
  { text: 'Stock count variance -1 bag cement found during monthly physical count', time: 'Yesterday 16:40', tone: 'warn' },
  { text: 'KEMIS draft export generated - 2 validation errors to fix', time: '2 days ago', tone: 'warn' },
];

export const stats = { students: 360, teachers: 14, attendanceRate: 94.2, feesCollected: 166600 };

export const portalChild = {
  name: 'Amani Ochieng', class: 'Grade 4-A', attendancePct: 92,
  guardian: 'Mary Ochieng', relationship: 'Mother',
  permissions: {
    view: true,
    pay: true,
    collect: false,
    note: 'Collection recorded for Mercy Njeri, not this account. Paying fees does not authorise collection.',
  },
  balance: 12000,
  invoice: 22000,
  nextDue: '30 Nov 2026',
  competencies: [
    { code: 'CC', name: 'Communication & Collaboration', score: 3 },
    { code: 'CT', name: 'Critical Thinking & Problem Solving', score: 3 },
    { code: 'IC', name: 'Imagination & Creativity', score: 2 },
    { code: 'CI', name: 'Citizenship', score: 4 },
    { code: 'DL', name: 'Digital Literacy', score: 3 },
    { code: 'SE', name: 'Self-Efficacy', score: 2 },
    { code: 'LL', name: 'Learning to Learn', score: 3 },
  ],
  activity: [
    { text: 'Handover for this morning\'s trip still not recorded — contact the office if you awaited Amani.', date: 'Today 08:20', tone: 'warn' },
    { text: 'Amani boarded the morning trip (R2) at Kasarani.', date: 'Today 07:03', tone: 'ok' },
    { text: 'Payment of KES 10,000 received — receipt REC-2026-0012 issued.', date: 'Today 08:16', tone: 'ok' },
    { text: 'Science project received level 3 (Meeting) with teacher evidence.', date: '16 Sep 2026', tone: 'ok' },
    { text: 'Term 2 report card published.', date: '8 Dec 2026', tone: 'ok' },
  ],
};