import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { store, persistor } from './store';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import SchoolsList from './components/Schools/SchoolsList';
import SystemSettings from './components/Settings/SystemSettings';
import SystemAnalytics from './components/Analytics/SystemAnalytics';
import { USER_ROLES } from './utils/constants';
import SystemUsersList from './components/SystemUsers/SystemUsersList';
import SchoolProfileSetup from "./components/SchoolProfile/SchoolProfileSetup";
import AcademicCalendarSetup from "./components/AcademicCalendar/AcademicCalendarSetup";
import ScratchCardManagement from "./components/ScratchCard/ScratchCardManagement";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>} persistor={persistor}>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Super Admin Routes */}
                <Route
                  path="schools"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
                      <div className="max-w-6xl mx-auto py-10 px-4">
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-3xl font-bold text-gray-900">Schools Management</h2>
                          <button className="btn btn-primary flex items-center gap-2">
                            <span className="text-lg">+</span> Add School
                          </button>
                        </div>
                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <input
                            type="text"
                            placeholder="Search schools..."
                            className="input w-full md:w-72"
                          />
                          <div className="flex gap-2">
                            <button className="btn btn-secondary">Export</button>
                            <button className="btn btn-secondary">Import</button>
                          </div>
                        </div>
                        {/* Schools Table */}
                        <SchoolsList />
                        {/* Pagination */}
                        <div className="flex justify-end mt-6">
                          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">Prev</button>
                            <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 font-medium">1</button>
                            <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">Next</button>
                          </nav>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="system-users"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
                      <div className="max-w-6xl mx-auto py-10 px-4">
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-3xl font-bold text-gray-900">System Users Management</h2>
                          <button className="btn btn-primary flex items-center gap-2">
                            <span className="text-lg">+</span> Add User
                          </button>
                        </div>
                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <input
                            type="text"
                            placeholder="Search users..."
                            className="input w-full md:w-72"
                          />
                        </div>
                        {/* Users Table */}
                        <SystemUsersList />
                        {/* Pagination */}
                        <div className="flex justify-end mt-6">
                          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">Prev</button>
                            <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 font-medium">1</button>
                            <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">Next</button>
                          </nav>
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                {/* School Admin Routes */}
                <Route
                  path="users"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Users Management</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="students"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN, USER_ROLES.TEACHER]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Students Management</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="results"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN, USER_ROLES.TEACHER]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Results Management</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="results/upload"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.TEACHER]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Results</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admissions"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admissions Management</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="sms"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">SMS Management</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                {/* Student Routes */}
                <Route
                  path="my-results"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Results</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="transcripts"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Transcripts</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                {/* Parent Routes */}
                <Route
                  path="children"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PARENT]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Children</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="children/results"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PARENT]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Children Results</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.PARENT]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                
                {/* Common Routes */}
                <Route
                  path="analytics"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN, USER_ROLES.SCHOOL_ADMIN]}>
                      <SystemAnalytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="performance"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.TEACHER]}>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute>
                      <SystemSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
                        <p className="text-gray-600">Coming Soon</p>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="school-profile-setup"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <SchoolProfileSetup />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="school-profile"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <SchoolProfileSetup />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="academic-calendar-setup"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <AcademicCalendarSetup />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="academic-calendar"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SCHOOL_ADMIN]}>
                      <AcademicCalendarSetup />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="scratch-card-management"
                  element={
                    <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
                      <ScratchCardManagement />
                    </ProtectedRoute>
                  }
                />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  style: {
                    background: '#22c55e',
                    color: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#ef4444',
                    color: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;