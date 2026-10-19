import { useState } from 'react';
import { Card, PageIntro, SimNote, Chip } from '../ui';
import { attendance, classes } from '../mockData';
import styles from '../DemoApp.module.css';

const STATUS = {
  present: { label: 'Present', tone: 'ok' },
  late: { label: 'Late', tone: 'warn' },
  absent: { label: 'Absent', tone: 'bad' },
};

export default function Attendance() {
  const [marks, setMarks] = useState(() =>
    Object.fromEntries(attendance.today.map((s) => [s.id, s.status]))
  );

  const setStatus = (id, status) => setMarks((prev) => ({ ...prev, [id]: status }));
  const absentCount = Object.values(marks).filter((s) => s === 'absent').length;

  return (
    <div>
      <PageIntro
        title="Attendance register"
        desc="Mark the daily register for a class, then review it. Absence SMS leaves only after the register is reviewed and the 10:00 cutoff passes — never during an incomplete roll call."
      />
      <SimNote />
      <div className={styles.grid3}>
        <Card title="Class">
          <div className={styles.statBlock}>
            <span className={styles.statBlockLabel}>Section</span>
            <span className={styles.statBlockValue}>Grade 4-A</span>
            <span className={styles.statBlockSub}>42 learners · Teacher David Kiptoo</span>
          </div>
        </Card>
        <Card title="Status today">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>
              {Object.values(marks).filter((s) => s === 'present').length} present
            </span>
            <span className={styles.statBlockSub}>2 late · {absentCount} absent</span>
          </div>
        </Card>
        <Card title="SMS to send">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: absentCount ? 'var(--secondary)' : '#16a34a' }}>
              {absentCount} guardian SMS
            </span>
            <span className={styles.statBlockSub}>Auto-sent at 10:00 via Africa's Talking</span>
          </div>
        </Card>
      </div>

      <Card title="Mark register — tap to cycle (Present → Late → Absent)">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr><th>Learner</th><th>Admission</th><th>Status</th></tr>
            </thead>
            <tbody>
              {attendance.today.map((s) => {
                const st = marks[s.id];
                return (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.identity}>
                        <span className={styles.avatar}>{s.name.split(' ').map(n => n[0]).join('')}</span>
                        <span className={styles.tdStrong}>{s.name}</span>
                      </div>
                    </td>
                    <td className={styles.mono}>{s.admission}</td>
                    <td>
                      <button
                        className={styles.segmented}
                        onClick={() => setStatus(s.id, st === 'present' ? 'late' : st === 'late' ? 'absent' : 'present')}
                        style={{ cursor: 'pointer' }}
                      >
                        {Object.keys(STATUS).map((key) => (
                          <span
                            key={key}
                            className={`${styles.segment} ${st === key ? styles.active : ''}`}
                            style={{ padding: '0.3rem 0.8rem' }}
                          >
                            {STATUS[key].label}
                          </span>
                        ))}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button className={styles.btn} style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', color: 'white', border: 'none' }}>
          Save register
        </button>
        <button className={styles.btn}>Send absent SMS now</button>
        <button className={styles.btn}>Bulk mark all present</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Card title="Class attendance this term">
          {classes.slice(0, 6).map((c) => (
            <div className={styles.progressRow} key={c.id}>
              <span className={styles.progressLabel}>{c.grade}-{c.stream}</span>
              <div className={styles.progress}>
                <div className={styles.progressFill} style={{ width: `${90 + (c.id % 8)}%` }} />
              </div>
              <span className={styles.progressMeta}>{90 + (c.id % 8)}%</span>
            </div>
          ))}
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="neut">Data entry works offline — drafts sync with conflict checking when connectivity returns</Chip>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Card title="Review registers — SMS fires after review + 10:00 cutoff">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '640px' }}>
              <thead><tr><th>Class</th><th>Teacher</th><th>Reviewed</th><th>Submitted</th><th>Absences</th><th>Alert status</th></tr></thead>
              <tbody>
                {attendance.registers.map((r) => (
                  <tr key={r.class}>
                    <td className={styles.tdStrong}>{r.class}</td>
                    <td>{r.teacher}</td>
                    <td>
                      {r.reviewed
                        ? <Chip tone="ok">Reviewed</Chip>
                        : <Chip tone="warn">Not yet reviewed</Chip>}
                    </td>
                    <td className={styles.mono}>{r.submitted}</td>
                    <td>{r.absences === '—' ? '—' : r.absences}</td>
                    <td>{r.sms === 'Waiting — cutoff 10:00'
                      ? <Chip tone="neut">{r.sms}</Chip>
                      : <Chip tone="ok">{r.sms}</Chip>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="warn">SMS auto-delivery at 10:00 via the SMS provider — a reviewed register, not an incomplete roll call</Chip>
          </div>
        </Card>
      </div>
    </div>
  );
}