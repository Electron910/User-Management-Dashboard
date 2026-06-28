import { SORT_DIRECTIONS } from './constants';

// Filters users by checking if query matches firstName, lastName, or email (case-insensitive)
export function filterBySearchQuery(users, query) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return users;

  return users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(normalizedQuery) ||
      user.lastName.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery)
  );
}

// Filters users using targeted filter fields (AND logic across all active criteria)
export function filterByFields(users, filters) {
  return users.filter((user) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value.trim()) return true;
      return user[key]?.toLowerCase().includes(value.toLowerCase().trim());
    })
  );
}

// Sorts users array based on specified field and direction without mutating original array
export function sortUsers(users, sortField, sortDirection) {
  if (!sortField) return users;

  return [...users].sort((a, b) => {
    const valA = (a[sortField] || '').toLowerCase();
    const valB = (b[sortField] || '').toLowerCase();

    const comparison = valA.localeCompare(valB);
    return sortDirection === SORT_DIRECTIONS.ASC ? comparison : -comparison;
  });
}

// Slices the user list to return only the subset for the active page
export function paginateUsers(users, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return users.slice(startIndex, startIndex + pageSize);
}

// Calculates total page count based on total items and page size
export function getTotalPages(totalItems, pageSize) {
  return Math.ceil(totalItems / pageSize);
}

// Generates a temporary unique ID for new users added locally before API persistence
export function generateTempId() {
  return `temp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
