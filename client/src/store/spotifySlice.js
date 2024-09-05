import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken, getRecommendations } from '../services/spotify';
import { searchSong } from '../services/genius';

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
    const playlistTracks = await Promise.all(tracks.map(async track => {
      const geniusData = await searchSong(track.name, track.artists[0].name);
      return {
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        url: track.preview_url,
        geniusUrl: geniusData ? geniusData.url : null
      };
    }));
    return playlistTracks;
  }
);

const spotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    accessToken: null,
    playlist: [],
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
        state.playlist = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default spotifySlice.reducer;