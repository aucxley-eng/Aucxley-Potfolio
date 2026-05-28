import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../../../data/skills';
import styles from './SkillsSection.module.css';

function SkillBar({ name, level, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.skillTrack}>
        <motion.div
          className={styles.skillBar}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            My <span className="gradient-text">tech stack</span>
          </h2>
          <p className="section-subtitle">
            Languages, frameworks, and tools I work with to build production-ready applications.
          </p>
        </motion.div>

        <div className={styles.categories}>
          {skillCategories.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h4 className={styles.categoryTitle}>{cat.title}</h4>
              <div className={styles.skillsList}>
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
