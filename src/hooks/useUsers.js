import { useState, useEffect, useMemo } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { mapApiUserToAppUser, mapAppUserToApiPayload } from '../utils/mappers';
import { filterBySearchQuery, filterByFields, sortUsers, paginateUsers, getTotalPages, generateTempId } from '../utils/helpers';
import { DEFAULT_PAGE_SIZE, SORT_DIRECTIONS } from '../utils/constants';

// Central state management hook handling all user data, filtering, sorting, pagination, and CRUD logic
export function useUsers() {
  // Raw data state
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Filter, search, and sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // UI modal state
  const [editingUser, setEditingUser] = useState(null);   // null = closed, {} = add mode, {id:...} = edit mode
  const [deletingUser, setDeletingUser] = useState(null); // null = closed, {id:...} = delete prompt
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch initial user list on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetches users from API, maps them to app structure, and handles loading/error states
  async function fetchUsers() {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getUsers();
      setUsers(data.map(mapApiUserToAppUser));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Memoized pipeline: applies search query, field filters, and sorting sequentially
  const processedUsers = useMemo(() => {
    let result = filterBySearchQuery(users, searchQuery);
    result = filterByFields(result, filters);
    result = sortUsers(result, sortField, sortDirection);
    return result;
  }, [users, searchQuery, filters, sortField, sortDirection]);

  // Memoized page count calculation based on active processed results
  const totalPages = useMemo(() => getTotalPages(processedUsers.length, pageSize), [processedUsers.length, pageSize]);

  // Memoized active page slice
  const visibleUsers = useMemo(() => paginateUsers(processedUsers, currentPage, pageSize), [processedUsers, currentPage, pageSize]);

  // Toggles sorting direction if same field is clicked, otherwise defaults to ascending
  function handleSort(field) {
    if (sortField === field) {
      setSortDirection((prev) => prev === SORT_DIRECTIONS.ASC ? SORT_DIRECTIONS.DESC : SORT_DIRECTIONS.ASC);
    } else {
      setSortField(field);
      setSortDirection(SORT_DIRECTIONS.ASC);
    }
    setCurrentPage(1); // Reset to first page on sort change
  }

  // Updates search query and resets to first page
  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  // Applies popover filter values and closes the popup
  function handleApplyFilters(newFilters) {
    setFilters(newFilters);
    setCurrentPage(1);
    setIsFilterOpen(false);
  }

  // Clears all filter fields and resets pagination
  function handleClearFilters() {
    setFilters({ firstName: '', lastName: '', email: '', department: '' });
    setCurrentPage(1);
  }

  // Dispatches POST request and prepends new user to local state on success
  async function handleAddUser(formData) {
    const payload = mapAppUserToApiPayload(formData);
    try {
      const { data: createdUser } = await createUser(payload);
      const newUser = { ...formData, id: createdUser.id || generateTempId() };
      setUsers((prev) => [newUser, ...prev]);
      setEditingUser(null);
      showToast('User added successfully.', 'success');
    } catch (err) {
      showToast(`Failed to add user: ${err.message}`, 'error');
    }
  }

  // Dispatches PUT request and updates target user in local state array on success
  async function handleEditUser(formData) {
    const payload = mapAppUserToApiPayload(formData);
    try {
      await updateUser(formData.id, payload);
      setUsers((prev) =>
        prev.map((user) => (user.id === formData.id ? { ...formData } : user))
      );
      setEditingUser(null);
      showToast('User updated successfully.', 'success');
    } catch (err) {
      showToast(`Failed to update user: ${err.message}`, 'error');
    }
  }

  // Dispatches DELETE request and removes target user from local state on success
  async function handleDeleteUser(id) {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setDeletingUser(null);
      showToast('User deleted.', 'success');
    } catch (err) {
      showToast(`Failed to delete user: ${err.message}`, 'error');
    }
  }

  // Displays temporary alert toast for user actions
  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  return {
    visibleUsers,
    processedUsers,
    totalPages,
    isLoading,
    error,
    toast,

    searchQuery,
    filters,
    sortField,
    sortDirection,
    isFilterOpen,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
    handleSort,
    setIsFilterOpen,

    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,

    editingUser,
    deletingUser,
    setEditingUser,
    setDeletingUser,

    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
}
