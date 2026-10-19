import { Card, PageIntro, SimNote, Chip } from '../ui';
import { DonutChart } from '../charts';
import {
  invoice,
  allocations,
  journalEntries,
  financeActions,
  feeBreakdown,
  feeAging,
  capitation,
  mpesaTransactions,
  receipts,
} from '../mockData';
import styles from '../DemoApp.module.css';

const paidTotal = feeBreakdown.reduce((s, c) => s + c.paid, 0);
const pendingTotal = feeBreakdown.reduce((s, c) => s + c.pending, 0);
const overdueTotal = feeBreakdown.reduce((s, c) => s + c.overdue, 0);

const FLOW = ['Invoice', 'Payment', 'Allocation', 'Receipt', 'Journal entries'];

export default function Fees() {
  return (
    <div>
      <PageIntro
        title="Finance & payments"
        desc="An invoice states what is owed. A payment records money received. An allocation applies it to an invoice. A receipt acknowledges the payment. Journal entries account for its effect. Balances are derived from this history — never manually edited."
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

      <div className={styles.statGrid}>
        <Card title="Total billed">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>KES {(paidTotal + pendingTotal + overdueTotal).toLocaleString()}</span>
            <span className={styles.statBlockSub}>This term, across categories</span>
          </div>
        </Card>
        <Card title="Collected">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>KES {paidTotal.toLocaleString()}</span>
            <span className={styles.statBlockSub}>Auto-reconciled via M-Pesa</span>
          </div>
        </Card>
        <Card title="Outstanding">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>KES {(pendingTotal + overdueTotal).toLocaleString()}</span>
            <span className={styles.statBlockSub}>Derived from invoices − allocations</span>
          </div>
        </Card>
        <Card title="Unmatched">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#dc2626' }}>KES 500</span>
            <span className={styles.statBlockSub}>1 C2B in Suspense awaiting payer match</span>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Fee aging — outstanding by bucket" action={<Chip tone="warn">Used by SMS reminder jobs</Chip>}>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '400px' }}>
              <thead><tr><th>Bucket</th><th>Learners</th><th>Outstanding</th></tr></thead>
              <tbody>
                {feeAging.map((a) => (
                  <tr key={a.bucket}>
                    <td>{a.bucket}</td>
                    <td>{a.learners}</td>
                    <td className={styles.amount}>
                      <span className={a.tone === 'bad' ? styles.amountNeg : ''} style={a.tone === 'ok' ? { color: '#16a34a' } : a.tone === 'warn' ? { color: 'var(--secondary)' } : {}}>
                        KES {a.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="neut">Balances are derived from invoices − allocations, so aging is always live — never re-keyed.</Chip>
          </div>
        </Card>

        <Card title="Capitation — Ministry disbursement" action={<Chip tone="ok">Tracked separately from parent fees</Chip>}>
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>{capitation.term} · {capitation.perPupilRate.toLocaleString()} KES per learner × {capitation.enrollmentCount} enrolled</span>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>KES {capitation.received.toLocaleString()}</span>
            <span className={styles.statBlockSub}>Received {capitation.receivedDate} of KES {capitation.allocated.toLocaleString()} allocated · next tranche expected {capitation.expectedNext}</span>
          </div>
          <div className={styles.progressRow} style={{ marginBottom: '0.4rem' }}>
            <span className={styles.progressLabel}>Received vs allocated</span>
            <div className={styles.progress}>
              <div className={styles.progressFill} style={{ width: `${(capitation.received / capitation.allocated) * 100}%` }} />
            </div>
            <span className={styles.progressMeta}>{Math.round((capitation.received / capitation.allocated) * 100)}%</span>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            Spent on: {capitation.spentOn}
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title={`Illustrative invoice — ${invoice.learner}`} action={<Chip tone="warn">{invoice.status}</Chip>}>
          <div className={styles.statBlock} style={{ marginBottom: '0.75rem' }}>
            <span className={styles.statBlockLabel}>{invoice.no}</span>
            <span className={styles.statBlockValue} style={{ fontSize: '1.25rem' }}>KES {invoice.total.toLocaleString()}</span>
            <span className={styles.statBlockSub}>Account {invoice.admission} · balance is derived, never free-text</span>
          </div>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '300px' }}>
              <thead><tr><th>Line</th><th>Amount</th></tr></thead>
              <tbody>
                {invoice.lines.map((l) => (
                  <tr key={l.category}>
                    <td>{l.category}</td>
                    <td className={styles.amount}>KES {l.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr>
                  <td className={styles.tdStrong}>Total</td>
                  <td className={styles.amount}>KES {invoice.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Verified payment allocated</td>
                  <td className={`${styles.amount}`} style={{ color: '#16a34a' }}>− KES {invoice.paid.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className={styles.tdStrong}>Remaining</td>
                  <td className={`${styles.amount} ${styles.amountNeg}`}>KES {invoice.remaining.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="This term — collection status">
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <DonutChart
              size={150}
              data={[
                { label: 'Paid', value: paidTotal, color: 'var(--secondary)' },
                { label: 'Pending', value: pendingTotal, color: 'var(--accent-2)' },
                { label: 'Overdue', value: overdueTotal, color: '#ef4444' },
              ]}
            />
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.legendSwatch} style={{ background: 'var(--secondary)' }} />
                Paid <span className={styles.legendVal}>KES {paidTotal.toLocaleString()}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendSwatch} style={{ background: 'var(--accent-2)' }} />
                Pending <span className={styles.legendVal}>KES {pendingTotal.toLocaleString()}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendSwatch} style={{ background: '#ef4444' }} />
                Overdue <span className={styles.legendVal}>KES {overdueTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Allocations — payment → invoice">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '480px' }}>
              <thead><tr><th>Ref</th><th>Learner</th><th>Applied to</th><th>Amount</th><th>Note</th></tr></thead>
              <tbody>
                {allocations.map((a) => (
                  <tr key={a.ref}>
                    <td className={styles.mono}>{a.ref}<div style={{ color: 'var(--text-tertiary)' }}>{a.date}</div></td>
                    <td className={styles.tdStrong}>{a.learner}</td>
                    <td className={styles.mono}>{a.toInvoice}</td>
                    <td className={styles.amount}>KES {a.amount.toLocaleString()}</td>
                    <td style={{ fontSize: '0.78rem', maxWidth: '180px' }}>{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="warn">One payment may cover several invoices or siblings; an invoice receives many payments</Chip>
          </div>
        </Card>

        <Card title="Journal entries — double-entry effect">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '480px' }}>
              <thead><tr><th>Entry</th><th>Debit</th><th>Credit</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {journalEntries.map((j) => (
                  <tr key={j.no}>
                    <td>
                      <div className={styles.mono}>{j.no}</div>
                      <div className={styles.tdStrong}>{j.ref}</div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.74rem' }}>{j.date}</div>
                    </td>
                    <td>{j.dr}</td>
                    <td>{j.cr}</td>
                    <td className={styles.amount}>KES {j.drAmount.toLocaleString()}</td>
                    <td>{j.status === 'Posted'
                      ? <Chip tone="ok">{j.status}</Chip>
                      : <Chip tone="bad">{j.status}</Chip>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="neut">Repeated M-Pesa callbacks can never create two payments — provider reference is unique</Chip>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Finance action needed" action={<Chip tone="warn">{financeActions.length} open</Chip>}>
          <div className={styles.feed}>
            {financeActions.map((a, i) => (
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

        <Card title="Recent receipts issued">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '440px' }}>
              <thead><tr><th>Receipt no.</th><th>Learner</th><th>Amount</th><th>Paid via</th><th>Date</th></tr></thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.no}>
                    <td className={styles.mono}>{r.no}</td>
                    <td className={styles.tdStrong}>{r.name}</td>
                    <td className={styles.amount}>KES {r.amount.toLocaleString()}</td>
                    <td>{r.method}</td>
                    <td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            Receipt numbers are unique and auto-generated. Paying parents receive a confirmation SMS automatically.
          </div>
        </Card>
      </div>

      <Card title="Live M-Pesa transactions (simulated) — Daraja C2B Paybill 522533">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr><th>Time</th><th>Account</th><th>Learner</th><th>Amount</th><th>Provider ref</th><th>Status</th></tr>
            </thead>
            <tbody>
              {mpesaTransactions.map((t, i) => (
                <tr key={i}>
                  <td className={styles.mono}>{t.time}</td>
                  <td className={styles.mono}>{t.admission}</td>
                  <td className={styles.tdStrong}>{t.name}</td>
                  <td className={styles.amount}>{t.sign} KES {t.amount.toLocaleString()}</td>
                  <td className={styles.mono}>{t.ref}</td>
                  <td>
                    {t.status === 'Success' ? <Chip tone="okSolid">{t.status}</Chip>
                      : t.status === 'Reversed' ? <Chip tone="bad">{t.status}</Chip>
                      : <Chip tone="warn">{t.status}</Chip>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '0.75rem', marginBottom: 0 }}>
          A receiver/public request alone is not proof of payment — callbacks are acknowledged after durable acceptance, then processed with duplicate protection.
        </p>
      </Card>
    </div>
  );
}