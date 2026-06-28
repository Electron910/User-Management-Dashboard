import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

// Integration tests verifying pagination layout display and interactive page control buttons
describe('Pagination Component', () => {
  it('renders correct current page and total page numbers in text summary', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        pageSize={10}
        totalItems={47}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />
    );
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByText('Showing 11–20 of 47 users')).toBeInTheDocument();
  });

  it('disables previous and first page buttons when active page is 1', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        pageSize={10}
        totalItems={47}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText('First page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });

  it('disables next and last page buttons when active page matches total pages', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        pageSize={10}
        totalItems={47}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Last page')).toBeDisabled();
  });

  it('triggers onPageChange callback with correct target page when navigation button is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        pageSize={10}
        totalItems={47}
        onPageChange={handlePageChange}
        onPageSizeChange={vi.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
});
