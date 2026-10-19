import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { boms, workOrders } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

const FLOW = ['Raw material', 'Work order', 'Finished good', 'Sell'];

export default function Manufacturing() {
  return (
    <div>
      <PageIntro
        title="Manufacturing — raw materials to finished goods"
        desc="Restoration is manufacturing: buy low (auctions, trade-ins), add material and labour, sell at a bumper margin. A bill of materials states what one finished unit really costs; work orders consume and convert it."
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

      <Card title="Work orders in flight" action={<Chip tone="warn">{workOrders.filter((w) => w.stage !== 'Completed').length} open</Chip>}>
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '620px' }}>
            <thead><tr><th>Work order</th><th>Product</th><th>Qty</th><th>Materials</th><th>Labour</th><th>Total cost</th><th>Stage</th><th>ETA</th></tr></thead>
            <tbody>
              {workOrders.map((w) => (
                <tr key={w.no}>
                  <td className={styles.mono}>{w.no}<div style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>{w.source}</div></td>
                  <td className={styles.tdStrong}>{w.product}</td>
                  <td>{w.qty}</td>
                  <td className={styles.amount}>{k(w.materials)}</td>
                  <td className={styles.amount}>{k(w.labor)}</td>
                  <td className={styles.amount}>{k(w.materials + w.labor)}</td>
                  <td>
                    {w.stage === 'Completed' ? <Chip tone="okSolid">{w.stage}</Chip>
                      : w.stage === 'Awaiting materials' ? <Chip tone="bad">{w.stage}</Chip>
                      : w.stage === 'Quality check' ? <Chip tone="neut">{w.stage}</Chip>
                      : <Chip tone="warn">{w.stage}</Chip>}
                  </td>
                  <td>{w.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <Chip tone="warn">WO-115 is waiting on timber — the foam order (PO-203) is shared with the upholstery line, so one restock feeds both.</Chip>
        </div>
      </Card>

      <div className={styles.grid3}>
        {boms.map((b) => (
          <Card key={b.product} title={b.product} action={<Chip tone="ok">Margin {b.marginPct}%</Chip>}>
            <div className={styles.statBlock} style={{ marginBottom: '0.7rem' }}>
              <span className={styles.statBlockLabel}>Cost {k(b.totalCost)} · sells at {k(b.sellPrice)}</span>
              <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{k(b.sellPrice - b.totalCost)}</span>
              <span className={styles.statBlockSub}>Profit per unit · {b.cycle} {b.cycleUnit} cycle</span>
            </div>
            <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
              <table className={styles.table} style={{ minWidth: '220px' }}>
                <thead><tr><th>Input</th><th>Qty</th></tr></thead>
                <tbody>
                  {b.materials.map((m) => (
                    <tr key={m.name}>
                      <td style={{ fontSize: '0.78rem' }}>{m.name}</td>
                      <td className={styles.mono}>{m.qty} {m.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Chip tone="neut">{b.status}</Chip>
          </Card>
        ))}
      </div>
    </div>
  );
}