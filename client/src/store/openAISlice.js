import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyzeMood } from '../services/openai';

export const fetchMoodAnalysis = createAsyncThunk(
  'openAI/fetchMoodAnalysis',
  async (tracks, { rejectWithValue }) => {
    try {
      const analysis = await analyzeMood(tracks);
      console.log('Mood analysis fetched in slice:', analysis);
      return analysis;
    } catch (error) {
      console.error('Error fetching mood analysis:', error);
      return rejectWithValue(error.message);
    }
  }
);

const openAISlice = createSlice({
  name: 'openAI',
  initialState: {
    moodAnalysis: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoodAnalysis.pending, (state) => {
        console.log('Fetching mood analysis...');
        state.status = 'loading';
      })
      .addCase(fetchMoodAnalysis.fulfilled, (state, action) => {
        console.log('Mood analysis fetched successfully:', action.payload);
        state.status = 'succeeded';
        state.moodAnalysis = action.payload;
      })
      .addCase(fetchMoodAnalysis.rejected, (state, action) => {
        console.error('Failed to fetch mood analysis:', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default openAISlice.reducer;