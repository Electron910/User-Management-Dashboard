import React, { useState, useEffect, useRef } from 'react';
import styles from './UserForm.module.css';
import { DEPARTMENTS } from '../../utils/constants';
import { validateUserForm } from '../../utils/validators';

// Accessible popup modal handling validation and submission for Add and Edit user modes
export default function UserForm({ user, onSubmit, onClose }) {
  const isEditMode = Boolean(user?.id);
  const [formData, setFormData] = useState({
    id: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    department: user?.department || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  // Trap focus and handle escape key close
  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
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
  }, [onClose]);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-box" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className={styles.header}>
          <h2 id="modalTitle">{isEditMode ? 'Edit User' : 'Add New User'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="e.g. Jane"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && <span id="firstName-error" className={styles.errorText}>{errors.firstName}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="e.g. Doe"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && <span id="lastName-error" className={styles.errorText}>{errors.lastName}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. jane.doe@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <span id="email-error" className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              aria-invalid={Boolean(errors.department)}
              aria-describedby={errors.department ? 'department-error' : undefined}
            >
              <option value="">Select a department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <span id="department-error" className={styles.errorText}>{errors.department}</span>}
          </div>

          <div className={styles.footer}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
