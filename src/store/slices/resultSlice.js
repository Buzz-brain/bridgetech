import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resultAPI } from '../../services/api';

// Async thunks
export const fetchResults = createAsyncThunk(
  'results/fetchResults',
  async (params, { rejectWithValue }) => {
    try {
      const response = await resultAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch results');
    }
  }
);

export const uploadResults = createAsyncThunk(
  'results/uploadResults',
  async (resultData, { rejectWithValue }) => {
    try {
      const response = await resultAPI.upload(resultData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload results');
    }
  }
);

export const viewResultWithPin = createAsyncThunk(
  'results/viewResultWithPin',
  async ({ studentId, pin }, { rejectWithValue }) => {
    try {
      const response = await resultAPI.viewWithPin(studentId, pin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid PIN or result not found');
    }
  }
);

export const generateReportCard = createAsyncThunk(
  'results/generateReportCard',
  async ({ studentId, term, year }, { rejectWithValue }) => {
    try {
      const response = await resultAPI.generateReportCard(studentId, term, year);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate report card');
    }
  }
);

const initialState = {
  results: [],
  studentResults: null,
  reportCard: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  filters: {
    class: '',
    term: '',
    year: '',
    subject: '',
  },
};

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        class: '',
        term: '',
        year: '',
        subject: '',
      };
    },
    clearStudentResults: (state) => {
      state.studentResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Results
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Results
      .addCase(uploadResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = [...state.results, ...action.payload.results];
      })
      .addCase(uploadResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // View Result with PIN
      .addCase(viewResultWithPin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewResultWithPin.fulfilled, (state, action) => {
        state.loading = false;
        state.studentResults = action.payload;
      })
      .addCase(viewResultWithPin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate Report Card
      .addCase(generateReportCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReportCard.fulfilled, (state, action) => {
        state.loading = false;
        state.reportCard = action.payload;
      })
      .addCase(generateReportCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  setCurrentPage, 
  setPageSize, 
  setFilters, 
  clearFilters,
  clearStudentResults 
} = resultSlice.actions;
export default resultSlice.reducer;