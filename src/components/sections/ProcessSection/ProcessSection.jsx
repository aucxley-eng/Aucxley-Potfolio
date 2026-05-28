import { motion } from 'framer-motion';
import styles from './ProcessSection.module.css';

const steps = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We discuss your project goals, requirements, and timeline. Free 15-minute consultation to understand your vision.',
  },
  {
    step: 2,
    title: 'Proposal & MVP',
    description: 'I prepare a detailed proposal with scope, timeline, and pricing. A minimum viable product is built for your review.',
  },
  {
    step: 3,
    title: 'Delivery & Support',
    description: 'Your project is launched with ongoing support, updates, and improvements to ensure long-term success.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">How I Work</span>
          <h2 className="section-title">
            Simple <span className="gradient-text">3-Step Process</span>
          </h2>
          <p className="section-subtitle">
            From idea to launch, I keep it straightforward and transparent.
          </p>
        </motion.div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className={styles.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.stepNumber}>
                <span>0{s.step}</span>
                {i < steps.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.stepCard}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
