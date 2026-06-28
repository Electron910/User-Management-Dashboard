import { describe, it, expect } from 'vitest';
import { mapApiUserToAppUser } from '../utils/mappers';

// Unit tests validating API response object transformation into internal app structures
describe('mapApiUserToAppUser', () => {
  it('splits standard single-space full names into first and last name correctly', () => {
    const result = mapApiUserToAppUser({ id: 1, name: 'Leanne Graham', email: 'leanne@x.com' });
    expect(result.firstName).toBe('Leanne');
    expect(result.lastName).toBe('Graham');
  });

  it('correctly preserves multi-word last names during string split extraction', () => {
    const result = mapApiUserToAppUser({ id: 2, name: 'Mary Van Den Berg', email: 'mary@x.com' });
    expect(result.firstName).toBe('Mary');
    expect(result.lastName).toBe('Van Den Berg');
  });

  it('assigns a stable, deterministic department across repeated invocations', () => {
    const first  = mapApiUserToAppUser({ id: 3, name: 'A B', email: 'a@b.com' });
    const second = mapApiUserToAppUser({ id: 3, name: 'A B', email: 'a@b.com' });
    expect(first.department).toBe(second.department);
  });
});
