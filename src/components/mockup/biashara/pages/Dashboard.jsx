import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { bizSummary, leakAlerts, channelStatus, ownerDraw } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Dashboard() {
  const marginPct = Math.round((bizSummary.monthProfit / bizSummary.monthRevenue) * 100);
  const drawPct = Math.round((ownerDraw.thisMonth / ownerDraw.cap) * 100);
  const overdue = 2;

  return (
    <div>
      <PageIntro
        title="Biashara overview"
        desc="The whole business on one screen — money position across bank, M-Pesa and drawer cash, always separated from owner draws; plus the loan book, cash leak checks and the M-Pesa auto-capture status."
      />
      <SimNote />

      <div className={styles.statGrid}>
        <Card title="Bank">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{k(bizSummary.bank)}</span>
            <span className={styles.statBlockSub}>Settled from M-Pesa + cash-in weekly</span>
          </div>
        </Card>
        <Card title="M-Pesa">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{k(bizSummary.mpesa)}</span>
            <span className={styles.statBlockSub}>78% of revenue — captured automatically</span>
          </div>
        </Card>
        <Card title="Cash (drawer)">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>{k(bizSummary.cash)}</span>
            <span className={styles.statBlockSub}>Verified by daily cash count</span>
          </div>
        </Card>
        <Card title="Customer loans">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#dc2626' }}>{k(bizSummary.receivables)}</span>
            <span className={styles.statBlockSub}>5% book — KES 50 per 1,000 · {overdue} overdue</span>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="Money position — this month">
          <div style={{ marginBottom: '0.9rem' }}>
            <div className={styles.statBlock} style={{ marginBottom: '0.35rem' }}>
              <span className={styles.statBlockLabel}>Revenue</span>
              <span className={styles.statBlockValue}>{k(bizSummary.monthRevenue)}</span>
            </div>
            <div className={styles.statBlock} style={{ marginBottom: '0.35rem' }}>
              <span className={styles.statBlockLabel}>Expenses</span>
              <span className={styles.statBlockValue} style={{ color: '#dc2626' }}>{k(bizSummary.monthExpenses)}</span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statBlockLabel}>Profit</span>
              <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{k(bizSummary.monthProfit)}</span>
            </div>
          </div>
          <div className={styles.progressRow}>
            <span className={styles.progressLabel}>Profit margin</span>
            <div className={styles.progress}>
              <div className={styles.progressFill} style={{ width: `${marginPct * 2}%` }} />
            </div>
            <span className={styles.progressMeta}>{marginPct}%</span>
          </div>
          <Chip tone="neut">Restored goods carry ~57% margin — buy low, repair, sell high</Chip>
        </Card>

        <Card title="Money separation — business vs owner" action={<Chip tone="ok">Intact</Chip>}>
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>Owner draw — {k(ownerDraw.thisMonth)} of {k(ownerDraw.cap)} cap this month</span>
            <span className={styles.statBlockValue}>{k(ownerDraw.ytd)}</span>
            <span className={styles.statBlockSub}>Year to date, recorded in a separate Owner Draw account — never mixed into business cash</span>
          </div>
          <div className={styles.progressRow} style={{ marginBottom: '0.2rem' }}>
            <span className={styles.progressLabel}>Draw vs cap</span>
            <div className={styles.progress}>
              <div className={styles.progressFill} style={{ width: `${drawPct}%` }} />
            </div>
            <span className={styles.progressMeta}>{drawPct}%</span>
          </div>
          <div style={{ marginTop: '0.8rem' }}>
            <Chip tone="warn">Cash-count check flags any drawer shortfall the ledger can't explain</Chip>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="Action needed — leak detection & reconciliation" action={<Chip tone="warn">{leakAlerts.filter(a => a.kind === 'warn').length} open</Chip>}>
          <div className={styles.feed}>
            {leakAlerts.map((a, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles[a.kind]}`} />
                <div style={{ flex: 1 }}>
                  <div className={styles.feedText}>{a.text}</div>
                </div>
                <button className={styles.btn} style={{ padding: '0.35rem 0.75rem' }}>{a.cta}</button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="M-Pesa auto-capture — one app, two channels" action={<Chip tone="ok">3 matched today</Chip>}>
          {channelStatus.map((c) => (
            <div style={{ marginBottom: '0.9rem' }} key={c.key}>
              <div className={styles.progressRow} style={{ marginBottom: '0.25rem' }}>
                <span className={styles.statBlockLabel}>{c.key} · {c.name}</span>
                <Chip tone={c.stateTone}>{c.state}</Chip>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 0.4rem' }}>
                {c.detail}
              </p>
              <div className={styles.progressRow}>
                <span className={styles.progressLabel}>Coverage</span>
                <div className={styles.progress}>
                  <div className={styles.progressFill} style={{ width: `${c.pct}%` }} />
                </div>
                <span className={styles.progressMeta}>{c.pct}%</span>
              </div>
            </div>
          ))}
          <Chip tone="neut">North star: when a customer pays via M-Pesa, the money and the sale appear automatically.</Chip>
        </Card>
      </div>
    </div>
  );
}