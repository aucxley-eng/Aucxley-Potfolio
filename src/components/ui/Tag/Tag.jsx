import React from 'react';
import styles from './Tag.module.css';

const Tag = ({ children }) => {
  return (
    <span className={styles.tag}>
      {children}
    </span>
  );
};

export default Tag;