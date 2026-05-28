import { motion } from 'framer-motion';
import { personalInfo } from '../../../data/skills';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageCard}>
              <div className={styles.avatarGlow} />
              <div className={styles.avatarInitials}>
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={styles.imageDecorator} />
            </div>
          </motion.div>

          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Turning ideas into <span className="gradient-text">digital reality</span>
            </h2>
            <p className={styles.bio}>{personalInfo.bio}</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {personalInfo.location}
              </div>
              <div className={styles.detail}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {personalInfo.email}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
