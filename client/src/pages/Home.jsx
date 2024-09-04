import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';
import { getAuthUrl, getAccessToken, getRecommendations } from '../services/spotify';

function Home() {
  const [playlist, setPlaylist] = useState([]);
  const [moodAnalysis, setMoodAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      handleSpotifyCallback(code);
      // Clear the code from the URL to prevent reuse
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleSpotifyCallback = async (code) => {
    setIsLoading(true);
    setError(null);
    try {
      await getAccessToken(code);
      const tracks = await getRecommendations();
      setPlaylist(tracks.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        url: track.preview_url
      })));
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      if (error.response && error.response.data.error === 'invalid_grant') {
        setError('Spotify authorization expired. Please login again.');
      } else {
        setError(`Failed to fetch playlist: ${error.message}`);
      }
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  if (isLoading) {
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
        </>
      )}
    </div>
  );
}

export default Home;