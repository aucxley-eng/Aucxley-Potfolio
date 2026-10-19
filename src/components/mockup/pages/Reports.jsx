import { Card, PageIntro, SimNote, Chip } from '../ui';
import { BarChart } from '../charts';
import { reportData, students } from '../mockData';
import styles from '../DemoApp.module.css';

export default function Reports() {
  const cbcStudent = students.find((s) => s.name === 'Amani Ochieng');

  return (
    <div>
      <PageIntro
        title="Report cards & analytics"
        desc="Per-learner report cards plus school-wide analytics, exportable to PDF/CSV for KEMIS and the BOM."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Report cards">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{reportData.reportCards}</span>
            <span className={styles.statBlockSub}>Generated this term</span>
          </div>
        </Card>
        <Card title="AI narratives">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>Drafting enabled</span>
            <span className={styles.statBlockSub}>Guided, but teacher always reviews before publish</span>
          </div>
        </Card>
        <Card title="Term">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>Term 3 · 2026</span>
            <span className={styles.statBlockSub}>Report date: 23 Nov 2026</span>
          </div>
        </Card>
        <Card title="Outputs">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>PDF · CSV</span>
            <span className={styles.statBlockSub}>Per learner or whole class</span>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title={`CBC report card — ${cbcStudent.name}`}>
          <div className={styles.stack}>
            <div className={styles.statBlock}>
              <span className={styles.statBlockLabel}>Competency average</span>
              <span className={styles.statBlockValue}>3.4 / 4</span>
              <span className={styles.statBlockSub}>Grade 4-A · ULI {cbcStudent.uli}</span>
            </div>
            {reportData.columns.map((col) => (
              <div className={styles.progressRow} key={col.name}>
                <span className={styles.progressLabel}>{col.name}</span>
                <div className={styles.progress}>
                  <div className={styles.progressFill} style={{ width: `${col.pct}%` }} />
                </div>
                <span className={styles.progressMeta}>{col.score}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
              <Chip tone="okSolid">Above expectation</Chip>
              <Chip tone="ok">Progressing well</Chip>
              <Chip tone="warn">Working towards</Chip>
            </div>
          </div>
        </Card>
        <Card title="School-wide competency distribution">
          <BarChart height={200} data={reportData.distribution.map((d) => ({ label: d.label, value: d.value }))} />
          <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Most Grade 3–6 learners sit at levels 3–4. The Term 1 review focuses on the small group still at levels 1–2.
          </div>
        </Card>
      </div>

      <Card title="Report approvals">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '620px' }}>
            <thead><tr><th>Document</th><th>Class / scope</th><th>Submitted</th><th>By</th><th>Status</th></tr></thead>
            <tbody>
              {reportData.approvals.map((a) => (
                <tr key={a.doc}>
                  <td className={styles.tdStrong}>{a.doc}</td>
                  <td>{a.class}</td>
                  <td className={styles.mono}>{a.submitted}</td>
                  <td>{a.by}</td>
                  <td>
                    {a.status === 'Approved' && <Chip tone="ok">{a.status}</Chip>}
                    {a.status === 'Awaiting approval' && <Chip tone="warn">{a.status}</Chip>}
                    {a.status === 'Returned for edit' && <Chip tone="bad">{a.status}</Chip>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Export options">
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Whole-class report cards, national exam prep lists, and term statistics export straight to PDF or CSV.
            </span>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className={styles.btn}>Export CSV</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>Generate PDF pack</button>
            </div>
          </div>
        </Card>
    </div>
  );
}