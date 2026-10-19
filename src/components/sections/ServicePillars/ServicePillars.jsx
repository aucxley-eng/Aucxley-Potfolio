import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../../../data/services';
import styles from './ServicePillars.module.css';

export default function ServicePillars() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">
            Elevating Your Business with <span className="gradient-text">Great Technology</span>
          </h2>
          <p className="section-subtitle">
            We blend engineering depth with product thinking — websites, commerce, custom software,
            and school systems designed to stand out and thrive.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className={styles.cardTitle}>{service.name}</h3>
              <p className={styles.cardTag}>{service.tagline}</p>
              <ul className={styles.points}>
                {service.offerings.map((o) => (
                  <li key={o.title}>{o.title}</li>
                ))}
              </ul>
              <Link to={`/services/${service.slug}`} className={styles.viewLink}>
                View Services
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
