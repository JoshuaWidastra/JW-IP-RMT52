// const SpotifyWebApi = require('spotify-web-api-node');
// require('dotenv').config();

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     redirectUri: process.env.SPOTIFY_REDIRECT_URI
// });

// const getAuthorizationUrl = () => {
//     const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
//     return spotifyApi.createAuthorizeURL(scopes);
// };

// const handleCallback = async (code) => {
//     try {
//       console.log('Attempting to exchange code for tokens');
//       const data = await spotifyApi.authorizationCodeGrant(code);
//       console.log('Token exchange successful');
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//       return data.body;
//     } catch (error) {
//       console.error('Error handling Spotify callback:', error);
//       throw error;
//     }
//   };

// const searchTracks = async (query) => {
//     try {
//         const data = await spotifyApi.searchTracks(query);
//         return data.body.tracks.items;
//     } catch (error) {
//         console.error('Error searching tracks:', error);
//         throw error;
//     }
// };

// const createPlaylist = async (userId, name, description = '') => {
//     try {
//         const data = await spotifyApi.createPlaylist(userId, name, { description, public: false });
//         return data.body;
//     } catch (error) {
//         console.error('Error creating playlist:', error);
//         throw error;
//     }
// };

// module.exports = {
//     getAuthorizationUrl,
//     handleCallback,
//     searchTracks,
// };




// TRIAL 2 
// const axios = require('axios');
// const querystring = require('querystring');
// require('dotenv').config();

// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// const getAuthorizationUrl = () => {
//     const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
//     return 'https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: clientId,
//             scope: scopes.join(' '),
//             redirect_uri: redirectUri,
//         });
// };

// const handleCallback = async (code) => {
//     try {
//         console.log('Attempting to exchange code for token');
//         console.log('Code:', code);
//         console.log('Redirect URI:', redirectUri);
        
//         const response = await axios({
//             method: 'post',
//             url: 'https://accounts.spotify.com/api/token',
//             data: querystring.stringify({
//                 grant_type: 'authorization_code',
//                 code: code,
//                 redirect_uri: redirectUri
//             }),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
//             }
//         });

//         console.log('Token exchange successful');
//         return response.data;
//     } catch (error) {
//         console.error('Detailed error:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// const searchTracks = async (query, accessToken) => {
//     try {
//         const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         return response.data.tracks.items;
//     } catch (error) {
//         console.error('Error searching tracks:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// module.exports = {
//     getAuthorizationUrl,
//     handleCallback,
//     searchTracks,
// };




// const axios = require('axios');
// const querystring = require('querystring');
// require('dotenv').config();

// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// const getAuthorizationUrl = () => {
//     const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
//     return 'https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: clientId,
//             scope: scopes.join(' '),
//             redirect_uri: redirectUri,
//         });
// };

// const handleCallback = async (code) => {
//     try {
//         console.log('Attempting to exchange code for token');
//         console.log('Code:', code);
//         console.log('Redirect URI:', redirectUri);
        
//         const response = await axios({
//             method: 'post',
//             url: 'https://accounts.spotify.com/api/token',
//             data: querystring.stringify({
//                 grant_type: 'authorization_code',
//                 code: code,
//                 redirect_uri: redirectUri
//             }),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
//             }
//         });

//         console.log('Token exchange successful');
//         return response.data;
//     } catch (error) {
//         console.error('Detailed error:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// const searchTracks = async (query, accessToken) => {
//     try {
//         const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });
//         return response.data.tracks.items;
//     } catch (error) {
//         console.error('Error searching tracks:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// module.exports = {
//     getAuthorizationUrl,
//     handleCallback,
//     searchTracks,
// };



// //// BACKUP ////
// const SpotifyWebApi = require('spotify-web-api-node');
// require('dotenv').config();

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   redirectUri: process.env.SPOTIFY_REDIRECT_URI
// });

// const getAuthorizationUrl = () => {
//   const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
//   return spotifyApi.createAuthorizeURL(scopes);
// };

// const handleCallback = async (code) => {
//   try {
//     console.log('Attempting to exchange code for token');
//     console.log('Code:', code);
    
//     const data = await spotifyApi.authorizationCodeGrant(code);
//     console.log('Token exchange successful');
    
//     // set the access token and refresh token
//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);

//     return data.body;
//   } catch (error) {
//     console.error('Detailed error:', error.message);
//     throw error;
//   }
// };

// const searchTracks = async (query) => {
//   try {
//     const data = await spotifyApi.searchTracks(query);
//     return data.body.tracks.items;
//   } catch (error) {
//     console.error('Error searching tracks:', error);
//     throw error;
//   }
// };

// const createPlaylist = async (userId, name, description = '') => {
//   try {
//     const data = await spotifyApi.createPlaylist(userId, name, { description, public: false });
//     return data.body;
//   } catch (error) {
//     console.error('Error creating playlist:', error);
//     throw error;
//   }
// };

// module.exports = {
//   getAuthorizationUrl,
//   handleCallback,
//   searchTracks,
//   createPlaylist
// };
// //// BACKUP ////

const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

let tokenExpirationTime = 0;

const getAuthorizationUrl = () => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
  return spotifyApi.createAuthorizeURL(scopes);
};

const handleCallback = async (code) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    tokenExpirationTime = Date.now() + data.body['expires_in'] * 1000;
    return data.body;
  } catch (error) {
    console.error('Error handling Spotify callback:', error);
    throw error;
  }
};

const refreshAccessToken = async () => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);
    tokenExpirationTime = Date.now() + data.body['expires_in'] * 1000;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

const ensureAccessToken = async () => {
  if (Date.now() > tokenExpirationTime) {
    await refreshAccessToken();
  }
};

const getUserProfile = async () => {
  await ensureAccessToken();
  const data = await spotifyApi.getMe();
  return data.body;
};

const searchTracks = async (query) => {
  await ensureAccessToken();
  const data = await spotifyApi.searchTracks(query);
  return data.body.tracks.items;
};

const createPlaylist = async (name, description = '') => {
  await ensureAccessToken();
  const user = await getUserProfile();
  const data = await spotifyApi.createPlaylist(user.id, name, { description, public: false });
  return data.body;
};

module.exports = {
  getAuthorizationUrl,
  handleCallback,
  getUserProfile,
  searchTracks,
  createPlaylist
};