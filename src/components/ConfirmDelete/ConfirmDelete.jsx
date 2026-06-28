import React, { useEffect, useRef } from 'react';
import styles from './ConfirmDelete.module.css';

// Modal confirmation dialog preventing accidental user deletions
export default function ConfirmDelete({ user, onConfirm, onCancel }) {
  const modalRef = useRef(null);

  // Focus lock and keyboard support
  useEffect(() => {
    const focusable = modalRef.current?.querySelectorAll('button');
    const firstElement = focusable?.[0];
    const lastElement = focusable?.[focusable.length - 1];

    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    }
    firstElement?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-backdrop">
      <div className="modal-box" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
        <h2 id="confirmTitle" className={styles.title}>Confirm Deletion</h2>
        <p className={styles.message}>
          Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>? This action cannot be undone.
        </p>
        <div className={styles.footer}>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
