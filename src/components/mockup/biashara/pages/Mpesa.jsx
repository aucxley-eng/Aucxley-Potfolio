import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { unallocated, autoMatched, channelStatus } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Mpesa() {
  return (
    <div>
      <PageIntro
        title="M-Pesa auto-capture — the north star"
        desc="When a customer pays via M-Pesa, the money and the sale appear in Biashara automatically. No receipts re-typed, no statement scanning. One app, two channels — because iOS cannot read SMS, so a Daraja callback backs the Android SMS reader."
      />
      <SimNote />

      <div className={styles.twoCol}>
        {channelStatus.map((c) => (
          <Card key={c.key} title={`Channel ${c.key} — ${c.name}`} action={<Chip tone={c.stateTone}>{c.state}</Chip>}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginTop: 0 }}>
              {c.detail}
            </p>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Coverage</span>
              <div className={styles.progress}>
                <div className={styles.progressFill} style={{ width: `${c.pct}%` }} />
              </div>
              <span className={styles.progressMeta}>{c.pct}%</span>
            </div>
            <Chip tone={c.key === 'B' ? 'ok' : 'neut'}>
              {c.key === 'B' ? 'Primary channel — works on every phone, no app install' : 'Companion — reads messages on the shop phone'}
            </Chip>
          </Card>
        ))}
      </div>

      <div className={styles.twoCol}>
        <Card title="Unmatched payments — assign to a sale" action={<Chip tone="warn">{unallocated.length} waiting</Chip>}>
          <div className={styles.feed}>
            {unallocated.map((u) => (
              <div key={u.ref} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles.warn}`} />
                <div style={{ flex: 1 }}>
                  <div className={styles.feedText}>
                    <strong>{k(u.amount)}</strong> · {u.sender} · {u.when}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>{u.matchHint}</div>
                </div>
                <button className={styles.btn} style={{ padding: '0.35rem 0.75rem' }}>Match</button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Auto-matched today — zero typing" action={<Chip tone="okSolid">{autoMatched.length} matched</Chip>}>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '440px' }}>
              <thead><tr><th>Ref</th><th>Time</th><th>Amount</th><th>Sender</th><th>Matched to</th></tr></thead>
              <tbody>
                {autoMatched.map((a) => (
                  <tr key={a.ref}>
                    <td className={styles.mono}>{a.ref}</td>
                    <td>{a.when}</td>
                    <td className={styles.amount} style={{ color: '#16a34a' }}>+ {k(a.amount)}</td>
                    <td className={styles.tdStrong}>{a.sender}</td>
                    <td style={{ fontSize: '0.76rem' }}>{a.matchedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="neut">Sender match + amount match = the sale is attached before the drawer count. The unmatched queue is the only place needing human eyes.</Chip>
          </div>
        </Card>
      </div>

      <Card title="Roadmap — what's next on auto-capture">
        <div className={styles.questionGrid}>
          <div className={styles.questionCard}>
            <div className={styles.questionQ}>Automatic M-Pesa payment capture</div>
            <div className={styles.questionDetail}>SMS reader (channel A) and Daraja callbacks (channel B) both record the money the moment it arrives.</div>
            <Chip tone="ok">Core live</Chip>
          </div>
          <div className={styles.questionCard}>
            <div className={styles.questionQ}>Native app experience</div>
            <div className={styles.questionDetail}>Float counts, stocktaking and walk-through restocking on the phone — offline-safe, syncing when back online.</div>
            <Chip tone="warn">Building</Chip>
          </div>
          <div className={styles.questionCard}>
            <div className={styles.questionQ}>Smart unmatched matching</div>
            <div className={styles.questionDetail}>Suggest the pending sale or loan for every new payment; the owner confirms one tap instead of searching the register.</div>
            <Chip tone="warn">Next</Chip>
          </div>
        </div>
      </Card>
    </div>
  );
}