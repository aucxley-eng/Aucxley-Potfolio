import { useState } from 'react';
import { Card, PageIntro, SimNote, Chip } from '../ui';
import { students, applications, guardianLinks, enrolmentHistory } from '../mockData';
import styles from '../DemoApp.module.css';

function PermChip({ on }) {
  return on ? <Chip tone="ok">{'Enabled'}</Chip> : <Chip tone="neut">{'Off'}</Chip>;
}

export default function Students() {
  const [query, setQuery] = useState('');

  const filtered = students.filter((s) =>
    (s.name + s.admission + s.guardian + s.uli + s.className).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PageIntro
        title="Learner records"
        desc="Admissions creates the learner and verifies guardian relationships. Enrolment assigns classes and preserves history — promotion adds a row, it never rewrites old reports."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Applications">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{applications.length}</span>
            <span className={styles.statBlockSub}>Pending screening</span>
          </div>
        </Card>
        <Card title="Learners">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{students.length} shown</span>
            <span className={styles.statBlockSub}>360 enrolled school-wide</span>
          </div>
        </Card>
        <Card title="Guardian links">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{guardianLinks.length} shown</span>
            <span className={styles.statBlockSub}>Separate view · pay · collect permissions</span>
          </div>
        </Card>
        <Card title="ULI capture">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>98%</span>
            <span className={styles.statBlockSub}>Official KEMIS identifier per learner</span>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Application queue">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '560px' }}>
              <thead><tr><th>Application</th><th>Grade</th><th>Guardian</th><th>Stage</th><th></th></tr></thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.no}>
                    <td>
                      <div className={styles.tdStrong}>{a.name}</div>
                      <div className={styles.mono} style={{ color: 'var(--text-tertiary)' }}>{a.no} · born {a.dob}</div>
                    </td>
                    <td>{a.grade}</td>
                    <td>
                      <div>{a.guardian}</div>
                      <div className={styles.mono} style={{ color: 'var(--text-tertiary)' }}>{a.phone}</div>
                    </td>
                    <td><Chip tone={a.uli === 'pending' ? 'warn' : 'ok'}>{a.stage}</Chip></td>
                    <td><button className={styles.btn} style={{ padding: '0.35rem 0.75rem' }}>Admit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Guardian links & permissions">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '560px' }}>
              <thead><tr><th>Guardian</th><th>Relationship</th><th>View</th><th>Pay</th><th>Collect</th></tr></thead>
              <tbody>
                {guardianLinks.map((g, i) => (
                  <tr key={i}>
                    <td>
                      <div className={styles.tdStrong}>{g.guardian}</div>
                      <div className={styles.mono} style={{ color: 'var(--text-tertiary)' }}>{g.learner} · {g.admission}</div>
                    </td>
                    <td>{g.relationship}</td>
                    <td><PermChip on={g.view} /></td>
                    <td><PermChip on={g.pay} /></td>
                    <td><PermChip on={g.collect} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="warn">Paying fees does not authorise collection — each permission is separate and verified</Chip>
          </div>
        </Card>
      </div>

      <div className={styles.grid2}>
        <Card title="Learner directory">
          <div className={styles.searchRow} style={{ margin: '0 0 0.75rem' }}>
            <input
              className={styles.searchBox}
              placeholder="Search by name, admission no., guardian, ULI, or class…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table}>
              <thead>
                <tr><th>Learner</th><th>Class</th><th>Curriculum</th><th>ULI / KEMIS</th><th>Balance</th><th>Flags</th></tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.identity}>
                        <span className={styles.avatar}>{s.name.split(' ').map((n) => n[0]).join('')}</span>
                        <div>
                          <div className={styles.tdStrong}>{s.name}</div>
                          <div className={styles.mono}>{s.admission}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.className}</td>
                    <td>
                      {s.curriculum === 'CBC'
                        ? <Chip tone="ok">{s.curriculum}</Chip>
                        : <Chip tone="neut">{s.curriculum}</Chip>}
                    </td>
                    <td className={styles.mono}>{s.uli}</td>
                    <td>
                      {s.outstanding === 0
                        ? <Chip tone="okSolid">Clear</Chip>
                        : <span className={`${styles.amount} ${styles.amountNeg}`}>KES {s.outstanding.toLocaleString()}</span>}
                    </td>
                    <td>
                      <div className={styles.roleChipRow}>
                        {s.gifted && <Chip tone="warn">Gifted</Chip>}
                        {s.orphan && <Chip tone="neut">Orphan</Chip>}
                        {s.specialNeeds && <Chip tone="bad">Special needs</Chip>}
                        {!s.gifted && !s.orphan && !s.specialNeeds && <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: 0 }}>
            {filtered.length} learner{filtered.length !== 1 ? 's' : ''} shown of 360 enrolled.
          </p>
        </Card>

        <Card title={`Enrolment history — ${enrolmentHistory[0].learner}`}>
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '420px' }}>
              <thead><tr><th>Academic year</th><th>Term</th><th>Class</th><th>Status</th></tr></thead>
              <tbody>
                {enrolmentHistory.map((e, i) => (
                  <tr key={i}>
                    <td className={styles.tdStrong}>{e.academicYear}</td>
                    <td>{e.term}</td>
                    <td>{e.class}</td>
                    <td>
                      {e.status === 'Active'
                        ? <Chip tone="okSolid">{e.status}</Chip>
                        : <Chip tone="neut">{e.status}</Chip>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Chip tone="ok">Promotion adds a row — old reports and enrolments are never rewritten</Chip>
          </div>
        </Card>
      </div>
    </div>
  );
}