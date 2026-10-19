import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DemoApp.module.css';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import CbcAssessment from './pages/CbcAssessment';
import Fees from './pages/Fees';
import Transport from './pages/Transport';
import Manifests from './pages/Manifests';
import Meals from './pages/Meals';
import Stock from './pages/Stock';
import SmsLog from './pages/SmsLog';
import Reports from './pages/Reports';
import Kemis from './pages/Kemis';
import ParentPortal from './pages/Portals';
import { roleWorkspaces } from './mockData';

const ROLES = [
  { key: 'head', label: 'Head teacher' },
  { key: 'admissions', label: 'Admissions' },
  { key: 'bursar', label: 'Bursar' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'transport', label: 'Transport coord.' },
  { key: 'attendant', label: 'Bus attendant' },
  { key: 'kitchen', label: 'Kitchen staff' },
  { key: 'storekeeper', label: 'Storekeeper' },
  { key: 'parent', label: 'Parent' },
];

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', group: 'Overview', Page: Dashboard, roles: ['head', 'bursar', 'teacher', 'transport'] },
  { key: 'learners', label: 'Learner Records', group: 'Records', Page: Students, roles: ['head', 'admissions'] },
  { key: 'attendance', label: 'Attendance', group: 'Academics', Page: Attendance, roles: ['head', 'teacher'] },
  { key: 'assessment', label: 'Assessments', group: 'Academics', Page: CbcAssessment, roles: ['teacher'] },
  { key: 'reports', label: 'Reports & Approval', group: 'Academics', Page: Reports, roles: ['head', 'teacher'] },
  { key: 'finance', label: 'Finance', group: 'Finance', Page: Fees, roles: ['head', 'bursar'] },
  { key: 'transport', label: 'Transport & Trips', group: 'Logistics', Page: Transport, roles: ['head', 'transport'] },
  { key: 'manifests', label: 'Passenger Manifests', group: 'Logistics', Page: Manifests, roles: ['transport', 'attendant'] },
  { key: 'meals', label: 'Meals & Kitchen', group: 'Logistics', Page: Meals, roles: ['head', 'kitchen'] },
  { key: 'stock', label: 'Stock & Uniforms', group: 'Logistics', Page: Stock, roles: ['head', 'storekeeper'] },
  { key: 'kemis', label: 'KEMIS', group: 'Compliance', Page: Kemis, roles: ['head', 'admissions'] },
  { key: 'sms', label: 'SMS & Alerts', group: 'Communications', Page: SmsLog, roles: ['head'] },
  { key: 'parent', label: 'Parent Portal', group: 'Portals', Page: ParentPortal, roles: ['parent'] },
];

const ROLE_HOME = {
  head: 'dashboard',
  admissions: 'learners',
  bursar: 'dashboard',
  teacher: 'dashboard',
  transport: 'transport',
  attendant: 'manifests',
  kitchen: 'meals',
  storekeeper: 'stock',
  parent: 'parent',
};

export default function DemoApp({ onBack }) {
  const [role, setRole] = useState('head');
  const [pageKey, setPageKey] = useState(ROLE_HOME.head);

  const items = NAV_ITEMS.filter((i) => i.roles.includes(role));
  const activeItem = items.find((i) => i.key === pageKey) || items[0];
  const Page = activeItem.Page;

  const switchRole = (next) => {
    setRole(next);
    setPageKey(ROLE_HOME[next]);
  };

  return (
    <div className={styles.demo}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>SH</span>
          <span className={styles.brandName}>
            SchoolHub Academy
            <span className={styles.brandSub}>School Management System</span>
          </span>
        </div>
        <div className={styles.roleSwitcher}>
          {ROLES.map((r) => (
            <button
              key={r.key}
              className={`${styles.segment} ${role === r.key ? styles.active : ''}`}
              onClick={() => switchRole(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className={styles.topRight}>
          <span className={styles.liveIndicator}>● Live — connected</span>
          <span className={styles.demoBadge}>Interactive preview</span>
          <button className={styles.backBtn} onClick={onBack}>Exit demo</button>
        </div>
      </header>

      <div className={styles.roleMeta}>
        <span>Viewing as</span>
        <strong>{ROLES.find((r) => r.key === role).label}</strong>
        <span>·</span>
        <span>{roleWorkspaces[role]}</span>
      </div>

      <div className={styles.layout}>
        <nav className={styles.sidebar}>
          {['Overview', 'Records', 'Academics', 'Finance', 'Logistics', 'Compliance', 'Communications', 'Portals'].map((group) => {
            const groupItems = items.filter((i) => i.group === group);
            if (!groupItems.length) return null;
            return (
              <div key={group}>
                <div className={styles.navGroup}>{group}</div>
                {groupItems.map((i) => (
                  <button
                    key={i.key}
                    className={`${styles.navItem} ${i.key === activeItem.key ? styles.active : ''}`}
                    onClick={() => setPageKey(i.key)}
                  >
                    <span className={styles.navDot} />
                    {i.label}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        <main className={styles.main}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Page role={role} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}