import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { schoolAPI } from '../../services/api';

// Async thunks
export const fetchSchools = createAsyncThunk(
  'schools/fetchSchools',
  async (params, { rejectWithValue }) => {
    try {
      const response = await schoolAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schools');
    }
  }
);

export const createSchool = createAsyncThunk(
  'schools/createSchool',
  async (schoolData, { rejectWithValue }) => {
    try {
      const response = await schoolAPI.create(schoolData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create school');
    }
  }
);

export const updateSchool = createAsyncThunk(
  'schools/updateSchool',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await schoolAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update school');
    }
  }
);

export const deleteSchool = createAsyncThunk(
  'schools/deleteSchool',
  async (id, { rejectWithValue }) => {
    try {
      await schoolAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete school');
    }
  }
);

const initialState = {
  schools: [
    {
      id: 1,
      name: "Stellamaris International School",
      address: "123 Main Street, Cityville",
      phone: "+1234567890",
      email: "info@stellamaris.edu",
      principal: "Mrs. Jane Doe",
      established: 2005,
      students: 1200,
      teachers: 80,
      motto: "Knowledge and Integrity",
      website: "https://stellamaris.edu",
      logo: "https://placehold.co/100x100?text=Logo",
      description: "Stellamaris International School is committed to academic excellence and holistic development.",
      achievements: [
        "Best School Award 2023",
        "100% WAEC Pass Rate",
        "National Science Champions"
      ],
      programs: [
        "Science",
        "Arts",
        "Commercial",
        "Technical"
      ],
      signature: '',
      smsApi: '',
      birthdaySms: '',
      resultAccess: 'scratch_card',
      url: '',
    }
  ],
  selectedSchool: null,
  loading: false,
  error: null,
  totalCount: 1,
  currentPage: 1,
  pageSize: 10,
};

const schoolSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedSchool: (state, action) => {
      state.selectedSchool = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Schools
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload.schools;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create School
      .addCase(createSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.schools.push(action.payload);
      })
      .addCase(createSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update School
      .addCase(updateSchool.fulfilled, (state, action) => {
        const index = state.schools.findIndex(school => school.id === action.payload.id);
        if (index !== -1) {
          state.schools[index] = action.payload;
        }
      })
      // Delete School
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.schools = state.schools.filter(school => school.id !== action.payload);
      });
  },
});

export const { clearError, setSelectedSchool, setCurrentPage, setPageSize } = schoolSlice.actions;
export default schoolSlice.reducer;