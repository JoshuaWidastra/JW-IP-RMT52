// src/components/Playlist.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTrack } from '../store/playlistSlice';

const Playlist = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.playlist.tracks);

  const handleRemoveTrack = (trackId) => {
    dispatch(removeTrack(trackId));
  };

  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title} by {track.artist}
            <button onClick={() => handleRemoveTrack(track.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;