import { Card, PageIntro, SimNote, Chip } from '../ui';
import { portalChild, receipts } from '../mockData';
import styles from '../DemoApp.module.css';

const child = portalChild;

export default function ParentPortal() {
  return (
    <div>
      <PageIntro
        title="Parent portal"
        desc="A guardian sees only the children linked to them through a verified relationship — and only what their permission level allows. Paying fees never automatically authorises collection or access to sensitive information."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Linked child">
          <div className={styles.identity}>
            <span className={styles.avatar}>{child.name.split(' ').map((n) => n[0]).join('')}</span>
            <div>
              <div className={styles.statBlockValue} style={{ fontSize: '1rem' }}>{child.name}</div>
              <div className={styles.statBlockSub}>{child.class} · {child.guardian} ({child.relationship})</div>
            </div>
          </div>
        </Card>
        <Card title="Attendance this month">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{child.attendancePct}%</span>
            <span className={styles.statBlockSub}>Reviewed registers only</span>
          </div>
        </Card>
        <Card title="Fee balance">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: child.balance === 0 ? '#16a34a' : 'var(--secondary)' }}>
              {child.balance === 0 ? 'Settled' : `KES ${child.balance.toLocaleString()}`}
            </span>
            <span className={styles.statBlockSub}>Remaining of KES {child.invoice.toLocaleString()} · due {child.nextDue}</span>
          </div>
        </Card>
        <Card title="CBC progress">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>3.3 / 4</span>
            <span className={styles.statBlockSub}>Seven core competencies</span>
          </div>
        </Card>
      </div>

      <Card title="What this account can do">
        <div className={styles.roleChipRow}>
          <Chip tone={child.permissions.view ? 'ok' : 'neut'}>View reports & attendance — {child.permissions.view ? 'Enabled' : 'Off'}</Chip>
          <Chip tone={child.permissions.pay ? 'ok' : 'neut'}>Pay fees (M-Pesa Paybill 522533) — {child.permissions.pay ? 'Enabled' : 'Off'}</Chip>
          <Chip tone={child.permissions.collect ? 'ok' : 'neut'}>Authorise collection — {child.permissions.collect ? 'Enabled' : 'Off'}</Chip>
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          {child.permissions.note}
        </div>
      </Card>

      <div className={styles.grid2}>
        <Card title="Term progress — observations per competency">
          {child.competencies.map((c) => (
            <div className={styles.progressRow} key={c.code}>
              <span className={styles.progressLabel}>{c.code} · {c.name}</span>
              <div className={styles.progress}>
                <div className={styles.progressFill} style={{ width: `${(c.score / 4) * 100}%` }} />
              </div>
              <span className={styles.progressMeta}>Lv {c.score}</span>
            </div>
          ))}
        </Card>
        <Card title="Recent activity for Amani">
          <div className={styles.feed}>
            {child.activity.map((a, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles[a.tone]}`} />
                <div>
                  <div className={styles.feedText}>{a.text}</div>
                  <div className={styles.feedTime}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className={styles.btn}>View report card</button>
            <button className={`${styles.btn} ${styles.btnGreen}`}>Pay balance (M-Pesa)</button>
          </div>
        </Card>
      </div>

      <Card title="Receipts & statements">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '500px' }}>
            <thead><tr><th>Date</th><th>Receipt</th><th>Description</th><th>Amount</th></tr></thead>
            <tbody>
              {receipts.slice(0, 4).map((r) => (
                <tr key={r.no}>
                  <td>{r.date}</td>
                  <td className={styles.mono}>{r.no}</td>
                  <td>{r.method} · {r.name}</td>
                  <td className={styles.amount}>KES {r.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
          Guardians are notified by SMS on every transaction. Statements download as PDF.
        </div>
      </Card>
    </div>
  );
}