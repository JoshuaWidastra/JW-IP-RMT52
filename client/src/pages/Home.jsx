import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { getAuthUrl } from '../services/spotify';
import { fetchAccessToken, fetchRecommendations } from '../store/spotifySlice';
import { fetchMoodAnalysis } from '../store/openAISlice';
import { fetchSongInfo } from '../store/geniusSlice';

function Home() {
  const dispatch = useDispatch();
  const { playlist, status: spotifyStatus, error: spotifyError } = useSelector((state) => state.spotify);
  const { moodAnalysis, status: openAIStatus, error: openAIError } = useSelector((state) => state.openAI);
  const { songInfo, status: geniusStatus, error: geniusError } = useSelector((state) => state.genius);
  const navigate = useNavigate();
  const location = useLocation();
  const authCodeProcessed = useRef(false);

  const handleSpotifyCallback = useCallback(async (code) => {
    console.log('Handling Spotify callback with code:', code);
    try {
      await dispatch(fetchAccessToken(code)).unwrap();
      const tracks = await dispatch(fetchRecommendations()).unwrap();
      console.log('Playlist tracks:', tracks);

      // Fetch Genius info for each track
      await Promise.all(tracks.map(track => 
        dispatch(fetchSongInfo({ title: track.title, artist: track.artist }))
      ));

      // Analyze mood
      const moodAnalysisResult = await dispatch(fetchMoodAnalysis(tracks)).unwrap();
      console.log('Mood analysis result:', moodAnalysisResult);
    } catch (error) {
      console.error('Error in handleSpotifyCallback:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code && !authCodeProcessed.current) {
      console.log('Authorization code found and not yet processed:', code);
      authCodeProcessed.current = true;
      handleSpotifyCallback(code);
      navigate('/', { replace: true });
    }
  }, [location, navigate, handleSpotifyCallback]);

  const handleLogin = useCallback(() => {
    console.log('Initiating Spotify login');
    window.location.href = getAuthUrl();
  }, []);

  const memoizedPlaylist = useMemo(() => playlist, [playlist]);

  const error = useMemo(() => spotifyError || openAIError || geniusError, [spotifyError, openAIError, geniusError]);

  const isLoading = spotifyStatus === 'loading' || openAIStatus === 'loading' || geniusStatus === 'loading';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>MoodMix</h1>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {memoizedPlaylist.length === 0 ? (
        <button onClick={handleLogin}>Login to Spotify</button>
      ) : (
        <>
          <MusicPlayer playlist={memoizedPlaylist} />
          {moodAnalysis && (
            <div>
              <h2>Playlist Mood Analysis</h2>
              <p>{moodAnalysis}</p>
            </div>
          )}
          <h2>Playlist Information</h2>
          <ul>
            {memoizedPlaylist.map(track => (
              <li key={track.id}>
                <h3>{track.title} by {track.artist}</h3>
                {songInfo[`${track.title}-${track.artist}`]?.url ? (
                  <a href={songInfo[`${track.title}-${track.artist}`].url} target="_blank" rel="noopener noreferrer">View on Genius</a>
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

export default React.memo(Home);