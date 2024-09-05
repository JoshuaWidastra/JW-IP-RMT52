import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const searchSong = async (title, artist) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/genius/search`, {
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
    const response = await axios.get(`${SERVER_URL}/api/genius/lyrics`, {
      params: { url }
    });
    return response.data.lyrics;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return null;
  }
};