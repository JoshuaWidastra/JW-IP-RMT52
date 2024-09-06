const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const cheerio = require('cheerio');
const moodRoutes = require('./routes/moodRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GENIUS_API_URL = 'https://api.genius.com';
const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

console.log('Genius Access Token:', GENIUS_ACCESS_TOKEN.substring(0, 5) + '...');

app.get('/api/genius/search', async (req, res) => {
  try {
    console.log('Received request for Genius search:', req.query);
    const response = await axios.get(`${GENIUS_API_URL}/search`, {
      params: { q: req.query.q },
      headers: { 'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}` }
    });
    console.log('Successful response from Genius API');
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Genius API:', error.message);
    if (error.response) {
      console.error('Genius API response:', error.response.data);
      console.error('Genius API status:', error.response.status);
    }
    res.status(500).json({ error: 'Failed to fetch from Genius API', details: error.message });
  }
});

app.get('/api/genius/lyrics', async (req, res) => {
  try {
    const response = await axios.get(req.query.url);
    const $ = cheerio.load(response.data);
    const lyrics = $('.lyrics').text().trim();
    res.json({ lyrics });
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});

// Public routes
app.use('/api/public', moodRoutes);

// Protected routes
app.use('/api/mood', authMiddleware, moodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});