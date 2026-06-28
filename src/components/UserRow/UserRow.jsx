import React from 'react';
import styles from './UserRow.module.css';

// Renders an individual user table row containing data fields and local action buttons
export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>#{user.id}</td>
      <td className={styles.cell}>{user.firstName}</td>
      <td className={styles.cell}>{user.lastName}</td>
      <td className={styles.cell}>{user.email}</td>
      <td className={styles.cell}>
        <span className={styles.badge}>{user.department}</span>
      </td>
      <td className={styles.actions}>
        <button
          className="btn btn-secondary"
          onClick={() => onEdit(user)}
          aria-label={`Edit ${user.firstName} ${user.lastName}`}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(user)}
          aria-label={`Delete ${user.firstName} ${user.lastName}`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
