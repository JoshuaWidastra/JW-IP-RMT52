import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PLAYLIST_STORAGE_KEY = 'moodmix_playlist';

export const loadPlaylistFromStorage = createAsyncThunk(
  'playlist/loadFromStorage',
  async () => {
    const storedPlaylist = localStorage.getItem(PLAYLIST_STORAGE_KEY);
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  }
);

export const savePlaylistToStorage = createAsyncThunk(
  'playlist/saveToStorage',
  async (_, { getState }) => {
    const { playlist } = getState().playlist;
    localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlist));
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlist: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addSong: (state, action) => {
      if (state.playlist.length < 10) {
        state.playlist.push(action.payload);
      }
    },
    removeSong: (state, action) => {
      state.playlist = state.playlist.filter(song => song.id !== action.payload);
    },
    clearPlaylist: (state) => {
      state.playlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlaylistFromStorage.fulfilled, (state, action) => {
        state.playlist = action.payload;
      })
      .addCase(savePlaylistToStorage.fulfilled, (state) => {
        state.status = 'saved';
      });
  },
});

export const { addSong, removeSong, clearPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;