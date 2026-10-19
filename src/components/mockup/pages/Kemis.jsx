import { Card, PageIntro, SimNote, Chip } from '../ui';
import { kemis, classes, students } from '../mockData';
import styles from '../DemoApp.module.css';

export default function Kemis() {
  return (
    <div>
      <PageIntro
        title="KEMIS compliance (was NEMIS)"
        desc="Kenya Education Management Information System — the ministry-mandated annual data capture. From Jan 2026, schools must report through KEMIS; we build the export engine and validate every record before submission."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Submission window">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>31 Jan 2026</span>
            <span className={styles.statBlockSub}>Statutory deadline</span>
          </div>
        </Card>
        <Card title="Readiness">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{kemis.readiness}%</span>
            <span className={styles.statBlockSub}>360 records complete enough</span>
          </div>
        </Card>
        <Card title="Errors blocking export">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#dc2626' }}>{kemis.errors}</span>
            <span className={styles.statBlockSub}>Fix these before generating the file</span>
          </div>
        </Card>
        <Card title="Last submission">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>2025 (NEMIS)</span>
            <span className={styles.statBlockSub}>Accepted 1 Feb 2026</span>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Required fields — capture progress">
          {kemis.fields.map((f) => (
            <div className={styles.progressRow} key={f.name}>
              <span className={styles.progressLabel}>{f.name}</span>
              <div className={styles.progress}>
                <div className={styles.progressFill} style={{ width: `${f.pct}%` }} />
              </div>
              <span className={styles.progressMeta}>{f.pct}%</span>
            </div>
          ))}
        </Card>
        <Card title="Validation errors">
          <div className={styles.stack}>
            {kemis.issues.map((issue, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles.bad}`} />
                <div>
                  <div className={styles.feedText}>{issue.msg}</div>
                  <div className={styles.feedTime}>{issue.ref}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>Re-validate</button>
              <button className={styles.btn}>Download error list</button>
            </div>
          </div>
        </Card>
      </div>

      <Card title={`Per-class capture status (${classes.length} classes · ${students.length} shown)`}>
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '560px' }}>
            <thead><tr><th>Class</th><th>Enrolled</th><th>With ULI</th><th>Birth cert</th><th>County codes</th><th>Status</th></tr></thead>
            <tbody>
              {classes.slice(0, 6).map((c) => {
                const withUli = 40 + (c.id * 7) % 3;
                const cert = 36 + (c.id * 5) % 6;
                return (
                  <tr key={c.id}>
                    <td className={styles.tdStrong}>{c.grade}-{c.stream}</td>
                    <td>{42 + (c.id % 5)}</td>
                    <td>{withUli}</td>
                    <td>{cert}</td>
                    <td>{42 + (c.id % 5)}</td>
                    <td>
                      {withUli < 41 ? <Chip tone="warn">Almost ready</Chip> : <Chip tone="ok">Ready</Chip>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Generate the KEMIS export file — one click:</span>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Generate KEMIS export (.xml)</button>
        </div>
      </Card>
    </div>
  );
}