import { clients } from '../../data/company';
import styles from './ClientMarquee.module.css';

export default function ClientMarquee() {
  const row = [...clients, ...clients];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Why Partner With Us</span>
          <h2 className="section-title">
            Built to keep your business <span className="gradient-text">moving forward</span>
          </h2>
          <p className="section-subtitle">
            We build the systems behind the work — so your team spends less time fighting tools
            and more time growing.
          </p>
        </div>
      </div>

      <div className={styles.marqueeWrap}>
        <div className={styles.marquee}>
          {row.map((client, i) =>
            client.phrase ? (
              <div key={`phrase-${i}`} className={`${styles.logoCard} ${styles.phraseCard}`}>
                <span className={styles.phraseMark}>&#10022;</span>
                <span className={styles.phraseText}>{client.phrase}</span>
              </div>
            ) : client.live && client.url ? (
              <a
                key={`${client.name}-${i}`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.logoCard} ${styles.liveCard}`}
              >
                <span className={styles.logoName}>{client.name}</span>
                <span className={styles.liveBadge}>Live</span>
              </a>
            ) : (
              <div key={`${client.name}-${i}`} className={`${styles.logoCard} ${styles.placeholderCard}`}>
                <span className={styles.placeholderName}>{client.name}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
