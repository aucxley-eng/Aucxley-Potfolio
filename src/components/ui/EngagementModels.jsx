import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { engagementModels } from '../../data/company';
import styles from './EngagementModels.module.css';

export default function EngagementModels() {
  return (
    <div className={styles.grid}>
      {engagementModels.map((model, i) => (
        <motion.div
          key={model.title}
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className={styles.title}>{model.title}</h3>
          <p className={styles.description}>{model.description}</p>
          <ul className={styles.points}>
            {model.points.map((p) => (
              <li key={p}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      <div className={styles.ctaCard}>
        <p className={styles.ctaText}>
          Not sure which model fits? Most engagements start with a short discovery call.
        </p>
        <Link to="/contact" className={styles.ctaLink}>Talk to us &rarr;</Link>
      </div>
    </div>
  );
}
