import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Tag from '../../ui/Tag/Tag';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, onView, index = 0 }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onView(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onView(project)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          cursor: 'pointer',
        }}
      >
        <div className={styles.cardGlow} style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(600px circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, var(--secondary), transparent 40%)`,
        }} />

        <div className={styles.cardImage}>
          <img src={project.imageUrl} alt={project.title} loading="lazy" />
          <div className={`${styles.overlay} ${isHovered ? styles.overlayVisible : ''}`}>
            <div className={styles.overlayActions}>
              <span className={styles.viewHint}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Details
              </span>

            </div>
          </div>
          {project.schema && (
            <span className={styles.schemaBadge}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              Schema
            </span>
          )}
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDescription}>{project.description}</p>

          <div className={styles.cardTags}>
            {project.technologies.slice(0, 3).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
            {project.technologies.length > 3 && (
              <span className={styles.moreTags}>+{project.technologies.length - 3}</span>
            )}
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardDate}>{project.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
