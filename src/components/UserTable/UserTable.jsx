import React from 'react';
import styles from './UserTable.module.css';
import UserRow from '../UserRow/UserRow';
import { SORT_DIRECTIONS } from '../../utils/constants';

// Renders the structured data grid with sortable headers, loading skeletons, and empty state
export default function UserTable({ users, isLoading, error, sortField, sortDirection, onSort, onEdit, onDelete }) {
  // Returns appropriate sorting arrow indicator for column header
  function getSortIndicator(field) {
    if (sortField !== field) return '↕';
    return sortDirection === SORT_DIRECTIONS.ASC ? '↑' : '↓';
  }

  if (error) {
    return (
      <div className={styles.errorBanner} role="alert">
        <p><strong>System Alert:</strong> {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th
              onClick={() => onSort('firstName')}
              aria-sort={sortField === 'firstName' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              className={styles.sortable}
            >
              First Name <span className={styles.indicator}>{getSortIndicator('firstName')}</span>
            </th>
            <th
              onClick={() => onSort('lastName')}
              aria-sort={sortField === 'lastName' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              className={styles.sortable}
            >
              Last Name <span className={styles.indicator}>{getSortIndicator('lastName')}</span>
            </th>
            <th
              onClick={() => onSort('email')}
              aria-sort={sortField === 'email' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              className={styles.sortable}
            >
              Email <span className={styles.indicator}>{getSortIndicator('email')}</span>
            </th>
            <th
              onClick={() => onSort('department')}
              aria-sort={sortField === 'department' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              className={styles.sortable}
            >
              Department <span className={styles.indicator}>{getSortIndicator('department')}</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody aria-live="polite">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className={styles.skeletonRow}>
                <td><div className={styles.skeletonBox} /></td>
                <td><div className={styles.skeletonBox} /></td>
                <td><div className={styles.skeletonBox} /></td>
                <td><div className={styles.skeletonBox} /></td>
                <td><div className={styles.skeletonBox} /></td>
                <td><div className={styles.skeletonBox} /></td>
              </tr>
            ))
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.emptyState}>
                No users found matching your search or filter criteria.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
