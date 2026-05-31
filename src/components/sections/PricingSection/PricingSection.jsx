import { motion } from 'framer-motion';
import styles from './PricingSection.module.css';

const plans = [
  {
    name: 'Starter',
    price: '30,000',
    description: 'Perfect for solo entrepreneurs who just need to get online.',
    features: ['Fully responsive site (looks great on phones, tablets, desktops)', 'Single-page or 3-page website', 'Contact form', 'Basic SEO setup', '1 month support'],
    popular: false,
  },
  {
    name: 'Business',
    price: '60,000',
    description: 'For growing SMEs ready to manage clients and scale.',
    features: ['Fully responsive (not a static site — adapts to every device)', 'Up to 6-page website', 'CMS integration so you can edit content yourself', 'Payment integration (M-Pesa, cards, or both)', '3 months support'],
    popular: true,
  },
  {
    name: 'Scale',
    price: '80,000',
    description: 'For established businesses needing online sales and payments.',
    features: ['Full e-commerce store (responsive — works on any device, unlike basic static shops)', 'Payment integration (M-Pesa, cards, or both)', 'Inventory management', 'Order tracking dashboard', '6 months support'],
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For multi-location businesses needing a complete system.',
    features: ['Multi-branch & employee management', 'Fleet & logistics tracking', 'Inventory & supply chain', 'Custom admin dashboard & reports', 'Priority support & SLA'],
    popular: false,
    custom: true,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function PricingSection() {
  return (
    <section id="pricing" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="section-subtitle">
            Choose a plan that works for you. All prices in KES.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {plans.map((p) => (
            <motion.div
              key={p.name}
              className={`${styles.card} ${p.popular ? styles.popular : ''}`}
              variants={item}
            >
              {p.popular && <span className={styles.badge}>Most Popular</span>}
              <h3 className={styles.planName}>{p.name}</h3>
              <div className={styles.price}>
                {p.custom ? (
                  <span className={styles.customPrice}>{p.price}</span>
                ) : (
                  <>
                    <span className={styles.currency}>from </span>
                    <span className={styles.amount}>{p.price}</span>
                    <span className={styles.currency}> KES</span>
                  </>
                )}
              </div>
              <p className={styles.planDesc}>{p.description}</p>
              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/254796606363" target="_blank" rel="noopener noreferrer" className={`${styles.cta} ${p.custom ? styles.ctaCustom : ''}`}>
                {p.custom ? 'Let\'s Talk' : 'Get Started'}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
