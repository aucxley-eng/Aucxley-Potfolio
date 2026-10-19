import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './CaseStudyCard.module.css';

export default function CaseStudyCard({ study, large = false }) {
  return (
    <motion.article
      className={`${styles.card} ${large ? styles.large : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.imageWrap}>
        <img src={study.image} alt={study.title} className={styles.image} loading="lazy" />
        <div className={styles.tags}>
          {study.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.client}>{study.client}</span>
        <h3 className={styles.title}>
          <Link to={`/work/${study.slug}`} className={styles.titleLink}>
            {study.title}
          </Link>
        </h3>
        <p className={styles.subtitle}>{study.subtitle}</p>
        <p className={styles.excerpt}>{study.challenge}</p>

        <div className={styles.footer}>
          <Link to={`/work/${study.slug}`} className={styles.readMore}>
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          {study.demoKey && (
            <Link to={`/demo/${study.demoKey}`} className={styles.demoLink}>
              Launch Demo
            </Link>
          )}
          {study.liveUrl && (
            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.demoLink}>
              Visit Live Site
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
