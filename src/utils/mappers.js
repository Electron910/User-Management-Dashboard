import { DEPARTMENTS } from './constants';

// Maps raw JSONPlaceholder API user to internal app structure
// Splits full name into first/last name and assigns a stable department based on ID
export function mapApiUserToAppUser(apiUser) {
  const nameParts = apiUser.name.trim().split(' ');
  let firstName = nameParts[0] || '';
  let lastName = nameParts.slice(1).join(' ') || '';

  // Group titles (e.g., Mrs., Mr., Dr.) with the first name
  if (nameParts.length > 2 && (nameParts[0].endsWith('.') || ['Mr', 'Mrs', 'Ms', 'Dr'].includes(nameParts[0]))) {
    firstName = `${nameParts[0]} ${nameParts[1]}`;
    lastName = nameParts.slice(2).join(' ');
  }

  const department = DEPARTMENTS[apiUser.id % DEPARTMENTS.length];

  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email,
    department,
  };
}

// Converts internal app user structure back to API expected payload shape
// Joins first and last name; excludes department as it is client-side only
export function mapAppUserToApiPayload(appUser) {
  return {
    name: `${appUser.firstName} ${appUser.lastName}`.trim(),
    email: appUser.email,
  };
}
