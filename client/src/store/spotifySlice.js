import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken, getRecommendations } from '../services/spotify';

export const fetchAccessToken = createAsyncThunk(
  'spotify/fetchAccessToken',
  async (code) => {
    const token = await getAccessToken(code);
    return token;
  }
);

export const fetchRecommendations = createAsyncThunk(
  'spotify/fetchRecommendations',
  async (_, { getState }) => {
    const tracks = await getRecommendations();
    return tracks.slice(0, 5).map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      url: track.preview_url
    }));
  }
);

const spotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    accessToken: null,
    recommendations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload;
      })
      .addCase(fetchAccessToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default spotifySlice.reducer;