import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { removeSong, loadPlaylistFromStorage, savePlaylistToStorage } from '../store/playlistSlice';

function Playlist() {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);
  const { songInfo } = useSelector((state) => state.genius);

  useEffect(() => {
    dispatch(loadPlaylistFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(savePlaylistToStorage());
  }, [playlist, dispatch]);

  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  return (
    <div>
      <h1>Your Playlist</h1>
      <MusicPlayer playlist={playlist} />
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