const projects = [
  {
    id: 1,
    title: "Business Websites",
    description: "A professional online presence that makes your business look credible and attracts customers. A website shows people who you are and what you offer — it's your digital shop window. If you need customers to DO things (book, pay, log in), that is a web app (see my Custom Web Apps service).",
    imageUrl: "https://picsum.photos/seed/business-sites/600/400.jpg",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    projectUrl: "#",
    date: "2025-01-15",
    problem: "Most small businesses in Kenya lose customers because they don't have a website, or their site looks outdated and doesn't work on mobile phones. Customers today search online first — if they can't find you, they go to your competitor.",
    highlights: [
      "Not a cheap static site — I build responsive websites that adapt and look beautiful on phones, tablets, and desktops (a static site looks fine on a computer but breaks on mobile)",
      "Loads in under 3 seconds so visitors don't get frustrated and click away",
      "Rank higher on Google searches to bring in more customers without spending on ads",
      "Built-in WhatsApp chat so customers can message you instantly with one tap",
      "Easy to update yourself — add new products, services, or announcements anytime"
    ],
    techDetail: "I build modern websites that load fast, look professional, and help your business get found online. Every site works on all devices and includes WhatsApp integration so your customers can reach you instantly."
  },
  {
    id: 2,
    title: "E-Commerce Stores",
    description: "A fully working online store where customers can browse your products, pay using M-Pesa or card, and get their orders delivered — all without calling you. Your shop stays open 24 hours a day, 7 days a week.",
    imageUrl: "https://picsum.photos/seed/ecommerce/600/400.jpg",
    technologies: ["React", "Python", "Flask", "PostgreSQL", "M-Pesa"],
    projectUrl: "#",
    date: "2025-03-10",
    problem: "Running a physical shop means you only make money when the doors are open. Many customers want to buy after hours or from home, but without an online store you're sending them to competitors like Jumia or Kilimall.",
    highlights: [
      "Customers pay instantly with M-Pesa — Kenya's most trusted payment method — no bank account needed",
      "Also accepts Visa, Mastercard, and other cards so tourists and card users can buy too",
      "Automatically tracks your stock levels and alerts you when items run low",
      "Sends you an SMS and email every time a new order comes in so you never miss a sale",
      "Gives you a dashboard showing exactly what sold today, this week, and this month"
    ],
    techDetail: "I set up complete online stores with M-Pesa and card payment integration so you can sell products around the clock. The system tracks your inventory, manages orders, and helps you understand what's selling best."
  },
  {
    id: 3,
    title: "Custom Web Apps",
    description: "Bespoke software built specifically for how your business operates. Unlike a website which shows information, a web app lets you and your customers DO things — like booking appointments, paying invoices, tracking orders, or managing staff. Think of a website as your shop window and a web app as the entire back office running behind it.",
    imageUrl: "https://picsum.photos/seed/custom-apps/600/400.jpg",
    technologies: ["React", "Python", "Django", "PostgreSQL", "Docker"],
    projectUrl: "#",
    date: "2025-05-20",
    problem: "Off-the-shelf software never fits perfectly. You end up paying for features you don't need and working around the ones you do. Your team wastes hours on manual data entry and repetitive tasks that could be automated.",
    highlights: [
      "Built around YOUR specific business processes, not a one-size-fits-all template",
      "Automates manual tasks like data entry, invoicing, and reporting so your team focuses on important work",
      "Gives you a live dashboard showing exactly what's happening in your business at any moment",
      "Secure login system with different access levels — staff see only what they need to",
      "Easily grows with you — add new features, users, or locations as your business expands"
    ],
    techDetail: "I create custom web applications tailored to your unique business workflows. From booking systems to client portals and internal tools, everything is built to fit how you actually work."
  },
  {
    id: 4,
    title: "Website Care & Support",
    description: "Ongoing maintenance to keep your website secure, fast, and up to date. Once your site is live, I make sure it stays protected from hackers, loads quickly for visitors, and has the latest features.",
    imageUrl: "https://picsum.photos/seed/support/600/400.jpg",
    technologies: ["Python", "Flask", "Docker", "AWS", "Linux"],
    projectUrl: "#",
    date: "2025-06-01",
    problem: "A website isn't a one-time thing. Hackers constantly try to break in, software goes out of date, and content gets stale. Without regular maintenance, your site becomes slow, vulnerable, and starts losing customers.",
    highlights: [
      "Regular security checks and updates to protect your site and your customers' data from hackers",
      "Your site stays fast and snappy even as you add more products, pages, and images",
      "I handle updates and add new features whenever you need them — no technical skills required from you",
      "Automatic daily backups so if something ever goes wrong, you're back online within minutes",
      "Priority support when issues come up — I fix problems fast so your business stays running"
    ],
    techDetail: "After launching your site, I provide ongoing support to keep it running smoothly. This includes security monitoring, performance optimization, content updates, and backups so you're never caught off guard."
  },
  {
    id: 5,
    title: "Business Management Systems",
    description: "An all-in-one system to run your entire business from a single dashboard. Manage your employees, track your services and inventory, keep records of your clients, and get clear reports on how your business is performing.",
    imageUrl: "https://picsum.photos/seed/business-mgmt/600/400.jpg",
    technologies: ["React", "Python", "Django", "PostgreSQL", "Redis", "Docker"],
    projectUrl: "#",
    date: "2025-07-01",
    problem: "Most businesses use a messy mix of notebooks, spreadsheets, and WhatsApp groups to keep track of everything. Information gets lost, staff make mistakes, and you never have a clear picture of how your business is really doing.",
    highlights: [
      "One dashboard to manage employees, clients, services, inventory, and finances — no more scattered notes",
      "Know exactly what products or materials you have in stock and get alerts when it's time to reorder",
      "Keep complete records of every client — their contact info, purchase history, and preferences",
      "Auto-generated reports showing your revenue, expenses, profits, and trends over time",
      "Staff get their own logins with limited access so they can do their jobs without seeing sensitive data"
    ],
    techDetail: "I build complete business management platforms that bring your operations into one place. You get employee management, inventory tracking, client records, sales reporting, and more — all from a single login."
  }
];

export const getProjects = () => {
  return projects;
};
