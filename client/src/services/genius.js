import axios from 'axios';

const GENIUS_API_URL = 'https://api.genius.com';
const GENIUS_ACCESS_TOKEN = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

const genius = axios.create({
  baseURL: GENIUS_API_URL,
  headers: {
    'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`
  }
});

export const searchSong = async (title, artist) => {
  try {
    const response = await genius.get('/search', {
      params: {
        q: `${title} ${artist}`
      }
    });

    const hit = response.data.response.hits[0];
    if (!hit) {
      console.log(`No results found for ${title} by ${artist}`);
      return null;
    }

    return {
      id: hit.result.id,
      title: hit.result.title,
      artist: hit.result.primary_artist.name,
      url: hit.result.url
    };
  } catch (error) {
    console.error('Error searching for song:', error);
    throw error;
  }
};

export const getLyrics = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const lyrics = html.split('<div class="lyrics">')[1].split('</div>')[0].trim();
    return lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};