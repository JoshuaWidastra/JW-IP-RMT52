import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function MusicPlayer({ playlist, onShuffle }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  }, [playlist]);

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
      {currentTrack && (
        <>
          <h3 className="text-light">{currentTrack.title}</h3>
          <p className="text-light">{currentTrack.artist}</p>
          <ReactPlayer
            url={currentTrack.url}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="50px"
            onEnded={handleNextTrack}
          />
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-secondary mx-2" onClick={handlePrevTrack}>Previous</button>
            <button className="btn btn-primary mx-2" onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="btn btn-secondary mx-2" onClick={handleNextTrack}>Next</button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={onShuffle}>Shuffle Songs</button>
          </div>
        </>
      )}
    </div>
  );
}

export default MusicPlayer;