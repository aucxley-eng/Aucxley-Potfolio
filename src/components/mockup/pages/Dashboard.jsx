import { Card, StatCard, PageIntro, SimNote, Chip } from '../ui';
import { DonutChart, BarChart } from '../charts';
import {
  stats,
  headQuestions,
  notifications,
  attendance,
  todayTrips,
  teacherView,
  roleWorkspaces,
  feeBreakdown,
} from '../mockData';
import styles from '../DemoApp.module.css';

const paidTotal = feeBreakdown.reduce((s, c) => s + c.paid, 0);
const pendingTotal = feeBreakdown.reduce((s, c) => s + c.pending, 0);
const overdueTotal = feeBreakdown.reduce((s, c) => s + c.overdue, 0);

function TeacherPanel() {
  const t = teacherView;
  return (
    <>
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Staff">
          <div className={styles.identity}>
            <span className={styles.avatar}>{t.name.split(' ').map((n) => n[0]).join('')}</span>
            <div>
              <div className={styles.statBlockValue} style={{ fontSize: '1rem' }}>{t.name}</div>
              <div className={styles.statBlockSub}>{t.role}</div>
            </div>
          </div>
        </Card>
        <Card title="My classes">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{t.classes.length}</span>
            <span className={styles.statBlockSub}>{t.classes.map((c) => `${c.grade}-${c.stream}`).join(' · ')}</span>
          </div>
        </Card>
        <Card title="Learners">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{t.load}</span>
            <span className={styles.statBlockSub}>Across my classes</span>
          </div>
        </Card>
        <Card title="Register today">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>Reviewed</span>
            <span className={styles.statBlockSub}>Absence SMS queued for 10:02</span>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Classes — this term">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '400px' }}>
              <thead><tr><th>Class</th><th>Subject</th><th>Avg level</th><th>Status</th></tr></thead>
              <tbody>
                {t.classes.map((c) => (
                  <tr key={`${c.grade}${c.stream}`}>
                    <td className={styles.tdStrong}>{c.grade}-{c.stream}</td>
                    <td>{c.subject}</td>
                    <td>{c.avg}</td>
                    <td>{c.done ? <Chip tone="ok">Assessed</Chip> : <Chip tone="warn">{c.pending} observations pending</Chip>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Open observation queue</button>
            <button className={styles.btn}>Mark today's register</button>
          </div>
        </Card>
        <Card title="What needs my attention">
          <div className={styles.feed}>
            {t.reminders.map((r, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles[r.tone]}`} />
                <div>
                  <div className={styles.feedText}>{r.text}</div>
                  <div className={styles.feedTime}>{r.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

export default function Dashboard({ role }) {
  const pendingHandovers = todayTrips.filter((t) => t.attention && t.handovers !== '—').length;

  if (role === 'teacher') {
    return (
      <div>
        <PageIntro title="Dashboard" desc={roleWorkspaces.teacher} />
        <TeacherPanel />
      </div>
    );
  }

  return (
    <div>
      <PageIntro title="Dashboard" desc={roleWorkspaces[role] || 'School summaries and exceptions'} />
      <SimNote />
      <div className={styles.statGrid}>
        <StatCard label="Students" value={stats.students.toLocaleString()} sub="Enrolled this term" />
        <StatCard label="Attendance" value={`${stats.attendanceRate}%`} sub="Term 3 average — reviewed registers" tone="trendUp" />
        <StatCard label="Fees collected" value={`KES ${stats.feesCollected.toLocaleString()}`} sub="Auto-reconciled via M-Pesa" tone="trendUp" />
        <StatCard label="Handovers pending" value={pendingHandovers} sub="Unresolved out of 46 today" tone={pendingHandovers ? 'trendDown' : 'trendUp'} />
      </div>

      <div className={styles.questionGrid}>
        {headQuestions.map((q) => (
          <div className={styles.questionCard} key={q.q}>
            <div className={styles.questionTop}>
              <h3 className={styles.questionQ}>{q.q}</h3>
              <Chip tone={q.tone}>{q.count} open</Chip>
            </div>
            <p className={styles.questionDetail}>{q.detail}</p>
            <p className={styles.questionMetric}>{q.metric}</p>
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        <Card title="Today's trips">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '420px' }}>
              <thead><tr><th>Route</th><th>Bus</th><th>Phase</th><th>Handovers</th><th>Status</th></tr></thead>
              <tbody>
                {todayTrips.map((t) => (
                  <tr key={`${t.route}${t.direction}`}>
                    <td className={styles.tdStrong}>{t.route} <span className={styles.mono} style={{ color: 'var(--text-tertiary)' }}>· {t.direction}</span></td>
                    <td className={styles.mono}>{t.bus}</td>
                    <td>{t.phase}</td>
                    <td>{t.handovers}</td>
                    <td>
                      {t.status === 'ok' && <Chip tone="ok">Complete</Chip>}
                      {t.status === 'warn' && <Chip tone="warn">Needs attention</Chip>}
                      {t.status === 'neut' && <Chip tone="neut">{t.phase}</Chip>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Fee collection — this term">
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
        <Card title="Recent activity" action={<Chip tone="ok">Live feed</Chip>}>
          <div className={styles.feed}>
            {notifications.map((n, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${styles[n.tone]}`} />
                <div>
                  <div className={styles.feedText}>{n.text}</div>
                  <div className={styles.feedTime}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Class attendance — this term">
          <BarChart data={attendance.monthly.map((m) => ({ label: m.month, value: m.rate }))} height={160} />
          <div style={{ marginTop: '0.9rem' }}>
            <Chip tone="neut">Absence SMS fires only after a register is reviewed and the 10:00 cutoff passes</Chip>
          </div>
        </Card>
      </div>
    </div>
  );
}