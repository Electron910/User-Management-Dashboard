import React from 'react';
import styles from './SearchBar.module.css';

// Controlled search input filtering users in memory instantly on change
export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search users"
        role="search"
      />
      {value && (
        <button
          className={styles.clearBtn}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
