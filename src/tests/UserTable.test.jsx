import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserTable from '../components/UserTable/UserTable';

const MOCK_USERS = [
  { id: 1, firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', department: 'Engineering' }
];

// Component tests verifying table grid states: loading, error, empty, and populated rows
describe('UserTable Component', () => {
  it('displays skeleton loading elements when isLoading prop is true', () => {
    const { container } = render(<UserTable users={[]} isLoading={true} error={null} onSort={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(container.querySelector('tbody')).toBeInTheDocument();
    expect(container.querySelectorAll('tr').length).toBeGreaterThan(1); // includes header + skeletons
  });

  it('displays friendly alert banner when error prop contains a message', () => {
    render(<UserTable users={[]} isLoading={false} error="Failed to load users" onSort={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Failed to load users/i)).toBeInTheDocument();
  });

  it('displays explicit empty state message when user list is empty', () => {
    render(<UserTable users={[]} isLoading={false} error={null} onSort={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/No users found matching your search or filter criteria/i)).toBeInTheDocument();
  });

  it('correctly renders user details inside table cells when data is provided', () => {
    render(<UserTable users={MOCK_USERS} isLoading={false} error={null} onSort={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Brown')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
});
