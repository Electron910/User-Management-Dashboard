import React from 'react';
import styles from './Toast.module.css';

// Fixed overlay banner providing immediate feedback on user actions
export default function Toast({ message, type }) {
  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <p>{message}</p>
    </div>
  );
}
