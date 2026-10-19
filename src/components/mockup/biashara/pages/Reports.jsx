import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { BarChart, DonutChart } from '../../charts';
import { revenueTrend, expenseBreakdown, bestSellers, reportInsights, bizSummary } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

export default function Reports() {
  const marginPct = Math.round((bizSummary.monthProfit / bizSummary.monthRevenue) * 100);
  const expenseTotal = expenseBreakdown.reduce((s, e) => s + e.value, 0);

  return (
    <div>
      <PageIntro
        title="Reports & insights"
        desc="Revenue, expenses and profit at a glance, built from the ledger — never a separate spreadsheet the owner maintains. Restored-goods margins, M-Pesa share and the loan book all roll up here."
      />
      <SimNote />

      <div className={styles.statGrid}>
        <Card title="Revenue">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{k(bizSummary.monthRevenue)}</span>
            <span className={styles.statBlockSub}>September</span>
          </div>
        </Card>
        <Card title="Expenses">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#dc2626' }}>{k(bizSummary.monthExpenses)}</span>
            <span className={styles.statBlockSub}>All accounted movements</span>
          </div>
        </Card>
        <Card title="Profit margin">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{marginPct}%</span>
            <span className={styles.statBlockSub}>{k(bizSummary.monthProfit)} net</span>
          </div>
        </Card>
        <Card title="M-Pesa share">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>78%</span>
            <span className={styles.statBlockSub}>Auto-captured revenue</span>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="Revenue trend (KES)">
          <BarChart data={revenueTrend} height={180} />
        </Card>
        <Card title="Expenses by category">
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <DonutChart
              size={150}
              data={expenseBreakdown.map((e) => ({ label: e.label, value: e.value, color: e.tone }))}
            />
            <div className={styles.legend}>
              {expenseBreakdown.map((e) => (
                <div key={e.label} className={styles.legendItem}>
                  <span className={styles.legendSwatch} style={{ background: e.tone }} />
                  {e.label} <span className={styles.legendVal}>{Math.round((e.value / expenseTotal) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="Best sellers">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '400px' }}>
              <thead><tr><th>Item</th><th>Units</th><th>Revenue</th></tr></thead>
              <tbody>
                {bestSellers.map((b) => (
                  <tr key={b.item}>
                    <td className={styles.tdStrong}>{b.item}</td>
                    <td>{b.qty}</td>
                    <td className={styles.amount}>{k(b.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Insights" action={<Chip tone="neut">Auto-flagged from the data</Chip>}>
          <div className={styles.feed}>
            {reportInsights.map((r, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles[r.tone]}`} />
                <div style={{ flex: 1 }}>
                  <div className={styles.feedText}>{r.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button className={`${styles.btn} ${styles.btnPrimary}`}>Generate month-end report (PDF)</button>
        <button className={styles.btn}>Export ledger (CSV)</button>
        <button className={styles.btn}>Profit &amp; loss by channel</button>
      </div>
    </div>
  );
}