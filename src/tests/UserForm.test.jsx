import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm/UserForm';

// Component integration tests verifying rendering modes and form validation behavior
describe('UserForm Component', () => {
  it('renders Add New User heading when user prop is empty', () => {
    render(<UserForm user={{}} onSubmit={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('renders Edit User heading and pre-populates input fields when editing existing user', () => {
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@doe.com', department: 'IT' };
    render(<UserForm user={mockUser} onSubmit={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Edit User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@doe.com')).toBeInTheDocument();
  });

  it('displays validation error messages when attempting to submit empty fields', async () => {
    render(<UserForm user={{}} onSubmit={vi.fn()} onClose={vi.fn()} />);
    fireEvent.click(screen.getByText('Create User'));
    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
  });
});
