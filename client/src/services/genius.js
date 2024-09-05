import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const searchSong = async (title, artist) => {
  try {
    console.log(`Searching for: ${title} by ${artist}`);
    const response = await axios.get(`${SERVER_URL}/api/genius/search`, {
      params: {
        q: `${title} ${artist}`
      }
    });

    console.log('Received response:', response.data);

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
    console.error('Error searching for song:', error.response ? error.response.data : error.message);
    throw error;
  }
};