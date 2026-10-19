import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { purchases } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Purchases() {
  const total = purchases.reduce((s, p) => s + p.amount, 0);
  const open = purchases.filter((p) => p.status !== 'Received').length;

  return (
    <div>
      <PageIntro
        title="Purchases & restocking"
        desc="Everything the business buys — auction lots, raw materials and finished stock. Each purchase feeds inventory automatically, and a flagged low stock level becomes a restock order instead of a forgotten gap."
      />
      <SimNote />

      <div className={styles.statGrid}>
        <Card title="Open purchase orders">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>{open}</span>
            <span className={styles.statBlockSub}>{total.toLocaleString()} orders tracked this month</span>
          </div>
        </Card>
        <Card title="Spend this month">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{k(total)}</span>
            <span className={styles.statBlockSub}>Stock, materials, auction lots</span>
          </div>
        </Card>
        <Card title="Bought-to-restore">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>12 units</span>
            <span className={styles.statBlockSub}>PO-201 auction batch · avg 8,000 → sells ~3×</span>
          </div>
        </Card>
        <Card title="Sourcing channel">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>Live</span>
            <span className={styles.statBlockSub}>Auctions · trade-ins · surplus yards · direct</span>
          </div>
        </Card>
      </div>

      <Card title="Purchase orders" action={<Chip tone="warn">{open} awaiting delivery</Chip>}>
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '640px' }}>
            <thead><tr><th>PO</th><th>Supplier</th><th>Item</th><th>Qty</th><th>Amount</th><th>Placed</th><th>Status</th></tr></thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.po}>
                  <td className={styles.mono}>{p.po}</td>
                  <td className={styles.tdStrong}>{p.supplier}</td>
                  <td style={{ fontSize: '0.78rem', maxWidth: '220px' }}>
                    {p.item}
                    {p.note && <div style={{ color: 'var(--text-tertiary)', marginTop: '0.15rem' }}>{p.note}</div>}
                  </td>
                  <td className={styles.mono}>{p.qty}</td>
                  <td className={styles.amount}>{k(p.amount)}</td>
                  <td>{p.date}</td>
                  <td>
                    {p.status === 'Received' ? <Chip tone="okSolid">{p.status}</Chip>
                      : p.status === 'In transit' ? <Chip tone="warn">{p.status}</Chip>
                      : <Chip tone="bad">{p.status}</Chip>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <Chip tone="neut">One foam roll restock (PO-203) feeds both the mattress line and the upholstery line — purchasing plans for shared raw materials.</Chip>
        </div>
      </Card>
    </div>
  );
}