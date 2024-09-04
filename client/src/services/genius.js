import axios from 'axios';

const GENIUS_API_BASE_URL = 'https://api.genius.com';

export const fetchLyrics = async (trackName, artistName) => {
  try {
    const response = await axios.get(`${GENIUS_API_BASE_URL}/search`, {
      params: {
        q: `${trackName} ${artistName}`,
      },
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
      },
    });

    const songId = response.data.response.hits[0].result.id;
    const lyricsResponse = await axios.get(`${GENIUS_API_BASE_URL}/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
      },
    });

    return lyricsResponse.data.response.song.lyrics.body.plain;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return '';
  }
};