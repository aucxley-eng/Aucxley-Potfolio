import { Card, PageIntro, SimNote, Chip } from '../ui';
import { meals } from '../mockData';
import styles from '../DemoApp.module.css';

const FLOW = ['Subscription', 'Forecast', 'Prepared', 'Served', 'Leftovers'];

export default function Meals() {
  const p = meals.pipeline;
  return (
    <div>
      <PageIntro
        title="Meals & kitchen"
        desc="Kitchen staff see approved meal requirements and relevant dietary instructions. The kitchen separates entitlement from consumption: subscription → daily forecast → quantities prepared → meals served → leftovers, waste, or shortage."
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
        <Card title="Subscribed">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{p.subscription}</span>
            <span className={styles.statBlockSub}>Paid meal subscriptions this term</span>
          </div>
        </Card>
        <Card title="Forecast">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{p.forecast} portions</span>
            <span className={styles.statBlockSub}>Cutoff estimate at 09:00</span>
          </div>
        </Card>
        <Card title="Prepared">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{p.prepared}</span>
            <span className={styles.statBlockSub}>Cooked to match forecast</span>
          </div>
        </Card>
        <Card title="Served">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{p.served}</span>
            <span className={styles.statBlockSub}>{p.leftOver} leftover · {p.shortage} shortage</span>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Today's service">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '460px' }}>
              <thead><tr><th>Menu</th><th>Prepared</th><th>Served</th><th>Leftover</th><th>Dietary flags</th></tr></thead>
              <tbody>
                {meals.today.map((m) => (
                  <tr key={m.item}>
                    <td className={styles.tdStrong}>{m.item}</td>
                    <td>{m.prepared}</td>
                    <td>{m.served}</td>
                    <td>{m.leftOver}</td>
                    <td>{m.dietary > 0 ? <Chip tone="warn">{m.dietary} learners</Chip> : <Chip tone="ok">None</Chip>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Record meals served</button>
            <button className={styles.btn}>Adjust forecast</button>
            <button className={styles.btn}>Report shortage</button>
          </div>
        </Card>

        <Card title="Kitchen notes">
          <div className={styles.feed}>
            {meals.notes.map((n, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles[n.tone]}`} />
                <div>
                  <div className={styles.feedText}>{n.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.9rem' }}>
            <Chip tone="neut">Attendance informs forecasts, but offline registers arrive late — so the kitchen always uses a cutoff plus manual adjustment</Chip>
          </div>
        </Card>
      </div>

      <Card title="Dietary instructions">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Dietary and allergy information is visible to kitchen staff who need it — never on report cards or parent-facing documents.
        </div>
        <div className={styles.roleChipRow} style={{ marginTop: '0.9rem' }}>
          <Chip tone="warn">Nut allergy — 2 learners (Grade 4-A)</Chip>
          <Chip tone="ok">Vegetarian option — 1 learner</Chip>
          <Chip tone="neut">Lactose intolerant — 1 learner</Chip>
        </div>
      </Card>
    </div>
  );
}