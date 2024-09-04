const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');
const { authenticateUser } = require('../middleware/auth');

// simple cache to store recently used authorization codes
const usedAuthCodes = new Set();

router.get('/auth-url', (req, res) => {
  const authUrl = spotifyService.getAuthorizationUrl();
  res.json({ authUrl });
});

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    console.log('Received code in callback:', code);

    if (usedAuthCodes.has(code)) {
      throw new Error('Authorization code has already been used');
    }

    usedAuthCodes.add(code);

    const data = await spotifyService.handleCallback(code);

    setTimeout(() => usedAuthCodes.delete(code), 60000); // remove after 1 minute

    // instead of sending JSON, redirect to the frontend with the access token -- need testing
    res.redirect(`${process.env.FRONTEND_URL}/spotify-callback?access_token=${data.access_token}`);
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=spotify_auth_failed`);
  }
});

router.get('/search', authenticateUser, async (req, res) => {
  try {
    const { query } = req.query;
    const tracks = await spotifyService.searchTracks(query, req.user.spotifyToken);
    res.json(tracks);
  } catch (error) {
    console.error('Error searching tracks:', error);
    res.status(500).json({ error: 'Failed to search tracks' });
  }
});

router.post('/create-playlist', authenticateUser, async (req, res) => {
  try {
    const { name, description } = req.body;
    const playlist = await spotifyService.createPlaylist(req.user.spotifyToken, name, description);
    res.json(playlist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

module.exports = router;