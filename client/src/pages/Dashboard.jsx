import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initiateSpotifyLogin } from '../store/actions/spotifyActions';

function Dashboard() {
  const user = useSelector(state => state.auth.user);
  const spotifyToken = useSelector(state => state.spotify.token);
  const dispatch = useDispatch();

  const handleSpotifyLogin = () => {
    dispatch(initiateSpotifyLogin());
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}!</p>
      <nav>
        {spotifyToken ? (
          <Link to="/player">Music Player</Link>
        ) : (
          <button onClick={handleSpotifyLogin}>Connect to Spotify</button>
        )}
        <Link to="/journal">Mood Journal</Link>
      </nav>
    </div>
  );
}

export default Dashboard;