import { Card, PageIntro, SimNote, Chip } from '../ui';
import { stock } from '../mockData';
import styles from '../DemoApp.module.css';

const FLOW = ['Purchase request', 'Approval', 'Purchase order', 'Goods received', 'Issue', 'Physical count'];

const stageTone = (stage) => {
  if (stage === 'Approved' || stage === 'Issued to class' || stage === 'Submitted') return 'ok';
  return 'warn';
};

export default function Stock() {
  return (
    <div>
      <PageIntro
        title="Stock & uniforms"
        desc="Storekeepers receive, issue, count, and request supplies. Every movement preserves who authorised it and who performed it. A uniform order, a payment, and actual collection are separate events."
      />
      <SimNote />
      <div className={styles.flowStrip}>
        {FLOW.map((step, i) => (
          <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className={styles.flowStep}><strong>{step}</strong></span>
            {i < FLOW.length - 1 && <span className={styles.flowArrow}>→</span>}
          </span>
        ))}
      </div>

      <Card title="Movement pipeline">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table}>
            <thead><tr><th>Document</th><th>Item</th><th>Qty</th><th>Requested by</th><th>Stage</th></tr></thead>
            <tbody>
              {stock.pipeline.map((s) => (
                <tr key={s.no}>
                  <td className={styles.mono}>{s.no}</td>
                  <td className={styles.tdStrong}>{s.item}</td>
                  <td>{s.qty}</td>
                  <td>{s.by}</td>
                  <td><Chip tone={stageTone(s.stage)}>{s.stage}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>New purchase request</button>
          <button className={styles.btn}>Receive goods</button>
          <button className={styles.btn}>Issue stock</button>
          <button className={styles.btn}>Start physical count</button>
        </div>
      </Card>

      <div className={styles.grid2}>
        <Card title="Stock levels" action={<Chip tone="warn">3 below reorder</Chip>}>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '420px' }}>
              <thead><tr><th>Item</th><th>Available</th><th>Reorder level</th><th>Status</th></tr></thead>
              <tbody>
                {stock.items.map((it) => (
                  <tr key={it.item}>
                    <td className={styles.tdStrong}>{it.item}</td>
                    <td>{it.available} {it.unit}{it.available !== 1 ? 's' : ''}</td>
                    <td>{it.reorderLevel}</td>
                    <td>{it.status === 'ok' ? <Chip tone="ok">Healthy</Chip> : <Chip tone="warn">Reorder soon</Chip>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Physical count variances" action={<Chip tone="warn">1 variance</Chip>}>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '420px' }}>
              <thead><tr><th>Item</th><th>Counted</th><th>System</th><th>Variance</th><th>Who</th></tr></thead>
              <tbody>
                {stock.counts.map((c) => (
                  <tr key={c.item}>
                    <td className={styles.tdStrong}>{c.item}</td>
                    <td>{c.counted}</td>
                    <td>{c.system}</td>
                    <td className={c.variance < 0 ? styles.amountNeg : styles.amount}>
                      {c.variance > 0 ? '+' : ''}{c.variance}
                    </td>
                    <td>{c.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="warn">Cement shows −1 vs system — count reviewed and adjustment requires a second staff approval</Chip>
          </div>
        </Card>
      </div>
    </div>
  );
}