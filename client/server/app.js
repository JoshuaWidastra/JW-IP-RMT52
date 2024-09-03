const express = require('express');
const cors = require('cors');
const admin = require('./firebase');
const spotifyService = require('./services/spotifyService');
const openaiService = require('./services/openaiService');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MoodMix API' });
});

app.get('/api/test', authenticateUser, (req, res) => {
  res.json({ message: 'API is working correctly', user: req.user });
});


app.get('/api/spotify/login', (req, res) => {
    res.redirect(spotifyService.getAuthorizationUrl());
  });
  
app.get('/api/spotify/callback', async (req, res) => {
try {
    const { code } = req.query;
    await spotifyService.handleCallback(code);
    res.redirect('http://localhost:5173/dashboard'); 
} catch (error) {
    console.error('Error in Spotify callback:', error);
    res.status(500).json({ error: 'Authentication failed' });
}
});

app.get('/api/spotify/search', async (req, res) => {
try {
    const { query } = req.query;
    const tracks = await spotifyService.searchTracks(query);
    res.json(tracks);
} catch (error) {
    console.error('Error searching tracks:', error);
    res.status(500).json({ error: 'Failed to search tracks' });
}
});

app.post('/api/spotify/create-playlist', async (req, res) => {
try {
    const { userId, name, description } = req.body;
    const playlist = await spotifyService.createPlaylist(userId, name, description);
    res.json(playlist);
} catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
}
});

app.post('/api/analyze-text', authenticateUser, async (req, res) => {
    try {
      const { text } = req.body;
      const analysis = await openaiService.analyzeText(text);
      res.json({ analysis });
    } catch (error) {
      console.error('Error in text analysis:', error);
      res.status(500).json({ error: 'Failed to analyze text' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;