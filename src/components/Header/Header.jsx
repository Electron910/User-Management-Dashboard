import React from 'react';
import styles from './Header.module.css';

// Renders top application navigation bar and prominent Add User action
export default function Header({ onAddUser }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>User Management Dashboard</h1>
        <button className="btn btn-primary" onClick={onAddUser}>
          + Add User
        </button>
      </div>
    </header>
  );
}
