import React, { useState, useEffect } from 'react';

const MusicPlayer = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Reset player when playlist changes
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  }, [playlist]);

  const playPause = () => {
    setIsPlaying(!isPlaying);
    // Implement actual play/pause functionality here
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.tracks.length) % playlist.tracks.length);
  };

  return (
    <div className="music-player">
      <h3>Now Playing: {playlist.tracks[currentTrackIndex].name}</h3>
      <div className="controls">
        <button onClick={prevTrack}>Previous</button>
        <button onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={nextTrack}>Next</button>
      </div>
    </div>
  );
};

export default MusicPlayer;