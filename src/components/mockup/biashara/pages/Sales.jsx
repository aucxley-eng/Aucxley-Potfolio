import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { sales, customers, bizSummary } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Sales() {
  const autoCount = sales.filter((s) => s.capture.startsWith('Auto')).length;
  const totalSpent = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div>
      <PageIntro
        title="Sales & customers"
        desc="Every sale and its payment. M-Pesa sales are matched automatically — the payment arrives and the sale appears with the amount attached. Complete customer purchase history is one tap away."
      />
      <SimNote />

      <div className={styles.statGrid}>
        <Card title="Today's revenue">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{k(bizSummary.todaySales)}</span>
            <span className={styles.statBlockSub}>Auto-matched: {k(50000)} of it</span>
          </div>
        </Card>
        <Card title="This month">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{k(bizSummary.monthRevenue)}</span>
            <span className={styles.statBlockSub}>Up 12% vs August</span>
          </div>
        </Card>
        <Card title="Auto-captured">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>{autoCount} of {sales.length}</span>
            <span className={styles.statBlockSub}>No typing for M-Pesa sales above</span>
          </div>
        </Card>
        <Card title="Customer lifetime value">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{k(Math.round(totalSpent / customers.length))}</span>
            <span className={styles.statBlockSub}>Average across {customers.length} tracked customers</span>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="Recent sales">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '460px' }}>
              <thead><tr><th>Sale</th><th>Customer</th><th>Items</th><th>Amount</th><th>Capture</th></tr></thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.mono}>{s.id}</div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>{s.time} · {s.method}</div>
                    </td>
                    <td className={styles.tdStrong}>{s.customer}</td>
                    <td style={{ fontSize: '0.78rem', maxWidth: '200px' }}>{s.items}</td>
                    <td className={styles.amount}>{k(s.amount)}</td>
                    <td>
                      {s.capture.startsWith('Auto')
                        ? <Chip tone="okSolid">{s.capture}</Chip>
                        : <Chip tone="warn">{s.capture}</Chip>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="neut">A sale is a record; its payment is matched separately. Cash sales are typed, M-Pesa sales are captured.</Chip>
          </div>
        </Card>

        <Card title="Customers — full purchase history">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '440px' }}>
              <thead><tr><th>Customer</th><th>Orders</th><th>Total spent</th><th>Last purchase</th><th>Notes</th></tr></thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.name}>
                    <td>
                      <div className={styles.tdStrong}>{c.name}</div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>{c.phone}</div>
                    </td>
                    <td>{c.orders}</td>
                    <td className={styles.amount}>{k(c.totalSpent)}</td>
                    <td>{c.lastPurchase}</td>
                    <td style={{ fontSize: '0.76rem', maxWidth: '160px' }}>
                      {c.notes}{c.loan && <div style={{ marginTop: '0.2rem' }}><Chip tone="warn">{c.loan}</Chip></div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="neut">History drives repeat sales — the last sofa re-buy came from a "recent customers" reminder.</Chip>
          </div>
        </Card>
      </div>
    </div>
  );
}