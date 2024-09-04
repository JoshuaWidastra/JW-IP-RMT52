import { SET_SPOTIFY_TOKEN } from '../actionTypes';

export const setSpotifyToken = (token) => ({
  type: SET_SPOTIFY_TOKEN,
  payload: token
});