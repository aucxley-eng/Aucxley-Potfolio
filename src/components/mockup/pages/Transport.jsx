import { Card, PageIntro, SimNote, Chip } from '../ui';
import { routes, todayTrips, incidents } from '../mockData';
import styles from '../DemoApp.module.css';

export default function Transport() {
  return (
    <div>
      <PageIntro
        title="Transport & trips"
        desc="Logistics answers four questions: what was planned, what happened, who confirmed it, and what needs attention. A vehicle location alone never proves a child boarded or reached an authorised adult."
      />
      <SimNote />
      <div className={styles.statGrid}>
        <Card title="Trips today">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>{todayTrips.length}</span>
            <span className={styles.statBlockSub}>Across {routes.length} active routes</span>
          </div>
        </Card>
        <Card title="Boarded today">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue}>
              {todayTrips.reduce((s, t) => s + t.boarded, 0)}
            </span>
            <span className={styles.statBlockSub}>Of capacity {todayTrips.reduce((s, t) => s + t.capacity, 0)}</span>
          </div>
        </Card>
        <Card title="Handovers pending">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: 'var(--secondary)' }}>3</span>
            <span className={styles.statBlockSub}>Awaiting collector confirmation</span>
          </div>
        </Card>
        <Card title="Open incidents">
          <div className={styles.statBlock}>
            <span className={styles.statBlockValue} style={{ color: '#dc2626' }}>{incidents.filter((i) => i.status !== 'Resolved').length}</span>
            <span className={styles.statBlockSub}>{incidents.filter((i) => i.status === 'Resolved').length} resolved this week</span>
          </div>
        </Card>
      </div>

      <Card title="Today's trips">
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr><th>Route</th><th>Bus</th><th>Driver</th><th>Attendant</th><th>On board</th><th>Phase</th><th>Assigned handovers</th><th>Attention</th></tr>
            </thead>
            <tbody>
              {todayTrips.map((t) => (
                <tr key={`${t.route}${t.direction}`}>
                  <td>
                    <div className={styles.tdStrong}>{t.route}</div>
                    <div className={styles.mono} style={{ color: 'var(--text-tertiary)' }}>{t.direction}</div>
                  </td>
                  <td className={styles.mono}>{t.bus}</td>
                  <td>{t.driver}</td>
                  <td>{t.attendant}</td>
                  <td>{t.boarded} / {t.capacity}</td>
                  <td><Chip tone={t.status}>{t.phase}</Chip></td>
                  <td>{t.handovers}</td>
                  <td>
                    {t.attention
                      ? <Chip tone="warn">{t.attention}</Chip>
                      : <Chip tone="ok">All clear</Chip>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.9rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Assign crews, resolve missing check-ins, and open passenger manifests:</span>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Open passenger manifests</button>
          <button className={styles.btn}>Plan tomorrow</button>
          <button className={styles.btn}>Add incident</button>
        </div>
      </Card>

      <div className={styles.grid2}>
        <Card title="Routes & assignments">
          <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
            <table className={styles.table} style={{ minWidth: '460px' }}>
              <thead><tr><th>Route</th><th>Vehicle</th><th>Stops</th><th>Service</th></tr></thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.name}>
                    <td className={styles.tdStrong}>{r.name}</td>
                    <td className={styles.mono}>{r.vehicle} <span style={{ color: 'var(--text-tertiary)' }}>({r.capacity} seats)</span></td>
                    <td>{r.stops.join(', ')}</td>
                    <td>{r.serviceDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Incident log" action={<Chip tone="warn">{incidents.filter((i) => i.status !== 'Resolved').length} open</Chip>}>
          <div className={styles.feed}>
            {incidents.map((inc, i) => (
              <div key={i} className={styles.feedItem}>
                <span className={`${styles.feedDot} ${inc.status === 'Resolved' ? styles.ok : styles.bad}`} />
                <div style={{ flex: 1 }}>
                  <div className={styles.feedText}>
                    <strong>{inc.type}</strong> · {inc.route} — {inc.detail}
                  </div>
                  <div className={styles.feedTime}>{inc.time} · {inc.owner}</div>
                </div>
                {inc.status === 'Resolved' ? <Chip tone="ok">Resolved</Chip> : <Chip tone="bad">{inc.status}</Chip>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}