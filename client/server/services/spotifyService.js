const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

let tokenExpirationTime = 0;

// const getAuthorizationUrl = () => {
//   const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
//   return spotifyApi.createAuthorizeURL(scopes, '');
// };

// const getAuthorizationUrl = () => {
//     const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
//     return spotifyApi.createAuthorizeURL(scopes);
//   };


const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public'
  ];

const getAuthorizationUrl = () => {
    return spotifyApi.createAuthorizeURL(scopes);
};

const handleCallback = async (code) => {
    const data = await spotifyApi.authorizationCodeGrant(code);
    return {
      access_token: data.body['access_token'],
      refresh_token: data.body['refresh_token'],
      expires_in: data.body['expires_in']
    };
  };

// const handleCallback = async (code) => {
//   try {
//     const data = await spotifyApi.authorizationCodeGrant(code);
//     const { access_token, refresh_token, expires_in } = data.body;

//     spotifyApi.setAccessToken(access_token);
//     spotifyApi.setRefreshToken(refresh_token);
//     tokenExpirationTime = Date.now() + expires_in * 1000;

//     return { access_token, refresh_token };
//   } catch (error) {
//     console.error('Error handling Spotify callback:', error);
//     throw error;
//   }
// };

const refreshAccessToken = async () => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = data.body;

    spotifyApi.setAccessToken(access_token);
    tokenExpirationTime = Date.now() + expires_in * 1000;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

const ensureAccessToken = async () => {
  if (Date.now() >= tokenExpirationTime) {
    await refreshAccessToken();
  }
};

const searchTracks = async (query) => {
  await ensureAccessToken();
  const data = await spotifyApi.searchTracks(query);
  return data.body.tracks.items;
};

const getUserProfile = async () => {
  await ensureAccessToken();
  const data = await spotifyApi.getMe();
  return data.body;
};

const createPlaylist = async (userId, name, description) => {
  await ensureAccessToken();
  const data = await spotifyApi.createPlaylist(userId, name, { description });
  return data.body;
};

module.exports = {
  getAuthorizationUrl,
  handleCallback,
  searchTracks,
  getUserProfile,
  createPlaylist
};