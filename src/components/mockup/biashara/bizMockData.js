export const bizSummary = {
  cash: 184500,
  mpesa: 326200,
  bank: 512300,
  receivables: 75250,
  todaySales: 54300,
  todayExpenses: 12800,
  monthRevenue: 1440000,
  monthExpenses: 942000,
  monthProfit: 342000,
  ownerDrawMonth: 118000,
  ownerDrawYtd: 645000,
};

export const sales = [
  { id: 'S-2641', time: 'Today 09:12', customer: 'Neema Mwangi', items: 'Queen mattress (restored) + delivery', amount: 18500, method: 'M-Pesa', capture: 'Auto — matched payment' },
  { id: 'S-2640', time: 'Today 08:47', customer: 'Walk-in', items: 'Sofa set 3+1 (restored)', amount: 32000, method: 'Cash', capture: 'Manual entry' },
  { id: 'S-2639', time: 'Today 08:16', customer: 'Joseph Karanja', items: 'Dining table 6-seater (new)', amount: 27000, method: 'M-Pesa', capture: 'Auto — matched payment' },
  { id: 'S-2638', time: 'Yesterday 17:20', customer: 'Faith Auma', items: 'Queen mattress + 2 pillows', amount: 22500, method: 'Bank', capture: 'Manual entry' },
  { id: 'S-2637', time: 'Yesterday 15:04', customer: 'Peter Njoroge', items: 'Balcony set (new) ×2', amount: 38500, method: 'M-Pesa', capture: 'Auto — matched payment' },
  { id: 'S-2636', time: 'Yesterday 12:36', customer: 'Amina Hassan', items: 'Wardrobe 6ft (restored)', amount: 13900, method: 'M-Pesa', capture: 'Auto — matched payment' },
  { id: 'S-2635', time: '3 days ago', customer: 'Dennis Otieno', items: 'Bed frame — single', amount: 11500, method: 'Cash', capture: 'Manual entry' },
];

export const customers = [
  { name: 'Peter Njoroge', phone: '07X X2 276 551', orders: 10, totalSpent: 398000, lastPurchase: 'Yesterday', notes: 'Repeat buyer — wholesale batches, prefers new stock' },
  { name: 'Neema Mwangi', phone: '07X X4 421 903', orders: 6, totalSpent: 182500, lastPurchase: 'Today', notes: 'Prefers restored mattresses' },
  { name: 'Faith Auma', phone: '07X X8 882 610', orders: 4, totalSpent: 84500, lastPurchase: 'Yesterday', notes: 'Bought for new rental units' },
  { name: 'Joseph Karanja', phone: '07X X1 113 447', orders: 3, totalSpent: 96000, lastPurchase: 'Today' },
  { name: 'Amina Hassan', phone: '07X X9 908 122', orders: 2, totalSpent: 38900, lastPurchase: 'Yesterday', loan: 'Active — KES 25,000 at 5%' },
  { name: 'Samuel Kuria', phone: '07X X3 340 118', orders: 1, totalSpent: 9000, lastPurchase: 'Today 07:38', loan: 'Instalment paid — KES 9,000' },
];

export const inventory = {
  restored: [
    { item: 'Queen mattress (restored)', stock: 6, reorder: 3, cost: 6800, price: 18500, source: 'Bought + repaired' },
    { item: 'King mattress (restored)', stock: 2, reorder: 2, cost: 8200, price: 24500, source: 'Bought + repaired' },
    { item: 'Sofa set 3+1 (restored)', stock: 1, reorder: 2, cost: 14800, price: 32000, source: 'Bought + re-upholstered' },
    { item: 'Dining table 6-seater (restored)', stock: 3, reorder: 2, cost: 9400, price: 21000, source: 'Bought + refinished' },
    { item: 'Wardrobe 6ft (restored)', stock: 4, reorder: 2, cost: 6200, price: 13900, source: 'Bought + repaired' },
  ],
  newStock: [
    { item: 'Balcony set (new)', stock: 2, reorder: 2, cost: 21400, price: 38500, source: 'New stock' },
    { item: 'Bed frame — single (new)', stock: 5, reorder: 4, cost: 5200, price: 11500, source: 'New stock' },
    { item: 'Pillows (pair, new)', stock: 18, reorder: 10, cost: 1250, price: 2400, source: 'New stock' },
    { item: 'Mattress protector (new)', stock: 11, reorder: 8, cost: 900, price: 1800, source: 'New stock' },
  ],
  rawMaterial: [
    { item: 'Foam roll 6in', stock: 3, reorder: 2, cost: 55000, unit: 'roll', note: 'Cuts ~2 queen mattresses each' },
    { item: 'Upholstery fabric', stock: 40, reorder: 25, cost: 900, unit: 'm', note: '~9m per sofa set' },
    { item: 'Timber — softwood', stock: 120, reorder: 80, cost: 370, unit: 'ft', note: 'Frames and tables' },
    { item: 'Spring / zip kits', stock: 14, reorder: 10, cost: 380, unit: 'set', note: 'Mattress build + repair' },
    { item: 'Varnish + glue', stock: 9, reorder: 6, cost: 450, unit: 'L', note: 'Finishing' },
  ],
};

export const boms = [
  {
    product: 'Queen mattress (restored)',
    materials: [
      { name: 'Foam roll 6in', qty: 0.5, unit: 'roll' },
      { name: 'Upholstery fabric', qty: 6, unit: 'm' },
      { name: 'Spring / zip kits', qty: 1, unit: 'set' },
      { name: 'Labour — restoration', qty: 1, unit: 'job' },
    ],
    materialCost: 6800,
    laborCost: 1200,
    totalCost: 8000,
    sellPrice: 18500,
    marginPct: 57,
    cycle: 2,
    cycleUnit: 'days',
    status: 'In production',
  },
  {
    product: 'Sofa set 3+1 (restored)',
    materials: [
      { name: 'Upholstery fabric', qty: 18, unit: 'm' },
      { name: 'Foam — cushions', qty: 1.5, unit: 'roll' },
      { name: 'Labour — re-upholstery', qty: 1, unit: 'job' },
    ],
    materialCost: 14800,
    laborCost: 4500,
    totalCost: 19300,
    sellPrice: 32000,
    marginPct: 40,
    cycle: 5,
    cycleUnit: 'days',
    status: 'In production',
  },
  {
    product: 'Dining table 6-seater',
    materials: [
      { name: 'Timber — softwood', qty: 26, unit: 'ft' },
      { name: 'Varnish + glue', qty: 0.5, unit: 'L' },
      { name: 'Labour — joinery', qty: 1, unit: 'job' },
    ],
    materialCost: 9400,
    laborCost: 1800,
    totalCost: 11200,
    sellPrice: 21000,
    marginPct: 47,
    cycle: 3,
    cycleUnit: 'days',
    status: 'On hand',
  },
];

export const workOrders = [
  { no: 'WO-118', product: 'Queen mattress (restored)', qty: 3, materials: 20400, labor: 3600, stage: 'In production', eta: 'Thu', source: 'Auction batch + trade-in' },
  { no: 'WO-117', product: 'Sofa set 3+1 (restored)', qty: 2, materials: 29600, labor: 9000, stage: 'Quality check', eta: 'Today', source: 'Second-hand buy' },
  { no: 'WO-116', product: 'Dining table 6-seater', qty: 4, materials: 37600, labor: 7200, stage: 'Completed', eta: 'Dispatch', source: 'Raw material build' },
  { no: 'WO-115', product: 'Wardrobe 6ft (restored)', qty: 3, materials: 18600, labor: 4800, stage: 'Awaiting materials', eta: 'Fri', source: 'Trade-in restock' },
];

export const purchases = [
  { po: 'PO-204', supplier: 'Makini Timber', item: 'Timber 12ft (softwood)', qty: 40, amount: 14800, date: 'Today 08:22', status: 'Received' },
  { po: 'PO-203', supplier: 'Foamworks Ltd', item: 'Foam roll 6in', qty: 2, amount: 110000, date: 'Today 07:40', status: 'In transit', note: 'Also feeds upholstery line' },
  { po: 'PO-202', supplier: 'Textile surplus yard', item: 'Upholstery fabric', qty: 25, amount: 22500, date: 'Yesterday', status: 'Received' },
  { po: 'PO-201', supplier: 'Furniture auction', item: 'Mixed — mattresses, sofas, tables', qty: 12, amount: 96000, date: 'Yesterday', status: 'Received', note: 'Bought-to-restore batch, avg unit 8,000' },
  { po: 'PO-200', supplier: 'SpringZone', item: 'Spring / zip kits', qty: 20, amount: 7600, date: '3 days ago', status: 'Received' },
];

export const loans = [
  { ref: 'LN-052', customer: 'Amina Hassan', principal: 25000, rate: '5% — KES 50 per 1,000', repayable: 26250, paid: 8750, balance: 17500, due: 'Fri 25 Sep', status: 'On track' },
  { ref: 'LN-051', customer: 'Dennis Otieno', principal: 10000, repayable: 10500, paid: 10500, balance: 0, due: 'Settled 12 Sep', status: 'Settled' },
  { ref: 'LN-050', customer: 'Joyce Wambui', principal: 40000, repayable: 42000, paid: 14000, balance: 28000, due: '12 Oct', status: 'On track' },
  { ref: 'LN-049', customer: 'Samuel Kuria', principal: 20000, repayable: 21000, paid: 16000, balance: 5000, due: '2 days ago', status: 'Overdue' },
  { ref: 'LN-048', customer: 'Lilian Achieng', principal: 15000, repayable: 15750, paid: 0, balance: 15750, due: '5 days overdue', status: 'Overdue' },
];

export const cashRecap = {
  asOf: 'Today 12:30 · closing count after morning sales',
  expected: [
    { line: 'Opening float', amount: 10000 },
    { line: 'Cash sales today', amount: 64200 },
    { line: 'Less: cash paid out (expenses & purchases)', amount: 18300 },
  ],
  counted: [
    { denom: 'KES 1,000', count: 44 },
    { denom: 'KES 500', count: 15 },
    { denom: 'KES 200', count: 15 },
    { denom: 'KES 100', count: 12 },
    { denom: 'KES 50 & coins', count: 0 },
  ],
  variance: -200,
};

export const leakAlerts = [
  { text: 'Cash count is KES 200 short — KES 55,700 counted vs KES 55,900 expected. No sale in the register explains the gap.', kind: 'warn', cta: 'Review count' },
  { text: 'KES 12,000 M-Pesa received Monday has no matching sale yet — matched sender name is blank on the statement.', kind: 'warn', cta: 'Match now' },
  { text: 'Owner draws of KES 118,000 this month are recorded in the Owner Draw account — business cash stays separate.', kind: 'ok', cta: 'View ledger' },
  { text: 'Bank settlement for July reconciled — no disputed M-Pesa references.', kind: 'ok', cta: 'View' },
];

export const ownerDraw = {
  thisMonth: 118000,
  cap: 150000,
  ytd: 645000,
  records: [
    { date: 'Today', note: 'Personal — school fees', amount: 40000 },
    { date: 'Mon', note: 'Personal withdrawal', amount: 30000 },
    { date: '3 days ago', note: 'Fuel + family expenses', amount: 28000 },
    { date: '5 days ago', note: 'Personal — home stock', amount: 20000 },
  ],
};

export const unallocated = [
  { ref: 'SL2K9NMQ', when: 'Today 08:31', amount: 12000, sender: 'Neema Mwangi', matchHint: 'S-2641 Queen mattress was 18,500 — this may be a further instalment' },
  { ref: 'SL7KQ2X31', when: 'Yesterday 19:03', amount: 27000, sender: 'Joseph Karanja', matchHint: 'Exact match for S-2639 — Dining table 27,000. Assign to close the loop.' },
  { ref: 'SL9K1MZ72', when: 'Monday 17:41', amount: 12000, sender: 'No name on statement', matchHint: 'Amount matches no open sale — likely Faith Auma balance. Confirm on WhatsApp.' },
];

export const autoMatched = [
  { ref: 'SL3K8PTQ4', when: 'Today 09:12', amount: 18500, sender: 'Neema Mwangi', matchedTo: 'S-2641 — Queen mattress', account: 'M-Pesa' },
  { ref: 'SL3K8PTQ2', when: 'Today 07:38', amount: 9000, sender: 'Samuel Kuria', matchedTo: 'LN-049 — loan instalment', account: 'M-Pesa' },
  { ref: 'SL2KFV91M', when: 'Yesterday 15:04', amount: 38500, sender: 'Peter Njoroge', matchedTo: 'S-2637 — Balcony set ×2', account: 'M-Pesa' },
];

export const channelStatus = [
  {
    key: 'A',
    name: 'Android — SMS reader',
    detail: 'Runs on the shop phone. Reads the M-Pesa message, matches sender + amount to a pending sale, and the sale appears with a payment attached — no typing.',
    state: 'Active',
    stateTone: 'ok',
    pct: 86,
  },
  {
    key: 'B',
    name: 'Daraja callback (Paybill)',
    detail: 'Safaricom confirms every payment directly to the server. Works on any phone including iOS and far from the shop — the backbone for auto-capture.',
    state: 'Live',
    stateTone: 'ok',
    pct: 100,
  },
];

export const revenueTrend = [
  { label: 'Apr', value: 840000 },
  { label: 'May', value: 912000 },
  { label: 'Jun', value: 1080000 },
  { label: 'Jul', value: 1215000 },
  { label: 'Aug', value: 1284000 },
  { label: 'Sep', value: 1440000 },
];

export const expenseBreakdown = [
  { label: 'Stock & raw materials', value: 516000, tone: 'var(--secondary)' },
  { label: 'Restoration labour', value: 192000, tone: 'var(--accent)' },
  { label: 'Rent & utilities', value: 90000, tone: 'var(--accent-2)' },
  { label: 'Transport & delivery', value: 74000, tone: '#60a5fa' },
  { label: 'Repairs & tools', value: 70000, tone: '#c084fc' },
];

export const bestSellers = [
  { item: 'Queen mattress (restored)', qty: 24, revenue: 444000 },
  { item: 'Pillows (pair)', qty: 31, revenue: 74400 },
  { item: 'Dining table 6-seater', qty: 17, revenue: 357000 },
  { item: 'Sofa set 3+1 (restored)', qty: 9, revenue: 288000 },
];

export const reportInsights = [
  { text: 'Restored goods earn ~57% average margin — the highest of any category. Prioritise auction sourcing.', tone: 'ok' },
  { text: 'M-Pesa now carries 78% of revenue; auto-capture removed ~11 manual entries per day.', tone: 'ok' },
  { text: 'Two loans are overdue (KES 20,750). 5% reminder says: KES 50 interest per KES 1,000 — the capital is fully repayable.', tone: 'warn' },
  { text: 'Owner draw is KES 118,000 this month against a KES 150,000 cap. Separation intact.', tone: 'neut' },
];

export const ledger = [
  { date: 'Today 09:12', desc: 'Sale — Queen mattress (restored), M-Pesa', account: 'M-Pesa', inflow: 18500, outflow: null },
  { date: 'Today 08:47', desc: 'Sale — Sofa set 3+1, Cash', account: 'Cash', inflow: 32000, outflow: null },
  { date: 'Today 08:22', desc: 'Purchase — Timber, Makini Timber', account: 'M-Pesa', inflow: null, outflow: 14800 },
  { date: 'Today 08:00', desc: 'Owner draw — personal (school fees)', account: 'Bank', inflow: null, outflow: 40000 },
  { date: 'Yesterday 17:20', desc: 'Sale — Queen mattress + pillows, Bank', account: 'Bank', inflow: 22500, outflow: null },
  { date: 'Yesterday 12:40', desc: 'Restoration labour — 2 sofas (WO-117)', account: 'Cash', inflow: null, outflow: 4500 },
  { date: 'Yesterday 10:02', desc: 'Loan repayment — Dennis Otieno (LN-051 settled)', account: 'M-Pesa', inflow: 10500, outflow: null },
  { date: 'Yesterday 09:15', desc: 'Sale — Wardrobe 6ft, M-Pesa', account: 'M-Pesa', inflow: 13900, outflow: null },
];