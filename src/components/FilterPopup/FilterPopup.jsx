import React, { useState, useEffect, useRef } from 'react';
import styles from './FilterPopup.module.css';
import { DEPARTMENTS } from '../../utils/constants';

// Interactive floating filter popover with multi-criteria inputs
export default function FilterPopup({ filters, onApply, onClear, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const popupRef = useRef(null);

  // Close popup on escape key press or outside click
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  function handleChange(field, value) {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className={styles.popover} ref={popupRef} role="dialog" aria-label="Filter users">
      <div className={styles.header}>
        <h3>Filter Users</h3>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close filter popup">✕</button>
      </div>

      <div className={styles.body}>
        <div className={styles.field}>
          <label>First Name</label>
          <input
            type="text"
            value={localFilters.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div className={styles.field}>
          <label>Last Name</label>
          <input
            type="text"
            value={localFilters.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
          />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input
            type="text"
            value={localFilters.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className={styles.field}>
          <label>Department</label>
          <select
            value={localFilters.department}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.footer}>
        <button className="btn btn-secondary" onClick={onClear}>Clear</button>
        <button className="btn btn-primary" onClick={() => onApply(localFilters)}>Apply</button>
      </div>
    </div>
  );
}
