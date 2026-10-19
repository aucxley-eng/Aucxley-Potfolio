import { motion } from 'framer-motion';
import styles from './PageHeader.module.css';

export default function PageHeader({ label, title, subtitle, children }) {
  return (
    <section className={styles.header}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {label && <span className="section-label">{label}</span>}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
