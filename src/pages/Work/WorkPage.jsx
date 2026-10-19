import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import CaseStudyCard from '../../components/ui/CaseStudyCard';
import CTABand from '../../components/ui/CTABand';
import { caseStudies } from '../../data/caseStudies';
import styles from './WorkPage.module.css';

const allTags = [...new Set(caseStudies.flatMap((c) => c.tags))];

export default function WorkPage() {
  const [filter, setFilter] = useState('');

  const visible = filter
    ? caseStudies.filter((c) => c.tags.includes(filter))
    : caseStudies;

  return (
    <>
      <PageHeader
        label="Our Work"
        title="Case studies & product systems"
        subtitle="Real client platforms and interactive systems we have designed and engineered — including live demos you can explore right now."
      />

      <section className={styles.work}>
        <div className="container">
          <div className={styles.filters}>
            <button
              className={`${styles.filterChip} ${filter === '' ? styles.active : ''}`}
              onClick={() => setFilter('')}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`${styles.filterChip} ${filter === tag ? styles.active : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visible.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want results like these?"
        subtitle="Tell us about your project — we will show you how we would approach it."
      />
    </>
  );
}
