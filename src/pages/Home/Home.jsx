import Hero from '../../components/projects/Hero/Hero';
import CaseStudyCard from '../../components/ui/CaseStudyCard';
import CTABand from '../../components/ui/CTABand';
import ClientMarquee from '../../components/ui/ClientMarquee';
import ServicePillars from '../../components/sections/ServicePillars/ServicePillars';
import WhyChooseUsSection from '../../components/sections/WhyChooseUsSection/WhyChooseUsSection';
import ProcessSection from '../../components/sections/ProcessSection/ProcessSection';
import StatsBand from '../../components/sections/StatsBand/StatsBand';
import TechChips from '../../components/ui/TechChips';
import { getFeaturedCaseStudies } from '../../data/caseStudies';
import { techStack } from '../../data/company';
import { motion } from 'framer-motion';
import styles from './Home.module.css';

export default function Home() {
  const featured = getFeaturedCaseStudies();

  return (
    <>
      <Hero />

      <section className={styles.workSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Our Work</span>
            <h2 className="section-title">
              Here is a snapshot of our <span className="gradient-text">engineering</span>
            </h2>
            <p className="section-subtitle">
              Live platforms and interactive systems that show how we think about real business problems.
            </p>
          </motion.div>

          <div className={styles.workGrid}>
            {featured.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} large={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <ServicePillars />
      <StatsBand />
      <WhyChooseUsSection />
      <ProcessSection />
      <ClientMarquee />

      <section className={styles.techSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TechChips items={techStack} />
          </motion.div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
