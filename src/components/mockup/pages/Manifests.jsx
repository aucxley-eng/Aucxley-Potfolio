import { useState } from 'react';
import { Card, PageIntro, SimNote, Chip } from '../ui';
import { manifestPassengers } from '../mockData';
import styles from '../DemoApp.module.css';

export default function Manifests() {
  const [passengers, setPassengers] = useState(() =>
    manifestPassengers.map((p) => ({ ...p }))
  );

  const toggle = (admission, field) => {
    setPassengers((prev) =>
      prev.map((p) =>
        p.admission === admission ? { ...p, [field]: !p[field] } : p
      )
    );
  };

  const boarded = passengers.filter((p) => p.board).length;
  const alighted = passengers.filter((p) => p.alight).length;
  const handedOver = passengers.filter((p) => p.handover).length;

  return (
    <div>
      <PageIntro
        title="Passenger manifests"
        desc="The bus attendant's current passenger list. Boarding, alighting, and handovers are separate events — each records who confirmed, via what method, and when. Trip events queue offline and sync with conflict checking."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Trip">
          <div className={styles.statBlock}>
            <span className={styles.statBlockLabel}>Route</span>
            <span className={styles.statBlockValue} style={{ fontSize: '1rem' }}>R2 — Baba Dogo</span>
            <span className={styles.statBlockSub}>KBY 118C · morning · Peter Otieno / Grace Achieng</span>
          </div>
        </Card>
        <Card title="Boarded">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#16a34a' }}>{boarded}/{passengers.length}</span>
            <span className={styles.statBlockSub}>Confirmed at pickup</span>
          </div>
        </Card>
        <Card title="Alighted">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{alighted}/{passengers.length}</span>
            <span className={styles.statBlockSub}>Confirmed at drop-off</span>
          </div>
        </Card>
        <Card title="Handover complete">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: handedOver === passengers.length ? '#16a34a' : 'var(--secondary)' }}>
              {handedOver}/{passengers.length}
            </span>
            <span className={styles.statBlockSub}>Authorised collector verified</span>
          </div>
        </Card>
      </div>

      <Card title="Tap to record — Board → Alight → Handover">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr><th>Passenger</th><th>Pickup</th><th>Drop-off</th><th>Boarded</th><th>Alighted</th><th>Handover</th><th>Collector</th></tr>
            </thead>
            <tbody>
              {passengers.map((p) => (
                <tr key={p.admission}>
                  <td>
                    <div className={styles.identity}>
                      <span className={styles.avatar}>{p.name.split(' ').map((n) => n[0]).join('')}</span>
                      <div>
                        <div className={styles.tdStrong}>{p.name}</div>
                        <div className={styles.mono}>{p.admission}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.pickup}</td>
                  <td>{p.stop}</td>
                  <td>
                    <button
                      className={`${styles.segment} ${p.board ? styles.active : ''}`}
                      onClick={() => toggle(p.admission, 'board')}
                      style={{
                        borderRadius: '8px',
                        background: p.board ? '#16a34a' : 'var(--bg-tertiary)',
                        color: p.board ? 'white' : 'var(--text-tertiary)',
                        padding: '0.3rem 0.7rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                      }}
                    >
                      {p.board ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${styles.segment} ${p.alight ? styles.active : ''}`}
                      onClick={() => toggle(p.admission, 'alight')}
                      style={{
                        borderRadius: '8px',
                        background: p.alight ? '#16a34a' : 'var(--bg-tertiary)',
                        color: p.alight ? 'white' : 'var(--text-tertiary)',
                        padding: '0.3rem 0.7rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                      }}
                    >
                      {p.alight ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`${styles.segment} ${p.handover ? styles.active : ''}`}
                      onClick={() => toggle(p.admission, 'handover')}
                      style={{
                        borderRadius: '8px',
                        background: p.handover ? '#16a34a' : 'var(--bg-tertiary)',
                        color: p.handover ? 'white' : 'var(--text-tertiary)',
                        padding: '0.3rem 0.7rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                      }}
                    >
                      {p.handover ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td>{p.handover ? <Chip tone="ok">{p.collector}</Chip> : <span style={{ color: 'var(--text-tertiary)' }}>Not yet recorded</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Confirm trip complete</button>
          <button className={styles.btn}>Queue offline — sync later</button>
          <button className={styles.btn}>Report incident</button>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <Chip tone="warn">A fee balance must never prevent a safe handover — finance cannot silently control child-safety decisions</Chip>
        </div>
      </Card>
    </div>
  );
}