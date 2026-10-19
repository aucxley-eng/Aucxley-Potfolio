import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import CTABand from '../../components/ui/CTABand';
import TechChips from '../../components/ui/TechChips';
import ProcessSection from '../../components/sections/ProcessSection/ProcessSection';
import { company, techStack, stats } from '../../data/company';
import styles from './AboutPage.module.css';

const values = [
  {
    title: 'Engineering that holds up',
    body: 'We design for production from the first commit — relational data models, transactional payments, role-based access, and infrastructure that works when the network does not.',
  },
  {
    title: 'Context before code',
    body: 'Before we write a line, we learn how your school, shop, or company actually runs. The software bends to your processes — not the other way around.',
  },
  {
    title: 'Show, do not tell',
    body: 'Interactive demos and MVPs come before big commitments. You see the system working before you pay for the full build.',
  },
  {
    title: 'Partnership after launch',
    body: 'Launch is a milestone, not the finish line. We stay close with monitoring, updates, and improvements as your business grows.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Us"
        title="A technology studio built for African business"
        subtitle={company.description}
      />

      <section className={styles.story}>
        <div className="container">
          <motion.div
            className={styles.storyGrid}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h2 className={styles.storyTitle}>Who we are</h2>
              <p className={styles.storyText}>
                Aucxley Solutions is a full-stack technology studio based in {company.location}.
                We partner with SMEs, schools, and growing companies that need more than a
                brochure website — businesses that need systems: e-commerce that takes M-Pesa,
                management platforms that replace paper ledgers, and school operations software
                that connects every department to one learner record.
              </p>
              <p className={styles.storyText}>
                We are deliberately small and deeply technical. That means you work directly with
                the people designing and building your system — no account-manager telephone game,
                no offshore handoff. From discovery to launch, the team that understands your
                problem is the team that ships the solution.
              </p>
              <p className={styles.storyText}>
                Our work is already live in the market — Coastline Motors runs its digital showroom
                on what we built — and our product systems, SchoolHub and Biashara, are available
                as interactive demos so you can see exactly how we think before you commit.
              </p>
            </div>
            <div className={styles.storyAside}>
              <div className={styles.statCard}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className="section-label">What We Believe</span>
            <h2 className="section-title">
              Principles that shape <span className="gradient-text">every build</span>
            </h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueBody}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className={styles.tech}>
        <div className="container">
          <div className={styles.techHeader}>
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">
              Technologies <span className="gradient-text">we work with</span>
            </h2>
            <p className="section-subtitle">
              Our stack adapts to the project — from React frontends to Django backends,
              PostgreSQL data models, and M-Pesa integrations.
            </p>
          </div>
          <TechChips items={techStack} title="" />
        </div>
      </section>

      <CTABand
        title="Let’s have coffee. Get in touch."
        subtitle="Whether you know exactly what you need or you are still figuring it out — we would love to hear what you are building."
      />
    </>
  );
}
