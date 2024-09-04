import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}!</p>
      <nav>
        <Link to="/player">Music Player</Link>
        <Link to="/journal">Mood Journal</Link>
      </nav>
    </div>
  );
}

export default Dashboard;