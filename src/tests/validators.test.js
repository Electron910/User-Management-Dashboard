import { describe, it, expect } from 'vitest';
import { validateUserForm, isFormValid } from '../utils/validators';

// Unit tests verifying pure validation rules and error message generation
describe('validateUserForm', () => {
  it('returns errors for empty form values', () => {
    const errors = validateUserForm({ firstName: '', lastName: '', email: '', department: '' });
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.department).toBeDefined();
  });

  it('rejects invalid email formats', () => {
    const errors = validateUserForm({ firstName: 'John', lastName: 'Doe', email: 'not-an-email', department: 'IT' });
    expect(errors.email).toMatch(/valid email/i);
  });

  it('accepts a fully valid form data object', () => {
    const errors = validateUserForm({ firstName: 'John', lastName: 'Doe', email: 'john@doe.com', department: 'IT' });
    expect(Object.keys(errors).length).toBe(0);
  });

  it('rejects firstName shorter than 2 characters', () => {
    const errors = validateUserForm({ firstName: 'J', lastName: 'Doe', email: 'j@d.com', department: 'IT' });
    expect(errors.firstName).toBeDefined();
  });
});

describe('isFormValid', () => {
  it('returns true for valid data matching all requirements', () => {
    expect(isFormValid({ firstName: 'Jane', lastName: 'Smith', email: 'jane@smith.com', department: 'HR' })).toBe(true);
  });
  it('returns false when any required field is invalid or missing', () => {
    expect(isFormValid({ firstName: '', lastName: '', email: '', department: '' })).toBe(false);
  });
});
