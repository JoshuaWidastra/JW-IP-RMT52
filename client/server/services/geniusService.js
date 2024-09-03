const { getLyrics, getSong } = require('genius-lyrics-api');
require('dotenv').config();

const geniusApiKey = process.env.GENIUS_API_KEY;

async function fetchSongInfo(title, artist) {
  const options = {
    apiKey: geniusApiKey,
    title: title,
    artist: artist,
    optimizeQuery: true
  };

  try {
    const song = await getSong(options);
    return song;
  } catch (error) {
    console.error('Error fetching song info from Genius:', error);
    throw error;
  }
}

async function fetchLyrics(title, artist) {
  const options = {
    apiKey: geniusApiKey,
    title: title,
    artist: artist,
    optimizeQuery: true
  };

  try {
    const lyrics = await getLyrics(options);
    return lyrics;
  } catch (error) {
    console.error('Error fetching lyrics from Genius:', error);
    throw error;
  }
}

module.exports = {
  fetchSongInfo,
  fetchLyrics
};