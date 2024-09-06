import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';
import { removeSong, loadPlaylistFromStorage, savePlaylistToStorage } from '../store/playlistSlice';
import { fetchMoodAnalysis } from '../store/openAISlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

function Playlist() {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);
  const { songInfo } = useSelector((state) => state.genius);
  const { moodAnalysis, status: moodAnalysisStatus } = useSelector((state) => state.openAI);

  useEffect(() => {
    dispatch(loadPlaylistFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(savePlaylistToStorage());
    if (playlist.length > 0) {
      dispatch(fetchMoodAnalysis(playlist));
    }
  }, [playlist, dispatch]);

  const handleRemoveSong = (songId) => {
    dispatch(removeSong(songId));
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center mb-4">Your Playlist</h1>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="mood-analysis card">
            <div className="card-body">
              <h2 className="card-title">Playlist Mood Analysis</h2>
              {moodAnalysisStatus === 'loading' && <p>Analyzing mood...</p>}
              {moodAnalysis && <p className="card-text">{moodAnalysis}</p>}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card music-player-card">
            <div className="card-body">
              <MusicPlayer playlist={playlist} />
              <h2 className="text-center mt-3">Songs ({playlist.length}/10)</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="playlist-songs card">
            <div className="card-body">
              <h2 className="card-title">Playlist Songs</h2>
              <ul className="list-group list-group-flush">
                {playlist.map(track => (
                  <li key={track.id} className="list-group-item bg-dark">
                    <h5 className="mb-1">{track.title}</h5>
                    <p className="mb-1">{track.artist}</p>
                    <div className="btn-group" role="group">
                      {songInfo[`${track.title}-${track.artist}`]?.url && (
                        <a href={songInfo[`${track.title}-${track.artist}`].url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">View on Genius</a>
                      )}
                      <button className="btn btn-sm btn-danger" onClick={() => handleRemoveSong(track.id)}>Remove from Playlist</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;