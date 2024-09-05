import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/spotifySlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => !!state.spotify.accessToken);

  const handleSignOut = () => {
    dispatch(logout());
    // Clear any local storage items if necessary
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    // Redirect to home page
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/" style={styles.link}>Home</Link></li>
        {isAuthenticated && (
          <>
            <li style={styles.li}><Link to="/playlist" style={styles.link}>Playlist</Link></li>
            <li style={styles.li}><button onClick={handleSignOut} style={styles.button}>Sign Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  li: {
    margin: '0 15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    padding: 0,
  }
};

export default Navbar;