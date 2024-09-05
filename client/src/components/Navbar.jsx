import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Import your logout action here
// import { logout } from '../store/authSlice';

function Navbar() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    // Implement your sign out logic here
    // For example: dispatch(logout());
    console.log('User signed out');
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/" style={styles.link}>Home</Link></li>
        <li style={styles.li}><Link to="/playlist" style={styles.link}>Playlist</Link></li>
        <li style={styles.li}><button onClick={handleSignOut} style={styles.button}>Sign Out</button></li>
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