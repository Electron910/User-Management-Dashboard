// Base API URL with fallback to JSONPlaceholder for local development
export const API_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com/users';

// Available page size options for pagination controls
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Default initial records per page
export const DEFAULT_PAGE_SIZE = 10;

// Standard department list used for assignment and dropdown selections
export const DEPARTMENTS = ['Engineering', 'HR', 'Sales', 'Finance', 'IT', 'Marketing', 'Operations'];

// Sorting direction constants
export const SORT_DIRECTIONS = { ASC: 'asc', DESC: 'desc' };

// Sortable field keys matching the user object structure
export const SORT_FIELDS = { FIRST_NAME: 'firstName', LAST_NAME: 'lastName', EMAIL: 'email', DEPARTMENT: 'department' };
