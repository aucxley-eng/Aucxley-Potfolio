import styles from './TechChips.module.css';

export default function TechChips({ items, title = 'Technologies We Work With' }) {
  if (!items?.length) return null;

  return (
    <div className={styles.wrap}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.chips}>
        {items.map((item) => (
          <span key={item} className={styles.chip}>{item}</span>
        ))}
      </div>
    </div>
  );
}
