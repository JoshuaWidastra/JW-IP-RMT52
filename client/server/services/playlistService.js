// need more testing

const spotifyService = require('./spotifyService');
const openaiService = require('./openaiService');

async function generatePlaylistForMood(mood, genres) {
  try {
    // step 1: search for tracks in the given genres
    let tracks = [];
    for (const genre of genres) {
      const genreTracks = await spotifyService.searchTracks(`genre:${genre}`);
      tracks = [...tracks, ...genreTracks.slice(0, 5)]; // get top 5 tracks for each genre
    }

    // step 2: use OpenAI to analyze track names and ensure they match the mood
    const filteredTracks = [];
    for (const track of tracks) {
      const analysis = await openaiService.analyzeText(`Does the song "${track.name}" by ${track.artists[0].name} match a ${mood} mood?`);
      if (analysis.toLowerCase().includes('yes')) {
        filteredTracks.push(track);
      }
    }

    // step 3: create a playlist with the filtered tracks
    const playlist = await spotifyService.createPlaylist(`${mood} Mood Mix`, `A playlist for your ${mood} mood`);
    await spotifyService.addTracksToPlaylist(playlist.id, filteredTracks.map(track => track.uri));

    return playlist;
  } catch (error) {
    console.error('Error generating playlist:', error);
    throw error;
  }
}

module.exports = {
  generatePlaylistForMood
};