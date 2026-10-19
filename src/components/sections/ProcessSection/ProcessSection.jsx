import { motion } from 'framer-motion';
import { processSteps } from '../../../data/company';
import styles from './ProcessSection.module.css';

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
          <span className="section-label">How We Work</span>
          <h2 className="section-title">
            A Simple, <span className="gradient-text">Transparent Process</span>
          </h2>
          <p className="section-subtitle">
            From idea to launch, we keep delivery straightforward — you always know what is next.
          </p>
        </motion.div>

        <div className={styles.steps}>
          {processSteps.map((s, i) => (
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
                {i < processSteps.length - 1 && <div className={styles.connector} />}
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
