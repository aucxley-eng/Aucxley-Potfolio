import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import EngagementModels from '../../components/ui/EngagementModels';
import CTABand from '../../components/ui/CTABand';
import { services } from '../../data/services';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="What we build for our clients"
        subtitle="Four service pillars, end to end — from a first website to full operations platforms with M-Pesa, roles, and reporting built in."
      />

      <section className={styles.list}>
        <div className="container">
          {services.map((service, i) => (
            <motion.article
              key={service.slug}
              className={styles.row}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.rowMain}>
                <span className={styles.rowIndex}>0{i + 1}</span>
                <div>
                  <h2 className={styles.rowTitle}>
                    <Link to={`/services/${service.slug}`}>{service.name}</Link>
                  </h2>
                  <p className={styles.rowTag}>{service.tagline}</p>
                  <p className={styles.rowOverview}>{service.overview}</p>
                  <ul className={styles.offeringList}>
                    {service.offerings.map((o) => (
                      <li key={o.title}>{o.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to={`/services/${service.slug}`} className={styles.rowCta}>
                View Services
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.engagement}>
        <div className="container">
          <div className={styles.engagementHeader}>
            <span className="section-label">Ways to Work With Us</span>
            <h2 className="section-title">
              Engagement <span className="gradient-text">models</span>
            </h2>
            <p className="section-subtitle">
              Every engagement is scoped honestly — pick the model that fits, or tell us the outcome and we will recommend one.
            </p>
          </div>
          <EngagementModels />
        </div>
      </section>

      <CTABand />
    </>
  );
}
