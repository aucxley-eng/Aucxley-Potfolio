import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { company } from '../../data/company';
import styles from './CTABand.module.css';

export default function CTABand({
  title = 'Let’s build something great',
  subtitle = 'Have a project in mind? Tell us what you are building — we will come back with a clear plan.',
}) {
  return (
    <section className={styles.band}>
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.primaryBtn}>Get in Touch</Link>
            <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
