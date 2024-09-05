import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { removeSong, loadPlaylistFromStorage, savePlaylistToStorage } from '../store/playlistSlice';
import { fetchMoodAnalysis } from '../store/openAISlice';

function Playlist() {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);
  const { songInfo } = useSelector((state) => state.genius);
  const { moodAnalysis, status: moodAnalysisStatus } = useSelector((state) => state.openAI);

  useEffect(() => {
    dispatch(loadPlaylistFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(savePlaylistToStorage());
    if (playlist.length > 0) {
      dispatch(fetchMoodAnalysis(playlist));
    }
  }, [playlist, dispatch]);

  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  return (
    <div>
      <h1>Your Playlist</h1>
      <MusicPlayer playlist={playlist} />
      {moodAnalysisStatus === 'loading' && <p>Analyzing mood...</p>}
      {moodAnalysis && (
        <div>
          <h2>Playlist Mood Analysis</h2>
          <p>{moodAnalysis}</p>
        </div>
      )}
      <h2>Songs ({playlist.length}/10)</h2>
      <ul>
        {playlist.map(track => (
          <li key={track.id}>
            <h3>{track.title} by {track.artist}</h3>
            {songInfo[`${track.title}-${track.artist}`]?.url && (
              <a href={songInfo[`${track.title}-${track.artist}`].url} target="_blank" rel="noopener noreferrer">View on Genius</a>
            )}
            <button onClick={() => handleRemoveSong(track.id)}>Remove from Playlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;