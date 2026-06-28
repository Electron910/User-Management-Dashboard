import axios from 'axios';
import { API_URL } from '../utils/constants';

// Configured Axios instance with base URL and a 10-second timeout
// Encapsulates shared configuration and headers for all API requests
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor to extract clean error messages from API responses
// Prevents raw Axios error objects from leaking into the UI layer
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

// Modular CRUD endpoint methods returning Promises
export const getUsers = () => apiClient.get('/');
export const createUser = (payload) => apiClient.post('/', payload);
export const updateUser = (id, payload) => apiClient.put(`/${id}`, payload);
export const deleteUser = (id) => apiClient.delete(`/${id}`);
