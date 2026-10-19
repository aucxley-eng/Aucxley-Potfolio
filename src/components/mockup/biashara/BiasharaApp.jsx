import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BiasharaApp.module.css';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Manufacturing from './pages/Manufacturing';
import Inventory from './pages/Inventory';
import Purchases from './pages/Purchases';
import Loans from './pages/Loans';
import Cash from './pages/Cash';
import Mpesa from './pages/Mpesa';
import Reports from './pages/Reports';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Overview', group: 'Overview', Page: Dashboard },
  { key: 'sales', label: 'Sales', group: 'Business', Page: Sales },
  { key: 'manufacturing', label: 'Manufacturing', group: 'Business', Page: Manufacturing },
  { key: 'inventory', label: 'Inventory', group: 'Business', Page: Inventory },
  { key: 'purchases', label: 'Purchases', group: 'Business', Page: Purchases },
  { key: 'loans', label: 'Loans', group: 'Money', Page: Loans },
  { key: 'cash', label: 'Cash & Ledger', group: 'Money', Page: Cash },
  { key: 'mpesa', label: 'M-Pesa Auto-capture', group: 'Money', Page: Mpesa },
  { key: 'reports', label: 'Reports', group: 'Visibility', Page: Reports },
];

const GROUP_ORDER = ['Overview', 'Business', 'Money', 'Visibility'];

export default function BiasharaApp({ onBack }) {
  const [pageKey, setPageKey] = useState('dashboard');
  const activeItem = NAV_ITEMS.find((i) => i.key === pageKey);
  const Page = activeItem.Page;

  return (
    <div className={styles.demo}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>BI</span>
          <span className={styles.brandName}>
            Biashara
            <span className={styles.brandSub}>Business Management System</span>
          </span>
        </div>
        <div className={styles.topRight}>
          <span className={styles.liveIndicator}>● Live — connected</span>
          <span className={styles.demoBadge}>Interactive preview</span>
          <button className={styles.backBtn} onClick={onBack}>Exit demo</button>
        </div>
      </header>

      <div className={styles.infoBar}>
        Owner workspace · furniture, mattresses &amp; sofas — buy, restore, sell · <strong>one app, two channels</strong> for money auto-capture
      </div>

      <div className={styles.layout}>
        <nav className={styles.sidebar}>
          {GROUP_ORDER.map((group) => {
            const groupItems = NAV_ITEMS.filter((i) => i.group === group);
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
              <Page />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}