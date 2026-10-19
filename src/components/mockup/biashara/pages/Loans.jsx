import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { loans } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Loans() {
  const outstanding = loans.reduce((s, l) => s + l.balance, 0);
  const overdue = loans.filter((l) => l.status === 'Overdue');
  const overdueAmt = overdue.reduce((s, l) => s + l.balance, 0);
  const repaid = loans.reduce((s, l) => s + l.paid, 0);

  return (
    <div>
      <PageIntro
        title="Loans — 5% book, KES 50 per 1,000"
        desc="Customers buy on a small credit book: for every KES 1,000 lent, the customer repays KES 1,050. Repayments come in via M-Pesa and are auto-matched to the right loan — no ledger arithmetic by hand."
      />
      <SimNote />

      <div className={styles.twoCol}>
        <Card title="The rule">
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>Example</span>
            <span className={styles.statBlockValue} style={{ fontSize: '1.1rem' }}>KES 20,000 → repay 21,000</span>
            <span className={styles.statBlockSub}>Interest of KES 1,000 = 20 × 50 (5% flat on the principal, due with the capital)</span>
          </div>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '300px' }}>
              <thead><tr><th>Lent</th><th>Repaid per KES 1,000</th></tr></thead>
              <tbody>
                <tr><td className={styles.mono}>KES 5,000</td><td className={styles.amount}>KES 5,250</td></tr>
                <tr><td className={styles.mono}>KES 10,000</td><td className={styles.amount}>KES 10,500</td></tr>
                <tr><td className={styles.mono}>KES 25,000</td><td className={styles.amount}>KES 26,250</td></tr>
                <tr><td className={styles.mono}>KES 40,000</td><td className={styles.amount}>KES 42,000</td></tr>
              </tbody>
            </table>
          </div>
          <Chip tone="warn">No manual balance edits — every repayment reduces the balance, never an export and a correction.</Chip>
        </Card>

        <Card title="Loan book health" action={<Chip tone={overdue.length ? 'bad' : 'ok'}>{overdue.length} overdue</Chip>}>
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>Outstanding across all loans</span>
            <span className={styles.statBlockValue}>{k(outstanding)}</span>
            <span className={styles.statBlockSub}>of {k(loans.reduce((s, l) => s + l.principal, 0))} lent</span>
          </div>
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>Repaid so far</span>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{k(repaid)}</span>
            <span className={styles.statBlockSub}>Includes interest</span>
          </div>
          {overdue.length > 0 && (
            <div className={styles.feed}>
              {overdue.map((l) => (
                <div key={l.ref} className={styles.feedItem}>
                  <span className={`${styles.feedDot} ${styles.bad}`} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.feedText}>{l.customer} — {l.balance.toLocaleString()} owed, {l.due}. Slips to the SMS reminder queue.</div>
                  </div>
                  <button className={styles.btn} style={{ padding: '0.35rem 0.75rem' }}>Remind</button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Active loans">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '680px' }}>
            <thead><tr><th>Ref</th><th>Customer</th><th>Principal</th><th>Rate</th><th>Repayable</th><th>Paid</th><th>Balance</th><th>Due</th><th>Status</th></tr></thead>
            <tbody>
              {loans.map((l) => (
                <tr key={l.ref}>
                  <td className={styles.mono}>{l.ref}</td>
                  <td className={styles.tdStrong}>{l.customer}</td>
                  <td className={styles.amount}>{k(l.principal)}</td>
                  <td style={{ fontSize: '0.76rem' }}>{l.rate}</td>
                  <td className={styles.amount}>{k(l.repayable)}</td>
                  <td className={styles.amount} style={{ color: '#16a34a' }}>{k(l.paid)}</td>
                  <td className={`${styles.amount} ${l.balance > 0 ? styles.amountNeg : ''}`}>{k(l.balance)}</td>
                  <td>{l.due}</td>
                  <td>
                    {l.status === 'Settled' ? <Chip tone="okSolid">{l.status}</Chip>
                      : l.status === 'Overdue' ? <Chip tone="bad">{l.status}</Chip>
                      : <Chip tone="ok">{l.status}</Chip>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <Chip tone="neut">KES {overdueAmt.toLocaleString()} overdue across {overdue.length} loans — reminder SMS goes out automatically tomorrow 08:00.</Chip>
        </div>
      </Card>
    </div>
  );
}