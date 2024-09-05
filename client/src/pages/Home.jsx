import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { getAuthUrl } from '../services/spotify';
import { fetchAccessToken, fetchRecommendations } from '../store/spotifySlice';
import { analyzeMood } from '../services/openai';

function Home() {
  const dispatch = useDispatch();
  const { playlist, status, error } = useSelector((state) => state.spotify);
  const [moodAnalysis, setMoodAnalysis] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const authCodeProcessed = useRef(false);

  const handleSpotifyCallback = useCallback(async (code) => {
    console.log('Handling Spotify callback with code:', code);
    try {
      await dispatch(fetchAccessToken(code)).unwrap();
      const tracks = await dispatch(fetchRecommendations()).unwrap();
      console.log('Playlist tracks with Genius info:', tracks);

      // Analyze mood
      console.log('Analyzing mood for the playlist');
      try {
        const moodAnalysisResult = await analyzeMood(tracks);
        console.log('Mood analysis result:', moodAnalysisResult);
        setMoodAnalysis(moodAnalysisResult);
      } catch (moodError) {
        console.error('Error in mood analysis:', moodError);
        throw moodError;
      }
    } catch (error) {
      console.error('Error in handleSpotifyCallback:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('Home component mounted or updated');
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code && !authCodeProcessed.current) {
      console.log('Authorization code found and not yet processed:', code);
      authCodeProcessed.current = true;
      handleSpotifyCallback(code);
      // Clear the code from the URL to prevent reuse
      console.log('Clearing code from URL');
      navigate('/', { replace: true });
    } else if (code) {
      console.log('Authorization code found but already processed');
    } else {
      console.log('No authorization code found in URL');
    }
  }, [location, navigate, handleSpotifyCallback]);

  const handleLogin = () => {
    console.log('Initiating Spotify login');
    window.location.href = getAuthUrl();
  };

  if (status === 'loading') {
    return <div>Loading playlist...</div>;
  }

  return (
    <div>
      <h1>MoodMix</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {playlist.length === 0 ? (
        <button onClick={handleLogin}>Login to Spotify</button>
      ) : (
        <>
          <MusicPlayer playlist={playlist} />
          {moodAnalysis && (
            <div>
              <h2>Mood Analysis</h2>
              <p>{moodAnalysis}</p>
            </div>
          )}
          <h2>Playlist Information</h2>
          <ul>
            {playlist.map(track => (
              <li key={track.id}>
                <h3>{track.title} by {track.artist}</h3>
                {track.geniusUrl ? (
                  <a href={track.geniusUrl} target="_blank" rel="noopener noreferrer">View on Genius</a>
                ) : (
                  <p>No Genius page found</p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;