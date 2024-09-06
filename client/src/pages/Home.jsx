import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { getAuthUrl } from '../services/spotify';
import { fetchAccessToken, fetchRecommendations } from '../store/spotifySlice';
import { fetchMoodAnalysis } from '../store/openAISlice';
import { fetchSongInfo } from '../store/geniusSlice';
import { addSong } from '../store/playlistSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authCodeProcessed = useRef(false);

  const { recommendations, status: spotifyStatus, error: spotifyError } = useSelector((state) => state.spotify);
  const { moodAnalysis, status: openAIStatus, error: openAIError } = useSelector((state) => state.openAI);
  const { songInfo, status: geniusStatus, error: geniusError } = useSelector((state) => state.genius);

  const handleSpotifyCallback = useCallback(async (code) => {
    console.log('Handling Spotify callback with code:', code);
    try {
      await dispatch(fetchAccessToken(code)).unwrap();
      const tracks = await dispatch(fetchRecommendations()).unwrap();
      console.log('Recommended tracks:', tracks);

      // Fetch Genius info for each track
      await Promise.all(tracks.map(track => 
        dispatch(fetchSongInfo({ title: track.title, artist: track.artist }))
      ));

      // Analyze mood
      await dispatch(fetchMoodAnalysis(tracks)).unwrap();
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

  const handleAddToPlaylist = useCallback((song) => {
    dispatch(addSong(song));
  }, [dispatch]);

  const handleShuffleSongs = useCallback(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  const error = spotifyError || openAIError || geniusError;
  const isLoading = spotifyStatus === 'loading' || openAIStatus === 'loading' || geniusStatus === 'loading';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {recommendations.length === 0 ? (
        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={handleLogin}>Login to Spotify</button>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="mood-analysis card">
              <div className="card-body">
                <h2 className="card-title">Mood Analysis</h2>
                {moodAnalysis && <p className="card-text">{moodAnalysis}</p>}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card music-player-card">
              <div className="card-body">
                <MusicPlayer 
                  playlist={recommendations}
                  onShuffle={handleShuffleSongs}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="recommended-songs card">
              <div className="card-body">
                <h2 className="card-title">Recommended Songs</h2>
                <ul className="list-group list-group-flush">
                  {recommendations.map(track => (
                    <li key={track.id} className="list-group-item bg-dark">
                      <h5 className="mb-1">{track.title}</h5>
                      <p className="mb-1">{track.artist}</p>
                      <div className="btn-group" role="group">
                        {songInfo[`${track.title}-${track.artist}`]?.url && (
                          <a href={songInfo[`${track.title}-${track.artist}`].url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">View on Genius</a>
                        )}
                        <button className="btn btn-sm btn-primary" onClick={() => handleAddToPlaylist(track)}>Add to Playlist</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;