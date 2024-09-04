import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      <h1>Welcome to MoodMix</h1>
      <p>Discover music that matches your mood!</p>
      {isAuthenticated ? (
        <Link to="/dashboard">Go to Dashboard</Link>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Home;