import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth?.isAuthenticated;

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MoodMix</Link>
        <div className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/playlist">Playlist</Link>
              <button className="btn btn-link nav-link" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;