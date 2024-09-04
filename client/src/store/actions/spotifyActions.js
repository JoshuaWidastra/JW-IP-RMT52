import { SET_SPOTIFY_TOKENS } from '../actionTypes';

export const setSpotifyTokens = (tokens) => ({
  type: SET_SPOTIFY_TOKENS,
  payload: tokens
});

export const initiateSpotifyLogin = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/api/spotify/auth-url');
    const data = await response.json();
    window.location.href = data.authUrl;
  } catch (error) {
    console.error('Error initiating Spotify login:', error);
  }
};