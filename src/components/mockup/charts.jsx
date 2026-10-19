import { motion } from 'framer-motion';
import styles from './DemoApp.module.css';

export function BarChart({ data, height = 160 }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className={styles.barChart} style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className={styles.barCol}>
          <div className={styles.barTrack}>
            <motion.div
              className={styles.barFill}
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.barValue}>{d.value}</span>
            </motion.div>
          </div>
          <span className={styles.barLabel}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ data, size = 140, thickness = 16 }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const offsetFor = (i) => data.slice(0, i).reduce((s, d) => s + (d.value / total) * c, 0);

  return (
    <div className={styles.donutWrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-tertiary)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const dash = (d.value / total) * c;
            return (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offsetFor(i)}
                initial={{ strokeDashoffset: c * 0.001 }}
                whileInView={{ strokeDashoffset: -offsetFor(i) }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />
            );
          })}
        </g>
      </svg>
      <div className={styles.donutCenter}>
        <strong>{total.toLocaleString()}</strong>
        <span>total</span>
      </div>
    </div>
  );
}

const POINTS = 7;
const POLY = (cx, cy, radius, values, max) =>
  values
    .map((v, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / POINTS;
      const r = (v / max) * radius;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(' ');

const LEVEL_PATH = (cx, cy, radius, level, max) =>
  Array.from({ length: POINTS }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / POINTS;
    const r = (level / max) * radius;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');

export function RadarChart({ values, labels, max = 4, size = 320 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 40;

  return (
    <svg className={styles.radar} width="100%" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="CBC competency radar chart">
      {[1, 2, 3, 4].map((level) => (
        <polygon
          key={level}
          points={LEVEL_PATH(cx, cy, radius, level, max)}
          fill="none"
          stroke="var(--glass-border)"
          strokeWidth="1"
        />
      ))}
      {labels.map((label, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / POINTS;
        const x = cx + (radius + 16) * Math.cos(angle);
        const y = cy + (radius + 16) * Math.sin(angle);
        return (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor={Math.abs(x - cx) < 12 ? 'middle' : x > cx ? 'start' : 'end'}
            dominantBaseline="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            {label}
          </text>
        );
      })}
      <polygon
        points={POLY(cx, cy, radius, values, max)}
        fill="var(--secondary)"
        fillOpacity="0.22"
        stroke="var(--secondary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {values.map((v, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / POINTS;
        const x = cx + (v / max) * radius * Math.cos(angle);
        const y = cy + (v / max) * radius * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="3.5" fill="var(--accent)" />;
      })}
    </svg>
  );
}