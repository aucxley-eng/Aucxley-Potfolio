import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { cashRecap, ownerDraw, ledger } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Cash() {
  const expectedTotal = cashRecap.expected.reduce((s, r) => s + r.amount, 0);
  const countedValue = cashRecap.counted.reduce((s, c) => {
    const value = parseInt(c.denom.replace(/[^0-9]/g, ''), 10) || 0;
    return s + value * c.count;
  }, 0);
  const variance = countedValue - expectedTotal;
  const short = variance < 0;

  return (
    <div>
      <PageIntro
        title="Cash & ledger — leak detection"
        desc="Expected money is built from records: opening float + recorded cash sales − recorded cash paid out. The counted drawer is the reality. A difference is a leak to investigate, never a silent write-off."
      />
      <SimNote />

      <div className={styles.twoCol}>
        <Card title="Cash count — expected vs counted" action={<Chip tone={short ? 'bad' : 'ok'}>{short ? 'Short by ' + Math.abs(variance).toLocaleString() : 'Matches'}</Chip>}>
          <div className={styles.statBlock} style={{ marginBottom: '0.7rem' }}>
            <span className={styles.statBlockLabel}>{cashRecap.asOf}</span>
            <span className={styles.statBlockValue} style={{ color: short ? '#dc2626' : '#16a34a' }}>{k(countedValue)}</span>
            <span className={styles.statBlockSub}>Counted · expected {k(expectedTotal)}</span>
          </div>
          <div className={styles.grid2} style={{ gap: '1rem' }}>
            <div>
              <div className={styles.feed}>
                {cashRecap.expected.map((r) => (
                  <div key={r.line} className={styles.feedItem}>
                    <span className={styles.feedDot} />
                    <div style={{ flex: 1 }}>
                      <div className={styles.feedText}>{r.line}</div>
                    </div>
                    <span className={styles.feedTime}>{k(r.amount)}</span>
                  </div>
                ))}
                <div className={styles.feedItem}>
                  <span className={styles.feedDot} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.feedText}><strong>Expected drawer</strong></div>
                  </div>
                  <span className={styles.feedTime}>{k(expectedTotal)}</span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.feed}>
                {cashRecap.counted.map((c) => (
                  <div key={c.denom} className={styles.feedItem}>
                    <span className={styles.feedDot} />
                    <div style={{ flex: 1 }}>
                      <div className={styles.feedText}>{c.denom}</div>
                    </div>
                    <span className={styles.feedTime}>×{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Chip tone="warn">The count is KES 200 short of expectation — flagged to the leak queue for a drawer review, not swept under the float.</Chip>
        </Card>

        <Card title="Owner draw vs business money" action={<Chip tone="ok">Separation intact</Chip>}>
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>Owner draw this month</span>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>{k(ownerDraw.thisMonth)}</span>
            <span className={styles.statBlockSub}>Cap {k(ownerDraw.cap)} · year to date {k(ownerDraw.ytd)}</span>
          </div>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '380px' }}>
              <thead><tr><th>Date</th><th>Note</th><th>Amount</th></tr></thead>
              <tbody>
                {ownerDraw.records.map((r) => (
                  <tr key={r.date + r.note}>
                    <td className={styles.mono}>{r.date}</td>
                    <td style={{ fontSize: '0.78rem' }}>{r.note}</td>
                    <td className={`${styles.amount} ${styles.amountNeg}`}>{k(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Chip tone="neut">Draws hit the Owner Draw account; business bank, M-Pesa and drawer cash are never reduced silently.</Chip>
        </Card>
      </div>

      <Card title="General ledger — money in, money out" action={<Chip tone="neut">Every movement has a counterpart</Chip>}>
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '640px' }}>
            <thead><tr><th>Date</th><th>Description</th><th>Account</th><th>In</th><th>Out</th></tr></thead>
            <tbody>
              {ledger.map((l, i) => (
                <tr key={i}>
                  <td className={styles.mono}>{l.date}</td>
                  <td className={styles.tdStrong} style={{ maxWidth: '260px' }}>{l.desc}</td>
                  <td>{l.account}</td>
                  <td className={styles.amount} style={{ color: '#16a34a' }}>{l.inflow ? `+ ${k(l.inflow)}` : '—'}</td>
                  <td className={styles.amount} style={{ color: '#dc2626' }}>{l.outflow ? `− ${k(l.outflow)}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <Chip tone="neut">Sales and loan repayments enter against the matching account; owner draws and purchases are always explicit.</Chip>
        </div>
      </Card>
    </div>
  );
}