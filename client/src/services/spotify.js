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
  console.log('Generating Spotify auth URL');
  const scopes = ['user-read-private', 'user-read-email', 'playlist-read-private'];
  return `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=code`;
};

export const getAccessToken = async (code) => {
  console.log('Attempting to get access token with code:', code);
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
    console.log('Token response received:', response.data);
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    expirationTime = Date.now() + response.data.expires_in * 1000;
    console.log('Access token set, expires at:', new Date(expirationTime).toLocaleString());
    return accessToken;
  } catch (error) {
    console.error('Error in getAccessToken:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const refreshAccessToken = async () => {
  console.log('Attempting to refresh access token');
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
    console.log('Refresh token response received:', response.data);
    accessToken = response.data.access_token;
    expirationTime = Date.now() + response.data.expires_in * 1000;
    console.log('Access token refreshed, new expiration:', new Date(expirationTime).toLocaleString());
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

const getValidToken = async () => {
  console.log('Checking token validity');
  if (!accessToken || Date.now() > expirationTime) {
    console.log('Token invalid or expired');
    if (refreshToken) {
      console.log('Attempting to refresh token');
      return refreshAccessToken();
    } else {
      console.log('No refresh token available');
      throw new Error('No valid token available. Please login again.');
    }
  }
  console.log('Token is valid');
  return accessToken;
};

export const getRecommendations = async (seed_genres = 'pop') => {
  console.log('Fetching recommendations for genre:', seed_genres);
  try {
    const token = await getValidToken();
    console.log('Valid token obtained');
    const response = await axios.get(`${SPOTIFY_BASE_URL}/recommendations`, {
      params: {
        seed_genres,
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Recommendations received:', response.data);
    return response.data.tracks;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const searchTracks = async (query) => {
  console.log('Searching for tracks:', query);
  try {
    const token = await getValidToken();
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search`, {
      params: {
        q: query,
        type: 'track',
        limit: 5
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Search results:', response.data.tracks.items);
    return response.data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      url: track.preview_url
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};