export const services = [
  {
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'Fast, credible websites that work on every device.',
    overview:
      'We design and build professional websites that make your business look credible and get found online. Every site is responsive, loads fast, and is engineered to convert visitors into customers.',
    offerings: [
      {
        title: 'Business Websites',
        description:
          'A professional online presence that establishes credibility and attracts customers — your digital shop window.',
        points: [
          'Responsive design that looks sharp on phones, tablets, and desktops',
          'Loads in under 3 seconds so visitors never bounce',
          'Built-in WhatsApp chat so customers reach you in one tap',
          'SEO foundations that help you rank on Google',
          'Easy to update — add products, services, or announcements anytime',
        ],
      },
      {
        title: 'Landing Pages',
        description:
          'Focused, high-converting pages for campaigns, products, and launches.',
        points: [
          'Clear calls-to-action built around one goal',
          'Analytics-ready from day one',
          'Fast iteration for A/B testing',
        ],
      },
      {
        title: 'Website Care & Support',
        description:
          'Ongoing maintenance that keeps your website secure, fast, and up to date after launch.',
        points: [
          'Regular security checks and updates',
          'Performance optimization as you grow',
          'Automatic daily backups',
          'Priority support when issues arise',
        ],
      },
    ],
    relatedWork: ['coastline-motors'],
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce & Payments',
    tagline: 'Online stores that sell — with M-Pesa and cards built in.',
    overview:
      'We build complete online stores where customers browse, pay with M-Pesa or card, and track orders — while you manage stock, payments, and reporting from one dashboard. Your shop stays open 24/7.',
    offerings: [
      {
        title: 'Online Stores',
        description:
          'Full e-commerce platforms with product catalogues, cart, checkout, and order management.',
        points: [
          'M-Pesa STK push and paybill integration',
          'Visa, Mastercard, and card payments for tourists and card users',
          'Automatic stock tracking with low-stock alerts',
          'SMS and email notifications on every new order',
          'Dashboard showing what sold today, this week, and this month',
        ],
      },
      {
        title: 'Payments & Invoicing',
        description:
          'Reliable payment capture with reconciliation you can trust — no more chasing M-Pesa statements.',
        points: [
          'Transaction references matched to orders automatically',
          'Partial payments and refunds handled cleanly',
          'Exportable ledgers for your accountant',
        ],
      },
      {
        title: 'Inventory & Order Operations',
        description:
          'The back office behind the storefront — stock, fulfilment, and customer records in one place.',
        points: [
          'Multi-warehouse and multi-branch stock views',
          'Order status workflows from pending to delivered',
          'Customer purchase history at a glance',
        ],
      },
    ],
    relatedWork: ['biashara'],
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    tagline: 'Bespoke systems built around how your business actually works.',
    overview:
      'Off-the-shelf software never fits perfectly. We build custom web applications and business management systems tailored to your processes — internal tools, client portals, booking systems, and operations platforms.',
    offerings: [
      {
        title: 'Custom Web Apps',
        description:
          'Bespoke software for the workflows off-the-shelf tools get wrong. Booking, tracking, portals, internal operations — built to fit.',
        points: [
          'Built around YOUR specific business processes',
          'Role-based access so staff see only what they need',
          'Live dashboards of what is happening in the business',
          'Automates manual data entry, invoicing, and reporting',
          'Grows with you — add features, users, or locations',
        ],
      },
      {
        title: 'Business Management Systems',
        description:
          'Run your entire business from a single dashboard — staff, inventory, clients, sales, and finances.',
        points: [
          'One system for stock, sales, customers, purchases, and cash',
          'Automatic M-Pesa payment capture — money and sale appear together',
          'Owner draws recorded separately from business cash',
          'Cash-count leak detection against expected drawer',
          'Customer loan books with auto-matched repayments',
        ],
      },
      {
        title: 'Integrations & APIs',
        description:
          'Connect the tools you already use — payment gateways, SMS providers, accounting, and more.',
        points: [
          'M-Pesa Daraja integration',
          'SMS gateway integration',
          'REST APIs for third-party systems',
        ],
      },
    ],
    relatedWork: ['biashara'],
  },
  {
    slug: 'school-management',
    name: 'School Management',
    tagline: 'One learner record. Every department connected.',
    overview:
      'We build school operations systems that replace exercise books, ledgers, and box files. One shared learner record connects academics, fees, transport, meals, stock, and parent communication — with role-specific workspaces for every member of staff.',
    offerings: [
      {
        title: 'Academic Records & CBC',
        description:
          'Learner records, enrolment history, and CBC assessment capture that meets KEMIS reporting requirements.',
        points: [
          'One shared learner record — no silos per module',
          'CBC competency assessments with rubric levels and evidence',
          'Report cards generated from captured observations',
          'KEMIS-ready data validation and export',
        ],
      },
      {
        title: 'Fees & Finance',
        description:
          'Invoice, receive, allocate, and reconcile school fees with M-Pesa auto-capture.',
        points: [
          'Invoices for tuition, transport, meals, and uniforms as separate lines',
          'M-Pesa payments matched to learners automatically',
          'Receipts and journal entries from verified payments only',
          'Balances derived from accounting history — never free-text',
        ],
      },
      {
        title: 'Transport, Meals & Stock',
        description:
          'Daily operations modules that keep children safe and the school running.',
        points: [
          'Trip manifests with boarding, alighting, and handover confirmation',
          'Kitchen forecasts from meal subscriptions and cutoffs',
          'Stock movements with variance checks and reorder alerts',
          'SMS-first parent communication after reviewed registers',
        ],
      },
    ],
    relatedWork: ['schoolhub'],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
