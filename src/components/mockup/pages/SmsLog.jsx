import { Card, PageIntro, SimNote, Chip } from '../ui';
import { smsTemplates, smsLogs } from '../mockData';
import styles from '../DemoApp.module.css';

export default function SmsLog() {
  return (
    <div>
      <PageIntro
        title="SMS gateway"
        desc="Bulk SMS to guardians via the SMS provider. Absence alerts fire only after a register is reviewed and the school's cutoff passes; SMS is introduced with the workflow that needs it."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Balance today">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>KES 4,210</span>
            <span className={styles.statBlockSub}>≈ 2,105 SMS at ~KES 2.00</span>
          </div>
        </Card>
        <Card title="Sent this week">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>847</span>
            <span className={styles.statBlockSub}>Peak: Monday 10:02 (absent alerts)</span>
          </div>
        </Card>
        <Card title="Delivery rate">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>97.2%</span>
            <span className={styles.statBlockSub}>22 failed — retried once, then flagged</span>
          </div>
        </Card>
        <Card title="Opt-outs">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>9 guardians</span>
            <span className={styles.statBlockSub}>Auto-reply STOP supported</span>
          </div>
        </Card>
      </div>

      <div className={styles.twoCol}>
        <Card title="Message templates">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '360px' }}>
              <thead><tr><th>Template</th><th>Last used</th></tr></thead>
              <tbody>
                {smsTemplates.map((t) => (
                  <tr key={t.name}>
                    <td>
                      <div className={styles.tdStrong}>{t.name}</div>
                      <div className={styles.smsBubble} style={{ marginTop: '0.4rem' }}>{t.body}</div>
                    </td>
                    <td className={styles.mono}>{t.lastUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Send to a class">
          <div className={styles.stack}>
            <select className={styles.searchBox} defaultValue="Grade 4-A">
              <option>Grade 3-A</option><option>Grade 4-A</option><option>Grade 4-B</option><option>Grade 5-A</option>
            </select>
            <select className={styles.searchBox} defaultValue="absence-confirmation">
              <option value="absence-confirmation">Absence confirmation (auto-filled from register)</option>
              <option value="fee-reminder">Term fee reminder</option>
              <option value="news">School news / event</option>
              <option value="results">Term results</option>
            </select>
            <textarea
              className={styles.searchBox}
              rows={4}
              style={{ borderRadius: '12px', resize: 'vertical', fontFamily: 'inherit' }}
              defaultValue="Hi {{guardian}}, {{learner}} was marked absentee today. Kindly contact the office. – SchoolHub Academy"
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>SMS count: 42 guardians · KES 84.00</span>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>Send now</button>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Card title="Recent deliveries">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table}>
              <thead><tr><th>Time</th><th>Recipient</th><th>Message</th><th>Status</th></tr></thead>
              <tbody>
                {smsLogs.map((log, i) => (
                  <tr key={i}>
                    <td className={styles.mono}>{log.time}</td>
                    <td className={styles.tdStrong}>{log.recipient}</td>
                    <td style={{ maxWidth: '340px' }}>{log.message}</td>
                    <td>
                      {log.status === 'Delivered' ? <Chip tone="ok">{log.status}</Chip>
                        : log.status === 'Pending' ? <Chip tone="warn">{log.status}</Chip>
                        : <Chip tone="bad">{log.status}</Chip>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}