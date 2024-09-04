import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { initiateSpotifyLogin } from '../store/actions/spotifyActions';

function Navbar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const spotifyToken = useSelector(state => state.spotify.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSpotifyLogin = () => {
    dispatch(initiateSpotifyLogin());
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/player">Music Player</Link></li>
            <li><Link to="/journal">Mood Journal</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
            {!spotifyToken && (
              <li><button onClick={handleSpotifyLogin}>Connect to Spotify</button></li>
            )}
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;