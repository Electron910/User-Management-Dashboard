import React from 'react';
import { useUsers } from './hooks/useUsers';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FilterPopup from './components/FilterPopup/FilterPopup';
import UserTable from './components/UserTable/UserTable';
import Pagination from './components/Pagination/Pagination';
import UserForm from './components/UserForm/UserForm';
import ConfirmDelete from './components/ConfirmDelete/ConfirmDelete';
import Toast from './components/Toast/Toast';

// Root layout composing header, toolbar, table grid, modals and shared state
export default function App() {
  const state = useUsers();

  // Count active filters for badge display
  const activeFilterCount = Object.values(state.filters).filter((val) => val.trim() !== '').length;

  return (
    <div className="app-shell">
      <Header onAddUser={() => state.setEditingUser({})} />

      <main className="main-content">
        <div className="toolbar">
          <SearchBar value={state.searchQuery} onChange={state.handleSearch} />
          <button className="btn btn-secondary" onClick={() => state.setIsFilterOpen(true)}>
            Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {state.isFilterOpen && (
          <FilterPopup
            filters={state.filters}
            onApply={state.handleApplyFilters}
            onClear={state.handleClearFilters}
            onClose={() => state.setIsFilterOpen(false)}
          />
        )}

        <UserTable
          users={state.visibleUsers}
          isLoading={state.isLoading}
          error={state.error}
          sortField={state.sortField}
          sortDirection={state.sortDirection}
          onSort={state.handleSort}
          onEdit={state.setEditingUser}
          onDelete={state.setDeletingUser}
        />

        <Pagination
          currentPage={state.currentPage}
          totalPages={state.totalPages}
          pageSize={state.pageSize}
          totalItems={state.processedUsers.length}
          onPageChange={state.setCurrentPage}
          onPageSizeChange={(size) => { state.setPageSize(size); state.setCurrentPage(1); }}
        />
      </main>

      {state.editingUser !== null && (
        <UserForm
          user={state.editingUser}
          onSubmit={state.editingUser.id ? state.handleEditUser : state.handleAddUser}
          onClose={() => state.setEditingUser(null)}
        />
      )}

      {state.deletingUser !== null && (
        <ConfirmDelete
          user={state.deletingUser}
          onConfirm={() => state.handleDeleteUser(state.deletingUser.id)}
          onCancel={() => state.setDeletingUser(null)}
        />
      )}

      {state.toast && <Toast message={state.toast.message} type={state.toast.type} />}
    </div>
  );
}
