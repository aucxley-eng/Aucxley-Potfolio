import { motion } from 'framer-motion';
import styles from './SearchBar.module.css';

export default function SearchBar({ searchTerm, onSearchChange, onTagFilter, filterTag, allTags }) {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search by title, description, or technology..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.input}
        />
        {searchTerm && (
          <button className={styles.clearBtn} onClick={() => onSearchChange('')} aria-label="Clear search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.tags}>
        <motion.button
          className={`${styles.tag} ${!filterTag ? styles.active : ''}`}
          onClick={() => onTagFilter('')}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {allTags.map(tag => (
          <motion.button
            key={tag}
            className={`${styles.tag} ${filterTag === tag ? styles.active : ''}`}
            onClick={() => onTagFilter(tag === filterTag ? '' : tag)}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
