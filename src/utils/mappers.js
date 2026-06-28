import { DEPARTMENTS } from './constants';

// Maps raw JSONPlaceholder API user to internal app structure
// Splits full name into first/last name and assigns a stable department based on ID
export function mapApiUserToAppUser(apiUser) {
  const nameParts = apiUser.name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
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
