import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './spotifySlice';
import openAIReducer from './openAISlice';
import geniusReducer from './geniusSlice';
import playlistReducer from './playlistSlice';
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
    openAI: openAIReducer,
    genius: geniusReducer,
    playlist: playlistReducer,
    auth: authReducer
  },
});