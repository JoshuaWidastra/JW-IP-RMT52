import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';
import { getAuthUrl, getAccessToken, getRecommendations } from '../services/spotify';
import { analyzeMood } from '../services/openai';
import { searchSong, getLyrics } from '../services/genius';

function Home() {
  const [playlist, setPlaylist] = useState([]);
  const [moodAnalysis, setMoodAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const authCodeProcessed = useRef(false);

  const handleSpotifyCallback = useCallback(async (code) => {
    console.log('Handling Spotify callback with code:', code);
    setIsLoading(true);
    setError(null);
    try {
      console.log('Attempting to get access token');
      await getAccessToken(code);
      console.log('Access token obtained successfully');
      console.log('Fetching recommendations');
      const tracks = await getRecommendations();
      console.log('Recommendations fetched:', tracks);
      if (tracks.length > 0) {
        const playlistTracks = await Promise.all(tracks.map(async track => {
          const geniusData = await searchSong(track.name, track.artists[0].name);
          let lyrics = null;
          if (geniusData) {
            lyrics = await getLyrics(geniusData.url);
          }
          return {
            id: track.id,
            title: track.name,
            artist: track.artists[0].name,
            url: track.preview_url,
            lyrics: lyrics
          };
        }));
        console.log('Mapped playlist tracks with lyrics:', playlistTracks);
        setPlaylist(playlistTracks);

        // Analyze mood
        console.log('Analyzing mood for the playlist');
        try {
          const moodAnalysisResult = await analyzeMood(playlistTracks);
          console.log('Mood analysis result:', moodAnalysisResult);
          setMoodAnalysis(moodAnalysisResult);
        } catch (moodError) {
          console.error('Error in mood analysis:', moodError);
          setError(moodError.message);
        }
      } else {
        setError('No tracks found. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleSpotifyCallback:', error);
      if (error.response && error.response.data.error === 'invalid_grant') {
        console.log('Invalid grant error caught, but ignoring as we might have already processed the code');
      } else if (error.response && error.response.status === 401) {
        setError('Authentication failed. Please check your API keys and try again.');
      } else {
        setError(`Failed to fetch playlist: ${error.message}`);
      }
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          <h2>Playlist with Lyrics</h2>
          <ul>
            {playlist.map(track => (
              <li key={track.id}>
                <h3>{track.title} by {track.artist}</h3>
                {track.lyrics ? (
                  <pre>{track.lyrics}</pre>
                ) : (
                  <p>Lyrics not available</p>
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