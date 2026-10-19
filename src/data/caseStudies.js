export const caseStudies = [
  {
    slug: 'coastline-motors',
    title: 'Coastline Motors',
    subtitle: 'A digital showroom for Mombasa’s car market',
    client: 'Coastline Motors',
    tags: ['DEVELOPMENT', 'E-COMMERCE', 'DESIGN'],
    liveUrl: 'https://coastlinemotors.co.ke',
    demoKey: null,
    featured: true,
    image: '/images/case-coastline.jpg',
    challenge:
      'Coastline Motors is a trusted car dealer on the Kenyan coast, but their online presence was not doing the showroom justice. Buyers search online first — and a static brochure site cannot show inventory, explain hire purchase, or let sellers start a sale from home.',
    solution:
      'We designed and engineered coastlinemotors.co.ke as a full digital showroom: a searchable vehicle inventory with transparent pricing, a sell-your-car pipeline from online form to same-day payment, hire-purchase eligibility tools, WhatsApp-first communication, and customer accounts — all on a fast, mobile-first platform.',
    highlights: [
      'Live vehicle inventory with filters, pricing, and hire-purchase badges',
      'Sell-your-car flow: online form → advisory price range → inspection booking → fair cash offer → paperwork handled',
      'Hire-purchase and trade-in guidance built into the buying journey',
      'WhatsApp deep-links so buyers reach the sales team in one tap',
      'Customer-facing stats, testimonials, and FAQ sections that build trust',
    ],
    modules: [
      {
        name: 'Inventory Browser',
        description:
          'Searchable stock list with make, model, transmission, price, and condition filters — updated as vehicles land.',
      },
      {
        name: 'Sell Your Car',
        description:
          'Structured seller pipeline: share car details, see an advisory market range, book inspection, receive a fair cash offer, sign and get paid.',
      },
      {
        name: 'Hire Purchase & Finance',
        description:
          'Buyers can explore financing options and repayment terms alongside each vehicle.',
      },
      {
        name: 'Trust Layer',
        description:
          'Inspection messaging, customer testimonials, and clear process steps from browse to transfer.',
      },
    ],
    tutorial: null,
    architecture:
      'Modern React/Next.js storefront with server-rendered inventory pages, image optimization, and a mobile-first design system. Contact and WhatsApp actions are wired for instant conversion.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    results: [
      { label: 'Platform', value: 'Live in production' },
      { label: 'Market', value: 'Mombasa, Kenya' },
      { label: 'Focus', value: 'Inventory + lead conversion' },
    ],
  },
  {
    slug: 'schoolhub',
    title: 'SchoolHub Academy',
    subtitle: 'One school, one learner record',
    client: 'SchoolHub Academy',
    tags: ['DEVELOPMENT', 'BUSINESS SYSTEMS', 'M-PESA'],
    liveUrl: null,
    demoKey: 'schoolhub',
    featured: true,
    image: '/images/case-schoolhub.svg',
    challenge:
      'The school ran 100% on paper — exercise books for CBC assessment, a handwritten fee ledger, and box files for learner records. The head teacher could not answer simple questions: which registers are incomplete, which payments need matching, which pickup has an unresolved passenger. Parents have basic phones, connectivity is unreliable, and KEMIS reporting demands accurate, export-ready learner data.',
    solution:
      'We architected SchoolHub as a modular monolith: one Django backend split into business modules (records, academics, finance, transport, meals, stock, notifications) talking to a React PWA, with PostgreSQL as the durable source of truth. One shared learner record powers every module — and role-specific workspaces keep each member of staff focused on their own work.',
    highlights: [
      'One shared learner record powering academics, fees, transport, meals, stock, and parent access',
      'Role workspaces: head teacher, admissions, bursar, teacher, transport, attendant, kitchen, storekeeper, and parents',
      'Finance that separates invoices, payments, allocations, receipts, and journal entries — balances derived, never free-text',
      'Transport with boarding, alighting, and handover confirmation — a location never proves a child reached an authorised adult',
      'SMS-first parent communication with offline drafts that sync with conflict checking',
    ],
    modules: [
      {
        name: 'Dashboard',
        description:
          'The morning exception board: which registers are incomplete, which payments need matching, which trip has an unresolved passenger, which reports await approval.',
      },
      {
        name: 'Learner Records',
        description:
          'Admissions through to enrolment history — one record per learner, verified guardian links with separate view, pay, and collect permissions.',
      },
      {
        name: 'Attendance',
        description:
          'Tap-to-mark registers per class. Absence alerts wait for a reviewed register and the school-defined SMS cutoff — not incomplete roll calls.',
      },
      {
        name: 'CBC Assessments',
        description:
          'Competency-level observations with rubric levels, evidence, and narrative comments. Multiple observations over time — never one overwritten row.',
      },
      {
        name: 'Finance',
        description:
          'The money pipeline: Invoice → Payment → Allocation → Receipt → Journal entries. M-Pesa callbacks reconciled transactionally.',
      },
      {
        name: 'Transport & Manifests',
        description:
          'Dated trips per route and vehicle, with boarding, alighting, and handover confirmation recorded per learner.',
      },
      {
        name: 'Meals, Stock & SMS',
        description:
          'Kitchen forecasts from subscriptions, stock movements with variance checks, and a full SMS log with delivery rates.',
      },
      {
        name: 'KEMIS & Reports',
        description:
          'Data validation, export generation, and submission tracking for government reporting — plus term report approvals.',
      },
    ],
    tutorial: {
      title: 'How a school runs on SchoolHub',
      intro:
        'Follow a Monday morning through the platform. Open the live demo alongside this walkthrough — each step tells you where to click and what you should see. All data in the demo is simulated sample data.',
      steps: [
        {
          title: 'The morning exception board',
          body:
            'The head teacher does not start with charts — they start with four questions: which registers are incomplete, which payments need matching, which trip has an unresolved passenger, which reports await approval. That is the Dashboard.',
          path: 'Dashboard · role: Head teacher',
        },
        {
          title: 'One role, one workspace',
          body:
            'Click Parent in the role bar. Thirteen modules collapse to a single portal showing only the linked child’s reports, balance, and receipts. Paying fees never automatically authorises collection or access to sensitive information.',
          path: 'Role bar → Parent',
        },
        {
          title: 'The single learner record',
          body:
            'Every module reads from one learner record. Guardian links carry separate permissions — can view, can pay, can collect — so a relative who pays fees still cannot collect a child from the bus.',
          path: 'Learner Records · role: Head or Admissions',
        },
        {
          title: 'Admissions queue',
          body:
            'Applications move through verification: guardian relationships confirmed, KEMIS identifiers checked, then Admit. Enrolment history is preserved — promotion adds rows, it never rewrites the past.',
          path: 'Learner Records · role: Admissions',
        },
        {
          title: 'Registers and the SMS cutoff',
          body:
            'Teachers mark attendance class by class. Absence alerts are not sent during incomplete roll calls — they fire after the register is reviewed and the school’s cutoff time passes.',
          path: 'Attendance · role: Teacher or Head',
        },
        {
          title: 'CBC in practice',
          body:
            'Pick a learner on Grade 4-B Mathematics and tap rubric levels across competencies. The radar chart re-shapes as observations accumulate. Multiple observations per competency per term — evidence is never compressed into one overwritten row.',
          path: 'Assessments · role: Teacher',
        },
        {
          title: 'From observations to report cards',
          body:
            'Captured assessments feed report templates. Term reports land in the approval queue — the head teacher reviews and publishes before parents see anything.',
          path: 'Reports & Approval · role: Head or Teacher',
        },
        {
          title: 'The money pipeline',
          body:
            'An invoice states what is owed. A payment records money received. An allocation applies that payment. A receipt acknowledges it. Journal entries account for the financial effect. Balances are derived from this history — never edited by hand.',
          path: 'Finance · role: Head or Bursar',
        },
        {
          title: 'Live M-Pesa feed',
          body:
            'Payments arrive by M-Pesa with the learner’s admission number as account reference. Matched payments allocate automatically; unmatched amounts sit in a suspense queue for the bursar. Reversed callbacks are handled transactionally — a repeated callback can never create two payments.',
          path: 'Finance → M-Pesa card',
        },
        {
          title: 'Trips, incidents, and handovers',
          body:
            'A vehicle location does not prove a child boarded or reached an authorised adult. Trips record what was planned versus what happened, with incidents for wrong stops, breakdowns, and failed handovers.',
          path: 'Transport & Trips · role: Head or Transport',
        },
        {
          title: 'The attendant’s three events',
          body:
            'For every child on a route, the attendant confirms three separate events: boarding, alighting, and handover to a verified collector — with time and confirming staff member.',
          path: 'Passenger Manifests · role: Bus attendant',
        },
        {
          title: 'Kitchen, stock, and KEMIS',
          body:
            'Kitchen forecasts meals from subscriptions at the daily cutoff. Storekeepers issue and count stock with variance approval. Meanwhile KEMIS readiness sits at 97% — two blocking errors to fix before the submission deadline. The system validates before it exports; an export file is not the same as an accepted submission.',
          path: 'Meals & Kitchen → Stock & Uniforms → KEMIS',
        },
      ],
    },
    architecture:
      'Modular monolith — one Django backend split into business modules (records, academics, finance, transport, meals, stock, notifications) talking to a React PWA. PostgreSQL is the durable source of truth. M-Pesa callback handling uses the transactional outbox pattern so a notification outage never loses a verified payment.',
    tech: ['React', 'Python', 'Django', 'DRF', 'PostgreSQL', 'M-Pesa (Daraja)', 'PWA'],
    results: [
      { label: 'Type', value: 'Interactive product system' },
      { label: 'Users', value: '9 role-based workspaces' },
      { label: 'Try it', value: 'Live demo on this site' },
    ],
  },
  {
    slug: 'biashara',
    title: 'Biashara',
    subtitle: 'A business management system for SMEs that run on M-Pesa',
    client: 'Biashara',
    tags: ['DEVELOPMENT', 'BUSINESS SYSTEMS', 'M-PESA'],
    liveUrl: null,
    demoKey: 'biashara',
    featured: true,
    image: '/images/case-biashara.svg',
    challenge:
      'Most SMEs run on notebooks, spreadsheets, and WhatsApp — where floating money and the owner’s personal money get mixed. Leaks hide in a drawer count that never matches, and every sale paid by M-Pesa has to be re-typed from a phone statement. The owner cannot answer basic questions: what sold today, what is the real cash position, who still owes us money?',
    solution:
      'We built Biashara as an all-in-one operations platform: one dashboard for stock, sales, customers, purchases, loans, and finances. M-Pesa payments capture automatically — money and sale appear together. Owner draws are recorded apart from business cash. Drawer counts flag unexplained shortfalls instead of hiding them.',
    highlights: [
      'One dashboard for stock, sales, customers, purchases, and finances',
      'Automatic M-Pesa payment capture — no typing, no statement scanning',
      'Money separation: owner draws recorded apart from business cash with a visible cap',
      'Cash-count leak detection: expected drawer built from records, variances flagged not written off',
      'Customer loan book at 5% flat with auto-matched repayments and overdue reminders',
      'Revenue vs expense reports rolled up from the ledger — not a separate spreadsheet',
    ],
    modules: [
      {
        name: 'Overview',
        description:
          'The whole business on one screen: bank, M-Pesa, drawer, and loan positions, plus money-separation status for the owner.',
      },
      {
        name: 'Sales',
        description:
          'Every sale recorded with channel — M-Pesa auto-matched or manual entry — so you always know how money arrived.',
      },
      {
        name: 'Manufacturing',
        description:
          'Work orders for production and restoration: bill of materials, labour cost, margin, and stage tracking from raw materials to finished goods.',
      },
      {
        name: 'Inventory',
        description:
          'Three tiers in one view — raw materials, work-in-progress, and finished/restored goods — with margin chips and reorder levels.',
      },
      {
        name: 'Purchases',
        description:
          'Supplier purchase orders from auction batches to raw material restocks, with cost tracking that feeds margin reporting.',
      },
      {
        name: 'Loans',
        description:
          'Customer credit at a transparent 5% flat rate. Every repayment auto-matches to the loan; overdue accounts queue for reminders.',
      },
      {
        name: 'Cash & Ledger',
        description:
          'Expected drawer built from recorded cash transactions versus counted drawer. Differences are leaks to investigate — never silent write-offs.',
      },
      {
        name: 'M-Pesa Auto-capture',
        description:
          'Payments arrive via Daraja callback or SMS, deduplicated, then auto-matched to open sales or loans. Unmatched amounts land in a one-tap assign inbox.',
      },
      {
        name: 'Reports',
        description:
          'Revenue trends, expense breakdowns, and auto-flagged insights — like which categories carry the best margins and how much manual entry auto-capture removed.',
      },
    ],
    tutorial: {
      title: 'How a shop runs on Biashara',
      intro:
        'Follow a trading day through the platform — a furniture and mattress business that buys, restores, and sells. Open the live demo alongside this walkthrough. All data is simulated sample data.',
      steps: [
        {
          title: 'The whole business on one screen',
          body:
            'Open Overview. Bank, M-Pesa, drawer, and loan positions sit together — the owner sees the real cash picture without opening five apps or a spreadsheet.',
          path: 'Overview (default landing page)',
        },
        {
          title: 'Business money vs owner money',
          body:
            'Owner draws are recorded in a separate account with a visible cap — 118,000 of a 150,000 allowance in the demo month. Personal money never silently disappears into business cash.',
          path: 'Overview → Money separation card',
        },
        {
          title: 'Leak detection at the drawer',
          body:
            'Expected drawer is built from recorded cash transactions: 55,900. Counted drawer: 55,700. The 200 shortfall is flagged to the leak queue — investigated, never written off.',
          path: 'Cash & Ledger',
        },
        {
          title: 'Sales that record themselves',
          body:
            'M-Pesa sales arrive with Auto — matched chips; cash sales are manual entries. You always know how each sale was paid without re-typing statements.',
          path: 'Sales',
        },
        {
          title: 'Three inventory tiers, one table',
          body:
            'Raw materials, work-in-progress, and finished goods share one inventory view with working tabs. Margin chips show what each restored item actually earns.',
          path: 'Inventory (try the tier tabs)',
        },
        {
          title: 'Restoration as manufacturing',
          body:
            'A queen mattress in production: materials 20,400 plus labour 3,600, stages tracked until it is ready to sell. Work orders link purchases to finished goods.',
          path: 'Manufacturing',
        },
        {
          title: 'Buying low, selling right',
          body:
            'Purchase orders capture auction batches — 12 units at an average 8,000 that sell for roughly three times. Cost data feeds the margin reports automatically.',
          path: 'Purchases',
        },
        {
          title: 'The 5% loan book',
          body:
            'For every KES 1,000 lent, the customer repays KES 1,050. Repayments arrive by M-Pesa and auto-match. Overdue accounts — five days late in the demo — queue for an SMS reminder. No manual balance edits: every repayment reduces the balance.',
          path: 'Loans',
        },
        {
          title: 'Unmatched M-Pesa, one-tap assign',
          body:
            'A payment that does not auto-match lands in the unmatched inbox with a hint — exact amount for an open sale. Assign it in seconds and it flows straight into the cash ledger.',
          path: 'M-Pesa Auto-capture',
        },
        {
          title: 'Month-end without the spreadsheet',
          body:
            'Revenue trends, expense breakdowns, and insights: restored goods earn ~57% average margin; M-Pesa carries 78% of revenue; auto-capture removed about 11 manual entries per day. When a customer pays via M-Pesa, the money and the sale appear automatically.',
          path: 'Reports',
        },
      ],
    },
    architecture:
      'Owner-first operations platform with automatic M-Pesa capture through two channels — Daraja callback and an Android SMS reader — both feeding one deduplicated ingest. The loan book, cash ledger, and inventory tiers share a single relational model so reports roll up from transactions, not exports.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'M-Pesa (Daraja)', 'React Native'],
    results: [
      { label: 'Type', value: 'Interactive product system' },
      { label: 'Focus', value: 'Cash control + M-Pesa automation' },
      { label: 'Try it', value: 'Live demo on this site' },
    ],
  },
  {
    slug: 'nairobi-events',
    title: 'Nairobi Events',
    subtitle: 'Event ticketing & community platform powered by M-Pesa',
    client: 'Nairobi Events',
    tags: ['DEVELOPMENT', 'FULL-STACK', 'M-PESA'],
    liveUrl: null,
    demoKey: null,
    featured: true,
    image: '/images/case-nairobi-events.jpg',
    challenge:
      'Running events in Nairobi means selling tickets over WhatsApp, taking cash at the gate, and keeping crews, budgets, and promo in separate spreadsheets. Attendees have no single place to discover what is on, and on event day the organizer cannot answer the basic questions: how many tickets sold, who is checked in, what did the event actually make?',
    solution:
      'We built a full-stack ticketing and community platform: public event discovery with category, date, price, and distance filters; M-Pesa STK Push checkout that issues QR-code tickets; crew check-in apps; and an organizer back office with CRM, accounting, marketing, surveys, POS, and chat — one system from first promo to the final P&L.',
    highlights: [
      'Public discovery feed with search, category, date, price, and distance filters',
      'M-Pesa Daraja STK Push checkout issuing QR tickets, verified at the gate',
      'Crew check-in flow and event-day ops: POS, stock, and staff chat channels',
      'Organizer CRM with a lead pipeline from first enquiry to signed event',
      'Event accounting: transactions, budgets, and profit & loss per event',
      'Marketing campaigns, surveys, and project boards tied to each event',
    ],
    modules: [
      {
        name: 'Discovery',
        description:
          'The public events feed: search by venue or vibe, filter by category, date, price range, and distance, with live capacity and pricing on every card.',
      },
      {
        name: 'Ticketing',
        description:
          'Ticket types per event with capacity and sales tracking. M-Pesa STK Push completes the purchase and issues a QR ticket held in the buyer’s account.',
      },
      {
        name: 'Check-in',
        description:
          'Crew scan or enter QR codes at the gate; attendees move from sold to checked in live, so event day headcounts are never in doubt.',
      },
      {
        name: 'CRM',
        description:
          'A pipeline for organizers: leads, stages, and moves — sponsors, vendors, and partners tracked from first enquiry to signed deal.',
      },
      {
        name: 'Accounting',
        description:
          'Per-event transactions, budgets, and P&L reports. What came in through ticket sales versus what went out to production sits in one ledger.',
      },
      {
        name: 'Transport',
        description:
          'Carpool ride groups per event plus Uber integration, so attendees can arrange the trip to the venue from inside the platform.',
      },
      {
        name: 'Marketing & Surveys',
        description:
          'Campaigns built from templates and sent to attendee lists, with post-event surveys feeding results back to the organizer.',
      },
      {
        name: 'Operations',
        description:
          'Point of sale, inventory, an event shop, project boards for crews, and chat channels — the tooling an event team actually runs on-site.',
      },
    ],
    architecture:
      'Next.js 16 / React 19 frontend against a Flask API with JWT auth, OTP verification, and role-based access. SQLite in development to PostgreSQL in production, Socket.IO for live updates, M-Pesa Daraja for payments, and Docker, Nginx, and GitHub Actions for deployment. Ships as a Capacitor Android app on top of the same frontend.',
    tech: ['Next.js 16', 'React 19', 'Flask', 'PostgreSQL', 'M-Pesa (Daraja)', 'Socket.IO', 'Tailwind CSS', 'Zustand'],
    results: [
      { label: 'Type', value: 'Full-stack product system' },
      { label: 'Scope', value: 'Ticketing to event-day ops' },
      { label: 'Payments', value: 'M-Pesa STK Push + QR tickets' },
      { label: 'Clients', value: 'Web + Android (Capacitor)' },
    ],
  },
];

export const getCaseStudyBySlug = (slug) => caseStudies.find((c) => c.slug === slug);
export const getFeaturedCaseStudies = () => caseStudies.filter((c) => c.featured);
