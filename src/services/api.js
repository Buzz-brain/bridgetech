import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

// School API
export const schoolAPI = {
  getAll: (params) => api.get('/schools', { params }),
  getById: (id) => api.get(`/schools/${id}`),
  create: (data) => api.post('/schools', data),
  update: (id, data) => api.put(`/schools/${id}`, data),
  delete: (id) => api.delete(`/schools/${id}`),
  uploadLogo: (id, file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return api.post(`/schools/${id}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// User API
export const userAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  bulkImport: (csvData) => api.post('/users/bulk-import', csvData),
  exportUsers: () => api.get('/users/export', { responseType: 'blob' }),
};

// Student API
export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  uploadPhoto: (id, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return api.post(`/students/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  bulkImport: (csvData) => api.post('/students/bulk-import', csvData),
  exportStudents: () => api.get('/students/export', { responseType: 'blob' }),
};

// Result API
export const resultAPI = {
  getAll: (params) => api.get('/results', { params }),
  getByStudent: (studentId, params) => api.get(`/results/student/${studentId}`, { params }),
  upload: (data) => api.post('/results/upload', data),
  update: (id, data) => api.put(`/results/${id}`, data),
  delete: (id) => api.delete(`/results/${id}`),
  viewWithPin: (studentId, pin) => api.post(`/results/view-with-pin`, { studentId, pin }),
  generateReportCard: (studentId, term, year) => 
    api.get(`/results/report-card/${studentId}`, { 
      params: { term, year },
      responseType: 'blob'
    }),
};

// Admission API
export const admissionAPI = {
  register: (data) => api.post('/admissions/register', data),
  getAll: (params) => api.get('/admissions', { params }),
  updateStatus: (id, status) => api.put(`/admissions/${id}/status`, { status }),
  uploadDocuments: (id, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));
    return api.post(`/admissions/${id}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// SMS API
export const smsAPI = {
  getHistory: (params) => api.get('/sms/history', { params }),
  sendMessage: (data) => api.post('/sms/send', data),
  getTemplates: () => api.get('/sms/templates'),
  createTemplate: (data) => api.post('/sms/templates', data),
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getPerformanceStats: (params) => api.get('/analytics/performance', { params }),
  getAttendanceStats: (params) => api.get('/analytics/attendance', { params }),
};

export default api;