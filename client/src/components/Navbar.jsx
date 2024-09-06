import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/spotifySlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => !!state.spotify.accessToken);

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MoodMix</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Home</Link>
          {isAuthenticated && (
            <>
              <Link className="nav-link" to="/playlist">Playlist</Link>
              <button className="btn btn-link nav-link" onClick={handleSignOut}>Sign Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;