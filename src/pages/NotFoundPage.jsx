import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <span className="section-label">404</span>
        <h1 className={styles.title}>
          This page <span className="gradient-text">does not exist</span>
        </h1>
        <p className={styles.text}>
          The page you are looking for may have moved or never existed. Try our work or services instead.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>Back Home</Link>
          <Link to="/work" className={styles.secondaryBtn}>View Our Work</Link>
        </div>
      </div>
    </section>
  );
}
