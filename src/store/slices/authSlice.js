import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

// Mock authentication for demo purposes
const mockAuth = {
  login: async ({ email, password }) => {
    // Demo credentials
    const users = {
      'admin@sraams.com': {
        user: {
          id: 1,
          firstName: 'System',
          lastName: 'Administrator',
          email: 'admin@sraams.com',
          role: 'super_admin',
          schoolId: null,
        },
        token: 'mock-super-admin-token'
      },
      'school@sraams.com': {
        user: {
          id: 2,
          firstName: 'School',
          lastName: 'Administrator',
          email: 'school@sraams.com',
          role: 'school_admin',
          schoolId: 1,
        },
        token: 'mock-school-admin-token'
      },
      'teacher@sraams.com': {
        user: {
          id: 3,
          firstName: 'John',
          lastName: 'Teacher',
          email: 'teacher@sraams.com',
          role: 'teacher',
          schoolId: 1,
        },
        token: 'mock-teacher-token'
      },
      'student@sraams.com': {
        user: {
          id: 4,
          firstName: 'Jane',
          lastName: 'Student',
          email: 'student@sraams.com',
          role: 'student',
          schoolId: 1,
        },
        token: 'mock-student-token'
      },
      'parent@sraams.com': {
        user: {
          id: 5,
          firstName: 'Mary',
          lastName: 'Parent',
          email: 'parent@sraams.com',
          role: 'parent',
          schoolId: 1,
        },
        token: 'mock-parent-token'
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password !== 'password123') {
      throw new Error('Invalid credentials');
    }

    const userData = users[email];
    if (!userData) {
      throw new Error('User not found');
    }

    // Store token in localStorage
    localStorage.setItem('token', userData.token);
    
    return { data: userData };
  }
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await mockAuth.login({ email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      return {};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // Add action to restore auth state from localStorage
    restoreAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearAuth, updateUserProfile, restoreAuth } = authSlice.actions;
export default authSlice.reducer;