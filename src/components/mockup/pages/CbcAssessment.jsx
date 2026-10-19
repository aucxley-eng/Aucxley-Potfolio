import { useState } from 'react';
import { Card, PageIntro, SimNote, Chip } from '../ui';
import { RadarChart } from '../charts';
import { cbcAssessments, competencies, rubricLevels, students, observationLog } from '../mockData';
import styles from '../DemoApp.module.css';

const DEFAULT_RECORD = (c) => ({
  code: c.code,
  level: 1,
  narrative: 'Not yet assessed this term — add notes during the next review.',
});

export default function CbcAssessment() {
  const cbcStudents = students.filter((s) => s.curriculum === 'CBC');
  const [studentId, setStudentId] = useState(cbcStudents[0].id);
  const [term, setTerm] = useState('Term 3 · 2026');
  const [saved, setSaved] = useState(true);
  const [assessments, setAssessments] = useState(() => {
    const copy = {};
    Object.keys(cbcAssessments).forEach((key) => {
      copy[key] = cbcAssessments[key].map((r) => ({ ...r }));
    });
    return copy;
  });

  const student = cbcStudents.find((s) => s.id === studentId) || cbcStudents[0];
  const records = assessments[studentId] || competencies.map(DEFAULT_RECORD);

  const values = competencies.map((c) => {
    const rec = records.find((r) => r.code === c.code);
    return rec ? rec.level : 1;
  });

  const tapLevel = (code, level) => {
    const savedId = studentId;
    const updated = records.map((r) => (r.code === code ? { ...r, level } : r));
    setAssessments((prev) => ({ ...prev, [savedId]: updated }));
    setSaved(false);
  };

  return (
    <div>
      <PageIntro
        title="CBC & competency assessment"
        desc="One observation per row — rubric level, optional score, evidence, and a comment. A competency keeps many observations across a term instead of one overwritten result. Self-Efficacy is the official curriculum term."
      />
      <SimNote />
      <div className={styles.searchRow}>
        <select className={styles.searchBox} value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
          {cbcStudents.map((s) => (
            <option key={s.id} value={s.id}>{s.name} — {s.className}</option>
          ))}
        </select>
        <select className={styles.searchBox} value={term} onChange={(e) => setTerm(e.target.value)}>
          <option>Term 1 · 2026</option>
          <option>Term 2 · 2026</option>
          <option>Term 3 · 2026</option>
        </select>
        <button className={`${styles.btn} ${styles.btnPrimary}`}>Bulk assess entire class</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Card title={`${student.name} — ${term}`}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <div className={styles.statBlock}>
              <span className={styles.statBlockLabel}>Average level</span>
              <span className={styles.statBlockValue}>
                {(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)} / 4
              </span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statBlockLabel}>Assessed</span>
              <span className={styles.statBlockValue}>7 / 7 competencies</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statBlockLabel}>Curriculum mode</span>
              <span className={styles.statBlockValue}>CBC</span>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="7-core competency profile (radar)">
          <RadarChart values={values} labels={competencies.map((c) => c.code)} />
        </Card>
        <Card title="Rubric levels — tap to change">
          <div className={styles.legend} style={{ marginBottom: '0.6rem' }}>
            {rubricLevels.map((r) => (
              <div key={r.level} className={styles.legendItem}>
                <span className={styles.legendSwatch} style={{ background: r.level === 4 ? '#22c55e' : r.level === 3 ? '#2563eb' : r.level === 2 ? 'var(--secondary)' : '#ef4444' }} />
                Lv {r.level} — {r.name}
              </div>
            ))}
          </div>
          <div>
            {records.map((rec) => (
              <div className={styles.cbcRow} key={rec.code}>
                <span className={styles.cbcCode}>{rec.code}</span>
                <div>
                  <div className={styles.cbcName}>
                    {competencies.find((c) => c.code === rec.code)?.name}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                    {rec.narrative}
                  </div>
                </div>
                <div className={styles.levelPicker}>
                  {[1, 2, 3, 4].map((lvl) => (
                    <button
                      key={lvl}
                      className={`${styles.levelOpt} ${rec.level === lvl ? styles.on : ''}`}
                      onClick={() => tapLevel(rec.code, lvl)}
                    >
                      {rubricLevels.find((r) => r.level === lvl).mark}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setSaved(true)}>
          {saved ? 'Save assessments' : 'Save assessments (unsaved changes)'}
        </button>
        <button className={styles.btn}>Generate report card (PDF)</button>
        <button className={styles.btn}>Publish &amp; send SMS results</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Card title="Observations this term — evidence per row">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '560px' }}>
              <thead><tr><th>Learner</th><th>Competency</th><th>Observations</th><th>Evidence</th><th>Last</th></tr></thead>
              <tbody>
                {observationLog.map((o, i) => (
                  <tr key={i}>
                    <td className={styles.tdStrong}>{o.learner}</td>
                    <td className={styles.mono}>{o.competency}</td>
                    <td>{o.observations}</td>
                    <td>{o.lastEvidence === '— pending'
                      ? <Chip tone="warn">No evidence yet</Chip>
                      : <Chip tone="ok">{o.lastEvidence}</Chip>}</td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Card title="Dual-curriculum support">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            This school runs CBC for most grades. A small tail of upper classes still finish the legacy 8-4-4. The system
            detects a learner's curriculum and renders the matching report card format automatically — rubric levels for CBC
            students, percentage/grades for 8-4-4 students.
          </p>
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            {cbcStudents.map((s) => <span className={styles.pill} key={s.id}>{s.name}</span>)}
          </div>
          <div style={{ marginTop: '0.9rem' }}>
            <Chip tone="neut">Assessment schemes are versioned; report templates are approved against KICD guidance before publish</Chip>
          </div>
        </Card>
      </div>
    </div>
  );
}