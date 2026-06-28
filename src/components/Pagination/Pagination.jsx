import React from 'react';
import styles from './Pagination.module.css';
import { PAGE_SIZE_OPTIONS } from '../../utils/constants';

// Responsive navigation controls for managing visible records and page sizes
export default function Pagination({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }) {
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.pagination}>
      <div className={styles.pageInfo}>
        Showing {totalItems === 0 ? 0 : startIndex}–{endIndex} of {totalItems} users
      </div>

      <div className={styles.controls}>
        <div className={styles.pageSizeWrapper}>
          <label htmlFor="pageSizeSelect">Rows per page:</label>
          <select
            id="pageSizeSelect"
            className={styles.select}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className={styles.btnGroup}>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || totalItems === 0}
            aria-label="First page"
          >
            «
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalItems === 0}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className={styles.pageText}>
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalItems === 0}
            aria-label="Next page"
          >
            ›
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalItems === 0}
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
