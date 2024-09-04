const express = require('express');
const router = express.Router();
const geniusService = require('../services/geniusService');

router.get('/song-info', async (req, res) => {
  try {
    const { title, artist } = req.query;
    const songInfo = await geniusService.getSongInfo(title, artist);
    res.json(songInfo);
  } catch (error) {
    console.error('Error fetching song info:', error);
    res.status(500).json({ error: 'Failed to fetch song information' });
  }
});

module.exports = router;