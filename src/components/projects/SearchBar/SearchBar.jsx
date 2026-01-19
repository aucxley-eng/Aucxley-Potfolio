import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchTerm, onSearchChange, onTagFilter, filterTag, allTags }) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.tagFilters}>
        <button
          className={`${styles.tagFilter} ${!filterTag ? styles.active : ''}`}
          onClick={() => onTagFilter('')}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`${styles.tagFilter} ${filterTag === tag ? styles.active : ''}`}
            onClick={() => onTagFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;