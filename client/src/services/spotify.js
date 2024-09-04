import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:5173/callback';

let accessToken = null;
let refreshToken = null;
let expirationTime = null;

export const getAuthUrl = () => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-read-private'];
  return `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=code`;
};

export const getAccessToken = async (code) => {
  try {
    const response = await axios.post(TOKEN_ENDPOINT, 
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        }
      }
    );
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    expirationTime = Date.now() + response.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error('Error in getAccessToken:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(TOKEN_ENDPOINT,
      `grant_type=refresh_token&refresh_token=${refreshToken}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        }
      }
    );
    accessToken = response.data.access_token;
    expirationTime = Date.now() + response.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

const getValidToken = async () => {
  if (!accessToken || Date.now() > expirationTime) {
    if (refreshToken) {
      return refreshAccessToken();
    } else {
      throw new Error('No valid token available. Please login again.');
    }
  }
  return accessToken;
};

export const getRecommendations = async (seed_genres = 'pop') => {
  try {
    const token = await getValidToken();
    const response = await axios.get(`${SPOTIFY_BASE_URL}/recommendations`, {
      params: {
        seed_genres,
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};