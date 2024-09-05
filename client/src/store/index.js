import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './spotifySlice';
import openAIReducer from './openAISlice';
import geniusReducer from './geniusSlice';

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
    openAI: openAIReducer,
    genius: geniusReducer,
  },
});