import styles from './DemoApp.module.css';

export function Chip({ tone = 'neut', children }) {
  return (
    <span className={`${styles.chip} ${styles[tone]}`}>
      <span className={styles.chipDot} />
      {children}
    </span>
  );
}

export function Card({ title, action, children, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.cardTitleRow}>
          <h4 className={styles.cardTitle}>
            <span className={styles.cardTitleDot} />
            {title}
          </h4>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatCard({ label, value, sub, tone }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statLabel}>{label}</p>
      <div className={styles.statValue}>{value}</div>
      {sub && <div className={`${styles.statSub} ${tone ? styles[tone] : ''}`}>{sub}</div>}
    </div>
  );
}

export function LevelPill({ level, name }) {
  const cls = level === 4 ? 'level4' : level === 3 ? 'level3' : level === 2 ? 'level2' : 'level1';
  return <span className={`${styles.chip} ${styles[cls]}`}>{name}</span>;
}

export function PageIntro({ title, desc }) {
  return (
    <>
      <h2 className={styles.pageTitle}>{title}</h2>
      <p className={styles.pageDesc}>{desc}</p>
    </>
  );
}

export function SimNote() {
  return (
    <div className={styles.simNote}>
      <span className={styles.simDot} />
      Simulated frontend preview — all data is sample/mock, not live figures.
    </div>
  );
}