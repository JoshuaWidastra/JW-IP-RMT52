const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

const getAuthorizationUrl = () => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
  return spotifyApi.createAuthorizeURL(scopes);
};

const handleCallback = async (code) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    return data.body;
  } catch (error) {
    console.error('Error handling Spotify callback:', error);
    throw error;
  }
};

const searchTracks = async (query) => {
  try {
    const data = await spotifyApi.searchTracks(query);
    return data.body.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};

const createPlaylist = async (userId, name, description = '') => {
  try {
    const data = await spotifyApi.createPlaylist(userId, name, { description, public: false });
    return data.body;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

module.exports = {
  getAuthorizationUrl,
  handleCallback,
  searchTracks,
  createPlaylist,
};