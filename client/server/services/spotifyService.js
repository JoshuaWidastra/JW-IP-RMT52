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

async function getMoodBasedTracks(mood, intensity) {
    try {
      let seedGenres = [];
      let targetValence = 0.5;
      let targetEnergy = 0.5;
  
      // map mood - need test
      switch (mood.toLowerCase()) {
        case 'happy':
          seedGenres = ['pop', 'dance'];
          targetValence = 0.7 + (intensity * 0.02);
          targetEnergy = 0.6 + (intensity * 0.02);
          break;
        case 'sad':
          seedGenres = ['blues', 'acoustic'];
          targetValence = 0.3 - (intensity * 0.02);
          targetEnergy = 0.4 - (intensity * 0.02);
          break;
        case 'energetic':
          seedGenres = ['rock', 'electronic'];
          targetValence = 0.6 + (intensity * 0.02);
          targetEnergy = 0.8 + (intensity * 0.01);
          break;
        case 'calm':
          seedGenres = ['ambient', 'classical'];
          targetValence = 0.5;
          targetEnergy = 0.3 - (intensity * 0.02);
          break;
        default:
          seedGenres = ['pop', 'rock'];
      }
  
      const recommendations = await spotifyApi.getRecommendations({
        seed_genres: seedGenres,
        target_valence: Math.min(Math.max(targetValence, 0), 1),
        target_energy: Math.min(Math.max(targetEnergy, 0), 1),
        limit: 20
      });
  
      return recommendations.body.tracks;
    } catch (error) {
      console.error('Error getting mood-based tracks:', error);
      throw error;
    }
  }



module.exports = {
  getAuthorizationUrl,
  handleCallback,
  searchTracks,
  createPlaylist,
};