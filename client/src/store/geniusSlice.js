import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchSong } from '../services/genius';

export const fetchSongInfo = createAsyncThunk(
  'genius/fetchSongInfo',
  async ({ title, artist }) => {
    const songInfo = await searchSong(title, artist);
    return songInfo;
  }
);

const geniusSlice = createSlice({
  name: 'genius',
  initialState: {
    songInfo: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songInfo[`${action.meta.arg.title}-${action.meta.arg.artist}`] = action.payload;
      })
      .addCase(fetchSongInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default geniusSlice.reducer;