import { useState } from 'react';
import { Card, Chip, PageIntro, SimNote } from '../../ui';
import { inventory } from '../bizMockData';
import styles from '../../DemoApp.module.css';

const k = (n) => `KES ${n.toLocaleString()}`;

const TIERS = [
  { key: 'restored', label: 'Restored (second-hand)' },
  { key: 'newStock', label: 'New stock' },
  { key: 'rawMaterial', label: 'Raw materials' },
];

export default function Inventory() {
  const [tier, setTier] = useState('restored');
  const rows = inventory[tier];

  const low = (r) => (tier === 'rawMaterial' ? r.stock < r.reorder * 1.5 : r.stock < r.reorder);

  return (
    <div>
      <PageIntro
        title="Inventory — three tiers, one truth"
        desc="Restored goods come from bought-then-repaired items; new stock is purchased finished. Raw materials feed the workshop. Every tier auto-alerts at its reorder level so you never stall a work order or a sale."
      />
      <SimNote />

      <div className={styles.segmentRow}>
        {TIERS.map((t) => (
          <button
            key={t.key}
            className={`${styles.segment} ${tier === t.key ? styles.active : ''}`}
            onClick={() => setTier(t.key)}
          >
            {t.label} · {inventory[t.key].length} items
          </button>
        ))}
      </div>

      <Card title={TIERS.find((t) => t.key === tier).label} action={<Chip tone="warn">{rows.filter(low).length} at reorder level</Chip>}>
        <div className={styles.tableWrap} style={{ border: 'none', boxShadow: 'none', background: 'none' }}>
          <table className={styles.table} style={{ minWidth: '640px' }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>On hand</th>
                <th>Reorder at</th>
                <th>{tier === 'rawMaterial' ? 'Unit cost' : 'Cost'}</th>
                {tier !== 'rawMaterial' && <th>Selling price</th>}
                {tier !== 'rawMaterial' && <th>Margin</th>}
                {tier === 'rawMaterial' && <th>Feeds</th>}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const margin = tier !== 'rawMaterial' ? Math.round((1 - r.cost / r.price) * 100) : null;
                return (
                  <tr key={r.item}>
                    <td className={styles.tdStrong} style={{ maxWidth: '240px' }}>{r.item}</td>
                    <td className={styles.mono}>{r.stock.toLocaleString()} {r.unit || ''}</td>
                    <td className={styles.mono}>{r.reorder} {r.unit || ''}</td>
                    <td className={styles.amount}>{k(r.cost)}</td>
                    {tier !== 'rawMaterial' && <td className={styles.amount}>{k(r.price)}</td>}
                    {tier !== 'rawMaterial' && <td><Chip tone={margin >= 45 ? 'ok' : 'neut'}>{margin}%</Chip></td>}
                    {tier === 'rawMaterial' && <td style={{ fontSize: '0.78rem', maxWidth: '180px' }}>{r.note}</td>}
                    <td>
                      {low(r)
                        ? <Chip tone="bad">Reorder</Chip>
                        : r.stock < r.reorder * 2 ? <Chip tone="warn">Getting low</Chip>
                        : <Chip tone="ok">Healthy</Chip>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <Chip tone="neut">Stock movements come from purchases, work orders and sales — never free-typed amounts.</Chip>
        </div>
      </Card>
    </div>
  );
}