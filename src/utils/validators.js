// Regular expression to validate standard email structure (e.g. user@domain.com)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validates form fields and returns an object containing field-specific error messages
export function validateUserForm(formData) {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required.';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.department?.trim()) {
    errors.department = 'Department is required.';
  }

  return errors;
}

// Helper to quickly check if the entire form is valid (zero errors)
export function isFormValid(formData) {
  return Object.keys(validateUserForm(formData)).length === 0;
}
