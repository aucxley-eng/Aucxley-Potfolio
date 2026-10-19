import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import CTABand from '../../components/ui/CTABand';
import CaseStudyCard from '../../components/ui/CaseStudyCard';
import TechChips from '../../components/ui/TechChips';
import { getCaseStudyBySlug, caseStudies } from '../../data/caseStudies';
import styles from './CaseStudyPage.module.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) return <Navigate to="/work" replace />;

  const related = caseStudies
    .filter((c) => c.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <PageHeader
        label={study.client}
        title={study.title}
        subtitle={study.subtitle}
      >
        <div className={styles.meta}>
          <div className={styles.tags}>
            {study.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.actions}>
            {study.demoKey && (
              <Link
                to={`/contact?request=demo&product=${encodeURIComponent(study.title)}`}
                className={styles.primaryBtn}
              >
                Request a Demo
              </Link>
            )}
            {study.demoKey && (
              <Link to={`/demo/${study.demoKey}`} className={styles.secondaryBtn}>
                Open Interactive Demo
              </Link>
            )}
            {study.liveUrl && (
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                Visit Live Site
              </a>
            )}
          </div>
        </div>
      </PageHeader>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.columns}>
            <div className={styles.main}>
              <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.blockTitle}>The Challenge</h2>
                <p className={styles.blockText}>{study.challenge}</p>
              </motion.div>

              <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.blockTitle}>What We Built</h2>
                <p className={styles.blockText}>{study.solution}</p>
                <ul className={styles.highlights}>
                  {study.highlights.map((h) => (
                    <li key={h}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.blockTitle}>Modules</h2>
                <div className={styles.modules}>
                  {study.modules.map((mod) => (
                    <div key={mod.name} className={styles.module}>
                      <h3 className={styles.moduleName}>{mod.name}</h3>
                      <p className={styles.moduleDesc}>{mod.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {study.tutorial && (
                <motion.div
                  className={styles.block}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.tutorialHeader}>
                    <span className="section-label">Guided Walkthrough</span>
                    <h2 className={styles.blockTitle}>{study.tutorial.title}</h2>
                    <p className={styles.blockText}>{study.tutorial.intro}</p>
                    {study.demoKey && (
                      <Link to={`/demo/${study.demoKey}`} className={styles.tutorialCta}>
                        Open the Live Demo
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </Link>
                    )}
                  </div>

                  <ol className={styles.steps}>
                    {study.tutorial.steps.map((step, i) => (
                      <li key={step.title} className={styles.step}>
                        <div className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                        <div className={styles.stepBody}>
                          <h3 className={styles.stepTitle}>{step.title}</h3>
                          <p className={styles.stepText}>{step.body}</p>
                          <span className={styles.stepPath}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                            {step.path}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}

              <motion.div
                className={styles.block}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.blockTitle}>Architecture</h2>
                <p className={styles.blockText}>{study.architecture}</p>
                <div className={styles.techWrap}>
                  <TechChips items={study.tech} title="Technologies" />
                </div>
              </motion.div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Project facts</h3>
                <dl className={styles.facts}>
                  {study.results.map((r) => (
                    <div key={r.label} className={styles.fact}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
                {study.liveUrl && (
                  <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.sidebarLink}>
                    Visit live site &rarr;
                  </a>
                )}
                {study.demoKey && (
                  <Link
                    to={`/contact?request=demo&product=${encodeURIComponent(study.title)}`}
                    className={styles.sidebarLink}
                  >
                    Request a demo &rarr;
                  </Link>
                )}
                {study.demoKey && (
                  <Link to={`/demo/${study.demoKey}`} className={styles.sidebarLink}>
                    Launch demo &rarr;
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <div className={styles.relatedHeader}>
              <span className="section-label">More Work</span>
              <h2 className="section-title">Keep exploring</h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <CaseStudyCard key={r.slug} study={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
