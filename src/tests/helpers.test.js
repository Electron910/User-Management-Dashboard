import { describe, it, expect } from 'vitest';
import { filterBySearchQuery, sortUsers, paginateUsers, getTotalPages } from '../utils/helpers';

const MOCK_USERS = [
  { id: 1, firstName: 'Alice', lastName: 'Brown',  email: 'alice@x.com', department: 'IT' },
  { id: 2, firstName: 'Bob',   lastName: 'Smith',  email: 'bob@y.com',   department: 'HR' },
  { id: 3, firstName: 'Carol', lastName: 'Jones',  email: 'carol@z.com', department: 'IT' },
];

// Verify pure utility functions handling search matching, sorting logic, and pagination math
describe('filterBySearchQuery', () => {
  it('filters correctly by first name substring', () => {
    expect(filterBySearchQuery(MOCK_USERS, 'ali')).toHaveLength(1);
  });
  it('returns all users when search query is empty', () => {
    expect(filterBySearchQuery(MOCK_USERS, '')).toHaveLength(3);
  });
  it('performs case-insensitive query matching', () => {
    expect(filterBySearchQuery(MOCK_USERS, 'BOB')).toHaveLength(1);
  });
});

describe('sortUsers', () => {
  it('sorts ascending alphabetically by firstName', () => {
    const sorted = sortUsers(MOCK_USERS, 'firstName', 'asc');
    expect(sorted[0].firstName).toBe('Alice');
    expect(sorted[2].firstName).toBe('Carol');
  });
  it('sorts descending alphabetically by firstName', () => {
    const sorted = sortUsers(MOCK_USERS, 'firstName', 'desc');
    expect(sorted[0].firstName).toBe('Carol');
  });
  it('maintains original array order when sort field is empty', () => {
    expect(sortUsers(MOCK_USERS, '', 'asc')).toEqual(MOCK_USERS);
  });
});

describe('paginateUsers', () => {
  it('returns the correct slice of users for the requested active page', () => {
    expect(paginateUsers(MOCK_USERS, 1, 2)).toHaveLength(2);
  });
  it('returns only the remaining subset of items on the final page', () => {
    expect(paginateUsers(MOCK_USERS, 2, 2)).toHaveLength(1);
  });
});

describe('getTotalPages', () => {
  it('calculates expected total page count based on items and page size', () => {
    expect(getTotalPages(47, 10)).toBe(5);
    expect(getTotalPages(10, 10)).toBe(1);
    expect(getTotalPages(0, 10)).toBe(0);
  });
});
