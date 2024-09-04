import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function MusicPlayer({ playlist }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : playlist.length - 1));
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex < playlist.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      {currentTrack && (
        <>
          <ReactPlayer
            url={currentTrack.url}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="50px"
          />
          <div className="track-info">
            <p>{currentTrack.title} - {currentTrack.artist}</p>
          </div>
        </>
      )}
      <div className="controls">
        <button onClick={handlePrevTrack}>Previous</button>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleNextTrack}>Next</button>
      </div>
    </div>
  );
}

export default MusicPlayer;