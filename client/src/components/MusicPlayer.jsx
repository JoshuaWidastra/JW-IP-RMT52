import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const spotifyToken = useSelector(state => state.spotify.token);

  useEffect(() => {
    // Initialize Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'MoodMix Web Player',
        getOAuthToken: cb => { cb(spotifyToken); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        if (state) {
          setCurrentTrack(state.track_window.current_track);
          setIsPlaying(!state.paused);
        }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        // You might want to store this device_id to use it later for playback
      });

      // Connect to the player
      player.connect();
    };
  }, [spotifyToken]);

  const togglePlay = () => {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [currentTrack.uri] })
    }).then(() => setIsPlaying(true));
  };

  const togglePause = () => {
    fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${spotifyToken}`,
      },
    }).then(() => setIsPlaying(false));
  };

  return (
    <div>
      <h2>Music Player</h2>
      {currentTrack && (
        <div>
          <h3>{currentTrack.name}</h3>
          <p>{currentTrack.artists[0].name}</p>
          <button onClick={isPlaying ? togglePause : togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;