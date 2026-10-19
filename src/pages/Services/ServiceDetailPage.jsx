import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import CTABand from '../../components/ui/CTABand';
import CaseStudyCard from '../../components/ui/CaseStudyCard';
import TechChips from '../../components/ui/TechChips';
import { getServiceBySlug, services } from '../../data/services';
import { getCaseStudyBySlug } from '../../data/caseStudies';
import { techStack } from '../../data/company';
import styles from './ServiceDetailPage.module.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const related = service.relatedWork
    .map((s) => getCaseStudyBySlug(s))
    .filter(Boolean);

  return (
    <>
      <PageHeader
        label="Services"
        title={service.name}
        subtitle={service.tagline}
      >
        <p className={styles.lead}>{service.overview}</p>
      </PageHeader>

      <section className={styles.offerings}>
        <div className="container">
          {service.offerings.map((offering, i) => (
            <motion.div
              key={offering.title}
              className={styles.offering}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className={styles.offeringTitle}>{offering.title}</h2>
              <p className={styles.offeringDesc}>{offering.description}</p>
              <ul className={styles.points}>
                {offering.points.map((p) => (
                  <li key={p}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <div className={styles.relatedHeader}>
              <span className="section-label">Related Work</span>
              <h2 className="section-title">
                See it <span className="gradient-text">in action</span>
              </h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.tech}>
        <div className="container">
          <TechChips items={techStack} />
        </div>
      </section>

      <section className={styles.allServices}>
        <div className="container">
          <h2 className={styles.allTitle}>Other services</h2>
          <div className={styles.allGrid}>
            {services.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className={styles.allCard}>
                <span className={styles.allName}>{s.name}</span>
                <span className={styles.allTag}>{s.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Ready to talk about ${service.name.toLowerCase()}?`}
        subtitle="Tell us what you need — we will come back with a clear plan, timeline, and pricing."
      />
    </>
  );
}
