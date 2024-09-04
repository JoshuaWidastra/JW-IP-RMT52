//TEST//
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import route files
const spotifyRoutes = require('./routes/spotifyRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const geniusRoutes = require('./routes/geniusRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const moodJournalRoutes = require('./routes/moodJournalRoutes');
const testRoutes = require('./routes/testRoutes');  // Import your test routes

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to MoodMix API' });
});

// Mount routes
app.use('/api/test', testRoutes);  // Mount the test route
app.use('/api/spotify', spotifyRoutes);  // Mount Spotify routes
app.use('/api/openai', openaiRoutes);  // Mount OpenAI routes
app.use('/api/genius', geniusRoutes);  // Mount Genius routes
app.use('/api/playlist', playlistRoutes);  // Mount Playlist routes
app.use('/api/mood-journal', moodJournalRoutes);  // Mount Mood Journal routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
