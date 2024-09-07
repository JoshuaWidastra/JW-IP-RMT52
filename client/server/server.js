const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(cors());
app.use(express.json());

const GENIUS_API_URL = 'https://api.genius.com';
const GENIUS_ACCESS_TOKEN = process.env.VITE_GENIUS_ACCESS_TOKEN;

app.get('/api/genius/search', async (req, res) => {
  try {
    const response = await axios.get(`${GENIUS_API_URL}/search`, {
      params: { q: req.query.q },
      headers: { 'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying to Genius API:', error);
    res.status(500).json({ error: 'Failed to fetch from Genius API' });
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


// for testing
if (require.main === module) {
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = app;