const express = require('express');
const router = express.Router();
const playlistService = require('../services/playlistService');
const { authenticateUser } = require('../middleware/auth');

router.post('/generate', authenticateUser, async (req, res) => {
  try {
    const { mood, genres } = req.body;
    const playlist = await playlistService.generatePlaylistForMood(mood, genres);
    res.json(playlist);
  } catch (error) {
    console.error('Error generating playlist:', error);
    res.status(500).json({ error: 'Failed to generate playlist' });
  }
});

router.post('/generate-temporary', async (req, res) => {
  try {
    const { mood } = req.body;
    const temporaryPlaylist = await playlistService.generateTemporaryPlaylist(mood);
    res.json(temporaryPlaylist);
  } catch (error) {
    console.error('Error generating temporary playlist:', error);
    res.status(500).json({ error: 'Failed to generate temporary playlist' });
  }
});

module.exports = router;